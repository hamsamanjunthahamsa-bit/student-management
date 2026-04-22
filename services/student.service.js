const Student = require('../models/student.model');
const CustomError = require('../utils/Customerror');

// CREATE
exports.createStudent = async (payload) => {
    const newStudent = await Student.create(payload);
    return newStudent;
};

// GET ALL + pagination + search
exports.getAllStudents = async ({ page = 1, limit = 5, search = '' }) => {
    const query = {};
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    const start = (page - 1) * limit;

    const [total, data] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query).skip(start).limit(limit)
    ]);

    return {
        total,
        data
    };
};

// GET BY ID
exports.getStudentById = async (id) => {
    const student = await Student.findById(id);

    if (!student) {
        throw new CustomError('Student not found', 404);
    }

    return student;
};

// UPDATE
exports.updateStudent = async (id, payload) => {
    const student = await Student.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });

    if (!student) {
        throw new CustomError('Student not found', 404);
    }

    return student;
};

// DELETE
exports.deleteStudent = async (id) => {
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
        throw new CustomError('Student not found', 404);
    }

    return student;
};