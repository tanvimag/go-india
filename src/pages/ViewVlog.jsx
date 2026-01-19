// src/pages/ViewVlog.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/ViewVlog.css';

const ViewVlog = ({ user, onLogout }) => {
  const { id } = useParams();
  const [vlog, setVlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setVlog({
        id: id || 1,
        title: 'Sunrise at Taj Mahal - Magical Morning Experience',
        description: 'Witnessing the sunrise at one of the world\'s most beautiful monuments was absolutely breathtaking. The way the morning light gradually changes the white marble from soft pink to brilliant white is an experience that will stay with me forever.',
        creator: {
          name: 'TravelWithRahul',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
          subscribers: '125K'
        },
        thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        duration: '12:45',
        views: 15600,
        likes: 1240,
        uploadDate: '2024-03-15',
        location: 'Agra, Uttar Pradesh',
        category: 'Heritage & Culture'
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="viewvlog-container">
        <Header user={user} onLogout={onLogout} />
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading vlog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="viewvlog-container">
      <Header user={user} onLogout={onLogout} />
      
      <div className="viewvlog-content">
        <div className="video-section">
          <div className="video-player">
            <div className="video-placeholder">
              <img src={vlog.thumbnail} alt={vlog.title} />
              <div className="play-button">
                <i className="fas fa-play"></i>
              </div>
            </div>
          </div>

          <div className="video-info">
            <h1 className="video-title">{vlog.title}</h1>
            
            <div className="video-meta">
              <div className="views-date">
                <span className="views">{vlog.views.toLocaleString()} views</span>
                <span className="upload-date">
                  {new Date(vlog.uploadDate).toLocaleDateString()}
                </span>
              </div>
              <div className="video-stats">
                <button className="stat-btn like-btn">
                  <i className="fas fa-heart"></i>
                  <span>{vlog.likes.toLocaleString()}</span>
                </button>
                <button className="stat-btn">
                  <i className="fas fa-share"></i>
                  <span>Share</span>
                </button>
                <button className="stat-btn save-btn">
                  <i className="fas fa-bookmark"></i>
                  <span>Save</span>
                </button>
              </div>
            </div>

            <div className="creator-info">
              <div className="creator-avatar">
                <img src={vlog.creator.avatar} alt={vlog.creator.name} />
              </div>
              <div className="creator-details">
                <h3>{vlog.creator.name}</h3>
                <p>{vlog.creator.subscribers} subscribers</p>
              </div>
              <button className="subscribe-btn">
                Subscribe
              </button>
            </div>

            <div className="vlog-description">
              <p>{vlog.description}</p>
              
              <div className="vlog-details">
                <div className="detail-item">
                  <strong>Location:</strong> {vlog.location}
                </div>
                <div className="detail-item">
                  <strong>Category:</strong> {vlog.category}
                </div>
              </div>

              <div className="tags">
                <span className="tag">#tajmahal</span>
                <span className="tag">#agra</span>
                <span className="tag">#sunrise</span>
                <span className="tag">#heritage</span>
                <span className="tag">#travelindia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVlog;