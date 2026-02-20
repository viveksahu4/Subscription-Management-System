const express = require('express');
const Report = require('../models/Report');
const Subscription = require('../models/Subscription');
const { protect, adminGuard } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// User: own reports, Admin: all
router.get('/', async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const reports = await Report.find(query).populate('subscription').populate('user', 'name email').sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: filter by date, monthly revenue, active vs expired
router.get('/stats', adminGuard, async (req, res) => {
  try {
    const { from, to } = req.query;
    const matchSub = {};
    const matchReport = { type: 'subscription' };
    if (from || to) {
      matchSub.startDate = {};
      matchReport.date = {};
      if (from) {
        matchSub.startDate.$gte = new Date(from);
        matchReport.date.$gte = new Date(from);
      }
      if (to) {
        matchSub.startDate.$lte = new Date(to);
        matchReport.date.$lte = new Date(to);
      }
    }

    const subs = await Subscription.aggregate([
      { $match: matchSub },
      { $group: { _id: '$status', count: { $sum: 1 }, total: { $sum: '$price' } } },
    ]);

    const revenue = await Report.aggregate([
      { $match: matchReport },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({
      byStatus: subs,
      totalRevenue: revenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
