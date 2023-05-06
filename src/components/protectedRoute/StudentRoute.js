import React from 'react'
import useStudentAuth from '../../hooks/useStudentAuth'
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {
    const studentLoggedIn = useStudentAuth();

    return studentLoggedIn ? children : <Navigate to='/' />
}

export default StudentRoute