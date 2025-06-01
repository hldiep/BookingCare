import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchDoctorById, fetchDoctorByIdManager } from '../util/doctorApi';
import { fetchAllSpecialty } from '../util/specialtyApi';

const DoctorDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);

    const [specialtyName, setSpecialtyName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
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

                let doctorData = null;
                if (extractedRoles.includes('MANAGER')) {
                    doctorData = await fetchDoctorByIdManager(id);
                } else if (extractedRoles.includes('DOCTOR')) {
                    doctorData = await fetchDoctorById(id);
                } else {
                    setError('Tài khoản không hợp lệ.');
                    setLoading(false);
                    return;
                }

                setDoctor(doctorData);

                const specialties = await fetchAllSpecialty();
                const matchedSpecialty = specialties.find(
                    (item) => item.id === doctorData.medicalSpecialtyId
                );

                setSpecialtyName(matchedSpecialty ? matchedSpecialty.name : doctorData.medicalSpecialtyId);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin bác sĩ hoặc chuyên khoa:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const InfoItem = ({ label, value, type = 'text', full = false }) => (
        <div className={full ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value || ''}
                readOnly
                className="mt-1 block w-full rounded border-gray-300 shadow-sm bg-gray-50 text-sm outline-none p-2"
            />
        </div>
    );

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    };

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">Dashboard</button>
                        <span>/</span>
                        <button onClick={() => navigate('/doctor')} className="hover:underline text-blue-600">Bác sĩ</button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thông tin</span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-xl font-semibold">Thông tin bác sĩ</h2>
                        {!(roles.includes('DOCTOR')) && (
                            <>
                                {doctor && (
                                    <button
                                        onClick={() => navigate(`/doctor/edit/${doctor.id}`)}
                                        className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
                                    >
                                        Chỉnh sửa
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                        <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                    </div>
                ) : doctor ? (
                    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">
                        <div className="w-full md:w-1/5 flex flex-col items-center text-center bg-white p-4 rounded shadow">
                            <img
                                src={doctor.imageLink && doctor.imageLink.trim() !== ""
                                    ? doctor.imageLink
                                    : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                                alt="Avatar bác sĩ"
                                className="w-32 h-32 object-cover rounded-full border"
                            />
                            <div className="mt-4 font-semibold text-lg">BS. {doctor.name}</div>
                        </div>

                        <form className="w-full md:w-4/5 bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoItem label="Họ tên" value={doctor.name} />
                            <InfoItem label="Chuyên khoa" value={doctor.medicalSpecialty?.name || specialtyName} />
                            <InfoItem label="Giới tính" value={doctor.gender ? 'Nam' : 'Nữ'} />
                            <InfoItem label="Số điện thoại" value={doctor.phone} />
                            <InfoItem label="Email" value={doctor.email} />
                            <InfoItem label="Địa chỉ" value={doctor.address} full />
                            <InfoItem
                                label="Trạng thái"
                                value={
                                    doctor?.account?.status === 'ACTIVE'
                                        ? 'Đang hoạt động'
                                        : doctor?.account?.status === 'BLOCKED'
                                            ? 'Bị khóa'
                                            : doctor?.account?.status === 'DELETED'
                                                ? 'Đã xóa'
                                                : 'Không xác định'
                                }
                            />
                            <InfoItem label="Ngày tạo" value={formatDate(doctor.createdAt)} />
                        </form>
                    </div>
                ) : (
                    <div className="p-6 text-center text-red-500 font-semibold">Không tìm thấy thông tin bác sĩ.</div>
                )}
            </div>
        </ClippedDrawer>
    );

};

export default DoctorDetail;
