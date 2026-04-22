const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const CustomError = require('../utils/Customerror');

/**
 * JWT Token Generation
 * 
 * JSON Web Tokens (JWT) are compact, URL-safe tokens that represent claims
 * to be transferred between two parties. They consist of three parts:
 * 1. Header (algorithm and token type)
 * 2. Payload (claims/user data)
 * 3. Signature (verifies integrity)
 * 
 * Security benefits:
 * - Stateless: No server-side session storage needed
 * - Tamper-proof: Signature prevents modification
 * - Self-contained: All user info is in the token
 */
const generateToken = (userId, email) => {
    return jwt.sign(
        { 
            userId, 
            email 
        },
        process.env.JWT_SECRET,
        { 
            expiresIn: process.env.JWT_EXPIRES_IN || '7d' // Token expires in 7 days
        }
    );
};

/**
 * User Signup
 * 
 * Creates a new user account with hashed password.
 * Returns JWT token for immediate authentication.
 */
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            throw new CustomError('Name, email, and password are required', 400);
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new CustomError('User with this email already exists', 409);
        }

        // Create new user (password will be hashed by pre-save middleware)
        const user = await User.create({
            name,
            email,
            password
        });

        // Generate JWT token
        const token = generateToken(user._id, user.email);

        // Return user data and token (password is excluded by toJSON method)
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * User Login
 * 
 * Authenticates user credentials and returns JWT token.
 * Uses bcrypt to compare hashed passwords securely.
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            throw new CustomError('Email and password are required', 400);
        }

        // Find user and include password for comparison
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            throw new CustomError('Invalid email or password', 401);
        }

        // Compare provided password with stored hash
        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
            throw new CustomError('Invalid email or password', 401);
        }

        // Generate JWT token
        const token = generateToken(user._id, user.email);

        // Return user data and token (password is excluded)
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get Current User Profile
 * 
 * Returns the authenticated user's profile information.
 * This endpoint requires authentication middleware.
 */
exports.getProfile = async (req, res, next) => {
    try {
        // User is already attached to request by auth middleware
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            throw new CustomError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Refresh Token
 * 
 * Issues a new JWT token for the authenticated user.
 * Useful for implementing token refresh strategies.
 */
exports.refreshToken = async (req, res, next) => {
    try {
        // User is already authenticated by middleware
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            throw new CustomError('User not found', 404);
        }

        // Generate new token
        const token = generateToken(user._id, user.email);

        res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                token
            }
        });
    } catch (err) {
        next(err);
    }
};
