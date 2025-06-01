import axios from "axios";

const API_URL = `/api/v1/p/schedules`;
export const fetchAllSchedule = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách lịch trình:', error);
        return [];
    }
};
export const fetchScheduleById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Không tìm thấy lịch');
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw new Error(error.message || 'Đã xảy ra lỗi khi lấy thông tin');
    }
};
export const fetchSchedulesById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Không tìm thấy lịch khám');
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw new Error(error.message || 'Đã xảy ra lỗi khi lấy lịch khám');
    }
};

export const fetchSchedulesByStatus = async (status) => {
    try {
        const response = await fetch(`${API_URL}/by_status/${status}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Không tìm thấy lịch theo trạng thái');
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error('Lỗi khi gọi API theo status:', error);
        throw new Error(error.message || 'Đã xảy ra lỗi khi lấy lịch theo trạng thái');
    }
};

export const fetchSchedulesByDoctor = async (doctorId) => {
    try {
        const res = await fetch(`${API_URL}/by_doctor/${doctorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Lỗi', error);
        throw error;
    }
};
export const editSchedule = async (schedule) => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`/api/v1/d/doctor-schedules/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(schedule)
        });

        if (!res.ok) {
            throw new Error('Cập nhật lịch thất bại');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi cập nhật lịch:', error);
        throw error;
    }
};
export const addSchedule = async (schedule) => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch('/api/v1/d/doctor-schedules/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(schedule)
        });

        if (!res.ok) {
            throw new Error('Thêm lịch thất bại');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi thêm lịch:', error);
        throw error;
    }
};
