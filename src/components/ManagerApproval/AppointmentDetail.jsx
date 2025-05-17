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
    XCircle
} from 'lucide-react';

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
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                {/* Breadcrumb */}
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/appointment")}>Phê duyệt lịch hẹn</button>
                    <span>{'>'}</span>
                    <span>Chi tiết</span>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Chi tiết lịch hẹn</h2>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Thông tin khách hàng */}
                    <div className="space-y-4">
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Thông tin khách hàng</h3>
                            <p className="flex items-center gap-2"><User className="w-4 h-4" /> {appointment.customerName}</p>
                            <p className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> {appointment.customerPhone}</p>
                        </div>

                        {/* Dịch vụ & Phòng khám */}
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Dịch vụ & Phòng khám</h3>
                            <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4" /> {appointment.serviceName}</p>
                            <p className="flex items-center gap-2"><Hospital className="w-4 h-4" /> {appointment.clinicName}</p>
                        </div>
                    </div>

                    {/* Chi tiết lịch hẹn */}
                    <div className="space-y-4">
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Chi tiết lịch hẹn</h3>
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
                                        appointment.status === 'CONFIRMED' ? 'Đã duyệt' :
                                            'Đã huỷ'}
                                </span>
                            </p>
                        </div>

                        {/* Ghi chú */}
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Ghi chú & Cập nhật</h3>
                            <p className="text-gray-700 mb-2 italic">"{appointment.note}"</p>
                            <p className="text-sm text-gray-600">Tạo lúc: {appointment.createdAt}</p>
                            <p className="text-sm text-gray-600">Cập nhật lúc: {appointment.updatedAt} bởi {appointment.updatedBy}</p>
                        </div>
                    </div>
                </div>

                {/* Nút hành động nếu trạng thái là PENDING */}
                {appointment.status === 'PENDING' && (
                    <div className="p-6 flex gap-4">
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
    );
};

const PhoneIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l3.6 7.59a1 1 0 01-.17 1.12l-2.84 2.84a16 16 0 007.59 7.59l2.84-2.84a1 1 0 011.12-.17L19 19h2a1 1 0 011 1v3a1 1 0 01-1 1h-1C9.4 24 0 14.6 0 3V2a1 1 0 011-1h3a1 1 0 011 1z" />
    </svg>
);

export default AppointmentDetail;
