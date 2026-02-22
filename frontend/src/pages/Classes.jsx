import React from 'react';
import { Link } from 'react-router-dom';
import './Classes.css';

const CLASSES = [
  { slug: 'aerobics', title: 'Aerobics', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Aerobics-Classes.jpeg' },
  { slug: 'bhangra', title: 'Bhangra', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Bhangra-Classes.jpeg' },
  { slug: 'body-sculpting', title: 'Body Sculpting', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Body-Sculpting-Classes.jpeg' },
  { slug: 'cardio', title: 'Cardio', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Cardio-classes.jpeg' },
  { slug: 'crossfit', title: 'CrossFit', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/CrossFit-Classes.jpeg' },
  { slug: 'fitness-studio', title: 'Fitness Studio', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Fitness-Studio.jpeg' },
  { slug: 'power-yoga', title: 'Power Yoga', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Power-Yoga-Classes.jpeg' },
  { slug: 'spinning', title: 'Spinning', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Spinning-Classes-1.jpeg' },
  { slug: 'strength', title: 'Strength', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Strength-Classes-1.jpeg' },
  { slug: 'zumba', title: 'Zumba', image: 'https://www.latitudeonegym.com/wp-content/uploads/2015/12/Zumba-Classes.jpeg' },
];

const Classes = () => (
  <div className="classes-page">
    <section className="classes-hero">
      <h1>Classes</h1>
      <p>Aerobics, Bhangra, Cardio, CrossFit, Power Yoga, Zumba and more.</p>
    </section>
    <section className="classes-grid-section">
      <div className="classes-grid">
        {CLASSES.map((cls) => (
          <Link key={cls.slug} to={`/classes/${cls.slug}`} className="class-card">
            <div
              className="class-card-img"
              style={{ backgroundImage: `url(${cls.image})` }}
            />
            <h3>{cls.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  </div>
);

export default Classes;
