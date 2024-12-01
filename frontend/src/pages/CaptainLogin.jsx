import React, { useState, } from 'react';
import { Link } from 'react-router-dom';

export const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({ email, password });
        console.log(captainData)
        setEmail('');
        setPassword('');
    };

    return (
        <div className='h-screen p-7 flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" />
                <form className='flex flex-col' onSubmit={submitHandler}>
                    <label className='text-lg font-medium mb-2'>Whats your Email</label>
                    <input 
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
                        type='email' 
                        placeholder='someone@gmail.com'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className='text-lg font-medium mb-2'>Whats your password</label>
                    <input 
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
                        type='password' 
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
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
