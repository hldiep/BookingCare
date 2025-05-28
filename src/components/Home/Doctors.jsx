import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllDoctors } from '../util/doctorApi';
import { fetchAllSpecialty } from '../util/specialtyApi';

const Doctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [specialty, setSpecialty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 5;
    const sectionRef = useRef(null);

    // useEffect(() => {
    //     const loadDatas = async () => {
    //         try {
    //             const data = await fetchAllDoctors();
    //             setDoctors(data);

    //         } catch (error) {
    //             console.log("Lỗi tải danh sách bác sĩ:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     loadDatas();
    // }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                let doctorList = [];
                doctorList = await fetchAllDoctors();
                const specialtyList = await fetchAllSpecialty();
                const specialtyMap = {};
                specialtyList.forEach(s => {
                    specialtyMap[s.id] = s.name;
                });
                setDoctors(doctorList);
                setSpecialty(specialtyMap);
            } catch (err) {
                console.log("Lỗi tải danh sách bác sĩ:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const totalPages = Math.ceil(doctors.length / doctorsPerPage);

    const scrollToTopOfList = () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        scrollToTopOfList();
    };

    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container flex justify-center pt-20 p-5'>
                <div className='w-full max-w-5xl px-4'>
                    <section ref={sectionRef} className="px-4 bg-white mb-10">
                        <h2 className="text-3xl font-bold mb-8 font-georgia text-center uppercase text-highlight">
                            Danh sách bác sĩ
                        </h2>
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                                <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                            </div>
                        ) : (
                            <div>
                                {doctors.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">Không có bác sĩ nào.</div>
                                ) : (
                                    <>
                                        <div className="max-w-6xl mx-auto space-y-16">
                                            {currentDoctors.map((doc, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => navigate(`/bac-si/detail/${doc.id}`)}
                                                    className="flex rounded-xl shadow-lg bg-gray-100 flex-col md:flex-row items-stretch gap-0 h-[200px] overflow-hidden cursor-pointer"
                                                >
                                                    <div className="md:w-1/4 w-full h-full">
                                                        <img
                                                            src={doc.account?.avatar || 'https://media.istockphoto.com/id/1215794695/vi/vec-to/h%C3%ACnh-%E1%BA%A3nh-%C4%91%E1%BA%A1i-di%E1%BB%87n-avatar-c%E1%BB%A7a-m%E1%BB%99t-b%C3%A1c-s%C4%A9-nam-%C4%91eo-m%E1%BA%B7t-n%E1%BA%A1-y-t%E1%BA%BF-c%C3%B3-%E1%BB%91ng-nghe-minh-h%E1%BB%8Da-vect%C6%A1.jpg?s=612x612&w=0&k=20&c=JDg-6bRQnRZkKgu7oxkS6o3wWjySZRgG3fxfLexzOjI='}
                                                            alt="avatar"
                                                            className="w-[200px] h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="md:w-3/4 p-6 overflow-auto h-full flex flex-col justify-center text-justify">
                                                        <h2 className="text-2xl font-bold text-logo mb-4">{doc.name}</h2>
                                                        <p><strong>Chuyên khoa:</strong> {specialty[doc.medicalSpecialtyId] || 'Không xác định'}</p>
                                                        <p><strong>Email:</strong> {doc.email}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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
                                    </>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Doctors;