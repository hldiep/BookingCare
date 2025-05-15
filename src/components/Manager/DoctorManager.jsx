import React, { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import DoctorAddForm from './DoctorAddPage';
import { useNavigate } from 'react-router-dom';

const mockDoctors = [
    {
        id: 'D001',
        name: 'Nguyễn Văn A',
        specialty: 'Tim mạch',
        phone: '0901234567',
        email: 'nguyenvana@example.com',
        gender: true,
        birthday: '1985-04-10',
        address: 'Hà Nội',
        status: 'ACTIVE'
    },
    {
        id: 'D002',
        name: 'Trần Thị B',
        specialty: 'Da liễu',
        phone: '0907654321',
        email: 'tranthib@example.com',
        gender: false,
        birthday: '1990-08-20',
        address: 'Hồ Chí Minh',
        status: 'ACTIVE'
    }
];

const DoctorManager = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        setDoctors(mockDoctors);
    }, []);

    const handleAddClick = () => {
        // Chuyển sang trang thêm bác sĩ
        navigate('/doctor/add');
    };

    const handleEdit = (id) => {
        alert(`Sửa bác sĩ ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xoá?")) {
            setDoctors(doctors.filter(doc => doc.id !== id));
        }
    };

    return (
        <div className="p-6 mt-20 ml-56">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 font-georgia">DANH SÁCH BÁC SĨ</h2>
                    <button
                        onClick={handleAddClick}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        <Plus size={18} /> Thêm bác sĩ
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="p-3 border">#</th>
                            <th className="p-3 border">Họ tên</th>
                            <th className="p-3 border">Chuyên khoa</th>
                            <th className="p-3 border">SĐT</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Giới tính</th>
                            <th className="p-3 border">Ngày sinh</th>
                            <th className="p-3 border">Địa chỉ</th>
                            <th className="p-3 border">Trạng thái</th>
                            <th className="p-3 border text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc, idx) => (
                            <tr key={doc.id} className="border-t hover:bg-gray-50">
                                <td className="p-3 border">{idx + 1}</td>
                                <td className="p-3 border">{doc.name}</td>
                                <td className="p-3 border">{doc.specialty}</td>
                                <td className="p-3 border">{doc.phone}</td>
                                <td className="p-3 border">{doc.email}</td>
                                <td className="p-3 border">{doc.gender ? 'Nam' : 'Nữ'}</td>
                                <td className="p-3 border">{doc.birthday}</td>
                                <td className="p-3 border">{doc.address}</td>
                                <td className="p-3 border">
                                    <span className={`px-2 py-1 text-sm rounded-full ${doc.status === 'ACTIVE'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="p-3 text-center flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(doc.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {doctors.length === 0 && (
                            <tr>
                                <td colSpan="10" className="text-center p-6 text-gray-500">Không có dữ liệu bác sĩ.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorManager;
