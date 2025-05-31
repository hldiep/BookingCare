import axios from 'axios';
const API_URL = '/api/v1/m/doctors';

export const fetchAllDoctors = async () => {
    try {
        const response = await axios.get('/api/v1/p/doctors/active/all', {
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
};

export const fetchAllDoctorsManager = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
        }
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
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
};
export const updateDoctor = async (doctorData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(doctorData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi cập nhật bác sĩ');
        }

        return await response.json();
    } catch (error) {
        console.error("Lỗi khi cập nhật bác sĩ:", error);
        throw error;
    }
};

export const fetchDoctorByIdManager = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const url = `${API_URL}/${id}`;
        console.log('Fetching doctor by ID:', url);

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Response body:', text);

        if (!response.ok) {
            throw new Error(text || 'Không tìm thấy bác sĩ');
        }

        const json = JSON.parse(text);
        return json.data;
    } catch (error) {
        console.error('Lỗi khi gọi API fetchDoctorByIdManager:', error);
        throw new Error(error.message || 'Đã xảy ra lỗi khi lấy thông tin bác sĩ');
    }
};

export const fetchDoctorById = async (id) => {
    try {
        const response = await fetch(`/api/v1/p/doctors/${id}`, {
            headers: {
                //'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Không tìm thấy bác sĩ');
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error('Lỗi khi gọi API fetchDoctorById:', error);
        throw new Error(error.message || 'Đã xảy ra lỗi khi lấy thông tin bác sĩ');
    }
};
export const addDoctor = async (doctorData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(doctorData),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Lỗi thêm bác sĩ:", data.message || response.statusText);
            throw new Error(data.message || "Lỗi không xác định khi thêm bác sĩ.");
        }
        return data;
    } catch (error) {
        console.error("addDoctor error:", error);
        throw error;
    }
};

export const deleteDoctor = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            console.log('Xóa thành công');
        } else {
            console.error('Xóa thất bại');
        }
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
}
// export const fetchDoctorCount = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/count`);
//         return response.data.data;
//     } catch (err) {
//         console.error("Lỗi lấy số lượng bác sĩ:", err);
//         return 0;
//     }
// }

export const fetchPageDoctor = async (page = 0, size = 10, sortBy = 'id') => {
    try {
        const response = await axios.get(`/api/v1/p/doctors/active/page`, {
            params: { page, size, sortBy },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data.data;
    } catch (error) {
        console.error('Lỗi:', error.error);
        throw error;
    }
};

export const fetchPageDoctorManager = async (page = 0, size = 10, sortBy = 'id') => {
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
            data: result.data.data || [],
            totalPages: result.data.totalPages || 0,
            totalItems: result.data.totalItems || 0,
            currentPage: result.data.currentPage || 0,
        };
    } catch (error) {
        console.error('Lỗi:', error.error);
        throw error;
    }
};