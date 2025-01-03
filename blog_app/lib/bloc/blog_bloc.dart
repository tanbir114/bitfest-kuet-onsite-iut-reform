import 'dart:convert';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:http/http.dart' as http; // Importing http package

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
  final List<Map<String, String>> blogs;

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

class BlogBloc extends Bloc<BlogEvent, BlogState> {
  BlogBloc() : super(BlogInitial()) {
    on<LoadBlogsEvent>((event, emit) async {
      emit(BlogLoading());
      try {
        // Fetch blogs from API
        final response = await http.get(Uri.parse('http://192.168.14.49:5001/api/story'));

        if (response.statusCode == 200) {
          final responseData = jsonDecode(response.body);
          if (responseData['success'] == true) {
            final blogs = responseData['data']; // Use the 'data' field
            emit(BlogLoaded(blogs));
          } else {
            emit(BlogError(responseData['message'] ?? "Failed to fetch blogs"));
          }
        } else {
          emit(BlogError("Failed to load blogs. Status code: ${response.statusCode}"));
        }
      } catch (e) {
        emit(BlogError("Error: ${e.toString()}"));
      }
    });

    on<AddBlogEvent>((event, emit) {
      if (state is BlogLoaded) {
        final currentState = state as BlogLoaded;
        final updatedBlogs = List<Map<String, String>>.from(currentState.blogs)
          ..insert(0, event.blog); // Add new blog at the top
        emit(BlogLoaded(updatedBlogs));
      }
    });
  }
}
