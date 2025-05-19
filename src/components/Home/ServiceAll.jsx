import React from 'react'
const services = [
    {
        title: "Khám lâm sàng",
        desc: "Bác sĩ thực hiện Khám lâm sàng đánh giá sức khỏe tổng quan. Các hạng mục như: Nội tổng quát, Răng hàm mặt, Mắt, Tai-mũi-họng, Phụ khoa - tuyến vú (với nữ), Tim mạch...",
        image: "https://benhvienbacha.vn/wp-content/uploads/2023/01/chuyen-gia-giai-dap-kham-suc-khoe-tong-quat-gom-nhung-gi.jpg",
        process: [
            "Đăng ký tại quầy tiếp nhận",
            "Khám tổng quát ban đầu",
            "Khám chuyên khoa (nếu cần)",
            "Tư vấn và hướng dẫn điều trị"
        ]
    },
    {
        title: "Xét nghiệm",
        desc: "Thực hiện các xét nghiệm máu, nước tiểu, sinh hóa,... nhanh chóng và chính xác.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-LDOStFT_yHJ5F7o0kpBvQKuZCmX-zNEJvA&s",
        process: [
            "Nhận chỉ định từ bác sĩ",
            "Lấy mẫu (máu, nước tiểu...) tại phòng xét nghiệm",
            "Mẫu được phân tích bằng máy hiện đại",
            "Trả kết quả và bác sĩ giải thích kết quả"
        ]
    },
    {
        title: "Chụp X-quang",
        desc: "Chẩn đoán hình ảnh hiệu quả cho các bệnh lý về xương, phổi,...",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySauDRoE9HoDfLfmtv9ca-2g-XpsMKNHA0Q&s",
        process: [
            "Nhận chỉ định từ bác sĩ",
            "Chuẩn bị và hướng dẫn tư thế chụp",
            "Tiến hành chụp X-quang",
            "Trả kết quả và bác sĩ đọc kết quả"
        ]
    },
    {
        title: "Siêu âm",
        desc: "Siêu âm tổng quát, ổ bụng, tuyến giáp, sản phụ khoa,...",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNpC8lpuYN-16Ywd8Vbze-BFtAzlPbbmUgQ&s",
        process: [
            "Đăng ký và nhận chỉ định siêu âm",
            "Chuẩn bị và hướng dẫn tư thế nằm",
            "Bác sĩ thực hiện siêu âm và phân tích",
            "Trả kết quả và tư vấn"
        ]
    },
    {
        title: "Nội soi tiêu hóa",
        desc: "Phát hiện sớm các bệnh lý về dạ dày, đại tràng,... với thiết bị hiện đại.",
        image: "https://sadec.phuongchau.com/wp-content/uploads/2022/11/noi-soi-tieu-hoa-khong-dau.jpg",
        process: [
            "Nhịn ăn trước khi nội soi (theo chỉ định)",
            "Tiếp nhận và gây tê/gây mê (nếu cần)",
            "Tiến hành nội soi bằng ống mềm",
            "Bác sĩ trả kết quả và tư vấn điều trị"
        ]
    },
    {
        title: "Điện tim (ECG), điện não (EEG)",
        desc: "Theo dõi chức năng tim và não, hỗ trợ chẩn đoán bệnh lý thần kinh.",
        image: "https://www.vinmec.com/static/uploads/medium_20200319_101940_676410_dien_nao_do_EEG_max_1800x1800_jpg_454d6a7de8.jpg",
        process: [
            "Đăng ký dịch vụ",
            "Bác sĩ/điều dưỡng gắn thiết bị đo",
            "Tiến hành đo tín hiệu tim hoặc não",
            "In kết quả và bác sĩ đọc kết quả"
        ]
    },
];

const ServiceAll = () => {
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container flex justify-center items-center pt-20 p-5'>
                <div className='w-full max-w-5xl px-4'>
                    <section className="px-4 bg-white mb-10">
                        <h2 className="text-3xl font-bold mb-8 font-georgia text-highlight text-center uppercase">Các dịch vụ khám tại trung tâm</h2>
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
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-700 text-base">{service.desc}</p>
                                        {service.process && (
                                            <div className="mt-4">
                                                <p className="font-medium text-black mb-1">Quy trình thực hiện:</p>
                                                <ul className="list-disc list-inside text-gray-800 text-sm">
                                                    {service.process.map((step, i) => (
                                                        <li key={i}>{step}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            ))}
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}

export default ServiceAll