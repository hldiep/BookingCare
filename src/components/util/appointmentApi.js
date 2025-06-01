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