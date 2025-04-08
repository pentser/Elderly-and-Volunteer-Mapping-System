const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  elderly: {
    type: Schema.Types.ObjectId,
    ref: 'Elderly',
    required: true
  },
  volunteer: {
    type: Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  actualStartTime: Date,
  actualEndTime: Date,
  notes: String,
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
  }
}, { timestamps: true });

visitSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Visit', visitSchema); 