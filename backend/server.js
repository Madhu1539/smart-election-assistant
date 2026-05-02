/**
 * server.js — Express server entry point
 * Smart Election Assistant for Voters (India)
 */
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

// ── Initialize Express App ───────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/chat', require('./routes/chatbotRoutes'));
app.use('/api/voter', require('./routes/voterRoutes'));

// ── Serve Frontend in Production ─────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    // If the request URL starts with /api, we should not send the index.html
    // This allows the 404 handler to catch invalid API routes.
    if (req.url.startsWith('/api/')) return res.status(404).json({ error: 'API Route not found' });
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Smart Election Assistant API is running',
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API Endpoints:`);
  console.log(`   POST /api/chat — Chatbot`);
  console.log(`   POST /api/voter/eligibility — Eligibility Check`);
  console.log(`   GET  /api/voter/booth/:city — Booth Finder`);
  console.log(`   GET  /api/voter/timeline — Election Timeline`);
  console.log(`   GET  /api/health — Health Check`);
});
