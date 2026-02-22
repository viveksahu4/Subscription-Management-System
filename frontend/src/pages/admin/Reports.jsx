import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import '../user/Tables.css';

const AdminReports = () => {
  const [stats, setStats] = useState({ byStatus: [], totalRevenue: 0 });
  const [reports, setReports] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    const params = {};
    if (from) params.from = from;
    if (to) params.to = to;
    api.get('/reports/stats', { params })
      .then((res) => setStats(res.data))
      .catch(console.error);
  };

  const fetchReports = () => {
    api.get('/reports')
      .then((res) => setReports(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
    fetchReports();
  }, []);

  const handleFilter = () => {
    setLoading(true);
    fetchStats();
    fetchReports();
    setLoading(false);
  };

  return (
    <div className="page-content">
      <h1>Reports</h1>
      <p className="subtitle">Filter by date, monthly revenue, active vs expired</p>

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={handleFilter}>Filter</button>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card card">
          <h3>Total Revenue</h3>
          <p className="stat-value">₹{stats.totalRevenue}</p>
        </div>
        {stats.byStatus?.map((s) => (
          <div key={s._id} className="stat-card card">
            <h3>{s._id}</h3>
            <p className="stat-value">{s.count}</p>
          </div>
        ))}
      </div>

      <h3>All Reports</h3>
      {loading ? (
        <div className="loader" />
      ) : (
        <div className="card table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.user?.name || r.user?.email || '-'}</td>
                  <td>{r.type}</td>
                  <td>₹{r.amount || 0}</td>
                  <td>{r.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Export: Use browser print (Ctrl+P) to save as PDF
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
