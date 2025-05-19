import React, { useState } from 'react';
import { Info, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const ClinicManagement = () => {
    const navigate = useNavigate();
    const [clinics] = useState([
        {
            id: 'CL01',
            name: 'Phòng khám Tim mạch',
            address: '101 Main St.',
            description:
                'Khám và điều trị các bệnh lý liên quan đến tim (Cardiology - Heart-related diseases)',
            phone: '02812345678',
            email: 'info@downtownclinic.com',
            status: 'ACTIVE',
        },
        {
            id: 'CL02',
            name: 'Phòng khám Da liễu',
            address: '101 Main St.',
            description:
                'Chẩn đoán và điều trị các bệnh về da, tóc và móng (Dermatology - Skin, hair, and nail diseases)',
            phone: '02898765432',
            email: 'contact@cityhealthcenter.com',
            status: 'ACTIVE',
        },
        {
            id: 'CL03',
            name: 'Phòng khám Nhi khoa',
            address: '101 Main St.',
            description:
                'Chăm sóc sức khỏe cho trẻ sơ sinh và trẻ nhỏ (Pediatrics - Healthcare for children)',
            phone: '02811223344',
            email: 'support@healthplusclinic.com',
            status: 'DELETING',
        },
    ]);

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
                        <span className="text-gray-700 font-medium">Phòng khám</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý phòng khám</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <input
                            type="text"
                            className="flex-1 border px-3 py-2 rounded-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Tìm kiếm
                            </button>
                            <button
                                onClick={() => navigate('/clinic/create')}
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
                                    <th className="p-3 w-24">Mã</th>
                                    <th className="p-3">Tên phòng khám</th>
                                    <th className="p-3">Địa chỉ</th>
                                    <th className="p-3">Mô tả</th>
                                    <th className="p-3">SĐT</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3 w-28">Trạng thái</th>
                                    <th className="p-3 w-32 text-center">Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clinics.map((cl) => (
                                    <tr key={cl.id} className="border-t hover:bg-gray-50">
                                        <td className="p-3">{cl.id}</td>
                                        <td className="p-3">{cl.name}</td>
                                        <td className="p-3">{cl.address}</td>
                                        <td className="p-3">{cl.description}</td>
                                        <td className="p-3">{cl.phone}</td>
                                        <td className="p-3">{cl.email}</td>
                                        <td
                                            className={`p-3 font-medium ${cl.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
                                                }`}
                                        >
                                            {cl.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm dừng'}
                                        </td>
                                        <td className="p-3 space-x-2 text-center">
                                            <button
                                                onClick={() => navigate('/clinic/edit')}
                                                className="p-1 border rounded hover:bg-gray-100"
                                                title="Chỉnh sửa"
                                            >
                                                <Pencil className="w-4 h-4 text-gray-700" />
                                            </button>
                                            <button
                                                onClick={() => navigate('/clinic/detail')}
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

export default ClinicManagement;
