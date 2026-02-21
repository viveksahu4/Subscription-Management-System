import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ClassDetail.css';

const CLASS_DATA = {
  crossfit: {
    title: 'CrossFit',
    about: `CrossFit is one of the categories of strength and conditioning workout that makes use of the weight of an individual's body for resistance so as to build power throughout. Consistent with the advantages of high-intensity interval training, this means no standard cardio workouts and hours spent at the gym. The professional CrossFit trainers at The CStech Gym, located in Phagwara, point out the following benefits and key reasons for the popularity of CrossFit workouts:

HIIT workouts can be done quickly – under an hour and sometimes much less – and don't require someone to work out every single day to maintain strength.
Doing HIIT workouts and training at high intensities – meaning workouts that would be unsustainable for long periods of time – leads to many health benefits, including faster weight loss along with more fat-burning and muscle-building.
Endurance athletes and bodybuilders are usually very specialized in their sport – for instance, being aerobically fit or very muscular – but can be lacking in versatility like having allover strength, power or stamina.
Sprinters and people conditioned to do Burst Training are typically proficient to match the cardiovascular benefits and abilities of endurance athletes, but with less time spent training.
Heavy lifters are able to apply more power to activities than endurance athletes. Powerlifters – those who attempt to lift maximum weights within three attempts – especially strong.
CrossFit workouts at The CStech Gym, Phagwara cover multiple fitness domains such as accuracy, balance, agility, coordination, speed, power, flexibility, strength, stamina, cardiovascular, and respiratory.`,
    objectives: [
      'Helps you work out more consistently',
      'Ongoing motivation and a solid support system',
      'Less time spent working out, but more results',
      'Help losing weight fast',
      'Boost motivation, encouragement and instruction',
      'The ability to beat through plateaus',
      'Burn more fat than steady-state cardio',
      'Better conditioning and versatility',
      'Prepares your body for nearly any sport, competition or activity',
    ],
    cta: 'Join The CStech Gym, the best fitness club in Phagwara, Punjab offering specialized CrossFit classes at inexpensive prices!',
    schedule: { Mon: '5:00 AM - 10:30 PM', Tue: '5:00 AM - 10:30 PM', Wed: '5:00 AM - 10:30 PM', Thu: '5:00 AM - 10:30 PM', Fri: '5:00 AM - 10:30 PM', Sat: '5:00 AM - 10:30 PM' },
  },
  'fitness-studio': {
    title: 'Fitness Studio',
    about: `Opened in 2006, The CStech Gym is a premier fitness studio in Phagwara, Punjab. We offer result-based personal training and expert nutrition coaching for complete body health and wellness. We are not a cult and we don't do gimmicks – just old-school training and techniques that work.

You can think of personal training like our secret sauce – it's the fastest and safest way to get seriously awesome results. Our experienced trainers develop fun individualized fitness programs that incorporate cutting-edge exercises and nutrition to help you crush your fitness goals.

The trainers at The CStech Gym are a cut above the competition. Their vast knowledge underpinned by years of experience working with a diverse clientele, as well as pushing athletic boundaries in their own right. With their help, you'll achieve more than you ever dreamed possible.

Our personal trainers help you determine, set and achieve your individual goals – whether it's building muscle, losing weight or just trying to live a healthier life. They create a program exclusively for your needs. They offer support and advice on issues like fitness, nutrition, and overall personal wellness.

Fitness Studio at The CStech Gym offers a personalized, organic approach to your body, health, and goals. Regardless of your fitness level, you will be galvanized and inspired by our professional trainers offering specialized personal training sessions.`,
    objectives: null,
    cta: 'Join The CStech Gym, the best fitness club in Phagwara, Punjab offering specialized fitness services at inexpensive prices!',
    schedule: { Mon: '5:00 AM - 10:30 PM', Tue: '5:00 AM - 10:30 PM', Wed: '5:00 AM - 10:30 PM', Thu: '5:00 AM - 10:30 PM', Fri: '5:00 AM - 10:30 PM', Sat: '5:00 AM - 10:30 PM' },
  },
  'power-yoga': {
    title: 'Power Yoga',
    about: `Vigorous yet traditional; energetic yet peaceful – the Power Yoga classes at The CStech Gym is power-packed and result-oriented. No child's play, the Power Yoga sessions are taken by the best Yoga experts of Punjab who pay attention to every single aspect – strength, posture, breathing, and retention. All these aspects make certain that every member feels a total harmony of body, mind, and soul after the class.

Power Yoga classes at The CStech Gym in Phagwara, Punjab will certainly help you gain immense strength and family. Our group class also focuses on practicing "Core Power Yoga" which is indeed an excellent approach to work on your abdominal muscles. And with leading Bollywood celebrities advocating Surya Namaskar and Power Yoga at the best foot forward for fitness. It is time for you to experience a new high in Power Yoga class at The CStech Gym.

If the word "power" in Power Yoga implies the intensity of yoga postures, it becomes imperative for you to feel the heat only at The CStech Gym, which is the best fitness club in Phagwara, Punjab.`,
    objectives: [
      'Experience advanced level of yoga',
      'Improved metabolism and fitness',
      'Benefits of breathing & relaxing yoga postures',
      'The best workout for abs and core muscles',
      'Helps to lose weight and tone up',
      'Combines dumbbells and ankle-weights for Power Yoga Strength sessions',
      'Perks up your strength and flexibility',
    ],
    cta: 'Join The CStech Gym, the best fitness club in Phagwara, Punjab offering specialized Power Yoga classes at inexpensive prices!',
    schedule: { Mon: '5:00 AM - 10:00 PM', Tue: '5:00 AM - 10:00 PM', Wed: '5:00 AM - 10:00 PM', Thu: '5:00 AM - 10:00 PM', Fri: '5:00 AM - 10:00 PM', Sat: '5:00 AM - 10:00 PM' },
  },
  spinning: {
    title: 'Spinning',
    about: `Wear your smartest fitness gear and get set go for the fast-paced action – Adrenalin-rushing Spinning class at The CStech Gym. Energy-inducing music, a dedicated studio and a motivating trainer – if there is anything else that you need for an ideal spinning class; it comes in the form of eager members who are addicted to this spinning class so much so that they come a few minutes early to book their favorite spin bike.

There is no denying the fact that Spinning is the paramount form of workout merging the intensity of Aerobics and strength of an intensive cardio workout. But what makes The CStech Gym Spinning class the ultimate for fitness is the frequency. Multiple spinning classes every day conducted by experienced trainers is no joke. Add to it the variation in every class – reverse cycling, body hold, and fast-paced spinning. No wonder, you are sweaty and charged to the core after 45 minutes.`,
    objectives: [
      'Enhances your metabolism',
      'Works on your abdominal muscles too',
      'Improves your cardiovascular health',
      'Burns 500 to 800 calories in 45 min workout',
      'The best workout for lower portion of the body',
      'Toned sharply legs',
      'Even in a group class, choose to spin at your own pace',
      'Enjoyment & excitement packed class',
    ],
    cta: `Don't go by the words; try the real action from 5:00 AM to 10:00 PM Monday to Saturday (Sunday closed) only at Phagwara's best gym The CStech Gym Spinning Studio. Visit today and reserve a spot!`,
    schedule: { Mon: '5:00 AM - 10:00 PM', Tue: '5:00 AM - 10:00 PM', Wed: '5:00 AM - 10:00 PM', Thu: '5:00 AM - 10:00 PM', Fri: '5:00 AM - 10:00 PM', Sat: '5:00 AM - 10:00 PM' },
  },
  strength: {
    title: 'Strength',
    about: `At The CStech Gym in Phagwara, Punjab, we offer small group strength classes that are designed exclusively to get you stronger, gain muscle and develop your body composition. The workouts are designed to include particular exercises focusing on the "big" lifts, including squats, presses, pull-up variations and Olympic lift variations.

Day 1 is Lower body push and upper body pull, and Day 2 is lower body pull and upper body push exercise variations. These exercises are programmed purposely designed with a specific set and repetitions schemes that change every month. Each member gets to adjust the weights for their individual strength and development level.

Our motive at The CStech Gym is to add a little more to the bar each week and improve your technique!

After the lifting portion, each class finishes with a complete body competitive "finisher" designed to work additional muscle groups, burn fat, perk up endurance and body composition. There are two different finishers for both Day 1 and Day 2. If you are looking for a more advanced class that will get you stronger as well as improve your physique then The CStech Gym is for you.`,
    objectives: null,
    cta: 'Join The CStech Gym, the best fitness club in Phagwara, Punjab offering specialized Strength Workouts at inexpensive prices!',
    schedule: { Mon: '5:00 AM - 10:00 PM', Tue: '5:00 AM - 10:00 PM', Wed: '5:00 AM - 10:00 PM', Thu: '5:00 AM - 10:00 PM', Fri: '5:00 AM - 10:00 PM', Sat: '5:00 AM - 10:00 PM' },
  },
  zumba: {
    title: 'Zumba',
    about: `Zumba was discovered accidentally by Beto Perez and we at The CStech Gym fell in love with it ever since India got a taste of this creative dance-based workout, which is extremely beneficial for toning and muscle strength. Zumba classes, at one of the finest fitness clubs located in Phagwara "The CStech Gym", are offered by Zumba experts who will bring out your best energy and passion for dance as well as workout.

And if you think Zumba is not your cup of tea, come and take a sip in The CStech Gym Zumba Class. Everyone, irrespective of their age and skill, dances and groves with the moves of Salsa, Latin dancing, Meringue, Cumbia, Tango, Bachata, Samba, Flamenco, and what not! No wonder, it turns out to be the best Zumba class in Phagwara, Punjab. In addition, there is a little bit of belly dancing as well and men take the front row in it shaking their belly on to the Arabian music.

Indeed, a happy and healthy form of group dancing. About the class's workout quotient – let us see if you can Zumba for 45 minutes at a stretch!`,
    objectives: [
      'Works on your thighs and lower portion',
      'Improved metabolism and fitness',
      'Engages your whole body muscles',
      'Lose weight and tone up',
      'High on energy and cardio workout',
      'Fun aerobics kind class',
      "It's upbeat, trendy and fun to be in Zumba class",
    ],
    cta: 'Zumba is a fast-paced class that brings the benefits of cardio as well as toning workout. If this excites you, see you at The CStech Gym for Zumba! Join The CStech Gym, the best fitness club in Phagwara, Punjab offering specialized Zumba classes at inexpensive prices!',
    schedule: { Mon: '5:00 AM - 10:00 AM', Tue: '5:00 AM - 10:00 AM', Wed: '5:00 AM - 10:00 AM', Thu: '5:00 AM - 10:00 AM', Fri: '5:00 AM - 10:00 AM', Sat: '9:00 AM - 1:00 PM' },
  },
  aerobics: {
    title: 'Aerobics',
    about: 'At The CStech Gym, we provide you the best Aerobics classes in Phagwara. Aerobics combines rhythmic exercise with stretching and strength training for overall fitness. By practicing Aerobics regularly at The CStech Gym, you will be well equipped to improve your cardiovascular health and stamina.',
    objectives: ['Improved metabolism', 'Full-body workout', 'Fun group sessions'],
    cta: 'Join The CStech Gym, the best fitness club in Phagwara, Punjab offering specialized Aerobics classes!',
    schedule: { Mon: '5:00 AM - 10:30 PM', Tue: '5:00 AM - 10:30 PM', Wed: '5:00 AM - 10:30 PM', Thu: '5:00 AM - 10:30 PM', Fri: '5:00 AM - 10:30 PM', Sat: '5:00 AM - 10:30 PM' },
  },
  bhangra: {
    title: 'Bhangra',
    about: 'Bhangra classes at The CStech Gym bring the energy and rhythm of Punjab to your workout. High-energy dance combined with fitness for an enjoyable and effective workout experience.',
    objectives: ['Improved metabolism', 'Cultural fitness', 'Full-body engagement'],
    cta: 'Join The CStech Gym for specialized Bhangra classes!',
    schedule: { Mon: '5:00 AM - 10:00 AM', Tue: '5:00 AM - 10:00 AM', Wed: '5:00 AM - 10:00 AM', Thu: '5:00 AM - 10:00 AM', Fri: '5:00 AM - 10:00 AM', Sat: '9:00 AM - 1:00 PM' },
  },
  'body-sculpting': {
    title: 'Body Sculpting',
    about: 'Body Sculpting at The CStech Gym focuses on resistance training with weights, dumbbells, and exercise bands to build and define muscles. Our trainers help you achieve your body goals.',
    objectives: ['Builds and sculpts muscles', 'Burns fat and calories', 'Improves strength and flexibility'],
    cta: 'Join The CStech Gym for Body Sculpting classes!',
    schedule: { Mon: '5:00 AM - 10:00 PM', Tue: '5:00 AM - 10:00 PM', Wed: '5:00 AM - 10:00 PM', Thu: '5:00 AM - 10:00 PM', Fri: '5:00 AM - 10:00 PM', Sat: '5:00 AM - 10:00 PM' },
  },
  cardio: {
    title: 'Cardio',
    about: 'Cardio classes at The CStech Gym include Abs, Body Barre, Burn, Endurance, Hurricane, Power Sculpt, and Super Sculpt. Each class targets different aspects of cardiovascular fitness and strength.',
    objectives: ['Improved cardiovascular health', 'Fat burning', 'Full-body conditioning'],
    cta: 'Join The CStech Gym, the best fitness club in Phagwara, Punjab offering specialized Cardio classes!',
    schedule: { Mon: '5:00 AM - 10:00 PM', Tue: '5:00 AM - 10:00 PM', Wed: '5:00 AM - 10:00 PM', Thu: '5:00 AM - 10:00 PM', Fri: '5:00 AM - 10:00 PM', Sat: '5:00 AM - 10:00 PM' },
  },
};

