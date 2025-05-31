import React, { useEffect, useState } from 'react';
import { Ban, CalendarDays, CheckCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchAllSchedule, fetchSchedulesByDoctor, fetchSchedulesByStatus } from '../util/scheduleApi';

const ScheduleManagement = () => {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const schedulePerPage = 10;
    const indexOfLast = currentPage * schedulePerPage;
    const indexOfFirst = indexOfLast - schedulePerPage;
    const current = schedule.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(schedule.length / schedulePerPage);

    useEffect(() => {
        handleFilter();
    }, []);

    const handleFilter = async () => {
        try {
            setLoading(true);
            let data = [];

            if (statusFilter) {
                data = await fetchSchedulesByStatus(statusFilter);

            } else {
                data = await fetchAllSchedule();
            }

            setSchedule(data);
            setCurrentPage(1);
        } catch (err) {
            console.error("Lỗi khi lọc:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReset = async () => {
        try {
            setLoading(true);
            const data = await fetchAllSchedule();
            setSchedule(data);
            setStatusFilter('');
            setCurrentPage(1);
        } catch (e) {
            console.error("Lỗi tải lại:", e);
        } finally {
            setLoading(false);
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
                        <span className="text-gray-700 font-medium">Quản lý lịch khám</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý lịch khám</h2>
                </div>
                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                    <div className="flex flex-col md:flex-row gap-4 items-center">

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border px-3 py-2 rounded-md outline-none"
                        >
                            <option value="">Tất cả</option>
                            <option value="PENDING">Pending</option>
                            <option value="ACTIVE">Active</option>
                            <option value="UPCOMING">Upcoming</option>
                            <option value="ONGOING">Ongoing</option>
                            <option value="PAUSED">Paused</option>
                            <option value="EXPIRED">Expired</option>
                            <option value="CANCELED">Canceled</option>
                            <option value="DELETED">Deleted</option>
                        </select>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={handleFilter}
                        >
                            Lọc
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={handleReset}
                        >
                            Tải lại
                        </button>
                    </div>

                    {/* Loading */}
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                            <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white border rounded shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="p-3">STT</th>
                                        <th className="p-3">Bác sĩ</th>
                                        <th className="p-3">Phòng khám</th>
                                        <th className="p-3 w-32">Ngày</th>
                                        <th className="p-3 w-20">Giờ bắt đầu</th>
                                        <th className="p-3 w-20">Giờ kết thúc</th>
                                        <th className="p-3 w-28">Số lượt tối đa</th>
                                        <th className="p-3 w-28">Trạng thái</th>
                                        <th className="p-3 w-32 text-center">Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedule.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="p-4 text-center text-gray-500">
                                                Chưa có lịch trình nào
                                            </td>
                                        </tr>
                                    ) : (
                                        current.map((item, index) => (
                                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">{indexOfFirst + index + 1}</td>
                                                <td className="p-3">{item?.doctor?.name || "Không rõ bác sĩ"}</td>
                                                <td className="p-3">{item?.clinic?.name || "Không rõ phòng khám"}</td>
                                                <td className="p-3 flex items-center gap-1">
                                                    <CalendarDays className="w-4 h-4 text-gray-500" /> {item.date}
                                                </td>
                                                <td className="p-3">{item.timeStart}</td>
                                                <td className="p-3">{item.timeEnd}</td>
                                                <td className="p-3">{item.maxBooking}</td>
                                                <td className="p-3 font-medium">
                                                    {item.status === 'PENDING' && (
                                                        <span className="text-yellow-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Chờ duyệt
                                                        </span>
                                                    )}
                                                    {item.status === 'ACTIVE' && (
                                                        <span className="text-green-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                        </span>
                                                    )}
                                                    {item.status === 'UPCOMING' && (
                                                        <span className="text-cyan-600 flex items-center">
                                                            <CalendarDays className="w-4 h-4 mr-1" /> Sắp diễn ra
                                                        </span>
                                                    )}
                                                    {item.status === 'ONGOING' && (
                                                        <span className="text-blue-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Đang diễn ra
                                                        </span>
                                                    )}
                                                    {item.status === 'PAUSED' && (
                                                        <span className="text-yellow-500 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Tạm dừng
                                                        </span>
                                                    )}
                                                    {item.status === 'EXPIRED' && (
                                                        <span className="text-gray-500 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Hết hạn
                                                        </span>
                                                    )}
                                                    {item.status === 'CANCELED' && (
                                                        <span className="text-red-500 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Đã hủy
                                                        </span>
                                                    )}
                                                    {item.status === 'DELETED' && (
                                                        <span className="text-red-700 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Đã xóa
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="p-3 text-center space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/schedule/detail/${item.id}`)}
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

                    {/* Pagination */}
                    <div className="flex flex-col items-center gap-4 mt-10">
                        <div className="flex gap-2 flex-wrap justify-center">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageClick(i + 1)}
                                    className={`px-3 py-1 rounded border ${currentPage === i + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default ScheduleManagement;
