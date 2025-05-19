import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const ClinicEdit = () => {
    const navigate = useNavigate();

    const [clinic, setClinic] = useState({
        name: 'Phòng khám Nội tổng hợp',
        address: '123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM',
        description: 'Phòng khám cung cấp dịch vụ khám chữa bệnh nội khoa chất lượng cao.',
        phone: '02812345678',
        email: 'phongkhamnoitonghop@gmail.com',
        status: 'active',
        images: [
            'https://phongkham5sao.vn/wp-content/uploads/2023/05/noi-tong-hop-1-min.png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnl06SsxvyKFuIJpfi_N9OdPVdDxp32wnd3w&s',
            'https://diadiemvietnam.vn/wp-content/uploads/2022/10/phong-khma-khoa-noi-tong-hop-taih-dong-thap-uy-tin-chat-luong.jpg',
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClinic(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...clinic.images];
        updatedImages[index] = value;
        setClinic(prev => ({
            ...prev,
            images: updatedImages
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Phòng khám cập nhật:', clinic);
        alert('Đã lưu thay đổi!');
        navigate("/clinic");
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

                <form onSubmit={handleSubmit} className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3 space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Tên phòng khám</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={clinic.name}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={clinic.address}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={clinic.phone}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={clinic.email}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Trạng thái</label>
                                <select
                                    name="status"
                                    value={clinic.status}
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
                                    value={clinic.description}
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
                                {clinic.images.map((img, index) => (
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

export default ClinicEdit;
