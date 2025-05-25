import axios from 'axios';
const API_URL = '/api/v1/m/doctors';

export const fetchAllDoctors = async () => {
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

export const fetchDoctorById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
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
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(doctorData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi thêm bác sĩ');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('addDoctor error:', error);
        throw error;
    }
};

export const deleteDoctor = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Xóa thành công');
        } else {
            console.error('Xóa thất bại');
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
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