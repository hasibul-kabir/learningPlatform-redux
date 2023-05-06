import React from 'react'
import useAdminAuth from '../../hooks/useAdminAuth';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const adminLoggedIn = useAdminAuth();

    return adminLoggedIn ? children : <Navigate to='/admin' />
}

export default AdminRoute