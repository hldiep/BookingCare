import axios from "axios";
import { env } from "./Contrainst";

const API_URL = `${env.url.API_BASE_URL}/api/medical-specialty`;
export const fetchAllSpecialty = async () => {
    const response = await axios.get(`${API_URL}/add`);
    return response.data.data;
};