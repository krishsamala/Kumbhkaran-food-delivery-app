import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';
 import { toast, Bounce } from 'react-toastify';


const SignupPage = ({ setActivePage }) => {
  
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
    setActivePage('Login');
    
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
   if (!name  || !email || !password) {
    
    
    toast.error('Please fill in all the fields!', {
              position: "top-center",
              icon:<lord-icon
                  src="https://cdn.lordicon.com/aszgxiei.json"
                  trigger="loop"
                  colors="primary:#e83a30"
                  style={{width:'25px',height:'25px'}}>
              </lord-icon>,
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              }); 
    
    
    return; 
  }
    
    axios.post('http://localhost:3001/register' , {name, email, password})
    .then(result => {
      console.log(result);
             setActivePage('Home');

    })
    .catch(err=> console.log(err))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-8">
        <div>
          <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to 
          </h3>
          {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-400">
            Kumbhkaran 
          </h2> */}
          <div className="flex">
                    
             <img 
              src={logo} // <-- UPDATED THIS LINE
              alt="Kumbhkaran Logo"
              className="block mx-auto h-24 w-44 object-cover" // Adjust h-10 (height) as needed}
              />
                    </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Name Input Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>

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
                                trigger="in"
                                stroke="bold"
                                state="morph-lashes"
                                colors="primary:#000000,secondary:#e83a30"
                                style={{width:'25px',height:'25px'}}>
                            </lord-icon>  : <lord-icon
                                src="https://cdn.lordicon.com/dicvhxpz.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#121331,secondary:#e83a30"
                                style={{width:'25px',height:'25px'}}>
                            </lord-icon>}
              </button>
              {/* --- END OF NEW BUTTON --- */}
            </div>
          </div>

          {/* Button Container */}
          <div className="space-y-4">
            {/* Register Button */}
            <button
              type="button"
              onClick={(handleSubmit)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Register
            </button>
            <h4 className='text-gray-600'>
              Already have an account?<span onClick={handleLogin} className='text-blue-500 cursor-pointer hover:text-blue-700'> Log in. </span>
            </h4>
            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

