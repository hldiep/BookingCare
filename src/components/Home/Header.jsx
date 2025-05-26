import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roles, setRoles] = useState([]);

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBar(window.scrollY <= 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const user = JSON.parse(atob(base64));
                const roles = (user?.role || []).map(r =>
                    typeof r === 'object' && r.authority
                        ? r.authority.replace('ROLE_', '')
                        : ''
                );
                setRoles(roles);
            } catch (e) {
                console.error("Token decode error:", e);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 shadow-lg font-sans bg-white text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col w-full">
                    <div className={`flex items-center justify-between py-5 transition-all duration-300 ${showTopBar ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://img.pikbest.com/origin/09/19/05/37upIkbEsTQ4z.png!sw800"
                                alt="logo"
                                className='w-[50px] h-[50px]'
                            />
                            <Link to="/" className="hidden md:flex items-center space-x-2 font-georgia ">
                                <p className="text-3xl font-bold text-highlight">Health<strong className='uppercase text-3xl text-logo'>Care</strong></p>
                            </Link>
                        </div>

                        {/* Desktop buttons */}
                        <div className="hidden md:flex space-x-5 items-center">
                            <button className='font-semibold text-highlight hover:text-black hover:scale-105 transition-all'>Hotline: 0984 234 207</button>
                            <button onClick={() => navigate("/dat-lich")}
                                className="font-bold px-3 py-2 rounded-full bg-logo border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300">
                                Đặt lịch khám
                            </button>
                            {isLoggedIn ? (
                                <>
                                    {roles.includes("MANAGER") && (
                                        <button onClick={() => navigate("/admin")}
                                            className='font-bold px-9 py-2 text-logo border border-logo rounded-full hover:bg-logo hover:text-white transition-all duration-500'>
                                            Quản lý
                                        </button>
                                    )}
                                    <button onClick={handleLogout}
                                        className='font-bold px-6 py-2 text-logo border border-logo rounded-full hover:bg-logo hover:text-white transition-all duration-500'>
                                        Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => navigate("/dang-nhap")}
                                    className='font-bold px-6 py-2 border text-logo border-logo rounded-full hover:bg-logo hover:text-white transition-all duration-500'>
                                    Đăng nhập
                                </button>
                            )}
                        </div>

                        {/* Mobile buttons */}
                        <div className="md:hidden flex items-center space-x-4 text-logo">
                            <button onClick={() => navigate("/dat-lich")}
                                className="font-bold text-white px-3 py-2 rounded-full bg-logo border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300">
                                Đặt lịch khám
                            </button>
                            {isLoggedIn ? (
                                <>
                                    {roles.includes("MANAGER") && (
                                        <button onClick={() => navigate("/admin")}
                                            className='font-bold px-4 py-2 border text-logo border-logo rounded-full hover:bg-logo hover:text-white transition-all duration-500'>
                                            Quản lý
                                        </button>
                                    )}
                                    <button onClick={handleLogout}
                                        className='font-bold px-4 py-2 border text-logo border-logo rounded-full hover:bg-logo hover:text-white transition-all duration-500'>
                                        Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => navigate("/dang-nhap")}
                                    className='font-bold px-4 py-2 border text-logo border-logo rounded-full hover:bg-logo hover:text-white transition-all duration-500'>
                                    Đăng nhập
                                </button>
                            )}
                            <button onClick={() => setIsOpen(!isOpen)}>
                                <FaBars className='text-2xl' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`
                w-full bg-logo 
                ${isOpen ? 'block' : 'hidden md:block'} 
                transition-all duration-500 ease-in-out
                ${!showTopBar ? 'fixed top-0 left-0 z-50' : ''}
            `}>
                <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-6 text-white font-bold">
                    <Link to="/" onClick={handleLinkClick} className="block md:inline px-4 py-2 hover:scale-105 text-gray-100 hover:text-white">TRANG CHỦ</Link>
                    <Link to="/gioi-thieu" onClick={handleLinkClick} className="block md:inline px-4 py-2 hover:scale-105 text-gray-100 hover:text-white">GIỚI THIỆU</Link>
                    <Link to="/dich-vu" onClick={handleLinkClick} className="block md:inline px-4 py-2 hover:scale-105 text-gray-100 hover:text-white">DỊCH VỤ ĐIỀU TRỊ</Link>
                    <Link to="/chuyen-khoa" onClick={handleLinkClick} className="block md:inline px-4 py-2 hover:scale-105 text-gray-100 hover:text-white">CHUYÊN KHOA</Link>
                    <Link to="/bac-si" onClick={handleLinkClick} className="block md:inline px-4 py-2 hover:scale-105 text-gray-100 hover:text-white">BÁC SĨ</Link>
                    <Link to="/lien-he" onClick={handleLinkClick} className="block md:inline px-4 py-2 hover:scale-105 text-gray-100 hover:text-white">LIÊN HỆ</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
