import React from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorAddForm from './DoctorAddForm';

const DoctorAddPage = () => {
    const navigate = useNavigate();

    // Hàm nhận data bác sĩ mới từ form
    const handleAddDoctor = (newDoctor) => {
        // TODO: Bạn nên gọi API backend hoặc lưu trạng thái tại parent (nếu dùng context hoặc redux)
        // Hiện tại, giả sử thêm thành công, quay về trang danh sách:
        alert('Đã thêm bác sĩ mới:\n' + JSON.stringify(newDoctor, null, 2));
        navigate('/doctors');
    };

    return (
        <div className="p-6 mt-20 ml-56">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6">Thêm mới bác sĩ</h2>
                <DoctorAddForm onSubmit={handleAddDoctor} />
                <button
                    onClick={() => navigate('/doctor')}
                    className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default DoctorAddPage;
