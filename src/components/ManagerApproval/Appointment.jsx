import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { getPageAppointment } from '../util/appointmentApi';
import { resetPassword } from '../Helper/AuthContext';

const Appointment = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const apPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const getStatusStyle = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-500 text-white';
            case 'CONFIRMED':
                return 'bg-green-500 text-white';
            case 'IN_PROGRESS':
                return 'bg-blue-500 text-white';
            case 'COMPLETED':
                return 'bg-indigo-600 text-white';
            case 'CANCELLED':
                return 'bg-red-500 text-white';
            case 'NO_SHOW':
                return 'bg-orange-500 text-white';
            case 'DELETED':
                return 'bg-gray-500 text-white';
            default:
                return 'bg-gray-300 text-black';
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Chờ duyệt';
            case 'CONFIRMED':
                return 'Đã duyệt';
            case 'IN_PROGRESS':
                return 'Đang khám';
            case 'COMPLETED':
                return 'Đã khám';
            case 'CANCELLED':
                return 'Đã huỷ';
            case 'NO_SHOW':
                return 'Không đến';
            case 'DELETED':
                return 'Đã xoá';
            default:
                return 'Không xác định';
        }
    };
    const loadClinics = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Không tìm thấy token.');
                setLoading(false);
                return;
            }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const user = JSON.parse(atob(base64));

            const extractedRoles = (user?.role || []).map(r =>
                typeof r === 'object' && r.authority
                    ? r.authority.replace('ROLE_', '')
                    : ''
            );
            setRoles(extractedRoles);
            let appointments = [];
            let totalPageCount = 0;
            const res = await getPageAppointment(currentPage);
            appointments = res.data;
            totalPageCount = res.totalPages;
            setAppointments(appointments);
            setTotalPages(totalPageCount);
            setError('');
        } catch (error) {
            console.log("Lỗi tải danh sách", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadClinics();
    }, [currentPage]);
    const handlePageClick = (page) => {
        setCurrentPage(page - 1);
    };
    const indexOfFirst = currentPage * apPerPage;
    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Lịch hẹn</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Phê duyệt lịch hẹn</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                    {error && <div className="text-red-500 text-sm">{error}</div>}
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
                                        <th className="p-3">Khách hàng</th>
                                        <th className="p-3">Dịch vụ</th>
                                        <th className="p-3">Bác sĩ</th>
                                        <th className="p-3">Phòng khám</th>
                                        <th className="p-3">Ngày</th>
                                        <th className="p-3">Thời gian</th>
                                        <th className="p-3">Trạng thái</th>
                                        <th className="p-3 w-20 text-center">Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4 text-gray-500">
                                                Không có lịch hẹn nào cần phê duyệt.
                                            </td>
                                        </tr>
                                    ) : (
                                        appointments.map((appt) => (
                                            <tr key={appt.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">{appt?.customer?.name}</td>
                                                <td className="p-3">{appt?.service?.name}</td>
                                                <td className="p-3">{appt?.schedule?.doctor?.name}</td>
                                                <td className="p-3">{appt?.schedule?.clinic?.name}</td>
                                                <td className="p-3">{appt?.schedule?.date}</td>
                                                <td className="p-3">{appt?.schedule?.timeStart} - {appt?.schedule?.timeEnd}</td>
                                                <td className="p-3">
                                                    <span
                                                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyle(
                                                            appt.status
                                                        )}`}
                                                    >
                                                        {getStatusLabel(appt.status)}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    {/* <button
                                                        onClick={() => navigate(`/appointment/detail`)}
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Chi tiết"
                                                    >
                                                        <Info className="w-4 h-4 text-gray-700" />
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>)}
                    <div className="flex flex-col items-center gap-4 mt-10">
                        <div className="flex gap-2 flex-wrap justify-center">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageClick(i + 1)}
                                    className={`px-3 py-1 rounded border ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
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

export default Appointment;
