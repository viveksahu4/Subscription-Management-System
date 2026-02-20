const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// POST /api/auth/register
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    // Normalize email to lowercase for consistent lookup
    const normalizedEmail = email.toLowerCase().trim();
    
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      console.log(`Login attempt failed: User not found for email ${normalizedEmail}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await user.matchPassword(password);
    if (!match) {
      console.log(`Login attempt failed: Password mismatch for email ${normalizedEmail}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`Login successful: ${user.email} (${user.role})`);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me (protected)
router.get('/me', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
