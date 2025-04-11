require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB and create initial user
connectDB().then(() => {
  createInitialUser();
});

// Middleware
app.use(express.json());
app.use(cors());

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Create initial admin user
const createInitialUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'admin@elderly.com' });
    
    if (!existingUser) {
      const newUser = new User({
        email: 'admin@elderly.com',
        password: 'Admin123!',
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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/elderly', require('./routes/elderly'));
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