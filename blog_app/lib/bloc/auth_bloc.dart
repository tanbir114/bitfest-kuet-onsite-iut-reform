import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

// Events
abstract class AuthEvent {}

class AuthLogin extends AuthEvent {
  final String email;
  final String password;

  AuthLogin(this.email, this.password);
}

class AuthLogout extends AuthEvent {}

class AuthSignUp extends AuthEvent {
  final String email;
  final String password;
  final String username;

  AuthSignUp(this.email, this.password, this.username);
}

// States
abstract class AuthState {}

class AuthInitial extends AuthState {}

class AuthLoading extends AuthState {}

class AuthAuthenticated extends AuthState {
  final String token;
  final Map<String, dynamic> user;

  AuthAuthenticated(this.token, this.user);
}

class AuthUnauthenticated extends AuthState {
  final String? message;

  AuthUnauthenticated({this.message});
}

// Bloc
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  static const String baseUrl =
      'http://192.168.14.49:5001/api'; // Update to the correct address and port

  AuthBloc() : super(AuthInitial()) {
    // Handle login event
    on<AuthLogin>((event, emit) async {
      emit(AuthLoading());
      try {
        final response = await http.post(
          Uri.parse('$baseUrl/user/login'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'email': event.email, 'password': event.password}),
        );

        if (response.statusCode == 200) {
          final data = jsonDecode(response.body);
          final token = data['data']['accessToken'];
          final user = data['data']['loggedInUser'];

          // Save token using SharedPreferences
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('jwt_token', token);

          // Save user data (if needed)
          await prefs.setString('user_data', jsonEncode(user));

          emit(AuthAuthenticated(token, user));
        } else {
          emit(AuthUnauthenticated(
              message: 'Login failed. Please check your credentials.'));
        }
      } catch (e) {
        emit(AuthUnauthenticated(
            message: 'An error occurred. Please try again later.'));
      }
    });

    // Handle signup event
    on<AuthSignUp>((event, emit) async {
      emit(AuthLoading());
      try {
        final response = await http.post(
          Uri.parse('$baseUrl/user/signup'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'name': event.username,
            'email': event.email,
            'password': event.password
          }),
        );
        if (response.statusCode == 200) {
          final data = jsonDecode(response.body);
          final successMessage = data['message'];
          emit(AuthUnauthenticated(
              message: successMessage)); // Display success message
        } else {
          emit(AuthUnauthenticated(
              message: 'Sign up failed. Please try again.'));
        }
      } catch (e) {
        emit(AuthUnauthenticated(
            message: 'An error occurred. Please try again later.'));
      }
    });

    // Handle logout event
    on<AuthLogout>((event, emit) async {
      // Clear token from SharedPreferences
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('jwt_token');
      await prefs.remove('user_data');

      emit(AuthUnauthenticated());
    });
  }
}
