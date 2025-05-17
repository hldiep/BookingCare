import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CalendarDays, Clock, User, Hospital, ClipboardList, BadgeCheck
} from 'lucide-react';

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
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/schedule")}>Quản lý lịch khám</button>
                    <span>{'>'}</span>
                    <button>Chi tiết</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Chi tiết lịch khám</h2>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Thông tin bác sĩ & phòng khám</h3>
                            <p className="flex items-center gap-2"><User className="w-4 h-4" /> {schedule.doctorName}</p>
                            <p className="flex items-center gap-2"><Hospital className="w-4 h-4" /> {schedule.clinicName}</p>
                        </div>

                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Thông tin lịch khám</h3>
                            <p className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Ngày khám: {schedule.date}</p>
                            <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> Giờ: {schedule.timeStart} - {schedule.timeEnd}</p>
                            <p className="flex items-center gap-2"><ClipboardList className="w-4 h-4" /> Số lượt đặt tối đa: {schedule.maxBooking}</p>
                            <p className="flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4 text-blue-600" />
                                Trạng thái:
                                <span className="ml-1 px-2 py-0.5 rounded-full text-sm font-medium text-white bg-blue-500">
                                    {translateStatus(schedule.status)}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 border rounded bg-white shadow">
                            <h3 className="text-lg font-semibold mb-2">Thông tin hệ thống</h3>
                            <p className="text-sm text-gray-600">Mã lịch: {schedule.id}</p>
                            <p className="text-sm text-gray-600">Tạo lúc: {schedule.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const translateStatus = (status) => {
    switch (status) {
        case 'ACTIVE': return 'Đang hoạt động';
        case 'UPCOMING': return 'Sắp diễn ra';
        case 'ONGOING': return 'Đang diễn ra';
        case 'EXPIRED': return 'Hết hạn';
        case 'CANCELED': return 'Đã hủy';
        case 'PAUSED': return 'Tạm dừng';
        case 'DELETED': return 'Đã xóa';
        default: return status;
    }
};

export default ScheduleDetail;
