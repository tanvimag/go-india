// src/pages/TripBooking.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/TripBooking.css';

const TripBooking = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    destination: '',
    travelers: 1,
    startDate: '',
    endDate: '',
    budget: '',
    interests: [],
    accommodation: 'hotel',
    transportation: 'flight'
  });

  const destinations = [
    { id: 1, name: 'Taj Mahal, Agra', price: '₹25,000', days: '3', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop' },
    { id: 2, name: 'Kerala Backwaters', price: '₹35,000', days: '5', image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=500&auto=format&fit=crop' },
    { id: 3, name: 'Goa Beaches', price: '₹20,000', days: '4', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&auto=format&fit=crop' },
    { id: 4, name: 'Ladakh Adventure', price: '₹45,000', days: '7', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop' },
    { id: 5, name: 'Rajasthan Heritage', price: '₹30,000', days: '6', image: 'https://images.unsplash.com/photo-1524307875964-4c93d5c57229?w=500&auto=format&fit=crop' },
    { id: 6, name: 'Varanasi Spiritual', price: '₹18,000', days: '3', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop' }
  ];

  const interestsList = ['Heritage', 'Adventure', 'Food', 'Wildlife', 'Beaches', 'Spiritual', 'Shopping', 'Photography'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate estimated cost
    const basePrices = {
      'Taj Mahal, Agra': 25000,
      'Kerala Backwaters': 35000,
      'Goa Beaches': 20000,
      'Ladakh Adventure': 45000,
      'Rajasthan Heritage': 30000,
      'Varanasi Spiritual': 18000
    };
    
    const basePrice = basePrices[formData.destination] || 25000;
    const totalCost = basePrice * formData.travelers;
    
    alert(`🎉 Trip Request Submitted!\n\nDestination: ${formData.destination}\nTravelers: ${formData.travelers}\nEstimated Cost: ₹${totalCost.toLocaleString()}\n\nOur travel experts will contact you within 24 hours!`);
    
    // Reset form
    setFormData({
      destination: '',
      travelers: 1,
      startDate: '',
      endDate: '',
      budget: '',
      interests: [],
      accommodation: 'hotel',
      transportation: 'flight'
    });
  };

  const handleQuickBook = (destination) => {
    setFormData({
      ...formData,
      destination: destination.name
    });
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="trip-booking-container">
      <Header user={user} onLogout={onLogout} />
      
      <div className="trip-content">
        {/* Hero Section */}
        <section className="booking-hero">
          <div className="hero-content">
            <h1>Book Your Dream Trip to India</h1>
            <p>Personalized travel planning with local experts</p>
            <div className="hero-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Destinations</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
              <div className="stat">
                <h3>₹0</h3>
                <p>Booking Fees</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Customizable</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Packages */}
        <section className="packages-section">
          <div className="container">
            <div className="section-header">
              <h2>Popular Travel Packages</h2>
              <p>Curated experiences for every traveler</p>
            </div>
            
            <div className="packages-grid">
              {destinations.map(dest => (
                <div key={dest.id} className="package-card">
                  <div className="package-image">
                    <img src={dest.image} alt={dest.name} />
                    <div className="package-badge">Best Seller</div>
                  </div>
                  <div className="package-info">
                    <h3>{dest.name}</h3>
                    <div className="package-details">
                      <span><i className="fas fa-clock"></i> {dest.days} Days</span>
                      <span><i className="fas fa-rupee-sign"></i> {dest.price}</span>
                    </div>
                    <p className="package-desc">
                      {dest.name === 'Taj Mahal, Agra' && 'Explore the iconic monument with guided tours'}
                      {dest.name === 'Kerala Backwaters' && 'Stay in houseboats and experience serene backwaters'}
                      {dest.name === 'Goa Beaches' && 'Relax on pristine beaches with Portuguese heritage'}
                      {dest.name === 'Ladakh Adventure' && 'Adventure sports in the Himalayan region'}
                      {dest.name === 'Rajasthan Heritage' && 'Royal palaces and desert safaris'}
                      {dest.name === 'Varanasi Spiritual' && 'Spiritual journey along the Ganges river'}
                    </p>
                    <div className="package-actions">
                      <button 
                        className="btn btn-outline"
                        onClick={() => handleQuickBook(dest)}
                      >
                        <i className="fas fa-info-circle"></i> Details
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          setFormData({...formData, destination: dest.name});
                          document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <i className="fas fa-calendar-check"></i> Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="booking-form-section" id="booking-form">
          <div className="container">
            <div className="form-card">
              <h2>Customize Your Trip</h2>
              <p>Fill in details and get a personalized itinerary</p>
              
              <form onSubmit={handleSubmit} className="trip-form">
                <div className="form-row">
                  <div className="form-group">
                    <label><i className="fas fa-map-marker-alt"></i> Destination *</label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Destination</option>
                      {destinations.map(dest => (
                        <option key={dest.id} value={dest.name}>
                          {dest.name} ({dest.days} days - {dest.price})
                        </option>
                      ))}
                      <option value="custom">Custom Destination</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label><i className="fas fa-users"></i> Travelers *</label>
                    <div className="traveler-input">
                      <button 
                        type="button"
                        className="counter-btn"
                        onClick={() => setFormData({...formData, travelers: Math.max(1, formData.travelers - 1)})}
                      >
                        -
                      </button>
                      <span className="traveler-count">{formData.travelers} {formData.travelers === 1 ? 'Person' : 'People'}</span>
                      <button 
                        type="button"
                        className="counter-btn"
                        onClick={() => setFormData({...formData, travelers: formData.travelers + 1})}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label><i className="fas fa-calendar-alt"></i> Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="form-control"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label><i className="fas fa-calendar-alt"></i> End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="form-control"
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label><i className="fas fa-tags"></i> Travel Interests</label>
                  <div className="interests-grid">
                    {interestsList.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        className={`interest-btn ${formData.interests.includes(interest) ? 'active' : ''}`}
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label><i className="fas fa-bed"></i> Accommodation</label>
                    <select
                      name="accommodation"
                      value={formData.accommodation}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="hotel">Hotel (3-5 Star)</option>
                      <option value="resort">Beach Resort</option>
                      <option value="homestay">Homestay</option>
                      <option value="hostel">Hostel/Budget</option>
                      <option value="luxury">Luxury Villa</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label><i className="fas fa-plane"></i> Transportation</label>
                    <select
                      name="transportation"
                      value={formData.transportation}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="flight">Flight</option>
                      <option value="train">Train</option>
                      <option value="car">Car/Rental</option>
                      <option value="bus">Bus</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label><i className="fas fa-rupee-sign"></i> Budget (per person)</label>
                  <div className="budget-slider">
                    <input
                      type="range"
                      name="budget"
                      min="5000"
                      max="200000"
                      step="5000"
                      value={formData.budget || 50000}
                      onChange={handleChange}
                      className="slider"
                    />
                    <div className="budget-display">
                      <span>₹5,000</span>
                      <span className="selected-budget">
                        ₹{(formData.budget || 50000).toLocaleString()}
                      </span>
                      <span>₹2,00,000</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label><i className="fas fa-sticky-note"></i> Additional Requirements</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Any special requirements, dietary restrictions, or specific places you want to visit..."
                  ></textarea>
                </div>

                <div className="form-summary">
                  <h3>Trip Summary</h3>
                  <div className="summary-details">
                    <p><strong>Destination:</strong> {formData.destination || 'Not selected'}</p>
                    <p><strong>Duration:</strong> {formData.startDate && formData.endDate ? 
                      `${Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days` : 
                      'Select dates'}
                    </p>
                    <p><strong>Travelers:</strong> {formData.travelers} {formData.travelers === 1 ? 'person' : 'people'}</p>
                    <p><strong>Interests:</strong> {formData.interests.length > 0 ? formData.interests.join(', ') : 'None selected'}</p>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline">
                    <i className="fas fa-download"></i> Download Itinerary
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-paper-plane"></i> Submit Booking Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="benefits-section">
          <div className="container">
            <h2>Why Book With Go India?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <i className="fas fa-shield-alt"></i>
                <h3>Safe & Secure</h3>
                <p>Verified partners and secure payment options</p>
              </div>
              <div className="benefit-card">
                <i className="fas fa-headset"></i>
                <h3>24/7 Support</h3>
                <p>Round-the-clock assistance during your trip</p>
              </div>
              <div className="benefit-card">
                <i className="fas fa-map-marked-alt"></i>
                <h3>Local Experts</h3>
                <p>Curated experiences by local travel experts</p>
              </div>
              <div className="benefit-card">
                <i className="fas fa-wallet"></i>
                <h3>Best Price</h3>
                <p>Guaranteed best prices with no hidden charges</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TripBooking;