import React from 'react';
import './InfoPage.css';

const InfoPage = ({ title, desc = 'Explore our services at Latitude One - The Gym.' }) => (
  <div className="info-page">
    <section className="info-hero">
      <h1>{title}</h1>
      <p>{desc}</p>
    </section>
    <section className="info-content">
      <p>Content coming soon. Contact us for more information.</p>
    </section>
  </div>
);

export default InfoPage;
