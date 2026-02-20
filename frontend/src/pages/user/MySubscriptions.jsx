import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './Tables.css';

const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/subscription')
      .then((res) => setSubscriptions(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statusBadge = (status) => {
    const cls = status === 'active' ? 'badge-success' : status === 'expired' ? 'badge-danger' : 'badge-muted';
    return <span className={`badge ${cls}`}>{status}</span>;
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Subscriptions</h1>
        <Link to="/purchase" className="btn btn-primary">Purchase New Plan</Link>
      </div>

      {loading ? (
        <div className="loader" />
      ) : subscriptions.length === 0 ? (
        <div className="card">
          <p>No subscriptions yet. <Link to="/purchase">Purchase a plan</Link></p>
        </div>
      ) : (
        <div className="card table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s._id}>
                  <td>{s.plan}</td>
                  <td>{s.duration} months</td>
                  <td>₹{s.price}</td>
                  <td>{new Date(s.startDate).toLocaleDateString()}</td>
                  <td>{new Date(s.endDate).toLocaleDateString()}</td>
                  <td>{statusBadge(s.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySubscriptions;
