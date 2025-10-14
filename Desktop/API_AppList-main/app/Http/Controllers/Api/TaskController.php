<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;


class TaskController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            Log::info('Fetching tasks');
            
            $query = Task::query();
            
            // Filtrage par statut
            if ($request->has('status') && $request->status !== 'all') {
                $query->where('status', $request->status);
            }
            
            $tasks = $query->orderBy('created_at', 'desc')->get();
            
            Log::info('Tasks found: ' . $tasks->count());
            
            // Format de réponse simple et direct
            $formattedTasks = $tasks->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description ?? '',
                    'status' => $task->status,
                    'due_date' => $task->due_date?->toISOString(),
                    'created_at' => $task->created_at->toISOString(),
                    'updated_at' => $task->updated_at->toISOString(),
                ];
            });
            
            return response()->json($formattedTasks);
            
        } catch (\Exception $e) {
            Log::error('Error in TaskController@index: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            Log::info('Creating task', $request->all());
            
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'nullable|in:pending,unexecuted,executed',
                'due_date' => 'nullable|date',
            ]);

            $task = Task::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'status' => $validated['status'] ?? 'pending',
                'due_date' => $validated['due_date'] ?? null,
            ]);

            Log::info('Task created successfully', ['task_id' => $task->id]);

            return response()->json([
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description ?? '',
                'status' => $task->status,
                'due_date' => $task->due_date?->toISOString(),
                'created_at' => $task->created_at->toISOString(),
                'updated_at' => $task->updated_at->toISOString(),
            ], 201);
            
        } catch (\Exception $e) {
            Log::error('Error in TaskController@store: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Failed to create task',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $task = Task::find($id);
            
            if (!$task) {
                return response()->json([
                    'error' => 'Task not found'
                ], 404);
            }

            return response()->json([
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description ?? '',
                'status' => $task->status,
                'due_date' => $task->due_date?->toISOString(),
                'created_at' => $task->created_at->toISOString(),
                'updated_at' => $task->updated_at->toISOString(),
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error in TaskController@show: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $task = Task::find($id);
            
            if (!$task) {
                return response()->json(['error' => 'Task not found'], 404);
            }
            
            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'sometimes|required|in:pending,unexecuted,executed',
                'due_date' => 'nullable|date',
            ]);

            $task->update($validated);

            return response()->json([
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description ?? '',
                'status' => $task->status,
                'due_date' => $task->due_date?->toISOString(),
                'created_at' => $task->created_at->toISOString(),
                'updated_at' => $task->updated_at->toISOString(),
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error in TaskController@update: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $task = Task::find($id);
            
            if (!$task) {
                return response()->json(['error' => 'Task not found'], 404);
            }

            $task->delete();

            return response()->json(null, 204);
            
        } catch (\Exception $e) {
            Log::error('Error in TaskController@destroy: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}