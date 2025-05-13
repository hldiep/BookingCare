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
            setTimeout(() => navigate("/dang-nhap"), 1000);
        } else {
            setError("Mã xác minh phải gồm 6 chữ số.");
            setSuccess(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className="container max-w-xl w-full">
                <main className="p-8 text-center">
                    <div className='mt-20 text-white'>
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
                                {success && <p className="text-green-500 text-sm mt-2">Mã hợp lệ! Đang chuyển hướng...</p>}
                                <button
                                    type="submit"
                                    className="text-white text-center mt-4 px-3 py-2 rounded-full bg-logo border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300"
                                >
                                    XÁC NHẬN
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default VerifyCode;