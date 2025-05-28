import axios from "axios";

const API_URL = `/api/v1/m/medical-specialties`;
export const fetchAllSpecialtyManager = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách chuyên khoa:', error);
        throw error;
    }
};
export const fetchAllSpecialty = async () => {
    try {
        const response = await axios.get('/api/v1/p/medical-specialties/all/active', {
            headers: {
                // Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách chuyên khoa:', error);
        throw error;
    }
};
export const updateSpecialty = async (specialtyData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(specialtyData),
        });
        return response.json();
    } catch (error) {
        console.error("Lỗi khi cập nhật chuyên khoa:", error);
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
};
export const addSpecialty = async (specialtyData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(specialtyData),
        })
        const data = await response.json();
        if (!response.ok || data.statusCode !== 201) {
            console.error('Lỗi thêm chuyên khoa:', data.message)
        }
        return data;
    } catch (err) {
        console.error('Lỗi kết nối đến máy chủ', err);
    }
}

export const deleteSpecialty = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Lỗi khi xóa chuyên khoa:', err);
        throw err.response?.data || { message: 'Lỗi không xác định' };
    }
}