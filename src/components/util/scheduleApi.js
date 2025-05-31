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
        return json.data || [];
    } catch (error) {
        console.error('Lỗi khi gọi API theo status:', error);
        throw new Error(error.message || 'Đã xảy ra lỗi khi lấy lịch theo trạng thái');
    }
};

export const fetchSchedulesByDoctor = async (doctorId) => {
    const res = await fetch(`${API_URL}/by_doctor/${doctorId}`);
    if (!res.ok) throw new Error("Lỗi khi fetch theo doctor");
    const data = await res.json();
    return data.data;
};