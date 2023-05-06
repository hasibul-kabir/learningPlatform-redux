import React, { useEffect, useState } from 'react'
import LearningPortal from '../../../assets/image/learningportal.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../REDUX/features/auth/authApi';
import ErrorMessage from '../../ResponseToastMessages/ErrorMessage';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const [login, { isLoading, isError, data, isSuccess, error: responseError }] = useLoginMutation();

    useEffect(() => {
        if (isError) {
            setError(responseError.data)
        }
        if (isSuccess && data?.user?.role === "admin") {
            navigate('/admin/dashboard')
        }
    }, [data, isError, isSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        login({
            email,
            password
        })

    }
    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src={LearningPortal} alt='learningportal' />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Sign in to Admin Account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autocomplete="email" required
                                className="login-input rounded-t-md" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label for="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" required
                                className="login-input rounded-b-md" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    {/* <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <Link to={} className="font-medium text-violet-600 hover:text-violet-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div> */}

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500" disabled={isLoading}>
                            {
                                isLoading ? 'Loading...' : 'Sign in'
                            }
                        </button>
                    </div>
                    {
                        error && <ErrorMessage error={error} />
                    }
                </form>
            </div>
        </section>
    )
}

export default AdminLogin