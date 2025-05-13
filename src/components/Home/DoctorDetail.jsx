import React, { useState } from 'react';

const DoctorDetail = () => {
    const [selectedDate, setSelectedDate] = useState('2025-05-12');

    const schedule = {
        '2025-05-12': ['08:00 - 09:00', '10:00 - 11:00', '14:00 - 15:00'],
        '2025-05-13': ['09:00 - 10:00', '13:00 - 14:00'],
        '2025-05-14': ['08:00 - 09:30', '15:00 - 16:00'],
    };

    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container flex justify-center pt-20 p-5'>
                <div className="max-w-4xl mx-auto p-6 space-y-6">
                    <div className="bg-white shadow-md rounded-xl p-6 flex space-x-6">
                        <img
                            src="https://anhcute.net/wp-content/uploads/2024/10/cropped-Hinh-chibi-bac-si-nhan-vat-hoat-hinh-cute.jpg"
                            alt="Doctor"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-highlight">Tiến sĩ, Bác sĩ Trần Thị A</h2>
                            <p className="text-gray-700 mt-2">Chuyên khoa: Nội tổng quát, Tim mạch</p>
                            <p className="text-gray-600">Bệnh viện Đại học Y Hà Nội</p>
                            <p className="mt-2 text-sm text-gray-500">Kinh nghiệm hơn 20 năm trong nghề, chuyên khám và điều trị tăng huyết áp, tim mạch, tiểu đường...</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Lịch khám</h3>

                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày:</label>
                            <select
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                            >
                                {Object.keys(schedule).map((date) => (
                                    <option key={date} value={date}>{date}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {schedule[selectedDate]?.map((time, index) => (
                                <div key={index} className="flex justify-between items-center border p-3 rounded-md shadow-sm hover:bg-blue-50">
                                    <span className="text-gray-700">{time}</span>
                                    <button className="bg-logo text-white px-4 py-1 rounded-full hover:bg-nav transition">
                                        Chọn lịch hẹn
                                    </button>
                                </div>
                            )) || <p className="text-gray-500">Không có lịch khám trong ngày này.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;
