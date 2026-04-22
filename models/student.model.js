const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [1, 'Age must be at least 1']
    },
    course: {
        type: String,
        required: [true, 'Course is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);