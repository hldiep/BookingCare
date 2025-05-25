import axios from "axios";

const API_URL = `/api/v1/m/clinics`;
export const fetchAllClinics = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng khám:', error);
        throw error;
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