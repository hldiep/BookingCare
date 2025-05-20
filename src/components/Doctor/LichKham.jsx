import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const LichKham = () => {
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
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <Link to="/admin" className="hover:underline text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Lịch khám</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý lịch khám</h2>
                </div>

                <div className="min-h-screen bg-main p-6 space-y-6">
                    <div className=' max-w-4xl mx-auto'>
                        <div className='flex'>
                            <input
                                type="text"
                                className="flex-1 border px-3 py-2 rounded-tl-md rounded-bl-md outline-none text-sm"
                                placeholder="Nhập tìm kiếm..."
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-tr-md rounded-br-md text-sm">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded border max-w-6xl mx-auto overflow-x-auto">
                        <h3 className="font-semibold text-gray-800 p-4 border-b">Danh sách lịch khám</h3>
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600">
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
                                {appointments.length > 0 ? (
                                    appointments.map((appt) => (
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
                                                    {appt.status === 'PENDING' ? 'Chưa khám' :
                                                        appt.status === 'CONFIRMED' ? 'Đã khám' :
                                                            'Đã huỷ'}
                                                </span>
                                            </td>
                                            <td className="p-2 text-center">
                                                <button
                                                    onClick={() => navigate(`/my-schedule/detail`)}
                                                    className="px-2 py-1 border rounded text-sm"
                                                >
                                                    <Info className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="p-4 text-center text-gray-500">Không có lịch khám nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default LichKham;
