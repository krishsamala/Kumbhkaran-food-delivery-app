  import React from 'react';
  import logo from '../assets/logo.png';
  // Optional: Install react-icons (npm i react-icons) for these icons
  // import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

  /**
   * The main footer component for the app.
   */
  const Footer = ({setActivePage}) => {

    // Helper to prevent page reload and use the 'onNavigate' prop
    const handleNavClick = (e, page) => {
      e.preventDefault(); // Stop the link from reloading the page
      if (setActivePage) {
        setActivePage(page);
      }
    };

    return (
      <footer className="bg-gray-800 text-white p-8 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex-shrink-0">
            
              <img 
                src={logo} 
                alt="Kumbhkaran Logo"
                className="h-24 w-auto -mt-8 cursor-pointer" 
                
              />
            </div>        
            <p className="text-gray-400 text-sm">
              Bringing your favorite food to your doorstep, fast and hot.
            </p>
            <p className="text-gray-500 text-xs">
              © KSMB Kumbhkaran Food Delivery App. All rights reserved to KSMB.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span
                  
                  onClick={(e) => handleNavClick(e, 'Home')} 
                  className="hover:text-white"
                >
                  Home
                </span>
              </li>
              <li>
                <span
                  
                  onClick={(e) => handleNavClick(e, 'Search')} 
                  className="hover:text-white"
                >
                  Search
                </span>
              </li>
              <li>
                <span 
                  
                  onClick={(e) => handleNavClick(e, 'Cart')} 
                  className="hover:text-white"
                >
                  Cart
                </span>
              </li>
              <li>
                <span 
                  
                  onClick={(e) => handleNavClick(e, 'Account')} 
                  className="hover:text-white"
                >
                  Account
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold mb-3">The Creators</h4>
            <ul className="space-y-2 text-gray-400">
              <li><span onClick={(e) => handleNavClick(e, 'Aboutus')}  className="hover:text-white cursor-pointer">About Us</span></li>              
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4 text-2xl">
              {/* Replace these emojis with the react-icons if you install them:
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
              */}
              <a  href="https://youtu.be/dQw4w9WgXcQ?si=LfDcPzyqBvmUxMJ4" target='_blank' rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white">
                <span><lord-icon
                      src="https://cdn.lordicon.com/cxauoejw.json"
                      trigger="hover"
                      stroke="bold"
                      colors="primary:121331,secondary:#66a1ee"
                      style={{width:'35px',height:'35px'}}>
                  </lord-icon></span> 
              </a>
              <a  href="https://youtu.be/dQw4w9WgXcQ?si=LfDcPzyqBvmUxMJ4" target='_blank' rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <span><lord-icon
                      src="https://cdn.lordicon.com/cuwcpyqc.json"
                      trigger="hover"
                      stroke="bold"
                      colors="primary:#121331,secondary:#e83a30"
                      style={{width:'35px',height:'35px'}}>
                  </lord-icon></span>
              </a>
              <a  href="https://youtu.be/dQw4w9WgXcQ?si=LfDcPzyqBvmUxMJ4" target='_blank' rel="noopener noreferrer"  aria-label="Twitter" className="text-gray-400 hover:text-white">
                <span><lord-icon
                      src="https://cdn.lordicon.com/yizwahhw.json"
                      trigger="hover"
                      stroke="bold"
                      colors="primary:#ffffff,secondary:#e83a30"
                      style={{width:'30px',height:'30px'}}>
                  </lord-icon></span>
              </a>
            </div>
          </div>

        </div>
      </footer>
    );
  };

  export default Footer;