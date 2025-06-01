import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchAllServicesManager, updateService } from '../util/serviceApi';
import { fetchAllSpecialtyManager } from '../util/specialtyApi';

const ServiceEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [specialties, setSpecialties] = useState([]);
    const [service, setService] = useState({
        id: '',
        name: '',
        description: '',
        medicalSpecialtyId: '',
        status: 'active',
        images: [],
    });
    useEffect(() => {
        const fetchService = async () => {
            try {
                const [services, specialtiesData] = await Promise.all([
                    fetchAllServicesManager(),
                    fetchAllSpecialtyManager()
                ]);
                const target = services.find(s => s.id === id);
                if (target) setService(target);
                setSpecialties(specialtiesData);
            } catch (error) {
                console.log('Lỗi', error);
            }
        }
        fetchService();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateService(service);
            alert('Đã lưu thay đổi!');
            navigate('/service');
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
                        <button onClick={() => navigate("/service")} className="hover:underline text-blue-600">
                            Dịch vụ
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chỉnh sửa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chỉnh sửa dịch vụ</h2>
                </div>
                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">
                    <div className="w-full md:w-1/3 bg-white p-4 rounded shadow space-y-4">
                        <p className="font-semibold text-center">Ảnh dịch vụ</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full md:w-2/3 bg-white rounded shadow p-6 gap-6">
                        <p className="font-semibold text-center">Thông tin dịch vụ</p>
                        <div className="space-y-4 col-span-1">

                            <div>
                                <label className="block text-sm font-medium">Tên dịch vụ</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={service.name}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm outline-none mt-1 block rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className='flex space-x-4 items-center text-center'>
                                <label className="block text-sm font-medium">Chuyên khoa</label>
                                <select
                                    name="medicalSpecialtyId"
                                    value={service.medicalSpecialtyId}
                                    onChange={handleChange}
                                    className="p-1 text-sm outline-none block rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Chọn chuyên khoa</option>
                                    {specialties.map((spec) => (
                                        <option key={spec.id} value={spec.id}>
                                            {spec.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex space-x-4 items-center text-center'>
                                <label className="block text-sm font-medium">Trạng thái</label>
                                <select
                                    name="status"
                                    value={service.status}
                                    onChange={handleChange}
                                    className="p-1 text-sm outline-none block rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="ACTIVE">Đang hoạt động</option>
                                    <option value="DELETED">Bị xóa</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium ">Mô tả</label>
                                <textarea
                                    name="description"
                                    value={service.description}
                                    onChange={handleChange}
                                    className="p-2 text-sm outline-none mt-1 block w-full rounded border-gray-300 shadow-sm h-32 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </ClippedDrawer>
    );
};

export default ServiceEdit;
