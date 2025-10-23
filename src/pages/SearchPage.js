import React, { useState } from 'react';
// Note the updated import paths
import { RestaurantCard, DishCard } from '../components/ReusableComponents';
import { allSearchableItems, mockCategories } from '../data/mockData';

const SearchPage = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Search</h2>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search for restaurants or dishes..." 
          className="w-full p-3 pl-10 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
      </div>
      
      {/* Search Results */}
      <div className="space-y-4">
        {searchTerm.trim() !== '' && filteredItems.length === 0 && (
          <p className="text-gray-500 text-center">No results found for "{searchTerm}"</p>
        )}
        
        {filteredItems.map(item => 
          // Check if it's a restaurant (has 'cuisine') or a dish
          item.cuisine ? (
            <RestaurantCard key={item.id} restaurant={item} />
          ) : (
            <DishCard key={item.id} dish={item} addToCart={addToCart} />
          )
        )}
      </div>
      
      {/* Browse Categories when search is empty */}
      {searchTerm.trim() === '' && (
        <div>
          <h3 className="text-xl font-bold mb-3">Browse Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            {mockCategories.map(category => (
              <div key={category.name} className="relative rounded-lg overflow-hidden h-24">
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