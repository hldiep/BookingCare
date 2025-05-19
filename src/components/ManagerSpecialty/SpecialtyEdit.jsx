import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const SpecialtyEdit = () => {
    const navigate = useNavigate();

    const [specialty, setSpecialty] = useState({
        id: 'MS01',
        name: 'Tim mạch',
        description:
            'Khám và điều trị các bệnh lý liên quan đến tim (Cardiology - Heart-related diseases)',
        status: 'ACTIVE',
        doctors: ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B'],
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
        console.log('Cập nhật chuyên khoa:', specialty);
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
                        <span className="text-gray-700 font-medium">Chỉnh sửa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chỉnh sửa chuyên khoa</h2>
                </div>


                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)]">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div>
                            <label
                                htmlFor="id"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Mã chuyên khoa:
                            </label>
                            <input
                                id="id"
                                type="text"
                                name="id"
                                value={specialty.id}
                                readOnly
                                className="outline-none mt-1 block w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tên chuyên khoa:
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={specialty.name}
                                onChange={handleChange}
                                className="outline-none mt-1 block w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Mô tả:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={specialty.description}
                                onChange={handleChange}
                                rows={4}
                                className="outline-none mt-1 block w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Trạng thái:
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={specialty.status}
                                onChange={handleChange}
                                className="outline-none mt-1 block w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
                            >
                                <option value="ACTIVE">Hoạt động</option>
                                <option value="DELETING">Tạm dừng</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bác sĩ thuộc chuyên khoa:
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {allDoctors.map((doctor, idx) => (
                                    <label
                                        key={idx}
                                        className="flex items-center space-x-2 cursor-pointer select-none"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={specialty.doctors.includes(doctor)}
                                            onChange={() => handleDoctorToggle(doctor)}
                                            className="cursor-pointer"
                                        />
                                        <span className="text-gray-900">{doctor}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 flex space-x-4 pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Lưu
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
            </div>
        </ClippedDrawer>
    );
};

export default SpecialtyEdit;
