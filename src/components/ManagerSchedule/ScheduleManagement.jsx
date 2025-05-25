import React, { useEffect, useState } from 'react';
import { CalendarDays, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchAllSchedule, fetchSchdulesByStatus, fetchSchedulesByDoctor } from '../util/scheduleApi';

const ScheduleManagement = () => {
    const navigate = useNavigate();
    // const [schedules] = useState([
    //     {
    //         id: 'SCHED016',
    //         doctorName: 'BS. Nguyễn Văn A',
    //         clinicName: 'Phòng khám ABC',
    //         date: '2025-06-04',
    //         timeStart: '08:00',
    //         timeEnd: '11:00',
    //         maxBooking: 10,
    //         status: 'ACTIVE',
    //     },
    //     {
    //         id: 'SCHED017',
    //         doctorName: 'BS. Trần Thị B',
    //         clinicName: 'Phòng khám XYZ',
    //         date: '2025-06-04',
    //         timeStart: '09:00',
    //         timeEnd: '12:00',
    //         maxBooking: 12,
    //         status: 'UPCOMING',
    //     },
    // ]);

    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [doctorIdFilter, setDoctorIdFilter] = useState('');
    useEffect(() => {
        const loadSchedule = async () => {
            try {
                const data = await fetchAllSchedule();
                setSchedule(data);
            } catch (err) {
                console.err("Lỗi tải danh sách lịch khám:", err);
            }
            finally {
                setLoading(false);
            }
        };
        loadSchedule();
    })
    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Quản lý lịch khám</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý lịch khám</h2>
                </div>
                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                    {/* <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <input
                            type="text"
                            className="flex-1 border px-3 py-2 rounded-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tìm kiếm</button>

                        </div>
                    </div> */}
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Tìm theo mã bác sĩ..."
                            value={doctorIdFilter}
                            onChange={(e) => setDoctorIdFilter(e.target.value)}
                            className="border px-3 py-2 rounded-md outline-none"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border px-3 py-2 rounded-md outline-none"
                        >
                            <option value="">-- Trạng thái --</option>
                            <option value="ACTIVE">Active</option>
                            <option value="UPCOMING">Upcoming</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={async () => {
                                try {
                                    setLoading(true);
                                    let filteredData = [];

                                    if (statusFilter) {
                                        filteredData = await fetchSchdulesByStatus(statusFilter);
                                    } else if (doctorIdFilter) {
                                        filteredData = await fetchSchedulesByDoctor(doctorIdFilter);
                                    } else {
                                        filteredData = await fetchAllSchedule();
                                    }

                                    setSchedule(filteredData);
                                } catch (err) {
                                    console.error("Lỗi khi lọc:", err);
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        >
                            Lọc
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={async () => {
                                try {
                                    setLoading(true);
                                    const data = await fetchAllSchedule();
                                    setSchedule(data);
                                    setDoctorIdFilter('');
                                    setStatusFilter('');
                                } catch (e) {
                                    console.error("Lỗi tải lại:", e);
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        >
                            Tải lại
                        </button>
                    </div>
                    {loading ? (
                        <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                    ) : (
                        <div className="overflow-x-auto bg-white border rounded shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="p-3 border-r w-28">Mã lịch</th>
                                        <th className="p-3 border-r">Bác sĩ</th>
                                        <th className="p-3 border-r">Phòng khám</th>
                                        <th className="p-3 border-r w-32">Ngày</th>
                                        <th className="p-3 border-r w-20">Giờ bắt đầu</th>
                                        <th className="p-3 border-r w-20">Giờ kết thúc</th>
                                        <th className="p-3 border-r w-28">Số lượt tối đa</th>
                                        <th className="p-3 w-32 text-center">Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedule.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="p-4 text-center text-gray-500">Chưa có lịch trình nào</td>
                                        </tr>
                                    ) : (
                                        schedule.map((item) => (
                                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3 border-r font-medium">{item.id}</td>
                                                <td className="p-3 border-r">{item.doctorName}</td>
                                                <td className="p-3 border-r">{item.clinicName}</td>
                                                <td className="p-3 border-r flex items-center gap-1">
                                                    <CalendarDays className="w-4 h-4 text-gray-500" /> {item.date}
                                                </td>
                                                <td className="p-3 border-r">{item.timeStart}</td>
                                                <td className="p-3 border-r">{item.timeEnd}</td>
                                                <td className="p-3 border-r">{item.maxBooking}</td>
                                                <td className="p-3 text-center space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/schedule/detail`)}
                                                        className="p-1 border rounded hover:bg-gray-100 inline-flex items-center gap-1 text-blue-600"
                                                        title="Xem chi tiết"
                                                    >
                                                        <Eye className="w-4 h-4" /> Xem
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default ScheduleManagement;
