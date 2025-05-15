import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const VerifyCode = ({ email }) => {
    const navigate = useNavigate();
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
        <div
            className="min-h-screen bg-cover flex bg-center justify-center items-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
            <button
                onClick={() => navigate("/quen-mat-khau")}
                className="absolute top-4 left-4 italic font-bold text-highlight underline hover:text-blue-900 hover:scale-105 transition-all duration-300"
            >
                Quay lại
            </button>
            <div className="container">
                <div className='container max-w-xl w-full justify-center items-center text-center'>
                    <div className='text-white'>
                        <h2 className="text-2xl font-bold mb-4 font-georgia text-center text-highlight">XÁC MINH MÃ</h2>
                        <div className='border border-[#f9f0eb] mt-8 p-6 rounded-lg shadow-lg text-black'>
                            <form onSubmit={handleSubmit} className='text-sm p-6 text-center items-center'>
                                <p className='mb-4'>Nhập mã xác minh đã gửi đến <strong>{email}</strong></p>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="mt-2 w-full p-2 border rounded-md text-gray-900 outline-none text-center text-xl tracking-widest"
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Vui lòng không để trống ô này")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                {success && <p className="text-green-700 text-sm mt-2">Mã hợp lệ! Đang chuyển hướng...</p>}
                                <button
                                    type="submit"
                                    className="text-white text-center mt-4 px-3 py-2 rounded-full bg-logo border border-transparent hover:bg-yellow-600 hover:bg-transparent transition-all duration-300"
                                >
                                    XÁC NHẬN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyCode;