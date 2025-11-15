import React, { useState, useEffect } from 'react';
import { Overlay } from '../components/Overlay.js'; 
import axios from 'axios';
import { RestaurantCard, DishCard } from '../components/ReusableComponents';
import { mockCategories, mockDishes } from '../data/mockData';
import { allSearchableItems } from '../data/mockData';
import '../HomePage.css';

const SearchPage = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // GENERIC STATE for what the overlay will show
  const [overlayTitle, setOverlayTitle] = useState('');
  const [overlayDishes, setOverlayDishes] = useState([]);

  // FUNCTION FOR CATEGORIES
  const openCategoryOverlay = (category) => {
    setOverlayTitle(category.name);
    // Filter dishes for this category
    const dishes = mockDishes.filter(d => d.categoryName === category.name);
    setOverlayDishes(dishes);
    setIsOverlayOpen(true);
  };

  //FUNCTION FOR RESTAURANTS
  const openRestaurantOverlay = (restaurant) => {
    setOverlayTitle(restaurant.name);
    // Filter dishes for this restaurant
    const dishes = mockDishes.filter(d => d.restaurant === restaurant.name);
    setOverlayDishes(dishes);
    setIsOverlayOpen(true);
  };

  // close function that resets everything
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setOverlayTitle('');
    setOverlayDishes([]);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredItems([]);
    } else {
      setFilteredItems(
        allSearchableItems.filter(item =>
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          (item.cuisine && item.cuisine.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }
  };

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
    <div className="space-y-6  animate-fade-in">
      
      {/* --- THIS IS THE MISSING PIECE --- */}
      {/* Add this block to render the overlay when state is true */}
      {isOverlayOpen && (
        <Overlay
          title={overlayTitle}
          dishes={overlayDishes}
          addToCart={addToCart}
          onClose={closeOverlay} 
        />
      )}
      {/* ---------------------------------- */}

      <h2 className="bg-orange-40 backdrop-blur-md shadow-md rounded-lg text-center text-xl font-bold max-w-64 mb-1 p-2 ">Search</h2>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search for restaurants or dishes..." 
          className="w-full p-3 pl-10 bg-gray-100 rounded-lg border-2 border-black-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"><lord-icon
    target='div'
    src="https://cdn.lordicon.com/hisvnjlk.json"
    trigger="click"
    stroke="bold"
    style={{width:'25px',height:'25px'}}>
</lord-icon></span>
      </div>
      
      {/* Search Results */}
      <div className="space-y-4">
        {searchTerm.trim() !== '' && filteredItems.length === 0 && (
          <p className="text-gray-500 text-center">No results found for "{searchTerm}"</p>
        )}
        {}
        {filteredItems.map(item => {
             const isFav = favoriteIds.includes(item.id);
          // Check if it's a restaurant (has 'cuisine') or a dish
          return item.cuisine ? (
            <RestaurantCard key={item.id} restaurant={item} onClick={() => openRestaurantOverlay(item)}/>
          ) : (
            <DishCard key={item.id} dish={item} addToCart={addToCart} isInitiallyFavorited={isFav}/>
          )
          })}
      </div>
      
      {/* Browse Categories when search is empty */}
      {searchTerm.trim() === '' && (
        <div>
          <h3 className="justify-center bg-white/30 backdrop-blur-md shadow-md rounded-lg text-center text-2xl font-medium max-w-64 mb-1 p-1 mx-auto">Browse Categories</h3>
          <div className="grid grid-cols-2 gap-4 p-2">
            {mockCategories.map((category, index) => (
              <div key={category.name} onClick={() => openCategoryOverlay(category)} 
              className="relative rounded-lg overflow-hidden h-24 cursor-pointer animate-slide-in-up" 
              style={{ animationDelay: `${index * 100}ms` }}>
                <img 
                  src={category.img} 
                  alt={category.name} 
                  className="w-full h-full object-cover brightness-75"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x100/cccccc/ffffff?text=Image+Error'; }}
                />
                <span className="absolute bottom-2 left-2 text-white font-bold">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;