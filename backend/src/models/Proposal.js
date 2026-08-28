const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    proposedPrice: {
      type: Number,
      required: true,
      min: 1,
    },
    estimatedDays: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent a worker from submitting multiple proposals for the same job
proposalSchema.index({ job: 1, worker: 1 }, { unique: true });

module.exports = mongoose.model('Proposal', proposalSchema);
