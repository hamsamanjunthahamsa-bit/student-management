// src/services/authService.js

// Vite uses import.meta.env to access environment variables.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Authentication Service
 * 
 * This service handles all authentication-related API calls including:
 * - User signup and login
 * - Token management
 * - User profile operations
 * 
 * Security features:
 * - JWT token storage in localStorage
 * - Automatic token inclusion in API headers
 * - Token refresh capabilities
 */

/**
 * Store JWT token in localStorage
 * 
 * Why localStorage:
 * - Persists across browser sessions
 * - Simple to implement
 * - Suitable for this demo application
 * 
 * Production considerations:
 * - Consider httpOnly cookies for better security
 * - Implement token refresh mechanisms
 * - Handle storage encryption for sensitive data
 */
const setToken = (token) => {
    localStorage.setItem('jwt_token', token);
};

/**
 * Retrieve JWT token from localStorage
 */
const getToken = () => {
    return localStorage.getItem('jwt_token');
};

/**
 * Remove JWT token from localStorage
 * Used during logout
 */
const removeToken = () => {
    localStorage.removeItem('jwt_token');
};

/**
 * Check if user is authenticated
 * Returns true if token exists
 */
const isAuthenticated = () => {
    const token = getToken();
    return !!token; // Returns true if token exists
};

/**
 * Get Authorization header with Bearer token
 * This is used by other API services to include authentication
 */
const getAuthHeaders = () => {
    const token = getToken();
    if (token) {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }
    return {
        'Content-Type': 'application/json'
    };
};

/**
 * User Signup
 * 
 * Creates a new user account and stores the JWT token
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} User data and token
 */
export const authService = {
    async signup(userData) {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create account');
        }

        const data = await response.json();
        
        // Store JWT token for future requests
        if (data.data?.token) {
            setToken(data.data.token);
        }

        return data.data;
    },

    /**
     * User Login
     * 
     * Authenticates user credentials and stores JWT token
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.email - User's email
     * @param {string} credentials.password - User's password
     * @returns {Promise<Object>} User data and token
     */
    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        
        // Store JWT token for future requests
        if (data.data?.token) {
            setToken(data.data.token);
        }

        return data.data;
    },

    /**
     * Get User Profile
     * 
     * Retrieves current user's profile information
     * Requires valid JWT token
     * @returns {Promise<Object>} User profile data
     */
    async getProfile() {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to get profile');
        }

        const data = await response.json();
        return data.data;
    },

    /**
     * Refresh JWT Token
     * 
     * Generates a new JWT token for the authenticated user
     * Useful for implementing token refresh strategies
     * @returns {Promise<Object>} New JWT token
     */
    async refreshToken() {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to refresh token');
        }

        const data = await response.json();
        
        // Update stored token
        if (data.data?.token) {
            setToken(data.data.token);
        }

        return data.data;
    },

    /**
     * Logout User
     * 
     * Removes JWT token from localStorage
     * In a production app, you might also want to:
     * - Call a logout endpoint to invalidate the token server-side
     * - Clear other user data from storage
     * - Redirect to login page
     */
    logout() {
        removeToken();
    },

    // Utility functions
    isAuthenticated,
    getToken,
    getAuthHeaders
};

export default authService;
