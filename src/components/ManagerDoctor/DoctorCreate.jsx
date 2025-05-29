import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { addDoctor } from '../util/doctorApi';
import { fetchAllSpecialty } from '../util/specialtyApi';

const DoctorCreate = () => {
    const navigate = useNavigate();
    const [specialties, setSpecialties] = useState([]);
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const data = await fetchAllSpecialty();
                setSpecialties(data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
            }
        };
        fetchSpecialties();
    }, []);
    const [formData, setFormData] = useState({
        id: '',
        account: {
            username: '',
            password: '',
            roleId: 3,
            status: 'ACTIVE',
        },
        medicalSpecialtyId: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        gender: true,
        status: 'ACTIVE',
        imageFile: '',
        birthday: '',
        description: '',
        qualification: '',
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        let newValue = value;
        if (type === 'radio' && name === 'gender') {
            newValue = value === 'true';
        }

        if (name.startsWith('account.')) {
            const key = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                account: {
                    ...prev.account,
                    [key]: newValue,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const doctorData = {
            ...formData,
            createdAt: new Date().toISOString(),
            birthday: formData.birthday,
        };
        try {
            const response = await addDoctor(doctorData);
            alert(response.message || 'Thêm bác sĩ thành công!');
            navigate('/doctor');
        } catch (error) {
            console.error("Lỗi:", error);
        };

    }
    return (
        <ClippedDrawer>
            <div>
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                            Dashboard
                        </button>
                        <span>/</span>
                        <button onClick={() => navigate('/doctor')} className="hover:underline text-blue-600">
                            Bác sĩ
                        </button>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Thêm</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Thêm bác sĩ</h2>
                </div>

                <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-[calc(100vh-80px)] flex flex-col md:flex-row md:space-x-6">

                    <div className="w-full md:w-1/5 flex flex-col items-center text-center bg-white p-4 rounded shadow">
                        <img
                            src={formData.imageFile || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
                            alt="Avatar bác sĩ"
                            className="w-32 h-32 object-cover rounded-full border"
                        />
                        <div className="mt-4 font-semibold text-lg">
                            {formData.name ? `BS. ${formData.name}` : 'Ảnh đại diện'}
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className=" md:w-4/5 bg-white rounded shadow text-sm"
                    >
                        <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-1 font-medium">Tên đăng nhập *</label>
                                <input
                                    type="text"
                                    name="account.username"
                                    value={formData.account.username}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Mật khẩu *</label>
                                <input
                                    type="password"
                                    name="account.password"
                                    value={formData.account.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Họ tên *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Chuyên khoa *</label>
                                <select
                                    name="medicalSpecialtyId"
                                    value={formData.medicalSpecialtyId}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                >
                                    <option value="">Chọn chuyên khoa</option>
                                    {specialties.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Số điện thoại *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Giới tính *</label>
                                <div className="flex gap-6">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="true"
                                            checked={formData.gender === true}
                                            onChange={handleChange}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Nam</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="false"
                                            checked={formData.gender === false}
                                            onChange={handleChange}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Nữ</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Trạng thái *</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    disabled
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                >
                                    <option value="ACTIVE">Hoạt động</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Ngày sinh</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Ảnh đại diện (URL)</label>
                                <input
                                    type="text"
                                    name="imageFile"
                                    value={formData.imageFile}
                                    onChange={handleChange}
                                    placeholder="URL hình ảnh"
                                    className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                                />
                            </div>
                        </div>
                        <div className='px-6 py-3'>
                            <label className="block mb-1 font-medium">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                            />
                        </div>
                        <div className='px-6 py-3'>
                            <label className="block mb-1 font-medium">Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="resize-none mt-1 block w-full rounded border p-2 text-sm outline-none"
                            />
                        </div>

                        <div className='px-6 py-3'>
                            <label className="block mb-1 font-medium">Trình độ</label>
                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                placeholder="Ví dụ: Bác sĩ chuyên khoa I"
                                className="mt-1 block w-full rounded border p-2 text-sm outline-none"
                            />
                        </div>

                        <div className='px-6 py-3'>
                            <button
                                type="submit"
                                className="px-3 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                            >
                                Thêm bác sĩ
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </ClippedDrawer>
    );
};

export default DoctorCreate;
