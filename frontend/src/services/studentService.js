// frontend/src/services/studentService.js
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/students';
const API_URL = 'https://lis-portal.vercel.app/api/students';

export const createStudent = async (studentData) => {
    const response = await axios.post(API_URL, studentData);
    return response.data;
};

export const getStudents = async (skip = 0, limit = 100) => {
    const response = await axios.get(`${API_URL}?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const getStudentById = async (studentId) => {
    const response = await axios.get(`${API_URL}/${studentId}`);
    return response.data;
};

export const updateStudent = async (studentId, studentData) => {
    const response = await axios.put(`${API_URL}/${studentId}`, studentData);
    return response.data;
};


export const deleteStudent = async (studentId) => {
    await axios.delete(`${API_URL}/${studentId}`);
};

