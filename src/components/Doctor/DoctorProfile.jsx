import React, { useEffect, useState } from 'react';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { useNavigate, Link } from 'react-router-dom';
import { fetchDoctorById, fetchDoctorByIdManager } from '../util/doctorApi';

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDoctor = async () => {
            try {
                const token = localStorage.getItem('token');
                const userJson = localStorage.getItem('user');

                if (!token || !userJson) {
                    setError('Chưa đăng nhập.');
                    setLoading(false);
                    return;
                }

                const user = JSON.parse(userJson);

                const roleName = user?.account?.role?.name;
                if (roleName !== 'DOCTOR' && roleName !== 'MANAGER') {
                    setError('Tài khoản không phải là bác sĩ hoặc quản lý');
                    setLoading(false);
                    return;
                }

                setDoctor(user);

            } catch (err) {
                console.error('Lỗi khi tải thông tin bác sĩ:', err);
                setError('Không thể tải thông tin bác sĩ.');
            } finally {
                setLoading(false);
            }
        };

        loadDoctor();
    }, []);
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    };

    if (error) {
        return (
            <ClippedDrawer>
                <div className="p-6 text-center text-red-600">{error}</div>
            </ClippedDrawer>
        );
    }

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <Link to="/admin" className="hover:underline text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thông tin cá nhân</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Thông tin cá nhân</h2>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                        <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                    </div>
                ) : (
                    <div className="min-h-screen bg-main p-6">
                        <div className="mt-4 flex flex-col md:flex-row gap-6">
                            <div className="flex justify-center md:block">
                                <img
                                    src={doctor.avatarUrl}
                                    alt="Doctor Avatar"
                                    className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
                                />
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                <div><span className="font-semibold">Mã số bác sĩ:</span> {doctor.id}</div>
                                <div><span className="font-semibold">Email:</span> <strong>{doctor.email}</strong></div>
                                <div><span className="font-semibold">Tên:</span> <strong>{doctor.name}</strong></div>
                                <div><span className="font-semibold">Chuyên khoa:</span> {doctor.medicalSpecialtyId}</div>
                                <div><span className="font-semibold">Số điện thoại:</span> {doctor.phone}</div>
                                <div><span className="font-semibold">Username:</span> <strong>{doctor?.account?.username}</strong></div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-800 mb-2">Mô tả</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {doctor.description}
                            </ul>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                            <div><span className="font-semibold">Trạng thái:</span> <span className="text-green-600">{doctor.status}</span></div>
                            <div><span className="font-semibold">Vai trò:</span> {doctor?.account?.role?.name}</div>
                            <div><span className="font-semibold">Khởi tạo:</span> {formatDate(doctor.createdAt)}</div>
                            {/* <div><span className="font-semibold">Cập nhật lần cuối:</span> {doctor.updatedAt}</div> */}
                        </div>

                        {/* <div className="mt-6 text-right">
                            <button
                                onClick={() => navigate('/profile/edit')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Cập nhật thông tin
                            </button>
                        </div> */}
                    </div>)}
            </div>
        </ClippedDrawer>
    );
};

export default DoctorProfile;
