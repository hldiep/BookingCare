import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Helper/AuthContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);

            const token = localStorage.getItem('token');
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const user = JSON.parse(atob(base64));

            const roles = (user?.role || []).map(r =>
                typeof r === 'object' && r.authority
                    ? r.authority.replace('ROLE_', '')
                    : ''
            );

            console.log('Roles:', roles);

            if (roles.includes('MANAGER')) {
                navigate('/admin');
            } else if (roles.includes('DOCTOR')) {
                navigate('/admin');
            } else {
                setError('Tài khoản không có quyền truy cập.');
            }
        } catch (err) {
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f7fa] relative px-4">
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 italic text-blue-700 underline hover:text-blue-900 hover:scale-105 transition-all duration-300"
            >
                Quay lại
            </button>

            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-2 text-logo font-serif">
                    ĐĂNG NHẬP
                </h2>
                <p className="text-center text-gray-600 text-base mb-8">
                    Chào mừng đến với hệ thống khám bệnh{' '}
                    <span className="text-logo font-semibold">HealthCARE</span>!
                </p>

                <form onSubmit={handleSubmit}>
                    <label className="block text-sm mb-4">
                        <span className="block text-gray-700 font-medium">
                            Tên tài khoản hoặc email
                        </span>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="outline-none mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </label>

                    <label className="block text-sm mb-2">
                        <span className="block text-gray-700 font-medium">Mật khẩu</span>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="outline-none mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="mt-1 absolute inset-y-0 right-3 flex items-center"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </label>

                    {error && <p className="text-red-600 text-sm italic mb-4">{error}</p>}

                    <div className="text-right mt-1 mb-4">
                        <Link
                            to="/quen-mat-khau"
                            className="text-sm text-blue-600 hover:underline italic"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white font-semibold py-2 bg-logo rounded-full hover:bg-yellow-600 transition-all duration-300"
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
