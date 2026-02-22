import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => (
  <>
    {/* Hero with background image */}
    <section className="hero hero-home">
      <div className="hero-overlay" />
      <div className="hero-content center">
        <h1>It's Not Just Fitness, It's A Lifestyle</h1>
        <Link to="/contact" className="btn-hero">Contact Us</Link>
      </div>
    </section>

    {/* Page banner - The CStech Gym */}
    <section className="page-banner">
      <h1>The CStech Gym</h1>
    </section>

    {/* Two-column layout: main content + Useful Links */}
    <section className="two-col-section">
      <div className="two-col-content">
        <div className="main-col">
          <p>
            At The CStech Gym, our purpose is to provide every person in Phagwara the opportunity to live a fit and healthy good life.
            Founded in 2006, we are a multi-specialty center concept integrating gym, spa, yoga, and aerobics.
          </p>
          <p>
            Rated as one of the biggest and the best fitness facilities in Phagwara, Punjab, we strongly believe in strength, inspiration,
            action, fitness, training, and life lessons. Our mission is to introduce health and fitness into every individual's life,
            and empower them to not only build a well-structured or sculpted body, but to create a positive self-image and feel confident from inside out.
          </p>
          <h3>WE STRONGLY BELIEVE</h3>
          <ul>
            <li>Strength builds character</li>
            <li>Inspiration drives action</li>
            <li>Fitness is a lifestyle</li>
            <li>Training transforms lives</li>
          </ul>
          <p>
            To find out more about our fitness programs in detail, feel free to give us a call at <strong>8966977389</strong> or <strong>9981068683</strong>.
          </p>
        </div>
        <div className="sidebar-col">
          <h3>USEFUL LINKS</h3>
          <ul className="useful-links">
            <li><Link to="/classes">Classes</Link></li>
            <li><Link to="/diet">Diet Counseling</Link></li>
            <li><Link to="/workout">Workout</Link></li>
            <li><Link to="/nutrition">Nutrition</Link></li>
            <li><Link to="/spa">Spa</Link></li>
            <li><Link to="/swimming">Swimming</Link></li>
          </ul>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section section-cta">
      <h2 className="section-title">Ready to Get Started?</h2>
      <p className="section-desc">Become a member and manage your gym subscription online.</p>
      <div className="cta-buttons">
        <Link to="/register" className="btn btn-primary">Register</Link>
        <Link to="/login" className="btn btn-outline">Login</Link>
      </div>
    </section>
  </>
);

export default Landing;
