import React, { useState } from 'react';
import { Pencil, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SpecialtyManagement = () => {
    const navigate = useNavigate();
    const [specialties, setSpecialties] = useState([
        {
            id: 'MS01',
            name: 'Tim mạch',
            description: 'Khám và điều trị các bệnh lý liên quan đến tim (Cardiology - Heart-related diseases)',
            status: 'ACTIVE',
            doctors: ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B'],
        },
        {
            id: 'MS02',
            name: 'Da liễu',
            description: 'Chẩn đoán và điều trị các bệnh về da, tóc và móng (Dermatology - Skin, hair, and nail diseases)',
            status: 'ACTIVE',
            doctors: ['Dr. Lê Văn C'],
        },
        {
            id: 'MS03',
            name: 'Nhi khoa',
            description: 'Chăm sóc sức khỏe cho trẻ sơ sinh và trẻ nhỏ (Pediatrics - Healthcare for children)',
            status: 'DELETING',
            doctors: [],
        },
    ]);

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/specialty")}>Chuyên khoa</button>
                </div>
                <h2 className="text-2xl p-2 font-semibold border-b">Quản lý chuyên khoa</h2>

                <div className="p-6 space-y-4">
                    <div className='p-4 flex'>
                        <input
                            type="text"
                            className="col-span-2 border px-3 py-2 rounded-tl-md rounded-bl-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex">
                            <button className="px-4 py-2 bg-blue-600 text-white">Tìm kiếm</button>
                            <button
                                onClick={() => navigate("/specialty/create")}
                                className="px-4 py-2 bg-green-500 text-white rounded-tr-md rounded-br-md"
                            >
                                Tạo mới
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <table className="w-full text-sm text-left border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Mã</th>
                                    <th className="p-2">Tên chuyên khoa</th>
                                    <th className="p-2">Mô tả</th>
                                    <th className="p-2">Bác sĩ</th>
                                    <th className="p-2">Trạng thái</th>
                                    <th className="p-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {specialties.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="p-2">{item.id}</td>
                                        <td className="p-2">{item.name}</td>
                                        <td className="p-2">{item.description}</td>
                                        <td className="p-2">
                                            {item.doctors.length > 0 ? (
                                                <ul className="list-disc list-inside space-y-1">
                                                    {item.doctors.map((doc, idx) => (
                                                        <li key={idx}>{doc}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="text-gray-500 italic">Chưa có</span>
                                            )}
                                        </td>
                                        <td className={`p-2 ${item.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm dừng'}
                                        </td>
                                        <td className="p-2 space-x-1 flex">
                                            <button
                                                onClick={() => navigate('/specialty/edit')}
                                                className="px-2 py-1 border rounded text-sm"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => navigate('/specialty/detail')}
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
    );
};

export default SpecialtyManagement;
