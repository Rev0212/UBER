import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const CaptainSignup = () => {
  // State for form data
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newCaptain, setNewCaptain] = useState({});

  // Submit handler function
  const submitHandler = (e) => {
    e.preventDefault();

    // Splitting fullname into firstName and lastName
    const [firstName, lastName] = fullname.split(' ');

    setNewCaptain({
      fullname: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    });

    // Clearing input fields
    setFullname('');
    setEmail('');
    setPassword('');

    console.log('Form submitted:', newCaptain);
  };

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" />
        <form className='flex flex-col' onSubmit={submitHandler}>
          {/* Full Name */}
          <p className='text-xl font-semibold mb-4'>Full Name</p>
          <div className='flex space-x-4 mb-7'>
            <input 
              className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
              type='text' 
              placeholder='First Name'
              required
              value={fullname.split(' ')[0] || ''}
              onChange={(e) => {
                const lastName = fullname.split(' ')[1] || '';
                setFullname(`${e.target.value} ${lastName}`.trim());
              }}
            />
            <input 
              className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
              type='text' 
              placeholder='Last Name'
              required
              value={fullname.split(' ')[1] || ''}
              onChange={(e) => {
                const firstName = fullname.split(' ')[0] || '';
                setFullname(`${firstName} ${e.target.value}`.trim());
              }}
            />
          </div>

          {/* Email */}
          <label className='text-lg font-medium mb-2'>Email</label>
          <input 
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
            type='email' 
            placeholder='someone@gmail.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className='text-lg font-medium mb-2'>Password</label>
          <input 
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
            type='password' 
            placeholder='Enter your password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Sign Up</button>
        </form>
        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login</Link></p>
      </div>
    </div>
  );
};

export default CaptainSignup;
