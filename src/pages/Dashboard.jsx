import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentVlogs, setRecentVlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from backend
    setTimeout(() => {
      setStats({
        totalVlogs: 24,
        totalViews: 156800,
        totalLikes: 12450,
        totalEarnings: 24560,
        subscribers: 1245,
        watchTime: '456 hours'
      });

      setRecentVlogs([
        {
          id: 1,
          title: 'Sunrise at Taj Mahal',
          views: 15600,
          likes: 1240,
          earnings: 2450,
          uploadDate: '2 days ago',
          thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 2,
          title: 'Kerala Backwaters Tour',
          views: 22300,
          likes: 2100,
          earnings: 3890,
          uploadDate: '1 week ago',
          thumbnail: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 3,
          title: 'Goa Beach Adventure',
          views: 45100,
          likes: 3800,
          earnings: 5670,
          uploadDate: '2 weeks ago',
          thumbnail: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const dashboardCards = [
    {
      title: 'Upload New Vlog',
      description: 'Share your travel experience',
      icon: 'fas fa-upload',
      color: '#4CAF50',
      action: () => navigate('/uploadvlog')
    },
    {
      title: 'My Vlogs',
      description: 'View and manage all vlogs',
      icon: 'fas fa-video',
      color: '#2196F3',
      action: () => navigate('/uploadedvlogs')
    },
    {
      title: 'Analytics',
      description: 'View detailed statistics',
      icon: 'fas fa-chart-bar',
      color: '#FF9800',
      action: () => navigate('/analytics')
    },
    {
      title: 'Earnings',
      description: 'Track your revenue',
      icon: 'fas fa-rupee-sign',
      color: '#9C27B0',
      action: () => navigate('/earnings')
    },
    {
      title: 'Subscribers',
      description: 'Manage your audience',
      icon: 'fas fa-users',
      color: '#F44336',
      action: () => navigate('/subscribers')
    },
    {
      title: 'Settings',
      description: 'Customize your profile',
      icon: 'fas fa-cog',
      color: '#607D8B',
      action: () => navigate('/settings')
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-container">
        <Header user={user} onLogout={onLogout} />
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header user={user} onLogout={onLogout} />
      
      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome back, {user?.name}!</h1>
            <p>Here's what's happening with your travel vlogs today</p>
          </div>
          <div className="date-info">
            <i className="fas fa-calendar"></i>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#4CAF50' }}>
              <i className="fas fa-video"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.totalVlogs}</h3>
              <p>Total Vlogs</p>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 12%
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#2196F3' }}>
              <i className="fas fa-eye"></i>
            </div>
            <div className="stat-info">
              <h3>{(stats.totalViews / 1000).toFixed(1)}K</h3>
              <p>Total Views</p>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 24%
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#FF9800' }}>
              <i className="fas fa-heart"></i>
            </div>
            <div className="stat-info">
              <h3>{(stats.totalLikes / 1000).toFixed(1)}K</h3>
              <p>Total Likes</p>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 18%
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#9C27B0' }}>
              <i className="fas fa-rupee-sign"></i>
            </div>
            <div className="stat-info">
              <h3>₹{(stats.totalEarnings / 1000).toFixed(1)}K</h3>
              <p>Total Earnings</p>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 32%
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {dashboardCards.map((card, index) => (
            <div 
              key={index} 
              className="dashboard-card"
              onClick={card.action}
              style={{ '--card-color': card.color }}
            >
              <div className="card-icon" style={{ background: card.color }}>
                <i className={card.icon}></i>
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
              <div className="card-arrow">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <div className="section-header">
            <h2>Recent Vlogs</h2>
            <button 
              className="btn btn-outline"
              onClick={() => navigate('/uploadedvlogs')}
            >
              View All
            </button>
          </div>

          <div className="vlogs-table">
            <table>
              <thead>
                <tr>
                  <th>Vlog</th>
                  <th>Views</th>
                  <th>Likes</th>
                  <th>Earnings</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentVlogs.map(vlog => (
                  <tr key={vlog.id}>
                    <td className="vlog-info-cell">
                      <div className="vlog-thumb">
                        <img src={vlog.thumbnail} alt={vlog.title} />
                      </div>
                      <div className="vlog-title">
                        <h4>{vlog.title}</h4>
                        <span className="vlog-id">ID: #{vlog.id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="stat-cell">
                        <i className="fas fa-eye"></i>
                        {vlog.views.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="stat-cell">
                        <i className="fas fa-heart"></i>
                        {vlog.likes.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="stat-cell earnings">
                        <i className="fas fa-rupee-sign"></i>
                        ₹{vlog.earnings.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        {vlog.uploadDate}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view"
                          onClick={() => navigate(`/viewvlog/${vlog.id}`)}
                        >
                          <i className="fas fa-play"></i>
                        </button>
                        <button 
                          className="action-btn edit"
                          onClick={() => navigate(`/editvlog/${vlog.id}`)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="action-btn analytics"
                          onClick={() => navigate(`/analytics/${vlog.id}`)}
                        >
                          <i className="fas fa-chart-bar"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons-grid">
            <button 
              className="action-card"
              onClick={() => navigate('/uploadvlog')}
            >
              <i className="fas fa-plus"></i>
              <span>Upload New</span>
            </button>
            <button 
              className="action-card"
              onClick={() => navigate('/schedule')}
            >
              <i className="fas fa-calendar-plus"></i>
              <span>Schedule</span>
            </button>
            <button 
              className="action-card"
              onClick={() => navigate('/analytics')}
            >
              <i className="fas fa-chart-line"></i>
              <span>Analytics</span>
            </button>
            <button 
              className="action-card"
              onClick={() => navigate('/earnings')}
            >
              <i className="fas fa-wallet"></i>
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;