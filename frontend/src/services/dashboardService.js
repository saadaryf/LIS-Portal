import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/dashboard';
const API_URL = 'https://lis-portal.vercel.app/api/dashboard';

export const dashboardService = {
    async getStudentCount() {
        const response = await axios.get(`${API_URL}/student-count`);
        return response.data.count;
    },

    async getFeeSummary() {
        const response = await axios.get(`${API_URL}/fee-summary`);
        return response.data;
    },

    async getDashboardStats() {
        const response = await axios.get(`${API_URL}/stats`);
        return response.data;
    }
};