import React, { useState } from 'react';

const DoctorAddForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        name: '',
        gender: 'male',
        birthday: '',
        address: '',
        specialty: '',
        phone: '',
        email: '',
        status: 'ACTIVE',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ ...form, gender: form.gender === 'male' });
        }
        setForm({
            name: '',
            gender: 'male',
            birthday: '',
            address: '',
            specialty: '',
            phone: '',
            email: '',
            status: 'ACTIVE',
            image: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Thêm bác sĩ mới</h2>

            <input name="name" value={form.name} onChange={handleChange} required
                className="w-full p-2 border rounded" placeholder="Họ tên" />

            <div className="flex gap-4">
                <select name="gender" value={form.gender} onChange={handleChange} className="w-1/2 p-2 border rounded">
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                </select>
                <input name="birthday" type="date" value={form.birthday} onChange={handleChange}
                    className="w-1/2 p-2 border rounded" required />
            </div>

            <input name="specialty" value={form.specialty} onChange={handleChange}
                className="w-full p-2 border rounded" placeholder="Chuyên khoa" required />

            <input name="phone" value={form.phone} onChange={handleChange}
                className="w-full p-2 border rounded" placeholder="Số điện thoại" required />

            <input name="email" value={form.email} onChange={handleChange}
                className="w-full p-2 border rounded" placeholder="Email" type="email" required />

            <input name="address" value={form.address} onChange={handleChange}
                className="w-full p-2 border rounded" placeholder="Địa chỉ" required />

            <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="ACTIVE">Đang hoạt động</option>
                <option value="DELETING">Đang xoá</option>
            </select>

            <input name="image" value={form.image} onChange={handleChange}
                className="w-full p-2 border rounded" placeholder="Link ảnh đại diện" />

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Thêm bác sĩ
            </button>
        </form>
    );
};

export default DoctorAddForm;
