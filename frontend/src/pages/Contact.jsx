import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (window.location.hash === '#map') {
      const el = document.getElementById('map');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/contact', formData);
      if (response.data.success) {
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with The CStech Gym</p>
      </section>
      <section className="contact-content">
        <div className="contact-info card">
          <h3>Contact Information</h3>
          <p><strong>Address:</strong> LPU Unimall, 7P44+855, Phagwara, Punjab - 144411</p>
          <p><strong>Phone:</strong> 8966977389, 9981068683</p>
          <p><strong>Email:</strong> cstechsv2531@gmail.com</p>
        </div>
        <div className="contact-form-wrapper card">
          <h3>Send us a message</h3>
          {sent ? (
            <p className="success-msg">Thank you! We have received your message and will get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className="error-msg" style={{ marginBottom: '1rem' }}>{error}</p>}
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  rows="5" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>

      <section id="map" className="contact-map-section">
        <h2 className="map-heading">Find Us on the Map</h2>
        <div className="map-divider" />
        <div className="map-container">
          <div className="map-info-card">
            <h3>The CStech Gym</h3>
            <p className="map-address">
              LPU Unimall, 7P44+855, Phagwara, Punjab 144411
            </p>
            <div className="map-rating">
              <span className="stars">★★★★☆</span>
              <span className="rating-text">4.3 · 165 reviews</span>
            </div>
            <a
              href="https://www.google.com/maps/dir//LPU+Unimall,+7P44%2B855,+Phagwara,+Punjab+144411"
              target="_blank"
              rel="noopener noreferrer"
              className="map-directions-btn"
            >
              <span>Directions</span>
              <span aria-hidden>→</span>
            </a>
            <a
              href="https://www.google.com/maps/place/LPU+Unimall,+7P44%2B855,+Phagwara,+Punjab+144411"
              target="_blank"
              rel="noopener noreferrer"
              className="map-view-larger"
            >
              View larger map
            </a>
          </div>
          <div className="map-embed-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3488.464943!2d75.7033!3d31.2536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a5a5a5a5a5a%3A0x0!2zMzHCsDE1JzEzLjAiTiA3NcKwNDInMTEuOSJF!5e0!3m2!1sen!2sin!4v1708000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The CStech Gym Location - LPU Unimall"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
