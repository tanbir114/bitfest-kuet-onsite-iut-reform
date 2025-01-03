import 'dart:convert';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart'; // Importing http package

abstract class BlogEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class LoadBlogsEvent extends BlogEvent {}

class AddBlogEvent extends BlogEvent {
  final Map<String, String> blog;

  AddBlogEvent(this.blog);

  @override
  List<Object?> get props => [blog];
}

abstract class BlogState extends Equatable {
  @override
  List<Object?> get props => [];
}

class BlogInitial extends BlogState {}

class BlogLoading extends BlogState {}

class BlogLoaded extends BlogState {
  final List<Map<String, dynamic>> blogs;

  BlogLoaded(this.blogs);

  @override
  List<Object?> get props => [blogs];
}

class BlogError extends BlogState {
  final String message;

  BlogError(this.message);

  @override
  List<Object?> get props => [message];
}

Future<http.Response> fetchProtectedResource() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('jwt_token') ?? '';

  return await http.get(
    Uri.parse('http://192.168.14.49:5001/api/story'),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    },
  );
}

class BlogBloc extends Bloc<BlogEvent, BlogState> {
  BlogBloc() : super(BlogInitial()) {
    on<LoadBlogsEvent>((event, emit) async {
      emit(BlogLoading());
      try {
        // Fetch blogs from API
        final response = await fetchProtectedResource();

        print(response.statusCode);

        if (response.statusCode == 200) {
          final responseData = jsonDecode(response.body);

          // Check if 'success' is true in the response
          if (responseData['success'] == true) {
            // Check if 'data' is a List and handle each item properly
            final blogs = (responseData['data'] as List).map((blog) {
              // Ensure each value is cast to String
              return {
                'title': blog['title'],
                'author': blog['author']['name'],
                'createdAt': blog['createdAt'],
                'generatedContent': blog['generatedContent'],
              };
            }).toList();

            print(blogs);

            print(blogs.length);
            emit(BlogLoaded(blogs));
          } else {
            emit(BlogError(responseData['message'] ?? "Failed to fetch blogs"));
          }
        } else {
          emit(BlogError(
              "Failed to load blogs. Status code: ${response.statusCode}"));
        }
      } catch (e) {
        emit(BlogError("Error: ${e.toString()}"));
      }
    });

    on<AddBlogEvent>((event, emit) {
      if (state is BlogLoaded) {
        final currentState = state as BlogLoaded;
        final updatedBlogs = List<Map<String, dynamic>>.from(currentState.blogs)
          ..insert(0, event.blog); // Add new blog at the top
        emit(BlogLoaded(updatedBlogs));
      }
    });
  }
}
