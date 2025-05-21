import axios from "axios";
import { env } from "./Contrainst";

const API_URL = `${env.url.API_BASE_URL}/api/schedule`;
export const fetchAllSchedule = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return [];
    }
};

export const fetchScheduleById = async (scheduleId) => {
    try {
        const response = await axios.get(`${API_URL}/${scheduleId}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi tải chi tiết lịch khám:', error);
        throw error;
    }
};