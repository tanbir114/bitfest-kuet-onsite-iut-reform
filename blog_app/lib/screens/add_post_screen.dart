import 'package:blog_app/bloc/blog_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../bloc/add_post_bloc.dart';

class AddPostScreen extends StatelessWidget {
  const AddPostScreen({Key? key}) : super(key: key);

  Future<String?> getUserId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('user_id');
  }

  @override
  Widget build(BuildContext context) {
    QuillController _controller = QuillController.basic();
    TextEditingController _titleController = TextEditingController();
    TextEditingController _tagsController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Add Post',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color(0xFF2A92C9),
      ),
      body: BlocConsumer<AddPostBloc, AddPostState>(
        listener: (context, state) {
          if (state is AddPostErrorState) {
            ScaffoldMessenger.of(context)
                .showSnackBar(SnackBar(content: Text(state.errorMessage)));
          }

          // Reset the fields and controller after post is finalized
          if (state is AddPostInitialState) {
            _controller = QuillController.basic(); // Reset controller
            _titleController.clear(); // Clear title field
            _tagsController.clear(); // Clear tags field
          }
        },
        builder: (context, state) {
          if (state is AddPostLoadingState) {
            return const Center(child: CircularProgressIndicator());
          }

          String originalContent = '';
          String generatedContent = '';
          String title = '';

          if (state is AddPostLoadedState) {
            originalContent = state.originalContent;
            generatedContent = state.generatedContent;
            title = state.title;
            _controller = QuillController.basic()
              ..replaceText(0, 0, generatedContent, null);

            _titleController.text = title;
          }

          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Rich Text editor using Quill
                  QuillSimpleToolbar(
                    controller: _controller,
                    configurations: const QuillSimpleToolbarConfigurations(),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    height: 148,
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: QuillEditor.basic(
                      controller: _controller,
                      configurations: const QuillEditorConfigurations(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _tagsController,
                    decoration: const InputDecoration(
                      labelText: 'Tags (comma separated)',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Align(
                    alignment: Alignment.centerRight,
                    child: ElevatedButton(
                      onPressed: () async {
                        final content = _controller.document.toPlainText();
                        final tags = _tagsController.text;
                        final userId = await getUserId();

                        if (userId == null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content:
                                  Text('User ID not found. Please log in.'),
                            ),
                          );
                          return;
                        }

                        if (state is AddPostLoadedState) {
                          final postId = state.eventId;
                          if (postId != null) {
                            context
                                .read<AddPostBloc>()
                                .add(FinalizeGeneratedContentEvent(
                                  postId: postId,
                                  title: _titleController.text,
                                  originalContent: originalContent,
                                  tags: tags
                                      .split(',')
                                      .map((e) => e.trim())
                                      .toList(),
                                  author: userId,
                                  generatedContent: generatedContent.isNotEmpty
                                      ? generatedContent
                                      : content,
                                ));
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                    content: Text('Post ID is missing.')));
                          }
                        } else {
                          context.read<AddPostBloc>().add(PostInitialBlogEvent(
                                title: _titleController.text,
                                content: content,
                                tags: tags
                                    .split(',')
                                    .map((e) => e.trim())
                                    .toList(),
                                author: userId,
                                onAddBlog: (newBlog) {
                                  context
                                      .read<BlogBloc>()
                                      .add(AddBlogEvent(newBlog));
                                },
                              ));
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color.fromARGB(
                            255, 33, 137, 156), // Set background color to blue
                        foregroundColor:
                            Colors.white, // Set text color to white
                        padding: const EdgeInsets.symmetric(
                            horizontal: 24.0, vertical: 12.0),
                        textStyle: const TextStyle(
                            fontSize: 12.0, fontWeight: FontWeight.bold),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                      child: const Text('Submit'),
                    ),
                  ),

                  // Only show original content if generated content is available
                  if (generatedContent.isNotEmpty) ...[
                    const SizedBox(height: 10),
                    TextField(
                      controller: _titleController,
                      decoration: const InputDecoration(labelText: 'Title'),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Original Content:',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 8),
                    Text(originalContent, style: const TextStyle(fontSize: 16)),
                    const SizedBox(height: 16),
                  ],
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
