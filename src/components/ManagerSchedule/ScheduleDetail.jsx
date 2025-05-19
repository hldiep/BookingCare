import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CalendarDays,
    Clock,
    User,
    Hospital,
    ClipboardList,
    BadgeCheck,
} from 'lucide-react';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const ScheduleDetail = () => {
    const navigate = useNavigate();

    const schedule = {
        id: 'SCHED016',
        doctorName: 'BS. Nguyễn Văn A',
        clinicName: 'Phòng khám Đa khoa ABC',
        date: '2025-06-04',
        timeStart: '08:00',
        timeEnd: '11:00',
        maxBooking: 10,
        status: 'ACTIVE',
        createdAt: '2025-05-16 09:00:00',
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
                        <button onClick={() => navigate('/schedule')} className="hover:underline text-blue-600">
                            Quản lý lịch khám
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chi tiết</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chi tiết lịch khám</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded shadow p-6 space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Thông tin bác sĩ &amp; phòng khám</h3>
                        <p className="flex items-center gap-2 text-gray-700">
                            <User className="w-5 h-5 text-gray-500" /> {schedule.doctorName}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <Hospital className="w-5 h-5 text-gray-500" /> {schedule.clinicName}
                        </p>

                        <h3 className="text-lg font-semibold border-b pb-2 mt-8 mb-4">Thông tin lịch khám</h3>
                        <p className="flex items-center gap-2 text-gray-700">
                            <CalendarDays className="w-5 h-5 text-gray-500" /> Ngày khám: {schedule.date}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-5 h-5 text-gray-500" /> Giờ: {schedule.timeStart} - {schedule.timeEnd}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <ClipboardList className="w-5 h-5 text-gray-500" /> Số lượt đặt tối đa: {schedule.maxBooking}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <BadgeCheck className="w-5 h-5 text-blue-600" />
                            Trạng thái:
                            <span className="ml-2 px-3 py-1 rounded-full text-sm font-medium text-white bg-blue-500">
                                {translateStatus(schedule.status)}
                            </span>
                        </p>
                    </div>

                    <div className="bg-white rounded shadow p-6 space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Thông tin hệ thống</h3>
                        <p className="text-gray-600 text-sm">Mã lịch: {schedule.id}</p>
                        <p className="text-gray-600 text-sm">Tạo lúc: {schedule.createdAt}</p>
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    );
};

const translateStatus = (status) => {
    switch (status) {
        case 'ACTIVE':
            return 'Đang hoạt động';
        case 'UPCOMING':
            return 'Sắp diễn ra';
        case 'ONGOING':
            return 'Đang diễn ra';
        case 'EXPIRED':
            return 'Hết hạn';
        case 'CANCELED':
            return 'Đã hủy';
        case 'PAUSED':
            return 'Tạm dừng';
        case 'DELETED':
            return 'Đã xóa';
        default:
            return status;
    }
};

export default ScheduleDetail;
