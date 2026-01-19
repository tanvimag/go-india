// src/pages/UploadVlog.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/UploadVlog.css';

const UploadVlog = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    tags: '',
    category: 'travel',
    privacy: 'public'
  });
  const [uploading, setUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnail(file);
    } else {
      alert('Please select an image file (JPEG, PNG, etc.)');
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      if (file.size > 2 * 1024 * 1024 * 1024) { // 2GB limit
        alert('File size exceeds 2GB limit');
        return;
      }
      setVideoFile(file);
    } else {
      alert('Please select a video file (MP4, MOV, AVI, WMV)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoFile) {
      alert('Please select a video file to upload');
      return;
    }
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      // 1. Upload thumbnail if exists
      let thumbnailURL = '';
      if (thumbnail) {
        const thumbnailRef = ref(storage, `thumbnails/${Date.now()}_${thumbnail.name}`);
        const thumbnailSnapshot = await uploadBytes(thumbnailRef, thumbnail);
        thumbnailURL = await getDownloadURL(thumbnailSnapshot.ref);
        setUploadProgress(30);
      }

      // 2. Upload video file
      const videoRef = ref(storage, `vlogs/${Date.now()}_${videoFile.name}`);
      const videoSnapshot = await uploadBytes(videoRef, videoFile);
      const videoURL = await getDownloadURL(videoSnapshot.ref);
      setUploadProgress(70);

      // 3. Save vlog data to Firestore
      const vlogData = {
        ...formData,
        thumbnailURL,
        videoURL,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email.split('@')[0],
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        comments: 0,
        status: 'published',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const docRef = await addDoc(collection(db, 'vlogs'), vlogData);
      setUploadProgress(100);

      // 4. Success message
      alert(`✅ Vlog "${formData.title}" uploaded successfully!\nID: ${docRef.id}`);
      
      // 5. Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        tags: '',
        category: 'travel',
        privacy: 'public'
      });
      setThumbnail(null);
      setVideoFile(null);
      setUploadProgress(0);
      
      // 6. Redirect to vlogs page
      setTimeout(() => {
        navigate('/uploadedvlogs');
      }, 1500);

    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="uploadvlog-container">
      <Header user={user} onLogout={onLogout} />
      
      <div className="uploadvlog-content">
        <h1>Upload Your Travel Vlog</h1>
        <p className="subtitle">Share your incredible Indian travel experiences with the world</p>
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="upload-section">
            <div className="upload-area">
              <i className="fas fa-cloud-upload-alt"></i>
              <h3>Upload Video File *</h3>
              <p>Drag and drop your video file here or click to browse</p>
              <input 
                type="file" 
                accept="video/*" 
                className="file-input"
                onChange={handleVideoChange}
                required
              />
              {videoFile ? (
                <div className="file-selected">
                  <i className="fas fa-file-video"></i>
                  <span>{videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  <button 
                    type="button" 
                    className="remove-file"
                    onClick={() => setVideoFile(null)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <p className="file-hint">No video selected</p>
              )}
              <div className="file-info">
                <p>Supported formats: MP4, MOV, AVI, WMV</p>
                <p>Max file size: 2GB</p>
              </div>
            </div>
          </div>

          {uploading && (
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p>Uploading... {uploadProgress}%</p>
            </div>
          )}

          <div className="form-section">
            <div className="form-group">
              <label>Vlog Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter an engaging title for your vlog"
                required
                disabled={uploading}
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Describe your travel experience, highlights, and tips..."
                required
                disabled={uploading}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Where was this vlog recorded?"
                  required
                  disabled={uploading}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control"
                  disabled={uploading}
                >
                  <option value="travel">Travel</option>
                  <option value="adventure">Adventure</option>
                  <option value="food">Food & Dining</option>
                  <option value="culture">Culture & Heritage</option>
                  <option value="nature">Nature & Wildlife</option>
                  <option value="spiritual">Spiritual</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="form-control"
                placeholder="Add relevant tags (separated by commas)"
                disabled={uploading}
              />
              <small>Example: tajmahal, agra, heritage, photography</small>
            </div>

            <div className="form-group">
              <label>Privacy Settings</label>
              <div className="privacy-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    checked={formData.privacy === 'public'}
                    onChange={handleChange}
                    disabled={uploading}
                  />
                  <span className="radio-label">
                    <i className="fas fa-globe"></i>
                    Public - Anyone can view
                  </span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    checked={formData.privacy === 'private'}
                    onChange={handleChange}
                    disabled={uploading}
                  />
                  <span className="radio-label">
                    <i className="fas fa-lock"></i>
                    Private - Only you can view
                  </span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="privacy"
                    value="unlisted"
                    checked={formData.privacy === 'unlisted'}
                    onChange={handleChange}
                    disabled={uploading}
                  />
                  <span className="radio-label">
                    <i className="fas fa-link"></i>
                    Unlisted - Only people with link can view
                  </span>
                </label>
              </div>
            </div>

            <div className="thumbnail-upload">
              <label>Thumbnail Image</label>
              <div className="thumbnail-preview">
                {thumbnail ? (
                  <div className="thumbnail-preview-image">
                    <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail preview" />
                    <button 
                      type="button" 
                      className="remove-thumbnail"
                      onClick={() => setThumbnail(null)}
                      disabled={uploading}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="thumbnail-placeholder">
                    <i className="fas fa-image"></i>
                    <p>No thumbnail selected</p>
                    <button 
                      type="button"
                      className="btn btn-outline"
                      onClick={() => document.querySelector('.thumbnail-input').click()}
                      disabled={uploading}
                    >
                      Select Thumbnail
                    </button>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="thumbnail-input"
                  onChange={handleThumbnailChange}
                  disabled={uploading}
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => navigate(-1)}
                disabled={uploading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={uploading || !videoFile}
              >
                {uploading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Uploading... {uploadProgress}%
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload"></i>
                    Upload Vlog
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVlog;