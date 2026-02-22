import React from 'react';
import './InfoPage.css';

const Nutrition = () => {
  return (
    <div className="info-page">
      <section className="info-hero">
        <h1>Nutrition</h1>
        <p>Real success comes from full balanced nourishment</p>
      </section>
      <section className="info-content">
        <div className="info-section">
          <p>
            You already are aware of the fact: Real success comes from full balanced nourishment at the right level of calories from real healthy foods. When you are ready to really succeed, the certified nutritionists at Latitude One – The Gym, are here to help make it happen.
          </p>
          <p>
            Our personalized and exclusively designed nutrition system offers you the tools necessary to design your own weekly meal plans to meet your performance and nutritional needs. It tells you the best foods to eat, their nutritional value, and the calories you need to eat to reach your goals for your lifestyle.
          </p>
          
          <h2 className="info-subheading">How it Works</h2>
          <p>
            You enter the foods that you normally eat into our nutrition system, which then points out opportunities in your diet, and teaches you how to progress by removing or adding foods. For instance, if you are eating too much cholesterol or saturated fat, it will show you the foods that are causing the issues so that you can remove them from your diet. If you are missing certain minerals or vitamins, it will help you balance your meal plans by recommending foods to add or replace. Our nutrition system helps you feel, look, and perform better.
          </p>

          <h2 className="info-subheading">Delivering Results</h2>
          <p>
            Research has shown that the ones who actively journal and plan their meals attain much better results in contrast to the ones who just trail a published plan. Our nutrition system works like your own private nutritionist, helping you build balanced meal plans using foods that you like to eat. We do not compel you to drastically transform your eating habits, but we simply point out the ways to make your meals much better for you.
          </p>

          <h2 className="info-subheading">Complete Balanced Nutrition</h2>
          <p>
            True success comes from more than just counting calories. Imagine how you would look and feel if you were truly eating right. Deficiency or excess of vitamins and minerals can cause a range of health concerns. In addition, saturated fat, sodium, and cholesterol can promote coronary heart disease and a lot more. Other nutrients such as Omega 3 and Omega 6 can help reduce cholesterol, and boost hormone levels. Amalgamating the right nutrients at the proper level of calories can lead to true vibrant health.
          </p>
          <p className="info-cta">
            Join Latitude One – The Gym, the best fitness club in Phagwara, Punjab offering specialized nutrition services at inexpensive prices!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Nutrition;
