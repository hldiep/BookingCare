import React from 'react'
import ScrollToTop from '../../ScrollToTop'
import Navbar from '../Doctor/Navbar'
import { Outlet } from 'react-router-dom'
import HeaderDoctor from '../Doctor/HeaderDoctor'

const DoctorLayout = () => {
    return (
        <>
            <ScrollToTop />
            <HeaderDoctor />
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default DoctorLayout