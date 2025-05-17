import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorEdit = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        name: 'Nguyễn Thị Thu Trang',
        gender: 'female',
        birthday: '1985-06-15',
        specialty: 'Nội tổng hợp',
        phone: '0123456789',
        email: 'thu.trang@example.com',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        image: 'https://i.pinimg.com/originals/24/bd/d9/24bdd9ec59a9f8966722063fe7791183.jpg',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Cập nhật bác sĩ:", doctor);
        navigate("/doctor");
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/doctor")}>Bác sĩ</button>
                    <span>{'>'}</span>
                    <button>Chỉnh sửa</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Chỉnh sửa bác sĩ</h2>

                <div className='p-6 flex space-x-4 justify-around'>
                    <div className="w-1/5 flex flex-col items-center text-center">
                        <div className="pt-4">
                            <img
                                src={doctor.image}
                                alt="Avatar"
                                className="w-32 h-32 object-cover rounded-full border"
                            />
                        </div>
                        <div className="mt-2 font-semibold">BS. {doctor.name}</div>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4 bg-main rounded border shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p>Họ tên</p>
                                <input
                                    name="name"
                                    className="mt-2 w-full p-2 border rounded outline-none"
                                    value={doctor.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <p>Chuyên khoa</p>
                                <input
                                    name="specialty"
                                    className="mt-2 w-full p-2 border rounded outline-none"
                                    value={doctor.specialty}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <p>Giới tính</p>
                                <select
                                    name="gender"
                                    className="w-full p-2 border rounded outline-none mt-2"
                                    value={doctor.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                            <div>
                                <p>Ngày sinh</p>
                                <input
                                    name="birthday"
                                    type="date"
                                    className="w-full p-2 border rounded outline-none mt-2"
                                    value={doctor.birthday}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <p>Số điện thoại</p>
                                <input
                                    name="phone"
                                    className="w-full p-2 border rounded outline-none mt-2"
                                    value={doctor.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <p>Email</p>
                                <input
                                    name="email"
                                    type="email"
                                    className="w-full p-2 border rounded outline-none mt-2"
                                    value={doctor.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <p>Địa chỉ</p>
                            <input
                                name="address"
                                className="w-full p-2 border rounded outline-none mt-2"
                                value={doctor.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <p>Link ảnh đại diện</p>
                            <input
                                name="image"
                                className="w-full p-2 border rounded outline-none mt-2"
                                value={doctor.image}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorEdit;
