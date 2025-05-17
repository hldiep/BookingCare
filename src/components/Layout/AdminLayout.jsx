import React from 'react'
import Header from '../ManagerDoctor/Header'
import { Outlet } from "react-router-dom";
import Nav from '../ManagerDoctor/Nav';
import ScrollToTop from '../../ScrollToTop';
const AdminLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Header />
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    );
};
export default AdminLayout