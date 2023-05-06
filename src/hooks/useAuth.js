import { useSelector } from 'react-redux';

const useAuth = () => {
    const { accessToken, user } = useSelector((state) => state.auth);

    if (accessToken && user) {
        return user
    } else {
        return false
    }
}

export default useAuth