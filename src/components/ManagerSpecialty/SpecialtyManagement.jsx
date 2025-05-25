import React, { useEffect, useState } from 'react';
import { Pencil, Info, Delete, CheckCircle, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchAllSpecialty } from '../util/specialtyApi';
import { fetchAllDoctors } from '../util/doctorApi';

const SpecialtyManagement = () => {
    const navigate = useNavigate();
    // const [specialties, setSpecialties] = useState([
    //     {
    //         id: 'MS01',
    //         name: 'Tim mạch',
    //         description: 'Khám và điều trị các bệnh lý liên quan đến tim (Cardiology - Heart-related diseases)',
    //         status: 'ACTIVE',
    //         doctors: ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B'],
    //     },
    //     {
    //         id: 'MS02',
    //         name: 'Da liễu',
    //         description: 'Chẩn đoán và điều trị các bệnh về da, tóc và móng (Dermatology - Skin, hair, and nail diseases)',
    //         status: 'ACTIVE',
    //         doctors: ['Dr. Lê Văn C'],
    //     },
    //     {
    //         id: 'MS03',
    //         name: 'Nhi khoa',
    //         description: 'Chăm sóc sức khỏe cho trẻ sơ sinh và trẻ nhỏ (Pediatrics - Healthcare for children)',
    //         status: 'DELETING',
    //         doctors: [],
    //     },
    // ]);
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             const data = await fetchAllSpecialty();
    //             setSpecialties(data);
    //         } catch (error) {
    //             console.error("Lỗi tải danh sách chuyên khoa:", error);
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     }
    //     loadData();
    // }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [specialtyData, doctorData] = await Promise.all([
                    fetchAllSpecialty(),
                    fetchAllDoctors()
                ]);
                const specialtiesWithDoctors = specialtyData.map(specialty => {
                    const relatedDoctors = doctorData.filter(
                        doctor => doctor.medicalSpecialtyId === specialty.id
                    );
                    return {
                        ...specialty,
                        doctors: relatedDoctors,
                    };
                });

                setSpecialties(specialtiesWithDoctors);
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            }
            finally {
                setLoading(false);
            }
        }
        loadData();
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
                        <span className="text-gray-700 font-medium">Chuyên khoa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý chuyên khoa</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <input
                            type="text"
                            className="flex-1 border px-3 py-2 rounded-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tìm kiếm</button>
                            <button
                                onClick={() => navigate('/specialty/create')}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Tạo mới
                            </button>
                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                    ) : (
                        <div className="overflow-x-auto bg-white border rounded shadow-sm">
                            {specialties.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Không có chuyên khoa nào.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-3 border-r w-20">STT</th>
                                            <th className="p-3 border-r">Tên chuyên khoa</th>
                                            <th className="p-3 border-r">Mô tả</th>
                                            <th className="p-3 border-r">Bác sĩ</th>
                                            <th className="p-3 border-r w-28">Trạng thái</th>
                                            <th className="p-3 w-32 text-center">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {specialties.map((item, index) => (
                                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3 border-r font-medium">{index + 1}</td>
                                                <td className="p-3 border-r">{item.name}</td>
                                                <td className="p-3 border-r">{item.description}</td>
                                                <td className="p-3 border-r">
                                                    {Array.isArray(item.doctors) && item.doctors.length > 0 ? (
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {item.doctors.map((doc, idx) => (
                                                                <li key={idx}>{doc.name}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-gray-500 italic">Chưa có</span>
                                                    )}
                                                </td>
                                                <td className="p-3 font-medium">
                                                    {item.status === 'ACTIVE' ? (
                                                        <span className="text-green-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Tạm dừng
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3 text-center space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/specialty/edit/${item.id}`)}
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <Pencil className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                    {/* <button
                                                        onClick={() => navigate(`/specialty/detail/${item.id}`)}
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Chi tiết"
                                                    >
                                                        <Info className="w-4 h-4 text-gray-700" />
                                                    </button> */}
                                                    <button
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Xóa"
                                                    >
                                                        <Delete className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default SpecialtyManagement;
