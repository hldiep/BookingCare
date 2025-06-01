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

                    <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg shadow p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-center text-gray-700">Thông tin dịch vụ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên dịch vụ</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={service.name}
                                    onChange={handleChange}
                                    className="text-sm outline-none w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa</label>
                                <select
                                    name="medicalSpecialtyId"
                                    value={service.medicalSpecialtyId}
                                    onChange={handleChange}
                                    className="text-sm outline-none w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                                <select
                                    name="status"
                                    value={service.status}
                                    onChange={handleChange}
                                    className="text-sm outline-none w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="ACTIVE">Đang hoạt động</option>
                                    <option value="DELETED">Bị xóa</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                            <textarea
                                name="description"
                                value={service.description}
                                onChange={handleChange}
                                className="outline-none text-sm w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>

                </div>

            </div>
        </ClippedDrawer>
    );
};

export default ServiceEdit;
