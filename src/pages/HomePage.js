import React from 'react';
// Note the updated import paths
import { RestaurantCard, DishCard } from '../components/ReusableComponents';
import { mockCategories, mockRestaurants, mockDishes } from '../data/mockData';
import logo from '../assets/Kumbhkaran_1.png';

/**
 * The Home Page component.
 */
const HomePage = ({ addToCart }) => (
  <div className="space-y-6">
    {/* Header */}
    <header className = "flex justify-between items-center">
    <div className = "flex justify-center align-center pt-2 pb-2 bl-50">
    <img src={logo} alt= "Kumbhkaran Logo" className="w-40 h-auto" />
  </div>
    </header>
    
    {/* Search Bar (static) */}
    <div className="relative">
      <input 
        type="text" 
        placeholder="Search for restaurants or dishes..." 
        className="w-full p-3 pl-10 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        disabled 
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
    </div>
    
    {/* Banners */}
    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg shadow-lg">
      <h2 className="font-bold text-xl">50% OFF</h2>
      <p className="text-sm">on your first order. Use code: <span className="font-bold">KUMBH50</span></p>
    </div>
    
    {/* Categories */}
    <div>
      <h3 className="text-xl font-bold mb-3">Categories</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {mockCategories.slice(0, 6).map(category => (
          <div key={category.name} className="flex flex-col items-center">
            <img 
              src={category.img} 
              alt={category.name} 
              className="w-20 h-20 rounded-full object-cover shadow-md"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/cccccc/ffffff?text=Image+Error'; }}
            />
            <span className="mt-2 text-sm font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
    
    {/* Top Restaurants */}
    <div>
      <h3 className="text-xl font-bold mb-3">Top Restaurants</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRestaurants.map(res => (
          <RestaurantCard key={res.id} restaurant={res} />
        ))}
      </div>
    </div>
    
    {/* Popular Dishes */}
    <div>
      <h3 className="text-xl font-bold mb-3">Popular Near You</h3>
      <div className="space-y-4">
        {mockDishes.slice(0, 2).map(dish => (
          <DishCard key={dish.id} dish={dish} addToCart={addToCart} />
        ))}
      </div>
    </div>
  </div>
);


export default HomePage;
