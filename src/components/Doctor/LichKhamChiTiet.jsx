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

const LichKhamChiTiet = () => {
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
        status: 'CHUA_KHAM',
        note: 'Khách hàng có tiền sử huyết áp cao.',
        createdAt: '2025-05-16 10:25:00',
        updatedAt: '2025-05-17 08:00:00',
        updatedBy: 'doctor01',
    });

    const updateStatus = (newStatus) => {
        setAppointment(prev => ({
            ...prev,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            updatedBy: 'doctor01'
        }));
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'CHUA_KHAM': return 'Chưa khám';
            case 'DA_KHAM': return 'Đã khám';
            case 'HUY': return 'Đã huỷ';
            default: return 'Không xác định';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'CHUA_KHAM': return 'bg-yellow-500';
            case 'DA_KHAM': return 'bg-green-600';
            case 'HUY': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='sticky top-[64px] z-10 bg-white border-b'>
                    <div className='items-center p-2 space-x-2 font-bold border-b'>
                        <button onClick={() => navigate("/doctor/appointment")}>Lịch khám</button>
                        <span>{'>'}</span>
                        <button onClick={() => navigate("/doctor/appointment/detail")}>Chi tiết</button>
                    </div>
                    <h2 className="text-2xl p-2 font-semibold">Chi tiết lịch hẹn</h2>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Info */}
                    <div className="space-y-4">
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Thông tin khách hàng</h3>
                            <p className="flex items-center gap-2"><User className="w-4 h-4" /> {appointment.customerName}</p>
                            <p className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> {appointment.customerPhone}</p>
                        </div>

                        {/* Service & Clinic */}
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Dịch vụ & Phòng khám</h3>
                            <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4" /> {appointment.serviceName}</p>
                            <p className="flex items-center gap-2"><Hospital className="w-4 h-4" /> {appointment.clinicName}</p>
                        </div>
                    </div>

                    {/* Appointment Info */}
                    <div className="space-y-4">
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Chi tiết lịch hẹn</h3>
                            <p className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Ngày: {appointment.date}</p>
                            <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> Thời gian: {appointment.time}</p>
                            <p className="flex items-center gap-2"><NotebookPen className="w-4 h-4" /> STT: {appointment.numericalOrder}</p>
                            <p className="flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4" />
                                Trạng thái:
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-sm font-medium text-white ${getStatusColor(appointment.status)}`}>
                                    {getStatusLabel(appointment.status)}
                                </span>
                            </p>
                        </div>

                        {/* Note and Updates */}
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Ghi chú & Cập nhật</h3>
                            <p className="text-gray-700 mb-2 italic">"{appointment.note}"</p>
                            <p className="text-sm text-gray-600">Tạo lúc: {appointment.createdAt}</p>
                            <p className="text-sm text-gray-600">Cập nhật lúc: {appointment.updatedAt} bởi {appointment.updatedBy}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 flex gap-4">
                    <button
                        onClick={() => updateStatus('CHUA_KHAM')}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:opacity-90"
                    >
                        Đánh dấu chưa khám
                    </button>
                    <button
                        onClick={() => updateStatus('DA_KHAM')}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:opacity-90"
                    >
                        Đánh dấu đã khám
                    </button>
                    <button
                        onClick={() => updateStatus('HUY')}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:opacity-90"
                    >
                        Hủy lịch
                    </button>
                </div>
            </div>
        </div>
    );
};

const PhoneIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 5h2l3.6 7.59a1 1 0 01-.17 1.12l-2.84 2.84a16 16 0 007.59 7.59l2.84-2.84a1 1 0 011.12-.17L19 19h2a1 1 0 011 1v3a1 1 0 01-1 1h-1C9.4 24 0 14.6 0 3V2a1 1 0 011-1h3a1 1 0 011 1z" />
    </svg>
);

export default LichKhamChiTiet;
