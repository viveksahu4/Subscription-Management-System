import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // Dummy implementation - professional reset link system would call backend
    setTimeout(() => {
      setMessage('If an account exists with this email, a reset link would be sent. (Dummy flow - backend not implemented)');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-page page-content">
        <div className="auth-card card">
          <h1>Forgot Password</h1>
          <p className="auth-sub">Enter your email to receive a reset link</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {message && <p className="success-msg">{message}</p>}
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <p className="auth-link">
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
    </div>
  );
};

export default ForgotPassword;
