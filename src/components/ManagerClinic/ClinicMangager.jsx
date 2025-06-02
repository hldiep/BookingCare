import React, { useEffect, useState } from 'react';
import { ArchiveRestoreIcon, BadgeCheck, Ban, CheckCircle, Delete, Info, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { deleteClinic, fetchPageClinic, fetchPageClinicManager, searchClinic, updateClinicStatus } from '../util/clinicApi';

const ClinicManager = () => {
    const navigate = useNavigate();
    const [clinicList, setClinicList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const clinicPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

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

            let clinic = [];
            let totalPageCount = 0;

            if (extractedRoles.includes('MANAGER')) {
                const res = await fetchPageClinicManager(currentPage);
                clinic = res.data;
                totalPageCount = res.totalPages;
            } else if (extractedRoles.includes('DOCTOR')) {
                const res = await fetchPageClinic(currentPage);
                clinic = res.data;
                totalPageCount = res.totalPages;
            } else {
                setError('Tài khoản không hợp lệ.');
                setLoading(false);
                return;
            }

            setClinicList(clinic);
            setTotalPages(totalPageCount);
            setError('');
        } catch (error) {
            console.log("Lỗi tải danh sách phòng khám:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClinics();
    }, []);

    useEffect(() => {
        if (roles.includes('DOCTOR') || roles.includes('MANAGER')) {
            loadClinics();
        }
    }, [currentPage]);
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn về đầu trang
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa phòng khám này không?');
        if (!confirmDelete) {
            return;
        }

        // try {
        //     const response = await deleteClinic(id);
        //     alert(response.data || 'Xóa thành công');
        //     setClinicList(prevClinic =>
        //         prevClinic.map(clinic =>
        //             clinic.id === id ? { ...clinic, status: 'DELETED' } : clinic
        //         )
        //     );
        // } catch (err) {
        //     alert(err.message || 'Đã xảy ra lỗi khi xóa phòng khám');
        // }
        try {
            await updateClinicStatus(id, 'DELETED');
            alert("Đã xóa phòng khám!");
            setClinicList(prevClinic =>
                prevClinic.map(clinic =>
                    clinic.id === id ? { ...clinic, status: 'DELETED' } : clinic
                )
            );
        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    }
    const handleRestoreClinic = async (id) => {
        const confirmRestore = window.confirm('Bạn có chắc muốn khôi phục phòng khám này không?');
        if (!confirmRestore) {
            return;
        }
        try {
            await updateClinicStatus(id, 'ACTIVE');
            alert("Khôi phục trạng thái thành công!");
            setClinicList(prevClinic =>
                prevClinic.map(clinic =>
                    clinic.id === id ? { ...clinic, status: 'ACTIVE' } : clinic
                )
            );
        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    };
    const handleSearch = async () => {
        if (!keyword.trim()) {
            loadClinics();
            return;
        }

        try {
            setLoading(true);
            const res = await searchClinic(keyword.trim());
            setClinicList(res);
            setTotalPages(0);
        } catch (err) {
            console.error('Lỗi khi tìm kiếm:', err);
            setError('Không thể tìm kiếm.');
        } finally {
            setLoading(false);
        }
    };
    const indexOfFirst = currentPage * clinicPerPage;

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button
                            onClick={() => navigate('/admin')}
                            className="hover:underline text-blue-600"
                        >
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Phòng khám</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý phòng khám</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="flex-1 border px-3 py-2 rounded-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex gap-2">
                            <button onClick={handleSearch}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Tìm kiếm
                            </button>
                            {!(roles.includes('DOCTOR')) && (
                                <button
                                    onClick={() => navigate('/clinic/create')}
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
                            {clinicList.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Không có phòng khám nào.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-3">STT</th>
                                            <th className="p-3 w-56">Tên phòng khám</th>
                                            <th className="p-3">Địa chỉ</th>
                                            <th className="p-3 w-60">Mô tả</th>
                                            <th className="p-3">SĐT</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3 w-28">Trạng thái</th>
                                            <th className="p-3 w-28">Ngày tạo</th>
                                            <th className="p-3 w-32 text-center">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clinicList.map((clinic, index) => (
                                            <tr key={clinic.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">{indexOfFirst + index + 1}</td>
                                                <td className="p-3">{clinic.name}</td>
                                                <td className="p-3">{clinic.address}</td>
                                                <td className="p-3">{clinic.description}</td>
                                                <td className="p-3">{clinic.phone}</td>
                                                <td className="p-3">{clinic.email}</td>
                                                <td className="p-3 font-medium">
                                                    {/* {clinic.status === 'active' ? (
                                                        <span className="text-green-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Tạm dừng
                                                        </span>
                                                    )} */}
                                                    {clinic.status === 'active' && (
                                                        <span className="text-green-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                        </span>
                                                    )}
                                                    {clinic.status === 'ACTIVE' && (
                                                        <span className="text-green-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                        </span>
                                                    )}
                                                    {clinic.status === 'DELETED' && (
                                                        <span className="text-red-500 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Đã xóa
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3">{formatDate(clinic.createdAt)}</td>
                                                <td className="p-3 space-x-2 text-center">
                                                    {!(roles.includes('DOCTOR')) && (
                                                        <>
                                                            {clinic.status !== 'DELETED' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => navigate(`/clinic/edit/${clinic.id}`)}
                                                                        className="p-1 border rounded hover:bg-gray-100"
                                                                        title="Chỉnh sửa"
                                                                    >
                                                                        <Pencil className="w-4 h-4 text-gray-700" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(clinic.id)}
                                                                        className="p-1 border rounded hover:bg-gray-100"
                                                                        title="Xóa"
                                                                    >
                                                                        <Delete className="w-4 h-4 text-gray-700" />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleRestoreClinic(clinic.id)}
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
                                </table >
                            )}
                        </div >
                    )}
                    {totalPages > 1 && (
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
                        </div>)}
                </div >
            </div >
        </ClippedDrawer >
    );
};

export default ClinicManager;
