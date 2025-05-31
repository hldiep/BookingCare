import React, { useEffect, useState } from 'react';
import { BadgeCheck, Pencil, Info, Delete, CheckCircle, Ban, ArchiveRestoreIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { deleteDoctor, fetchAllDoctors, fetchAllDoctorsManager, fetchPageDoctor, fetchPageDoctorManager } from '../util/doctorApi';
import { fetchAllSpecialty } from '../util/specialtyApi';

const DoctorManager = () => {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [specialty, setSpecialty] = useState([]);
    const [roles, setRoles] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const doctorPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const loadData = async () => {
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

            let doctorList = [];
            let totalPageCount = 0;

            if (extractedRoles.includes('MANAGER')) {
                const res = await fetchPageDoctorManager(currentPage);
                doctorList = res.data;
                totalPageCount = res.totalPages;
            } else if (extractedRoles.includes('DOCTOR')) {
                const res = await fetchPageDoctor(currentPage);
                doctorList = res.data;
                totalPageCount = res.totalPages;
            } else {
                setError('Tài khoản không hợp lệ.');
                setLoading(false);
                return;
            }

            const specialtyList = await fetchAllSpecialty();
            const specialtyMap = {};
            specialtyList.forEach(s => {
                specialtyMap[s.id] = s.name;
            });

            setDoctors(doctorList);
            setSpecialty(specialtyMap);
            setTotalPages(totalPageCount);
            setError('');
        } catch (err) {
            console.error('Lỗi khi tải dữ liệu:', err);
            setError('Không thể tải dữ liệu.');
        } finally {
            setLoading(false);
        }
    };
    const indexOfFirst = currentPage * doctorPerPage;
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        if (roles.includes('DOCTOR') || roles.includes('MANAGER')) {
            loadData();
        }
    }, [currentPage]);
    const handleDeleteDoctor = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa bác sĩ này?');
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await deleteDoctor(id);
            alert(response.data || 'Xóa thành công');

            setDoctors(prevDoctors =>
                prevDoctors.map(doc =>
                    doc.id === id
                        ? {
                            ...doc,
                            status: 'DELETED',
                            account: {
                                ...doc.account,
                                status: 'DELETED'
                            }
                        }
                        : doc
                )
            );
        } catch (err) {
            alert(err.message || 'Đã xảy ra lỗi khi xóa bác sĩ');
        }
    };
    const handleRestoreDoctor = async (id) => {

    };
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        <span className="text-gray-700 font-medium">Bác sĩ</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý bác sĩ</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <input
                            type="text"
                            className="flex-1 border px-3 py-2 rounded-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tìm kiếm</button>
                            {!(roles.includes('DOCTOR')) && (
                                <button
                                    onClick={() => navigate('/doctor/create')}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Tạo mới
                                </button>
                            )}
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                            <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white border rounded shadow-sm">
                            {doctors.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Không có bác sĩ nào.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-3 w-14">Ảnh</th>
                                            <th className="p-3">Họ tên</th>
                                            <th className="p-3">Chuyên khoa</th>
                                            <th className="p-3">Số điện thoại</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Trạng thái</th>
                                            <th className="p-3 w-32 text-center">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors.map((doc, index) => (
                                            <tr key={doc.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">
                                                    <img
                                                        src={doc.account?.avatar && doc.account.avatar.trim() !== "" ? doc.account.avatar : 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                                                        alt="avatar"
                                                        className="w-9 h-9 rounded-full object-cover"
                                                    />
                                                </td>
                                                <td className="p-3">{doc.name}</td>
                                                <td>{specialty[doc.medicalSpecialtyId] || 'Không xác định'}</td>
                                                <td className="p-3">{doc.phone}</td>
                                                <td className="p-3">{doc.email}</td>
                                                <td className="p-3 font-medium">
                                                    {!(roles.includes('DOCTOR')) ? (
                                                        <>
                                                            {doc?.account?.status === 'ACTIVE' && (
                                                                <span className="text-green-600 flex items-center">
                                                                    <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                                </span>
                                                            )}
                                                            {doc?.account?.status === 'BLOCKED' && (
                                                                <span className="text-yellow-600 flex items-center">
                                                                    <Ban className="w-4 h-4 mr-1" /> Bị khóa
                                                                </span>
                                                            )}
                                                            {doc?.account?.status === 'DELETED' && (
                                                                <span className="text-red-500 flex items-center">
                                                                    <Ban className="w-4 h-4 mr-1" /> Đã xóa
                                                                </span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-green-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="flex p-3 space-x-2 text-center">
                                                    <button
                                                        onClick={() => navigate(`/doctor/detail-manage/${doc.id}`)}
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Chi tiết"
                                                    >
                                                        <Info className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                    {!(roles.includes('DOCTOR')) && (
                                                        <>
                                                            {doc?.account?.status !== 'DELETED' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => navigate(`/doctor/edit/${doc.id}`)}
                                                                        className="p-1 border rounded hover:bg-gray-100"
                                                                        title="Chỉnh sửa"
                                                                    >
                                                                        <Pencil className="w-4 h-4 text-gray-700" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteDoctor(doc.id)}
                                                                        className="p-1 border rounded hover:bg-gray-100"
                                                                        title="Xóa"
                                                                    >
                                                                        <Delete className="w-4 h-4 text-gray-700" />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleRestoreDoctor(doc.id)}
                                                                    className="p-1 border rounded hover:bg-gray-100"
                                                                    title="Khôi phục"
                                                                >
                                                                    <ArchiveRestoreIcon className="w-4 h-4 text-green-600" />
                                                                </button>
                                                            )}
                                                        </>
                                                    )}

                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                        </div>
                    )}
                    <div className="flex flex-col items-center gap-4 mt-10">
                        <div className="flex gap-2 flex-wrap justify-center">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageClick(i)}
                                    className={`px-3 py-1 rounded border ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
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

export default DoctorManager;
