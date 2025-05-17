import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-gray-900 fixed top-0 left-0 w-full z-40 shadow-md h-16 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
                <NavLink to="/admin">
                    <p className="text-2xl font-bold text-white tracking-wide">Dashboard</p>
                </NavLink>

                <div className="flex items-center gap-4">
                    {/* Tùy chọn hiển thị tên người dùng */}
                    {/* <p className="text-white font-medium">Xin chào, Quản trị viên</p> */}
                    <button
                        onClick={() => alert('Thông báo')}
                        className="p-2 rounded-lg hover:bg-blue-700 transition text-white"
                        aria-label="Thông báo"
                    >
                        <Bell size={20} />
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 p-2 bg-blue-600 border border-blue-600 text-white rounded-lg hover:bg-transparent hover:text-blue-600 transition"
                    >
                        <LogOut size={18} />
                        {/* <span>Đăng xuất</span> */}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
