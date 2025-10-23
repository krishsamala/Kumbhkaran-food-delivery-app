import React, { useState, useMemo } from 'react';

// Import all our new components from their new folders
import HomePage from './pages/HomePage.js';
import SearchPage from './pages/SearchPage.js';
import CartPage from './pages/CartPage.js';
import AccountPage from './pages/AccountPage.js';
import BottomNavBar from './components/BottomNavBar.js';

// We don't need to import App.css anymore unless you add custom styles
// import './App.css'; 

/**
 * The main App component.
 * This now only manages state and navigation.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);

  // --- Cart Management Functions ---
  // These live in the main App component so they can be
  // passed down to any page that needs them.

  const addToCart = (dish) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      if (existingItem) {
        // Increase quantity
        return prevCart.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...dish, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (itemId, amount) => {
    setCart(prevCart => {
      return prevCart
        .map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter(item => item.quantity > 0); // Remove item if quantity drops to 0
    });
  };
  
  const removeFromCart = (itemId) => {
     setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // --- Memoized Values ---
  // These recalculate only when the cart changes.

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);
  
  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // --- Render Active Page ---
  // This function decides which page component to show.

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage addToCart={addToCart} />;
      case 'search':
        return <SearchPage addToCart={addToCart} />;
      case 'cart':
        return <CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} cartTotal={cartTotal} />;
      case 'account':
        return <AccountPage />;
      default:
        return <HomePage addToCart={addToCart} />;
    }
  };

  return (
    // Main container with mobile-first constraints
    <div className="font-sans antialiased bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-gray-50 shadow-2xl min-h-screen pb-24">
        
        <main className="p-4">
          {renderActiveTab()}
        </main>
      </div>
      
      <BottomNavBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartCount} 
      />
    </div>
  );
}
