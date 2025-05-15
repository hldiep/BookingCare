import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Calendar, Stethoscope, FolderKanban, CheckCircle2 } from 'lucide-react';

const Nav = () => {
    const menu = [
        { name: 'Tổng quan', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { name: 'Bác sĩ', icon: <User size={20} />, path: '/doctor' },
        { name: 'Lịch khám', icon: <Calendar size={20} />, path: '/appointments' },
        { name: 'Dịch vụ', icon: <Stethoscope size={20} />, path: '/services' },
        { name: 'Chuyên khoa', icon: <FolderKanban size={20} />, path: '/departments' },
        { name: 'Phê duyệt lịch hẹn', icon: <CheckCircle2 size={20} />, path: '/approval' },
    ];

    return (
        <div className="bg-gray-900 text-white fixed top-0 left-0 h-screen w-64 shadow-lg z-40">
            <div className="h-full flex flex-col py-6 px-4">
                <div className="text-xl font-semibold mb-6 text-center">Quản trị</div>
                <nav className="flex-1 space-y-2">
                    {menu.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700 ${isActive ? 'bg-blue-600' : 'bg-gray-800'
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Nav;
