import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/task.dart';
import '../providers/task_provider.dart';

class TaskItem extends StatelessWidget {
  final Task task;

  const TaskItem({super.key, required this.task});

  String getStatusText(String status) {
    switch (status) {
      case 'executed':
        return 'Effectuée';
      case 'unexecuted':
        return 'Non-effectuée';
      case 'pending':
        return 'En cours';
      default:
        return status;
    }
  }

  Color getStatusColor(String status) {
    switch (status) {
      case 'executed':
        return Colors.green;
      case 'unexecuted':
        return Colors.red;
      case 'pending':
        return Colors.orange;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final taskProvider = Provider.of<TaskProvider>(context, listen: false);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      child: ListTile(
        leading: Checkbox(
          value: task.status == 'executed',
          onChanged: (bool? value) {
            if (task.id == null) {
              print('❌ Cannot update task without ID');
              return;
            }

            final newStatus = value == true ? 'executed' : 'unexecuted';
            final updatedTask = task.copyWith(status: newStatus);
            taskProvider.updateTask(updatedTask).catchError((e) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Erreur: $e')),
              );
            });
          },
        ),
        title: Text(
          task.title,
          style: TextStyle(
            decoration: task.status == 'executed'
                ? TextDecoration.lineThrough
                : TextDecoration.none,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (task.description.isNotEmpty)
              Text(
                task.description,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            const SizedBox(height: 4),
            Row(
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: getStatusColor(task.status).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: getStatusColor(task.status)),
                  ),
                  child: Text(
                    getStatusText(task.status),
                    style: TextStyle(
                      color: getStatusColor(task.status),
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                if (task.dueDate != null) ...[
                  const SizedBox(width: 8),
                  Text(
                    'Échéance: ${task.dueDate!.day}/${task.dueDate!.month}/${task.dueDate!.year}',
                    style:
                        const TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ],
            ),
          ],
        ),
        trailing: PopupMenuButton<String>(
          onSelected: (value) async {
            switch (value) {
              case 'edit':
                if (task.id != null) {
                  await _showEditDialog(context, task, taskProvider);
                }
                break;
              case 'delete':
                if (task.id != null) {
                  await _showDeleteDialog(context, task.id!, taskProvider);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                        content:
                            Text('Impossible de supprimer: ID manquant')),
                  );
                }
                break;
            }
          },
          itemBuilder: (BuildContext context) => const [
            PopupMenuItem(value: 'edit', child: Text('Modifier')),
            PopupMenuItem(value: 'delete', child: Text('Supprimer')),
          ],
        ),
      ),
    );
  }

  Future<void> _showEditDialog(
      BuildContext context, Task task, TaskProvider provider) async {
    final titleController = TextEditingController(text: task.title);
    final descriptionController = TextEditingController(text: task.description);

    final result = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Modifier la tâche'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titleController,
                decoration: const InputDecoration(labelText: 'Titre'),
              ),
              TextField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Description'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            ElevatedButton(
              onPressed: () async {
                final updatedTask = task.copyWith(
                  title: titleController.text,
                  description: descriptionController.text,
                );

                try {
                  await provider.updateTask(updatedTask);
                  Navigator.of(context).pop(true);
                } catch (e) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Erreur lors de la mise à jour: $e')),
                  );
                }
              },
              child: const Text('Enregistrer'),
            ),
          ],
        );
      },
    );

    if (result == true && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Tâche mise à jour ✅')),
      );
    }
  }

  Future<void> _showDeleteDialog(
      BuildContext context, int taskId, TaskProvider provider) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Supprimer la tâche'),
          content:
              const Text('Êtes-vous sûr de vouloir supprimer cette tâche ?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            TextButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Supprimer',
                  style: TextStyle(color: Colors.red)),
            ),
          ],
        );
      },
    );

    if (result == true) {
      try {
        await provider.deleteTask(taskId);
      } catch (e) {
        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Erreur lors de la suppression: $e')),
            
          );
        }
      }
    }
  }
}
