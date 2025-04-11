/**
 * Authentication Controller
 * Handles user registration, login, and profile management
 * Includes JWT token generation and validation
 */

const User = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.register = async (req, res) => {
  try {
    // Extract user data from request body
    const { email, password, firstName, lastName, address, workAddress, phone, comments } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'משתמש עם כתובת אימייל זו כבר קיים במערכת'
      });
    }

    // Create new user with provided data
    user = new User({
      email,
      password,
      firstName,
      lastName,
      address,
      workAddress,
      phone,
      comments
    });

    // Save user to database (password will be hashed by pre-save middleware)
    await user.save();

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return success response with token and user data
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        address: user.address,
        workAddress: user.workAddress,
        phone: user.phone,
        comments: user.comments
      }
    });
  } catch (error) {
    // Handle any errors during registration
    res.status(500).json({
      success: false,
      message: 'שגיאה ביצירת משתמש',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Login user and generate JWT token
 * @route POST /api/auth/login
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
  try {
    // Extract login credentials
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'אימייל או סיסמה לא נכונים'
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'אימייל או סיסמה לא נכונים'
      });
    }

    // Update last login timestamp
    await user.updateLastLogin();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return success response with token and user data
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        address: user.address,
        workAddress: user.workAddress,
        phone: user.phone,
        comments: user.comments,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    // Handle any errors during login
    res.status(500).json({
      success: false,
      message: 'שגיאה בהתחברות',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/me
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getMe = async (req, res) => {
  try {
    // Find user by ID and exclude password
    const user = await User.findById(req.user.id).select('-password');
    
    // Return user profile
    res.json({
      success: true,
      user
    });
  } catch (error) {
    // Handle any errors during profile retrieval
    res.status(500).json({
      success: false,
      message: 'שגיאה בקבלת פרטי משתמש',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 