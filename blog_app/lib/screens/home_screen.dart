import 'package:blog_app/screens/add_post_screen.dart';
import 'package:blog_app/screens/chat_screen.dart';
import 'package:blog_app/screens/contribute_screen.dart';
import 'package:blog_app/screens/home_content.dart';
import 'package:flutter/material.dart';
import 'discover_screen.dart';
import 'saved_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  final List<Widget> _pages = [
    const HomeContent(), // Extract HomeScreen content into a separate widget
    DiscoverScreen(),
    const SavedScreen(),
    const AddPostScreen(),
    const ContributeScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      // Ensure the index is within range
      if (index >= 0 && index < _pages.length) {
        _selectedIndex = index;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.explore),
            label: 'Discover',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.bookmark),
            label: 'Saved',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_box),
            label: 'New Post',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.lightbulb),
            label: 'Contribute',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: const Color.fromARGB(255, 33, 137, 156),
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Navigate to the ChatPage (AI Chat screen)
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => ChatPage()),
          );
        }, // Chat icon for AI chat
        backgroundColor: const Color.fromARGB(255, 33, 137, 156),
        child: const Icon(
          Icons.chat_bubble,
          color: Colors.white,
        ), // Color for the button
      ),
    );
  }
}
