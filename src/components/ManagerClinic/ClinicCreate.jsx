import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { addClinic } from '../util/clinicApi';

const ClinicCreate = () => {
    const navigate = useNavigate();
    const [imagesFile, setImagesFile] = useState([]);

    const [clinic, setClinic] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        status: 'ACTIVE',
        images: [''],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClinic(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await addClinic({
                ...clinic,
                createdAt: new Date().toISOString(),
            });

            alert(result.message || 'Tạo phòng khám thành công!');
            navigate('/clinic');
        } catch (error) {
            alert(`Lỗi: ${error.message}`);
        }
    };

    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <button onClick={() => navigate('/clinic')} className="hover:underline text-blue-600">
                            Phòng khám
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thêm</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Thêm phòng khám</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">

                    {/* <div className="w-full md:w-1/3 bg-white p-4 rounded shadow space-y-4">
                        <p className="font-semibold text-center text-lg">Ảnh phòng khám</p>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                setImagesFile(files);
                                setClinic(prev => ({
                                    ...prev,
                                    images: files.map(file => URL.createObjectURL(file)),
                                }));
                            }}
                            className="w-full text-sm text-gray-600"
                        />

                        <div className="grid grid-cols-2 gap-2 pt-2">
                            {clinic.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Preview ${index}`}
                                    className="w-full h-24 object-cover rounded border"
                                />
                            ))}
                        </div>
                    </div> */}

                    <form
                        onSubmit={handleSubmit}
                        className="w-full bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên phòng khám</label>
                            <input
                                type="text"
                                name="name"
                                value={clinic.name}
                                onChange={handleChange}
                                required
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={clinic.address}
                                onChange={handleChange}
                                required
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={clinic.phone}
                                onChange={handleChange}
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={clinic.email}
                                onChange={handleChange}
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className='flex space-x-4 items-center text-center'>
                            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                            <select
                                name="status"
                                value={clinic.status}
                                onChange={handleChange}
                                disabled
                                className="p-1 text-sm outline-none block rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="ACTIVE">Hoạt động</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                            <textarea
                                name="description"
                                value={clinic.description}
                                onChange={handleChange}
                                className="outline-none mt-1 block w-full rounded border-gray-300 shadow-sm h-32 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                Tạo mới
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </ClippedDrawer>
    );
};

export default ClinicCreate;
