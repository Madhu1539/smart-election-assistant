/**
 * voterRoutes.js — Routes for voter-related APIs
 */
const express = require('express');
const router = express.Router();
const {
  checkEligibility,
  findBooth,
  getTimeline,
} = require('../controllers/voterController');

// POST /api/voter/eligibility — Check voter eligibility
router.post('/eligibility', checkEligibility);

// GET /api/voter/booth/:city — Find polling booth by city
router.get('/booth/:city', findBooth);

// GET /api/voter/timeline — Get election timeline
router.get('/timeline', getTimeline);

module.exports = router;
