import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BadgeCheck,
    Clock,
    CalendarDays,
    User,
    Stethoscope,
    Hospital,
    NotebookPen,
    XCircle,
    Phone
} from 'lucide-react';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const AppointmentDetail = () => {
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        id: 1,
        customerName: 'Nguyễn Văn A',
        customerPhone: '0123456789',
        serviceName: 'Khám nội tổng quát',
        doctorName: 'BS. Trần Thị B',
        clinicName: 'Phòng khám Đa khoa ABC',
        date: '2025-05-20',
        time: '08:00 - 09:00',
        numericalOrder: 3,
        status: 'PENDING',
        note: 'Khách hàng có tiền sử huyết áp cao.',
        createdAt: '2025-05-16 10:25:00',
        updatedAt: '2025-05-17 08:00:00',
        updatedBy: 'admin01',
    });

    const handleApprove = () => {
        setAppointment(prev => ({
            ...prev,
            status: 'CONFIRMED',
            updatedAt: new Date().toISOString(),
            updatedBy: 'admin01'
        }));
    };

    const handleReject = () => {
        setAppointment(prev => ({
            ...prev,
            status: 'CANCELLED',
            updatedAt: new Date().toISOString(),
            updatedBy: 'admin01'
        }));
    };

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">Dashboard</button>
                        <span>/</span>
                        <button onClick={() => navigate('/appointment')} className="hover:underline text-blue-600">Lịch hẹn</button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chi tiết</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chi tiết lịch hẹn</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded shadow space-y-2">
                            <h3 className="text-md font-semibold mb-2">Thông tin khách hàng</h3>
                            <p className="flex items-center gap-2"><User className="w-4 h-4" /> {appointment.customerName}</p>
                            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {appointment.customerPhone}</p>
                        </div>

                        <div className="p-4 bg-white rounded shadow space-y-2">
                            <h3 className="text-md font-semibold mb-2">Dịch vụ & Phòng khám</h3>
                            <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4" /> {appointment.serviceName}</p>
                            <p className="flex items-center gap-2"><Hospital className="w-4 h-4" /> {appointment.clinicName}</p>
                            <p className="flex items-center gap-2"><User className="w-4 h-4" /> Bác sĩ: {appointment.doctorName}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded shadow space-y-2">
                            <h3 className="text-md font-semibold mb-2">Chi tiết lịch hẹn</h3>
                            <p className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Ngày: {appointment.date}</p>
                            <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> Thời gian: {appointment.time}</p>
                            <p className="flex items-center gap-2"><NotebookPen className="w-4 h-4" /> STT: {appointment.numericalOrder}</p>
                            <p className="flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4" />
                                Trạng thái:
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-sm font-medium text-white
                  ${appointment.status === 'PENDING' ? 'bg-yellow-500' :
                                        appointment.status === 'CONFIRMED' ? 'bg-green-500' :
                                            'bg-red-500'}`}>
                                    {appointment.status === 'PENDING' ? 'Chờ duyệt' :
                                        appointment.status === 'CONFIRMED' ? 'Đã duyệt' : 'Đã huỷ'}
                                </span>
                            </p>
                        </div>

                        <div className="p-4 bg-white rounded shadow space-y-1">
                            <h3 className="text-md font-semibold mb-2">Ghi chú & Cập nhật</h3>
                            <p className="text-gray-700 italic mb-1">"{appointment.note}"</p>
                            <p className="text-sm text-gray-500">Tạo lúc: {appointment.createdAt}</p>
                            <p className="text-sm text-gray-500">Cập nhật lúc: {appointment.updatedAt} bởi {appointment.updatedBy}</p>
                        </div>
                    </div>
                    {appointment.status === 'PENDING' && (
                        <div className="p-6 flex gap-4 justify-center">
                            <button
                                onClick={handleApprove}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Duyệt lịch hẹn
                            </button>
                            <button
                                onClick={handleReject}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Từ chối lịch hẹn
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default AppointmentDetail;
