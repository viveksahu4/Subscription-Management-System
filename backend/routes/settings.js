const express = require('express');
const Settings = require('../models/Settings');
const { protect, adminGuard } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// GET - public (all users can view settings)
router.get('/', async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json(settings);
});

// PUT - Admin only
router.put('/', adminGuard, async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  const { gymName, tax, currency, config } = req.body;
  if (gymName != null) settings.gymName = gymName;
  if (tax != null) settings.tax = tax;
  if (currency != null) settings.currency = currency;
  if (config != null) settings.config = { ...settings.config, ...config };
  await settings.save();
  res.json(settings);
});

module.exports = router;
