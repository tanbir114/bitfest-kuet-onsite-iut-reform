import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

// Event
abstract class SavedBlogEvent {}

class SaveBlogEvent extends SavedBlogEvent {
  final Map<String, dynamic>
      blog; // Changed to dynamic to support nested objects

  SaveBlogEvent({required this.blog});
}

class UnsaveBlogEvent extends SavedBlogEvent {
  final Map<String, dynamic>
      blog; // Changed to dynamic to support nested objects

  UnsaveBlogEvent({required this.blog});
}

// State
class SavedBlogState {
  final List<Map<String, dynamic>>
      savedBlogs; // Changed to dynamic to support nested objects

  SavedBlogState({this.savedBlogs = const []});

  SavedBlogState copyWith({List<Map<String, dynamic>>? savedBlogs}) {
    return SavedBlogState(
      savedBlogs: savedBlogs ?? this.savedBlogs,
    );
  }
}

// Bloc
class SavedBlogBloc extends Bloc<SavedBlogEvent, SavedBlogState> {
  SavedBlogBloc() : super(SavedBlogState()) {
    on<SaveBlogEvent>((event, emit) async {
      final updatedBlogs = List<Map<String, dynamic>>.from(state.savedBlogs);

      // Check if the blog is already saved
      if (!updatedBlogs.any((blog) => blog['title'] == event.blog['title'])) {
        updatedBlogs.add(event.blog);
      }

      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('savedBlogs', jsonEncode(updatedBlogs));
      emit(state.copyWith(savedBlogs: updatedBlogs));
    });

    on<UnsaveBlogEvent>((event, emit) async {
      final updatedBlogs = List<Map<String, dynamic>>.from(state.savedBlogs);

      // Remove the blog from the saved list
      updatedBlogs.removeWhere((blog) => blog['title'] == event.blog['title']);

      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('savedBlogs', jsonEncode(updatedBlogs));
      emit(state.copyWith(savedBlogs: updatedBlogs));
    });
  }

  // Load saved blogs from SharedPreferences
  Future<void> loadSavedBlogs() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? savedBlogsString = prefs.getString('savedBlogs');

    if (savedBlogsString != null) {
      List<Map<String, dynamic>> savedBlogs = List<Map<String, dynamic>>.from(
        jsonDecode(savedBlogsString)
            .map((blog) => Map<String, dynamic>.from(blog)),
      );
      emit(state.copyWith(savedBlogs: savedBlogs));
    }
  }
}
