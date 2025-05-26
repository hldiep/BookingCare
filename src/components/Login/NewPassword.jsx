import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
    const navigate = useNavigate();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp, mời nhập lại!");
            return;
        }
        setError("");
        alert("Mật khẩu đã được đặt lại! Vui lòng đăng nhập lại");
        navigate("/dang-nhap");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f7fa] relative px-4">
            <button
                onClick={() => navigate('/ma-xac-minh')}
                className="absolute top-6 left-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 px-4 py-2 transition-all duration-300"
            >
                <FaArrowLeft className="text-sm" />
                Quay lại
            </button>

            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-logo font-serif">ĐẶT LẠI MẬT KHẨU</h2>

                <form onSubmit={handleSubmit} >
                    <label className="block text-sm text-left mt-4">
                        <span className="block">Nhập mật khẩu mới</span>
                        <div className="relative">
                            <input
                                type={showPassword1 ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full p-2 border rounded-md text-gray-900 outline-none"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center mt-1"
                                onClick={() => setShowPassword1(!showPassword1)}
                            >
                                {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </label>

                    <label className="block text-sm text-left mt-4">
                        <span className="block">Xác nhận lại mật khẩu mới</span>
                        <div className="relative">
                            <input
                                type={showPassword2 ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 w-full p-2 border rounded-md text-gray-900 outline-none"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center mt-1"
                                onClick={() => setShowPassword2(!showPassword2)}
                            >
                                {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </label>

                    {error && (
                        <p className="text-red-600 mt-3 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full text-white font-semibold py-2 mt-4 bg-logo rounded-full hover:bg-yellow-600 transition-all duration-300"
                    >
                        Xác nhận
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewPassword