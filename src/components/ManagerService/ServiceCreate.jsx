import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const ServiceCreate = () => {
    const navigate = useNavigate();

    const [service, setService] = useState({
        name: '',
        description: '',
        specialty: '',
        status: 'active',
        images: [''],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...service.images];
        updatedImages[index] = value;
        setService(prev => ({ ...prev, images: updatedImages }));
    };

    const handleAddImage = () => {
        setService(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...service.images];
        updatedImages.splice(index, 1);
        setService(prev => ({ ...prev, images: updatedImages }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dịch vụ mới:", service);
        alert("Đã thêm dịch vụ thành công!");
        navigate("/service");
    };

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

                <form onSubmit={handleSubmit} className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4 col-span-1">
                            <div>
                                <label className="block font-semibold mb-1">Tên dịch vụ</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={service.name}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Chuyên khoa</label>
                                <input
                                    type="text"
                                    name="specialty"
                                    value={service.specialty}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Trạng thái</label>
                                <select
                                    name="status"
                                    value={service.status}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded outline-none"
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="pause">Tạm ngừng</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Mô tả</label>
                                <textarea
                                    name="description"
                                    value={service.description}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded h-32 outline-none"
                                />
                            </div>

                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Thêm dịch vụ
                            </button>
                        </div>

                        <div className="col-span-2">
                            <p className="font-semibold text-lg mb-2">Hình ảnh</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.images.map((img, index) => (
                                    <div key={index}>
                                        {img && (
                                            <img
                                                src={img}
                                                alt={`Hình ${index + 1}`}
                                                className="w-full h-40 object-cover rounded shadow mb-2"
                                            />
                                        )}
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={img}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                                className="w-full border px-3 py-2 rounded outline-none"
                                                placeholder="Dán link ảnh..."
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                                            >
                                                Xoá
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={handleAddImage}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                + Thêm ảnh
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </ClippedDrawer>
    );
};

export default ServiceCreate;
