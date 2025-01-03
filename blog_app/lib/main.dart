import 'package:blog_app/screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'bloc/add_post_bloc.dart'; // Import your AddPostBloc
import 'bloc/auth_bloc.dart';
import 'bloc/saved_blog_bloc.dart';
import 'screens/add_post_screen.dart';
import 'screens/login_screen.dart';
import 'screens/signup_screen.dart'; // Import AddPostScreen

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
            create: (context) =>
                AuthBloc()), // AuthBloc for authentication state
        BlocProvider(
            create: (context) =>
                SavedBlogBloc()), // SavedBlogBloc for saved blogs state
        BlocProvider(
            create: (context) =>
                AddPostBloc()), // AddPostBloc for adding and updating posts
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'JWT with Bloc',
        theme: ThemeData(primarySwatch: Colors.blue),
        initialRoute: '/',
        routes: {
          '/': (context) => BlocBuilder<AuthBloc, AuthState>(
                builder: (context, state) {
                  if (state is AuthAuthenticated) {
                    return const HomeScreen(); // Navigate to HomeScreen if authenticated
                  } else {
                    return const LoginScreen(); // Otherwise, navigate to LoginScreen
                  }
                },
              ),
          '/signup': (context) => const SignUpScreen(),
          '/home': (context) => const HomeScreen(),
          '/addPost': (context) => const AddPostScreen(), // AddPostScreen route
        },
      ),
    );
  }
}
