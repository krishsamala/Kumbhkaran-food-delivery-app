import React from 'react';

/**
 * The Cart Page component.
 * Displays items in the cart and a summary.
 */
const CartPage = ({ cart, updateCartQuantity, removeFromCart }) => {
  // Calculate total price
  // We add (item.price || 0) and (item.quantity || 1) to prevent crashes
  // if data is missing. This is a defensive fix.
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = subtotal > 0 ? 2.50 : 0; // $2.50 delivery fee if cart not empty
  const total = subtotal + deliveryFee;

  const isEmpty = cart.length === 0;

  const handleAddress=()=>{

  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Your Cart</h2>

      {isEmpty ? (
        <p className="text-gray-600 text-lg">Your cart is empty. Add some food!</p>
      ) : (
        // Two-column layout for desktop
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Cart Items (Left Column) */}
          <div className="md:col-span-2 space-y-4">
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
          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  {/* We use (subtotal || 0) just in case, though it should be safe */}
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
              <button className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-orange-600 transition-colors">
                Proceed to Checkout
              </button>
              <button className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-green-600 transition-colors"
              onClick={handleAddress}
              >
                + Add Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * A card component for displaying a single item in the cart.
 */
const CartItemCard = ({ item, updateCartQuantity, removeFromCart }) => {
  // Use (item.price || 0) to prevent crash if price is missing
  const itemPrice = item.price || 0;

  return (
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

