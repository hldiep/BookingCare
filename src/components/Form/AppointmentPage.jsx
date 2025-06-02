import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAppointments } from '../util/appointmentApi';
import { fetchAllServices } from '../util/serviceApi';
import { fetchAllSchedule } from '../util/scheduleApi';

function AppointmentPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        serviceId: '',
        scheduleId: '',
        customer: {
            name: '',
            phone: '',
            email: '',
            address: '',
            gender: true,
        },
        note: '',
        status: 'PENDING',
        updatedByUser: null,
    });

    const [services, setServices] = useState([]);
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceData = await fetchAllServices();
                setServices(serviceData);
                const scheduleData = await fetchAllSchedule();
                setSchedule(scheduleData);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (['name', 'phone', 'email', 'address', 'gender'].includes(name)) {
            setForm((prev) => ({
                ...prev,
                customer: {
                    ...prev.customer,
                    [name]: name === 'gender' ? value === 'true' : value,
                },
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value,
            }));
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.note.trim()) {
            alert('Vui lòng nhập ghi chú.');
            return;
        }
        setIsSubmitting(true);

        // Tạo bản sao form và bỏ numericalOrder nếu có
        const formToSend = { ...form };
        delete formToSend.numericalOrder;

        console.log('Dữ liệu gửi đi:', formToSend);

        try {
            const res = await addAppointments(formToSend);
            if (res.statusCode === 201) {
                navigate('/appointment-success');
            } else {
                alert('Lỗi khi đặt lịch: ' + res.message);
            }
        } catch (err) {
            alert('Lỗi kết nối đến server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className="container flex justify-center pt-20 p-5">
                <div className="w-full max-w-5xl px-4">
                    <h2 className="text-2xl font-bold mb-6 text-center font-georgia text-highlight">
                        ĐẶT LỊCH KHÁM BỆNH TRONG NGÀY
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="mb-2">Họ và tên</p>
                                <input
                                    name="name"
                                    value={form.customer.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Tên của bạn *"
                                    className="w-full border p-2 rounded outline-none"
                                />
                            </div>
                            <div>
                                <p className="mb-2">Điện thoại</p>
                                <input
                                    name="phone"
                                    value={form.customer.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    placeholder="Điện thoại *"
                                    className="w-full border p-2 rounded outline-none"
                                />
                            </div>
                            <div>
                                <p className="mb-2">Email</p>
                                <input
                                    name="email"
                                    value={form.customer.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border p-2 rounded outline-none"
                                />
                            </div>
                            <div>
                                <p className="mb-2">Địa chỉ</p>
                                <input
                                    name="address"
                                    value={form.customer.address}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Địa chỉ"
                                    className="w-full border p-2 rounded outline-none"
                                />
                            </div>
                            <div>
                                <p className="mb-2">Giới tính</p>
                                <div className="flex items-center gap-4">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={true}
                                            checked={form.customer.gender === true}
                                            onChange={handleChange}
                                        />{' '}
                                        Nam
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={false}
                                            checked={form.customer.gender === false}
                                            onChange={handleChange}
                                        />{' '}
                                        Nữ
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2">Dịch vụ</p>
                                <select
                                    name="serviceId"
                                    value={form.serviceId}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded outline-none"
                                >
                                    <option value="">-- Chọn dịch vụ --</option>
                                    {services.map((sv) => (
                                        <option key={sv.id} value={sv.id}>
                                            {sv.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p className="mb-2">Lịch khám</p>
                                <select
                                    name="scheduleId"
                                    value={form.scheduleId}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded outline-none"
                                >
                                    <option value="">-- Chọn lịch khám --</option>
                                    {schedule.map((sc) => (
                                        <option key={sc.id} value={sc.id}>
                                            {sc.date} | {sc.timeStart} - {sc.timeEnd}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <textarea
                                name="note"
                                value={form.note}
                                onChange={handleChange}
                                placeholder="Ghi chú"
                                className="border p-3 rounded col-span-2 outline-none w-full h-32 resize-none"
                            />
                        </div>
                        <div className="text-center items-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 mb-10 font-bold text-white px-3 py-2 rounded-full bg-logo border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300 disabled:opacity-50"
                            >
                                ĐẶT LỊCH NGAY
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AppointmentPage;
