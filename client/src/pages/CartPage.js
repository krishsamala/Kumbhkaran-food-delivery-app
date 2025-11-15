import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { AddressOverlay } from '../components/AddressOverlay';
import { SelectAddressOverlay } from '../components/SelectAddressOverlay'; 

const CartPage = ({ cart, updateCartQuantity, removeFromCart }) => {
  // --- States ---
  const [isAddressOverlayOpen, setIsAddressOverlayOpen] = useState(false);
  const [isSelectAddressOpen, setIsSelectAddressOpen] = useState(false); // 4. New state
  const [userAddresses, setUserAddresses] = useState([]); // 5. New state
  const [selectedAddress, setSelectedAddress] = useState(null); // 6. New state

  // --- Calculations (Unchanged) ---
  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const deliveryFee = subtotal > 0 ? 2.50 : 0;
  const total = subtotal + deliveryFee;
  const isEmpty = cart.length === 0;

  
  useEffect(() => {
    axios.get('http://localhost:3001/profile', { withCredentials: true })
      .then(result => {
        if (result.data.addresses) {
          setUserAddresses(result.data.addresses);
        }
      })
      .catch(err => {
        console.log("Error fetching profile addresses:", err);
      });
  }, []); 

  
  const openAddressOverlay = () => setIsAddressOverlayOpen(true);
  const closeAddressOverlay = () => setIsAddressOverlayOpen(false);

  const openSelectAddressOverlay = () => setIsSelectAddressOpen(true);
  const closeSelectAddressOverlay = () => setIsSelectAddressOpen(false);

  // 8. New Handler: Called when "Select" is clicked in the new overlay
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    closeSelectAddressOverlay();
  };

  // 9. UPDATED: This function now updates the address list after saving
  const handleSaveAddress = (addressData) => {
    axios.post('http://localhost:3001/add-address', addressData, { withCredentials: true })
      .then(result => {
        if (result.data.success) {
          setUserAddresses(result.data.addresses); // Update the list with the new address
          console.log("Address saved successfully!");
        }
      })
      .catch(err => console.error("Error saving address:", err));
    
    closeAddressOverlay();
  };

  return (
    <div className="space-y-8">
      {/* --- Overlays --- */}
      {/* 10. Render BOTH overlays, they control their own visibility */}
      {isAddressOverlayOpen && (
        <AddressOverlay 
          onClose={closeAddressOverlay} 
          onSave={handleSaveAddress} 
        />
      )}
      
      <SelectAddressOverlay 
        isOpen={isSelectAddressOpen}
        onClose={closeSelectAddressOverlay}
        onSelect={handleSelectAddress}
        addresses={userAddresses}
      />

      <h2 className="text-3xl font-bold">Your Cart</h2>

      {isEmpty ? (
        <p className="text-gray-600 text-lg">Your cart is empty. Add some food!</p>
      ) : (
        <div className="flex flex-col md:flex-row justify-between gap-8">
          
          {/* Cart Items (Left Column) - Unchanged */}
          <div className="w-full md:w-8/12 space-y-4">
            {cart.map(item => (
              <CartItemCard
                key={item.id}
                item={item}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          {/* Order Summary (Right Column) */}
          <div className="w-full md:w-4/12">
            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-24 w-full">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            {/* ADD THIS CODE BACK: */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{(subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{(deliveryFee || 0).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{(total || 0).toFixed(2)}</span>
              </div>
            </div>

              {/* 11. New Section: Display Selected Address */}
              <div className="my-6">
                <h4 className="text-lg font-semibold mb-2">Delivery To:</h4>
                {selectedAddress ? (
                  <div className="border p-3 rounded-md bg-gray-50 text-sm">
                    <p className="font-semibold">{selectedAddress.street}</p>
                    <p className="text-gray-600">{selectedAddress.city}, {selectedAddress.pincode}</p>
                    <p className="text-gray-600">Phone: {selectedAddress.phone}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Please select an address.</p>
                )}
              </div>

              <button className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-orange-600 transition-colors">
                Proceed to Checkout
              </button>
              
              {/* 12. New "Select" Button */}
              <button 
                className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
                onClick={openSelectAddressOverlay}
              >
                {selectedAddress ? "Change Address" : "Select Address"}
              </button>

              {/* 13. "Add" button is unchanged */}
              <button 
                className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg mt-4 hover:bg-green-600 transition-colors"
                onClick={openAddressOverlay}
              >
                + Add New Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- CartItemCard Component (Unchanged) ---
const CartItemCard = ({ item, updateCartQuantity, removeFromCart }) => {
  const itemPrice = item.price || 0;
  return (
    // ADD THIS CODE BACK:
    <div className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4">
      <img
        src={item.img}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
        onError={(e) => e.target.src = 'https://placehold.co/100x100/f87171/ffffff?text=Image'}
      />
      <div className="flex-grow">
        <h4 className="font-bold text-lg">{item.name}</h4>
        <p className="text-gray-600 text-sm">{item.restaurant}</p>
        <p className="text-orange-500 font-semibold mt-1">₹{itemPrice.toFixed(2)}</p>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end space-y-2">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
            className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100 rounded-l-lg"
          >
            -
          </button>
          <span className="px-4 py-1 text-md font-medium">{item.quantity || 1}</span>
          <button
            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100 rounded-r-lg"
          >
            +
          </button>
        </div>
        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 text-sm font-medium hover:text-red-700"
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartPage;