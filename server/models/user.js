/**
 * User Model
 * Defines the schema and methods for user management
 * Includes authentication, validation, and user profile data
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Define the user schema with all required fields and validations
const userSchema = new Schema({
  // User authentication fields
  email: {
    type: String,
    required: [true, 'נדרש אימייל'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'נא להזין כתובת אימייל תקינה']
  },
  password: {
    type: String,
    required: [true, 'נדרשת סיסמה'],
    minlength: [6, 'הסיסמה חייבת להכיל לפחות 6 תווים']
  },

  // User profile information
  firstName: {
    type: String,
    required: [true, 'נדרש שם פרטי']
  },
  lastName: {
    type: String,
    required: [true, 'נדרש שם משפחה']
  },

  // User role and status
  role: {
    type: String,
    enum: ['admin', 'volunteer'],
    default: 'volunteer'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },

  // Address information
  address: {
    street: {
      type: String,
      required: [true, 'נדרש שם רחוב']
    },
    houseNo: {
      type: String,
      required: [true, 'נדרש מספר בית']
    },
    city: {
      type: String,
      required: [true, 'נדרש שם עיר']
    }
  },

  // Optional work address
  workAddress: {
    street: String,
    houseNo: String,
    city: String
  },

  // Contact information
  phone: {
    type: String,
    required: [true, 'נדרש מספר טלפון'],
    match: [/^0[2-9]\d{7,8}$/, 'נא להזין מספר טלפון ישראלי תקין']
  },
  comments: {
    type: String
  },

  // Tracking fields
  lastLogin: {
    type: Date
  }
}, { timestamps: true });

/**
 * Pre-save middleware to hash password before saving
 * Only hashes if password has been modified
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Method to compare candidate password with stored hash
 * @param {string} candidatePassword - Password to compare
 * @returns {Promise<boolean>} - True if passwords match
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Method to update last login timestamp
 * @returns {Promise<void>}
 */
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  await this.save();
};

module.exports = mongoose.model('User', userSchema); 