import React from 'react';
import logo from '../assets/logo.png'; // <-- We have removed this import

/**
 * The top navigation bar for the website layout.
 * @param {object} props
 * @param {function} props.onNavigate - Function to call when a nav link is clicked.
 * @param {string} props.activePage - The name of the currently active page.
 * @param {number} props.cartCount - The number of unique items in the cart.
 */
const TopNavBar = ({ onNavigate, activePage, cartCount }) => {
  // Helper function to get Tailwind classes for active/inactive links
  const getLinkClasses = (pageName) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
    if (activePage === pageName) {
      return `${baseClasses} bg-orange-600 text-white`;
    }
    return `${baseClasses} text-gray-700 hover:bg-orange-100 hover:text-orange-700`;
  };

  return (
    <nav className="bg-white-300 backdrop-blur-md shadow-md rounded-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
          
            <img 
              src={logo} // <-- UPDATED THIS LINE
              alt="Kumbhkaran Logo"
              className="h-20 w-auto cursor-pointer" // Adjust h-10 (height) as needed
              onClick={() => onNavigate('Home')}
            />
          </div>

          {/* Main Navigation Links */}
          <div className="hidden md:flex md:items-center items-center md:space-x-4">
            <button onClick={() => onNavigate('Home')} className={`flex items-center gap-2 ${getLinkClasses('Home')}`}>
              <lord-icon
              target='button'
    src="https://cdn.lordicon.com/ewtxwele.json"
    trigger="hover"
    colors="primary:#242424"
    style={{width:'25px',height:'25px'}}>
</lord-icon> Home
            </button>
            <button onClick={() => onNavigate('Search')} className={`flex items-center gap-2 ${getLinkClasses('Search')}`}>
             <lord-icon
             target='button'
    src="https://cdn.lordicon.com/vayiyuqd.json"
    trigger="hover"
    colors="primary:#242424"
    style={{width:'25px',height:'25px'}}>
</lord-icon> Search
            </button>
            <button onClick={() => onNavigate('Account')} className={`flex items-center gap-2 ${getLinkClasses('Account')}`}>
              <lord-icon
              target='button'
    src="https://cdn.lordicon.com/spzqjmbt.json"
    trigger="hover"
    colors="primary:#242424"
    style={{width:'25px',height:'25px'}}>
</lord-icon> Account
            </button>
            
            {/* Cart link with badge */}
            <button 
              onClick={() => onNavigate('Cart')} 
              className={`flex items-center gap-2 ${getLinkClasses('Cart')} relative`}>
              <lord-icon
              target='button'
    src="https://cdn.lordicon.com/fmsilsqx.json"
    trigger="hover"
    colors="primary:#242424"
    style={{width:'25px',height:'25px'}}>
</lord-icon> Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Mobile Menu Button (placeholder) */}
          <div className="md:hidden">
            {/* You could add a hamburger menu icon here for mobile */}
            <button 
              onClick={() => onNavigate('Cart')} 
              className={`${getLinkClasses('Cart')} relative`}
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;



