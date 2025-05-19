import React from 'react'
import ScrollToTop from '../../ScrollToTop'
import Header from '../Home/Header'
import Footer from '../Home/Footer'
import HotlineButton from '../Helper/HotlineButton'
import ScrollToTopButton from '../Helper/ScrollToTopButton'
import { Outlet } from "react-router-dom";
const UserLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <HotlineButton />
            <ScrollToTopButton />
        </>
    );
};

export default UserLayout