import { KeyRound, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { Link } from 'react-router-dom';

const Security = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError('');
    };

    const togglePassword = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = form;

        if (currentPassword === newPassword) {
            setError("Mật khẩu mới không được trùng với mật khẩu hiện tại.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Xác nhận mật khẩu không khớp.");
            return;
        }

        console.log("Mật khẩu đã đổi:", form);
        alert("Đổi mật khẩu thành công!");
        setForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    return (
        <ClippedDrawer>
            <div>
                {/* Breadcrumb */}
                <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                        <Link to="/admin" className="hover:underline text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">Bảo mật</span>
                    </div>
                    <h2 className="text-xl font-semibold p-4">Đổi mật khẩu</h2>
                </div>

                {/* Form */}
                <div className="min-h-screen bg-main py-6 px-4">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-xl mx-auto bg-white shadow rounded p-6 space-y-6 border"
                    >
                        <h3 className="font-bold text-lg border-b pb-2 flex items-center space-x-2">
                            <KeyRound size={20} />
                            <span>Mật khẩu</span>
                        </h3>

                        {/* Mật khẩu hiện tại */}
                        <div className="relative">
                            <label className="block text-sm font-medium mb-1">Mật khẩu hiện tại</label>
                            <input
                                type={showPassword.current ? 'text' : 'password'}
                                name="currentPassword"
                                value={form.currentPassword}
                                onChange={handleChange}
                                className="w-full p-2 border rounded outline-none pr-10"
                                required
                            />
                            <span
                                className="absolute top-9 right-3 cursor-pointer text-gray-500"
                                onClick={() => togglePassword('current')}
                            >
                                {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        {/* Mật khẩu mới */}
                        <div className="relative">
                            <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
                            <input
                                type={showPassword.new ? 'text' : 'password'}
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                className="w-full p-2 border rounded outline-none pr-10"
                                required
                            />
                            <span
                                className="absolute top-9 right-3 cursor-pointer text-gray-500"
                                onClick={() => togglePassword('new')}
                            >
                                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        {/* Xác nhận mật khẩu */}
                        <div className="relative">
                            <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
                            <input
                                type={showPassword.confirm ? 'text' : 'password'}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-2 border rounded outline-none pr-10"
                                required
                            />
                            <span
                                className="absolute top-9 right-3 cursor-pointer text-gray-500"
                                onClick={() => togglePassword('confirm')}
                            >
                                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
                            >
                                Lưu lại
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default Security;
