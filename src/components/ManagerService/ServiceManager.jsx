import React, { useEffect, useState } from 'react';
import { Pencil, Info, Ban, CheckCircle, Delete, ArchiveRestoreIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { deleteService, fetchAllServices, fetchAllServicesManager, fetchPageService, fetchPageServiceManager } from '../util/serviceApi';

const ServiceManager = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const servicePerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const loadService = async () => {
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

            let serviceList = [];
            let totalPageCount = 0;

            if (extractedRoles.includes('MANAGER')) {
                const res = await fetchPageServiceManager(currentPage);
                serviceList = res.data;
                totalPageCount = res.totalPages;
            } else if (extractedRoles.includes('DOCTOR')) {
                const res = await fetchPageService(currentPage);
                serviceList = res.data;
                totalPageCount = res.totalPages;
            } else {
                setError('Tài khoản không hợp lệ.');
                setLoading(false);
                return;
            }
            setServices(serviceList);
            setTotalPages(totalPageCount);
            setError('');
        } catch (error) {
            console.log("Lỗi tải danh sách dịch vụ:", error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadService();
    }, []);

    useEffect(() => {
        if (roles.includes('DOCTOR') || roles.includes('MANAGER')) {
            loadService();
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
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa dịch vụ này không?');
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await deleteService(id);
            alert(response.data || 'Xóa thành công');
            setServices(prevService =>
                prevService.map(sv =>
                    sv.id === id ? { ...sv, status: 'DELETED' } : sv
                )
            );
        } catch (err) {
            alert(err.message || 'Đã xảy ra lỗi khi xóa dịch vụ');
        }
    }
    const indexOfFirst = currentPage * servicePerPage;
    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Dịch vụ</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý dịch vụ</h2>
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
                            {!(roles.includes('DOCTOR')) && (<button
                                onClick={() => navigate('/service/create')}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Tạo mới
                            </button>)}
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
                            {services.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Không có dịch vụ nào.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-3">STT</th>
                                            <th className="p-3">Tên dịch vụ</th>
                                            <th className="p-3">Mô tả</th>
                                            <th className="p-3">Trạng thái</th>
                                            <th className="p-3">Ngày tạo</th>
                                            <th className="p-3 text-center">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((sv, index) => (
                                            <tr key={sv.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">{indexOfFirst + index + 1}</td>
                                                <td className="p-3">{sv.name}</td>
                                                <td className="p-3">{sv.description}</td>
                                                <td className="p-3 font-medium">
                                                    {sv.status === 'ACTIVE' ? (
                                                        <span className="text-green-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Đang hoạt động
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Đã xóa
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3">{formatDate(sv.createdAt)}</td>
                                                <td className="p-3 space-x-2 text-center flex">
                                                    {!(roles.includes('DOCTOR')) && (
                                                        <>
                                                            {sv.status !== 'DELETED' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => navigate(`/service/edit/${sv.id}`)}
                                                                        className="p-1 border rounded hover:bg-gray-100"
                                                                        title="Chỉnh sửa"
                                                                    >
                                                                        <Pencil className="w-4 h-4 text-gray-700" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(sv.id)}
                                                                        className="p-1 border rounded hover:bg-gray-100"
                                                                        title="Xóa"
                                                                    >
                                                                        <Delete className="w-4 h-4 text-gray-700" />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button
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

export default ServiceManager;
