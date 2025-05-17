import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClinicDetail = () => {
    const navigate = useNavigate();

    // Dữ liệu mẫu
    const clinic = {
        id: 1,
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
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'active': return 'Hoạt động';
            case 'pause': return 'Tạm ngừng';
            case 'inactive': return 'Không hoạt động';
            default: return 'Không xác định';
        }
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/clinic")}>Phòng khám</button>
                    <span>{'>'}</span>
                    <button>Chi tiết</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Chi tiết phòng khám</h2>

                <div className="p-6 flex space-x-6 justify-around">
                    <div className="w-1/4 space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Tên phòng khám</p>
                            <p className="font-semibold">{clinic.name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Địa chỉ</p>
                            <p>{clinic.address}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Số điện thoại</p>
                            <p>{clinic.phone}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p>{clinic.email}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Trạng thái</p>
                            <p className="text-green-600 font-medium">{getStatusLabel(clinic.status)}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Mô tả</p>
                            <p>{clinic.description}</p>
                        </div>

                        <button
                            onClick={() => navigate(`/clinic/edit`)}
                            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Chỉnh sửa
                        </button>
                    </div>

                    <div className="w-3/5">
                        <p className="font-semibold text-lg mb-2">Hình ảnh phòng khám</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {clinic.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Phòng khám ${index + 1}`}
                                    className="w-full h-40 object-cover rounded shadow"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicDetail;
