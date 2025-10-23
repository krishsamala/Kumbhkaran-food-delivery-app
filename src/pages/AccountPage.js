import React from 'react';

/**
 * The Account Details Page component.
 */
const AccountPage = () => {
  const accountOptions = [
    { name: 'My Orders', icon: '🛍️' },
    { name: 'My Addresses', icon: '📍' },
    { name: 'Payment Methods', icon: '💳' },
    { name: 'Favorites', icon: '❤️' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
          <span role="img" aria-label="user" className="text-4xl">👤</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">Kumbhkaran</h2>
          <p className="text-gray-600">kumbhkaran@eats.com</p>
        </div>
      </div>
      
      {/* Menu Options */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {accountOptions.map(option => (
          <button 
            key={option.name} 
            className="flex justify-between items-center w-full p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <span className="text-xl w-5 h-5 flex items-center justify-center text-gray-600 mr-4">{option.icon}</span>
              <span className="text-gray-800">{option.name}</span>
            </div>
            <span className="text-gray-400 font-bold">❯</span>
          </button>
        ))}
      </div>
      
      {/* Logout Button */}
      <button className="flex justify-center items-center w-full p-4 bg-white rounded-lg shadow-sm text-red-500 font-medium hover:bg-red-50">
        <span role="img" aria-label="logout" className="mr-3 text-xl">🚪</span>
        <span>Logout</span>
      </button>
    </div>
  );
};


export default AccountPage;
