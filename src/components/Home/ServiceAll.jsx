import React, { useEffect, useState } from 'react';
import { fetchAllServices } from '../util/serviceApi';

const ServiceAll = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const spPerPage = 6;
    const indexOfLast = currentPage * spPerPage;
    const indexOfFirst = indexOfLast - spPerPage;
    const current = services.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(services.length / spPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const loadService = async () => {
            try {
                const data = await fetchAllServices();
                setServices(data);
            } catch (error) {
                console.log("Lỗi tải danh sách dịch vụ:", error);
            } finally {
                setLoading(false);
            }
        };
        loadService();
    }, []);

    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className="container px-5 pt-16 pb-10 max-w-7xl">
                <h2 className="text-3xl font-bold mb-8 font-georgia text-highlight text-center uppercase">Các dịch vụ khám tại trung tâm</h2>
                <p className=" text-gray-700 text-justify mb-10 leading-relaxed">
                    Trung tâm cung cấp đa dạng các dịch vụ khám chữa bệnh nhằm đáp ứng nhu cầu chăm sóc sức khỏe toàn diện cho mọi người dân. Từ khám tổng quát, chẩn đoán hình ảnh, đến các dịch vụ chuyên sâu, chúng tôi luôn đặt chất lượng và sự hài lòng của bệnh nhân lên hàng đầu.
                </p>

                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                        <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">Không có dịch vụ nào.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {current.map((service) => (
                                <div key={service.id} className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition duration-300 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-blue-700 mb-2">{service.name}</h3>
                                        <p className="text-gray-700 text-sm text-justify">{service.description}</p>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-10">
                            <div className="flex gap-2 flex-wrap">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageClick(i + 1)}
                                        className={`px-3 py-1 rounded border ${currentPage === i + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <img
                                    src="https://umcclinic.com.vn/Data/Sites/1/News/80/slide_tm.jpg"
                                    alt="Dịch vụ 1"
                                    className="w-full h-64 object-cover rounded-xl shadow-md"
                                />
                                <img
                                    src="https://phongkhamdalieusaigon.vn/wp-content/uploads/2022/02/z3258668298637_b693b79d0d1cb4877b8cbb313b0c7d58-1067x800.jpg"
                                    alt="Dịch vụ 2"
                                    className="w-full h-64 object-cover rounded-xl shadow-md"
                                />
                                <img
                                    src="https://taimuihongsg.com/wp-content/uploads/2021/08/dich-vu-dieu-tri-phau-thuat_benh-vien-tai-mui-hong-sai-gon.jpg"
                                    alt="Dịch vụ 3"
                                    className="w-full h-64 object-cover rounded-xl shadow-md"
                                />
                            </div>
                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export default ServiceAll;