import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Helper/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // NEW
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
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

            if (roles.includes('MANAGER') || roles.includes('DOCTOR')) {
                navigate('/admin');
            } else {
                setError('Tài khoản không có quyền truy cập.');
            }
        } catch (err) {
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f7fa] relative px-4">
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 px-4 py-2 transition-all duration-300"
            >
                <FaArrowLeft className="text-sm" />
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
                            state={{ fromLogin: true }}
                            className="text-sm text-blue-600 hover:underline italic"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white font-semibold py-2 rounded-full transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-logo hover:bg-yellow-600'
                            }`}
                    >
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
