import axios from "axios";

const API_URL = `/api/v1/m/clinics`;
export const fetchAllClinicsManager = async () => {
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
export const fetchAllClinics = async () => {
    try {
        // const token = localStorage.getItem('token');
        const response = await axios.get('/api/v1/p/clinics/active', {
            headers: {
                // Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng khám:', error);
        throw error;
    }
};

export const updateCilinic = async (clinicData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(clinicData),
        });
        return response.json();
    } catch (error) {
        console.error("Lỗi khi cập nhật phòng khám:", error);
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

export const addClinic = async (clinicData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(clinicData),
        });
        const data = await response.json();
        if (!response.ok || data.statusCode !== 201) {
            console.error('Lỗi thêm phòng khám:', data.message)
        }
        return data;
    } catch (err) {
        console.error('Lỗi kết nối đến máy chủ:', err);
    }
}

export const deleteClinic = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Lỗi khi xóa phòng khám:', err);
        throw err.response?.data || { message: 'Lỗi không xác định' };
    }
}