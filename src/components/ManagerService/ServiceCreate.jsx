import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { addService } from '../util/serviceApi';
import { fetchAllSpecialtyManager } from '../util/specialtyApi';

const ServiceCreate = () => {
    const navigate = useNavigate();
    const [specialties, setSpecialties] = useState([]);
    const [service, setService] = useState({
        name: '',
        description: '',
        medicalSpecialtyId: '',
        status: 'ACTIVE',
        images: [''],
        creatorId: '',
    });

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
            const { images, ...cleanService } = service;
            const result = await addService({
                ...cleanService,
                createdAt: new Date().toISOString(),
            });
            alert(result.message || 'Tạo dịch vụ thành công!');
            navigate('/service');
        } catch (error) {
            alert(`Lỗi thêm dịch vụ: ${error.message}`);
        }
    };
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setService(prev => ({
                ...prev,
                creatorId: user.id,
            }));
            console.log(user.id);
        }

        const fetchData = async () => {
            try {
                const data = await fetchAllSpecialtyManager();
                setSpecialties(data);
            } catch (error) {
                console.error("Không thể tải chuyên khoa.");
            }
        };
        fetchData();
    }, []);

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">Dashboard</button>
                        <span>/</span>
                        <button onClick={() => navigate('/service')} className="hover:underline text-blue-600">Dịch vụ</button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thêm</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Thêm dịch vụ</h2>
                </div>
                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">
                    {/* <div className="w-full md:w-1/3 bg-white p-4 rounded shadow space-y-4">
                        <p className="font-semibold text-center">Ảnh dịch vụ</p>
                    </div> */}
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
                                    placeholder="Nhập tên dịch vụ"
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
                                    disabled
                                    className="text-sm outline-none w-full p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="ACTIVE">Hoạt động</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                            <textarea
                                name="description"
                                value={service.description}
                                onChange={handleChange}
                                placeholder="Nhập mô tả về dịch vụ"
                                className="outline-none text-sm w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                rows="4"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-all duration-200"
                            >
                                Thêm dịch vụ
                            </button>
                        </div>
                    </form>

                </div>

            </div>
        </ClippedDrawer>
    );
};

export default ServiceCreate;
