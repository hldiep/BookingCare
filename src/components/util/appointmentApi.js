import axios from "axios";

export const addAppointments = async (appointment) => {
    try {
        const response = await fetch('/api/v1/p/appointments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(appointment)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Lỗi từ backend:', response.status, errorText);
            throw new Error(`Lỗi ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu tạo lịch hẹn:', error);
        throw error;
    }
};

export const getPageAppointment = async (page = 0, size = 10, sortBy = 'id') => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/v1/sh/appointments/page`, {
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