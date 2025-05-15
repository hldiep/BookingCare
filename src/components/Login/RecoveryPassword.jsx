import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'

const RecoveryPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            alert("Vui lòng nhập email.");
            return;
        }

        navigate("/ma-xac-minh");
    };
    return (
        <div
            className="min-h-screen bg-cover flex bg-center justify-center items-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
            <button
                onClick={() => navigate("/dang-nhap")}
                className="absolute top-4 left-4 italic font-bold text-highlight underline hover:text-blue-900 hover:scale-105 transition-all duration-300"
            >
                Quay lại
            </button>
            <div className="container">

                <div className='container max-w-xl w-full justify-center items-center text-center'>
                    <h2 className="text-2xl font-bold mb-4 font-georgia text-center text-highlight">QUÊN MẬT KHẨU</h2>

                    <form onSubmit={handleSubmit} className='border border-[#f9f0eb] mt-8 p-6 rounded-lg shadow-lg'>
                        <label className="block text-sm text-left mb-3">
                            <p className='flex items-center justify-center mb-2'>
                                <span>Nhập email để tạo mật khẩu mới</span>
                            </p>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full p-2 border rounded-md text-gray-900 outline-none"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className="text-white text-center mt-4 px-3 py-2 rounded-full bg-logo border border-transparent hover:bg-yellow-600 hover:bg-transparent transition-all duration-300"
                        >
                            GỬI MÃ XÁC MINH
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RecoveryPassword;
