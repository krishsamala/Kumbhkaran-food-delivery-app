import React from 'react';

/**
 * The main Bottom Navigation Bar.
 */
const BottomNavBar = ({ activeTab, setActiveTab, cartCount }) => {
  const navItems = [
    { name: 'home', icon: '🏠', label: 'Home' },
    { name: 'search', icon: '🔍', label: 'Search' },
    { name: 'cart', icon: '🛒', label: 'Cart' },
    { name: 'account', icon: '👤', label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-2xl">
      <div className="flex justify-around items-center h-20">
        {navItems.map(item => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center justify-center p-2 transition-colors duration-300 rounded-lg ${
              activeTab === item.name ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'
            }`}
          >
            <div className="relative">
              <span className="text-3xl">{item.icon}</span>
              {item.name === 'cart' && cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-xs mt-1 font-medium ${activeTab === item.name ? 'font-bold' : ''}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;