import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'providers/task_provider.dart';
import 'services/api_service.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<ApiService>(
          create: (_) => ApiService(client: http.Client()),
        ),
        ChangeNotifierProvider<TaskProvider>(
          create: (context) => TaskProvider(
            apiService: Provider.of<ApiService>(context, listen: false),
          )..loadTasks(),
        ),
      ],
      child: MaterialApp(
        title: 'AppList',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.blue,
          useMaterial3: true,
        ),
        home: const HomeScreen(),
      ),
    );
  }
}