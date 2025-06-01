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
        const response = await axios.get('/api/v1/p/medical-specialties/active/all', {
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

export const fetchPageSpecialty = async (page = 0, size = 10, sortBy = 'id') => {
    try {
        const response = await axios.get(`/api/v1/p/medical-specialties/active/page`, {
            params: { page, size, sortBy },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data.data;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Lỗi không xác định từ server';
            console.error(`Lỗi từ server [${status}]:`, message);
            throw new Error(`Lỗi server [${status}]: ${message}`);
        } else if (error.request) {
            console.error('Không nhận được phản hồi từ server:', error.request);
            throw new Error('Không kết nối được đến server.');
        } else {
            console.error('Lỗi khác:', error.message);
            throw new Error(`Lỗi không xác định: ${error.message}`);
        }
    }
}

export const fetchPageSpecialtyManager = async (page = 0, size = 10, sortBy = 'id') => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/page`, {
            params: { page, size, sortBy },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const result = response.data;

        return {
            data: result.data.data || [], // danh sách chuyên khoa
            totalPages: result.data.totalPages || 0, // tổng số trang
            totalItems: result.data.totalItems || 0, // tổng số mục (nếu cần)
            currentPage: result.data.currentPage || 0, // trang hiện tại (nếu cần)
        };
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Lỗi không xác định từ server';
            console.error(`Lỗi từ server [${status}]:`, message);
            throw new Error(`Lỗi server [${status}]: ${message}`);
        } else if (error.request) {
            console.error('Không nhận được phản hồi từ server:', error.request);
            throw new Error('Không kết nối được đến server.');
        } else {
            console.error('Lỗi khác:', error.message);
            throw new Error(`Lỗi không xác định: ${error.message}`);
        }
    }
};

export const updateSpecialtyStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/v1/m/medical-specialties/update/status/${id}?status=${status}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi khi cập nhật trạng thái chuyên khoa');
    }

    return await response.json();
};