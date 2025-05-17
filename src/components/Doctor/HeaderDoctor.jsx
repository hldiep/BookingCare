import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';

const HeaderDoctor = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-gray-900 fixed top-0 left-0 w-full z-40 shadow-md h-16 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
                <NavLink to="/doctor/home">
                    <p className="text-2xl font-bold text-white tracking-wide">Quản lý</p>
                </NavLink>

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => alert('Thông báo')}
                        className="p-2 rounded-lg hover:bg-blue-700 transition text-white"
                        aria-label="Thông báo"
                    >
                        <Bell size={20} />
                    </button>

                </div>
            </div>
        </header>
    );
};

export default HeaderDoctor;
