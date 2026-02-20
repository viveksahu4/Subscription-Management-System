import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import './Dashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/subscription')
      .then((res) => setSubscriptions(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const activeSub = subscriptions.find((s) => s.status === 'active');
  const daysLeft = activeSub
    ? Math.max(0, Math.ceil((new Date(activeSub.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="page-content user-dashboard">
        <h1>Welcome, {user?.name}</h1>
        <p className="subtitle">User Dashboard</p>

        {loading ? (
          <div className="loader" />
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card card">
                <h3>Active Subscription</h3>
                <p className="stat-value">{activeSub ? activeSub.plan : 'None'}</p>
              </div>
              <div className="stat-card card">
                <h3>Expiry Date</h3>
                <p className="stat-value">
                  {activeSub ? new Date(activeSub.endDate).toLocaleDateString() : '-'}
                </p>
              </div>
              <div className="stat-card card">
                <h3>Days Remaining</h3>
                <p className="stat-value">{daysLeft}</p>
              </div>
            </div>

            {!activeSub && (
              <div className="card cta-card">
                <p>You don't have an active subscription.</p>
                <Link to="/purchase" className="btn btn-primary">Purchase Plan</Link>
              </div>
            )}

            <div className="card quick-links">
              <h3>Quick Links</h3>
              <Link to="/subscriptions">My Subscriptions</Link>
              <Link to="/purchase">Purchase New Plan</Link>
              <Link to="/reports">View Reports</Link>
              <Link to="/profile">Profile</Link>
            </div>
          </>
        )}
    </div>
  );
};

export default UserDashboard;
