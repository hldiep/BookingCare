import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
const SpecialtyDetail = () => {
    const navigate = useNavigate();

    const specialty = {
        id: 'MS01',
        name: 'Tim mạch',
        description:
            'Khám và điều trị các bệnh lý liên quan đến tim (Cardiology - Heart-related diseases)',
        status: 'ACTIVE',
        doctors: ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B'],
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
                        <span className="text-gray-700 font-medium">Chi tiết</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chi tiết chuyên khoa</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)]">
                    <div className="bg-white rounded shadow p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mã chuyên khoa:
                            </label>
                            <p className="text-gray-900">{specialty.id}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên chuyên khoa:
                            </label>
                            <p className="text-gray-900">{specialty.name}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mô tả:
                            </label>
                            <p className="text-gray-900 whitespace-pre-wrap">{specialty.description}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái:
                            </label>
                            <p
                                className={
                                    specialty.status === 'ACTIVE'
                                        ? 'text-green-600 font-semibold'
                                        : 'text-red-600 font-semibold'
                                }
                            >
                                {specialty.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm dừng'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Danh sách bác sĩ:
                            </label>
                            {specialty.doctors.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-900 space-y-1">
                                    {specialty.doctors.map((doctor, idx) => (
                                        <li key={idx}>{doctor}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="italic text-gray-500">Chưa có bác sĩ nào.</p>
                            )}
                        </div>

                        <div>
                            <button
                                onClick={() => navigate('/specialty')}
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default SpecialtyDetail;
