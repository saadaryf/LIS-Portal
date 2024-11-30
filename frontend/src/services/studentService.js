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

export const getStudentById = async (student_id) => {
    const response = await axios.get(`${API_URL}/${student_id}`);
    return response.data;
};

export const updateStudent = async (student_id, studentData) => {
    const response = await axios.put(`${API_URL}/${student_id}`, studentData);
    return response.data;
};


export const deleteStudent = async (student_id) => {
    await axios.delete(`${API_URL}/${student_id}`);
};

