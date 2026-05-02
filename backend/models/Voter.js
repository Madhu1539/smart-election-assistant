/**
 * Voter.js — Mongoose model for mock voter roll data
 */
const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema(
  {
    voterIdNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    boothNumber: {
      type: String,
      required: true,
    },
    boothAddress: {
      type: String,
      required: true,
    },
    constituency: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Voter', VoterSchema);
