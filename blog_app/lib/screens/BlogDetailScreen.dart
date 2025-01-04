import 'dart:io';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:pdf/pdf.dart';
import 'package:flutter/services.dart';
import 'dart:typed_data';

import 'package:permission_handler/permission_handler.dart';

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
            Text(
              blog['title']!,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'By ${blog['author']} • ${_formatDate(blog['createdAt'])}',
              style: const TextStyle(
                fontSize: 14,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 20),
            Text(
              blog['generatedContent']!,
              style: const TextStyle(fontSize: 16, color: Colors.black87),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _generatePdf(context),
        backgroundColor: const Color.fromARGB(255, 33, 137, 156),
        child: const Icon(Icons.download),
      ),
    );
  }

  String _formatDate(String? createdAt) {
    if (createdAt == null) return 'Unknown date';

    final DateTime date = DateTime.parse(createdAt);
    final DateFormat dateFormat = DateFormat('dd MMMM yyyy');
    return dateFormat.format(date);
  }

  Future<void> _generatePdf(BuildContext context) async {
    final pdf = pw.Document();

    // Load the Bengali font
    final ByteData bytes =
        await rootBundle.load('assets/fonts/akaashnormal.ttf');
    final pw.Font ttfFont = pw.Font.ttf(bytes); // Pass ByteData directly

    pdf.addPage(
      pw.Page(
        build: (pw.Context context) => pw.Column(
          crossAxisAlignment: pw.CrossAxisAlignment.start,
          children: [
            pw.Text(
              blog['title']!,
              style: pw.TextStyle(
                fontSize: 22,
                fontWeight: pw.FontWeight.bold,
                font: ttfFont, // Use Bengali font
              ),
            ),
            pw.SizedBox(height: 10),
            pw.Text(
              'By ${blog['author']} • ${_formatDate(blog['createdAt'])}',
              style: pw.TextStyle(
                fontSize: 14,
                color: PdfColors.grey,
                font: ttfFont, // Use Bengali font
              ),
            ),
            pw.SizedBox(height: 20),
            pw.Text(
              blog['generatedContent']!,
              style: pw.TextStyle(
                fontSize: 16,
                font: ttfFont, // Use Bengali font
              ),
            ),
          ],
        ),
      ),
    );

    try {
      if (await Permission.storage.request().isGranted ||
          await Permission.manageExternalStorage.request().isGranted) {
        final String downloadsPath = '/storage/emulated/0/Download';
        final file = File('$downloadsPath/${blog['title']}.pdf');
        if (!await file.exists()) {
          file.createSync(recursive: true);
        }

        await file.writeAsBytes(await pdf.save());

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Blog saved as PDF in Downloads: ${file.path}'),
            duration: const Duration(seconds: 3),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Storage permission is required to save the file.'),
            duration: Duration(seconds: 3),
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to save PDF: $e'),
          duration: const Duration(seconds: 3),
        ),
      );
    }
  }
}
