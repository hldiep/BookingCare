import React, { useEffect, useState } from 'react';
import { fetchAllSpecialty } from '../util/specialtyApi';
import { fetchAllDoctors } from '../util/doctorApi';

const DepartmentPage = () => {
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);

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
            }
            finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container flex justify-center pt-20 p-5'>
                <div className='w-full max-w-5xl px-4'>
                    <section className="px-4 bg-white mb-10">
                        <h2 className="text-3xl font-bold mb-8 font-georgia text-center uppercase text-highlight">
                            Giới thiệu chuyên khoa
                        </h2>
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
                                    <div className="max-w-6xl mx-auto space-y-16">
                                        {specialties.map((sp, index) => (
                                            <div
                                                key={index}
                                                className={`flex rounded-xl shadow-lg bg-gray-100 flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                                    } items-stretch gap-6 h-[320px]`}
                                            >
                                                <div className="md:w-1/2">
                                                    <img
                                                        src={sp.image}
                                                        alt={sp.name}
                                                        className="h-full w-full object-cover rounded-xl shadow-lg"
                                                    />
                                                </div>
                                                <div className="md:w-1/2 p-6 overflow-auto h-full flex flex-col justify-center text-justify">
                                                    <h3 className="text-2xl font-semibold text-highlight mb-2">{sp.name}</h3>
                                                    <p className="text-gray-700 mb-2">{sp.description}</p>
                                                    <p className="font-medium text-black">Các bác sĩ:</p>
                                                    <div className="p-3 border-r">
                                                        {Array.isArray(sp.doctors) && sp.doctors.length > 0 ? (
                                                            <ul className="list-disc list-inside space-y-1">
                                                                {sp.doctors.map((doc, idx) => (
                                                                    <li key={idx}>{doc.name}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <span className="text-gray-500 italic">Chưa có</span>
                                                        )}
                                                    </div>
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
    );
};

export default DepartmentPage;
