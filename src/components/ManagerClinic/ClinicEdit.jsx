import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchAllClinicsManager, updateCilinic } from '../util/clinicApi';

const ClinicEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [clinic, setClinic] = useState({
        id: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        status: 'active',
        createdAt: new Date().toISOString(),
    });

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                const clinics = await fetchAllClinicsManager();
                const target = clinics.find(c => c.id === id);
                if (target) setClinic(target);
            } catch (error) {
                console.log('Lỗi', error);
            }
        }
        fetchClinic();
    }, [id]);
    const handleChange = (e) => {
        setClinic({ ...clinic, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCilinic(clinic);
            alert('Đã lưu thay đổi!');
            navigate('/clinic');
        } catch (error) {
            alert("Cập nhật thất bại: " + error.message);
        }
    };

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate("/admin")} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <button onClick={() => navigate("/clinic")} className="hover:underline text-blue-600">
                            Phòng khám
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chỉnh sửa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chỉnh sửa phòng khám</h2>
                </div>
                <div className='p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6'>
                    <div className="w-full md:w-1/3 bg-white p-4 rounded shadow space-y-4">
                        <p className="font-semibold text-center text-lg">Ảnh phòng khám</p>

                        <button
                            type="button"
                            className="mt-2 w-full px-4 py-2 rounded border text-sm text-gray-700 hover:bg-gray-100"
                        >
                            + Thêm ảnh
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full md:w-2/3 bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='text-sm'>
                            <label className="block font-medium">Tên phòng khám</label>
                            <input
                                name="name"
                                value={clinic.name}
                                onChange={handleChange}
                                placeholder="Tên"
                                className="p-2 outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className='text-sm'>
                            <label className="block font-medium">Địa chỉ</label>
                            <input
                                name="address"
                                value={clinic.address}
                                onChange={handleChange}
                                placeholder="Địa chỉ"
                                className="p-2 outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className='text-sm'>
                            <label className="block font-medium">Số điện thoại</label>
                            <input
                                name="phone" value={clinic.phone} onChange={handleChange} placeholder="SĐT"
                                className="p-2 outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className='text-sm'>
                            <label className="block font-medium">Email</label>
                            <input
                                name="email" value={clinic.email} onChange={handleChange} placeholder="Email"
                                className="p-2 outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className='flex space-x-4 items-center text-center'>
                            <label className="block font-medium text-sm">Trạng thái</label>
                            <select
                                name="status"
                                value={clinic.status}
                                onChange={handleChange}
                                className="p-1 text-sm outline-none block rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="ACTIVE">Hoạt động</option>
                                <option value="DELETED">Đã xóa</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium">Mô tả</label>
                            <textarea
                                name="description" value={clinic.description} onChange={handleChange} placeholder="Mô tả"
                                className="text-sm p-2 outline-none mt-1 block w-full rounded border-gray-300 shadow-sm h-32 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className=" py-2 bg-blue-600 text-white px-4 rounded">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default ClinicEdit;
