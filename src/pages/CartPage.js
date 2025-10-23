import React from 'react';
// Note the updated import paths
import { CartItemCard } from '../components/ReusableComponents';

/**
 * The Cart/Checkout Page component.
 */
const CartPage = ({ cart, updateQuantity, removeFromCart, cartTotal }) => {
  const deliveryFee = 25.00;
  const taxes = cartTotal * 0.05; // 5% tax
  const total = cartTotal + deliveryFee + taxes;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <span role="img" aria-label="shopping cart" className="text-8xl text-gray-300">🛒</span>
          <h3 className="text-xl font-semibold mt-4">Your cart is empty</h3>
          <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="space-y-3">
            {cart.map(item => (
              <CartItemCard 
                key={item.id} 
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2 border-t-2 border-orange-500">
            <h3 className="text-lg font-bold mb-3">Order Summary</h3>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Taxes (5%)</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Checkout Button */}
          <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg shadow-lg text-lg transition-transform duration-300 hover:bg-orange-600">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};
export default CartPage;
