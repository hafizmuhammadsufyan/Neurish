import React from 'react';
import { X, Clock, AlertCircle, Book, Lightbulb, Leaf, ShieldCheck } from 'lucide-react';

export default function RecipeModal({ nutrition, onClose }) {
  if (!nutrition) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          <X size={20} />
        </button>

        {/* Header with Image and Title */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 72,
            height: 72,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '18px',
            backgroundColor: 'var(--primary-light)'
          }}>
            <Leaf size={32} color="var(--primary)" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', margin: 0 }}>
              {nutrition.name}
            </h2>
            <span className="badge" style={{ 
              backgroundColor: '#FFFBEB', 
              color: '#D97706', 
              border: '1px solid #FCD34D', 
              marginTop: 8 
            }}>
              {nutrition.ageGroup}
            </span>
          </div>
        </div>

        {/* Quick Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 16, 
          marginBottom: 24,
          padding: '16px',
          backgroundColor: 'var(--bg-app)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div>
            <span className="text-xs text-muted-color" style={{ display: 'block', marginBottom: 4 }}>Prep Time</span>
            <span className="font-semibold flex align-center gap-4">
              <Clock size={14} /> {nutrition.prepTime}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-color" style={{ display: 'block', marginBottom: 4 }}>Age Suitable</span>
            <span className="font-semibold">{nutrition.agesSuitable}</span>
          </div>
        </div>

        {/* Brain Benefits */}
        <div style={{ marginBottom: 20 }}>
          <h4 className="text-sm font-bold text-primary-color" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lightbulb size={16} /> Brain Development Benefits
          </h4>
          <p className="text-sm text-secondary-color" style={{ lineHeight: 1.6, margin: 0 }}>
            {nutrition.brainBenefits}
          </p>
        </div>

        {/* Body Benefits */}
        <div style={{ marginBottom: 20 }}>
          <h4 className="text-sm font-bold text-primary-color" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={16} /> Physical Development Benefits
          </h4>
          <p className="text-sm text-secondary-color" style={{ lineHeight: 1.6, margin: 0 }}>
            {nutrition.bodyBenefits}
          </p>
        </div>

        {/* Key Nutrients */}
        <div style={{ marginBottom: 20 }}>
          <h4 className="text-sm font-bold text-primary-color" style={{ marginBottom: 12 }}>
            Key Nutrients
          </h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {nutrition.nutrients.map((nutrient, idx) => (
              <span key={idx} className="badge" style={{ fontSize: 11, backgroundColor: '#FFFBEB', color: '#D97706' }}>
                {nutrient}
              </span>
            ))}
          </div>
        </div>

        {/* Preparation */}
        <div style={{ 
          backgroundColor: 'var(--bg-app)', 
          padding: 16, 
          borderRadius: 'var(--radius-lg)',
          marginBottom: 20,
          borderLeft: '4px solid var(--primary)'
        }}>
          <h4 className="text-sm font-bold text-primary-color" style={{ marginBottom: 12 }}>
            Step-by-Step Preparation
          </h4>
          <p className="text-sm text-secondary-color" style={{ lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}>
            {nutrition.preparation}
          </p>
        </div>

        {/* Safety Notes */}
        <div style={{ 
          backgroundColor: '#FEF3C7', 
          padding: 16, 
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid #D97706',
          marginBottom: 20
        }}>
          <h4 className="text-sm font-bold" style={{ marginBottom: 8, color: '#92400E', display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={16} /> Safety & Introduction Notes
          </h4>
          <ul className="text-sm text-secondary-color" style={{ margin: 0, paddingLeft: 20, lineHeight: 1.6 }}>
            <li>Always consult with your pediatrician before introducing new foods.</li>
            <li>Watch for allergic reactions: rashes, swelling, breathing difficulty.</li>
            <li>Introduce one food at a time, waiting 3-5 days before adding another.</li>
            <li>Ensure proper food temperature and texture for your child's age.</li>
            <li>Keep all preparation surfaces and utensils clean.</li>
          </ul>
        </div>

        {/* Research Sources */}
        <div>
          <h4 className="text-sm font-bold text-primary-color" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Book size={16} /> Research References
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {nutrition.researchSources.map((source, idx) => (
              <a 
                key={idx}
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs"
                style={{ 
                  color: 'var(--primary)', 
                  textDecoration: 'underline',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-app)',
                  display: 'block'
                }}
              >
                📖 {source.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
