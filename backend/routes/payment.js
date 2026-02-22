const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const Subscription = require('../models/Subscription');
const Report = require('../models/Report');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('⚠️  WARNING: Razorpay API keys not found in environment variables!');
  console.warn('⚠️  Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file');
  console.warn('⚠️  Get test keys from: https://dashboard.razorpay.com/app/keys');
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: RAZORPAY_KEY_SECRET || 'rzp_test_placeholder_secret',
});

// All payment routes require auth
router.use(protect);

// POST /api/payment/create-order - Create Razorpay order
router.post('/create-order', [
  body('planId').notEmpty().withMessage('Plan ID required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const plan = await SubscriptionPlan.findById(req.body.planId);
    if (!plan || !plan.isActive) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    // Create Razorpay order
    const options = {
      amount: plan.price * 100, // Amount in paise (multiply by 100)
      currency: 'INR',
      receipt: `receipt_${Date.now()}_${req.user._id}`,
      notes: {
        userId: req.user._id.toString(),
        planId: plan._id.toString(),
        planName: plan.name,
      },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    
    // Check if it's an authentication error
    if (err.statusCode === 401 || err.error?.code === 'BAD_REQUEST_ERROR') {
      return res.status(500).json({ 
        message: 'Razorpay authentication failed. Please configure valid API keys in .env file. Get test keys from https://dashboard.razorpay.com/app/keys' 
      });
    }
    
    res.status(500).json({ 
      message: err.error?.description || err.message || 'Failed to create payment order' 
    });
  }
});

// UPI ID for manual payment
const UPI_ID = '8966977389@ybl';

// POST /api/payment/verify-upi - Confirm UPI payment and create subscription (user pays manually then confirms)
router.post('/verify-upi', [
  body('planId').notEmpty().withMessage('Plan ID required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const plan = await SubscriptionPlan.findById(req.body.planId);
    if (!plan || !plan.isActive) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration);

    const paymentId = `UPI-${Date.now()}`;

    const subscription = await Subscription.create({
      user: req.user._id,
      plan: plan.name,
      duration: plan.duration,
      price: plan.price,
      startDate,
      endDate,
      status: 'active',
      paymentId,
      paymentStatus: 'completed',
    });

    await Report.create({
      user: req.user._id,
      type: 'subscription',
      subscription: subscription._id,
      amount: plan.price,
      description: `Purchased ${plan.name} - ${plan.duration} months (UPI: ${UPI_ID})`,
    });

    const populated = await Subscription.findById(subscription._id).populate('user', 'name email');
    res.status(201).json({
      message: 'Payment successful! Membership activated.',
      subscription: populated,
    });
  } catch (err) {
    console.error('UPI payment confirm error:', err);
    res.status(500).json({ message: err.message || 'Failed to activate membership' });
  }
});

// GET /api/payment/upi-details - Get UPI ID for display
router.get('/upi-details', (req, res) => {
  res.json({ upiId: UPI_ID });
});

// POST /api/payment/verify - Verify payment and create subscription
router.post('/verify', [
  body('razorpay_order_id').notEmpty().withMessage('Order ID required'),
  body('razorpay_payment_id').notEmpty().withMessage('Payment ID required'),
  body('razorpay_signature').notEmpty().withMessage('Signature required'),
  body('planId').notEmpty().withMessage('Plan ID required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;

    // Verify payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const secret = RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Get plan details
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    // Check if subscription already exists for this order
    const existingSub = await Subscription.findOne({ razorpayOrderId: razorpay_order_id });
    if (existingSub) {
      return res.status(400).json({ message: 'Payment already processed' });
    }

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration);

    // Create subscription
    const subscription = await Subscription.create({
      user: req.user._id,
      plan: plan.name,
      duration: plan.duration,
      price: plan.price,
      startDate,
      endDate,
      status: 'active',
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentStatus: 'completed',
    });

    // Create report
    await Report.create({
      user: req.user._id,
      type: 'subscription',
      subscription: subscription._id,
      amount: plan.price,
      description: `Purchased ${plan.name} - ${plan.duration} months (Payment ID: ${razorpay_payment_id})`,
    });

    const populated = await Subscription.findById(subscription._id).populate('user', 'name email');
    res.status(201).json({
      message: 'Payment verified and subscription activated',
      subscription: populated,
    });
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ message: err.message || 'Payment verification failed' });
  }
});

module.exports = router;
