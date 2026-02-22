const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  gymName: { type: String, default: 'Gym Subscription' },
  tax: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  config: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
