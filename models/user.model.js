const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * User Schema for Authentication
 * 
 * This schema defines the structure for user accounts in the system.
 * It includes:
 * - Basic user information (name, email)
 * - Secure password storage using bcrypt hashing
 * - Timestamps for tracking user creation
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Don't include password in queries by default
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

/**
 * Password Hashing Middleware
 * 
 * This pre-save hook automatically hashes passwords before saving them to the database.
 * 
 * Why we hash passwords:
 * - Security: Plain text passwords are extremely dangerous if the database is compromised
 * - One-way encryption: Hashes cannot be reversed to obtain the original password
 * - Salt: bcrypt adds random salt to each password, preventing rainbow table attacks
 * - Performance: bcrypt is designed to be slow, making brute-force attacks impractical
 */
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate salt and hash password
        // Salt rounds: 12 is a good balance between security and performance
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Password Comparison Method
 * 
 * This instance method compares a plain-text password with the stored hash.
 * Used during login to verify user credentials.
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

/**
 * Transform method to remove sensitive data
 * This removes the password field when converting to JSON
 */
userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
