import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './Tables.css';

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports')
      .then((res) => setReports(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-content">
      <h1>Subscription & Payment History</h1>
      <p className="subtitle">Your subscription and payment records</p>

      {loading ? (
        <div className="loader" />
      ) : reports.length === 0 ? (
        <div className="card"><p>No reports yet.</p></div>
      ) : (
        <div className="card table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.type}</td>
                  <td>₹{r.amount || 0}</td>
                  <td>{r.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserReports;
