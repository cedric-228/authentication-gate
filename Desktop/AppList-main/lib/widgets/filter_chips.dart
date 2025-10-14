import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/task_provider.dart';

class FilterChips extends StatelessWidget {
  const FilterChips({super.key});

  @override
  Widget build(BuildContext context) {
    final taskProvider = Provider.of<TaskProvider>(context);

    const filters = [
      {'value': 'all', 'label': 'Toutes'},
      {'value': 'pending', 'label': 'En cours'},
      {'value': 'unexecuted', 'label': 'Non effectuée'},
      {'value': 'executed', 'label': 'Effectuée'},
    ];

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Wrap(
        spacing: 8,
        children: filters.map((filter) {
          return FilterChip(
            label: Text(filter['label']!),
            selected: taskProvider.currentFilter == filter['value'],
            onSelected: (bool selected) {
              taskProvider.setFilter(filter['value']!);
            },
          );
        }).toList(),
      ),
    );
  }
}