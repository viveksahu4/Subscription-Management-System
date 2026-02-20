import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import '../user/Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, subscriptions: 0, active: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/users'),
      api.get('/subscription'),
      api.get('/reports/stats'),
    ])
      .then(([usersRes, subsRes, statsRes]) => {
        const subs = subsRes.data;
        const active = subs.filter((s) => s.status === 'active').length;
        const revenue = subsRes.data.reduce((sum, s) => sum + (s.price || 0), 0);
        setStats({
          users: usersRes.data.length,
          subscriptions: subs.length,
          active,
          revenue: statsRes.data.totalRevenue || revenue,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-content">
      <h1>Admin Dashboard</h1>
      <p className="subtitle">Overview of your gym</p>

      {loading ? (
        <div className="loader" />
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card card">
              <h3>Total Users</h3>
              <p className="stat-value">{stats.users}</p>
              <Link to="/admin/users">Manage</Link>
            </div>
            <div className="stat-card card">
              <h3>Total Subscriptions</h3>
              <p className="stat-value">{stats.subscriptions}</p>
              <Link to="/admin/subscriptions">Manage</Link>
            </div>
            <div className="stat-card card">
              <h3>Active Subscriptions</h3>
              <p className="stat-value">{stats.active}</p>
            </div>
            <div className="stat-card card">
              <h3>Total Revenue</h3>
              <p className="stat-value">₹{stats.revenue}</p>
            </div>
          </div>

          <div className="card quick-links">
            <h3>Quick Links</h3>
            <Link to="/admin/users">Manage Users</Link>
            <Link to="/admin/subscriptions">Manage Subscriptions</Link>
            <Link to="/admin/reports">Reports</Link>
            <Link to="/admin/settings">Settings</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
