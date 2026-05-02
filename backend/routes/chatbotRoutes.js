/**
 * chatbotRoutes.js — Routes for the chatbot API
 */
const express = require('express');
const router = express.Router();
const { getChatbotResponse } = require('../controllers/chatbotController');

// POST /api/chat — Send a message and get a response
router.post('/', getChatbotResponse);

module.exports = router;
