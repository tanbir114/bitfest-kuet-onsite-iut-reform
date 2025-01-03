import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/saved_blog_bloc.dart'; // Import the SavedBlogBloc

class SavedScreen extends StatelessWidget {
  const SavedScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Load saved blogs when the screen is loaded
    context.read<SavedBlogBloc>().loadSavedBlogs();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Saved Blogs'),
        backgroundColor: const Color(0xFF2A92C9),
      ),
      body: BlocBuilder<SavedBlogBloc, SavedBlogState>(
        builder: (context, state) {
          // Handle the case where savedBlogs is empty or null
          if (state.savedBlogs.isEmpty) {
            return const Center(child: Text('No saved blogs.'));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: state.savedBlogs.length,
            itemBuilder: (context, index) {
              final blog = state.savedBlogs[index];
              print(state.savedBlogs.length);
              // Handle potential null values in blog data
              final title = blog['title'] ??
                  'No Title Available'; // Provide fallback value if null
              final author = blog['author'] ??
                  'No Author Available'; // Provide fallback value if null

              return ListTile(
                title: Text(title),
                subtitle: Text(author),
              );
            },
          );
        },
      ),
    );
  }
}
