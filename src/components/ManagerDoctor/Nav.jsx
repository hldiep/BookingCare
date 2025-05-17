import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    User,
    Calendar,
    Stethoscope,
    FolderKanban,
    CheckCircle2,
    LogOut,
    Building,
} from 'lucide-react';

const Nav = () => {
    const navigate = useNavigate();
    const menu = [
        { name: 'Tổng quan', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { name: 'Bác sĩ', icon: <User size={20} />, path: '/doctor' },
        { name: 'Lịch khám', icon: <Calendar size={20} />, path: '/schedule' },
        { name: 'Dịch vụ', icon: <Stethoscope size={20} />, path: '/service' },
        { name: 'Phòng khám', icon: <Building size={20} />, path: '/clinic' },
        { name: 'Chuyên khoa', icon: <FolderKanban size={20} />, path: '/specialty' },
        { name: 'Phê duyệt lịch hẹn', icon: <CheckCircle2 size={20} />, path: '/appointment' },
    ];

    return (
        <div className="bg-gray-900 text-white fixed top-0 left-0 h-screen w-64 shadow-lg z-40">
            <div className="h-full flex flex-col py-2 px-4 ">
                <div className="flex justify-between items-center p-2">
                    <NavLink to="/admin">
                        <p className="text-2xl font-bold text-white tracking-wide">Dashboard</p>
                    </NavLink>
                </div>
                <nav className="flex-1 space-y-2 mt-4 overflow-y-auto">
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
