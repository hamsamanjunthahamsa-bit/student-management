const express = require('express');
const router = express.Router();

// Import authentication controller functions
const authController = require('../controllers/auth.controller');

// Import authentication middleware
const { authenticate } = require('../middlewares/auth.middleware');

/**
 * Authentication Routes
 * 
 * These routes handle user authentication operations:
 * - POST /api/auth/signup - Create new user account
 * - POST /api/auth/login - Authenticate user and get token
 * - GET /api/auth/profile - Get current user profile (protected)
 * - POST /api/auth/refresh - Refresh JWT token (protected)
 */

/**
 * User Signup
 * 
 * Endpoint: POST /api/auth/signup
 * Description: Create a new user account
 * Request Body: { name, email, password }
 * Response: { user, token }
 * Public: Yes (no authentication required)
 */
router.post('/signup', authController.signup);

/**
 * User Login
 * 
 * Endpoint: POST /api/auth/login
 * Description: Authenticate user and return JWT token
 * Request Body: { email, password }
 * Response: { user, token }
 * Public: Yes (no authentication required)
 */
router.post('/login', authController.login);

/**
 * Get User Profile
 * 
 * Endpoint: GET /api/auth/profile
 * Description: Get current authenticated user's profile
 * Response: { user }
 * Protected: Yes (requires valid JWT token)
 */
router.get('/profile', authenticate, authController.getProfile);

/**
 * Refresh Token
 * 
 * Endpoint: POST /api/auth/refresh
 * Description: Generate new JWT token for authenticated user
 * Response: { token }
 * Protected: Yes (requires valid JWT token)
 */
router.post('/refresh', authenticate, authController.refreshToken);

module.exports = router;
