const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const CustomError = require('../utils/Customerror');

/**
 * Authentication Middleware
 * 
 * This middleware verifies JWT tokens from the Authorization header
 * and attaches the authenticated user's information to the request object.
 * 
 * How it works:
 * 1. Extract token from Authorization header (Bearer format)
 * 2. Verify token using JWT secret
 * 3. Find user in database
 * 4. Attach user info to request for downstream handlers
 * 
 * Security considerations:
 * - Tokens are verified on every protected request
 * - Invalid/expired tokens are rejected immediately
 * - User existence is verified to prevent orphaned tokens
 */
const authenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new CustomError('Access token is required', 401);
        }

        // Extract token (remove "Bearer " prefix)
        const token = authHeader.substring(7);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user to ensure they still exist
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            throw new CustomError('User not found', 401);
        }

        // Attach user information to request
        req.user = {
            userId: user._id,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new CustomError('Invalid token', 401));
        } else if (error.name === 'TokenExpiredError') {
            next(new CustomError('Token expired', 401));
        } else {
            next(error);
        }
    }
};

/**
 * Authorization Middleware Factory
 * 
 * Creates middleware that checks if the authenticated user has required role(s).
 * Usage: authorize('admin') or authorize(['admin', 'moderator'])
 * 
 * Role-based access control (RBAC) provides:
 * - Granular permissions based on user roles
 * - Flexible permission management
 * - Clear separation of concerns
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new CustomError('Authentication required', 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new CustomError('Insufficient permissions', 403));
        }

        next();
    };
};

/**
 * Optional Authentication Middleware
 * 
 * Similar to authenticate, but doesn't throw error if no token is provided.
 * Useful for endpoints that work with or without authentication.
 */
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(); // Continue without authentication
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (user) {
            req.user = {
                userId: user._id,
                email: user.email,
                role: user.role
            };
        }

        next();
    } catch (error) {
        // Silently ignore auth errors for optional auth
        next();
    }
};

module.exports = {
    authenticate,
    authorize,
    optionalAuth
};
