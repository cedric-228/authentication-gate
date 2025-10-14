<?php

use App\Http\Controllers\Api\TaskController as ApiTaskController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', ApiTaskController::class);

// Route pour tester l'API
Route::get('/test', function () {
    return response()->json(['message' => 'API Todo List is working!']);
});