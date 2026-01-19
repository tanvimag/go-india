import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/Settings.css';

const Settings = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    account: {
      email: user?.email || 'user@example.com',
      username: 'travel_explorer',
      language: 'English',
      timezone: 'Asia/Kolkata'
    },
    privacy: {
      profileVisibility: 'public',
      showOnlineStatus: true,
      allowComments: true,
      allowMessages: true,
      dataSharing: false
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newVlogNotifications: true,
      likeNotifications: true,
      commentNotifications: true,
      followerNotifications: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      density: 'comfortable'
    },
    billing: {
      plan: 'premium',
      paymentMethod: 'card',
      autoRenew: true,
      nextBillingDate: '2024-04-15'
    }
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: 'fas fa-user-cog' },
    { id: 'privacy', label: 'Privacy', icon: 'fas fa-shield-alt' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'appearance', label: 'Appearance', icon: 'fas fa-palette' },
    { id: 'billing', label: 'Billing', icon: 'fas fa-credit-card' },
    { id: 'security', label: 'Security', icon: 'fas fa-lock' }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    });
  };

  const handleSave = () => {
    // In real app, save to backend
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default
      alert('Settings reset to default!');
    }
  };

  const renderAccountSettings = () => (
    <div className="settings-section">
      <h3>Account Information</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={settings.account.email}
            onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={settings.account.username}
            onChange={(e) => handleSettingChange('account', 'username', e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Language</label>
          <select
            value={settings.account.language}
            onChange={(e) => handleSettingChange('account', 'language', e.target.value)}
            className="form-control"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Bengali">Bengali</option>
          </select>
        </div>
        <div className="form-group">
          <label>Timezone</label>
          <select
            value={settings.account.timezone}
            onChange={(e) => handleSettingChange('account', 'timezone', e.target.value)}
            className="form-control"
          >
            <option value="Asia/Kolkata">India (IST)</option>
            <option value="America/New_York">New York (EST)</option>
            <option value="Europe/London">London (GMT)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="settings-section">
      <h3>Privacy Settings</h3>
      <div className="settings-form">
        <div className="toggle-group">
          <label>Profile Visibility</label>
          <div className="toggle-options">
            {['public', 'private', 'friends'].map(option => (
              <label key={option} className="radio-option">
                <input
                  type="radio"
                  name="profileVisibility"
                  value={option}
                  checked={settings.privacy.profileVisibility === option}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                />
                <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="toggle-group">
          <label>Show Online Status</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.privacy.showOnlineStatus}
              onChange={(e) => handleSettingChange('privacy', 'showOnlineStatus', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-group">
          <label>Allow Comments</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.privacy.allowComments}
              onChange={(e) => handleSettingChange('privacy', 'allowComments', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-group">
          <label>Allow Messages</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.privacy.allowMessages}
              onChange={(e) => handleSettingChange('privacy', 'allowMessages', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-group">
          <label>Data Sharing for Analytics</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.privacy.dataSharing}
              onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <h3>Notification Preferences</h3>
      <div className="settings-form">
        <div className="toggle-group">
          <label>Email Notifications</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-group">
          <label>Push Notifications</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-group">
          <label>New Vlog Notifications</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications.newVlogNotifications}
              onChange={(e) => handleSettingChange('notifications', 'newVlogNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-group">
          <label>Like Notifications</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications.likeNotifications}
              onChange={(e) => handleSettingChange('notifications', 'likeNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-group">
          <label>Comment Notifications</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications.commentNotifications}
              onChange={(e) => handleSettingChange('notifications', 'commentNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-group">
          <label>Follower Notifications</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications.followerNotifications}
              onChange={(e) => handleSettingChange('notifications', 'followerNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="settings-section">
      <h3>Appearance Settings</h3>
      <div className="settings-form">
        <div className="toggle-group">
          <label>Theme</label>
          <div className="toggle-options">
            {['light', 'dark', 'auto'].map(theme => (
              <label key={theme} className="radio-option">
                <input
                  type="radio"
                  name="theme"
                  value={theme}
                  checked={settings.appearance.theme === theme}
                  onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                />
                <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="toggle-group">
          <label>Font Size</label>
          <select
            value={settings.appearance.fontSize}
            onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
            className="form-control"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="toggle-group">
          <label>Layout Density</label>
          <select
            value={settings.appearance.density}
            onChange={(e) => handleSettingChange('appearance', 'density', e.target.value)}
            className="form-control"
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="settings-section">
      <h3>Billing Information</h3>
      <div className="settings-form">
        <div className="plan-card">
          <div className="plan-header">
            <h4>Current Plan</h4>
            <span className="plan-badge premium">Premium</span>
          </div>
          <div className="plan-features">
            <div className="feature">
              <i className="fas fa-check"></i>
              <span>Unlimited Vlog Uploads</span>
            </div>
            <div className="feature">
              <i className="fas fa-check"></i>
              <span>Advanced Analytics</span>
            </div>
            <div className="feature">
              <i className="fas fa-check"></i>
              <span>Priority Support</span>
            </div>
            <div className="feature">
              <i className="fas fa-check"></i>
              <span>Monetization</span>
            </div>
          </div>
          <div className="plan-price">
            <span className="price">₹499</span>
            <span className="period">/month</span>
          </div>
          <button className="btn btn-outline w-100">
            Change Plan
          </button>
        </div>

        <div className="toggle-group">
          <label>Payment Method</label>
          <select
            value={settings.billing.paymentMethod}
            onChange={(e) => handleSettingChange('billing', 'paymentMethod', e.target.value)}
            className="form-control"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        <div className="toggle-group">
          <label>Auto Renew</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.billing.autoRenew}
              onChange={(e) => handleSettingChange('billing', 'autoRenew', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="billing-info">
          <p><strong>Next Billing Date:</strong> {settings.billing.nextBillingDate}</p>
          <p><strong>Payment Method:</strong> •••• 1234</p>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <h3>Security Settings</h3>
      <div className="settings-form">
        <div className="security-item">
          <div className="security-info">
            <h4>Change Password</h4>
            <p>Update your password regularly for better security</p>
          </div>
          <button className="btn btn-outline">
            Change Password
          </button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Login Activity</h4>
            <p>Review recent login activity on your account</p>
          </div>
          <button className="btn btn-outline">
            View Activity
          </button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Connected Devices</h4>
            <p>Manage devices that have access to your account</p>
          </div>
          <button className="btn btn-outline">
            Manage Devices
          </button>
        </div>

        <div className="danger-zone">
          <h4>Danger Zone</h4>
          <div className="danger-actions">
            <button className="btn btn-danger">
              <i className="fas fa-trash"></i>
              Delete Account
            </button>
            <button className="btn btn-danger">
              <i className="fas fa-sign-out-alt"></i>
              Logout All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'account': return renderAccountSettings();
      case 'privacy': return renderPrivacySettings();
      case 'notifications': return renderNotificationSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'billing': return renderBillingSettings();
      case 'security': return renderSecuritySettings();
      default: return renderAccountSettings();
    }
  };

  return (
    <div className="settings-container">
      <Header user={user} onLogout={onLogout} />
      
      <div className="settings-content">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences and settings</p>
        </div>

        <div className="settings-layout">
          {/* Sidebar */}
          <div className="settings-sidebar">
            <div className="sidebar-header">
              <div className="user-info">
                <div className="avatar">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="user-details">
                  <h3>{user?.name || 'User'}</h3>
                  <p>{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>

            <nav className="settings-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={tab.icon}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="settings-main">
            {renderContent()}
            
            <div className="settings-footer">
              <button className="btn btn-primary" onClick={handleSave}>
                <i className="fas fa-save"></i>
                Save Changes
              </button>
              <button className="btn btn-outline" onClick={handleReset}>
                <i className="fas fa-undo"></i>
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;