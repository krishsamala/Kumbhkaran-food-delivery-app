import React, { useState, useEffect } from "react";
import axios from "axios";
import { DishCard } from "../components/ReusableComponents";
import { mockDishes } from "../data/mockData";

/**
 * The Account Details Page component.
 */

const AccountPage = ({ setActivePage, addToCart }) => {
  const [userData, setUserData] = useState(null);
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  //fro expandable
  const [isAddressesExpanded, setIsAddressesExpanded] = useState(false);
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);

  const accountOptions = [
    { name: "My Orders", icon: "🛍️" },
    {
      name: "Payment Methods",
      icon: (
        <lord-icon
          src="https://cdn.lordicon.com/ynsswhvj.json"
          target="div"
          trigger="hover"
          colors="primary:#242424"
          style={{ width: "25px", height: "25px" }}
        ></lord-icon>
      ),
    },
    { name: "Settings", icon: "⚙️" },
  ];
  const handleLogout = () => {
    setActivePage("Login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/profile", {
        withCredentials: true,
      })
      .then((result) => {
        setUserData(result.data);
      })
      .catch((err) => {
        console.log("Error fetching profile:", err);
      });
  }, []);

  useEffect(() => {
    setIsLoadingFavorites(true);
    axios
      .get("http://localhost:3001/favorites", {
        withCredentials: true,
      })
      .then((result) => {
        const favoriteIds = result.data;
        const matchingDishes = mockDishes.filter((dish) =>
          favoriteIds.includes(dish.id)
        );
        setFavoriteDishes(matchingDishes);
        setIsLoadingFavorites(false);
      })
      .catch((err) => {
        console.log("Error fetching favorites:", err);
        setIsLoadingFavorites(false);
      });
  }, []);

  const handleUnfavoriteFromAccount = (dishId) => {
    setFavoriteDishes((currentDishes) =>
      currentDishes.filter((dish) => dish.id !== dishId)
    );
  };

  if (!userData) {
    return (
      <div>
        Loading account...
        <button
          className="flex justify-center items-center w-full p-4 bg-white rounded-lg shadow-sm text-red-500 font-medium hover:bg-red-50"
          onClick={handleLogout}
        >
          <lord-icon
            target="button"
            src="https://cdn.lordicon.com/vfiwitrm.json"
            trigger="hover"
            style={{ width: "35px", height: "35px" }}
          ></lord-icon>
          <span>Try logging in</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-7">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
          <span role="img" aria-label="user" className="text-4xl">
            👤
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>

      {/*Address*/}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Clickable Header */}
        <button
          onClick={() => setIsAddressesExpanded(!isAddressesExpanded)}
          className="w-full flex justify-between items-center p-4 text-left"
        >
          <h3 className="text-lg font-bold">My Addresses</h3>
          {/* Simple rotating chevron icon */}
          <span
            className={`transform transition-transform duration-300 ${
              isAddressesExpanded ? "rotate-90" : "rotate-0"
            }`}
          >
            ❯
          </span>
        </button>

        {/* Expandable Content */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isAddressesExpanded
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 pt-0">
            {" "}
            {/* Padding wrapper for content */}
            {userData.addresses && userData.addresses.length > 0 ? (
              <div className="space-y-3">
                {userData.addresses.map((addr, index) => (
                  <div
                    key={index}
                    className="border p-3 rounded-md bg-gray-50 text-sm"
                  >
                    <p className="font-semibold">{addr.street}</p>
                    {addr.landmark && (
                      <p className="text-gray-600">{addr.landmark}</p>
                    )}
                    <p className="text-gray-600">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-gray-600">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You have no saved addresses.</p>
            )}
          </div>
        </div>
      </div>

      {/* --- (3) MODIFIED: Favorites Section (Collapsible) --- */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Clickable Header */}
        <button
          onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
          className="w-full flex justify-between items-center p-4 text-left"
        >
          <h3 className="text-lg font-bold">My Favorites</h3>
          <span
            className={`transform transition-transform duration-300 ${
              isFavoritesExpanded ? "rotate-90" : "rotate-0"
            }`}
          >
            ❯
          </span>
        </button>

        {/* Expandable Content */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            // Using a large max-height to ensure all favorites fit
            isFavoritesExpanded
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 pt-0">
            {" "}
            {/* Padding wrapper for content */}
            {isLoadingFavorites ? (
              <p className="text-gray-500">Loading favorites...</p>
            ) : favoriteDishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteDishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    addToCart={addToCart}
                    isInitiallyFavorited={true}
                    onUnfavorite={handleUnfavoriteFromAccount}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                You haven't favorited any items yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Account Options Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {accountOptions.map((option) => (
          <button
            key={option.name}
            className="flex justify-between items-center w-full p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <span className="text-xl w-5 h-5 flex items-center justify-center text-gray-600 mr-4">
                {option.icon}
              </span>
              <span className="text-gray-800">{option.name}</span>
            </div>
            <span className=" right-3 text-gray-400 font-bold">❯</span>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        className="flex justify-center items-center w-full p-4 bg-white rounded-lg shadow-sm text-red-500 font-medium hover:bg-red-50"
        onClick={handleLogout}
      >
        <lord-icon
          target="button"
          src="https://cdn.lordicon.com/vfiwitrm.json"
          trigger="hover"
          style={{ width: "35px", height: "35px" }}
        ></lord-icon>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AccountPage;
