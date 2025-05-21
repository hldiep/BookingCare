import React, { useEffect, useState } from 'react'
import { fetchAllServices } from '../util/serviceApi';
// const services = [
//     {
//         title: "Khám lâm sàng",
//         desc: "Bác sĩ thực hiện Khám lâm sàng đánh giá sức khỏe tổng quan. Các hạng mục như: Nội tổng quát, Răng hàm mặt, Mắt, Tai-mũi-họng, Phụ khoa - tuyến vú (với nữ), Tim mạch...",
//         image: "https://benhvienbacha.vn/wp-content/uploads/2023/01/chuyen-gia-giai-dap-kham-suc-khoe-tong-quat-gom-nhung-gi.jpg",
//     },
//     {
//         title: "Xét nghiệm",
//         desc: "Thực hiện các xét nghiệm máu, nước tiểu, sinh hóa,... nhanh chóng và chính xác.",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-LDOStFT_yHJ5F7o0kpBvQKuZCmX-zNEJvA&s",
//     },
//     {
//         title: "Chụp X-quang",
//         desc: "Chẩn đoán hình ảnh hiệu quả cho các bệnh lý về xương, phổi,...",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySauDRoE9HoDfLfmtv9ca-2g-XpsMKNHA0Q&s",
//     },
//     {
//         title: "Siêu âm",
//         desc: "Siêu âm tổng quát, ổ bụng, tuyến giáp, sản phụ khoa,...",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNpC8lpuYN-16Ywd8Vbze-BFtAzlPbbmUgQ&s",
//     },
//     {
//         title: "Nội soi tiêu hóa",
//         desc: "Phát hiện sớm các bệnh lý về dạ dày, đại tràng,... với thiết bị hiện đại.",
//         image: "https://sadec.phuongchau.com/wp-content/uploads/2022/11/noi-soi-tieu-hoa-khong-dau.jpg",
//     },
//     {
//         title: "Điện tim (ECG), điện não (EEG)",
//         desc: "Theo dõi chức năng tim và não, hỗ trợ chẩn đoán bệnh lý thần kinh.",
//         image: "https://www.vinmec.com/static/uploads/medium_20200319_101940_676410_dien_nao_do_EEG_max_1800x1800_jpg_454d6a7de8.jpg",
//     },
// ];
const Service = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllServices();
                setServices(data.slice(0, 6));
            } catch (err) {
                console.log("Lỗi tải dịch vụ", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <section className="py-12 px-4 bg-main">
            <h2 className="text-3xl font-bold mb-8 text-highlight text-center">Dịch vụ khám nổi bật</h2>
            {loading ? (
                <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
            ) : (
                <div>
                    {services.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">Không có dịch vụ nào.</div>
                    ) : (
                        <div className=" max-w-6xl mx-auto space-y-16">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className={`flex rounded-xl shadow-lg bg-gray-100 flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                        } items-stretch gap-6 h-[320px]`}
                                >
                                    <div className="md:w-1/2 h-full">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="h-full w-full object-cover rounded-xl shadow-lg"
                                        />
                                    </div>
                                    <div className="md:w-1/2 p-6 overflow-auto h-full flex flex-col justify-center text-justify">
                                        <h3 className="text-2xl font-semibold text-highlight mb-4">
                                            {service.name}
                                        </h3>
                                        <p className="text-gray-700 text-base">{service.description}</p>
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default Service