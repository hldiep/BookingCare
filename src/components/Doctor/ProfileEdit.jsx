import React, { useState } from 'react';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { Link } from 'react-router-dom';

const ProfileEdit = () => {
    const initialDoctor = {
        id: 1,
        name: "Nguyễn Văn A",
        avatarUrl: "https://bvbinhdan.com.vn/vnt_upload/treatment/thumbs/(270x320)__OQ6UTW0.jpg",
        email: 'example@gmail.com',
        phone: '0366253623',
        specialty: 'Ngoại khoa',
        room: 'Khu D, tầng 3, phòng 303',
        status: 'Đang hoạt động',
        role: 'Bác sĩ',
        education: [
            'Tốt nghiệp Bác sĩ Đa khoa, Trường Đại học Y dược thành phố Hồ Chí Minh',
            'Học chuyên khoa cấp II chuyên ngành Tâm thần, Đại học Y khoa Huế',
            'Tốt nghiệp Tâm lý trị liệu, trường Tâm lý thực Hành Paris (Psychology practique de Paris)',
        ],
        experience: [
            'Nguyên Trưởng phòng Kế hoạch Nghiệp vụ, Trưởng phòng khám Tâm thần Quận 3, thành phố Hồ Chí Minh',
            'Nguyên Trưởng khoa lâm sàng Bệnh tâm thần thành phố Hồ Chí Minh',
            'Giám định viên tư pháp chuyên ngành Tâm thần giám định các trường hợp trọng án, các trường hợp có liên quan pháp lý do cảnh sát điều tra, tòa án các cấp trưng cầu.',
        ],
    };

    const [doctor, setDoctor] = useState(initialDoctor);

    const handleChange = (field) => (e) => {
        setDoctor({ ...doctor, [field]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Lưu thông tin bác sĩ:', doctor);
        alert('Thông tin bác sĩ đã được cập nhật!');
    };

    return (
        <ClippedDrawer>
            <div>
                {/* Sticky Breadcrumb + Header */}
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <Link to="/admin" className="hover:underline text-blue-600">
                            Dashboard
                        </Link>
                        <span>/</span>
                        <Link to="/profile" className="hover:underline text-blue-600">
                            Thông tin cá nhân
                        </Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Chỉnh sửa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chỉnh sửa thông tin bác sĩ</h2>
                </div>

                <div className="min-h-screen  ">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6  space-y-8"
                    >
                        {/* Avatar và thông tin chính */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar giống DoctorProfile */}
                            <div className="flex justify-center md:justify-start md:flex-shrink-0">
                                <img
                                    src={doctor.avatarUrl}
                                    alt="Doctor Avatar"
                                    className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md object-cover"
                                />
                            </div>

                            {/* Form input thông tin */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                                <div>
                                    <label className="block font-semibold mb-1 text-gray-800">Tên bác sĩ</label>
                                    <input
                                        type="text"
                                        value={doctor.name}
                                        onChange={handleChange('name')}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-gray-800">Email</label>
                                    <input
                                        type="email"
                                        value={doctor.email}
                                        onChange={handleChange('email')}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-gray-800">Số điện thoại</label>
                                    <input
                                        type="text"
                                        value={doctor.phone}
                                        onChange={handleChange('phone')}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-gray-800">Chuyên khoa</label>
                                    <input
                                        type="text"
                                        value={doctor.specialty}
                                        onChange={handleChange('specialty')}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-gray-800">Phòng</label>
                                    <input
                                        type="text"
                                        value={doctor.room}
                                        onChange={handleChange('room')}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-gray-800">Trạng thái</label>
                                    <select
                                        value={doctor.status}
                                        onChange={handleChange('status')}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                                    >
                                        <option>Đang hoạt động</option>
                                        <option>Ngừng hoạt động</option>
                                        <option>Đang nghỉ phép</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Quá trình học vấn */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-800">
                                Quá trình học vấn (mỗi dòng 1 mục)
                            </label>
                            <textarea
                                rows={5}
                                value={doctor.education.join('\n')}
                                onChange={(e) => setDoctor({ ...doctor, education: e.target.value.split('\n') })}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-blue-500"
                            />
                        </div>

                        {/* Kinh nghiệm công tác */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-800">
                                Kinh nghiệm công tác (mỗi dòng 1 mục)
                            </label>
                            <textarea
                                rows={5}
                                value={doctor.experience.join('\n')}
                                onChange={(e) => setDoctor({ ...doctor, experience: e.target.value.split('\n') })}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-blue-500"
                            />
                        </div>

                        {/* Nút lưu */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default ProfileEdit;
