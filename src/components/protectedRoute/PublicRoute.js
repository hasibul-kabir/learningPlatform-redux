import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PublicRoute = ({ children }) => {

    const user = useAuth();

    return !user ? children : user.role === "admin" ? <Navigate to="/admin/dashboard" /> : user.role === "student" && <Navigate to="/courseplayer/1" />


}

export default PublicRoute