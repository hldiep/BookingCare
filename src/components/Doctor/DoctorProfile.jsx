import React from 'react';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { useNavigate, Link } from 'react-router-dom';

const DoctorProfile = () => {
    const navigate = useNavigate();
    const doctor = {
        id: 1,
        name: "Nguyễn Văn A",
        avatarUrl: "https://bvbinhdan.com.vn/vnt_upload/treatment/thumbs/(270x320)__OQ6UTW0.jpg",
        email: 'example@gmail.com',
        phone: '0366253623',
        specialty: 'Ngoại khoa',
        room: 'Khu D, tầng 3, phòng 303',
        status: 'Đang hoạt động',
        role: 'Bác sĩ',
        createdAt: '2022-11-02 21:12:20',
        updatedAt: '2022-12-14 09:10:32',
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

    return (
        <ClippedDrawer>
            <div>
                {/* Breadcrumb */}
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <Link to="/admin" className="hover:underline text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thông tin cá nhân</span>
                    </div>

                    {/* Header */}
                    <h2 className="text-xl font-semibold p-4">Thông tin cá nhân</h2>
                </div>

                {/* Content */}
                <div className="min-h-screen bg-main p-6">
                    <div className="mt-4 flex flex-col md:flex-row gap-6">
                        <div className="flex justify-center md:block">
                            <img
                                src={doctor.avatarUrl}
                                alt="Doctor Avatar"
                                className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
                            />
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div><span className="font-semibold">Mã số bác sĩ:</span> {doctor.id}</div>
                            <div><span className="font-semibold">Email:</span> <strong>{doctor.email}</strong></div>
                            <div><span className="font-semibold">Tên:</span> <strong>{doctor.name}</strong></div>
                            <div><span className="font-semibold">Chuyên khoa:</span> {doctor.specialty}</div>
                            <div><span className="font-semibold">Số điện thoại:</span> {doctor.phone}</div>
                            <div><span className="font-semibold">Phòng:</span> <strong>{doctor.room}</strong></div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Mô tả</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {doctor.education.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Quá trình công tác</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {doctor.experience.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                        <div><span className="font-semibold">Trạng thái:</span> <span className="text-green-600">{doctor.status}</span></div>
                        <div><span className="font-semibold">Vai trò:</span> {doctor.role}</div>
                        <div><span className="font-semibold">Khởi tạo:</span> {doctor.createdAt}</div>
                        <div><span className="font-semibold">Cập nhật lần cuối:</span> {doctor.updatedAt}</div>
                    </div>

                    <div className="mt-6 text-right">
                        <button
                            onClick={() => navigate('/profile/edit')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Cập nhật thông tin
                        </button>
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default DoctorProfile;
