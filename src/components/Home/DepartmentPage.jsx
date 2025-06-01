import React, { useEffect, useState } from 'react';
import { fetchAllSpecialty } from '../util/specialtyApi';
import { fetchAllDoctors } from '../util/doctorApi';

const DepartmentPage = () => {
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const specialtyPerPage = 4;
    const indexOfLast = currentPage * specialtyPerPage;
    const indexOfFirst = indexOfLast - specialtyPerPage;
    const current = specialties.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(specialties.length / specialtyPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [specialtyData, doctorData] = await Promise.all([
                    fetchAllSpecialty(),
                    fetchAllDoctors()
                ]);
                const specialtiesWithDoctors = specialtyData.map(specialty => {
                    const relatedDoctors = doctorData.filter(
                        doctor => doctor.medicalSpecialtyId === specialty.id
                    );
                    return {
                        ...specialty,
                        doctors: relatedDoctors,
                    };
                });
                setSpecialties(specialtiesWithDoctors);
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className="container flex justify-center pt-20 p-5">
                <div className="w-full max-w-6xl px-4">
                    <section className="px-4 bg-white mb-10">
                        <h2 className="text-3xl font-bold mb-8 font-georgia text-center uppercase text-highlight">
                            Giới thiệu chuyên khoa
                        </h2>
                        <p className="text-lg text-gray-700 text-justify mb-8 leading-relaxed">
                            Chuyên khoa là các bộ phận chuyên sâu trong bệnh viện, tập trung vào các lĩnh vực y học cụ thể như nội khoa, ngoại khoa, tai mũi họng, da liễu và nhiều chuyên ngành khác. Mỗi chuyên khoa được đảm nhiệm bởi đội ngũ bác sĩ có chuyên môn và kinh nghiệm sâu rộng, nhằm đảm bảo việc chẩn đoán và điều trị hiệu quả cho bệnh nhân.
                        </p>

                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                                <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                            </div>
                        ) : (
                            <div>
                                {specialties.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">Không có chuyên khoa nào.</div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {current.map((sp, index) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                            >
                                                <h3 className="text-xl font-bold text-blue-700 mb-2">{sp.name}</h3>
                                                <p className="text-gray-700 mb-3 text-justify">{sp.description}</p>
                                                <p className="font-medium text-black">Các bác sĩ:</p>
                                                <div className="pl-4 mt-1">
                                                    {Array.isArray(sp.doctors) && sp.doctors.length > 0 ? (
                                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                                            {sp.doctors.map((doc, idx) => (
                                                                <li key={idx}>{doc.name}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-gray-500 italic text-sm">Chưa có</span>
                                                    )}
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
                                                className={`px-3 py-1 rounded border text-sm ${currentPage === i + 1
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
                                            src="https://phongkhambinhminh.com.vn/media/news/879_chuyen_khoa_tim_mach.jpg"
                                            alt="Ảnh 1"
                                            className="w-full h-64 object-cover rounded-xl shadow-md"
                                        />
                                        <img
                                            src="https://api.simmed.vn/assets/uploads/services/chuyenkhoataimuihong.webp"
                                            alt="Ảnh 2"
                                            className="w-full h-64 object-cover rounded-xl shadow-md"
                                        />
                                        <img
                                            src="https://medw.vn/wp-content/uploads/2023/12/medw-trang-phuc-y-te-chuyen-khoa-da-lieu-tham-my.jpg"
                                            alt="Ảnh 3"
                                            className="w-full h-64 object-cover rounded-xl shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DepartmentPage;
