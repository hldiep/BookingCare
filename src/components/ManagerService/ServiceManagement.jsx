import React, { useState } from 'react';
import { BadgeCheck, Pencil, Trash2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceManagement = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([
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
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button
                        onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button
                        onClick={() => navigate("/service")}>Dịch vụ</button>
                </div>
                <h2 className="text-2xl p-2 font-semibold border-b">Quản lý dịch vụ</h2>
                <div className=" p-6 space-y-4 ">


                    <div className='p-4 flex'>
                        <input
                            type="text"
                            className="col-span-2 border px-3 py-2 rounded-tl-md rounded-bl-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex">
                            <button className="px-4 py-2 bg-blue-600 text-white ">Tìm kiếm</button>
                            {/* <button className="px-4 py-2 bg-red-500 text-white ">Làm mới</button> */}
                            <button onClick={() => navigate("/service/create")}
                                className="px-4 py-2 bg-green-500 text-white rounded-tr-md rounded-br-md">Tạo mới</button>
                        </div>
                    </div>

                    <div className="p-4 ">
                        <table className="w-full text-sm text-left border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Mã</th>
                                    <th className="p-2">Tên dịch vụ</th>
                                    <th className="p-2">Mô tả</th>
                                    <th className="p-2">Chuyên khoa</th>
                                    <th className="p-2">Trạng thái</th>
                                    <th className="p-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((sv) => (
                                    <tr key={sv.id} className="border-t">
                                        <td className="p-2">{sv.id}</td>
                                        <td className="p-2">{sv.name}</td>
                                        <td className="p-2">{sv.description}</td>
                                        <td className="p-2">{sv.department}</td>
                                        <td className={`p-2 ${sv.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                                            {sv.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm dừng'}
                                        </td>
                                        <td className="p-2 space-x-2">
                                            <button
                                                onClick={() => navigate('/service/edit')}
                                                className="px-2 py-1 border rounded text-sm">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => navigate('/service/detail')}
                                                className="px-2 py-1 border rounded text-sm">
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
        </div >

    );
};

export default ServiceManagement;
