const studentService = require('../services/student.service');

// CREATE
exports.create = async (req, res, next) => {
    try {
        const student = await studentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (err) {
        next(err);
    }
};

// GET ALL
exports.getAll = async (req, res, next) => {
    try {
        const { page, limit, search } = req.query;
        const data = await studentService.getAllStudents({
            page: Number(page),
            limit: Number(limit),
            search
        });
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// GET ONE
exports.getOne = async (req, res, next) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

// UPDATE
exports.update = async (req, res, next) => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

// DELETE
exports.remove = async (req, res, next) => {
    try {
        await studentService.deleteStudent(req.params.id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};