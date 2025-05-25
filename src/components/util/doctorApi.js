import axios from 'axios';
import { env } from "./Contrainst";
const API_URL = `${env.url.API_BASE_URL}/api/v1/m/doctors`;

export const fetchAllDoctors = async () => {
    try {
        const token = localStorage.getItem('token')
            || 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX01BTkFHRVIifV0sInN1YiI6Im1hbmFnZXIxIiwiaWF0IjoxNzQ4MDk5NjM5LCJleHAiOjE3NDgxMDY4Mzl9.6lCoJ223yW4-CE7R10FUJAb0wnHrqPzinHQdaB8LQ_Y';
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
};
export const updateDoctor = async (doctorId, doctorData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${doctorId}`, doctorData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật bác sĩ:", error);
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
};

export const fetchDoctorById = async (doctorId) => {
    try {
        const response = await axios.get(`${API_URL}/${doctorId}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi tải chi tiết bác sĩ:', error);
        throw error;
    }
};

export const addDoctor = async (doctorData) => {
    const response = await axios.get(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Lỗi khi thêm bác sĩ');
    }

    return response.json();
}

export const fetchDoctorCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/count`);
        return response.data.data;
    } catch (err) {
        console.error("Lỗi lấy số lượng bác sĩ:", err);
        return 0;
    }
}