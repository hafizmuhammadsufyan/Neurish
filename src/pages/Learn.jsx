import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import ArticleModal from '../components/ArticleModal';
import EmptyState from '../components/EmptyState';

export default function Learn() {
  const { articles } = useApp();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    'All',
    'Cognitive Development',
    'Emotional Development',
    'Communication',
    'Behavior',
    'Sleep',
    'Nutrition',
    'Screen Time',
    'Learning Through Play',
    'Parent Wellbeing'
  ];

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.source.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between align-center" style={{ marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="text-3xl font-bold">Knowledge Hub</h1>
          <p className="text-sm text-secondary-color">
            Evidence-based parenting advice and childhood developmental neuroscience.
          </p>
        </div>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: 12, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)' 
            }} 
          />
          <input 
            type="text" 
            placeholder="Search verified articles..." 
            className="input-field" 
            style={{ paddingLeft: 36, height: 40 }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categorized filter row */}
      <div className="tabs-header" style={{ marginBottom: 32 }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={{ borderBottomWidth: 2 }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <EmptyState 
          title="No articles found" 
          message={searchQuery ? `We couldn't find any articles matching "${searchQuery}".` : "No articles are currently available in this category."}
          actionText={searchQuery ? "Clear Search" : "Show All Topics"}
          onAction={() => {
            setSearchQuery('');
            setActiveCategory('All');
          }}
        />
      ) : (
        <div className="grid grid-3">
          {filteredArticles.map(art => (
            <ArticleCard 
              key={art.id} 
              article={art} 
              onOpen={() => setSelectedArticle(art)} 
            />
          ))}
        </div>
      )}

      {/* Full guide reader modal */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}
    </div>
  );
}
