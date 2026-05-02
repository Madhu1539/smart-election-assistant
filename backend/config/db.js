/**
 * db.js — MongoDB connection via Mongoose
 * Non-fatal: app continues even if MongoDB is unavailable.
 * All chatbot, eligibility, booth, and timeline features use in-memory data
 * and work without a database connection.
 */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn(`⚠️  No MONGO_URI provided. Skipping database connection attempt.`);
      console.warn(`   App will run in no-database mode — all features still work!`);
      return;
    }
    
    // Set server selection timeout to 5 seconds to fail fast
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB not available: ${error.message}`);
    console.warn(`   App will run in no-database mode — all features still work!`);
    // Do NOT process.exit — app continues with in-memory data
  }
};

module.exports = connectDB;
