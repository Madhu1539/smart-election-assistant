/**
 * api.js — Axios API service layer
 * All backend API calls are centralized here.
 */
import axios from 'axios';

// Base URL — reads from .env or defaults to localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Axios instance with defaults
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// ── Request interceptor (for future auth tokens) ──────────────────────────────
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ── Response interceptor ──────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

// ── API Functions ─────────────────────────────────────────────────────────────

/**
 * Send a message to the chatbot and get a response
 * @param {string} message - User message
 */
export const sendChatMessage = (message) =>
  api.post('/chat', { message });

/**
 * Check voter eligibility by age
 * @param {number} age - User's age
 */
export const checkEligibility = (age) =>
  api.post('/voter/eligibility', { age });

/**
 * Find polling booths by city
 * @param {string} city - City name
 */
export const findBoothByCity = (city) =>
  api.get(`/voter/booth/${encodeURIComponent(city)}`);

/**
 * Get election timeline events
 */
export const getElectionTimeline = () =>
  api.get('/voter/timeline');

/**
 * Health check
 */
export const healthCheck = () =>
  api.get('/health');

export default api;
