import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const Appointment = () => {
    const navigate = useNavigate();
    const [appointments] = useState([
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
            status: 'CONFIRMED',
        },
    ]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-500 text-white';
            case 'CONFIRMED':
                return 'bg-green-500 text-white';
            case 'CANCELLED':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-300 text-black';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Chờ duyệt';
            case 'CONFIRMED':
                return 'Đã duyệt';
            case 'CANCELLED':
                return 'Đã huỷ';
            default:
                return 'Không xác định';
        }
    };

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Lịch hẹn</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Phê duyệt lịch hẹn</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">

                    <div className="overflow-x-auto bg-white border rounded shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-3">Khách hàng</th>
                                    <th className="p-3">Dịch vụ</th>
                                    <th className="p-3">Bác sĩ</th>
                                    <th className="p-3">Phòng khám</th>
                                    <th className="p-3">Ngày</th>
                                    <th className="p-3">Thời gian</th>
                                    <th className="p-3">Trạng thái</th>
                                    <th className="p-3 w-20 text-center">Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-gray-500">
                                            Không có lịch hẹn nào cần phê duyệt.
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.map((appt) => (
                                        <tr key={appt.id} className="border-t hover:bg-gray-50">
                                            <td className="p-3">{appt.customerName}</td>
                                            <td className="p-3">{appt.serviceName}</td>
                                            <td className="p-3">{appt.doctorName}</td>
                                            <td className="p-3">{appt.clinicName}</td>
                                            <td className="p-3">{appt.date}</td>
                                            <td className="p-3">{appt.time}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyle(
                                                        appt.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(appt.status)}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => navigate(`/appointment/detail`)}
                                                    className="p-1 border rounded hover:bg-gray-100"
                                                    title="Chi tiết"
                                                >
                                                    <Info className="w-4 h-4 text-gray-700" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default Appointment;
