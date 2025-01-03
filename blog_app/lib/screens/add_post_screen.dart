import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_quill/flutter_quill.dart';
import '../bloc/add_post_bloc.dart';
// Import the home screen file

class AddPostScreen extends StatelessWidget {
  const AddPostScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    QuillController _controller = QuillController.basic();
    TextEditingController _titleController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Post'),
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
          }
        },
        builder: (context, state) {
          if (state is AddPostLoadingState) {
            return const Center(child: CircularProgressIndicator());
          }

          String originalContent = '';
          String generatedContent = '';
          String title = '';

          // If post is loaded, both contents will be available
          if (state is AddPostLoadedState) {
            originalContent = state.originalContent;
            generatedContent = state.generatedContent;
            title = state.title;
            _controller = QuillController.basic()
              ..replaceText(0, 0, generatedContent, null);

            // Update the title controller when the state is loaded
            _titleController.text = title;
          }

          return Padding(
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
                ElevatedButton(
                  onPressed: () {
                    final content = _controller.document.toPlainText();
                    final tags = 'tag1, tag2'; // Replace with actual tag input
                    final author =
                        "6777cd02a35610db18ae569b"; // Replace with actual author ID

                    if (state is AddPostLoadedState) {
                      final postId = state.eventId;
                      if (postId != null) {
                        // Finalize the post with generated content
                        context
                            .read<AddPostBloc>()
                            .add(FinalizeGeneratedContentEvent(
                              postId: postId,
                              title: _titleController
                                  .text, // Use the title from the controller
                              originalContent: originalContent,
                              tags:
                                  tags.split(',').map((e) => e.trim()).toList(),
                              author: author,
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
                      // Create a new post with initial content
                      context.read<AddPostBloc>().add(PostInitialBlogEvent(
                            title: _titleController
                                .text, // Use the title from the controller
                            content: content,
                            tags: tags.split(',').map((e) => e.trim()).toList(),
                            author: author,
                          ));
                    }
                  },
                  child: const Text('Submit'),
                ),
                // Only show original content if generated content is available
                if (generatedContent.isNotEmpty) ...[
                  // Title field, filled with the title from the state
                  const SizedBox(
                    height: 10,
                  ),
                  TextField(
                    controller: _titleController,
                    decoration: const InputDecoration(labelText: 'Title'),
                    onChanged: (value) {
                      // Handle title changes if needed
                    },
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Original Content:',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 8),
                  Text(originalContent, style: TextStyle(fontSize: 16)),
                  const SizedBox(height: 16),
                ],
              ],
            ),
          );
        },
      ),
    );
  }
}
