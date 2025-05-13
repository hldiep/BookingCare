import React from 'react'
import "swiper/css";
import "swiper/css/navigation";
import Slider from './Slider';
import { Link } from 'react-router-dom';
import Service from './Service';
import { Mail, PhoneCall, Truck } from 'lucide-react';
import SectionDoctor from './SectionDoctor';
import SectionIntro from './SectionIntro';
import SectionFacilities from './SectionFacilities';

const HomePage = () => {
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className="w-full">
                <div className="container mx-auto">
                    <Slider />
                    <h2 className="text-4xl font-bold mb-8 font-georgia text-center text-logo">Trung Tâm Khám Bệnh HealthCare</h2>
                    <SectionIntro />
                </div>

                {/* Đội ngũ bác sĩ */}
                <SectionDoctor />

                <div className="container mx-auto">
                    <Service />
                </div>

                <section className="py-12 px-4">
                    <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <img
                                src="https://ecopharma.com.vn/wp-content/uploads/2024/09/giuong-benh-phong-kham-da-khoa-tam-anh-quan-7.jpg"
                                alt="Star"
                                className="rounded-xl shadow-lg w-full object-cover hover:scale-105 transition-all duration-300"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-highlight mb-4">
                                Giới thiệu Hệ thống Phòng khám Star
                            </h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                Star là Hệ thống Y tế tiêu chuẩn quốc tế. Hệ thống cung cấp dịch vụ chăm sóc sức khỏe toàn diện, chuyên sâu với chất lượng cao, cơ sở vật chất hiện đại, đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị nhập khẩu từ Nhật, Mỹ.
                            </p>
                            <p className="text-gray-700 text-justify">
                                Với sứ mệnh chăm sóc sức khỏe gia đình bạn theo tiêu chuẩn châu Âu, Star hướng tới trải nghiệm khám chữa bệnh thân thiện, minh bạch và hiệu quả.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="px-12">
                    <div className="rounded-xl mx-auto p-12 bg-[#f9f0eb] grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">

                        <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300">
                            <PhoneCall size={32} className="text-logo mt-1" />
                            <div>
                                <h3 className="text-lg font-bold">0984 234 207</h3>
                                <p>Hotline liên hệ 24/7</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300">
                            <Mail size={32} className="text-logo mt-1" />
                            <div>
                                <h3 className="text-lg font-bold">khambenhhealthcare@gmail.com</h3>
                                <p>Email liên hệ</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300">
                            <Truck size={54} className="text-logo mt-1" />
                            <div>
                                <h3 className="text-lg font-bold">Trung tâm khám bệnh HealthCare</h3>
                                <p>97 Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh</p>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="text-center py-8 mb-8 text-black">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-4 text-highlight">Đặt lịch khám ngay hôm nay</h2>
                        <p className="mb-6 text-lg">Nhanh chóng - Tiện lợi - Chính xác</p>
                        <Link
                            to="/dat-lich"
                            className="font-bold text-logo px-3 py-2 border border-logo rounded-full hover:bg-logo hover:text-white transition-all duration-500 hover:animate-button-hover"
                        >
                            Đặt lịch khám
                        </Link>
                    </div>
                </section>

                <SectionFacilities />
            </div>
        </div>
    )
}

export default HomePage;
