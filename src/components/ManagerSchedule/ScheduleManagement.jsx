import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, Stethoscope, Hospital, Eye } from 'lucide-react';

const ScheduleManagement = () => {
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([
        {
            id: 'SCHED016',
            doctorName: 'BS. Nguyễn Văn A',
            clinicName: 'Phòng khám ABC',
            date: '2025-06-04',
            timeStart: '08:00',
            timeEnd: '11:00',
            maxBooking: 10,
            status: 'ACTIVE'
        },
        {
            id: 'SCHED017',
            doctorName: 'BS. Trần Thị B',
            clinicName: 'Phòng khám XYZ',
            date: '2025-06-04',
            timeStart: '09:00',
            timeEnd: '12:00',
            maxBooking: 12,
            status: 'UPCOMING'
        },
    ]);

    const statusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-500';
            case 'UPCOMING': return 'bg-yellow-500';
            case 'PAUSED': return 'bg-blue-500';
            case 'CANCELED': return 'bg-red-500';
            case 'EXPIRED': return 'bg-gray-500';
            default: return 'bg-gray-300';
        }
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button>Quản lý lịch khám</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Quản lý lịch khám</h2>

                <div className="p-6">
                    <table className="w-full text-sm border shadow bg-white">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Mã lịch</th>
                                <th className="p-3">Bác sĩ</th>
                                <th className="p-3">Phòng khám</th>
                                <th className="p-3">Ngày</th>
                                <th className="p-3">Giờ bắt đầu</th>
                                <th className="p-3">Giờ kết thúc</th>
                                <th className="p-3">Số lượt tối đa</th>
                                {/* <th className="p-3">Trạng thái</th> */}
                                <th className="p-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((item) => (
                                <tr key={item.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 font-medium">{item.id}</td>
                                    <td className="p-3">{item.doctorName}</td>
                                    <td className="p-3">{item.clinicName}</td>
                                    <td className="p-3 flex items-center gap-1">
                                        <CalendarDays className="w-4 h-4" /> {item.date}
                                    </td>
                                    <td className="p-3">{item.timeStart}</td>
                                    <td className="p-3">{item.timeEnd}</td>
                                    <td className="p-3">{item.maxBooking}</td>
                                    {/* <td className="p-3">
                                        <span className={`text-white px-2 py-1 rounded-full text-xs ${statusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td> */}
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => navigate(`/schedule/detail`)}
                                            className="px-2 py-1 border rounded text-sm text-blue-600 hover:bg-blue-100 flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" /> Xem
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ScheduleManagement;
