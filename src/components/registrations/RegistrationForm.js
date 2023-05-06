import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../ResponseToastMessages/ErrorMessage';
import { useRegisterMutation } from '../../REDUX/features/auth/authApi';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const [register, { isLoading, isError, data, isSuccess, error: responseError }] = useRegisterMutation();


    useEffect(() => {
        if (isError) {
            setError(responseError.data)
        }
        if (isSuccess && data) {
            navigate('/courseplayer/1')
        }
    }, [data, isError, isSuccess])
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        if (password === confirmPass) {
            setError('');
            register({
                email,
                password,
                role: 'student',
                name
            })
        } else {
            setError('Password does not match!')
        }
    }



    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="name" className="sr-only">Name</label>
                    <input id="name" name="name" type="name" autocomplete="name" required
                        className="login-input rounded-t-md" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label for="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required
                        className="login-input " placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label for="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                        className="login-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label for="confirm-password" className="sr-only">Confirm Password</label>
                    <input id="confirm-password" name="confirm-password" type="password"
                        autocomplete="confirm-password" required className="login-input rounded-b-md"
                        placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                </div>
            </div>

            <div>
                <button type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500" disabled={isLoading} >
                    {
                        isLoading ? 'Loading...' : 'Create Account'
                    }
                </button>
            </div>
            <div>
                <p>Already Registered?  <Link to='/' className='font-medium text-violet-600 hover:text-violet-500'>Login</Link></p>
            </div>
            {
                error && <ErrorMessage error={error} />
            }
        </form>
    )
}

export default RegistrationForm