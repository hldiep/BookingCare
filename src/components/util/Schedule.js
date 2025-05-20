import axios from "axios";
import { env } from "./Contrainst";

const API_URL = `${env.url.API_BASE_URL}/api/schedule`;
export const fetchAllSchedule = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data.data;
};