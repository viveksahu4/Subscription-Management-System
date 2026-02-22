const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { protect, adminGuard } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// GET /api/users - Admin: all users
router.get('/', adminGuard, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

// PUT /api/users/:id - Admin: edit user, change role
router.put('/:id', adminGuard, [
  body('name').optional().trim().notEmpty(),
  body('role').optional().isIn(['admin', 'user']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/users/:id - Admin only
router.delete('/:id', adminGuard, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  if (user.role === 'admin') return res.status(400).json({ message: 'Cannot delete admin' });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Profile update (own)
router.put('/profile/me', [
  body('name').optional().trim().notEmpty(),
  body('currentPassword').optional(),
  body('newPassword').optional().isLength({ min: 6 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const u = await User.findById(req.user._id).select('+password');
    const { name, currentPassword, newPassword } = req.body;

    if (name) u.name = name;
    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: 'Current password required' });
      const match = await u.matchPassword(currentPassword);
      if (!match) return res.status(400).json({ message: 'Invalid current password' });
      u.password = newPassword;
    }
    await u.save();
    const out = await User.findById(u._id).select('-password');
    res.json(out);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
