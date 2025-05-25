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

export const fetchSchedulesByDoctorId = async (doctorId) => {
    try {
        const response = await axios.get(`${API_URL}?doctor_id=${doctorId}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi tải lịch khám theo bác sĩ:', error);
        throw error;
    }
};

export const fetchSchdulesByStatus = async (status) => {
    const res = await fetch(`${API_URL}/by_status/${status}`);
    if (!res.ok) throw new Error("Lỗi khi fetch theo status");
    const data = await res.json();
    return data.data;
}

export const fetchSchedulesByDoctor = async (doctorId) => {
    const res = await fetch(`${API_URL}/by_doctor/${doctorId}`);
    if (!res.ok) throw new Error("Lỗi khi fetch theo doctor");
    const data = await res.json();
    return data.data;
};