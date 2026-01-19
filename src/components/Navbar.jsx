// src/components/Navbar.jsx - CORRECTED VERSION
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaSignOutAlt, FaHome, FaUpload, FaUser, FaThList } from 'react-icons/fa';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaPlane } from 'react-icons/fa';

export default function Navbar() {  // ← This is already a default export
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      localStorage.removeItem('goindia_user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>🌏 Go India</h2>
      
      <div style={styles.navLinks}>
        <Link to="/" style={styles.navLink}>
          <FaHome size={18} /> <span style={styles.linkText}>Home</span>
        </Link>
        <Link to="/dashboard" style={styles.navLink}>
          <FaThList size={18} /> <span style={styles.linkText}>Dashboard</span>
        </Link>
        <Link to="/upload" style={styles.navLink}>
          <FaUpload size={18} /> <span style={styles.linkText}>Upload</span>
        </Link>
        <Link to="/profile" style={styles.navLink}>
          <FaUser size={18} /> <span style={styles.linkText}>Profile</span>
        </Link>
        <Link to="/booktrip" style={styles.navLink}>
          <FaPlane size={18} /> <span style={styles.linkText}>Book Trip</span>
        </Link>
      </div>
      
      <div style={styles.userSection}>
        <button onClick={handleSettings} style={styles.iconButton} title="Settings">
          <FaCog size={20} />
        </button>
        
        <button onClick={handleLogout} style={styles.iconButton} title="Logout">
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f39c12',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  linkText: {
    fontSize: '1rem',
  },
  userSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#34495e',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '0.6rem',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    transition: 'all 0.3s',
  },
};

// REMOVE THIS DUPLICATE LINE:
// export default Navbar;  ← DELETE THIS LINE