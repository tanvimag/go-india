// src/pages/Login.jsx - CORRECTED VERSION
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from "firebase/auth"; // CORRECT IMPORT
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log("✅ Signed in successfully:", user);
      
      // Pass user data to parent
      onLogin({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL
      });
      
      // Navigate to home
      navigate('/home');
      
    } catch (error) {
      console.error("❌ Google sign-in error:", error);
      setError(error.message || "Failed to sign in with Google");
      alert("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Your email/password login logic here
    console.log("Email login:", email, password);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🌏 Welcome to Go India</h1>
          <p>Sign in to explore incredible travel experiences</p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        <div className="google-signin">
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn-google"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Signing in...
              </>
            ) : (
              <>
                <i className="fab fa-google"></i> Sign in with Google
              </>
            )}
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleEmailLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <button onClick={handleSignUp} className="link-btn">
              Sign up here
            </button>
          </p>
          <p>
            <button className="link-btn">Forgot password?</button>
          </p>
        </div>
      </div>

      <div className="login-features">
        <div className="feature">
          <i className="fas fa-video"></i>
          <h3>Explore Travel Vlogs</h3>
          <p>Discover amazing destinations through authentic videos</p>
        </div>
        <div className="feature">
          <i className="fas fa-upload"></i>
          <h3>Share Your Journey</h3>
          <p>Upload your own travel experiences and inspire others</p>
        </div>
        <div className="feature">
          <i className="fas fa-users"></i>
          <h3>Join Community</h3>
          <p>Connect with fellow travelers and share tips</p>
        </div>
      </div>
    </div>
  );
};

export default Login;