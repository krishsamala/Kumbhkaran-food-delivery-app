import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DishCard } from '../components/ReusableComponents';
// 1. ADDED THIS IMPORT - IT'S CRUCIAL
import { mockDishes } from '../data/mockData'; 

/**
 * The Account Details Page component.
 */

const AccountPage = ({ setActivePage, addToCart }) => {

  const [userData, setUserData] = useState(null);
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  const accountOptions = [
    { name: 'My Orders', icon: '🛍️' },    
    { name: 'Payment Methods', icon: '💳' },
    { name: 'Settings', icon: '⚙️' },
  ];

  useEffect(() => {
    axios.get('http://localhost:3001/profile', {
      withCredentials: true
    })
    .then(result => {
      setUserData(result.data); 
    })
    .catch(err => {
      console.log("Error fetching profile:", err);
    });
  }, []);

  useEffect(() => {
    setIsLoadingFavorites(true); // Start loading
    // 1. Fetch the list of favorite IDs from the backend
    axios.get('http://localhost:3001/favorites', {
      withCredentials: true
    })
    .then(result => {
      const favoriteIds = result.data; // This is ['d1', 'd5', etc.]
      
      // 2. Filter your frontend mockData to get the full dish objects
      const matchingDishes = mockDishes.filter(dish => favoriteIds.includes(dish.id));
      
      setFavoriteDishes(matchingDishes);
      setIsLoadingFavorites(false); // Stop loading
    })
    .catch(err => {
      console.log("Error fetching favorites:", err);
      setIsLoadingFavorites(false); // Stop loading on error
    });
  }, []); // Empty array, so it runs once on page load

  if (!userData) {
    return <div>Loading account...</div>;
  }
  
  const handleLogout = () => {
    setActivePage('Login');
  }

  return (
    <div className="space-y-6 p-7">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
          <span role="img" aria-label="user" className="text-4xl">👤</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>
      
      {/* Saved Addresses Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-bold mb-3">My Addresses</h3>
        {userData.addresses && userData.addresses.length > 0 ? (
          <div className="space-y-3">
       {userData.addresses.map((addr, index) => (
         <div key={index} className="border p-3 rounded-md bg-gray-50 text-sm">
           <p className="font-semibold">{addr.street}</p>
           {addr.landmark && <p className="text-gray-600">{addr.landmark}</p>}
           <p className="text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
           <p className="text-gray-600">Phone: {addr.phone}</p>
         </div>
       ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no saved addresses.</p>
        )}
      </div>

      {/* Favorites Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-bold mb-3">My Favorites</h3>
        {/* 3. ADDED LOADING CHECK */}
        {isLoadingFavorites ? (
          <p className="text-gray-500">Loading favorites...</p>
        ) : favoriteDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 4. 'favoriteDishes' IS THE CORRECT VARIABLE TO MAP */}
       {favoriteDishes.map((dish) => (
         // 5. PASSING THE REAL 'addToCart' FUNCTION
         <DishCard key={dish.id} dish={dish} addToCart={addToCart} />
       ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't favorited any items yet.</p>
        )}
      </div>
      
      {/* Account Options Section */}
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
       <span className=" right-3 text-gray-400 font-bold">❯</span>
      </button>
        ))}
      </div>
      
      {/* Logout Button */}
      <button className="flex justify-center items-center w-full p-4 bg-white rounded-lg shadow-sm text-red-500 font-medium hover:bg-red-50" onClick={handleLogout}>
        <span role="img" aria-label="logout" className="mr-3 text-xl">🚪</span>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AccountPage;