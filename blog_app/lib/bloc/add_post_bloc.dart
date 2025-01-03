import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;

// Event
abstract class AddPostEvent {}

class PostInitialBlogEvent extends AddPostEvent {
  final String title;
  final String content;
  final List<String> tags;
  final String author;

  PostInitialBlogEvent({
    required this.title,
    required this.content,
    required this.tags,
    required this.author,
  });
}

class UpdateGeneratedContentEvent extends AddPostEvent {
  final String generatedContent;
  final String originalContent;

  UpdateGeneratedContentEvent(
      {required this.originalContent, required this.generatedContent});
}

class FinalizeGeneratedContentEvent extends AddPostEvent {
  final String postId;
  final String title;
  final String originalContent;
  final List<String> tags;
  final String author;
  final String generatedContent;

  FinalizeGeneratedContentEvent({
    required this.postId,
    required this.title,
    required this.originalContent,
    required this.tags,
    required this.author,
    required this.generatedContent,
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

class AddPostErrorState extends AddPostState {
  final String errorMessage;

  AddPostErrorState({required this.errorMessage});
}

// Bloc
class AddPostBloc extends Bloc<AddPostEvent, AddPostState> {
  AddPostBloc() : super(AddPostInitialState()) {
    // Handle PostInitialBlogEvent (initial post creation)
    on<PostInitialBlogEvent>((event, emit) async {
      emit(AddPostLoadingState()); // Show loading state

      try {
        final response = await http.post(
          Uri.parse('http://192.168.14.49:5001/api/story/initial'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'title': event.title,
            'originalContent': event.content,
            'tags': event.tags,
            'author': event.author,
          }),
        );

        if (response.statusCode == 200) {
          final responseData = jsonDecode(response.body);
          final generatedContent = responseData['data']['generatedContent'];
          final title = responseData['data']['title']; // Correct title field
          final eventId =
              responseData['data']['newStory']['_id']; // Correct event ID field

          print('Generated Content: $generatedContent'); // Debugging output
          print('Post ID: $eventId'); // Debugging output
          print("aaaaaaaaaaaaaaaaaaaaaaaaa");
          print(event.content);
          emit(AddPostLoadedState(
              originalContent: event.content,
              generatedContent: generatedContent,
              title: title,
              eventId: eventId));
        } else {
          emit(AddPostErrorState(errorMessage: 'Failed to create post.'));
        }
      } catch (e) {
        emit(AddPostErrorState(errorMessage: e.toString()));
      }
    });

    // Handle UpdateGeneratedContentEvent (when content is edited)
    on<UpdateGeneratedContentEvent>((event, emit) {
      if (state is AddPostLoadedState) {
        final currentState = state as AddPostLoadedState;

        emit(AddPostLoadedState(
          originalContent:
              currentState.originalContent, // Preserve original content
          generatedContent:
              event.generatedContent, // Update only generated content
          title: currentState.title, // Keep the existing title
          eventId: currentState.eventId, // Preserve the event ID
        ));
      }
    });

    // Handle FinalizeGeneratedContentEvent (update the final content)
    on<FinalizeGeneratedContentEvent>((event, emit) async {
      if (event.postId.isEmpty) {
        emit(AddPostErrorState(errorMessage: 'Post ID is missing.'));
        return;
      }

      emit(AddPostLoadingState());
      
      print("xxxxxxxxxxxxxxxxxxxxx");
      print(event.originalContent);

      try {
        final response = await http.put(
          Uri.parse(
              'http://192.168.14.49:5001/api/story/final/${event.postId}'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'title': event.title,
            'originalContent': event.originalContent,
            'tags': event.tags,
            'author': event.author,
            'generatedContent': event.generatedContent,
          }),
        );

        if (response.statusCode == 200) {
          // Successfully posted, reset state for a new post
          emit(AddPostInitialState());
        } else {
          emit(AddPostErrorState(errorMessage: 'Failed to update post.'));
        }
      } catch (e) {
        emit(AddPostErrorState(errorMessage: e.toString()));
      }
    });
  }
}
