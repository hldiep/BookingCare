import axios from "axios";

const API_URL = `/api/v1/m/services`;
export const fetchAllServices = async () => {
    try {
        const response = await axios.get('/api/v1/p/services/active', {
            headers: {
                // Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
        throw error;
    }
}
export const fetchAllServicesManager = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
        throw error;
    }
}

export const updateService = async (serviceData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(serviceData),
        });
        return response.json();
    } catch (error) {
        console.error("Lỗi khi cập nhật dịch vụ:", error);
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
};

export const addService = async (service) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(service),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Thêm dịch vụ thất bại');
    }

    return await response.json();
};

export const deleteService = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Lỗi khi xóa dịch vụ:', err);
        throw err.response?.data || { message: 'Lỗi không xác định' };
    }
}