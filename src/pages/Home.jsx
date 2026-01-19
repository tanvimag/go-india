// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Home.css';

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [featuredVlogs, setFeaturedVlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data with UNIQUE images
    setTimeout(() => {
      setDestinations([
        {
          id: 1,
          name: 'Taj Mahal, Agra',
          description: 'The iconic white marble mausoleum and UNESCO World Heritage Site',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop',
          type: 'Heritage',
          rating: 4.8,
          vlogs: 245
        },
        {
          id: 2,
          name: 'Kerala Backwaters',
          description: 'Serene network of lakes, canals and lagoons',
          image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=500&auto=format&fit=crop',
          type: 'Nature',
          rating: 4.9,
          vlogs: 189
        },
        {
          id: 3,
          name: 'Goa Beaches',
          description: 'Pristine beaches with Portuguese heritage',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&auto=format&fit=crop',
          type: 'Beach',
          rating: 4.7,
          vlogs: 312
        },
        {
          id: 4,
          name: 'Jaipur Palace',
          description: 'The Pink City of Rajasthan with stunning architecture',
          image: 'https://images.unsplash.com/photo-1524307875964-4c93d5c57229?w=500&auto=format&fit=crop',
          type: 'Heritage',
          rating: 4.6,
          vlogs: 178
        },
        {
          id: 5,
          name: 'Ladakh Mountains',
          description: 'Majestic Himalayan landscapes and adventure sports',
          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop',
          type: 'Adventure',
          rating: 4.9,
          vlogs: 145
        },
        {
          id: 6,
          name: 'Varanasi Ghats',
          description: 'Spiritual capital of India on the banks of Ganges',
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop',
          type: 'Spiritual',
          rating: 4.7,
          vlogs: 210
        }
      ]);

      setFeaturedVlogs([
        {
          id: 1,
          title: 'Sunrise at Taj Mahal',
          creator: 'TravelWithRahul',
          views: '15K',
          duration: '12:45',
          thumbnail: 'https://images.unsplash.com/photo-1621401621595-85d6242c06c9?w=500&auto=format&fit=crop'
        },
        {
          id: 2,
          title: 'Kerala Houseboat Life',
          creator: 'BackwaterExplorer',
          views: '22K',
          duration: '18:30',
          thumbnail: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=500&auto=format&fit=crop'
        },
        {
          id: 3,
          title: 'Goa Nightlife Guide',
          creator: 'BeachPartyVibes',
          views: '45K',
          duration: '25:15',
          thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop'
        },
        {
          id: 4,
          title: 'Rajasthan Desert Safari',
          creator: 'DesertAdventurer',
          views: '32K',
          duration: '20:10',
          thumbnail: 'https://images.unsplash.com/photo-1524230659092-07f98a6b86d8?w=500&auto=format&fit=crop'
        },
        {
          id: 5,
          title: 'Himalayan Trekking Guide',
          creator: 'MountainExplorer',
          views: '28K',
          duration: '30:45',
          thumbnail: 'https://images.unsplash.com/photo-1536152471326-642d946b4c4e?w=500&auto=format&fit=crop'
        },
        {
          id: 6,
          title: 'South Indian Food Tour',
          creator: 'FoodieExplorer',
          views: '38K',
          duration: '22:20',
          thumbnail: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/search?q=${tag}`);
  };

  const handleWatchVlog = (vlogId) => {
    navigate(`/viewvlog/${vlogId}`);
  };

  if (loading) {
    return (
      <div className="home-container">
        <Header user={user} onLogout={onLogout} />
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Header user={user} onLogout={onLogout} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Incredible India</h1>
          <p>Explore the diversity, culture, and beauty of India through authentic travel experiences</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <i className="fas fa-search"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, vlogs, or experiences..."
                className="search-input"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
            <div className="quick-tags">
              {['Himalayas', 'Beaches', 'Heritage', 'Wildlife', 'Food', 'Adventure'].map((tag) => (
                <span 
                  key={tag}
                  className="tag" 
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Featured Vlogs */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Travel Vlogs</h2>
            <button className="view-all" onClick={() => navigate('/viewvlog')}>
              View All
            </button>
          </div>
          
          <div className="vlogs-grid">
            {featuredVlogs.map(vlog => (
              <div key={vlog.id} className="vlog-card" onClick={() => handleWatchVlog(vlog.id)}>
                <div className="vlog-thumbnail">
                  <img src={vlog.thumbnail} alt={vlog.title} />
                  <span className="duration">{vlog.duration}</span>
                </div>
                <div className="vlog-info">
                  <h3>{vlog.title}</h3>
                  <p className="creator">By {vlog.creator}</p>
                  <div className="vlog-meta">
                    <span><i className="fas fa-eye"></i> {vlog.views}</span>
                    <button className="watch-btn">
                      <i className="fas fa-play"></i> Watch
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Popular Destinations</h2>
            <p className="section-subtitle">Explore the most visited places in India</p>
          </div>
          
          <div className="destinations-grid">
            {destinations.map(destination => (
              <div key={destination.id} className="destination-card">
                <div className="destination-image">
                  <img src={destination.image} alt={destination.name} />
                  <div className="image-overlay">
                    <span className="type-badge">{destination.type}</span>
                  </div>
                </div>
                <div className="destination-info">
                  <div className="destination-header">
                    <h3>{destination.name}</h3>
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                  <p className="description">{destination.description}</p>
                  <div className="destination-footer">
                    <span className="vlogs-count">
                      <i className="fas fa-video"></i> {destination.vlogs} vlogs
                    </span>
                    <button 
                      className="explore-btn"
                      onClick={() => navigate(`/viewvlog?destination=${encodeURIComponent(destination.name)}`)}
                    >
                      Explore <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section className="cta-section">
  <div className="container">
    <div className="cta-content">
      <h2>Ready to Share Your Journey?</h2>
      <p>Upload your travel vlogs and inspire others to explore India</p>
      <div className="cta-buttons">
        <a href="/uploadvlog" className="btn btn-primary btn-lg">
          <i className="fas fa-upload"></i> Upload Vlog
        </a>
        <a href="/booktrip" className="btn btn-success btn-lg">
          <i className="fas fa-plane"></i> Book My Trip
        </a>
        <a href="/dashboard" className="btn btn-outline btn-lg">
          <i className="fas fa-chart-line"></i> View Dashboard
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;