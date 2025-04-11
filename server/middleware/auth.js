/**
 * Authentication Middleware
 * Verifies JWT tokens and attaches user data to requests
 * Protects routes that require authentication
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Middleware to verify JWT token and authenticate user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'נדרש טוקן אימות'
      });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'משתמש לא נמצא'
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({
      success: false,
      message: 'טוקן לא תקין',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = auth; 