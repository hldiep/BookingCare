import axios from "axios";
import { env } from "./Contrainst";

const API_URL = `${env.url.API_BASE_URL}/api/clinic`;
export const fetchAllClinics = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching clinics:', error);
        return [];
    }
};

export const updateCilinic = async (clinicId, clinicData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${clinicId}`, clinicData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật bác sĩ:", error);
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

export const fetchClinicById = async (clinicId) => {
    try {
        const response = await axios.get(`${API_URL}/${clinicId}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi tải chi tiết phòng khám:', error);
        throw error;
    }
};

export const addClinic = async (clinicData) => {
    const response = await axios.get(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clinicData),
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Lỗi khi thêm phòng khám');
    }

    return response.json();
}