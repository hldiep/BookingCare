import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchAllSpecialtyManager, updateSpecialty } from '../util/specialtyApi';

const SpecialtyEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [specialty, setSpecialty] = useState({
        id: '',
        name: '',
        description: '',
        status: 'ACTIVE',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSpecialty((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        const fetchSp = async () => {
            try {
                const sp = await fetchAllSpecialtyManager();
                const target = sp.find(c => c.id === id);
                if (target) setSpecialty(target);
            } catch (error) {
                console.log('Lỗi', error);
            }
        }
        fetchSp();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSpecialty(specialty);
            alert('Đã lưu thay đổi!');
            navigate('/specialty');
        } catch (error) {
            alert("Cập nhật thất bại: " + error.message);
        }
    };

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
                        <span className="text-gray-700 font-medium">Chỉnh sửa</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Chỉnh sửa chuyên khoa</h2>
                </div>


                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)]">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div>
                            <label
                                htmlFor="id"
                                className="block text-sm font-medium mb-1"
                            >
                                Mã chuyên khoa:
                            </label>
                            <input
                                id="id"
                                type="text"
                                name="id"
                                value={specialty.id}
                                readOnly
                                className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-1"
                            >
                                Tên chuyên khoa:
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={specialty.name}
                                onChange={handleChange}
                                className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium mb-1"
                            >
                                Mô tả:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={specialty.description}
                                onChange={handleChange}
                                rows={4}
                                className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
                            />
                        </div>

                        <div className='flex space-x-4 items-center text-center'>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium"
                            >
                                Trạng thái:
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={specialty.status}
                                onChange={handleChange}
                                className="text-sm outline-none block rounded border border-gray-300 bg-gray-100 p-2 shadow-sm"
                            >
                                <option value="ACTIVE">Hoạt động</option>
                                <option value="DELETING">Tạm dừng</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 flex space-x-4 pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Lưu
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
            </div>
        </ClippedDrawer>
    );
};

export default SpecialtyEdit;
