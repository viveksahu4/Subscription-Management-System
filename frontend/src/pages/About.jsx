import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => (
  <>
    {/* Page banner */}
    <section className="page-banner">
      <h1>The CStech Gym</h1>
    </section>

    {/* Two-column layout */}
    <section className="two-col-section about-page">
      <div className="two-col-content">
        <div className="main-col">
          <p>
            At The CStech Gym, our purpose is to provide every person in Phagwara the opportunity to live a fit and healthy good life.
            Founded in 2006, we are a multi-specialty center concept integrating gym, spa, yoga, and aerobics.
          </p>
          <p>
            Rated as one of the biggest and the best fitness facilities in Phagwara, Punjab.
          </p>

          <h2 id="vision">VISION & MISSION</h2>
          <h3>VISION</h3>
          <p>
            The CStech Gym envisions being the best gym in Phagwara and the most trusted high tech fitness destination in Punjab
            offering all-inclusive services for fitness training and body toning. It evolved with the idea of being at the forefront
            of innovations in fitness training, exercising, methodology, and relaxation. It holds the vision of inspiring great
            workouts and deep-gratification through complete relaxation, all under a single roof.
          </p>
          <h3>MISSION</h3>
          <p>
            The first and foremost mission of The CStech Gym has been to be the leading destination in Phagwara, Punjab – a goal
            that has been accomplished every year since its commencement through commitment and disciplined mindset. In changing
            times when people see fitness as a state of mind more than just a condition of the body, we aim to:
          </p>
          <ul>
            <li>Offer high-performance training space and facility to fitness-conscious people across all age-groups.</li>
            <li>Pay back to the society in the form of healthy initiatives that add more life to the lifestyle of people.</li>
            <li>Continuously educate and train its Fitness Expert team and keeping them abreast with global trends in the industry.</li>
            <li>Be the splashy and flashy fitness destination by adding the elements of fun, passion and innovation to personal training and group classes.</li>
            <li>Revolutionize the way 'fitness' is perceived by working on need-specific and client-specific fitness solution.</li>
          </ul>
        </div>
        <div className="sidebar-col">
          <h3>USEFUL LINKS</h3>
          <ul className="useful-links">
            <li><Link to="/classes/crossfit">Classes</Link></li>
            <li><Link to="/diet">Diet Counseling</Link></li>
            <li><Link to="/fitness">Workout</Link></li>
            <li><Link to="/fitness#nutrition">Nutrition</Link></li>
            <li><Link to="/spa">Spa</Link></li>
            <li><Link to="/swimming">Swimming</Link></li>
          </ul>
        </div>
      </div>
    </section>
  </>
);

export default About;
