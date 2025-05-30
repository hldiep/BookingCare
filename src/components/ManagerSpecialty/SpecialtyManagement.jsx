import React, { useEffect, useState } from 'react';
import { Pencil, Info, Delete, CheckCircle, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { deleteSpecialty, fetchAllSpecialty, fetchAllSpecialtyManager } from '../util/specialtyApi';
import { fetchAllDoctors } from '../util/doctorApi';

const SpecialtyManagement = () => {
    const navigate = useNavigate();

    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const spPerPage = 10;
    const indexOfLast = currentPage * spPerPage;
    const indexOfFirst = indexOfLast - spPerPage;
    const current = specialties.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(specialties.length / spPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn về đầu trang
    };
    const loadData = async () => {
        try {
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

            if (extractedRoles.includes('MANAGER')) {
                specialtyData = await fetchAllSpecialtyManager();
            } else if (extractedRoles.includes('DOCTOR')) {
                specialtyData = await fetchAllSpecialty();
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
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadData();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa chuyên khoa này không?');
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await deleteSpecialty(id);
            alert(response.data || 'Xóa thành công');
            setLoading(true);
            await loadData();
        } catch (err) {
            alert(err.message || 'Đã xảy ra lỗi khi xóa chuyên khoa');
        }
    }
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
                            className="flex-1 border px-3 py-2 rounded-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tìm kiếm</button>
                            {!(roles.includes('DOCTOR')) && (<button
                                onClick={() => navigate('/specialty/create')}
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
                                                <td className="p-3 text-center space-x-2">
                                                    {!(roles.includes('DOCTOR')) && (
                                                        <>
                                                            <button
                                                                onClick={() => navigate(`/specialty/edit/${item.id}`)}
                                                                className="p-1 border rounded hover:bg-gray-100"
                                                                title="Chỉnh sửa"
                                                            >
                                                                <Pencil className="w-4 h-4 text-gray-700" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(specialties.id)}
                                                                className="p-1 border rounded hover:bg-gray-100"
                                                                title="Xóa"
                                                            >
                                                                <Delete className="w-4 h-4 text-gray-700" />
                                                            </button>
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

export default SpecialtyManagement;
