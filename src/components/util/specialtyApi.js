import axios from "axios";
import { env } from "./Contrainst";

const API_URL = `${env.url.API_BASE_URL}/api/medical-specialty`;
export const fetchAllSpecialty = async () => {
    try {
        const response = await axios.get(`${API_URL}/add`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching specialty:', error);
        return [];
    }
};
export const updateSpecialty = async (specialtyId, specialtyData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${specialtyId}`, specialtyData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật chuyên khoa:", error);
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
};

export const fetchSpecialtyById = async (specialtyId) => {
    try {
        const response = await axios.get(`${API_URL}/${specialtyId}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi tải chi tiết chuyên khoa:', error);
        throw error;
    }
};

export const addSpecialty = async (specialtyData) => {
    const response = await axios.get(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(specialtyData),
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Lỗi khi thêm chuyên khoa');
    }

    return response.json();
}