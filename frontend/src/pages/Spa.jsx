import React from 'react';
import './InfoPage.css';

const Spa = () => {
  return (
    <div className="info-page">
      <section className="info-hero">
        <h1>Spa</h1>
        <p>Balance the stress of daily life with our specialized spa services</p>
      </section>
      <section className="info-content">
        <div className="info-section">
          <p>
            Specialized spa services at Latitude One – The Gym is here to balance the stress of daily life in a big city like Phagwara. Simply slow down, turn off your phone and come in for a soothing massage that is meant to leave the world outside.
          </p>
          <p>
            During your visit at this best fitness club located in Phagwara, we make sure you take pleasure of exclusive amenities including luxury locker rooms, steam rooms, saunas, fitness classes by professionals, and a lot more.
          </p>
          <p>
            At Latitude One – The Gym, we incorporate an array of aromas including:
          </p>
          <ul className="info-list">
            <li>
              <strong>Rosemary Mint</strong> – An invigorating aroma featuring certified organic rosemary, peppermint, lavender, and marjoram.
            </li>
            <li>
              <strong>Shampure</strong> – A soothing aroma featuring an exclusive bouquet of 25 pure flower and plant essences, including certified organic ylang-ylang, petitgrain, lavender, lemon, and bergamot.
            </li>
            <li>
              <strong>Beautifying</strong> – An uplifting aroma featuring organic lavender, rosemary, and bergamot.
            </li>
          </ul>
          <p className="info-cta">
            Join Latitude One – The Gym, the best fitness club in Phagwara, Punjab offering specialized Spa services at inexpensive prices!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Spa;
