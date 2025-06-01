
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { editSchedule, fetchScheduleById, updateSchedule } from '../util/scheduleApi';
import { fetchAllClinics } from '../util/clinicApi';
import { useAuth } from '../Helper/AuthContext';

const EditDoctorSchedule = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [schedule, setSchedule] = useState(null);
    const [clinics, setClinics] = useState([]);
    const [form, setForm] = useState({
        date: '',
        timeStart: '',
        timeEnd: '',
        maxBooking: '',
        clinicId: ''
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const scheduleData = await fetchScheduleById(id, token);
                setSchedule(scheduleData);

                setForm({
                    date: scheduleData.date,
                    timeStart: scheduleData.timeStart,
                    timeEnd: scheduleData.timeEnd,
                    maxBooking: scheduleData.maxBooking,
                    clinicId: scheduleData.clinic?.id || '',
                });

                const clinicList = await fetchAllClinics();
                setClinics(clinicList);
            } catch (err) {
                console.error('Lỗi tải dữ liệu:', err);
            }
        };

        loadData();
    }, [id, token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...schedule,
                date: form.date,
                timeStart: form.timeStart,
                timeEnd: form.timeEnd,
                maxBooking: parseInt(form.maxBooking),
                clinic: { id: form.clinicId },
            };

            await editSchedule(payload);

            alert('Cập nhật thành công');
            navigate('/my-appointments');
        } catch (err) {
            console.error('Lỗi cập nhật:', err);
            alert('Cập nhật thất bại');
        }
    };

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <Link to="/admin" className="hover:underline text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <Link to="/my-appointments" className="hover:underline text-blue-600">Lịch trình</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chỉnh sửa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chỉnh sửa lịch trình</h2>
                </div>

                <div className="bg-main p-6 max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-white border shadow p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                            <label className="block mb-1">Ngày</label>
                            <input type="date" name="date" value={form.date} onChange={handleChange} className="outline-none w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block mb-1">Thời gian bắt đầu</label>
                            <input type="time" name="timeStart" value={form.timeStart} onChange={handleChange} className="outline-none w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block mb-1">Thời gian kết thúc</label>
                            <input type="time" name="timeEnd" value={form.timeEnd} onChange={handleChange} className="outline-none w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block mb-1">Số lượt khám tối đa</label>
                            <input type="number" name="maxBooking" value={form.maxBooking} onChange={handleChange} className="outline-none w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block mb-1">Phòng khám</label>
                            <select name="clinicId" value={form.clinicId} onChange={handleChange} className="outline-none w-full p-2 border rounded" required>
                                <option value="">Chọn phòng khám</option>
                                {clinics.map(clinic => (
                                    <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2 text-right">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default EditDoctorSchedule;
