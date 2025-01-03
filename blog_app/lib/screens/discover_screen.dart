import 'package:blog_app/bloc/blog_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:blog_app/screens/BlogDetailScreen.dart';
import '../bloc/upvote_bloc.dart'; // Import the UpvoteBloc
import '../bloc/saved_blog_bloc.dart'; // Import the SavedBlogBloc
import 'package:intl/intl.dart';

class DiscoverScreen extends StatefulWidget {
  DiscoverScreen({Key? key}) : super(key: key);

  @override
  State<DiscoverScreen> createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends State<DiscoverScreen> {
  @override
  void initState() {
    super.initState();
    // Dispatch LoadBlogsEvent when the screen is initialized
    context.read<BlogBloc>().add(LoadBlogsEvent());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Discover',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color.fromARGB(255, 33, 137, 156),
      ),
      body: BlocBuilder<BlogBloc, BlogState>(
        builder: (context, state) {
          if (state is BlogLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is BlogLoaded) {
            final blogs = state.blogs;
            return ListView.builder(
              padding: const EdgeInsets.all(10),
              itemCount: blogs.length,
              itemBuilder: (context, index) {
                final blog = blogs[index];
                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => BlogDetailScreen(blog: blog),
                      ),
                    );
                  },
                  child: _buildBlogPost(blog, context),
                );
              },
            );
          } else if (state is BlogError) {
            return Center(child: Text(state.message));
          }
          return const Center(child: Text("No blogs available."));
        },
      ),
    );
  }

  Widget _buildBlogPost(Map<String, dynamic> blog, BuildContext context) {
    return Card(
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
              blog['title'] ?? 'No title available',
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'By ${blog['author']} • ${_formatDate(blog['createdAt'])}',
              style: const TextStyle(
                fontSize: 14,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              blog['generatedContent'],
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontSize: 14, color: Colors.black87),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                BlocBuilder<UpvoteBloc, UpvoteState>(
                  builder: (context, state) {
                    return IconButton(
                      icon: Icon(
                        state.isUpvoted
                            ? Icons.thumb_up_alt
                            : Icons.thumb_up_off_alt,
                        color: state.isUpvoted ? Colors.blue : Colors.grey,
                      ),
                      onPressed: () {
                        context.read<UpvoteBloc>().add(ToggleUpvoteEvent());
                      },
                    );
                  },
                ),
                BlocBuilder<UpvoteBloc, UpvoteState>(
                  builder: (context, state) {
                    return IconButton(
                      icon: Icon(
                        state.isDownvoted
                            ? Icons.thumb_down_alt
                            : Icons.thumb_down_off_alt,
                        color: state.isDownvoted ? Colors.red : Colors.grey,
                      ),
                      onPressed: () {
                        context.read<UpvoteBloc>().add(ToggleDownvoteEvent());
                      },
                    );
                  },
                ),
                BlocBuilder<SavedBlogBloc, SavedBlogState>(
                  builder: (context, state) {
                    bool isSaved = state.savedBlogs.any(
                        (savedBlog) => savedBlog['title'] == blog['title']);
                    return IconButton(
                      icon: Icon(
                        isSaved ? Icons.bookmark : Icons.bookmark_border,
                        color: isSaved ? Colors.blue : Colors.grey,
                      ),
                      onPressed: () {
                        if (isSaved) {
                          context.read<SavedBlogBloc>().add(
                                UnsaveBlogEvent(blog: blog),
                              );
                        } else {
                          context.read<SavedBlogBloc>().add(
                                SaveBlogEvent(blog: blog),
                              );
                        }
                      },
                    );
                  },
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}

String _formatDate(String? createdAt) {
  if (createdAt == null) return 'Unknown date';

  final DateTime date = DateTime.parse(createdAt);
  final DateFormat dateFormat = DateFormat('dd MMMM yyyy');
  return dateFormat.format(date);
}
