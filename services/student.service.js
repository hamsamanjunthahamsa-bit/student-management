const fs = require('fs');
const path = require('path');
const Student = require('../models/student.model');
const { generateId } = require('../utils/idGenerator');
const CustomError = require('../utils/Customerror');

const filePath = path.join(__dirname, '../data/students.json');

// Read data
const readData = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Write data
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// CREATE
exports.createStudent = (payload) => {
    const students = readData();

    const newStudent = new Student({
        id: generateId(),
        ...payload
    });

    students.push(newStudent);
    writeData(students);

    return newStudent;
};

// GET ALL + pagination + search
exports.getAllStudents = ({ page = 1, limit = 5, search = '' }) => {
    let students = readData();

    if (search) {
        students = students.filter(s =>
            s.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        total: students.length,
        data: students.slice(start, end)
    };
};

// GET BY ID
exports.getStudentById = (id) => {
    const students = readData();
    const student = students.find(s => s.id === id);

    if (!student) {
        throw new CustomError('Student not found', 404);
    }

    return student;
};

// UPDATE
exports.updateStudent = (id, payload) => {
    const students = readData();
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        throw new CustomError('Student not found', 404);
    }

    students[index] = { ...students[index], ...payload };
    writeData(students);

    return students[index];
};

// DELETE
exports.deleteStudent = (id) => {
    const students = readData();
    const filtered = students.filter(s => s.id !== id);

    if (students.length === filtered.length) {
        throw new CustomError('Student not found', 404);
    }

    writeData(filtered);
};