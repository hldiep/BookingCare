import React from 'react'
import Header from '../Manager/Header'
import { Outlet } from "react-router-dom";
import Nav from '../Manager/Nav';
const AdminLayout = () => {
    return (
        <>
            <Header />
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    );
};
export default AdminLayout