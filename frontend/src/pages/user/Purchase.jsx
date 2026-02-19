import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Purchase = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/subscription/plans')
      .then((res) => setPlans(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = async () => {
    if (!selected) return;
    setSubmitting(true);
    setError('');

    try {
      // Step 1: Create Razorpay order
      const orderResponse = await api.post('/payment/create-order', {
        planId: selected._id,
      });

      const { orderId, amount, currency, keyId } = orderResponse.data;

      // Step 2: Initialize Razorpay checkout
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'The CStech Gym',
        description: `Subscription: ${selected.name} - ${selected.duration} month(s)`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Step 3: Verify payment on backend
            const verifyResponse = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: selected._id,
            });

            // Payment successful
            alert('Payment successful! Your subscription has been activated.');
            navigate('/subscriptions');
          } catch (err) {
            console.error('Payment verification error:', err);
            setError(err.response?.data?.message || 'Payment verification failed');
            setSubmitting(false);
          }
        },
        prefill: {
          name: user?.name || 'User',
          email: user?.email || '',
        },
        theme: {
          color: '#c1121f',
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        setError(response.error.description || 'Payment failed');
        setSubmitting(false);
      });
      razorpay.open();
    } catch (err) {
      console.error('Payment initiation error:', err);
      setError(err.response?.data?.message || 'Failed to initiate payment');
      setSubmitting(false);
    }
  };

  return (
    <div className="page-content">
      <h1>Purchase Subscription</h1>
      <p className="subtitle">Select a plan and complete payment to activate your subscription</p>

      {loading ? (
        <div className="loader" />
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            {plans.map((p) => (
              <div
                key={p._id}
                className={`card plan-card ${selected?._id === p._id ? 'selected' : ''}`}
                onClick={() => setSelected(p)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{p.name}</h3>
                <p>{p.duration} month(s)</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>₹{p.price}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.description}</p>
              </div>
            ))}
          </div>

          {error && <p className="error-msg" style={{ marginTop: '1rem' }}>{error}</p>}

          <button
            className="btn btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={handlePurchase}
            disabled={!selected || submitting}
          >
            {submitting ? 'Processing...' : 'Confirm Purchase'}
          </button>
        </>
      )}
    </div>
  );
};

export default Purchase;
