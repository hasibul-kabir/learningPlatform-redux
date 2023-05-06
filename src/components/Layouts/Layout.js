import React from 'react'
import Navbar from '../navigations/Navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Layout