import React, { useEffect, useState } from 'react'
import { fetchAllDoctors } from '../util/doctorApi';
import { fetchAllSpecialty } from '../util/specialtyApi';

const SectionDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [specialty, setSpecialty] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const [doctorList, specialtyList] = await Promise.all([
                    fetchAllDoctors(),
                    fetchAllSpecialty()
                ]);

                const specialtyMap = {};
                specialtyList.forEach(s => {
                    specialtyMap[s.id] = s.name;
                });
                setSpecialty(specialtyMap);
                setDoctors(doctorList);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div><section className="py-10 px-4">
            <div className="container ">
                <h2 className="text-highlight text-3xl font-bold text-center mb-8">Đội ngũ bác sĩ</h2>
                {loading ? (
                    <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                ) : (
                    <div>
                        {doctors.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">Hiện chưa có bác sĩ nào.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {doctors.slice(0, 4).map((doctor, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-[1.02] transition-all duration-300"
                                    >
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="mx-auto h-40 w-40 object-cover rounded-full mb-4"
                                        />
                                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                                        <p className="text-sm text-gray-500">Chuyên khoa: {specialty[doctor.medicalSpecialtyId] || 'Không xác định'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                )}
            </div>
        </section></div>
    )
}

export default SectionDoctor