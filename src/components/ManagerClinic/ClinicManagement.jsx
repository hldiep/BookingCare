import { Info, Pencil } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ClinicManagement = () => {
    const navigate = useNavigate();
    const [clinics, setClinics] = useState([
        {
            id: 'CL01',
            name: 'Phòng khám Tim mạch',
            address: '101 Main St.',
            description: 'Khám và điều trị các bệnh lý liên quan đến tim (Cardiology - Heart-related diseases)',
            phone: '02812345678',
            email: 'info@downtownclinic.com',
            status: 'ACTIVE',
        },
        {
            id: 'CL02',
            name: 'Phòng khám Da liễu',
            address: '101 Main St.',
            description: 'Chẩn đoán và điều trị các bệnh về da, tóc và móng (Dermatology - Skin, hair, and nail diseases)',
            phone: '02898765432',
            email: 'contact@cityhealthcenter.com',
            status: 'ACTIVE',
        },
        {
            id: 'CL03',
            name: 'Phòng khám Nhi khoa',
            address: '101 Main St.',
            description: 'Chăm sóc sức khỏe cho trẻ sơ sinh và trẻ nhỏ (Pediatrics - Healthcare for children)',
            phone: '02811223344',
            email: 'support@healthplusclinic.com',
            status: 'DELETING',
        },

    ]);
    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/clinic")}>Phòng khám</button>
                </div>
                <h2 className="text-2xl p-2 font-semibold border-b">Quản lý phòng khám</h2>

                <div className="p-6 space-y-4">
                    <div className='p-4 flex'>
                        <input
                            type="text"
                            className="col-span-2 border px-3 py-2 rounded-tl-md rounded-bl-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex">
                            <button className="px-4 py-2 bg-blue-600 text-white">Tìm kiếm</button>
                            <button onClick={() => navigate("/clinic/create")}
                                className="px-4 py-2 bg-green-500 text-white rounded-tr-md rounded-br-md">
                                Tạo mới
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <table className="w-full text-sm text-left border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Mã</th>
                                    <th className="p-2">Tên phòng khám</th>
                                    <th className="p-2">Địa chỉ</th>
                                    <th className="p-2">Mô tả</th>
                                    <th className="p-2">SĐT</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Trạng thái</th>
                                    <th className="p-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clinics.map((cl) => (
                                    <tr key={cl.id} className="border-t">
                                        <td className="p-2">{cl.id}</td>
                                        <td className="p-2">{cl.name}</td>
                                        <td className="p-2">{cl.address}</td>
                                        <td className="p-2">{cl.description}</td>
                                        <td className="p-2">{cl.phone}</td>
                                        <td className="p-2">{cl.email}</td>
                                        <td className={`p-2 ${cl.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                                            {cl.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm dừng'}
                                        </td>
                                        <td className="flex p-2 space-x-1">
                                            <button
                                                onClick={() => navigate(`/clinic/edit`)}
                                                className="px-2 py-1 border rounded text-sm"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/clinic/detail`)}
                                                className="px-2 py-1 border rounded text-sm"
                                            >
                                                <Info className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ClinicManagement