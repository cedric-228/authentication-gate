<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\AIController;
use App\Http\Controllers\MiniProjectController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes d'authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/profile/photo/upload', [AuthController::class, 'uploadProfilePhoto']);
    Route::post('/profile/photo/capture', [AuthController::class, 'captureProfilePhoto']);
    
    // Routes des missions
    Route::get('/missions', [MissionController::class, 'index']);
    Route::post('/missions', [MissionController::class, 'store']);
    Route::get('/missions/{mission}', [MissionController::class, 'show']);
    Route::post('/missions/{mission}/apply', [MissionController::class, 'apply']);
    Route::get('/my-missions', [MissionController::class, 'myMissions']);
    
    // Routes IA Assistant
    Route::get('/ai/assistant', [AIController::class, 'getAIAssistant']);
    Route::post('/ai/suggestions', [AIController::class, 'generateSuggestions']);
    Route::get('/ai/suggestions', [AIController::class, 'getMySuggestions']);
    Route::post('/ai/suggestions/{suggestion}/accept', [AIController::class, 'acceptSuggestion']);
    Route::post('/ai/suggestions/{suggestion}/reject', [AIController::class, 'rejectSuggestion']);
    
    // Routes Mini-projets
    Route::get('/mini-projects', [MiniProjectController::class, 'index']);
    Route::post('/mini-projects', [MiniProjectController::class, 'store']);
    Route::get('/mini-projects/{id}', [MiniProjectController::class, 'show']);
    Route::delete('/mini-projects/{id}', [MiniProjectController::class, 'destroy']);
    Route::post('/mini-projects/generate', [MiniProjectController::class, 'generateSuggestions']);
    Route::post('/mini-projects/{id}/accept', [MiniProjectController::class, 'accept']);
    Route::post('/mini-projects/{id}/submit', [MiniProjectController::class, 'submit']);
    Route::post('/mini-projects/{id}/review', [MiniProjectController::class, 'review']);
});
