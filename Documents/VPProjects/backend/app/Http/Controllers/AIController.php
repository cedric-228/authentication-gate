<?php

namespace App\Http\Controllers;

use App\Models\AISuggestion;
use App\Models\Mission;
use App\Services\AIService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AIController extends Controller
{
    protected $aiService;

    public function __construct(AIService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function generateSuggestions(Request $request)
    {
        $request->validate([
            'count' => 'integer|min:1|max:5',
        ]);

        $user = Auth::user();
        $count = $request->input('count', 3);

        $suggestions = $this->aiService->generateSuggestions($user, $count);

        return response()->json([
            'suggestions' => $suggestions,
            'message' => 'Suggestions générées avec succès par l\'IA YŌVO'
        ]);
    }

    public function getMySuggestions()
    {
        $user = Auth::user();
        $suggestions = AISuggestion::where('user_id', $user->id)
            ->orderBy('generated_at', 'desc')
            ->get();

        return response()->json($suggestions);
    }

    public function acceptSuggestion(Request $request, AISuggestion $suggestion)
    {
        if ($suggestion->user_id !== Auth::id()) {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        if ($suggestion->status !== 'suggested') {
            return response()->json(['error' => 'Cette suggestion a déjà été traitée'], 400);
        }

        // Convertir la suggestion en mission
        $mission = $suggestion->convertToMission();
        
        // Marquer la suggestion comme convertie
        $suggestion->update(['status' => 'converted']);

        return response()->json([
            'mission' => $mission,
            'message' => 'Suggestion convertie en mission avec succès'
        ]);
    }

    public function rejectSuggestion(Request $request, AISuggestion $suggestion)
    {
        if ($suggestion->user_id !== Auth::id()) {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $suggestion->update(['status' => 'rejected']);

        return response()->json(['message' => 'Suggestion rejetée']);
    }

    public function getAIAssistant()
    {
        return response()->json([
            'name' => 'YŌVO IA Assistant',
            'description' => 'Votre assistant personnel pour découvrir des mini-projets adaptés à vos compétences',
            'capabilities' => [
                'Génération de projets personnalisés',
                'Analyse de vos compétences',
                'Suggestions basées sur votre localisation',
                'Projets adaptés au contexte africain'
            ],
            'avatar' => '🤖',
            'status' => 'online'
        ]);
    }
}
