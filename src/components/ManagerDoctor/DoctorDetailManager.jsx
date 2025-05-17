import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDetail = () => {
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

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button
                        onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button
                        onClick={() => navigate("/doctor")}>Bác sĩ</button>
                    <span>{'>'}</span>
                    <button>Thông tin</button>
                </div>
                <h2 className="text-2xl p-2 font-semibold border-b">Thông tin bác sĩ</h2>
                <div className='p-6 flex space-x-4 justify-around'>
                    <div className="w-1/5 flex flex-col items-center  text-center">
                        <div className="pt-4">
                            <img
                                src={doctor.image}
                                alt="Avatar"
                                className="w-32 h-32 object-cover rounded-full border"
                            />
                        </div>
                        <div className="mt-2 font-semibold">BS. {doctor.name}</div>
                    </div>

                    <form className=" max-w-2xl mx-auto p-6 space-y-4 bg-main rounded border shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className=''>
                                <p>Họ tên </p>
                                <input
                                    name="name"
                                    className="mt-2 w-full p-2 border rounded outline-none"
                                    placeholder="Họ tên"
                                    value={doctor.name}
                                    readOnly
                                />
                            </div>
                            <div className=''>
                                <p>Chuyên khoa </p>
                                <input
                                    name="specialty"
                                    className="mt-2 w-full p-2 border rounded outline-none"
                                    placeholder="Chuyên khoa"
                                    value={doctor.specialty}
                                    readOnly
                                />
                            </div>
                            <div className="">
                                <p>Giới tính</p>
                                <select
                                    name="gender"
                                    className="w-1/2 p-2 border rounded outline-none mt-2"
                                    value={doctor.gender}
                                    disabled
                                >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                            <div className="">
                                <p>Ngày sinh</p>
                                <input
                                    name="birthday"
                                    type="date"
                                    className="w-full p-2 border rounded outline-none mt-2"
                                    value={doctor.birthday}
                                    readOnly
                                />
                            </div>
                            <div>
                                <p>Số điện thoại</p>
                                <input
                                    name="phone"
                                    className="w-full p-2 border rounded outline-none mt-2"
                                    placeholder="Số điện thoại"
                                    value={doctor.phone}
                                    readOnly
                                />
                            </div>
                            <div>
                                <p>Email</p>
                                <input
                                    name="email"
                                    type="email"
                                    className="w-full p-2 border rounded outline-none mt-2"
                                    placeholder="Email"
                                    value={doctor.email}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div>
                            <p>Địa chỉ</p>
                            <input
                                name="address"
                                className="w-full p-2 border rounded outline-none mt-2"
                                placeholder="Địa chỉ"
                                value={doctor.address}
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;
