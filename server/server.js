/**
 * Main Server File
 * Sets up Express server with middleware and routes
 * Handles server startup and configuration
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const elderlyRoutes = require('./routes/elderly');

const app = express();

// Connect to MongoDB and create initial user
connectDB().then(() => {
  createInitialUser();
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/elderly', elderlyRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Elderly and Volunteer Mapping System API' });
});

// Create initial admin user
const createInitialUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'admin@elderly.com' });
    
    if (!existingUser) {
      const newUser = new User({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        firstName: 'מנהל',
        lastName: 'ראשי',
        role: 'admin'
      });

      await newUser.save();
      console.log('Initial admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating initial user:', error);
  }
};

// Routes
app.use('/api/volunteers', require('./routes/volunteer'));
app.use('/api/visits', require('./routes/visits'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'שגיאת שרת',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 