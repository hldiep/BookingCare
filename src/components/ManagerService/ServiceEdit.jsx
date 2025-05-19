import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const ServiceEdit = () => {
    const navigate = useNavigate();

    const [service, setService] = useState({
        name: 'Khám nội tổng quát',
        description: 'Dịch vụ khám toàn diện cơ thể, giúp phát hiện sớm các bệnh lý thường gặp.',
        specialty: 'Nội tổng quát',
        status: 'active',
        images: [
            'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/kham_noi_tong_quat_la_gi_kham_noi_tong_quat_gom_nhung_gi_2_3d3c79fa26.jpg',
            'https://cdn.benhvienthucuc.vn/wp-content/uploads/2017/11/IMG_9381-Edit.jpg',
            'https://phongkhamdinhcu.vn/wp-content/uploads/kham-2.jpg',
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...service.images];
        updatedImages[index] = value;
        setService(prev => ({
            ...prev,
            images: updatedImages,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dịch vụ cập nhật:', service);
        alert('Đã lưu thay đổi!');
        navigate("/service");
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

                <form onSubmit={handleSubmit} className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                    <div className="flex flex-col md:flex-row gap-6">

                        <div className="md:w-1/3 space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Tên dịch vụ</label>
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
                                <label className="block font-medium mb-1">Chuyên khoa</label>
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
                                <label className="block font-medium mb-1">Trạng thái</label>
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
                                <label className="block font-medium mb-1">Mô tả</label>
                                <textarea
                                    name="description"
                                    value={service.description}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded h-32 outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                Lưu thay đổi
                            </button>
                        </div>

                        <div className="md:w-2/3">
                            <p className="font-semibold text-lg mb-2">Hình ảnh</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.images.map((img, index) => (
                                    <div key={index}>
                                        <img
                                            src={img}
                                            alt={`Hình ${index + 1}`}
                                            className="w-full h-40 object-cover rounded shadow mb-2"
                                        />
                                        <input
                                            type="text"
                                            value={img}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                            className="w-full border px-3 py-2 rounded outline-none"
                                            placeholder="Dán link ảnh mới..."
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </ClippedDrawer>
    );
};

export default ServiceEdit;
