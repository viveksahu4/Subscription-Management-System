import React, { useState } from 'react';
import './Calculators.css';

const Calculators = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState('metric');

  const activityLabels = {
    '1.2': 'Sedentary (little/no exercise)',
    '1.375': 'Light (1-3 days/week)',
    '1.55': 'Moderate (3-5 days/week)',
    '1.725': 'Very active (6-7 days/week)',
    '1.9': 'Extra active (athlete)',
  };

  const calculate = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const hCm = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !hCm || !a) return;

    // Mifflin-St Jeor formula (height in cm)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * hCm - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * hCm - 5 * a - 161;
    }
    let tdee = bmr * parseFloat(activity);

    if (goal === 'lose') tdee *= 0.85;
    if (goal === 'gain') tdee *= 1.15;

    setResult(Math.round(tdee));
  };

  return (
    <div className="calculators-page">
      <section className="calculators-hero">
        <h1>Fitness Calculators</h1>
        <p>
          Check out our exclusive Fitness Calculators to help you determine everything from your BMI (Body Mass Index),
          body fat composition, daily caloric needs and much more. Each of these tools will help you find an average
          exercise program that fits your individual needs and goals.
        </p>
      </section>

      <section className="calculator-section">
        <div className="calculator-container">
          <div className="calculator-form card">
            <h3>Daily Caloric Intake Calculator</h3>
            <form onSubmit={calculate}>
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" required />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" step="0.1" required />
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Goal</label>
                  <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                    <option value="lose">Lose weight</option>
                    <option value="maintain">Maintain</option>
                    <option value="gain">Gain muscle</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Activity Level</label>
                  <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                    {Object.entries(activityLabels).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row unit-toggle">
                <span>Metric</span>
                <button type="button" className="toggle-btn" onClick={() => setUnit(u => u === 'metric' ? 'imperial' : 'metric')}>
                  {unit === 'metric' ? '○' : '●'}
                </button>
                <span>Imperial</span>
              </div>
              <button type="submit" className="btn btn-primary btn-calculate">Calculate</button>
            </form>
          </div>
          <div className="calculator-result card">
            <h3>Target Daily Caloric Intake</h3>
            {result !== null ? (
              <p className="result-value">{result} <span>cal/day</span></p>
            ) : (
              <p className="result-placeholder">?</p>
            )}
            <p className="result-note">These calculations are based on averages.</p>
          </div>
        </div>

        <div className="calculator-links">
          <div className="calc-link">
            <span className="calc-icon">💪</span>
            <span>Body Mass Index</span>
          </div>
          <div className="calc-link">
            <span className="calc-icon">📏</span>
            <span>Body Fat Index</span>
          </div>
          <div className="calc-link">
            <span className="calc-icon">❤</span>
            <span>Calories Burned</span>
          </div>
          <div className="calc-link active">
            <span className="calc-icon">🍴</span>
            <span>Daily Caloric Intake</span>
          </div>
          <div className="calc-link">
            <span className="calc-icon">🏋</span>
            <span>One-Rep Max</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculators;
