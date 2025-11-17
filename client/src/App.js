import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import TopNavBar from "./components/TopNavBar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import myBackgroundImage from "./assets/bg_image.png";
import Footer from "./pages/Footer";
import AboutUs from "./pages/Aboutus";
import IntroVideoPage from "./pages/IntroVideoPage";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [activePage, setActivePage] = useState("Signup");

  const [cart, setCart] = useState([]);

  /*
   * Adds a dish to the shopping cart.
   */
  const addToCart = (dishToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dishToAdd.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dishToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...dishToAdd, quantity: 1 }];
      }
    });

    console.log(`Added ${dishToAdd.name} to cart.`);
    toast.success(" Item Added to cart! 🛒", {
      position: "top-center",
      icon: (
        <lord-icon
          src="https://cdn.lordicon.com/zdfcfvwu.json"
          trigger="loop"
          colors="primary:#30e849"
          style={{ width: "45px", height: "45px" }}
        ></lord-icon>
      ),
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
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  };

  const updateCartQuantity = (dishId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(dishId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
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
      case "Aboutus":
        return <AboutUs />;
      case "Signup":
        return <SignupPage setActivePage={setActivePage} />;
      case "Login":
        return <LoginPage setActivePage={setActivePage} />;
      case "Home":
        return <HomePage addToCart={addToCart} setActivePage={setActivePage} />;
      case "Search":
        return <SearchPage addToCart={addToCart} />;
      case "Cart":
        return (
          <CartPage
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
          />
        );
      case "Account":
        return (
          <AccountPage addToCart={addToCart} setActivePage={setActivePage} />
        );
      default:
        return <HomePage addToCart={addToCart} />;
    }
  };
  if (activePage === "IntroVideo") {
    return <IntroVideoPage setActivePage={setActivePage} />;
  }

  if (activePage === "Signup") {
    return (
      <div>
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
        <SignupPage setActivePage={setActivePage} />
      </div>
    );
  }
  if (activePage === "Login") {
    return (
      <div>
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
    <div
      className="font-sans text-gray-800 max-w-7xl mx-auto px-4 py-8 bg-cover bg-center bg-repeat "
      style={{ backgroundImage: `url(${myBackgroundImage})` }}
    >
      <TopNavBar
        onNavigate={setActivePage}
        activePage={activePage}
        cartCount={cart.length}
      />

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

      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;
