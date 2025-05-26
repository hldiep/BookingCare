import React, { useEffect, useState } from 'react'
import { fetchAllServices } from '../util/serviceApi';

const ServiceAll = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        {loading ? (
                            <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                        ) : (
                            <div>
                                {services.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">Không có dịch vụ nào.</div>
                                ) : (
                                    <div className="max-w-6xl mx-auto space-y-16">
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
                </div>
            </div>
        </div>
    )
}

export default ServiceAll