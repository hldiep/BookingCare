import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { addSpecialty } from '../util/specialtyApi';
import { fetchAllDoctorsManager } from '../util/doctorApi';

const SpecialtyCreate = () => {
    const navigate = useNavigate();
    // const [doctor, setDoctor] = useState([]);
    const [specialty, setSpecialty] = useState({
        id: '',
        name: '',
        description: '',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        doctors: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSpecialty((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addSpecialty({
                ...specialty,
                createdAt: new Date().toISOString(),
            });
            alert(result.message || 'Tạo chuyên khoa thành công!');
            navigate('/specialty');
        } catch (error) {
            alert(`Lỗi: ${error.message}`);
        }
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await fetchAllDoctorsManager();
    //             setDoctor(data);
    //         } catch (err) {
    //             console.error('Không thể tải bác sĩ');
    //         }
    //     };
    //     fetchData();
    // }, []);
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
                        <button
                            onClick={() => navigate('/specialty')}
                            className="hover:underline text-blue-600"
                        >
                            Chuyên khoa
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thêm mới</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Tạo chuyên khoa mới</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)]">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Tên chuyên khoa
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={specialty.name}
                                onChange={handleChange}
                                required
                                className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                value={specialty.description}
                                onChange={handleChange}
                                rows={4}
                                className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none "
                            />
                        </div>

                        <div className='flex space-x-4 items-center text-center'>
                            <label className="block text-sm font-medium">
                                Trạng thái
                            </label>
                            <select
                                name="status"
                                value={specialty.status}
                                onChange={handleChange}
                                disabled
                                className="p-1 text-sm outline-none block rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="ACTIVE">Hoạt động</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Tạo mới
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/specialty')}
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </ClippedDrawer >
    );
};

export default SpecialtyCreate;