const ClassDetail = () => {
  const { slug } = useParams();
  const [formData, setFormData] = useState({ name: '', membership: '', email: '', phone: '', terms: false });
  const [submitted, setSubmitted] = useState(false);
  const data = CLASS_DATA[slug] || CLASS_DATA.crossfit;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="class-banner">
        <h1>{data.title}</h1>
        <p>Class</p>
      </section>

      <section className="class-main">
        <div className="class-layout">
          <div className="class-content">
            <div className="class-hero-img" />
            <h2>About the {data.title} classes</h2>
            <div className="class-about">
              {data.about.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {data.objectives && (
              <>
                <h3>Objectives</h3>
                <ul>
                  {data.objectives.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="class-cta">{data.cta}</p>

            <div className="book-section">
              <h3>Book This Class Now</h3>
              <p>Come along and join this great class at the gym</p>
              {submitted ? (
                <p className="success-msg">Thank you! We will contact you soon.</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="book-form-row">
                    <input type="text" placeholder="Your Name..." value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    <input type="text" placeholder="Your Membership Number..." value={formData.membership} onChange={(e) => setFormData({ ...formData, membership: e.target.value })} />
                  </div>
                  <div className="book-form-row">
                    <input type="email" placeholder="Your E-Mail..." value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <input type="tel" placeholder="Your Phone..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                  <label className="book-terms">
                    <input type="checkbox" checked={formData.terms} onChange={(e) => setFormData({ ...formData, terms: e.target.checked })} required />
                    I've read and I accept with the Terms & Conditions
                  </label>
                  <button type="submit" className="btn btn-primary">Book Now</button>
                </form>
              )}
            </div>
          </div>
          <div className="class-sidebar">
            <h3>CLASS DETAILS</h3>
            <h4>CLASS SCHEDULE</h4>
            <ul className="schedule-list">
              {Object.entries(data.schedule).map(([day, time]) => (
                <li key={day}><strong>{day}:</strong> {time}</li>
              ))}
            </ul>
            <div className="class-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Twitter">t</a>
              <a href="#" aria-label="Google+">G+</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassDetail;
