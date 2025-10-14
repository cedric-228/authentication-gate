import 'package:flutter/foundation.dart';
import '../models/task.dart';
import '../services/api_service.dart';

class TaskProvider with ChangeNotifier {
  final ApiService apiService;
  
  List<Task> _tasks = [];
  String _currentFilter = 'all';
  bool _isLoading = false;

  List<Task> get tasks => _tasks;
  String get currentFilter => _currentFilter;
  bool get isLoading => _isLoading;

  TaskProvider({required this.apiService});

  Future<void> loadTasks() async {
    _isLoading = true;
    notifyListeners();

    try {
      _tasks = await apiService.getTasks(status: _currentFilter);
    } catch (e) {
      // Gérer l'erreur
      if (kDebugMode) {
        print('Error loading tasks: $e');
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> addTask(Task task) async {
    try {
      final newTask = await apiService.createTask(task);
      _tasks.insert(0, newTask);
      notifyListeners();
    } catch (e) {
      if (kDebugMode) {
        print('Error adding task: $e');
      }
      rethrow;
    }
  }

  Future<void> updateTask(Task task) async {
    try {
      final updatedTask = await apiService.updateTask(task);
      final index = _tasks.indexWhere((t) => t.id == task.id);
      if (index != -1) {
        _tasks[index] = updatedTask;
        notifyListeners();
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error updating task: $e');
      }
      rethrow;
    }
  }

  Future<void> deleteTask(int taskId) async {
    try {
      await apiService.deleteTask(taskId);
      _tasks.removeWhere((task) => task.id == taskId);
      notifyListeners();
    } catch (e) {
      if (kDebugMode) {
        print('Error deleting task: $e');
      }
      rethrow;
    }
  }

  void setFilter(String filter) {
    _currentFilter = filter;
    loadTasks();
  }

  List<Task> get filteredTasks {
    switch (_currentFilter) {
      case 'completed':
        return _tasks.where((task) => task.status == 'completed').toList();
      case 'in_progress':
        return _tasks.where((task) => task.status == 'in_progress').toList();
      case 'pending':
        return _tasks.where((task) => task.status == 'pending').toList();
      default:
        return _tasks;
    }
  }
}