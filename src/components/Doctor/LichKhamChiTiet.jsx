import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    BadgeCheck,
    Clock,
    CalendarDays,
    User,
    Stethoscope,
    Hospital,
    NotebookPen
} from 'lucide-react';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const LichKhamChiTiet = () => {
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        id: 1,
        customerName: 'Nguyễn Văn A',
        customerPhone: '0123456789',
        customerEmail: 'nguyenvana@example.com',
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
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <Link to="/admin" className="hover:underline text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <Link to="/my-schedule" className="hover:underline text-blue-600">Lịch khám</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chi tiết</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chi tiết lịch hẹn</h2>
                </div>

                <div className="bg-main min-h-screen p-6">
                    <div className="max-w-4xl mx-auto space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-4">
                                <div className="p-4 border rounded bg-white shadow">
                                    <h3 className="text-lg font-semibold mb-2">Thông tin khách hàng</h3>
                                    <p className="flex items-center gap-2"><User className="w-4 h-4" /> {appointment.customerName}</p>
                                    <p className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> {appointment.customerPhone}</p>
                                    <p className="flex items-center gap-2"><MailIcon className="w-4 h-4" /> {appointment.customerEmail}</p>
                                </div>

                                <div className="p-4 border rounded bg-white shadow">
                                    <h3 className="text-lg font-semibold mb-2">Dịch vụ & Phòng khám</h3>
                                    <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4" /> {appointment.serviceName}</p>
                                    <p className="flex items-center gap-2"><Hospital className="w-4 h-4" /> {appointment.clinicName}</p>
                                </div>
                            </div>

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

                                <div className="p-4 border rounded bg-white shadow">
                                    <h3 className="text-lg font-semibold mb-2">Ghi chú & Cập nhật</h3>
                                    <p className="text-gray-700 mb-2 italic">"{appointment.note}"</p>
                                    <p className="text-sm text-gray-600">Tạo lúc: {appointment.createdAt}</p>
                                    <p className="text-sm text-gray-600">Cập nhật lúc: {appointment.updatedAt} bởi {appointment.updatedBy}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center pt-4">
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
            </div>
        </ClippedDrawer>
    );
};

const PhoneIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 5h2l3.6 7.59a1 1 0 01-.17 1.12l-2.84 2.84a16 16 0 007.59 7.59l2.84-2.84a1 1 0 011.12-.17L19 19h2a1 1 0 011 1v3a1 1 0 01-1 1h-1C9.4 24 0 14.6 0 3V2a1 1 0 011-1h3a1 1 0 011 1z" />
    </svg>
);
const MailIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
    </svg>
);
export default LichKhamChiTiet;
