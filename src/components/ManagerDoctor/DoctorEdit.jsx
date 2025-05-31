import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchDoctorByIdManager, updateDoctor } from '../util/doctorApi';
import { fetchAllSpecialtyManager } from '../util/specialtyApi';

const DoctorEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [specialties, setSpecialties] = useState([]);
    const [doctor, setDoctor] = useState({
        name: '',
        gender: true,
        birthday: '',
        medicalSpecialtyId: '',
        phone: '',
        email: '',
        address: '',
        status: '',
        image: '',
        createdAt: new Date().toISOString(),
    });

    useEffect(() => {
        const loadDoctor = async () => {
            try {
                const data = await fetchDoctorByIdManager(id);
                setDoctor(data);
            } catch (error) {
                console.error("Không thể tải thông tin bác sĩ:", error);
            }
        };

        const loadSpecialties = async () => {
            try {
                const response = await fetchAllSpecialtyManager(); // Gọi API lấy danh sách chuyên khoa
                setSpecialties(response);
            } catch (error) {
                console.error("Không thể tải danh sách chuyên khoa:", error);
            }
        };
        loadDoctor();
        loadSpecialties();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'gender') {
            newValue = value === 'true';
        }

        setDoctor({ ...doctor, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoctor(doctor);
            alert("Cập nhật bác sĩ thành công!");
            navigate("/doctor");
        } catch (error) {
            alert("Lỗi khi cập nhật bác sĩ: " + error.message);
        }
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
                        <button onClick={() => navigate('/doctor')} className="hover:underline text-blue-600">
                            Bác sĩ
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chỉnh sửa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chỉnh sửa bác sĩ</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">
                    <div className="w-full md:w-1/5 flex flex-col items-center text-center bg-white p-4 rounded shadow">
                        <img
                            src=''
                            alt="Avatar bác sĩ"
                            className="w-32 h-32 object-cover rounded-full border"
                        />
                        <div className="mt-4 font-semibold text-lg">BS. {doctor.name}</div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full md:w-4/5 bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                            <input
                                type="text"
                                name="name"
                                value={doctor.name}
                                onChange={handleChange}
                                required
                                className="p-2 text-sm mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Chuyên khoa</label>
                            <select
                                name="medicalSpecialtyId"
                                value={doctor.medicalSpecialtyId}
                                onChange={handleChange}
                                required
                                className="p-2 text-sm mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="">Chọn chuyên khoa</option>
                                {specialties.map((specialty) => (
                                    <option key={specialty.id} value={specialty.id}>
                                        {specialty.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                            <select
                                name="gender"
                                value={doctor.gender}
                                onChange={handleChange}
                                required
                                className="p-2 text-sm mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <input
                                type="date"
                                name="birthday"
                                value={doctor.birthday}
                                onChange={handleChange}
                                required
                                className="p-2 text-sm mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={doctor.phone}
                                onChange={handleChange}
                                required
                                className="p-2 text-sm mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={doctor.email}
                                onChange={handleChange}
                                required
                                className="p-2 text-sm mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className='md:col-span-2 flex space-x-4 items-center text-center'>
                            <label className="block font-medium text-sm">Trạng thái</label>
                            <select
                                name="status"
                                value={doctor.status}
                                onChange={handleChange}
                                className="p-1 text-sm outline-none block rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="ACTIVE">Hoạt động</option>
                                <option value="BLOCKED">Bị khóa</option>
                                <option value="DELETED">Đã xóa</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={doctor.address}
                                onChange={handleChange}
                                required
                                className="p-2 text-sm mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Link ảnh đại diện</label>
                            <input
                                type="text"
                                name="image"
                                value={doctor.image}
                                onChange={handleChange}
                                className="p-2 text-sm mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className=" py-2 bg-blue-600 text-white px-4 rounded">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </ClippedDrawer >
    );
};

export default DoctorEdit;
