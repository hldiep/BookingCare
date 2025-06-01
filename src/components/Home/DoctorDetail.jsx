import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllDoctors, fetchDoctorById } from '../util/doctorApi';
import { fetchAllSpecialty } from '../util/specialtyApi';

const DoctorDetail = () => {
    const [selectedDate, setSelectedDate] = useState('2025-05-12');
    const { id } = useParams();
    const [doctor, setDoctor] = useState({
        id: "",
        medicalSpecialtyId: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: false,
        status: "",
        createdAt: ""
    })
    const [specialtyName, setSpecialtyName] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorData = await fetchDoctorById(id);
                setDoctor(doctorData);

                const specialties = await fetchAllSpecialty();
                const matchedSpecialty = specialties.find(s => s.id === doctorData.medicalSpecialtyId);
                setSpecialtyName(matchedSpecialty ? matchedSpecialty.name : 'Không rõ');
            } catch (error) {
                console.log('Lỗi khi tải dữ liệu:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container flex justify-center pt-20 p-5'>
                <div className="max-w-4xl mx-auto p-6 space-y-6">
                    <div className="bg-white shadow-md rounded-xl p-6 flex space-x-6">
                        <img
                            src="https://anhcute.net/wp-content/uploads/2024/10/cropped-Hinh-chibi-bac-si-nhan-vat-hoat-hinh-cute.jpg"
                            alt="Doctor"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-highlight">{doctor.name}</h2>
                            <p className="text-gray-700 mt-2">Chuyên khoa: {specialtyName}</p>
                            <p className="mt-2 text-sm text-gray-700">{doctor.qualification}</p>
                            <p className="text-sm text-gray-500">{doctor.description}</p>

                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Lịch khám</h3>

                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày:</label>
                            <select
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                            >

                            </select>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;
