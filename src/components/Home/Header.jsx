import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Helper/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { logout, isAuthenticated, roles } = useAuth();

    const handleLinkClick = () => setIsOpen(false);

    const handleLogout = () => {
        try {
            logout();
            navigate('/');
            window.location.reload();
            console.log('Logout thành công');
        } catch (error) {
            console.error('Logout thất bại:', error);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 shadow-lg font-sans bg-white text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col w-full">
                    <div className={`flex items-center justify-between py-5 transition-all duration-300`}>
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://img.pikbest.com/origin/09/19/05/37upIkbEsTQ4z.png!sw800"
                                alt="logo"
                                className='w-[50px] h-[50px]'
                            />
                            <Link to="/" className="hidden md:flex items-center space-x-2 font-georgia">
                                <p className="text-3xl font-bold text-highlight">
                                    Health<strong className='uppercase text-3xl text-logo'>Care</strong>
                                </p>
                            </Link>
                        </div>

                        {/* Desktop buttons */}
                        <div className="hidden md:flex space-x-5 items-center">
                            <button className='font-semibold text-highlight hover:text-black hover:scale-105 transition-all'>
                                Hotline: 0984 234 207
                            </button>
                            {!isAuthenticated && (
                                <button onClick={() => navigate("/dat-lich")}
                                    className="font-bold px-3 py-2 rounded-full bg-logo border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300">
                                    Đặt lịch khám
                                </button>
                            )}
                            {isAuthenticated ? (
                                <>
                                    {(roles.includes("MANAGER") || roles.includes("DOCTOR")) && (
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

                        {/* Mobile */}
                        <div className="md:hidden flex items-center space-x-4 text-logo">
                            {!isAuthenticated && (
                                <button onClick={() => navigate("/dat-lich")}
                                    className="font-bold text-white px-3 py-2 rounded-full bg-logo border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300">
                                    Đặt lịch khám
                                </button>
                            )}
                            <button onClick={() => setIsOpen(!isOpen)}>
                                <FaBars className='text-2xl' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile/Top menu */}
            <div
                className={`w-full bg-logo transition-all duration-500 ease-in-out ${isOpen ? 'block' : 'hidden md:block'}`}
            >
                <div className="container mx-auto flex flex-col justify-start items-start gap-2 text-white font-bold px-4 md:flex-row md:justify-center md:items-center md:gap-6">
                    <Link to="/" onClick={handleLinkClick} className="w-full md:w-auto px-4 py-2 rounded hover:scale-105 text-gray-100 transition-transform duration-300 ease-in-out">TRANG CHỦ</Link>
                    <Link to="/gioi-thieu" onClick={handleLinkClick} className="w-full md:w-auto px-4 py-2 rounded hover:scale-105 text-gray-100 transition-transform duration-300 ease-in-out">GIỚI THIỆU</Link>
                    <Link to="/dich-vu" onClick={handleLinkClick} className="w-full md:w-auto px-4 py-2 rounded hover:scale-105 text-gray-100 transition-transform duration-300 ease-in-out">DỊCH VỤ ĐIỀU TRỊ</Link>
                    <Link to="/chuyen-khoa" onClick={handleLinkClick} className="w-full md:w-auto px-4 py-2 rounded hover:scale-105 text-gray-100 transition-transform duration-300 ease-in-out">CHUYÊN KHOA</Link>
                    <Link to="/bac-si" onClick={handleLinkClick} className="w-full md:w-auto px-4 py-2 rounded hover:scale-105 text-gray-100 transition-transform duration-300 ease-in-out">BÁC SĨ</Link>
                    <Link to="/lien-he" onClick={handleLinkClick} className="w-full md:w-auto px-4 py-2 rounded hover:scale-105 text-gray-100 transition-transform duration-300 ease-in-out">LIÊN HỆ</Link>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col md:hidden gap-2 w-full mt-2 px-4 pb-4">
                    {isAuthenticated ? (
                        <>
                            {(roles.includes('MANAGER') || roles.includes('DOCTOR')) && (
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        navigate('/admin');
                                    }}
                                    className="w-full font-bold px-4 py-2 border text-white border-white rounded-full hover:bg-white hover:text-logo transition-all duration-300"
                                >
                                    Quản lý
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="w-full font-bold px-4 py-2 border text-white border-white rounded-full hover:bg-white hover:text-logo transition-all duration-300"
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                navigate('/dang-nhap');
                                setIsOpen(false);
                            }}
                            className="w-full font-bold px-4 py-2 border text-white border-white rounded-full hover:bg-white hover:text-logo transition-all duration-300"
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
