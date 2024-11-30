// frontend/src/services/feeService.js
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/fees';
const API_URL = 'https://lis-portal.vercel.app/api/fees';

export const getFees = async (skip = 0, limit = 100) => {
    const response = await axios.get(`${API_URL}?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const getFeeBystudent_id = async (student_id) => {
    const response = await axios.get(`${API_URL}/${student_id}`);
    return response.data;
};

export const updateFee = async (student_id, feeData) => {
    const response = await axios.put(`${API_URL}/${student_id}`, feeData);
    return response.data;
};