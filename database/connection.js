/**
 * connection.js — Standalone MongoDB connection for database utilities
 */
const mongoose = require('mongoose');
require('dotenv').config({ path: '../backend/.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/election_assistant';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Database connected successfully');
    return mongoose.connection;
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    throw err;
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('🔌 Database disconnected');
};

module.exports = { connectDB, disconnectDB };
