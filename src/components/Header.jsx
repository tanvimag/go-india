import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/home')}>
          <i className="fas fa-mountain"></i>
          <span>GoIndia</span>
        </div>

        <nav className="nav-links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/viewvlog" className="nav-link">View Vlogs</Link>
          <Link to="/uploadvlog" className="nav-link">Upload Vlog</Link>
          <Link to="/uploadedvlogs" className="nav-link">My Vlogs</Link>
        </nav>

        <div className="user-section">
          <div className="user-info" onClick={() => navigate('/profile')}>
            <div className="avatar">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span className="username">{user?.name || 'User'}</span>
          </div>
          
          <button className="settings-btn" onClick={() => navigate('/settings')}>
            <i className="fas fa-cog"></i>
          </button>
          
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;