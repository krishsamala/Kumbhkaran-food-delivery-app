// src/components/Overlay.js

import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { DishCard } from './ReusableComponents'; 

// 1. Change 'category' prop to 'title'
export const Overlay = ({ title, dishes, addToCart, onClose, isInitiallyFavorited }) => {
  
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/favorites', {
      withCredentials: true
    })
    .then(result => {
      setFavoriteIds(result.data); // Store the array of IDs
    })
    .catch(err => {
      // It's okay if this fails (user not logged in)
      console.log("User not logged in or no favorites.");
      setFavoriteIds([]); // Ensure it's an empty array
    });
  }, []);
  
  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose} 
    >
      {/* Modal */}
      <div
        className="bg-white p-5 pt-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          {/* 2. Use 'title' here */}
          <h2 className="text-3xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Modal Content: List of dishes */}
        <div className="space-y-4">
          {dishes.length > 0 ? (
            dishes.map(dish => {
                const isFav = favoriteIds.includes(dish.id);
              return(
              <DishCard
                key={dish.id}
                dish={dish}
                addToCart={addToCart}
                isInitiallyFavorited={isFav}
              />
            )})
          ) : (
            // 3. A more generic message
            <p className="text-gray-600">No dishes found for {title}.</p>
          )}
        </div>
      </div>
    </div>
  );
};