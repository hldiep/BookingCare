import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClippedDrawer from './DashboardLayoutBasic';
import { fetchAllDoctors, fetchDoctorCount } from '../util/doctorApi';
import { fetchAllServices } from '../util/serviceApi';

const Tongquan = () => {
    const navigate = useNavigate();
    const [doctorCount, setDoctorCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAllDoctors();
                setDoctorCount(data.length);
            } catch (err) {
                console.log('Lỗi tải danh sách bác sĩ', err);
            }
        }
        const loadData2 = async () => {
            try {
                const data = await fetchAllServices();
                setServiceCount(data.length);
            } catch (err) {
                console.log('Lỗi tải danh sách dịch vụ', err);
            }
        }
        loadData();
        loadData2();
    }, []);
    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Tổng quan</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Tổng quan</h2>
                </div>
                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                    <div className='grid grid-cols-4 gap-4 mb-6'>
                        <div className="p-4 border-l-4 border-yellow-600 bg-white rounded-md shadow">
                            <p className="text-sm">Số lượng bác sĩ</p>
                            <p className="text-xl font-bold">{doctorCount}</p>
                        </div>
                        <div className="p-4 border-l-4 border-red-600 bg-white rounded-md shadow">
                            <p className="text-sm">Số lượng dịch vụ</p>
                            <p className="text-xl font-bold">{serviceCount}</p>
                        </div>
                        <div className="p-4 border-l-4 border-green-600 bg-white rounded-md shadow">
                            <p className="text-sm">Tổng lịch hẹn hôm nay</p>
                            <p className="text-xl font-bold">11</p>
                        </div>
                        <div className="p-4 border-l-4 border-orange-600 bg-white rounded-md shadow">
                            <p className="text-sm">Tổng lịch hẹn đã hủy</p>
                            <p className="text-xl font-bold">4</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="text-xl font-semibold mb-1">
                            Số lượng bệnh nhân trong 7 ngày gần nhất
                        </div>
                        <div className="text-gray-500 text-sm mb-4">
                            Bao gồm cả khám trực tiếp và đặt lịch hẹn
                        </div>

                        <div className="h-48 flex items-end gap-4">
                            {Array.from({ length: 7 }, (_, i) => {
                                const date = new Date();
                                date.setDate(date.getDate() - (6 - i));
                                const label =
                                    i === 6 ? "Hôm nay" : date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });

                                const count = [3, 5, 2, 6, 4, 4, 18][i];
                                ;
                                return (
                                    <div key={i} className="flex flex-col items-center w-full">
                                        <div
                                            className="w-full bg-green-500 rounded-t"
                                            style={{ height: `${count * 5}px` }}
                                        ></div>
                                        <div className="text-xs mt-1">{label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </ClippedDrawer>
    )
}

export default Tongquan