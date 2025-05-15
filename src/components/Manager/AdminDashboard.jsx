import React, { useState } from 'react';
import Header from './Header';
import Nav from './Nav';


const AdminDashboard = () => {

    return (
        <div className="flex">
            {/* Sidebar cố định bên trái */}
            <Nav />

            {/* Nội dung chính */}
            <div className="flex-1 ml-64 min-h-screen bg-gray-100">
                {/* Header cố định phía trên */}
                <Header />

                {/* Nội dung trang chủ */}
                <div className="pt-24 px-6">
                    <h1 className="text-3xl font-bold mb-4 font-georgia">Trang quản lý tổng quan</h1>
                    <p className="text-gray-700">Chào mừng bạn đến với trang quản trị. Tại đây bạn có thể quản lý hệ thống bệnh viện.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
