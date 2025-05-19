import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const SpecialtyCreate = () => {
    const navigate = useNavigate();

    const [specialty, setSpecialty] = useState({
        id: '',
        name: '',
        description: '',
        status: 'ACTIVE',
        doctors: [],
    });

    const allDoctors = [
        'Dr. Nguyễn Văn A',
        'Dr. Trần Thị B',
        'Dr. Lê Văn C',
        'Dr. Phạm Thị D',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSpecialty((prev) => ({ ...prev, [name]: value }));
    };

    const handleDoctorToggle = (doctor) => {
        setSpecialty((prev) => {
            const exists = prev.doctors.includes(doctor);
            const updatedDoctors = exists
                ? prev.doctors.filter((d) => d !== doctor)
                : [...prev.doctors, doctor];
            return { ...prev, doctors: updatedDoctors };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Tạo chuyên khoa mới:', specialty);
        navigate('/specialty');
    };

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
                        <button
                            onClick={() => navigate('/specialty')}
                            className="hover:underline text-blue-600"
                        >
                            Chuyên khoa
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thêm mới</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Tạo chuyên khoa mới</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)]">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên chuyên khoa:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={specialty.name}
                                onChange={handleChange}
                                required
                                className="outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mô tả:
                            </label>
                            <textarea
                                name="description"
                                value={specialty.description}
                                onChange={handleChange}
                                rows={4}
                                className="outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none "
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái:
                            </label>
                            <select
                                name="status"
                                value={specialty.status}
                                onChange={handleChange}
                                className="outline-none mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none "
                            >
                                <option value="ACTIVE">Hoạt động</option>
                                <option value="DELETING">Tạm dừng</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bác sĩ thuộc chuyên khoa:
                            </label>
                            <div className="max-h-48 overflow-auto border border-gray-300 rounded p-3 bg-white">
                                <div className="grid grid-cols-2 gap-2">
                                    {allDoctors.map((doctor, idx) => (
                                        <label
                                            key={idx}
                                            className="flex items-center space-x-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={specialty.doctors.includes(doctor)}
                                                onChange={() => handleDoctorToggle(doctor)}
                                                className="outline-none rounded border-gray-300 text-blue-600 "
                                            />
                                            <span className="text-gray-800">{doctor}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Tạo mới
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/specialty')}
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </ClippedDrawer >
    );
};

export default SpecialtyCreate;
