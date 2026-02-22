import React from 'react';
import './InfoPage.css';

const Workout = () => {
  return (
    <div className="info-page">
      <section className="info-hero">
        <h1>Workout</h1>
        <p>Empower yourself to live a healthier life while reaching your goals</p>
      </section>
      <section className="info-content">
        <div className="info-section">
          <p>
            If you haven't worked out in a long time, or you are simply starting for the first time, your core objective for the first few weeks will be to learn the right form of each exercise and to build a base strength and stability. This will set a good foundation for your workout program. At Latitude One – The Gym, we strive to empower you to live a healthier life while reaching your goals.
          </p>
          <p>
            We amalgamate result-based personal training, an on-site physical therapy practice, massage therapy, nutrition services, and many more wellness solutions to take your health beyond the gym floor. Your journey doesn't end after your workout. We go beyond the typical personal training studio and we believe health is a full circle: it takes improving all aspects of your well-being to get you in the best shape of your life.
          </p>
          <p>
            Drawing from our personal experiences, we decided to create an environment where you have a health and wellness team centered around your fitness training to address all of your needs and help you become the athlete you were always meant to be. We empower you with education and support you with a community. We train with heart!
          </p>
          <p>
            For the first four weeks, we will be doing a warm-up and two exercises every day. For many individuals, who are used to doing a lot of isolation exercises i.e., calf raises and bicep curls, you might think that to exercises is barely a workout. But the difference here is that we are doing compound exercises that work the largest muscle groups, which means more definition in your muscles and a higher amount of fat is burned.
          </p>
          <p className="info-cta">
            Join Latitude One – The Gym, the best fitness club in Phagwara, Punjab offering specialized workout services at inexpensive prices!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Workout;
