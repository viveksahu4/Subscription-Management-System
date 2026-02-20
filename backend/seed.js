const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const SubscriptionPlan = require('./models/SubscriptionPlan');
const Settings = require('./models/Settings');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gym_subscription');
    console.log('Connected to MongoDB');
    
    // Delete existing users and plans
    await User.deleteMany({});
    await SubscriptionPlan.deleteMany({});
    console.log('Cleared existing data');
    
    // Create admin user - password will be hashed by pre-save hook
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@gym.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created:', admin.email);
    
    // Create subscription plans
    await SubscriptionPlan.insertMany([
      { name: 'Monthly', duration: 1, price: 500, description: '1 month access' },
      { name: 'Quarterly', duration: 3, price: 1200, description: '3 months access' },
      { name: 'Yearly', duration: 12, price: 4500, description: '12 months access' },
    ]);
    console.log('Subscription plans created');
    
    // Create/update settings
    await Settings.findOneAndUpdate({}, { gymName: 'Gym Subscription', tax: 18, currency: 'INR' }, { upsert: true });
    console.log('Settings updated');
    
    console.log('\n✅ Seed completed successfully!');
    console.log('📧 Admin Email: admin@gym.com');
    console.log('🔑 Admin Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed().catch((e) => { console.error(e); process.exit(1); });
