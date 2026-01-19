// src/pages/UploadedVlogs.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/UploadedVlogs.css';

const UploadedVlogs = ({ user, onLogout }) => {
  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setVlogs([
        {
          id: 1,
          title: 'Sunrise at Taj Mahal - Magical Morning Experience',
          description: 'Witnessing the sunrise at Taj Mahal',
          thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          views: 15600,
          likes: 1240,
          earnings: 2450,
          uploadDate: '2024-03-15',
          status: 'published',
          location: 'Agra, Uttar Pradesh'
        },
        {
          id: 2,
          title: 'Kerala Backwaters Houseboat Living',
          description: '3 days living on a traditional houseboat',
          thumbnail: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          views: 22300,
          likes: 2100,
          earnings: 3890,
          uploadDate: '2024-03-10',
          status: 'published',
          location: 'Alleppey, Kerala'
        },
        {
          id: 3,
          title: 'Goa Beach Hopping Adventure',
          description: '12 beaches in 72 hours',
          thumbnail: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          views: 45100,
          likes: 3800,
          earnings: 5670,
          uploadDate: '2024-03-05',
          status: 'published',
          location: 'Goa'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="uploadedvlogs-container">
        <Header user={user} onLogout={onLogout} />
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your vlogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="uploadedvlogs-container">
      <Header user={user} onLogout={onLogout} />
      
      <div className="uploadedvlogs-content">
        <div className="page-header">
          <div className="header-content">
            <h1>My Vlogs</h1>
            <p>Manage and track performance of your uploaded travel vlogs</p>
          </div>
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Upload New Vlog
          </button>
        </div>

        <div className="vlogs-grid">
          {vlogs.map(vlog => (
            <div key={vlog.id} className="vlog-card">
              <div className="vlog-thumbnail">
                <img src={vlog.thumbnail} alt={vlog.title} />
                <span className="duration">12:45</span>
                <span className="status published">Published</span>
              </div>
              
              <div className="vlog-info">
                <h3 className="vlog-title">{vlog.title}</h3>
                <p className="vlog-description">{vlog.description}</p>
                
                <div className="vlog-meta">
                  <span className="location">
                    <i className="fas fa-map-marker-alt"></i>
                    {vlog.location}
                  </span>
                </div>
                
                <div className="vlog-stats">
                  <div className="stat">
                    <i className="fas fa-eye"></i>
                    {vlog.views.toLocaleString()}
                  </div>
                  <div className="stat">
                    <i className="fas fa-heart"></i>
                    {vlog.likes.toLocaleString()}
                  </div>
                  <div className="stat earnings">
                    <i className="fas fa-rupee-sign"></i>
                    ₹{vlog.earnings.toLocaleString()}
                  </div>
                </div>
                
                <div className="vlog-actions">
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-edit"></i>
                    Edit
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-chart-bar"></i>
                    Analytics
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-play"></i>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadedVlogs;