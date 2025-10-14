import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/task.dart';

class ApiService {
  static const String baseUrl = 'http://127.0.0.1:8000/api';

  final http.Client client;

  ApiService({required this.client});

  Future<List<Task>> getTasks({String? status}) async {
    try {
      final url = status != null && status != 'all' 
          ? Uri.parse('$baseUrl/tasks?status=$status')
          : Uri.parse('$baseUrl/tasks');
      
      print('🌐 Fetching tasks from: $url');
      
      final response = await client.get(url);
      print('📥 Response status: ${response.statusCode}');
      print('📥 Response body: ${response.body}');

      if (response.statusCode == 200) {
        final dynamic jsonResponse = json.decode(response.body);
        print('🔍 JSON response type: ${jsonResponse.runtimeType}');
        
        List<dynamic> tasksData;
        
        if (jsonResponse is List) {
          tasksData = jsonResponse;
        } else {
          // Si ce n'est pas une liste, retourner une liste vide
          print('⚠️ Unexpected response format, expected List but got: ${jsonResponse.runtimeType}');
          return [];
        }
        
        print('📋 Tasks data found: ${tasksData.length} items');
        
        final tasks = <Task>[];
        for (final data in tasksData) {
          try {
            if (data is Map<String, dynamic>) {
              tasks.add(Task.fromJson(data));
            }
          } catch (e) {
            print('❌ Error parsing task: $e');
            print('📄 Problematic data: $data');
          }
        }
        
        return tasks;
      } else {
        throw Exception('HTTP ${response.statusCode}: ${response.body}');
      }
    } catch (e) {
      print('❌ Network error in getTasks: $e');
      rethrow;
    }
  }

  Future<Task> createTask(Task task) async {
    try {
      final taskData = task.toJson();
      print('📤 Creating task with data: $taskData');
      
      final response = await client.post(
        Uri.parse('$baseUrl/tasks'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: json.encode(taskData),
      );

      print('📥 Create response: ${response.statusCode} - ${response.body}');

      if (response.statusCode == 201) {
        final dynamic jsonResponse = json.decode(response.body);
        return Task.fromJson(jsonResponse);
      } else {
        throw Exception('HTTP ${response.statusCode}: ${response.body}');
      }
    } catch (e) {
      print('❌ Error in createTask: $e');
      rethrow;
    }
  }

  Future<Task> updateTask(Task task) async {
    try {
      if (task.id == null) {
        throw Exception('Cannot update task without ID');
      }

      final response = await client.put(
        Uri.parse('$baseUrl/tasks/${task.id}'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: json.encode(task.toJson()),
      );

      print('📥 Update response: ${response.statusCode} - ${response.body}');

      if (response.statusCode == 200) {
        final dynamic jsonResponse = json.decode(response.body);
        return Task.fromJson(jsonResponse);
      } else {
        throw Exception('HTTP ${response.statusCode}: ${response.body}');
      }
    } catch (e) {
      print('❌ Error in updateTask: $e');
      rethrow;
    }
  }

  Future<void> deleteTask(int taskId) async {
    try {
      final response = await client.delete(
        Uri.parse('$baseUrl/tasks/$taskId'),
        headers: {'Accept': 'application/json'},
      );

      print('📥 Delete response: ${response.statusCode} - ${response.body}');

      // Accepter 200 ou 204 comme succès
      if (response.statusCode != 200 && response.statusCode != 204) {
        throw Exception('HTTP ${response.statusCode}: ${response.body}');
      }
    } catch (e) {
      print('❌ Error in deleteTask: $e');
      rethrow;
    }
  }

  // Méthode pour tester la connexion
  Future<bool> testConnection() async {
    try {
      final response = await client.get(
        Uri.parse('$baseUrl/test'),
        headers: {'Accept': 'application/json'},
      );
      
      return response.statusCode == 200;
    } catch (e) {
      print('❌ Connection test failed: $e');
      return false;
    }
  }
}