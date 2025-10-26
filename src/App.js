import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import TopNavBar from './components/TopNavBar';

/**
 * The main App component.
 * This is the core of the application, managing which page is active
 * and the state of the shopping cart.
 */
function App() {
  // State to track the active page
  const [activePage, setActivePage] = useState('Home');
  // State for the shopping cart.
  const [cart, setCart] = useState([]);

  /**
   * Adds a dish to the shopping cart.
   * If the item is already in the cart, it increases its quantity.
   * @param {object} dishToAdd - The dish object to add.
   */
  const addToCart = (dishToAdd) => {
    setCart(prevCart => {
      // Check if item is already in cart
      const existingItem = prevCart.find(item => item.id === dishToAdd.id);
      
      if (existingItem) {
        // If yes, return new cart array with updated quantity
        return prevCart.map(item =>
          item.id === dishToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If no, add new item to cart with quantity 1
        return [...prevCart, { ...dishToAdd, quantity: 1 }];
      }
    });
    // Optional: Show a confirmation message
    console.log(`Added ${dishToAdd.name} to cart.`);
  };

  /**
   * Removes an item completely from the cart.
   * @param {string} dishId - The ID of the dish to remove.
   */
  const removeFromCart = (dishId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== dishId));
  };

  /**
   * Updates the quantity of a specific item in the cart.
   * If quantity reaches 0, it removes the item.
   * @param {string} dishId - The ID of the dish to update.
   * @param {number} newQuantity - The new quantity.
   */
  const updateCartQuantity = (dishId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(dishId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === dishId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  /**
   * Renders the currently active page based on the 'activePage' state.
   */
  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <HomePage addToCart={addToCart} />;
      case 'Search':
        return <SearchPage addToCart={addToCart} />;
      case 'Cart':
        return (
          <CartPage
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
          />
        );
      case 'Account':
        return <AccountPage />;
      default:
        return <HomePage addToCart={addToCart} />;
    }
  };

  return (
    <div className="font-sans text-gray-800">
      
      <TopNavBar onNavigate={setActivePage} activePage={activePage} cartCount={cart.length} />

      {/* Main Content Area */}
      {/* This 'main' tag holds the active page.
        'max-w-7xl' makes it wide but not full-screen on large monitors.
        'mx-auto' centers it.
        'px-4 py-8' gives it nice padding.
      */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;


