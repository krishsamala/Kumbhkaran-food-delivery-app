import React from 'react';

// --- Reusable Components ---
// All your reusable cards go in this file.

/**
 * A card representing a restaurant.
 */
export const RestaurantCard = ({ restaurant }) => (
<div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
    <img 
      src={restaurant.img} 
      alt={restaurant.name} 
      className="w-full h-32 object-cover"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
    />
    <div className="p-4">
      <h3 className="font-bold text-lg">{restaurant.name}</h3>
      <div className="flex items-center text-sm text-gray-700 my-1">
        <span role="img" aria-label="star" className="mr-1">⭐</span>
        <span>{restaurant.rating}</span>
        <span className="mx-2">•</span>
        <span>{restaurant.time}</span>
      </div>
      <p className="text-sm text-gray-500 truncate">{restaurant.cuisine}</p>
    </div>
  </div>
);

/**
 * A card representing a single dish.
 */
export const DishCard = ({ dish, addToCart }) => (
<div className="bg-white rounded-lg shadow-md overflow-hidden flex p-3 relative">
    <img 
      src={dish.img} 
      alt={dish.name} 
      className="w-24 h-24 rounded-md object-cover"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/cccccc/ffffff?text=Image+Error'; }}
    />
    <div className="ml-4 flex-1">
      <h4 className="font-bold text-md">{dish.name}</h4>
      <p className="text-sm text-gray-500">{dish.restaurant}</p>
      <p className="font-semibold text-gray-800 mt-2">₹{dish.price.toFixed(2)}</p>
    </div>
    <button
      onClick={() => addToCart(dish)}
      className="absolute bottom-3 right-3 bg-orange-500 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg transition-transform duration-300 hover:bg-orange-600 hover:scale-110"
      aria-label={`Add ${dish.name} to cart`}
    >
      <span className="font-bold text-xl">+</span>
    </button>
  </div>
);

/**
 * A card representing an item in the cart.
 */
export const CartItemCard = ({ item, updateQuantity, removeFromCart }) => (
<div className="flex items-center bg-white p-3 rounded-lg shadow-sm mb-3">
    <img 
      src={item.img} 
      alt={item.name} 
      className="w-16 h-16 rounded-lg object-cover"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/cccccc/ffffff?text=Image+Error'; }}
    />
    <div className="ml-4 flex-1">
      <h4 className="font-bold text-sm">{item.name}</h4>
      <p className="text-xs text-gray-500">{item.restaurant}</p>
      <p className="font-semibold text-gray-800 mt-1">₹{item.price.toFixed(2)}</p>
    </div>
    <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center"
            aria-label={`Decrease quantity of ${item.name}`}
          >
            <span className="font-bold">-</span>
          </button>
          <span className="font-bold w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            aria-label={`Increase quantity of ${item.name}`}
          >
            <span className="font-bold">+</span>
          </button>
        </div>
         <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 mt-2 p-1 rounded-full hover:bg-red-100"
            aria-label={`Remove ${item.name} from cart`}
          >
            <span role="img" aria-label="remove" className="text-lg">🗑️</span>
          </button>
    </div>
  </div>
);
