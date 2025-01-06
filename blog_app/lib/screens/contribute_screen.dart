import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class ContributeScreen extends StatefulWidget {
  const ContributeScreen({Key? key}) : super(key: key);

  @override
  State<ContributeScreen> createState() => _ContributeScreenState();
}

class _ContributeScreenState extends State<ContributeScreen> {
  final TextEditingController inpContr = TextEditingController();
  final TextEditingController outContr = TextEditingController();

  Future<void> handleSubmit() async {
    if (inpContr.text.isEmpty || outContr.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in both fields')),
      );
    } else {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String userId = prefs.getString('user_id') ?? '';
      String token = prefs.getString('jwt_token') ?? '';

      if (userId.isNotEmpty && token.isNotEmpty) {
        // Prepare the data to send in the request
        Map<String, String> headers = {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        };

        Map<String, dynamic> body = {
          "banglaContent": outContr.text,
          "originalContent": inpContr.text,
          "author": userId
        };

        try {
          // Make the API request
          final response = await http.post(
            Uri.parse('http://192.168.14.49:5001/api/improvement/create'),
            headers: headers,
            body: json.encode(body),
          );

          if (response.statusCode == 201) {
            // Clear the text fields after successful submission
            inpContr.clear();
            outContr.clear();

            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Submission Successful')),
            );
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Error submitting data')),
            );
          }
        } catch (e) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Failed to connect to the server')),
          );
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Missing user or token')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Contribute'),
        backgroundColor: const Color.fromARGB(255, 33, 137, 156),
      ),
      body: SingleChildScrollView(
        child: Stack(
          children: [
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(height: 20),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: const Text(
                        'Your Insight Matters',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 24.0,
                          color: Color.fromARGB(255, 33, 137, 156),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),
                    // Name Input Field
                    nameInputField(MediaQuery.of(context).size, inpContr),
                    const SizedBox(height: 20),
                    // Output Text Field
                    nameOutputField(MediaQuery.of(context).size, outContr),
                    const SizedBox(height: 40),
                    // Submit Button
                    ElevatedButton(
                      onPressed: handleSubmit,
                      style: ElevatedButton.styleFrom(
                        backgroundColor:
                            const Color.fromARGB(255, 33, 137, 156),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 32, vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: const Text(
                        'Submit',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget nameInputField(Size size, TextEditingController controller) {
    return Container(
      alignment: Alignment.center,
      height: size.height / 6,
      width: size.width * 0.8,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.0),
        color: Colors.white,
        border: Border.all(
          color: const Color.fromARGB(255, 33, 137, 156),
          width: 2.0,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 8,
            spreadRadius: 2,
          ),
        ],
      ),
      child: TextFormField(
        controller: controller,
        style: GoogleFonts.inter(
          fontSize: 14.0,
          color: Colors.black,
          fontWeight: FontWeight.w600,
          height: 1.5,
        ),
        cursorColor: const Color.fromARGB(255, 33, 137, 156),
        maxLines: null, // This makes the field a text area (multi-line)
        keyboardType:
            TextInputType.multiline, // Ensures the input is multi-line
        decoration: InputDecoration(
          hintText: 'Enter Banglish text',
          hintStyle: GoogleFonts.inter(
            fontSize: 14.0,
            color: Colors.black.withOpacity(0.5),
          ),
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
          border: InputBorder.none,
          focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(
                color: Color.fromARGB(255, 33, 137, 156), width: 2.0),
          ),
          enabledBorder: const UnderlineInputBorder(
            borderSide: BorderSide(
                color: Color.fromARGB(255, 33, 137, 156), width: 1.0),
          ),
        ),
      ),
    );
  }

  Widget nameOutputField(Size size, TextEditingController controller) {
    return Container(
      alignment: Alignment.center,
      height: size.height / 6,
      width: size.width * 0.8,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.0),
        color: Colors.white,
        border: Border.all(
          color: const Color.fromARGB(255, 33, 137, 156),
          width: 2.0,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 8,
            spreadRadius: 2,
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: TextFormField(
          controller: controller,
          style: GoogleFonts.inter(
            fontSize: 14.0,
            color: Colors.black,
            fontWeight: FontWeight.w600,
            height: 1.5,
          ),
          cursorColor: const Color.fromARGB(255, 33, 137, 156),
          maxLines: null, // This makes the field a text area (multi-line)
          keyboardType:
              TextInputType.multiline, // Ensures the input is multi-line
          decoration: InputDecoration(
            hintText: 'Enter the expected Bangla text',
            hintStyle: GoogleFonts.inter(
              fontSize: 14.0,
              color: Colors.black.withOpacity(0.5),
            ),
            contentPadding:
                const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
            border: InputBorder.none,
            focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(
                  color: Color.fromARGB(255, 33, 137, 156), width: 2.0),
            ),
            enabledBorder: const UnderlineInputBorder(
              borderSide: BorderSide(
                  color: Color.fromARGB(255, 33, 137, 156), width: 1.0),
            ),
          ),
        ),
      ),
    );
  }
}
