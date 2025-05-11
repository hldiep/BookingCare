import React, { useState } from 'react'
import "swiper/css";
import "swiper/css/navigation";
import Slider from './Slider';
import { Link } from 'react-router-dom';
import Service from './Service';

const HomePage = () => {
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className={"container"}>
                <Slider />
                <div className="bg-header bg-center h-40 flex items-center font-georgia justify-center text-white text-4xl font-bold">
                    TRUNG TÂM KHÁM BỆNH STAR

                </div>
                <div className="py-16 px-4 lg:px-20 flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
                    {/* Left text */}
                    <div className="lg:w-1/2 space-y-4">
                        <p className="text-lg text-highlight mr-5">
                            Phòng khám là Hệ Thống Y Tế chất lượng khám theo tiêu chuẩn Châu Âu.
                            Có hỗ trợ khám và điều trị tại Singapore.
                        </p>
                    </div>

                    {/* Center logo */}
                    <div className="lg:w-1/4 flex justify-center">
                        <div className="rounded-full border-2 border-nav p-10">
                            <img
                                src="https://img.pikbest.com/origin/09/19/05/37upIkbEsTQ4z.png!sw800"
                                alt="Logo"
                                className="h-28 object-contain"
                            />
                            <p className="text-center text-highlight font-bold mt-2 text-lg">Phòng Khám Star</p>
                        </div>
                    </div>

                    {/* Right info */}
                    <div className="lg:w-1/3 space-y-6 text-highlight">
                        <div>
                            <div className="flex items-center space-x-3">
                                <img src="https://sudospaces.com/karofi-com/images/content/content_s609.jpg" alt="Standard" className="w-20 h-20 rounded-full border border-nav" />
                                <p>Khám theo tiêu chuẩn quốc tế.</p>
                            </div>
                        </div>

                        <div className="ml-14 flex items-start space-x-3">
                            <img src="https://free.vector6.com/wp-content/uploads/2020/04/Corona-qbvngz0056.jpg" alt="Doctors" className="w-20 h-20 rounded-full object-cover border border-nav" />
                            <p>Đội ngũ bác sĩ trên 15 năm kinh nghiệm từng tu nghiệp nước ngoài.</p>
                        </div>

                        <div className="ml-14 flex items-start space-x-3">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmC2muMHXlURBAisAMdwz8SR8f0DfXMGM0gg&s" alt="Facility" className="w-20 h-20 rounded-full object-cover border border-nav" />
                            <p>Cơ sở vật chất khang trang, không gian thoáng đãng.</p>
                        </div>

                        <div className="flex items-start space-x-3">
                            <img src="https://indochinapost.com/wp-content/uploads/van-chuyen-may-moc-thiet-bi-y-te.jpg" alt="Equipment" className="w-20 h-20 rounded-full object-cover border border-nav" />
                            <p>Máy móc, Thiết bị tối tân được nhập khẩu từ Nhật và Hoa Kỳ.</p>
                        </div>
                    </div>
                </div>
                <section className="py-10 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-highlight text-3xl font-bold text-center mb-8">Đội ngũ bác sĩ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg shadow-md p-4 text-center">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv4x9bbvd_WFTCb7x4rAZedVRwZ-iQ2V8yWg&s"
                                    alt="Bác sĩ 1"
                                    className="mx-auto h-40 w-40 object-cover rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold">TS.BS Nguyễn Văn A</h3>
                                <p className="text-sm text-gray-500">Chuyên khoa: Nội khoa</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-4 text-center">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgklHeb3cxOFzD49dK3idxfPKaz2cUrym1xg&s"
                                    alt="Bác sĩ 2"
                                    className="mx-auto h-40 w-40 object-cover rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold">BS Trần Thị B</h3>
                                <p className="text-sm text-gray-500">Chuyên khoa: Ngoại khoa</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-4 text-center">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK8tdlOHFCxb9xrxtAL8Z9r_TP8qPEpl6IrQ&s"
                                    alt="Bác sĩ 3"
                                    className="mx-auto h-40 w-40 object-cover rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold">BS Lê Văn C</h3>
                                <p className="text-sm text-gray-500">Chuyên khoa: Y học cổ truyền</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Service />
                {/* <section className="py-10 px-4">
                    <div className="max-w-6xl mx-auto text-center">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'Khám sức khỏe tổng quát định kỳ',
                                    image: 'https://benhvienbacha.vn/wp-content/uploads/2023/01/chuyen-gia-giai-dap-kham-suc-khoe-tong-quat-gom-nhung-gi.jpg',
                                    desc: 'Tầm soát bệnh lý sớm, chăm sóc sức khỏe toàn diện.'
                                },
                                {
                                    title: 'Xét nghiệm',
                                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-LDOStFT_yHJ5F7o0kpBvQKuZCmX-zNEJvA&s',
                                    desc: 'Thực hiện các xét nghiệm máu, nước tiểu, sinh hóa,... nhanh chóng và chính xác.'
                                },
                                {
                                    title: 'Chụp X-quang',
                                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySauDRoE9HoDfLfmtv9ca-2g-XpsMKNHA0Q&s',
                                    desc: 'Chẩn đoán hình ảnh hiệu quả cho các bệnh lý về xương, phổi,...'
                                },
                                {
                                    title: 'Siêu âm',
                                    image: '/images/ultrasound.png',
                                    desc: 'Siêu âm tổng quát, ổ bụng, tuyến giáp, sản phụ khoa,...'
                                },
                                {
                                    title: 'Nội soi tiêu hóa',
                                    image: '/images/endoscopy.png',
                                    desc: 'Phát hiện sớm các bệnh lý về dạ dày, đại tràng,... với thiết bị hiện đại.'
                                },
                                {
                                    title: 'Điện tim (ECG), điện não (EEG)',
                                    image: '/images/ecg-eeg.png',
                                    desc: 'Theo dõi chức năng tim và não, hỗ trợ chẩn đoán bệnh lý thần kinh.'
                                }
                            ].map((service, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                    <img src={service.image} alt={service.title} className="h-16 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-blue-700">{service.title}</h3>
                                    <p className="text-gray-700 mt-2 text-sm">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}
                <section className="bg-blue-50 py-12 px-4">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <img
                                src="https://ecopharma.com.vn/wp-content/uploads/2024/09/giuong-benh-phong-kham-da-khoa-tam-anh-quan-7.jpg"
                                alt="Star"
                                className="rounded-xl shadow-lg w-full object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-highlight mb-4">
                                Giới thiệu Hệ thống Phòng khám Star
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Star là Hệ thống Y tế tiêu chuẩn quốc tế. Hệ thống cung cấp dịch vụ chăm sóc sức khỏe toàn diện, chuyên sâu với chất lượng cao, cơ sở vật chất hiện đại, đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị nhập khẩu từ Nhật, Mỹ.
                            </p>
                            <p className="text-gray-700">
                                Với sứ mệnh chăm sóc sức khỏe gia đình bạn theo tiêu chuẩn châu Âu, Star hướng tới trải nghiệm khám chữa bệnh thân thiện, minh bạch và hiệu quả.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="text-center py-8 bg-header mb-8 text-white">
                    <h2 className="text-3xl font-bold mb-4">Đặt lịch khám ngay hôm nay</h2>
                    <p className="mb-6 text-lg">Nhanh chóng - Tiện lợi - Chính xác</p>
                    <Link
                        to="/dat-lich"
                        className="font-bold px-3 py-2 border border-logo rounded-full hover:bg-logo hover:text-nav transition-all duration-500 hover:animate-button-hover"
                    >
                        Đặt lịch khám
                    </Link>
                </section>
            </div>
        </div>
    )
}

export default HomePage