import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { sendOtpToEmail } from "../Helper/AuthContext";

const RecoveryPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!location.state?.fromLogin) {
            navigate('/dang-nhap');
        }
    }, [location, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Email không hợp lệ.");
            return;
        }

        try {
            setLoading(true);
            await sendOtpToEmail(email);
            navigate("/ma-xac-minh", { state: { email } });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f7fa] relative px-4">
            <button
                onClick={() => navigate('/dang-nhap')}
                className="absolute top-6 left-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 px-4 py-2 transition-all duration-300"
            >
                <FaArrowLeft className="text-sm" />
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
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white font-semibold py-2 mt-4 rounded-full transition-all duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-logo hover:bg-yellow-600'
                            }`}
                    >
                        {loading ? "Đang gửi..." : "GỬI MÃ XÁC MINH"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default RecoveryPassword;