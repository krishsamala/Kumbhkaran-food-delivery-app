import React from 'react';
import { useState } from 'react';
import { RestaurantCard, DishCard } from '../components/ReusableComponents';
import {  mockRestaurants, mockDishes, mockCategories3d } from '../data/mockData';
import logo from '../assets/Kumbhkaran_2.png';
import wing1 from '../assets/wing1.png';
import wing2 from '../assets/wing2.png';
import { Overlay } from '../components/Overlay.js'; 
import '../HomePage.css';

import Marquee from "react-fast-marquee";

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
        <div className="flex items-center">
          <img 
          src={wing1} 
          alt="left wing" 
          className="h-64 w-auto -mr-36 z-0 animate-wing-1"
        />
        
        <img 
          src={logo} 
          alt="Kumbhkaran Logo" 
          className="h-60 w-auto z-10"
        />

        <img 
          src={wing2} 
          alt="right wing" 
          className="h-64 w-auto -ml-36 z-0 animate-wing-2"
        />
        </div>        
      </header>
      
      {/* Banners */}
    <Marquee pauseOnHover={true} speed={50}>
      <div className='flex col items-center gap-6 m-7 justify-center'>
        <div className="bg-gradient-to-r from-red-500 to-orange-400 text-white p-6 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl">50% OFF</h2>
          <p className="text-sm">on your first order. Use code: <span className="font-bold">KUMBH50</span></p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl">Upto ₹375/- OFF</h2>
          <p className="text-sm">on your order above ₹999. Use code: <span className="font-bold">CART999</span></p>
        </div>
        <div className="bg-gradient-to-r from-[rgb(234,88,12)] to-yellow-400 text-white p-6 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl">Free Delivery!!</h2>
          <p className="text-sm">on your order above ₹499. Use code: <span className="font-bold">FD499</span></p>
        </div>
        <div className="text-black p-6 border-4 border-red-400 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl text-center">Made by </h2>
          <p className="text-sm">KRISH(60003240300) | SWAYAM(60003240300) | BHAVYA(60003240300) | MEET(60003240300) </p>
        </div>
      </div>
     </Marquee> 
      
      {/* Categories */}
      <div>
        <h3 className="justify-center bg-orange-200 rounded-lg text-center text-xl font-bold max-w-64 mb-3 p-1 mx-auto">Categories</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
          {mockCategories3d.slice(0, 6).map(category => (
           
            <div key={category.name} onClick={() => openCategoryOverlay(category)} className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110">
              <img 
                src={category.img} 
                alt={category.name} 
                className="w-36 h-36"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/cccccc/ffffff?text=Image+Error'; }}
              />
              <span className="mt-2 text-xl font-small">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Restaurants */}
      <div>
        <h3 className="justify-center bg-orange-200 rounded-lg text-center text-xl font-bold max-w-64 mb-3 p-1 mx-auto">Top Restaurants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 ">
          {mockRestaurants.map(res => (
            
            <RestaurantCard key={res.id} restaurant={res} onClick={() => openRestaurantOverlay(res)} />
          ))}
        </div>
      </div>
      
      {/* Popular Dishes (remains the same) */}
      <div>
        <h3 className=" bg-orange-100 rounded-lg text-center text-xl font-bold max-w-xl mb-3 p-2 ">Popular Near You</h3>
        <div className="grid grid-cols-2 gap-4">
          {mockDishes.slice(0, 5).map(dish => (
            <DishCard key={dish.id} dish={dish} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}; 

export default HomePage;