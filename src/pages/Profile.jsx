import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/Profile.css';

const Profile = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Travel Explorer',
    email: 'explorer@example.com',
    bio: 'Passionate traveler exploring the incredible diversity of India. Love capturing moments and sharing experiences.',
    location: 'Mumbai, India',
    website: 'https://my-travel-blog.com',
    joinDate: 'January 15, 2024',
    social: {
      youtube: 'https://youtube.com/@traveler',
      instagram: 'https://instagram.com/traveler',
      twitter: 'https://twitter.com/traveler'
    }
  });

  const [stats, setStats] = useState({
    vlogs: 24,
    followers: '1.2K',
    following: 356,
    likes: '4.5K',
    views: '125K',
    watchTime: '456 hours'
  });

  const [recentVlogs, setRecentVlogs] = useState([]);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setRecentVlogs([
        {
          id: 1,
          title: 'Sunrise at Taj Mahal',
          views: '15K',
          likes: '1.2K',
          uploadDate: '2 days ago',
          thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 2,
          title: 'Kerala Backwaters Tour',
          views: '22K',
          likes: '2.1K',
          uploadDate: '1 week ago',
          thumbnail: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 3,
          title: 'Goa Beach Adventure',
          views: '18K',
          likes: '1.8K',
          uploadDate: '2 weeks ago',
          thumbnail: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        }
      ]);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const [parent, child] = name.split('.');
      setProfile({
        ...profile,
        social: {
          ...profile.social,
          [child]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <Header user={user} onLogout={onLogout} />
      
      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="cover-photo">
            <div className="cover-overlay">
              <h1>My Profile</h1>
              <p>Manage your personal information and preferences</p>
            </div>
          </div>
          
          <div className="profile-info">
            <div className="avatar-section">
              <div className="profile-avatar">
                {profile.name.charAt(0)}
              </div>
              <button 
                className="edit-avatar-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                <i className="fas fa-camera"></i>
              </button>
            </div>
            
            <div className="profile-main-info">
              <div className="profile-details">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Your name"
                  />
                ) : (
                  <h1>{profile.name}</h1>
                )}
                
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="edit-textarea"
                    placeholder="Tell us about yourself"
                    rows="3"
                  />
                ) : (
                  <p className="bio">{profile.bio}</p>
                )}
                
                <div className="profile-meta">
                  <div className="meta-item">
                    <i className="fas fa-map-marker-alt"></i>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleInputChange}
                        className="edit-input-sm"
                        placeholder="Location"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-calendar"></i>
                    <span>Joined {profile.joinDate}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-link"></i>
                    {isEditing ? (
                      <input
                        type="url"
                        name="website"
                        value={profile.website}
                        onChange={handleInputChange}
                        className="edit-input-sm"
                        placeholder="Website"
                      />
                    ) : (
                      <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        {profile.website}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="profile-actions">
                <button 
                  className="btn btn-primary"
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  <i className={isEditing ? 'fas fa-save' : 'fas fa-edit'}></i>
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-share-alt"></i>
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div className="profile-body">
          {/* Left Sidebar */}
          <div className="profile-sidebar">
            {/* Stats */}
            <div className="stats-card">
              <h3>Your Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{stats.vlogs}</div>
                  <div className="stat-label">Vlogs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.views}</div>
                  <div className="stat-label">Views</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.likes}</div>
                  <div className="stat-label">Likes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.followers}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.following}</div>
                  <div className="stat-label">Following</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.watchTime}</div>
                  <div className="stat-label">Watch Time</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-card">
              <h3>Social Links</h3>
              <div className="social-links">
                <div className="social-link">
                  <i className="fab fa-youtube"></i>
                  {isEditing ? (
                    <input
                      type="url"
                      name="social.youtube"
                      value={profile.social.youtube}
                      onChange={handleInputChange}
                      className="edit-input-sm"
                      placeholder="YouTube URL"
                    />
                  ) : (
                    <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                      YouTube
                    </a>
                  )}
                </div>
                <div className="social-link">
                  <i className="fab fa-instagram"></i>
                  {isEditing ? (
                    <input
                      type="url"
                      name="social.instagram"
                      value={profile.social.instagram}
                      onChange={handleInputChange}
                      className="edit-input-sm"
                      placeholder="Instagram URL"
                    />
                  ) : (
                    <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  )}
                </div>
                <div className="social-link">
                  <i className="fab fa-twitter"></i>
                  {isEditing ? (
                    <input
                      type="url"
                      name="social.twitter"
                      value={profile.social.twitter}
                      onChange={handleInputChange}
                      className="edit-input-sm"
                      placeholder="Twitter URL"
                    />
                  ) : (
                    <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="account-card">
              <h3>Account Information</h3>
              <div className="account-info">
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{profile.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Member Since:</span>
                  <span className="info-value">{profile.joinDate}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Account Type:</span>
                  <span className="info-value premium">Premium Creator</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-main">
            {/* Recent Vlogs */}
            <div className="section-card">
              <div className="section-header">
                <h2>Recent Vlogs</h2>
                <a href="/uploadedvlogs" className="btn btn-outline">
                  View All
                </a>
              </div>
              
              <div className="vlogs-grid">
                {recentVlogs.map(vlog => (
                  <div key={vlog.id} className="vlog-card">
                    <div className="vlog-thumbnail">
                      <img src={vlog.thumbnail} alt={vlog.title} />
                      <div className="vlog-overlay">
                        <i className="fas fa-play"></i>
                      </div>
                    </div>
                    <div className="vlog-info">
                      <h4>{vlog.title}</h4>
                      <div className="vlog-stats">
                        <span><i className="fas fa-eye"></i> {vlog.views}</span>
                        <span><i className="fas fa-heart"></i> {vlog.likes}</span>
                      </div>
                      <span className="upload-date">{vlog.uploadDate}</span>
                    </div>
                    <div className="vlog-actions">
                      <button className="action-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="action-btn">
                        <i className="fas fa-chart-bar"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="section-card">
              <h2>Recent Activity</h2>
              <div className="activity-feed">
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-upload"></i>
                  </div>
                  <div className="activity-content">
                    <p>You uploaded a new vlog <strong>"Sunrise at Taj Mahal"</strong></p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="activity-content">
                    <p>Your vlog received <strong>45 new likes</strong></p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-comment"></i>
                  </div>
                  <div className="activity-content">
                    <p>New comment on your <strong>Goa vlog</strong></p>
                    <span className="activity-time">2 days ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-content">
                    <p><strong>25 new followers</strong> joined your channel</p>
                    <span className="activity-time">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Quick Links */}
            <div className="section-card">
              <h2>Quick Settings</h2>
              <div className="settings-links">
                <a href="/settings" className="settings-link">
                  <i className="fas fa-user-cog"></i>
                  <span>Account Settings</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
                <a href="/settings/privacy" className="settings-link">
                  <i className="fas fa-shield-alt"></i>
                  <span>Privacy & Security</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
                <a href="/settings/notifications" className="settings-link">
                  <i className="fas fa-bell"></i>
                  <span>Notification Settings</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
                <a href="/settings/billing" className="settings-link">
                  <i className="fas fa-credit-card"></i>
                  <span>Billing & Payments</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;