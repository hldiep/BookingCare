import React, { useEffect, useState } from 'react';
import { BadgeCheck, Ban, CheckCircle, Delete, Info, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchAllClinics } from '../util/clinicApi';

const ClinicManagement = () => {
    const navigate = useNavigate();
    const [clinicList, setClinicList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClinics = async () => {
            try {
                const data = await fetchAllClinics();
                setClinicList(data);
            } catch (error) {
                console.log("Lỗi tải danh sách phòng khám:", error);
            } finally {
                setLoading(false);
            }
        };
        loadClinics();
    }, []);

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button
                            onClick={() => navigate('/admin')}
                            className="hover:underline text-blue-600"
                        >
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Phòng khám</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Quản lý phòng khám</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <input
                            type="text"
                            className="flex-1 border px-3 py-2 rounded-md outline-none"
                            placeholder="Nhập tìm kiếm..."
                        />
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Tìm kiếm
                            </button>
                            <button
                                onClick={() => navigate('/clinic/create')}
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
                            {clinicList.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Không có phòng khám nào.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-3 w-24">STT</th>
                                            <th className="p-3">Tên phòng khám</th>
                                            <th className="p-3">Địa chỉ</th>
                                            <th className="p-3">Mô tả</th>
                                            <th className="p-3">SĐT</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3 w-28">Trạng thái</th>
                                            <th className="p-3 w-28">Ngày tạo</th>
                                            <th className="p-3 w-32 text-center">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clinicList.map((clinic, index) => (
                                            <tr key={clinic.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{clinic.name}</td>
                                                <td className="p-3">{clinic.address}</td>
                                                <td className="p-3">{clinic.description}</td>
                                                <td className="p-3">{clinic.phone}</td>
                                                <td className="p-3">{clinic.email}</td>
                                                <td className="p-3 font-medium">
                                                    {clinic.status === 'ACTIVE' ? (
                                                        <span className="text-green-600 flex items-center">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Hoạt động
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500 flex items-center">
                                                            <Ban className="w-4 h-4 mr-1" /> Tạm dừng
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3">{clinic.createdAt}</td>
                                                <td className="p-3 space-x-2 text-center">
                                                    <button
                                                        onClick={() => navigate('/clinic/edit')}
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                    {/* <button
                                                        onClick={() => navigate('/clinic/detail')}
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Details"
                                                    >
                                                        <Info className="w-4 h-4 text-gray-700" />
                                                    </button> */}
                                                    <button
                                                        className="p-1 border rounded hover:bg-gray-100"
                                                        title="Delete"
                                                    >
                                                        <Delete className="w-4 h-4 text-gray-700" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table >
                            )}
                        </div >
                    )}

                </div >
            </div >
        </ClippedDrawer >
    );
};

export default ClinicManagement;
