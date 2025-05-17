import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceEdit = () => {
    const navigate = useNavigate();

    // Dữ liệu mẫu ban đầu
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
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Gửi dữ liệu cập nhật đến server
        console.log('Dịch vụ cập nhật:', service);
        alert('Đã lưu thay đổi!');
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
                    <button>Chỉnh sửa</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Chỉnh sửa dịch vụ</h2>

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
                            Lưu thay đổi
                        </button>
                    </div>

                    <div className="w-3/5">
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
                                        className="w-full border px-3 py-2 rounded outline-none"
                                        placeholder="Dán link ảnh mới..."
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

export default ServiceEdit;
