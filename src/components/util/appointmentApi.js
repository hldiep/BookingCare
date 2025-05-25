import axios from "axios";
import { env } from "./Contrainst";

const API_URL = `${env.url.API_BASE_URL}/api/appointment`;

// export const fetchSchedulesByDoctorId = async (doctorId) => {
//     try {
//         const response = await axios.get(`${API_URL}?doctor_id=${doctorId}`);
//         return response.data.data;
//     } catch (error) {
//         console.error('Lỗi khi tải lịch khám theo bác sĩ:', error);
//         throw error;
//     }
// };