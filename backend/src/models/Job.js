const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['open', 'assigned', 'in-progress', 'completed', 'cancelled'],
      default: 'open',
    },
    location: {
      address: String,
      city: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'emergency'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
