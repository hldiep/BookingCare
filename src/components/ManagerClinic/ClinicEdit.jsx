import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClinicEdit = () => {
    const navigate = useNavigate();

    // Dữ liệu mẫu ban đầu
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Phòng khám cập nhật:', clinic);
        alert('Đã lưu thay đổi!');
        navigate("/clinic");
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/clinic")}>Phòng khám</button>
                    <span>{'>'}</span>
                    <button>Chỉnh sửa</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Chỉnh sửa phòng khám</h2>

                <form onSubmit={handleSubmit} className='p-6 flex space-x-6 justify-around'>
                    <div className="w-1/4 space-y-4">
                        <div>
                            <label className="font-semibold block mb-1">Tên phòng khám</label>
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
                            <label className="font-semibold block mb-1">Địa chỉ</label>
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
                            <label className="font-semibold block mb-1">Số điện thoại</label>
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
                            <label className="font-semibold block mb-1">Email</label>
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
                            <label className="font-semibold block mb-1">Trạng thái</label>
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
                            <label className="font-semibold block mb-1">Mô tả</label>
                            <textarea
                                name="description"
                                value={clinic.description}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded h-32 outline-none"
                            />
                        </div>

                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Lưu thay đổi
                        </button>
                    </div>

                    <div className="w-3/5">
                        <p className="font-semibold text-lg mb-2">Hình ảnh phòng khám</p>
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
                                        className="w-full border px-3 py-2 rounded outline-none"
                                        placeholder="Dán link ảnh mới..."
                                        onChange={(e) => {
                                            const updatedImages = [...clinic.images];
                                            updatedImages[index] = e.target.value;
                                            setClinic(prev => ({ ...prev, images: updatedImages }));
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClinicEdit;
