import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class HomeContent extends StatefulWidget {
  const HomeContent({Key? key}) : super(key: key);

  @override
  _HomeContentState createState() => _HomeContentState();
}

class _HomeContentState extends State<HomeContent> {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  List<dynamic> trendingNews = [];
  List<dynamic> recommendedNews = [];

  @override
  void initState() {
    super.initState();
    _loadNewsData();
    _startAutoSlide();
  }

  void _loadNewsData() {
    setState(() {
      trendingNews = NewsData.trending;
      recommendedNews = NewsData.recommended;
    });
  }

  void _startAutoSlide() {
    Timer.periodic(const Duration(seconds: 3), (timer) {
      if (_pageController.hasClients) {
        int nextPage = (_currentPage + 1) % trendingNews.length;
        _pageController.animateToPage(
          nextPage,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title:
              const Text('Kotha Britto', style: TextStyle(color: Colors.white)),
          backgroundColor: const Color.fromARGB(255, 33, 137, 156),
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
                          filled: true,
                          fillColor: Colors.white,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30),
                            borderSide: const BorderSide(
                                color: Color.fromARGB(255, 33, 137, 156)),
                          ),
                        ),
                        onChanged: (value) {
                          // Add search logic
                        },
                      ),
                      const SizedBox(height: 20),

                      // Sliding Carousel
                      SizedBox(
                        height: 200,
                        child: Stack(
                          children: [
                            PageView.builder(
                              controller: _pageController,
                              itemCount: trendingNews.length,
                              itemBuilder: (context, index) {
                                final news = trendingNews[index];
                                return _buildTrendingCard(news['title'],
                                    news['articles'], news['reads']);
                              },
                              onPageChanged: (index) {
                                setState(() {
                                  _currentPage = index;
                                });
                              },
                            ),
                            Positioned(
                              bottom: 8,
                              left: 0,
                              right: 0,
                              child: Center(
                                child: AnimatedSmoothIndicator(
                                  activeIndex: _currentPage,
                                  count: trendingNews.length,
                                  effect: const WormEffect(
                                    dotColor: Colors.white,
                                    activeDotColor:
                                        Color.fromARGB(255, 33, 137, 156),
                                    radius: 4,
                                    dotHeight: 8,
                                    dotWidth: 8,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Recommendations
                      _buildRecommendationsSection(),
                    ],
                  ),
                ),
              ));
  }

  Widget _buildTrendingCard(String title, String articles, String reads) {
    return Card(
      color: const Color.fromARGB(255, 33, 137, 156),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              articles,
              style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: Colors.white),
            ),
            const SizedBox(height: 10),
            Text(
              title,
              style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white),
            ),
            const SizedBox(height: 10),
            Text(
              reads,
              style: const TextStyle(fontSize: 12, color: Colors.white70),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecommendationsSection() {
    return Column(
      children: [
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
              style: TextButton.styleFrom(
                  foregroundColor: Color.fromARGB(255, 33, 137, 156)),
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
    );
  }

  Widget _buildRecommendationTile(
      String title, String category, String author, String date) {
    return ListTile(
      leading: Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          color: Color.fromARGB(255, 33, 137, 156),
          borderRadius: BorderRadius.circular(8),
        ),
        child: const Icon(Icons.article, size: 30, color: Colors.white),
      ),
      title: Text(
        title,
        style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Color.fromARGB(255, 33, 137, 156)),
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
      ),
      subtitle: Text(
        '$category • $author • $date',
        style: const TextStyle(color: Colors.black),
      ),
      onTap: () {
        // Navigate to detail page
      },
    );
  }
}

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
    },
    {
      "title": "Regulators close Signature Bank, second shuttered.",
      "articles": "34 articles",
      "reads": "1720 reads"
    },
    {
      "title": "Tech Company IPO hits record high.",
      "articles": "25 articles",
      "reads": "1120 reads"
    },
    {
      "title": "Regulators close Signature Bank, second shuttered.",
      "articles": "34 articles",
      "reads": "1720 reads"
    },
    {
      "title": "Tech Company IPO hits record high.",
      "articles": "25 articles",
      "reads": "1120 reads"
    },
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
    },
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
    },
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
    },
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
