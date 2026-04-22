// src/services/studentService.js

// Vite uses import.meta.env to access environment variables.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/students';

export const studentService = {
  // GET ALL
  async getAllStudents() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch students');
    }
    const data = await response.json();
    
    // The backend returns MongoDB documents with `_id`, so we map it to `id`
    // to match the frontend components' expectations.
    return data.map(student => ({
      ...student,
      id: student._id
    }));
  },

  // GET ONE
  async getStudentById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Student not found');
    }
    const student = await response.json();
    return { ...student, id: student._id };
  },

  // CREATE
  async createStudent(studentData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create student');
    }
    const newStudent = await response.json();
    return { ...newStudent, id: newStudent._id };
  },

  // UPDATE
  async updateStudent(id, studentData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update student');
    }
    const updatedStudent = await response.json();
    return { ...updatedStudent, id: updatedStudent._id };
  },

  // DELETE
  async deleteStudent(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete student');
    }
    return true;
  }
};
