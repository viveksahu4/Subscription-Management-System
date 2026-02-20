import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Settings = () => {
  const [settings, setSettings] = useState({ gymName: '', tax: 0, currency: 'INR' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/settings')
      .then((res) => setSettings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setMessage('');
    api.put('/settings', settings)
      .then((res) => {
        setSettings(res.data);
        setMessage('Settings saved');
      })
      .catch((err) => setMessage(err.response?.data?.message || 'Save failed'));
  };

  if (loading) return <div className="page-content"><div className="loader" /></div>;

  return (
    <div className="page-content">
      <h1>Settings</h1>
      <p className="subtitle">Gym configuration</p>

      <div className="card" style={{ maxWidth: 480 }}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Gym Name</label>
            <input
              value={settings.gymName || ''}
              onChange={(e) => setSettings((s) => ({ ...s, gymName: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Tax (%)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={settings.tax ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, tax: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div className="form-group">
            <label>Currency</label>
            <select
              value={settings.currency || 'INR'}
              onChange={(e) => setSettings((s) => ({ ...s, currency: e.target.value }))}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          {message && <p className={message.includes('failed') ? 'error-msg' : 'success-msg'}>{message}</p>}
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
