import axios from "axios";

const API_URL = `/api/v1/p/services`;
export const fetchAllServices = async () => {
    try {
        const response = await axios.get(`${API_URL}/active`, {
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
        const response = await axios.get('/api/v1/m/services/all', {
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

export const updateService = async (serviceId, serviceData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${serviceId}`, serviceData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật dịch vụ:", error);
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
};

export const fetchServiceById = async (serviceId) => {
    try {
        const response = await axios.get(`${API_URL}/${serviceId}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi tải chi tiết dịch vụ:', error);
        throw error;
    }
};

export const addService = async (serviceData) => {
    const response = await axios.get(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Lỗi khi thêm dịch vụ');
    }

    return response.json();
}