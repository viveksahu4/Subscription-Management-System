const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gym_subscription');
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@gym.com';
    const adminPassword = 'admin123';

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });
    
    if (admin) {
      // Update existing admin password
      admin.password = adminPassword;
      admin.role = 'admin';
      await admin.save();
      console.log('✅ Admin user updated successfully!');
    } else {
      // Create new admin user
      admin = await User.create({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created successfully!');
    }

    console.log('\n📧 Admin Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Role: ${admin.role}`);
    
    // Verify the password works
    const match = await admin.matchPassword(adminPassword);
    if (match) {
      console.log('\n✅ Password verification successful!');
    } else {
      console.log('\n❌ Password verification failed!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
