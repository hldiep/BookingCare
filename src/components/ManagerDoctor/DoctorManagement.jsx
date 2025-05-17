import React, { useState } from 'react';
import { BadgeCheck, Pencil, Trash2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorManagement = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            avatar: 'https://anhcute.net/wp-content/uploads/2024/10/Hinh-chibi-bac-si-nhan-vat-hoat-hinh-cute.jpg',
            department: 'Nội tổng hợp',
            name: 'Nguyễn Văn A',
            phone: '0123456789',
            role: 'Bác sĩ',
            status: true,
        },
        {
            id: 2,
            avatar: 'https://i.pinimg.com/originals/24/bd/d9/24bdd9ec59a9f8966722063fe7791183.jpg',
            department: 'Ngoại khoa',
            name: 'Trần Thị B',
            phone: '0978246246',
            role: 'Bác sĩ',
            status: true,
        },
        {
            id: 3,
            avatar: 'https://i.pinimg.com/736x/d1/c3/b3/d1c3b347f875398728a1734d4a1b1708.jpg',
            department: 'Nội tổng hợp',
            name: 'Phạm Văn C',
            phone: '0766335563',
            role: 'Bác sĩ',
            status: true,
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
                        onClick={() => navigate("/doctor")}>Bác sĩ</button>
                </div>
                <h2 className="text-2xl p-2 font-semibold border-b">Quản lý bác sĩ</h2>
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
                            <button onClick={() => navigate("/doctor/create")}
                                className="px-4 py-2 bg-green-500 text-white rounded-tr-md rounded-br-md">Tạo mới</button>
                        </div>
                    </div>

                    <div className="p-4 ">
                        <table className="w-full text-sm text-left border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2"></th>
                                    <th className="p-2">Chuyên khoa</th>
                                    <th className="p-2">Họ tên</th>
                                    <th className="p-2">Số điện thoại</th>
                                    <th className="p-2">Vai trò</th>
                                    <th className="p-2">Trạng thái</th>
                                    <th className="p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doc) => (
                                    <tr key={doc.id} className="border-t">
                                        <td className="p-2 flex items-center gap-2">
                                            <img src={doc.avatar} className="w-8 h-8 rounded-full" alt="avatar" />

                                        </td>
                                        <td className="p-2">{doc.department}</td>
                                        <td className="p-2">{doc.name}</td>
                                        <td className="p-2">{doc.phone}</td>
                                        <td className="p-2">{doc.role}</td>
                                        <td className="p-2 text-green-600">
                                            <BadgeCheck className="inline-block w-4 h-4 mr-1" /> Hoạt động
                                        </td>
                                        <td className="p-2 space-x-2">
                                            <button onClick={() => navigate("/doctor/edit")}
                                                className="px-2 py-1 border rounded text-sm">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            {/* <button className="px-2 py-1 border border-red-500 text-red-500 rounded text-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button> */}
                                            <button onClick={() => navigate("/doctor/detail-manage")}
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

export default DoctorManagement;
