import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

// Event
abstract class AddPostEvent {}

class PostInitialBlogEvent extends AddPostEvent {
  final String title;
  final String content;
  final List<String> tags;
  final String author;
  final String status; // Add the status field
  final Function(Map<String, String>) onAddBlog;

  PostInitialBlogEvent({
    required this.title,
    required this.content,
    required this.tags,
    required this.author,
    required this.status, // Include the status
    required this.onAddBlog,
  });
}

class UpdateGeneratedContentEvent extends AddPostEvent {
  final String generatedContent;
  final String originalContent;

  UpdateGeneratedContentEvent({
    required this.originalContent,
    required this.generatedContent,
  });
}

class FinalizeGeneratedContentEvent extends AddPostEvent {
  final String postId;
  final String title;
  final String originalContent;
  final List<String> tags;
  final String author;
  final String generatedContent;
  final String status; // Add the status field

  FinalizeGeneratedContentEvent({
    required this.postId,
    required this.title,
    required this.originalContent,
    required this.tags,
    required this.author,
    required this.generatedContent,
    required this.status, // Include the status
  });
}

// State
abstract class AddPostState {}

class AddPostInitialState extends AddPostState {}

class AddPostLoadingState extends AddPostState {}

class AddPostLoadedState extends AddPostState {
  final String originalContent;
  final String generatedContent;
  final String title;
  final String? eventId;

  AddPostLoadedState({
    required this.originalContent,
    required this.generatedContent,
    required this.title,
    this.eventId,
  });
}

class BlogListState extends AddPostState {
  final List<Map<String, dynamic>> blogs;

  BlogListState({required this.blogs});
}

class AddPostErrorState extends AddPostState {
  final String errorMessage;

  AddPostErrorState({required this.errorMessage});
}

// Bloc
class AddPostBloc extends Bloc<AddPostEvent, AddPostState> {
  AddPostBloc() : super(AddPostInitialState()) {
    // Helper method to fetch JWT token
    Future<String?> _getJwtToken() async {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getString('jwt_token'); // Retrieve the JWT token
    }

    // Handle PostInitialBlogEvent (initial post creation)
    on<PostInitialBlogEvent>((event, emit) async {
      emit(AddPostLoadingState()); // Show loading state

      try {
        final token = await _getJwtToken();
        if (token == null) {
          emit(
              AddPostErrorState(errorMessage: 'Authentication token missing.'));
          return;
        }

        final response = await http.post(
          Uri.parse('http://192.168.14.49:5001/api/story/initial'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $token', // Add JWT token to headers
          },
          body: jsonEncode({
            'title': event.title,
            'originalContent': event.content,
            'tags': event.tags,
            'author': event.author,
            'status': event.status, // Include the status in the request
          }),
        );

        if (response.statusCode == 200) {
          final responseData = jsonDecode(response.body);
          final generatedContent = responseData['data']['generatedContent'];
          final title = responseData['data']['title'];
          final eventId = responseData['data']['newStory']['_id'];

          emit(AddPostLoadedState(
            originalContent: event.content,
            generatedContent: generatedContent,
            title: title,
            eventId: eventId,
          ));

          final newBlog = {
            "title": title,
            "author": event.author,
            "date": DateTime.now().toString(),
            "content": event.content,
          }.map((key, value) => MapEntry(key, value.toString()));
          event.onAddBlog(newBlog);
        } else {
          final errorResponse = jsonDecode(response.body);
          final errorMessage =
              errorResponse['message'] ?? 'Unknown error occurred';
          emit(AddPostErrorState(errorMessage: errorMessage));
        }
      } catch (e) {
        emit(AddPostErrorState(errorMessage: e.toString()));
      }
    });

    // Handle FinalizeGeneratedContentEvent (update the final content)
    on<FinalizeGeneratedContentEvent>((event, emit) async {
      if (event.postId.isEmpty) {
        emit(AddPostErrorState(errorMessage: 'Post ID is missing.'));
        return;
      }

      emit(AddPostLoadingState());

      try {
        final token = await _getJwtToken();
        if (token == null) {
          emit(
              AddPostErrorState(errorMessage: 'Authentication token missing.'));
          return;
        }

        final response = await http.put(
          Uri.parse(
              'http://192.168.14.49:5001/api/story/final/${event.postId}'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $token', // Add JWT token to headers
          },
          body: jsonEncode({
            'title': event.title,
            'originalContent': event.originalContent,
            'tags': event.tags,
            'author': event.author,
            'generatedContent': event.generatedContent,
            'status': event.status, // Include the status in the request
          }),
        );

        if (response.statusCode == 200) {
          emit(AddPostInitialState()); // Reset state for a new post
        } else {
          emit(AddPostErrorState(errorMessage: 'Failed to update post.'));
        }
      } catch (e) {
        emit(AddPostErrorState(errorMessage: e.toString()));
      }
    });
  }
}
