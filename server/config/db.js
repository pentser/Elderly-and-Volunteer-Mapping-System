/**
 * Database Configuration
 * Sets up MongoDB connection using Mongoose
 * Handles connection events and errors
 */

const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connects to MongoDB database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using URI from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    // Log connection error and exit process
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;