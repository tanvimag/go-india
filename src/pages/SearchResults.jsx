// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/SearchResults.css';

const SearchResults = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState('all'); // all, vlogs, destinations

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, searchType]);

  const performSearch = async (searchTerm) => {
    setLoading(true);
    
    // Simulate API search with different results based on type
    setTimeout(() => {
      const mockResults = {
        all: [
          {
            id: 1,
            type: 'vlog',
            title: `Amazing ${searchTerm} Adventure`,
            description: `Exploring the beauty of ${searchTerm} with local guides`,
            image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&auto=format&fit=crop',
            views: '15K',
            duration: '18:30'
          },
          {
            id: 2,
            type: 'destination',
            name: `${searchTerm} Mountains`,
            description: `Visit the stunning ${searchTerm} region for breathtaking views`,
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop',
            rating: 4.8,
            vlogs: 125
          },
          {
            id: 3,
            type: 'vlog',
            title: `${searchTerm} Food Tour`,
            description: `Tasting the best local cuisine in ${searchTerm}`,
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop',
            views: '28K',
            duration: '22:15'
          }
        ],
        vlogs: [
          {
            id: 1,
            type: 'vlog',
            title: `${searchTerm} Travel Guide`,
            description: `Complete travel guide for ${searchTerm}`,
            image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&auto=format&fit=crop',
            views: '32K',
            duration: '25:40'
          }
        ],
        destinations: [
          {
            id: 1,
            type: 'destination',
            name: `${searchTerm} Heritage Site`,
            description: `Explore the rich heritage of ${searchTerm}`,
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop',
            rating: 4.7,
            vlogs: 89
          }
        ]
      };

      setResults(mockResults[searchType] || mockResults.all);
      setLoading(false);
    }, 1500);
  };

  const handleResultClick = (result) => {
    if (result.type === 'vlog') {
      navigate(`/viewvlog/${result.id}`);
    } else {
      navigate(`/viewvlog?destination=${encodeURIComponent(result.name)}`);
    }
  };

  return (
    <div className="search-container">
      <Header user={user} onLogout={onLogout} />
      
      <div className="search-content">
        <div className="search-header">
          <h1>Search Results</h1>
          <p className="search-query">Showing results for: <strong>"{query}"</strong></p>
          
          <div className="search-filters">
            <button 
              className={`filter-btn ${searchType === 'all' ? 'active' : ''}`}
              onClick={() => setSearchType('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${searchType === 'vlogs' ? 'active' : ''}`}
              onClick={() => setSearchType('vlogs')}
            >
              Vlogs
            </button>
            <button 
              className={`filter-btn ${searchType === 'destinations' ? 'active' : ''}`}
              onClick={() => setSearchType('destinations')}
            >
              Destinations
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-results">
            <div className="spinner"></div>
            <p>Searching for "{query}"...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="results-grid">
            {results.map(result => (
              <div 
                key={result.id} 
                className="result-card"
                onClick={() => handleResultClick(result)}
              >
                <div className="result-image">
                  <img src={result.image} alt={result.title || result.name} />
                  {result.type === 'vlog' && (
                    <div className="result-badge">
                      <i className="fas fa-play"></i> Vlog
                    </div>
                  )}
                  {result.type === 'destination' && (
                    <div className="result-badge">
                      <i className="fas fa-map-marker-alt"></i> Destination
                    </div>
                  )}
                </div>
                <div className="result-info">
                  {result.type === 'vlog' ? (
                    <>
                      <h3>{result.title}</h3>
                      <p>{result.description}</p>
                      <div className="result-meta">
                        <span><i className="fas fa-eye"></i> {result.views}</span>
                        <span><i className="fas fa-clock"></i> {result.duration}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{result.name}</h3>
                      <p>{result.description}</p>
                      <div className="result-meta">
                        <span><i className="fas fa-star"></i> {result.rating}/5</span>
                        <span><i className="fas fa-video"></i> {result.vlogs} vlogs</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No results found for "{query}"</h3>
            <p>Try searching with different keywords or browse our popular categories</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;