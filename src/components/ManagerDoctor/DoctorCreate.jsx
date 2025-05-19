import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const DoctorCreate = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        name: '',
        gender: 'male',
        birthday: '',
        specialty: '',
        phone: '',
        email: '',
        address: '',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Thêm bác sĩ:", doctor);
        alert("Đã thêm bác sĩ thành công!");
        navigate("/doctor");
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
                        <span className="text-gray-700 font-medium">Thêm</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Thêm bác sĩ</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">

                    <div className="w-full md:w-1/5 flex flex-col items-center text-center bg-white p-4 rounded shadow">
                        <img
                            src={doctor.image || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
                            alt="Avatar bác sĩ"
                            className="w-32 h-32 object-cover rounded-full border"
                        />
                        <div className="mt-4 font-semibold text-lg">
                            {doctor.name ? `BS. ${doctor.name}` : 'Ảnh đại diện'}
                        </div>
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
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Chuyên khoa</label>
                            <input
                                type="text"
                                name="specialty"
                                value={doctor.specialty}
                                onChange={handleChange}
                                required
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                            <select
                                name="gender"
                                value={doctor.gender}
                                onChange={handleChange}
                                required
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <input
                                type="date"
                                name="birthday"
                                value={doctor.birthday}
                                onChange={handleChange}
                                required
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="number"
                                name="phone"
                                value={doctor.phone}
                                onChange={handleChange}
                                required
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={doctor.address}
                                onChange={handleChange}
                                required
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Link ảnh đại diện</label>
                            <input
                                type="text"
                                name="image"
                                value={doctor.image}
                                onChange={handleChange}
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                Tạo mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default DoctorCreate;
