<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Mission::with(['user', 'applications']);

        // Filtres
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->has('type') && $request->type !== 'all') {
            if ($request->type === 'paid') {
                $query->where('is_paid', true);
            } elseif ($request->type === 'unpaid') {
                $query->where('is_paid', false);
            }
        }

        if ($request->has('location') && $request->location !== 'all') {
            $query->where('location', 'like', "%{$request->location}%");
        }

        $missions = $query->where('status', 'active')->paginate(12);

        return response()->json($missions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'is_paid' => 'boolean',
            'amount' => 'nullable|string|max:255',
            'skills' => 'required|array',
            'location' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'deadline' => 'required|date|after:today',
        ]);

        $mission = Mission::create([
            ...$request->all(),
            'user_id' => Auth::id(),
        ]);

        return response()->json($mission, 201);
    }

    public function show(Mission $mission)
    {
        $mission->load(['user', 'applications.user']);
        return response()->json($mission);
    }

    public function apply(Request $request, Mission $mission)
    {
        $request->validate([
            'message' => 'nullable|string|max:1000',
        ]);

        $application = Application::create([
            'user_id' => Auth::id(),
            'mission_id' => $mission->id,
            'message' => $request->message,
            'applied_at' => now(),
        ]);

        return response()->json($application, 201);
    }

    public function myMissions(Request $request)
    {
        $user = Auth::user();
        
        if ($user->role === 'provider') {
            $missions = Mission::where('user_id', $user->id)->with('applications.user')->get();
        } else {
            $missions = Mission::whereHas('applications', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->with('applications')->get();
        }

        return response()->json($missions);
    }
}
