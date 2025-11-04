import React from 'react';


export const SelectAddressOverlay = ({ isOpen, onClose, onSelect, addresses }) => {
  if (!isOpen) {
    return null; // Don't render anything if it's not open
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white p-6 pt-8 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select an Address</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* List of Addresses */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {addresses.length > 0 ? (
            addresses.map((addr, index) => (
              <div 
                key={index} 
                className="border p-3 rounded-md bg-gray-50 flex justify-between items-center"
              >
                <div className="text-sm">
                  <p className="font-semibold">{addr.street}</p>
                  <p className="text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-gray-600">Phone: {addr.phone}</p>
                </div>
                <button
                  onClick={() => onSelect(addr)}
                  className="bg-orange-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-orange-600 text-sm"
                >
                  Select
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You have no saved addresses.</p>
          )}
        </div>
      </div>
    </div>
  );
};