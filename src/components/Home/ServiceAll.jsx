import React, { useEffect, useState } from 'react'
import { fetchAllServices } from '../util/serviceApi';

const ServiceAll = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const spPerPage = 5;
    const indexOfLast = currentPage * spPerPage;
    const indexOfFirst = indexOfLast - spPerPage;
    const current = services.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(services.length / spPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn về đầu trang
    };
    useEffect(() => {
        const loadService = async () => {
            try {
                const data = await fetchAllServices();
                setServices(data);
            } catch (error) {
                console.log("Lỗi tải danh sách dịch vụ:", error);
            }
            finally {
                setLoading(false);
            }
        }
        loadService();
    }, []);
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container flex justify-center pt-20 p-5'>
                <div className='w-full max-w-5xl px-4'>
                    <section className="px-4 bg-white mb-10">
                        <h2 className="text-3xl font-bold mb-8 font-georgia text-highlight text-center uppercase">Các dịch vụ khám tại trung tâm</h2>
                        <p className="text-lg text-gray-700 text-justify mb-8 leading-relaxed">
                            Trung tâm cung cấp đa dạng các dịch vụ khám chữa bệnh nhằm đáp ứng nhu cầu chăm sóc sức khỏe toàn diện cho mọi người dân. Từ khám tổng quát, chẩn đoán hình ảnh, đến các dịch vụ chuyên sâu, chúng tôi luôn đặt chất lượng và sự hài lòng của bệnh nhân lên hàng đầu.
                        </p>
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                                <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                            </div>
                        ) : (
                            <div>
                                {services.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">Không có dịch vụ nào.</div>
                                ) : (
                                    <div className="max-w-6xl mx-auto space-y-16">
                                        {current.map((service, index) => (
                                            <div
                                                key={index}
                                                className={`flex rounded-xl shadow-lg bg-gray-100 flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                                    } items-stretch gap-6 h-[280px]`}
                                            >
                                                <div className="md:w-1/2 h-full">
                                                    <img
                                                        src={service.image}
                                                        alt={service.name}
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
                                <div className="flex flex-col items-center gap-4 mt-10">
                                    <div className="flex gap-2 flex-wrap justify-center">
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
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ServiceAll