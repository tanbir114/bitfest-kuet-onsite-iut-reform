import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ChatPage extends StatefulWidget {
  const ChatPage({Key? key}) : super(key: key);

  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final TextEditingController _messageController = TextEditingController();

  bool _isListening = false;
  bool _isLoading = false; // Loading state for API responses
  List<Map<String, String>> _messages = [];
  ScrollController _scrollController = ScrollController();

  String? _jwtToken;

  @override
  void initState() {
    super.initState();
    _loadJwtToken();
  }

  Future<void> _loadJwtToken() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _jwtToken = prefs.getString('jwt_token');
    });
  }

  void _sendMessage(String message) async {
    if (message.isEmpty || _jwtToken == null) return;

    // Add user message to chat
    setState(() {
      _messages.add({"sender": "user", "message": message});
      _isLoading = true; // Show loading indicator
    });

    // Call backend with JWT token
    final response = await http.post(
      Uri.parse('http://192.168.14.49:5001/api/chat'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $_jwtToken', // Include JWT in headers
      },
      body: jsonEncode({'message': message}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      setState(() {
        _messages.add({"sender": "bot", "message": data['data']});
        _isLoading = false; // Hide loading indicator after response
      });
    } else if (response.statusCode == 401) {
      setState(() {
        _messages.add({
          "sender": "bot",
          "message": 'Session expired. Please log in again.',
        });
        _isLoading = false;
      });
      // Handle unauthorized response by redirecting to login
      Navigator.pushReplacementNamed(context, '/login');
    } else {
      setState(() {
        _messages.add({
          "sender": "bot",
          "message": 'Error: Unable to get a response from the server.',
        });
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ChatBot'),
        backgroundColor: Colors.blueAccent,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              reverse: true, // Newest messages appear at the bottom
              itemCount: _messages.length + (_isLoading ? 1 : 0),
              itemBuilder: (context, index) {
                if (_isLoading && index == _messages.length) {
                  return _buildLoadingIndicator();
                }
                final message = _messages[_messages.length - index - 1];
                return ChatMessage(
                  sender: message['sender']!,
                  message: message['message']!,
                );
              },
            ),
          ),
          _buildChatInput(),
        ],
      ),
    );
  }

  Widget _buildChatInput() {
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Row(
        children: [
          IconButton(
            icon: Icon(
              _isListening ? Icons.mic : Icons.mic_none,
              color: Colors.blueAccent,
            ),
            onPressed: () {},
          ),
          Expanded(
            child: TextField(
              controller: _messageController,
              decoration: const InputDecoration(
                hintText: 'Type a message...',
                border: OutlineInputBorder(),
                contentPadding: EdgeInsets.all(10),
              ),
              onSubmitted: (text) {
                _sendMessage(text);
                _messageController.clear();
              },
            ),
          ),
          IconButton(
            icon: const Icon(Icons.send, color: Colors.blueAccent),
            onPressed: () {
              _sendMessage(_messageController.text);
              _messageController.clear();
            },
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingIndicator() {
    return const Padding(
      padding: EdgeInsets.symmetric(vertical: 10),
      child: Center(
        child: Text(
          '... Loading ...',
          style: TextStyle(fontSize: 18, color: Colors.blueAccent),
        ),
      ),
    );
  }
}

class ChatMessage extends StatelessWidget {
  final String sender;
  final String message;

  const ChatMessage({required this.sender, required this.message, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment:
          sender == "user" ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: sender == "user" ? Colors.blueAccent : Colors.grey[200],
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(
          message,
          style: TextStyle(
            color: sender == "user" ? Colors.white : Colors.black,
            fontSize: 16,
          ),
        ),
      ),
    );
  }
}
