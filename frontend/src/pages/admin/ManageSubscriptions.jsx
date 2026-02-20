import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import '../user/Tables.css';

const ManageSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [planForm, setPlanForm] = useState({ name: '', duration: 1, price: 0, description: '' });

  const fetch = () => {
    Promise.all([
      api.get('/subscription'),
      api.get('/subscription/plans'),
    ])
      .then(([subsRes, plansRes]) => {
        setSubscriptions(subsRes.data);
        setPlans(plansRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => fetch(), []);

  const handleAddPlan = (e) => {
    e.preventDefault();
    api.post('/subscription/plans', planForm)
      .then(() => {
        setShowPlanForm(false);
        setPlanForm({ name: '', duration: 1, price: 0, description: '' });
        fetch();
      })
      .catch((err) => alert(err.response?.data?.message || 'Failed'));
  };

  const statusBadge = (status) => {
    const cls = status === 'active' ? 'badge-success' : status === 'expired' ? 'badge-danger' : 'badge-muted';
    return <span className={`badge ${cls}`}>{status}</span>;
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Manage Subscriptions</h1>
        <button className="btn btn-primary" onClick={() => setShowPlanForm(!showPlanForm)}>
          {showPlanForm ? 'Cancel' : 'Create Plan'}
        </button>
      </div>

      {showPlanForm && (
        <div className="card" style={{ marginBottom: '1.5rem', maxWidth: 400 }}>
          <h3>Create New Plan</h3>
          <form onSubmit={handleAddPlan}>
            <div className="form-group">
              <label>Name</label>
              <input value={planForm.name} onChange={(e) => setPlanForm((f) => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Duration (months)</label>
              <input type="number" min="1" value={planForm.duration} onChange={(e) => setPlanForm((f) => ({ ...f, duration: +e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" min="0" value={planForm.price} onChange={(e) => setPlanForm((f) => ({ ...f, price: +e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input value={planForm.description} onChange={(e) => setPlanForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      )}

      <h3>Plans</h3>
      <div className="card table-card" style={{ marginBottom: '2rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.duration} months</td>
                <td>₹{p.price}</td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => {
                    const name = prompt('Plan name', p.name);
                    const dur = prompt('Duration', p.duration);
                    const pr = prompt('Price', p.price);
                    if (name != null) api.put(`/subscription/plans/${p._id}`, { name, duration: +dur || p.duration, price: +pr || p.price }).then(fetch);
                  }}>Edit</button>
                  <button className="btn btn-outline btn-sm" style={{ marginLeft: '0.5rem', color: 'var(--danger)' }} onClick={() => {
                    if (window.confirm('Deactivate plan?')) api.delete(`/subscription/plans/${p._id}`).then(fetch);
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>All Subscriptions</h3>
      {loading ? (
        <div className="loader" />
      ) : (
        <div className="card table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s._id}>
                  <td>{s.user?.name || s.user?.email || '-'}</td>
                  <td>{s.plan}</td>
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

export default ManageSubscriptions;
