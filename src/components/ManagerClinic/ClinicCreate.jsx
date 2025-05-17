import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClinicCreate = () => {
    const navigate = useNavigate();

    const [clinic, setClinic] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        status: 'active',
        images: [''],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClinic(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...clinic.images];
        updatedImages[index] = value;
        setClinic(prev => ({
            ...prev,
            images: updatedImages,
        }));
    };

    const addImageField = () => {
        setClinic(prev => ({
            ...prev,
            images: [...prev.images, ''],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Phòng khám mới:', clinic);
        alert('Đã tạo phòng khám mới!');
        navigate('/clinic');
    };

    return (
        <div className="flex">
            <div className="flex-1 pt-[65px] ml-64 min-h-screen bg-main">
                <div className='items-center p-2 border-b space-x-2 font-bold'>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <span>{'>'}</span>
                    <button onClick={() => navigate("/clinic")}>Phòng khám</button>
                    <span>{'>'}</span>
                    <button>Thêm mới</button>
                </div>

                <h2 className="text-2xl p-2 font-semibold border-b">Thêm mới phòng khám</h2>

                <form onSubmit={handleSubmit} className='p-6 flex space-x-6 justify-around'>
                    <div className="w-1/4 space-y-4">
                        <div>
                            <label className="font-semibold block mb-1">Tên phòng khám</label>
                            <input
                                type="text"
                                name="name"
                                value={clinic.name}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={clinic.address}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={clinic.phone}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded outline-none"
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={clinic.email}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded outline-none"
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">Trạng thái</label>
                            <select
                                name="status"
                                value={clinic.status}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded outline-none"
                            >
                                <option value="active">Hoạt động</option>
                                <option value="pause">Tạm ngừng</option>
                                <option value="inactive">Không hoạt động</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">Mô tả</label>
                            <textarea
                                name="description"
                                value={clinic.description}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded h-32 outline-none"
                            />
                        </div>

                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Tạo mới
                        </button>
                    </div>

                    <div className="w-3/5">
                        <p className="font-semibold text-lg mb-2">Hình ảnh phòng khám</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {clinic.images.map((img, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={img}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        className="w-full border px-3 py-2 rounded outline-none mb-2"
                                        placeholder={`Link ảnh ${index + 1}`}
                                    />
                                    {img && (
                                        <img
                                            src={img}
                                            alt={`Ảnh ${index + 1}`}
                                            className="w-full h-40 object-cover rounded shadow"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addImageField}
                            className="mt-4 px-4 py-2 rounded border text-sm text-gray-700 hover:bg-gray-100"
                        >
                            + Thêm ảnh
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClinicCreate;
