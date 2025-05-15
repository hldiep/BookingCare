import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
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
        <div
            className="min-h-screen bg-cover flex bg-center justify-center items-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
            <button
                onClick={() => navigate("/ma-xac-minh")}
                className="absolute top-4 left-4 italic font-bold text-highlight underline hover:text-blue-900 hover:scale-105 transition-all duration-300"
            >
                Quay lại
            </button>

            <div className="container">
                <div className='container max-w-xl w-full justify-center items-center text-center'>
                    <div className="flex justify-center mb-4">
                        <h2 className="text-2xl font-bold mb-4 font-georgia text-center text-highlight">ĐẶT LẠI MẬT KHẨU</h2>
                    </div>
                    <form onSubmit={handleSubmit} className='border border-[#f9f0eb] mt-8 p-6 rounded-lg shadow-lg'>
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
                            className="text-white text-center mt-4 px-3 py-2 rounded-full bg-logo border border-transparent hover:bg-yellow-600 hover:bg-transparent transition-all duration-300"
                        >
                            Xác nhận
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPassword