import axios from 'axios';
import { env } from "./Contrainst";
const API_URL = `${env.url.API_BASE_URL}/api/doctor`;

export const fetchAllDoctors = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data.data;
};
export const addDoctor = async (doctorData) => {
    const response = await axios.get(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Lỗi khi thêm bác sĩ');
    }

    return response.json();
}