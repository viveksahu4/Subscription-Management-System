import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import '../user/Tables.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', role: '' });

  const fetchUsers = () => {
    api.get('/users')
      .then((res) => setUsers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchUsers(), []);

  const handleEdit = (u) => {
    setEditing(u._id);
    setEditForm({ name: u.name, role: u.role });
  };

  const handleSave = () => {
    api.put(`/users/${editing}`, editForm)
      .then(() => {
        setEditing(null);
        fetchUsers();
      })
      .catch((err) => alert(err.response?.data?.message || 'Update failed'));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this user?')) return;
    api.delete(`/users/${id}`)
      .then(() => fetchUsers())
      .catch((err) => alert(err.response?.data?.message || 'Delete failed'));
  };

  return (
    <div className="page-content">
      <h1>Manage Users</h1>
      <p className="subtitle">View and manage all users</p>

      {loading ? (
        <div className="loader" />
      ) : (
        <div className="card table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    {editing === u._id ? (
                      <input
                        value={editForm.name}
                        onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                        className="inline-input"
                      />
                    ) : (
                      u.name
                    )}
                  </td>
                  <td>{u.email}</td>
                  <td>
                    {editing === u._id ? (
                      <select
                        value={editForm.role}
                        onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      <span className={`badge ${u.role === 'admin' ? 'badge-success' : 'badge-muted'}`}>{u.role}</span>
                    )}
                  </td>
                  <td>
                    {editing === u._id ? (
                      <>
                        <button className="btn btn-primary btn-sm" onClick={handleSave}>Save</button>
                        <button className="btn btn-outline btn-sm" style={{ marginLeft: '0.5rem' }} onClick={() => setEditing(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-outline btn-sm" onClick={() => handleEdit(u)}>Edit</button>
                        {u.role !== 'admin' && (
                          <button className="btn btn-outline btn-sm" style={{ marginLeft: '0.5rem', color: 'var(--danger)' }} onClick={() => handleDelete(u._id)}>Delete</button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
