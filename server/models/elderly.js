const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const elderlySchema = new Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    street: String,
    city: String,
    zipCode: String
  },
  phone: String,
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  needs: [String],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

elderlySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Elderly', elderlySchema); 