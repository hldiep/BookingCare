import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

const ClinicDetail = () => {
    const navigate = useNavigate();

    const [clinic] = useState({
        name: 'Phòng khám Nội tổng hợp',
        address: '123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM',
        phone: '02812345678',
        email: 'phongkhamnoitonghop@gmail.com',
        description: 'Phòng khám cung cấp dịch vụ khám chữa bệnh nội khoa chất lượng cao với đội ngũ bác sĩ chuyên môn giỏi.',
        status: 'active',
        images: [
            'https://phongkham5sao.vn/wp-content/uploads/2023/05/noi-tong-hop-1-min.png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnl06SsxvyKFuIJpfi_N9OdPVdDxp32wnd3w&s',
            'https://diadiemvietnam.vn/wp-content/uploads/2022/10/phong-khma-khoa-noi-tong-hop-taih-dong-thap-uy-tin-chat-luong.jpg',
        ],
    });

    const getStatusLabel = (status) => {
        switch (status) {
            case 'active': return 'Hoạt động';
            case 'pause': return 'Tạm ngừng';
            case 'inactive': return 'Không hoạt động';
            default: return 'Không xác định';
        }
    };

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <button onClick={() => navigate('/clinic')} className="hover:underline text-blue-600">
                            Phòng khám
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thông tin</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Thông tin phòng khám</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">

                    <div className="w-full  bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên phòng khám</label>
                            <input
                                type="text"
                                value={clinic.name}
                                readOnly
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                            <input
                                type="text"
                                value={getStatusLabel(clinic.status)}
                                readOnly
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="text"
                                value={clinic.phone}
                                readOnly
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={clinic.email}
                                readOnly
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm bg-gray-100"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                type="text"
                                value={clinic.address}
                                readOnly
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm bg-gray-100"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                            <textarea
                                value={clinic.description}
                                readOnly
                                rows={4}
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm bg-gray-100 resize-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Hình ảnh khác</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                {clinic.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Phòng khám ${index + 1}`}
                                        className="w-full h-32 object-cover rounded shadow"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default ClinicDetail;
