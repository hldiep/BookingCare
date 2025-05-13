import { Link } from "react-router-dom";
import React, { useState } from 'react'

const RecoveryPassword = () => {
    const [email, setEmail] = useState("");
    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className="container max-w-xl w-full">
                <main className="p-8 text-center">
                    <div className='mt-20 text-black'>
                        <h2 className="text-2xl font-bold mb-4 font-georgia text-center text-highlight">QUÊN MẬT KHẨU</h2>
                        <form className='border border-[#f9f0eb] mt-8 p-6 rounded-lg shadow-lg'>
                            <p className='flex items-center justify-center'>
                                <span>Nhập email để tạo mật khẩu mới</span>
                            </p>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-4 w-full p-2 border rounded-md text-gray-900 outline-none"
                                required
                                onInvalid={(e) => e.target.setCustomValidity("Vui lòng không để trống ô này")}
                                onInput={(e) => e.target.setCustomValidity("")}
                            />
                            <div className='mt-6'>
                                <Link
                                    to={email ? "/ma-xac-minh" : "#"}
                                    className="text-white text-center mt-4 px-4 py-2 rounded-full bg-logo border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300"
                                    onClick={(e) => !email && e.preventDefault()}
                                >
                                    GỬI MÃ XÁC MINH
                                </Link>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default RecoveryPassword