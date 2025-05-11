import { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="fixed top-0 left-0 w-full z-50 shadow-lg font-sans flex justify-center">
            <div className="container">
                <div className="flex flex-col w-full">
                    <div className=" bg-header flex items-center justify-between text-white py-5 px-8 w-full">
                        <div className='flex space-x-3 text-center items-center'>
                            <img
                                src="https://img.pikbest.com/origin/09/19/05/37upIkbEsTQ4z.png!sw800"
                                alt="logo"
                                className='w-[50px] h-[50px]'
                            />
                            <div className="font-bold hidden md:block"> {/* Ẩn ở màn hình nhỏ */}
                                <Link to="/" className="flex items-center space-x-2 font-georgia">
                                    <span className="text-3xl text-white">Trung tâm khám bệnh</span>
                                    <span className='uppercase text-3xl text-logo'>Star</span>
                                </Link>
                            </div>
                        </div>

                        {/* <div>
                            <button className='font-bold border border-logo py-2 px-3 rounded-full transition-all duration-500 hover:animate-button-hover hover:font-bold hover:text-orange-700 hover:bg-logo'>Đăng ký khám bệnh</button>
                        </div> */}

                        {/* <div className="hidden md:flex items-center rounded-xl overflow-hidden bg-white">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="p-2 text-gray-700 outline-none flex-1"
                            />
                            <button className="p-3">
                                <FaSearch className="text-black" />
                            </button>
                        </div> */}
                        <div className="hidden md:flex space-x-4 items-center">
                            <button className='font-semibold hover:scale-105 transition-all'>Hotline: 0984 234 207</button>
                            <button className="font-bold px-3 py-2 rounded-full bg-logo text-nav border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300">
                                Đặt lịch khám
                            </button>
                            <button onClick={() => navigate("/dang-nhap")}
                                className='font-bold px-6 py-2 border border-logo rounded-full hover:bg-logo text-logo hover:text-nav transition-all duration-500'>
                                Đăng nhập
                            </button>
                        </div>
                        <div className="md:hidden flex items-center space-x-4">
                            <button className="font-bold px-4 py-2 rounded-full bg-logo text-nav border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300">
                                Đặt lịch khám
                            </button>
                            <button onClick={() => setIsOpen(!isOpen)}>
                                <FaBars className='text-2xl' />
                            </button>
                        </div>
                    </div>
                    <div className={`md:flex justify-center items-center gap-6 bg-nav text-white font-bold transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
                        <Link to="/" className="block md:inline px-4 py-2 hover:scale-105 text-gray-300 hover:text-white">TRANG CHỦ</Link>
                        <Link to="/gioi-thieu" className="block md:inline px-4 py-2 hover:scale-105 text-gray-300 hover:text-white">GIỚI THIỆU</Link>
                        <Link to="/dich-vu" className="block md:inline px-4 py-2 hover:scale-105 text-gray-300 hover:text-white">DỊCH VỤ ĐIỀU TRỊ</Link>
                        <Link to="/bac-si" className="block md:inline px-4 py-2 hover:scale-105 text-gray-300 hover:text-white">BÁC SĨ</Link>
                        <Link to="/lien-he" className="block md:inline px-4 py-2 hover:scale-105 text-gray-300 hover:text-white">LIÊN HỆ</Link>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
