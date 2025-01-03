import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // Import intl package for date formatting

class BlogDetailScreen extends StatelessWidget {
  final Map<String, dynamic> blog;

  const BlogDetailScreen({Key? key, required this.blog}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          blog['title'],
          style: const TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color.fromARGB(255, 33, 137, 156),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title of the blog post
            Text(
              blog['title']!,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            // Author and formatted createdAt date
            Text(
              'By ${blog['author']} • ${_formatDate(blog['createdAt'])}',
              style: const TextStyle(
                fontSize: 14,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 20),
            // Original content of the blog post
            Text(
              blog[
                  'generatedContent']!, // Use 'originalContent' for the full content
              style: const TextStyle(fontSize: 16, color: Colors.black87),
            ),
          ],
        ),
      ),
    );
  }

  // Helper function to format the date
  String _formatDate(String? createdAt) {
    if (createdAt == null) return 'Unknown date';

    final DateTime date = DateTime.parse(createdAt);
    final DateFormat dateFormat =
        DateFormat('dd MMMM yyyy'); // Format as '03 January 2025'
    return dateFormat.format(date);
  }
}
