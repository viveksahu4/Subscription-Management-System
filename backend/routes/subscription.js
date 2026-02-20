const express = require('express');
const { body, validationResult } = require('express-validator');
const Subscription = require('../models/Subscription');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const Report = require('../models/Report');
const { protect, adminGuard } = require('../middleware/auth');

const router = express.Router();

// All subscription routes require auth
router.use(protect);

// POST /api/subscription - Create new subscription (user purchase)
router.post('/', [
  body('planId').notEmpty().withMessage('Plan ID required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const plan = await SubscriptionPlan.findById(req.body.planId);
    if (!plan || !plan.isActive) return res.status(400).json({ message: 'Invalid plan' });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration);

    const sub = await Subscription.create({
      user: req.user._id,
      plan: plan.name,
      duration: plan.duration,
      price: plan.price,
      startDate,
      endDate,
      status: 'active',
      paymentId: 'PAY-' + Date.now(),
    });

    await Report.create({
      user: req.user._id,
      type: 'subscription',
      subscription: sub._id,
      amount: plan.price,
      description: `Purchased ${plan.name} - ${plan.duration} months`,
    });

    const populated = await Subscription.findById(sub._id).populate('user', 'name email');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/subscription - List subscriptions (user: own, admin: all)
router.get('/', async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const subs = await Subscription.find(query).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/subscription/:id
router.put('/:id', async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && sub.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { status } = req.body;
    if (status) sub.status = status;
    await sub.save();
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/subscription/:id - Admin only for plans; user can cancel own
router.delete('/:id', async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && sub.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----- Subscription Plans (Admin only) -----

router.get('/plans', async (req, res) => {
  const plans = await SubscriptionPlan.find({ isActive: true });
  res.json(plans);
});

router.post('/plans', adminGuard, [
  body('name').trim().notEmpty(),
  body('duration').isInt({ min: 1 }),
  body('price').isFloat({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const plan = await SubscriptionPlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/plans/:id', adminGuard, async (req, res) => {
  const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!plan) return res.status(404).json({ message: 'Not found' });
  res.json(plan);
});

router.delete('/plans/:id', adminGuard, async (req, res) => {
  await SubscriptionPlan.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: 'Deleted' });
});

module.exports = router;
