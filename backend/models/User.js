/**
 * User.js — Mongoose model for registered users
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: 1,
      max: 120,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
