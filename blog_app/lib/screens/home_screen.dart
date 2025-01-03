import 'package:blog_app/screens/add_post_screen.dart';
import 'package:blog_app/screens/chat_screen.dart';
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
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
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
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: const Color(0xFF2A92C9),
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
        },
        child: Icon(Icons.chat_bubble), // Chat icon for AI chat
        backgroundColor: Colors.blueAccent, // Color for the button
      ),
    );
  }
}
