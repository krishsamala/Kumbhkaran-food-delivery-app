import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';

import { toast, Bounce } from 'react-toastify';
const LoginPage = ({ setActivePage }) => {
    
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        // e.preventDefault();
        axios.post('http://localhost:3001/login' , { email, password})
       
        .then(result => {
        console.log(result);
        if(result.data === "Success"){
            setActivePage('Home');
        }
        else{
            // alert("record not existed")
            toast.error('Incorrect Username or Password, No account found! ', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
        }
        
        })
        .catch(err=> console.log(err))
    };


    const handleSubmit = (e) => {
  // 1. This is the data object (argument 2)
  const loginData = {
    email: email,
    password: password
  };

  // 2. This is the config object (argument 3)
  const config = { 
    withCredentials: true 
  };

  // Pass them as separate arguments
  axios.post('http://localhost:3001/login', loginData, config)
    .then(result => {
      console.log(result);
      
    })
    .catch(err => console.log(err));
};

    const handleCreate = () => {
        console.log("going to signupPage");
        setActivePage('Signup');
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-8">
            <div>
              <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login to
              </h3>
              {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-400">
                Kumbhkaran 
              </h2> */}
              <div className="flex">
                        
                 <img 
                  src={logo} 
                  alt="Kumbhkaran Logo"
                  className="block mx-auto  h-24 w-44  cursor-pointer object-cover" // Adjust h-10 (height) as needed}
                  />
              </div>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              
              
              {/* Email Input Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
              </div>
    
              {/* Password Input Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                {/* --- ADDED 'relative' TO THIS WRAPPER --- */}
                <div className="mt-1 relative"> 
                  <input
                    id="password"
                    name="password"
                    // --- DYNAMICALLY SETTING THE TYPE ---
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    // --- ADDED 'pr-10' to make space for the icon ---
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm pr-10"
                  />
                  {/* --- THIS IS THE NEW TOGGLE BUTTON --- */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <lord-icon
    src="https://cdn.lordicon.com/dicvhxpz.json"
    trigger="click"
    stroke="bold"
    state="morph-lashes"
    colors="primary:#000000,secondary:#e83a30"
    style={{width:'35px',height:'35px'}}>
</lord-icon> : <lord-icon
    src="https://cdn.lordicon.com/dicvhxpz.json"
    trigger="morph"
    stroke="bold"
    state="morph-lashes"
    colors="primary:#000000,secondary:#e83a30"
    style={{width:'35px',height:'35px'}}>
</lord-icon>}
                  </button>
                  {/* --- END OF NEW BUTTON --- */}
                </div>
              </div>
    
              {/* Button Container */}
              <div className="space-y-4">
               
                {/* Login Button */}
                <button
                  type="button"
                  onClick={() => {
                  handleSubmit();
                  handleLogin();
                }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Login
                </button>

                {/* Register Button */}
            <button
              type="button"
              onClick={handleCreate}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Create Account
            </button>
              </div>
            </form>
          </div>
        </div>
      );
};

export default LoginPage;