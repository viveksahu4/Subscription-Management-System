import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const UPI_ID = '8966977389@ybl';

const Purchase = () => {
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: choose plan, 2: UPI payment
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/subscription/plans')
      .then((res) => setPlans(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = () => {
    if (!selected) return;
    setStep(2);
    setError('');
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenUpi = () => {
    const amount = selected?.price || 0;
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=Gym%20Membership&am=${amount}&cu=INR`;
    window.open(upiUrl, '_blank');
  };

  const handlePaymentSuccess = async () => {
    if (!selected) return;
    setSubmitting(true);
    setError('');

    try {
      await api.post('/payment/verify-upi', { planId: selected._id });
      navigate('/subscriptions');
    } catch (err) {
      console.error('Payment confirm error:', err);
      setError(err.response?.data?.message || 'Failed to activate membership');
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError('');
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="page-content">
      <h1>Purchase Subscription</h1>
      <p className="subtitle">
        {step === 1
          ? 'Select a plan and complete payment to activate your membership'
          : 'Pay via UPI to complete your purchase'}
      </p>

      {step === 1 ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            {plans.map((p) => (
              <div
                key={p._id}
                className={`card plan-card ${selected?._id === p._id ? 'selected' : ''}`}
                onClick={() => setSelected(p)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{p.name}</h3>
                <p>{p.duration} month(s)</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                  ₹{p.price}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.description}</p>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={handlePurchase}
            disabled={!selected}
          >
            Purchase
          </button>
        </>
      ) : (
        <div className="card" style={{ maxWidth: '420px', marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>{selected?.name} - ₹{selected?.price}</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {selected?.duration} month(s) membership
          </p>

          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Pay to this UPI ID:</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          >
            <code
              style={{
                flex: 1,
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              {UPI_ID}
            </code>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCopyUpi}
              style={{ whiteSpace: 'nowrap' }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '0.75rem' }}
            onClick={handleOpenUpi}
          >
            Pay via UPI App
          </button>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Open your UPI app, enter amount ₹{selected?.price}, and pay to the UPI ID above. Then
            click below to confirm.
          </p>

          {error && <p className="error-msg" style={{ marginBottom: '1rem' }}>{error}</p>}

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '0.5rem' }}
            onClick={handlePaymentSuccess}
            disabled={submitting}
          >
            {submitting ? 'Activating...' : 'I have paid - Activate Membership'}
          </button>

          <button type="button" className="btn btn-secondary" style={{ width: '100%' }} onClick={handleBack}>
            Back to plans
          </button>
        </div>
      )}
    </div>
  );
};

export default Purchase;
