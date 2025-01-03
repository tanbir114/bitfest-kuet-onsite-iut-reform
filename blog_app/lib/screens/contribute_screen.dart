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
    body: Stack(
      children: [
        // Background image
        // Positioned.fill(
        //   child: Image.asset(
        //     'assets/try.png', // Replace with your image path
        //     fit: BoxFit.cover, // Adjust how the image scales
        //   ),
        // ),
        // Content overlay
        Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Add a space at the top
              // SizedBox(
              //   height: 50,
              // ),
              // Add a text box
              Container(
                width: MediaQuery.of(context).size.width *
                    0.8, // Adjust width as needed
                padding: EdgeInsets.symmetric(horizontal: 16.0),
                child: Center(  // Center-align the text here
                  child: Text(
                    'Your insight matters',
                    style: TextStyle(
                      fontSize: 24.0,
                      color: Color.fromARGB(255, 33, 137, 156),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ),
              // Add a space after the text box
              SizedBox(
                height: 20,
              ),
              // Main contents
              nameInputField(MediaQuery.of(context).size, inpContr),
              SizedBox(
                height: 20,
              ),
              nameOutputField(MediaQuery.of(context).size, outContr),
            ],
          ),
        ),
      ],
    ),
  );
}


Widget nameInputField(Size size, TextEditingController controller) {
  return SingleChildScrollView(
    child: Container(
      alignment: Alignment.center,
      height: size.height / 6,
      width: size.width * 0.7,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        color: Colors.white,  // White background for the input field
        border: Border.all(
          color: Color.fromARGB(255, 33, 137, 156),  // Black border
          width: 2.0,  // Border width
        ),
      ),
      child: TextField(
        controller: controller, // Controller for input
        style: GoogleFonts.inter(
          fontSize: 14.0,
          color: Colors.black, // Text color for good contrast with background
          fontWeight: FontWeight.w600,
          height: 1.5,
        ),
        cursorColor: Colors.black, // Set cursor color to black for better visibility
        decoration: InputDecoration(
          hintText: 'Enter a banglish text', // Default hint text
          hintStyle: GoogleFonts.inter(
            fontSize: 14.0,
            color: Colors.black.withOpacity(0.5), // Lighter hint text
          ),
          contentPadding: EdgeInsets.symmetric(horizontal: 20.0), // Padding for spacing inside the text field
          border: InputBorder.none, // Remove the border to keep the design clean
        ),
      ),
    ),
  );
}



Widget nameOutputField(Size size, TextEditingController controller) {
  return Container(
    alignment: Alignment.center,
    height: size.height / 6,
    width: size.width * 0.7,
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(10.0),
      // color: const Color.fromARGB(255, 33, 137, 156)
      //     .withOpacity(0.3), // Light blue background with opacity
      color: Colors.white,
        border: Border.all(
          color: Color.fromARGB(255, 33, 137, 156),  // Black border
          width: 2.0,  // Border width
        ),
    ),
    child: Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.0), // Padding for spacing
      child: TextField(
        controller: controller, // Controller to manage text input
        style: GoogleFonts.inter(
          fontSize: 14.0,
          color: Colors.black, // Text color for contrast
          fontWeight: FontWeight.w600,
          height: 1.5,
        ),
        cursorColor: Colors.black, // Black cursor for better visibility
        decoration: InputDecoration(
          hintText: 'Enter the expected bangla text', // Default hint text
          hintStyle: GoogleFonts.inter(
            fontSize: 14.0,
            color: Colors.black.withOpacity(0.5), // Lighter hint text color
          ),
          contentPadding: EdgeInsets.symmetric(horizontal: 0.0), // Adjust padding inside the text field
          border: InputBorder.none, // Remove border for a clean look
        ),
      ),
    ),
  );
}

}
