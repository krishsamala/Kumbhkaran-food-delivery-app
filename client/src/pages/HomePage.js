import React from 'react';
import { useState } from 'react';
import { RestaurantCard, DishCard } from '../components/ReusableComponents';
import { mockCategories, mockRestaurants, mockDishes } from '../data/mockData';
import logo from '../assets/Kumbhkaran_2.png';
import { Overlay } from '../components/Overlay.js'; 

const HomePage = ({ addToCart }) => { 
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  
  // 1. USE GENERIC STATE for what the overlay will show
  const [overlayTitle, setOverlayTitle] = useState('');
  const [overlayDishes, setOverlayDishes] = useState([]);

  // 2. CREATE A FUNCTION FOR CATEGORIES
  const openCategoryOverlay = (category) => {
    setOverlayTitle(category.name);
    // Filter dishes for this category
    const dishes = mockDishes.filter(d => d.categoryName === category.name);
    setOverlayDishes(dishes);
    setIsOverlayOpen(true);
  };

  // 3. CREATE A FUNCTION FOR RESTAURANTS
  const openRestaurantOverlay = (restaurant) => {
    setOverlayTitle(restaurant.name);
    // Filter dishes for this restaurant
    const dishes = mockDishes.filter(d => d.restaurant === restaurant.name);
    setOverlayDishes(dishes);
    setIsOverlayOpen(true);
  };

  // 4. CREATE ONE 'close' function that resets everything
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setOverlayTitle('');
    setOverlayDishes([]);
  };

  return ( 
    <div className="space-y-6 ">
      
      {/* 5. RENDER ONE OVERLAY. It's now simple! */}
      {isOverlayOpen && (
        <Overlay
          title={overlayTitle}
          dishes={overlayDishes}
          addToCart={addToCart}
          onClose={closeOverlay} 
        />
      )}
      
      {/* Header */}
      <header className="flex justify-center items-center pt-2 pb-2">
        <img 
          src={logo} 
          alt="Kumbhkaran Logo" 
          className="h-52 w-auto"
        />
      </header>
      
      {/* Banners */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg shadow-lg">
        <h2 className="font-bold text-xl">50% OFF</h2>
        <p className="text-sm">on your first order. Use code: <span className="font-bold">KUMBH50</span></p>
      </div>
      
      {/* Categories */}
      <div>
        <h3 className="justify-center bg-orange-100 rounded-lg text-center text-xl font-bold max-w-2xl mb-3 mx-auto">Categories</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {mockCategories.slice(0, 6).map(category => (
            // 6. Call the correct function
            <div key={category.name} onClick={() => openCategoryOverlay(category)} className="flex flex-col items-center cursor-pointer">
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
        <h3 className="justify-center bg-orange-100 rounded-lg text-center text-xl font-bold max-w-2xl mb-3 mx-auto">Top Restaurants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {mockRestaurants.map(res => (
            // 7. Call the correct function
            // !! This requires your RestaurantCard to accept an onClick prop !!
            <RestaurantCard key={res.id} restaurant={res} onClick={() => openRestaurantOverlay(res)} />
          ))}
        </div>
      </div>
      
      {/* Popular Dishes (remains the same) */}
      <div>
        <h3 className="justify-center bg-orange-100 rounded-lg text-center text-xl font-bold max-w-xl mb-3 ">Popular Near You</h3>
        <div className="space-y-4">
          {mockDishes.slice(0, 2).map(dish => (
            <DishCard key={dish.id} dish={dish} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}; 

export default HomePage;