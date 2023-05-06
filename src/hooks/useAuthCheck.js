import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../REDUX/features/auth/authSlice';

const useAuthCheck = () => {
    const [authChecked, setAuthChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const localStore = localStorage.getItem("auth");
        if (localStore) {
            const auth = JSON.parse(localStore);
            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user
                }))
            }
        }
        setAuthChecked(true)
    }, [dispatch, setAuthChecked])

    return authChecked
}

export default useAuthCheck