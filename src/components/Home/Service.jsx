import React from 'react'
const services = [
    {
        title: "Khám sức khỏe tổng quát định kỳ",
        desc: "Tầm soát bệnh lý sớm, chăm sóc sức khỏe toàn diện.",
        image: "https://benhvienbacha.vn/wp-content/uploads/2023/01/chuyen-gia-giai-dap-kham-suc-khoe-tong-quat-gom-nhung-gi.jpg",
    },
    {
        title: "Xét nghiệm",
        desc: "Thực hiện các xét nghiệm máu, nước tiểu, sinh hóa,... nhanh chóng và chính xác.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-LDOStFT_yHJ5F7o0kpBvQKuZCmX-zNEJvA&s",
    },
    {
        title: "Chụp X-quang",
        desc: "Chẩn đoán hình ảnh hiệu quả cho các bệnh lý về xương, phổi,...",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySauDRoE9HoDfLfmtv9ca-2g-XpsMKNHA0Q&s",
    },
    {
        title: "Siêu âm",
        desc: "Siêu âm tổng quát, ổ bụng, tuyến giáp, sản phụ khoa,...",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNpC8lpuYN-16Ywd8Vbze-BFtAzlPbbmUgQ&s",
    },
    {
        title: "Nội soi tiêu hóa",
        desc: "Phát hiện sớm các bệnh lý về dạ dày, đại tràng,... với thiết bị hiện đại.",
        image: "https://sadec.phuongchau.com/wp-content/uploads/2022/11/noi-soi-tieu-hoa-khong-dau.jpg",
    },
    {
        title: "Điện tim (ECG), điện não (EEG)",
        desc: "Theo dõi chức năng tim và não, hỗ trợ chẩn đoán bệnh lý thần kinh.",
        image: "https://www.vinmec.com/static/uploads/medium_20200319_101940_676410_dien_nao_do_EEG_max_1800x1800_jpg_454d6a7de8.jpg",
    },
];
const Service = () => {
    return (
        <section className="py-12 px-4 bg-white">
            <h2 className="text-3xl font-bold mb-8 text-highlight text-center">Dịch vụ khám nổi bật</h2>
            <div className="px-32 max-w-6xl mx-auto space-y-16">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                            } items-center gap-6`}
                    >
                        <div className="md:w-1/2">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="h-64 rounded-xl shadow-lg w-full object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h3 className="text-2xl font-semibold text-highlight mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-700 text-base">{service.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='text-center mt-10'>
                <button className='px-3 py-2 border border-nav rounded-full hover:bg-nav hover:text-white transition-all duration-500 hover:animate-button-hover'>Xem thêm</button>
            </div>

        </section>
    )
}

export default Service