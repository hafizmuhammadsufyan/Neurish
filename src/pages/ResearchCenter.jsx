import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ExternalLink, ShieldCheck, Database, Award, HelpCircle } from 'lucide-react';
import ResearchCard from '../components/ResearchCard';
import researchService from '../services/researchService';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

export default function ResearchCenter() {
  const { researchSources } = useApp();

  // Search filter states
  const [query, setQuery] = useState('');
  const [orgFilter, setOrgFilter] = useState('All');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination placeholder states
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalResults: 0 });

  // Load initial results
  useEffect(() => {
    handleSearch(1);
  }, [orgFilter]);

  const handleSearch = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await researchService.searchLocal({
        query,
        organizationId: orgFilter,
        page,
        limit: 4
      });
      if (response.status === 'success') {
        setResults(response.results);
        setPagination(response.pagination);
      } else {
        throw new Error('Unsuccessful search fetch operation');
      }
    } catch (err) {
      setError(err.message || 'Failed to complete research query.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(1);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 className="text-3xl font-bold">Research Center</h1>
        <p className="text-sm text-secondary-color">
          The scientific foundations, clinical guidelines, and evidence-based records supporting Neurish.
        </p>
      </div>

      {/* Trust Foundations: Partner profiles */}
      <section className="card" style={{ marginBottom: 32 }}>
        <h3 className="card-title" style={{ marginBottom: 12, color: 'var(--text-primary)' }}>
          Verified Sourcing Organizations
        </h3>
        <p className="text-sm text-secondary-color" style={{ marginBottom: 24, lineHeight: 1.5 }}>
          Neurish is built on research findings and clinical practice guidelines established by leading local and global pediatric authority bodies. 
          We strictly follow a <strong style={{ color: 'var(--text-primary)' }}>No Fabricated Research Policy</strong>.
        </p>
        
        <div className="grid grid-3" style={{ gap: 20 }}>
          {researchSources.slice(0, 6).map(src => (
            <ResearchCard key={src.id} source={src} />
          ))}
        </div>
      </section>

      {/* Dynamic Search Explorer */}
      <section>
        <div style={{ marginBottom: 20 }}>
          <h3 className="text-xl font-bold" style={{ marginBottom: 6, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Database size={20} style={{ color: 'var(--primary)' }} /> 
            Scientific Studies Explorer
          </h3>
          <p className="text-xs text-secondary-color" style={{ margin: 0 }}>
            <strong>MVP Mode Notice:</strong> Currently searching local verified research dataset only. External API query engines are prepared for production.
          </p>
        </div>

        {/* Search controls */}
        <form onSubmit={handleFormSubmit} className="card" style={{ padding: '20px', marginBottom: 24, backgroundColor: '#FFFDF5', borderColor: '#FEF3C7' }}>
          <div className="flex gap-16" style={{ flexWrap: 'wrap', alignItems: 'flex-end', gap: 12 }}>
            <div className="input-group" style={{ flex: '2 1 250px' }}>
              <label className="input-label" style={{ color: '#78350F' }}>Search Keyword / Subject</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="e.g. Screen time, vocabulary, play, tantrums..." 
                  className="input-field"
                  style={{ paddingLeft: 36, borderColor: '#FCD34D', background: 'white' }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group" style={{ flex: '1 1 180px' }}>
              <label className="input-label" style={{ color: '#78350F' }}>Filter Organization</label>
              <select 
                className="input-field" 
                style={{ borderColor: '#FCD34D', background: 'white' }}
                value={orgFilter}
                onChange={(e) => setOrgFilter(e.target.value)}
              >
                <option value="All">All Organizations</option>
                {researchSources.map(org => (
                  <option key={org.id} value={org.id}>{org.logoText} - {org.name.split(' (')[0]}</option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ backgroundColor: '#F59E0B', borderColor: '#F59E0B', flexShrink: 0, height: '45px', padding: '0 24px' }}
            >
              Search Records
            </button>
          </div>
        </form>

        {/* Results Area */}
        {loading ? (
          <SkeletonLoader count={2} />
        ) : error ? (
          <ErrorState 
            title="Search Failure" 
            message={error} 
            onRetry={() => handleSearch(1)} 
          />
        ) : results.length === 0 ? (
          <EmptyState 
            title="No verified studies found" 
            message="No local research matches your search filters. Try using broader keywords like 'play', 'screen', or 'tantrums'." 
            actionText="Reset Search"
            onAction={() => {
              setQuery('');
              setOrgFilter('All');
            }}
          />
        ) : (
          <div className="flex flex-col gap-16" style={{ marginBottom: 24 }}>
            {results.map(study => (
              <div 
                key={study.id} 
                className="card" 
                style={{ 
                  borderLeft: '4px solid #F59E0B',
                  backgroundColor: 'white',
                  padding: '20px'
                }}
              >
                <div className="flex justify-between align-center" style={{ marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <span className="badge text-xs" style={{ backgroundColor: '#FEF3C7', color: '#D97706', border: '1px solid #FCD34D' }}>
                    <Award size={10} style={{ marginRight: 4, display: 'inline' }} /> 
                    {study.source}
                  </span>
                  <span className="text-xs text-muted-color">Published: {study.year} • {study.evidenceLevel}</span>
                </div>
                
                <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 10px', color: 'var(--text-primary)' }}>
                  {study.title}
                </h4>
                
                <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.5 }}>
                  <strong>Key Scientific Finding:</strong> {study.finding}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  <a 
                    href={study.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-text text-xs"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    View Official Publication <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}

            {/* Pagination Placeholder UI */}
            {pagination.totalPages > 1 && (
              <div className="flex align-center gap-12" style={{ justifyContent: 'center', marginTop: 12 }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  disabled={pagination.currentPage === 1}
                  onClick={() => handleSearch(pagination.currentPage - 1)}
                >
                  Previous
                </button>
                <span className="text-xs text-muted-color">
                  Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalResults} results)
                </span>
                <button 
                  className="btn btn-secondary btn-sm"
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => handleSearch(pagination.currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Future API Integrations preview roadmap */}
      <section className="card" style={{ marginTop: 40, borderStyle: 'dashed', backgroundColor: 'var(--bg-app)' }}>
        <h4 className="text-base font-bold flex align-center gap-8" style={{ margin: '0 0 12px', color: 'var(--text-primary)' }}>
          <HelpCircle size={16} /> Production Database Routing Roadmap
        </h4>
        <p className="text-xs text-secondary-color" style={{ lineHeight: 1.5, margin: 0 }}>
          The service architecture is abstractly structured to swap search queries dynamically. When connecting to production databases, we can toggle options for <strong>PubMed API</strong> (fetching clinical trials), <strong>CrossRef API</strong> (accessing metadata DOIs), <strong>Europe PMC API</strong>, or a centralized <strong>Laravel Research API</strong> aggregator cache.
        </p>
      </section>
    </div>
  );
}
