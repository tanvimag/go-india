// src/App.jsx - UPDATED VERSION WITH NAVBAR
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ViewVlog from './pages/ViewVlog';
import UploadVlog from './pages/UploadVlog';
import UploadedVlogs from './pages/UploadedVlogs';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navbar from './components/Navbar'; 
import SearchResults from './pages/SearchResults';
import TripBooking from './pages/TripBooking';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('goindia_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    setUser(userData);
    localStorage.setItem('goindia_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('goindia_user');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading GoIndia...</p>
      </div>
    );
  }

  return (
    <Router>
      {/* Conditionally render Navbar only when user is logged in */}
      {user && <Navbar />}
      
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} 
        />
        
        {/* All routes below will automatically have Navbar since user exists */}
        <Route 
          path="/home" 
          element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/viewvlog/:id?" 
          element={user ? <ViewVlog user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/uploadvlog" 
          element={user ? <UploadVlog user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/uploadedvlogs" 
          element={user ? <UploadedVlogs user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={user ? <Settings user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/search" 
          element={user ? <SearchResults user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/booktrip" 
          element={user ? <TripBooking user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;