import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f7fa] relative px-4">
            <button
                onClick={() => navigate("/dang-nhap")}
                className="absolute top-6 left-6 italic text-blue-700 underline hover:text-blue-900 hover:scale-105 transition-all duration-300"
            >
                Quay lại
            </button>

            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-logo font-serif">QUÊN MẬT KHẨU</h2>
                <p className="text-center text-gray-600 text-sm mb-6">
                    Nhập địa chỉ email của bạn để nhận mã xác minh và tạo lại mật khẩu.
                </p>

                <form onSubmit={handleSubmit}>
                    <label className="block text-sm text-gray-700 font-medium mb-2">
                        Email
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full text-white font-semibold py-2 mt-4 bg-logo rounded-full hover:bg-yellow-600 transition-all duration-300"
                    >
                        GỬI MÃ XÁC MINH
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecoveryPassword;
