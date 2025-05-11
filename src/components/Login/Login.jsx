import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className="container max-w-xl w-full">
                <main className="p-8 text-center">
                    <div className='mt-20 '>
                        <span className='uppercase font-georgia text-nav font-bold text-3xl'>Đăng Nhập</span>
                        <form
                            className='border border-nav mt-8 p-6 rounded-lg shadow-lg'
                        // onSubmit={handleSubmit}
                        >
                            <label className="block text-left text-sm">
                                Tên tài khoản hoặc email
                                <input
                                    type="text"
                                    name="username"
                                    className="mt-2 w-full p-2 border rounded-md text-gray-900 outline-none"
                                    required
                                />
                            </label>

                            <label className="block text-left text-sm mt-4">
                                Mật khẩu
                                <div className='relative'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="mt-2 w-full p-2 border rounded-md text-gray-900 outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="text-black absolute inset-y-0 right-3 mt-2 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </label>

                            <div className='text-right mt-4 italic'>
                                <Link to="/forgetPwd" className="text-nav text-sm">Quên mật khẩu?</Link>
                            </div>
                            <button
                                type="submit"
                                className='mt-6 w-full border border-nav font-bold py-2 rounded-lg hover:bg-nav transition-all duration-300'
                            >
                                ĐĂNG NHẬP
                            </button>

                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Login