import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import TopNavBar from './components/TopNavBar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import myBackgroundImage from './assets/bg_image.png';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/**
 * The main App component.
 * This is the core of the application, managing which page is active
 * and the state of the shopping cart.
 */
function App() {
  // State to track the active page
  const [activePage, setActivePage] = useState('Signup');
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
    toast.success(' Item Added to cart! 🛒', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    

  };

  
  const removeFromCart = (dishId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== dishId));
  };


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
      case 'Signup':
        return <SignupPage setActivePage={setActivePage}/>;
      case 'Login':
        return <LoginPage setActivePage={setActivePage}/>;
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
        return <AccountPage setActivePage={setActivePage}/>;
      default:
        return <HomePage addToCart={addToCart} />;
    }
  };
   if (activePage === 'Signup' ) {
    return <SignupPage setActivePage={setActivePage} />;
  }
  if (activePage === 'Login' ) {
    return (<div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
      <LoginPage setActivePage={setActivePage} />
      </div>
      );
  }
  return (
    
    <div className="font-sans text-gray-800 max-w-7xl mx-auto px-4 py-8 bg-cover bg-center bg-repeat "
      style={{ backgroundImage: `url(${myBackgroundImage})`}}>
      <TopNavBar onNavigate={setActivePage} activePage={activePage} cartCount={cart.length} />
      
      {/* Main Content Area */}
      
      <main className=" px-2 py-8">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            
          />
        {renderPage()}
      </main>


    </div>

   
  ); 
}

export default App;


