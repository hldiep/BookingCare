import React, { useEffect, useState } from 'react'
import { fetchAllDoctors } from '../util/doctorApi';

const SectionDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetDoctor = async () => {
            try {
                const data = await fetchAllDoctors();
                setDoctors(data.slice(0, 3));
            } catch (err) {
                console.log("Lỗi tải bác sĩ", err);
            } finally {
                setLoading(false);
            }
        }
        fetDoctor();
    }, []);
    return (
        <div><section className="py-10 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-highlight text-3xl font-bold text-center mb-8">Đội ngũ bác sĩ</h2>
                {loading ? (
                    <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                ) : (
                    <div>
                        {doctors.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">Hiện chưa có bác sĩ nào.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {doctors.map((doctor, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-all duration-300"
                                    >
                                        <img
                                            src={doctor.image || 'https://via.placeholder.com/150'}
                                            alt={doctor.fullName}
                                            className="mx-auto h-40 w-40 object-cover rounded-full mb-4"
                                        />
                                        <h3 className="text-xl font-semibold">{doctor.fullName}</h3>
                                        <p className="text-sm text-gray-500">Chuyên khoa: {doctor.specialty}</p>
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