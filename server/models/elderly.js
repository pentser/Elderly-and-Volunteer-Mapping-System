const mongoose = require('mongoose');

const elderlySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: [true, 'Coordinates are required'],
      validate: {
        validator: function(v) {
          return v.length === 2;
        },
        message: 'Coordinates must be [longitude, latitude]'
      }
    }
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    emergencyContact: {
      type: String,
      required: [true, 'Emergency contact is required'],
      trim: true
    }
  },
  status: {
    type: String,
    enum: ['green', 'yellow', 'red'],
    default: 'green',
    required: [true, 'Status is required']
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for geospatial queries
elderlySchema.index({ 'address.coordinates': '2dsphere' });

module.exports = mongoose.model('Elderly', elderlySchema); 