import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpecialtyDetail = () => {
    const navigate = useNavigate();

    const specialty = {
        id: 'MS01',
        name: 'Tim mạch',
        description: 'Khám và điều trị các bệnh lý liên quan đến tim (Cardiology - Heart-related diseases)',
        status: 'ACTIVE',
        doctors: ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B'],
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className="items-center p-2 border-b space-x-2 font-bold">
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/specialty")}>Chuyên khoa</button>
                    <span>{'>'}</span>
                    <span>Chi tiết</span>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Chi tiết chuyên khoa</h2>

                <div className="p-6 space-y-4">
                    <div className=" space-y-4">
                        <div>
                            <label className="font-semibold">Mã chuyên khoa:</label>
                            <p>{specialty.id}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Tên chuyên khoa:</label>
                            <p>{specialty.name}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Mô tả:</label>
                            <p>{specialty.description}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Trạng thái:</label>
                            <p className={specialty.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}>
                                {specialty.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm dừng'}
                            </p>
                        </div>

                        <div>
                            <label className="font-semibold">Danh sách bác sĩ:</label>
                            {specialty.doctors.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {specialty.doctors.map((doctor, index) => (
                                        <li key={index}>{doctor}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="italic text-gray-500">Chưa có bác sĩ nào.</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={() => navigate("/specialty")}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialtyDetail;
