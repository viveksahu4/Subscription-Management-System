import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-col">
        <h4>WHY THE CSTECH GYM?</h4>
        <p>
          The CStech Gym is one of the leading fitness clubs located in Phagwara, Punjab
          offering state of the art solutions for personal fitness and weight loss, both for men and women.
          Our mission is to introduce health and fitness into every individual's life, and empower them
          to not only build a well-structured or sculpted body, but to create a positive self-image
          and feel confident from inside out.
        </p>
        <div className="footer-social">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </div>
      <div className="footer-col">
        <h4>ABOUT US</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">The CStech Gym</Link></li>
          <li><Link to="/about#vision">Vision & Mission</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>USEFUL LINKS</h4>
        <ul>
          <li><Link to="/classes">Classes</Link></li>
          <li><Link to="/diet">Diet Counseling</Link></li>
          <li><Link to="/fitness">Workout</Link></li>
          <li><Link to="/fitness#nutrition">Nutrition</Link></li>
          <li><Link to="/spa">Spa</Link></li>
          <li><Link to="/swimming">Swimming</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>CONTACT</h4>
        <p className="footer-address">
          Lovely Professional University (UNIMALL), GT Road, Phagwara, Punjab - 144411
        </p>
        <p className="footer-phone">8966977389</p>
        <p className="footer-phone">9981068683</p>
        <p className="footer-email">cstechsv2531@gmail.com</p>
        <Link to="/contact" className="footer-map">Find us on the map</Link>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; The CStech Gym. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
