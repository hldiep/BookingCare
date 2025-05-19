import React, { useState } from 'react';
import { Pencil, Info, Ban, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const ServiceManagement = () => {
    const navigate = useNavigate();
    const [services] = useState([
        {
            id: 'SV001',
            name: 'Khám tim mạch',
            description: 'Đánh giá và điều trị các bệnh lý tim mạch',
            department: 'Tim mạch',
            status: 'ACTIVE',
        },
        {
            id: 'SV002',
            name: 'Điều trị Da liễu',
            description: 'Khám và điều trị các bệnh về da như mụn, eczema',
            department: 'Da liễu',
            status: 'ACTIVE',
        },
        {
            id: 'SV003',
            name: 'Chăm sóc Nhi khoa',
            description: 'Khám và chăm sóc sức khỏe cho trẻ em',
            department: 'Nhi khoa',
            status: 'DELETING',
        },
    ]);

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Dịch vụ</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý dịch vụ</h2>
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
                                onClick={() => navigate('/service/create')}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Tạo mới
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white border rounded shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-3">Mã</th>
                                    <th className="p-3">Tên dịch vụ</th>
                                    <th className="p-3">Mô tả</th>
                                    <th className="p-3">Chuyên khoa</th>
                                    <th className="p-3">Trạng thái</th>
                                    <th className="p-3 text-center">Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((sv) => (
                                    <tr key={sv.id} className="border-t hover:bg-gray-50">
                                        <td className="p-3">{sv.id}</td>
                                        <td className="p-3">{sv.name}</td>
                                        <td className="p-3">{sv.description}</td>
                                        <td className="p-3">{sv.department}</td>
                                        <td className="p-3 font-medium">
                                            {sv.status === 'ACTIVE' ? (
                                                <span className="text-green-600 flex items-center">
                                                    <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                </span>
                                            ) : (
                                                <span className="text-red-500 flex items-center">
                                                    <Ban className="w-4 h-4 mr-1" /> Tạm dừng
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3 space-x-2 text-center">
                                            <button
                                                onClick={() => navigate('/service/edit')}
                                                className="p-1 border rounded hover:bg-gray-100"
                                                title="Chỉnh sửa"
                                            >
                                                <Pencil className="w-4 h-4 text-gray-700" />
                                            </button>
                                            <button
                                                onClick={() => navigate('/service/detail')}
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
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default ServiceManagement;
