import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchDoctorById } from '../util/doctorApi';

const DoctorDetail = () => {
    const navigate = useNavigate();
    // const [doctor] = useState({
    //     name: 'Nguyễn Thị Thu Trang',
    //     gender: 'female',
    //     birthday: '1985-06-15',
    //     specialty: 'Nội tổng hợp',
    //     phone: '0123456789',
    //     email: 'thu.trang@example.com',
    //     address: '123 Đường ABC, Quận 1, TP.HCM',
    //     image: 'https://i.pinimg.com/originals/24/bd/d9/24bdd9ec59a9f8966722063fe7791183.jpg',
    // });
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await fetchDoctorById(id);
                setDoctor(data);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin bác sĩ:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);
    if (loading) {
        return (
            <ClippedDrawer>
                <div className="p-10 text-center text-gray-600">Đang tải thông tin bác sĩ...</div>
            </ClippedDrawer>
        );
    }

    if (!doctor) {
        return (
            <ClippedDrawer>
                <div className="p-10 text-center text-red-600">Không tìm thấy bác sĩ!</div>
            </ClippedDrawer>
        );
    }
    const InfoItem = ({ label, value, type = 'text', full = false }) => (
        <div className={full ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value || ''}
                readOnly
                className="mt-1 block w-full rounded border-gray-300 shadow-sm bg-gray-50"
            />
        </div>
    );
    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <button onClick={() => navigate('/doctor')} className="hover:underline text-blue-600">
                            Bác sĩ
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thông tin</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Thông tin bác sĩ</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto  bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">

                    <div className="w-full md:w-1/5 flex flex-col items-center text-center bg-white p-4 rounded shadow">
                        <img
                            src={doctor.account?.avatar || 'https://via.placeholder.com/150'}
                            alt="Avatar bác sĩ"
                            className="w-32 h-32 object-cover rounded-full border"
                        />
                        <div className="mt-4 font-semibold text-lg">BS. {doctor.name}</div>
                    </div>

                    <form className="w-full md:w-4/5 bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem label="Họ tên" value={doctor.name} />
                        <InfoItem label="Chuyên khoa" value={doctor.medicalSpecialty?.name} />
                        <InfoItem label="Giới tính" value={doctor.gender === 'female' ? 'Nữ' : 'Nam'} />
                        <InfoItem label="Ngày sinh" value={doctor.birthday} type="date" />
                        <InfoItem label="Số điện thoại" value={doctor.phone} />
                        <InfoItem label="Email" value={doctor.email} />
                        <InfoItem label="Địa chỉ" value={doctor.address} full />
                    </form>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default DoctorDetail;
