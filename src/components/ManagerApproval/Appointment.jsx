import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            customerName: 'Nguyễn Văn A',
            serviceName: 'Khám nội tổng quát',
            doctorName: 'BS. Trần Thị B',
            clinicName: 'PK Đa khoa A',
            date: '2025-05-20',
            time: '08:00 - 09:00',
            status: 'PENDING',
        },
        {
            id: 2,
            customerName: 'Lê Thị C',
            serviceName: 'Khám da liễu',
            doctorName: 'BS. Nguyễn Văn D',
            clinicName: 'PK Da liễu Q1',
            date: '2025-05-22',
            time: '10:00 - 11:00',
            status: 'PENDING',
        }
    ]);

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                {/* Breadcrumb */}
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/appointment")}>Phê duyệt lịch hẹn</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Phê duyệt lịch hẹn</h2>

                <div className="p-6 space-y-4">
                    {/* Tìm kiếm */}
                    <div className='p-4 flex'>
                        <input
                            type="text"
                            className="col-span-2 border px-3 py-2 rounded-tl-md rounded-bl-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex">
                            <button className="px-4 py-2 bg-blue-600 text-white">Tìm kiếm</button>
                        </div>
                    </div>

                    {/* Bảng danh sách lịch hẹn */}
                    <div className="p-4">
                        <table className="w-full text-sm text-left border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Khách hàng</th>
                                    <th className="p-2">Dịch vụ</th>
                                    <th className="p-2">Bác sĩ</th>
                                    <th className="p-2">Phòng khám</th>
                                    <th className="p-2">Ngày</th>
                                    <th className="p-2">Thời gian</th>
                                    <th className="p-2">Trạng thái</th>
                                    <th className="p-2 text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <tr key={appt.id} className="border-t hover:bg-gray-50">
                                        <td className="p-2">{appt.customerName}</td>
                                        <td className="p-2">{appt.serviceName}</td>
                                        <td className="p-2">{appt.doctorName}</td>
                                        <td className="p-2">{appt.clinicName}</td>
                                        <td className="p-2">{appt.date}</td>
                                        <td className="p-2">{appt.time}</td>
                                        <td className="p-2">
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full 
                                                ${appt.status === 'PENDING' ? 'bg-yellow-500 text-white' :
                                                    appt.status === 'CONFIRMED' ? 'bg-green-500 text-white' :
                                                        'bg-red-500 text-white'}`}>
                                                {appt.status === 'PENDING' ? 'Chờ duyệt' :
                                                    appt.status === 'CONFIRMED' ? 'Đã duyệt' :
                                                        'Đã huỷ'}
                                            </span>
                                        </td>
                                        <td className="p-2 text-center">
                                            <button
                                                onClick={() => navigate(`/appointment/detail`)}
                                                className="px-2 py-1 border rounded text-sm"
                                            >
                                                <Info className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {appointments.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-gray-500">
                                            Không có lịch hẹn nào cần phê duyệt.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Appointment;
