import 'package:blog_app/screens/BlogDetailScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/saved_blog_bloc.dart';
import 'package:intl/intl.dart';

class SavedScreen extends StatelessWidget {
  const SavedScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Load saved blogs when the screen is loaded
    context.read<SavedBlogBloc>().loadSavedBlogs();

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Saved Blogs',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color.fromARGB(255, 33, 137, 156),
      ),
      body: BlocBuilder<SavedBlogBloc, SavedBlogState>(
        builder: (context, state) {
          if (state.savedBlogs.isEmpty) {
            return const Center(child: Text('No saved blogs.'));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: state.savedBlogs.length,
            itemBuilder: (context, index) {
              final blog = state.savedBlogs[index];
              return _buildSavedBlogCard(blog, context);
            },
          );
        },
      ),
    );
  }

  Widget _buildSavedBlogCard(Map<String, dynamic> blog, BuildContext context) {
    final title = blog['title'] ?? 'No title available';
    final author = blog['author'] ?? 'Unknown Author';
    final createdAt = blog['createdAt'] ?? '';

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => BlogDetailScreen(blog: blog),
          ),
        );
      },
      child: Card(
        margin: const EdgeInsets.symmetric(vertical: 10),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        elevation: 3,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'By $author • ${_formatDate(createdAt)}',
                style: const TextStyle(
                  fontSize: 14,
                  color: Colors.grey,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                blog['generatedContent'] ?? 'No content available.',
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 14, color: Colors.black87),
              ),
              const SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  IconButton(
                    icon: const Icon(Icons.delete, color: Colors.red),
                    onPressed: () {
                      context.read<SavedBlogBloc>().add(UnsaveBlogEvent(blog: blog));
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _formatDate(String createdAt) {
    try {
      final DateTime date = DateTime.parse(createdAt);
      final DateFormat dateFormat = DateFormat('dd MMMM yyyy');
      return dateFormat.format(date);
    } catch (_) {
      return 'Unknown date';
    }
  }
}
