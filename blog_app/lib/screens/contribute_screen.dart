import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ContributeScreen extends StatefulWidget {
  const ContributeScreen({Key? key}) : super(key: key);

  @override
  State<ContributeScreen> createState() => _ContributeScreenState();
}

class _ContributeScreenState extends State<ContributeScreen> {
  // Declare the controller for the name input field
  final TextEditingController inpContr = TextEditingController();
  final TextEditingController outContr = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Contribute'),
        backgroundColor: const Color.fromARGB(255, 33, 137, 156),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Use the nameInputField widget and pass the size and controller
            nameInputField(MediaQuery.of(context).size, inpContr),
            SizedBox(
              height: 20,
            ),
            nameOutputField(MediaQuery.of(context).size, outContr),
          ],
        ),
      ),
    );
  }
}

Widget nameInputField(Size size, TextEditingController controller) {
  return Container(
    alignment: Alignment.center,
    height: size.height / 13,
    width: size.width * 0.7,
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(50.0),
      color: const Color.fromARGB(255, 33, 137, 156)
          .withOpacity(0.3), // Light blue background with opacity
    ),
    child: TextField(
      controller: controller,
      style: GoogleFonts.inter(
        fontSize: 16.0,
        color: Colors.black, // Text color for good contrast with background
        fontWeight: FontWeight.w600,
        height: 1.5,
      ),
      cursorColor:
          Colors.black, // Set cursor color to black for better visibility
      decoration: InputDecoration(
        hintText: 'Enter your input',
        hintStyle: GoogleFonts.inter(
          fontSize: 16.0,
          color: Colors.black.withOpacity(0.5), // Lighter hint text
        ),
        contentPadding:
            EdgeInsets.symmetric(horizontal: 20.0), // Padding for spacing
        border:
            InputBorder.none, // Removes the default border for a cleaner design
      ),
    ),
  );
}

Widget nameOutputField(Size size, TextEditingController controller) {
  return Container(
    alignment: Alignment.center,
    height: size.height / 13,
    width: size.width * 0.7,
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(50.0),
      color: const Color.fromARGB(255, 33, 137, 156)
          .withOpacity(0.3), // Light blue background
    ),
    child: TextField(
      controller: controller, // Use the controller passed to the function
      style: GoogleFonts.inter(
        fontSize: 16.0,
        color: Colors.black, // Text color for better readability
        fontWeight: FontWeight.w600,
        height: 1.5,
      ),
      cursorColor: Colors.black, // Set the cursor color to black
      decoration: InputDecoration(
        hintText: 'Enter your output',
        hintStyle: GoogleFonts.inter(
          fontSize: 16.0,
          color: Colors.black
              .withOpacity(0.5), // Adjust hint text opacity for contrast
        ),
        contentPadding:
            EdgeInsets.symmetric(horizontal: 20.0), // Padding inside the field
        border: InputBorder.none, // No border for clean design
      ),
    ),
  );
}
