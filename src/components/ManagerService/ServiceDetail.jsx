import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';

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
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <button onClick={() => navigate('/service')} className="hover:underline text-blue-600">
                            Dịch vụ
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chi tiết</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chi tiết dịch vụ</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                    <div className="flex flex-col md:flex-row gap-6">

                        <div className="md:w-1/3 space-y-4">
                            <div>
                                <p className="text-gray-500 text-sm">Tên dịch vụ</p>
                                <h3 className="text-lg font-semibold">{service.name}</h3>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Chuyên khoa</p>
                                <p className="font-medium">{service.specialty}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Trạng thái</p>
                                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full text-white ${service.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}>
                                    {service.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                </span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Mô tả</p>
                                <p className="text-justify">{service.description}</p>
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <p className="font-semibold text-lg mb-2">Hình ảnh</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </ClippedDrawer>
    );
};

export default ServiceDetail;
