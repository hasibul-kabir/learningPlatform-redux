import { useSelector } from 'react-redux'

const useStudentAuth = () => {
    const auth = useSelector((state) => state.auth);

    if (auth?.accessToken && auth?.user?.role === "student") {
        return true
    } else {
        return false
    }
}

export default useStudentAuth