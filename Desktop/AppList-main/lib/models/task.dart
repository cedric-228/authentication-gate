class Task {
  final int? id;
  final String title;
  final String description;
  final String status;
  final DateTime? dueDate;
  final DateTime createdAt;
  final DateTime updatedAt;

  Task({
    this.id,
    required this.title,
    String? description,
    required this.status,
    this.dueDate,
    required this.createdAt,
    required this.updatedAt,
  }) : description = description ?? '';

  factory Task.fromJson(Map<String, dynamic> json) {
    try {
      // Parse les dates de manière sécurisée
      DateTime parseDate(dynamic date) {
        if (date == null) return DateTime.now();
        if (date is DateTime) return date;
        if (date is String) {
          try {
            return DateTime.parse(date).toLocal();
          } catch (e) {
            print('⚠️ Error parsing date: $date, error: $e');
            return DateTime.now();
          }
        }
        return DateTime.now();
      }

      return Task(
        id: _parseInt(json['id']),
        title: _parseString(json['title']) ?? 'Sans titre',
        description: _parseString(json['description']) ?? '',
        status: _parseString(json['status']) ?? 'pending',
        dueDate: json['due_date'] != null ? parseDate(json['due_date']) : null,
        createdAt: parseDate(json['created_at']),
        updatedAt: parseDate(json['updated_at']),
      );
    } catch (e) {
      print('❌ Critical error in Task.fromJson: $e');
      print('📄 Problematic JSON: $json');
      // Retourner une tâche par défaut plutôt que de crasher
      return Task(
        title: 'Erreur de chargement',
        description: 'Impossible de charger cette tâche',
        status: 'pending',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );
    }
  }

  static int? _parseInt(dynamic value) {
    if (value == null) return null;
    if (value is int) return value;
    if (value is String) return int.tryParse(value);
    if (value is double) return value.toInt();
    return null;
  }

  static String? _parseString(dynamic value) {
    if (value == null) return null;
    if (value is String) return value;
    return value.toString();
  }

  Map<String, dynamic> toJson() {
    return {
      if (id != null) 'id': id,
      'title': title,
      'description': description,
      'status': status,
      'due_date': dueDate?.toUtc().toIso8601String(),
    };
  }

  Task copyWith({
    int? id,
    String? title,
    String? description,
    String? status,
    DateTime? dueDate,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      status: status ?? this.status,
      dueDate: dueDate ?? this.dueDate,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  String toString() {
    return 'Task(id: $id, title: $title, status: $status)';
  }
}