import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    api.put('/users/profile/me', { name })
      .then(() => {
        refreshUser();
        setMessage('Profile updated');
      })
      .catch((err) => setMessage(err.response?.data?.message || 'Update failed'))
      .finally(() => setLoading(false));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    setLoading(true);
    setMessage('');
    api.put('/users/profile/me', { currentPassword, newPassword })
      .then(() => {
        setMessage('Password updated');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((err) => setMessage(err.response?.data?.message || 'Password update failed'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-content">
      <h1>Profile</h1>
      <p className="subtitle">Update your details</p>

      <div className="card" style={{ maxWidth: 480, marginBottom: '2rem' }}>
        <h3>Update Name</h3>
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>Update</button>
        </form>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {message && <p className={message.includes('failed') ? 'error-msg' : 'success-msg'}>{message}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
