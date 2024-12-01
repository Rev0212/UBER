import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

export const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const {captain, setCaptain} = useContext(CaptainDataContext)

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const loginCaptain = { email: email, password: password };
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, loginCaptain)
            if(response.status === 200){
                const data = response.data
                console.log(data)
                setCaptain(data.captain)
                localStorage.setItem('captain-token', data.token)
                navigate('/captain-home')
            }
        } catch (err) {
            // Handle different types of errors
            if (err.response) {
                // Check for validation errors
                if (err.response.status === 400 && err.response.data.errors) {
                    // Handle validation errors (multiple errors from express-validator)
                    const validationErrors = err.response.data.errors
                    const errorMessages = validationErrors.map(err => err.msg).join(', ')
                    setError(errorMessages)
                } 
                // Handle authentication errors
                else if (err.response.status === 401) {
                    // Consistent error message
                    setError('Login failed. Please check your credentials.')
                }
                // Handle other server errors
                else {
                    setError('Login failed. Please try again.')
                }
            } 
            // Network errors or no response
            else if (err.request) {
                setError('No response from server. Please check your internet connection.')
            } 
            // Other unexpected errors
            else {
                setError('An unexpected error occurred. Please try again.')
            }
        } finally {
            setIsLoading(false);
            // Clear sensitive information
            setPassword('');
        }
    };

    return (
        <div className='h-screen p-7 flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" />
                
                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4' role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className='flex flex-col' onSubmit={submitHandler}>
                    <label className='text-lg font-medium mb-2'>What's your Email</label>
                    <input 
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
                        type='email' 
                        placeholder='someone@gmail.com'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />

                    <label className='text-lg font-medium mb-2'>What's your password</label>
                    <input 
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
                        type='password' 
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <button 
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className='text-center'>Join as Captain? <Link to='/captain-signup' className='text-blue-600'>Create Captain Account</Link></p>
            </div>
            <div>
                <Link
                    to='/login'
                    className='bg-[#e0b85a] flex items-center justify-center text-white 
                    font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
                    Sign in as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;