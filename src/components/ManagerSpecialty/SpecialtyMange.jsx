import React, { useEffect, useState } from 'react';
import { Pencil, Delete, CheckCircle, Ban, ArchiveRestoreIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { deleteSpecialty, fetchAllSpecialtyManager, fetchPageSpecialty, fetchPageSpecialtyManager, searchSpecialty, updateSpecialtyStatus } from '../util/specialtyApi';
import { fetchAllDoctors } from '../util/doctorApi';

const SpecialtyManage = () => {
    const navigate = useNavigate();

    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const spPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [keyword, setKeyword] = useState("");
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

            let specialtyData = [];
            let totalPageCount = 0;

            if (extractedRoles.includes('MANAGER')) {
                const res = await fetchPageSpecialtyManager(currentPage, spPerPage);
                specialtyData = res.data;
                totalPageCount = res.totalPages;
            } else if (extractedRoles.includes('DOCTOR')) {
                const res = await fetchPageSpecialty(currentPage, spPerPage);
                specialtyData = res.data;
                totalPageCount = res.totalPages;
            } else {
                setError('Không có quyền truy cập chuyên khoa.');
                setLoading(false);
                return;
            }

            const doctorData = await fetchAllDoctors();
            const specialtiesWithDoctors = specialtyData.map(specialty => {
                const relatedDoctors = doctorData.filter(
                    doctor => doctor.medicalSpecialtyId === specialty.id
                );
                return {
                    ...specialty,
                    doctors: relatedDoctors,
                };
            });

            setSpecialties(specialtiesWithDoctors);
            setTotalPages(totalPageCount);
            setError('');
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
            setError('Đã xảy ra lỗi khi tải dữ liệu.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (roles.includes('DOCTOR') || roles.includes('MANAGER')) {
            loadData();
        }
    }, [currentPage]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa chuyên khoa này không?');
        if (!confirmDelete) {
            return;
        }
        try {
            await updateSpecialtyStatus(id, 'DELETED');
            alert("Đã xóa chuyên khoa!");
            setSpecialties(prevSp =>
                prevSp.map(sp =>
                    sp.id === id ? { ...sp, status: 'DELETED' } : sp
                )
            );
        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    };
    const handleRestoreSpecialty = async (id) => {
        const confirmRestore = window.confirm('Bạn có chắc muốn khôi phục chuyên khoa này không?');
        if (!confirmRestore) {
            return;
        }
        try {
            await updateSpecialtyStatus(id, 'ACTIVE');
            alert("Khôi phục trạng thái thành công!");
            setSpecialties(prevSp =>
                prevSp.map(sp =>
                    sp.id === id ? { ...sp, status: 'ACTIVE' } : sp
                )
            );
        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    };
    const handlePageClick = (page) => {
        setCurrentPage(page - 1);
    };
    const handleSearch = async () => {
        if (!keyword.trim()) {
            loadData();
            return;
        }

        try {
            setLoading(true);
            const res = await searchSpecialty(keyword.trim());
            setSpecialties(res);
            setTotalPages(0);
        } catch (err) {
            console.error('Lỗi khi tìm kiếm:', err);
            setError('Không thể tìm kiếm.');
        } finally {
            setLoading(false);
        }
    };

    const indexOfLast = (currentPage + 1) * spPerPage;
    const indexOfFirst = indexOfLast - spPerPage;
    const current = specialties;

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chuyên khoa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý chuyên khoa</h2>
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
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tìm kiếm</button>
                            {!(roles.includes('DOCTOR')) && (
                                <button
                                    onClick={() => navigate('/specialty/create')}
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
                            {specialties.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Không có chuyên khoa nào.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-3 border-r">STT</th>
                                            <th className="p-3 border-r">Tên chuyên khoa</th>
                                            <th className="p-3 border-r">Mô tả</th>
                                            <th className="p-3 border-r">Bác sĩ</th>
                                            <th className="p-3 border-r">Trạng thái</th>
                                            <th className="p-3 w-32 text-center">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {current.map((item, index) => (
                                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">{indexOfFirst + index + 1}</td>
                                                <td className="p-3 ">{item.name}</td>
                                                <td className="p-3 ">{item.description}</td>
                                                <td className="p-3 ">
                                                    {Array.isArray(item.doctors) && item.doctors.length > 0 ? (
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {item.doctors.map((doc, idx) => (
                                                                <li key={idx}>{doc.name}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-gray-500 italic">Chưa có</span>
                                                    )}
                                                </td>
                                                <td className="p-3 font-medium">
                                                    {!(roles.includes('DOCTOR')) && (
                                                        <>
                                                            {
                                                                item.status === 'ACTIVE' ? (
                                                                    <span className="text-green-600 flex items-center">
                                                                        <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-red-500 flex items-center">
                                                                        <Ban className="w-4 h-4 mr-1" /> Đã xóa
                                                                    </span>
                                                                )
                                                            }
                                                        </>
                                                    )}
                                                    {(roles.includes('DOCTOR')) && (
                                                        <>
                                                            <span className="text-green-600 flex items-center">
                                                                <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                            </span>
                                                        </>
                                                    )}

                                                </td>
                                                <td className="p-3 text-center space-x-2">
                                                    {!(roles.includes('DOCTOR')) && (
                                                        <>
                                                            {item.status !== 'DELETED' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => navigate(`/specialty/edit/${item.id}`)}
                                                                        className="p-1 border rounded hover:bg-gray-100"
                                                                        title="Chỉnh sửa"
                                                                    >
                                                                        <Pencil className="w-4 h-4 text-gray-700" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(item.id)}
                                                                        className="p-1 border rounded hover:bg-gray-100"
                                                                        title="Xóa"
                                                                    >
                                                                        <Delete className="w-4 h-4 text-gray-700" />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleRestoreSpecialty(item.id)}
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
                    {totalPages > 1 && (
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
                        </div>)}
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default SpecialtyManage;
