import React, { useEffect, useState } from 'react';
import { BadgeCheck, Pencil, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchAllDoctors } from '../util/doctorApi';

const DoctorManagement = () => {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const data = await fetchAllDoctors();
                setDoctors(data);
            } catch (err) {
                console.error('Lỗi tải danh sách bác sĩ:', err);
                setError('Không thể tải danh sách bác sĩ. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        };
        loadDoctors();
    }, []);
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
                            <button
                                onClick={() => navigate('/doctor/create')}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Tạo mới
                            </button>
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {loading ? (
                        <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                    ) : (
                        <div className="overflow-x-auto bg-white border rounded shadow-sm">
                            {doctors.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Không có bác sĩ nào.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-3 w-14">Ảnh</th>
                                            <th className="p-3">Chuyên khoa</th>
                                            <th className="p-3">Họ tên</th>
                                            <th className="p-3">Số điện thoại</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Trạng thái</th>
                                            <th className="p-3 w-32 text-center">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors.map((doc) => (
                                            <tr key={doc.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">
                                                    <img src={doc.account?.avatar || 'https://via.placeholder.com/40'}
                                                        alt="avatar"
                                                        className="w-9 h-9 rounded-full object-cover" />
                                                </td>
                                                <td className="p-3">{doc.medicalSpecialty?.name}</td>
                                                <td className="p-3">{doc.name}</td>
                                                <td className="p-3">{doc.phone}</td>
                                                <td className="p-3">{doc.email}</td>
                                                <td className={`p-3 font-medium ${doc.status ? 'text-green-600' : 'text-red-500'}`}>
                                                    <BadgeCheck className="inline-block w-4 h-4 mr-1" />
                                                    {doc.status ? 'Hoạt động' : 'Ngừng hoạt động'}
                                                </td>
                                                <td className="p-3 space-x-2 text-center">
                                                    <button
                                                        onClick={() => navigate(`/doctor/edit/${doc.id}`)}
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <Pencil className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/doctor/detail-manage/${doc.id}`)}
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Chi tiết"
                                                    >
                                                        <Info className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </ClippedDrawer>
    );
};

export default DoctorManagement;
