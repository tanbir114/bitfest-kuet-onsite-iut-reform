import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        backgroundColor: const Color.fromARGB(255, 33, 137, 156),
      ),
      body: const Center(
        child: Text('Profile information goes here!'),
      ),
    );
  }
}
