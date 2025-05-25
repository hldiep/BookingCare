import axios from "axios";

const API_URL = `/api/v1/m/medical-specialties`;
export const fetchAllSpecialty = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách chuyên khoa:', error);
        throw error;
    }
};
export const updateSpecialty = async (specialtyId, specialtyData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${specialtyId}`, specialtyData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật chuyên khoa:", error);
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
};

// export const fetchSpecialtyById = async (id) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${API_URL}/${id}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(errorText || 'Không tìm thấy chuyên khoa');
//         }
//         const json = await response.json();
//         return json.data;
//     } catch (error) {
//         console.error('Lỗi khi gọi API fetchSpecialtyById:', error);
//         throw new Error(error.message || 'Đã xảy ra lỗi khi lấy thông tin chuyên khoa');
//     }
// };

export const addSpecialty = async (specialtyData) => {
    const response = await axios.get(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(specialtyData),
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Lỗi khi thêm chuyên khoa');
    }

    return response.json();
}