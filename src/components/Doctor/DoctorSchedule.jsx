import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { Trash2, Edit } from 'lucide-react';
import { fetchAllClinics } from '../util/clinicApi';
import { addSchedule, fetchSchedulesByDoctor, fetchSchedulesById } from '../util/scheduleApi';

const DoctorSchedule = () => {
    const navigate = useNavigate();
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        date: '',
        timeStart: '',
        timeEnd: '',
        maxBooking: '',
        clinic_id: ''
    });
    const loadClinics = async () => {
        try {
            const data = await fetchAllClinics();
            setClinics(data);
        } catch (error) {
            console.log("Lỗi tải danh sách phòng khám:", error);
        }
    };
    useEffect(() => {
        const loadData = async () => {
            try {
                loadClinics();
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    const idDoctor = user.id;

                    const fetchedSchedules = await fetchSchedulesByDoctor(idDoctor);
                    setSchedule(fetchedSchedules);
                    setLoading(false);
                } else {
                    console.log("Không tìm thấy user trong localStorage");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Lỗi khi tải lịch trình:", error);
                setLoading(false);
            }
        };

        loadData();
    }, []);


    const [schedules, setSchedule] = useState([]);
    const [editingId, setEditingId] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === 'clinic_id' ? parseInt(value) : value
        });
    };
    const handleAddSchedule = async (e) => {
        e.preventDefault();
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                alert('Không tìm thấy thông tin đăng nhập!');
                return;
            }

            const user = JSON.parse(storedUser);

            const payload = {
                date: form.date,
                timeStart: form.timeStart,
                timeEnd: form.timeEnd,
                maxBooking: parseInt(form.maxBooking),
                clinicId: form.clinic_id,
                doctorId: user.id
            };
            await addSchedule(payload);
            alert('Thêm lịch thành công!');

            setForm({
                date: '',
                timeStart: '',
                timeEnd: '',
                maxBooking: '',
                clinic_id: ''
            });

            const fetchedSchedules = await fetchSchedulesByDoctor(user.id);
            setSchedule(fetchedSchedules);
        } catch (error) {
            console.error('Lỗi khi thêm lịch:', error);
            alert('Thêm lịch thất bại!');
        }
    };
    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <Link to="/admin" className="hover:underline text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Lịch trình</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý lịch trình</h2>
                </div>

                <div className="min-h-screen bg-main p-6 space-y-6">

                    <div className="bg-white border shadow p-4 rounded max-w-3xl mx-auto">
                        <h3 className="font-semibold text-gray-800 mb-4">{editingId ? 'Cập nhật lịch' : 'Thêm lịch mới'}</h3>
                        <form onSubmit={handleAddSchedule} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
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
                                <select
                                    name="clinic_id"
                                    value={form.clinic_id}
                                    onChange={handleChange}
                                    className="outline-none w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Chọn phòng khám</option>
                                    {clinics.map((clinic) => (
                                        <option key={clinic.id} value={clinic.id}>
                                            {clinic.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2 text-right">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                    {loading ? (
                        <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                    ) : (
                        <div className="bg-white shadow rounded border max-w-6xl mx-auto overflow-x-auto">
                            <h3 className="font-semibold text-gray-800 p-4 border-b">Danh sách lịch trình</h3>
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-gray-100 text-gray-600">
                                    <tr>
                                        <th className="p-2">Ngày</th>
                                        <th className="p-2">Bắt đầu</th>
                                        <th className="p-2">Kết thúc</th>
                                        <th className="p-2">Tối đa</th>
                                        <th className="p-2">Phòng khám</th>
                                        <th className="p-2">Trạng thái</th>
                                        <th className="p-2">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="p-4 text-center text-gray-500">Chưa có lịch trình nào</td>
                                        </tr>
                                    ) : (
                                        schedules.map((s) => (
                                            <tr key={s.id} className="border-t">
                                                <td className="p-2">{s.date}</td>
                                                <td className="p-2">{s.timeStart}</td>
                                                <td className="p-2">{s.timeEnd}</td>
                                                <td className="p-2">{s.maxBooking}</td>
                                                <td className="p-2">{s.clinic?.name || 'N/A'}</td>
                                                <td className="p-2">{s.status}</td>
                                                <td className="p-2 space-x-2">
                                                    <button onClick={() => navigate(`/doctor-schedule/edit/${s.id}`)}
                                                        className="text-yellow-600 hover:underline"><Edit size={16} /></button>
                                                    {/* <button className="text-red-600 hover:underline"><Trash2 size={16} /></button> */}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            </div >
        </ClippedDrawer >
    );
};

export default DoctorSchedule;
