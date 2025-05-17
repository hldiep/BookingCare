import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceDetail = () => {
    const navigate = useNavigate();

    const service = {
        name: 'Khám nội tổng quát',
        description: 'Dịch vụ khám toàn diện cơ thể, giúp phát hiện sớm các bệnh lý thường gặp.',
        specialty: 'Nội tổng quát',
        status: 'active',
        images: [
            'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/kham_noi_tong_quat_la_gi_kham_noi_tong_quat_gom_nhung_gi_2_3d3c79fa26.jpg',
            'https://cdn.benhvienthucuc.vn/wp-content/uploads/2017/11/IMG_9381-Edit.jpg',
            'https://phongkhamdinhcu.vn/wp-content/uploads/kham-2.jpg',
        ],
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/service")}>Dịch vụ</button>
                    <span>{'>'}</span>
                    <button>Chi tiết</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Chi tiết dịch vụ</h2>

                <div className='p-6 flex space-x-6 justify-around'>
                    <div className="w-1/4">
                        <div className="font-semibold text-xl">{service.name}</div>
                        <div className="mt-4">
                            <p><strong>Chuyên khoa:</strong> {service.specialty}</p>
                            <p className="mt-2"><strong>Trạng thái:</strong>
                                <span className={`ml-2 px-2 py-1 rounded text-white ${service.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}>
                                    {service.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                </span>
                            </p>
                            <p className="mt-4"><strong>Mô tả:</strong></p>
                            <p className="mt-2 text-justify">{service.description}</p>
                        </div>
                    </div>

                    <div className="w-3/5">
                        <p className="font-semibold text-lg mb-2">Hình ảnh</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {service.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Hình ${index + 1}`}
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

export default ServiceDetail;
