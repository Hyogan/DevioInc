'use client'
import { useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const news: NewsItem[] = [
    {
      id: 1,
      title: "Devio Launches New Focus Mode Features",
      excerpt: "Enhanced productivity tools to help users maintain digital balance",
      date: "2024-03-15",
      category: "product",
      image: "/dashboard.png"
    },
    {
      id: 2,
      title: "Devio Launches New Focus Mode Features",
      excerpt: "Enhanced productivity tools to help users maintain digital balance",
      date: "2024-03-15",
      category: "product",
      image: "/dashboard.png"
    },
    {
      id: 3,
      title: "Devio Launches New Focus Mode Features",
      excerpt: "Enhanced productivity tools to help users maintain digital balance",
      date: "2024-03-15",
      category: "company",
      image: "/dashboard.png"
    },
    {
      id: 4,
      title: "Devio Launches New Focus Mode Features",
      excerpt: "Enhanced productivity tools to help users maintain digital balance",
      date: "2024-03-15",
      category: "product",
      image: "/dashboard.png"
    },
    {
      id: 5,
      title: "Devio Launches New Focus Mode Features",
      excerpt: "Enhanced productivity tools to help users maintain digital balance",
      date: "2024-03-15",
      category: "company",
      image: "/dashboard.png"
    },
    // Add more news items
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Latest News</h1>
        
        <div className="flex space-x-4 mb-8">
          <button
            className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button
            className={`category-button ${activeCategory === 'product' ? 'active' : ''}`}
            onClick={() => setActiveCategory('product')}
          >
            Product Updates
          </button>
          <button
            className={`category-button ${activeCategory === 'company' ? 'active' : ''}`}
            onClick={() => setActiveCategory('company')}
          >
            Company News
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news
            .filter(item => activeCategory === 'all' || item.category === activeCategory)
            .map(item => (
              <article
                key={item.id}
                className="bg-darker rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-accent text-sm">{item.date}</span>
                  <h2 className="text-xl font-bold mt-2 mb-4">{item.title}</h2>
                  <p className="text-gray-400">{item.excerpt}</p>
                  <button className="mt-4 text-accent hover:underline">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 