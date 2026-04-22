// Mock Data
let students = [
  { id: '1', name: 'Alice Johnson', age: 20, course: 'Computer Science' },
  { id: '2', name: 'Bob Smith', age: 22, course: 'Mathematics' },
  { id: '3', name: 'Charlie Brown', age: 21, course: 'Physics' },
  { id: '4', name: 'Diana Prince', age: 23, course: 'Engineering' }
];

// Helper to simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const studentService = {
  // GET ALL
  async getAllStudents() {
    await delay(500); // Simulate network latency
    return [...students];
  },

  // GET ONE
  async getStudentById(id) {
    await delay(300);
    const student = students.find(s => s.id === id);
    if (!student) throw new Error('Student not found');
    return { ...student };
  },

  // CREATE
  async createStudent(studentData) {
    await delay(500);
    const newStudent = {
      id: Date.now().toString(),
      ...studentData
    };
    students.push(newStudent);
    return newStudent;
  },

  // UPDATE
  async updateStudent(id, studentData) {
    await delay(500);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Student not found');
    
    students[index] = { ...students[index], ...studentData };
    return { ...students[index] };
  },

  // DELETE
  async deleteStudent(id) {
    await delay(500);
    const initialLength = students.length;
    students = students.filter(s => s.id !== id);
    if (students.length === initialLength) throw new Error('Student not found');
    return true;
  }
};
