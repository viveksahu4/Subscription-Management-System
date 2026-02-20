import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page-content" style={{ textAlign: 'center', padding: '4rem' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--primary)' }}>404</h1>
      <p style={{ margin: '1rem 0', color: 'var(--text-muted)' }}>Page not found</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
);

export default NotFound;
