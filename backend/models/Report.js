const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['subscription', 'payment', 'revenue'], required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  amount: { type: Number },
  description: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

reportSchema.index({ user: 1 });
reportSchema.index({ type: 1, date: 1 });

module.exports = mongoose.model('Report', reportSchema);
