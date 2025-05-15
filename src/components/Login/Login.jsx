import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    return (
        <div
            className="min-h-screen bg-cover flex bg-center justify-center items-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
            <button
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 italic font-bold text-highlight underline hover:text-blue-900 hover:scale-105 transition-all duration-300"
            >
                Quay lại
            </button>
            <div className="container">
                <div className='container max-w-xl w-full justify-center items-center text-center'>
                    <div className="flex justify-center mb-4">
                        <h2 className="text-3xl font-bold mb-4 font-georgia text-center text-highlight">ĐĂNG NHẬP</h2>
                    </div>
                    <div className="flex justify-center mb-4">
                        <h2 className="text-xl  mb-4 text-center text-highlight">Chào mừng đến với hệ thống khám bệnh HealthCARE!</h2>
                    </div>
                    <div className=' text-black '>

                        <form className='border border-[#f9f0eb] mt-8 p-6 rounded-lg shadow-lg text-center'>
                            <label className="block text-sm text-left mb-3">
                                <span className="block">Tên tài khoản hoặc email</span>
                                <input
                                    type="text"
                                    name="username"
                                    className="mt-1 w-full p-2 border rounded-md text-gray-900 outline-none"
                                    required
                                />
                            </label>

                            <label className="block text-sm text-left mt-4">
                                <span className="block">Mật khẩu</span>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="mt-1 w-full p-2 border rounded-md text-gray-900 outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center mt-1"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </label>

                            <div className="text-right mt-2">
                                <Link to="/quen-mat-khau" className="text-sm text-blue-600 hover:underline italic">
                                    Quên mật khẩu?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="text-white text-center mt-4 px-3 py-2 rounded-full bg-logo border border-transparent hover:bg-yellow-600 hover:bg-transparent transition-all duration-300"
                            >
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>



            {/* <div className="w-1/2 bg-[#f9f0eb] text-highlight flex flex-col rounded-tr-lg rounded-br-lg justify-center items-center p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 font-georgia text-center text-highlight">ĐĂNG KÝ MỚI</h2>
                    <p className="mb-6 text-black">
                        Bạn muốn trở thành bác sĩ của HealthCare.
                        Đăng kí tài khoản ngay tại đây!
                    </p>
                    <Link
                        to="/register"
                        className='font-bold px-6 py-2 border text-logo border-logo rounded-full hover:bg-logo hover:text-white transition-all duration-500'
                    >
                        Đăng ký
                    </Link>
                </div> */}
        </div>

    );
};

export default Login;
