const mongoose = require('mongoose');

const elderlySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'נדרש שם פרטי']
  },
  lastName: {
    type: String,
    required: [true, 'נדרש שם משפחה']
  },
  address: {
    street: {
      type: String,
      required: [true, 'נדרש שם רחוב']
    },
    city: {
      type: String,
      required: [true, 'נדרש שם עיר']
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere',
      required: [true, 'נדרשות קואורדינטות']
    }
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, 'נדרש מספר טלפון']
    },
    emergencyContact: {
      type: String,
      required: [true, 'נדרש איש קשר לחירום']
    }
  },
  medicalInformation: {
    type: String,
    required: [true, 'נדרש מידע רפואי']
  },
  status: {
    type: String,
    enum: ['green', 'yellow', 'red'],
    default: 'green'
  },
  notes: {
    type: String
  },
  comments: {
    type: String
  }
}, { timestamps: true });

// Index for geospatial queries
elderlySchema.index({ 'address.coordinates': '2dsphere' });

module.exports = mongoose.model('Elderly', elderlySchema); 