import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        setService(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...service.images];
        updatedImages[index] = value;
        setService(prev => ({
            ...prev,
            images: updatedImages
        }));
    };

    const handleAddImage = () => {
        setService(prev => ({
            ...prev,
            images: [...prev.images, '']
        }));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...service.images];
        updatedImages.splice(index, 1);
        setService(prev => ({
            ...prev,
            images: updatedImages
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dịch vụ mới:", service);
        alert("Đã thêm dịch vụ thành công!");
        navigate("/service");
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/service")}>Dịch vụ</button>
                    <span>{'>'}</span>
                    <button>Thêm</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Thêm dịch vụ</h2>

                <form onSubmit={handleSubmit} className='p-6 flex space-x-6 justify-around'>
                    <div className="w-1/4 space-y-4">
                        <div>
                            <label className="font-semibold block mb-1">Tên dịch vụ</label>
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
                            <label className="font-semibold block mb-1">Chuyên khoa</label>
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
                            <label className="font-semibold block mb-1">Trạng thái</label>
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
                            <label className="font-semibold block mb-1">Mô tả</label>
                            <textarea
                                name="description"
                                value={service.description}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded h-32 outline-none"
                            />
                        </div>

                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            Thêm
                        </button>
                    </div>

                    <div className="w-3/5">
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
                                            className="bg-red-500 text-white px-2 rounded"
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
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            + Thêm ảnh
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceCreate;
