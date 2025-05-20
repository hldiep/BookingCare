import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const VerifyCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "email của bạn";

    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!verificationCode) {
            setError("Vui lòng nhập mã xác minh.");
            setSuccess(false);
            return;
        }

        if (/^\d{6}$/.test(verificationCode)) {
            setSuccess(true);
            setError("");
            setTimeout(() => navigate("/mat-khau-moi"), 1000);
        } else {
            setError("Mã xác minh phải gồm 6 chữ số.");
            setSuccess(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f7fa] relative px-4">
            <button
                onClick={() => navigate("/quen-mat-khau")}
                className="absolute top-4 left-4 italic text-highlight underline hover:text-blue-900 hover:scale-105 transition-all duration-300"
            >
                Quay lại
            </button>

            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-logo font-serif">XÁC MINH MÃ</h2>
                <p className="text-sm mb-4 text-center">
                    Nhập mã xác minh đã gửi đến <strong>{email}</strong>
                </p>
                <form onSubmit={handleSubmit} >

                    <input
                        type="text"
                        maxLength={6}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="mt-2 w-full p-2 border rounded-md text-gray-900 outline-none text-center text-xl tracking-widest"
                        placeholder="------"
                        required
                        onInvalid={(e) => e.target.setCustomValidity("Vui lòng không để trống ô này")}
                        onInput={(e) => e.target.setCustomValidity("")}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-700 text-sm mt-2">Mã hợp lệ! Đang chuyển hướng...</p>}
                    <button
                        type="submit"
                        className="w-full text-white font-semibold py-2 mt-4 bg-logo rounded-full hover:bg-yellow-600 transition-all duration-300"
                    >
                        XÁC NHẬN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyCode;
