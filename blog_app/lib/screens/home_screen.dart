import 'package:flutter/material.dart';
import 'dart:convert';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<dynamic> trendingNews = [];
  List<dynamic> recommendedNews = [];

  @override
  void initState() {
    super.initState();
    _loadNewsData();
  }

  void _loadNewsData() {
    setState(() {
      trendingNews = NewsData.trending;
      recommendedNews = NewsData.recommended;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Breaking News'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {
              // Add logic to handle notifications
            },
          ),
        ],
      ),
      body: trendingNews.isEmpty || recommendedNews.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Search Bar
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Find Interesting news',
                        prefixIcon: const Icon(Icons.search),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30),
                        ),
                      ),
                      onChanged: (value) {
                        // Add search logic
                      },
                    ),
                    const SizedBox(height: 20),

                    // Sliding Window (Carousel)
                    SizedBox(
                      height: 200,
                      child: PageView.builder(
                        itemCount: trendingNews.length,
                        itemBuilder: (context, index) {
                          final news = trendingNews[index];
                          return _buildTrendingCard(news['title'], news['articles'], news['reads']);
                        },
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Recommendation List
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Recommended',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        TextButton(
                          onPressed: () {
                            // Navigate to See More
                          },
                          child: const Text('See More'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: recommendedNews.length,
                      itemBuilder: (context, index) {
                        final news = recommendedNews[index];
                        return Column(
                          children: [
                            _buildRecommendationTile(
                              news['title'],
                              news['category'],
                              news['author'],
                              news['date'],
                            ),
                            const SizedBox(height: 10),
                          ],
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.explore), label: 'Discover'),
          BottomNavigationBarItem(icon: Icon(Icons.bookmark), label: 'Saved'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
        onTap: (index) {
          // Handle bottom navigation
        },
      ),
    );
  }

  Widget _buildTrendingCard(String title, String articles, String reads) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              articles,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 10),
            Text(
              title,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Text(
              reads,
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecommendationTile(String title, String category, String author, String date) {
    return ListTile(
      leading: Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          color: Colors.grey[200],
          borderRadius: BorderRadius.circular(8),
        ),
        child: const Icon(Icons.article, size: 30, color: Colors.grey),
      ),
      title: Text(
        title,
        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
      ),
      subtitle: Text('$category • $author • $date'),
      onTap: () {
        // Navigate to detail page
      },
    );
  }
}

// Create a file named news_data.dart in the same directory with the following content:
class NewsData {
  static const trending = [
    {
      "title": "Regulators close Signature Bank, second shuttered.",
      "articles": "34 articles",
      "reads": "1720 reads"
    },
    {
      "title": "Tech Company IPO hits record high.",
      "articles": "25 articles",
      "reads": "1120 reads"
    }
  ];

  static const recommended = [
    {
      "title": "Killing of teacher and Hamas assault set a jittery France.",
      "category": "Education",
      "author": "Mckindney",
      "date": "Jun 12, 2024"
    },
    {
      "title": "IPL Auction 2024, everything you need to know.",
      "category": "Sports",
      "author": "Sports Weekly",
      "date": "Jan 10, 2024"
    }
  ];
}
