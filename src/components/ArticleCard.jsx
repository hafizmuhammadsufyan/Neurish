import React from 'react';
import { Bookmark, BookmarkCheck, Clock, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ArticleCard({ article, onOpen }) {
  const { savedArticles, toggleSaveArticle } = useApp();
  const isSaved = savedArticles.includes(article.id);

  return (
    <div className="card card-interactive flex flex-col justify-between" style={{
      borderColor: isSaved ? '#FEF3C7' : 'var(--border)',
      boxShadow: isSaved ? '0 4px 6px -1px rgba(245, 158, 11, 0.05)' : 'var(--shadow-sm)'
    }}>
      <div>
        <div className="flex justify-between align-center" style={{ marginBottom: 12 }}>
          <span className="badge text-xs" style={{ backgroundColor: '#FFFBEB', color: '#D97706', border: '1px solid #FCD34D' }}>
            {article.category}
          </span>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              toggleSaveArticle(article.id); 
            }} 
            style={{ 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              color: isSaved ? '#F59E0B' : 'var(--text-muted)',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              transition: 'color 0.2s ease'
            }}
            title={isSaved ? "Saved Guide" : "Save Guide"}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>
        
        <h3 className="card-title text-base" onClick={onOpen} style={{ cursor: 'pointer', hover: { color: 'var(--primary)' } }}>
          {article.title}
        </h3>
        <p className="text-xs text-secondary-color" style={{ marginBottom: 16, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {article.summary}
        </p>
      </div>
      
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 12 }}>
        <div className="flex justify-between align-center" style={{ marginBottom: 8 }}>
          <span className="text-xs text-muted-color flex align-center gap-4">
            <Clock size={12} /> {article.readTime}
          </span>
          <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Age: {article.ageGroup}
          </span>
        </div>
        
        <div className="flex justify-between align-center">
          <span className="science-ref-badge text-xs" style={{ fontSize: 10 }}>
            <Award size={10} style={{ marginRight: 2 }} /> {article.source}
          </span>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ padding: '4px 8px', fontSize: 11 }} 
            onClick={onOpen}
          >
            Read Guide
          </button>
        </div>
      </div>
    </div>
  );
}
