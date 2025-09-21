<?php

namespace App\Http\Controllers;

use App\Models\MiniProject;
use App\Models\User;
use App\Services\AIService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MiniProjectController extends Controller
{
    protected $aiService;

    public function __construct(AIService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $status = $request->get('status', 'active');
        
        $query = MiniProject::where('user_id', $user->id);
        
        if ($status !== 'all') {
            $query->where('status', $status);
        }
        
        $projects = $query->orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'duration' => 'required|string',
            'is_paid' => 'boolean',
            'amount' => 'nullable|string',
            'skills' => 'required|array',
            'location' => 'required|string',
            'difficulty_level' => 'required|in:débutant,intermédiaire,avancé',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $project = MiniProject::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'duration' => $request->duration,
            'is_paid' => $request->is_paid ?? false,
            'amount' => $request->amount,
            'skills' => $request->skills,
            'location' => $request->location,
            'difficulty_level' => $request->difficulty_level,
            'status' => 'active',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Mini-projet créé avec succès',
            'data' => $project
        ], 201);
    }

    public function generateSuggestions(Request $request): JsonResponse
    {
        $user = $request->user();
        $count = $request->get('count', 3);

        try {
            $suggestions = $this->aiService->generateSuggestions($user, $count);
            
            // Convertir les suggestions en mini-projets
            $projects = [];
            foreach ($suggestions as $suggestion) {
                $project = MiniProject::create([
                    'user_id' => $user->id,
                    'title' => $suggestion->title,
                    'description' => $suggestion->description,
                    'category' => $suggestion->category,
                    'duration' => $suggestion->duration,
                    'is_paid' => $suggestion->is_paid,
                    'amount' => $suggestion->amount,
                    'skills' => $suggestion->skills,
                    'location' => $suggestion->location,
                    'difficulty_level' => $suggestion->difficulty_level,
                    'status' => 'active',
                ]);
                $projects[] = $project;
            }

            return response()->json([
                'success' => true,
                'message' => 'Suggestions générées avec succès',
                'data' => $projects
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la génération des suggestions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function accept(Request $request, $id): JsonResponse
    {
        $project = MiniProject::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Mini-projet non trouvé'
            ], 404);
        }

        $project->update(['status' => 'in_progress']);

        return response()->json([
            'success' => true,
            'message' => 'Mini-projet accepté',
            'data' => $project
        ]);
    }

    public function submit(Request $request, $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'submission_description' => 'required|string',
            'submission_files' => 'nullable|array',
            'submission_files.*' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png,zip|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $project = MiniProject::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->where('status', 'in_progress')
            ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Mini-projet non trouvé ou non en cours'
            ], 404);
        }

        $submissionFiles = [];
        if ($request->hasFile('submission_files')) {
            foreach ($request->file('submission_files') as $file) {
                $path = $file->store('mini-projects/submissions', 'public');
                $submissionFiles[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'size' => $file->getSize(),
                    'type' => $file->getMimeType(),
                ];
            }
        }

        $project->update([
            'status' => 'submitted',
            'submission_description' => $request->submission_description,
            'submission_files' => $submissionFiles,
            'submitted_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Soumission effectuée avec succès',
            'data' => $project
        ]);
    }

    public function review(Request $request, $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'review_feedback' => 'required|string',
            'review_score' => 'required|integer|min:0|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $project = MiniProject::where('id', $id)
            ->where('status', 'submitted')
            ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Mini-projet non trouvé ou non soumis'
            ], 404);
        }

        $project->update([
            'status' => $request->review_score >= 70 ? 'completed' : 'rejected',
            'review_feedback' => $request->review_feedback,
            'review_score' => $request->review_score,
            'reviewed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Évaluation effectuée avec succès',
            'data' => $project
        ]);
    }

    public function show($id): JsonResponse
    {
        $project = MiniProject::where('id', $id)
            ->where('user_id', request()->user()->id)
            ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Mini-projet non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $project = MiniProject::where('id', $id)
            ->where('user_id', request()->user()->id)
            ->whereIn('status', ['active', 'rejected'])
            ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Mini-projet non trouvé ou ne peut pas être supprimé'
            ], 404);
        }

        // Supprimer les fichiers de soumission
        if ($project->submission_files) {
            foreach ($project->submission_files as $file) {
                Storage::disk('public')->delete($file['path']);
            }
        }

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mini-projet supprimé avec succès'
        ]);
    }
}

