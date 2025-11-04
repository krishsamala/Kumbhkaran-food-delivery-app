import React, { useState } from 'react';

/**
 * A modal overlay component for adding a new delivery address.
 * * Props:
 * - onClose: Function to call when closing the modal.
 * - onSave: Function to call when saving the address. It passes the address data.
 */
export const AddressOverlay = ({ onClose, onSave }) => {
  // Use state to control each form field
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Package all the state data into one object
    const addressData = {
      street,
      landmark,
      city,
      state,
      pincode,
      phone,
    };
    
    // Pass the data up to the parent component (CartPage)
    onSave(addressData);
  };

  return (
    // Backdrop: Covers the entire screen
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose} // Click backdrop to close
    >
      {/* Modal: The white content box */}
      <div
        className="bg-white p-6 pt-8 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Stop click inside modal from closing it
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add New Address</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
          >
            &times; {/* Close button */}
          </button>
        </div>

        {/* Address Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Flat, House no., Building, Company
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-green-600 transition-colors"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};