import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        setSpecialty(prev => ({ ...prev, [name]: value }));
    };

    const handleDoctorToggle = (doctor) => {
        setSpecialty(prev => {
            const exists = prev.doctors.includes(doctor);
            const updatedDoctors = exists
                ? prev.doctors.filter(d => d !== doctor)
                : [...prev.doctors, doctor];
            return { ...prev, doctors: updatedDoctors };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Tạo chuyên khoa mới:', specialty);
        navigate('/specialty'); // Giả định sau khi tạo thành công thì quay lại danh sách
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className="items-center p-2 border-b space-x-2 font-bold">
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/specialty")}>Chuyên khoa</button>
                    <span>{'>'}</span>
                    <span>Thêm</span>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Tạo chuyên khoa mới</h2>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 m-4">

                    <div>
                        <label className="font-semibold">Tên chuyên khoa:</label>
                        <input
                            type="text"
                            name="name"
                            value={specialty.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Mô tả:</label>
                        <textarea
                            name="description"
                            value={specialty.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Trạng thái:</label>
                        <select
                            name="status"
                            value={specialty.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded outline-none"
                        >
                            <option value="ACTIVE">Hoạt động</option>
                            <option value="DELETING">Tạm dừng</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold">Bác sĩ thuộc chuyên khoa:</label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {allDoctors.map((doctor, idx) => (
                                <label key={idx} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={specialty.doctors.includes(doctor)}
                                        onChange={() => handleDoctorToggle(doctor)}
                                    />
                                    <span>{doctor}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 space-x-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Tạo mới
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/specialty")}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SpecialtyCreate;
