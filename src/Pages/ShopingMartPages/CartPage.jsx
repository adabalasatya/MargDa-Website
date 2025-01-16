import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faCartShopping, faTrash, faEdit, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited

  // Persist cart state in localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update item quantity in cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      setError('Quantity must be at least 1.');
      return;
    }
    setError(null);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle edit action
  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to be edited
  };

  // Save edited details
  const saveEditedDetails = () => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === editingItem.id ? editingItem : item
      )
    );
    setEditingItem(null); // Clear the editing state
  };

  // Handle buy action
  const handleBuy = (item) => {
    navigate('/place-order', { state: { cart: [item], total: calculateItemTotal(item) } });
  };

  // Calculate total for a single item
  const calculateItemTotal = (item) => {
    return parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity;
  };

  // Calculate total amount for all items
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity,
      0
    );
  };

  // Calculate tax (configurable rate, e.g., 18% GST)
  const calculateTax = (taxRate = 0.18) => {
    return calculateTotal() * taxRate;
  };

  // Calculate amount payable
  const calculateAmountPayable = () => {
    return calculateTotal() + calculateTax();
  };

  // Handle checkout
  const handleCheckout = () => {
    setLoading(true);
    // Simulate an async operation (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      navigate('/place-order', {
        state: { cart, total: calculateAmountPayable() },
      });
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://margdarshak.org/img/margdarshakendra.png" // Replace with your logo URL
              alt="Logo"
              className="h-12"
            />
          </div>

          {/* Dashboard and Cart buttons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/')} // Navigate to the home page
              className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faChalkboard} className="mr-2" />
              <span className="font-semibold">Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/cart')} // Navigate to the cart page
              className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              <span className="font-semibold">Cart</span>
              <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto pt-24 pb-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Cart Items Table */}
        {cart.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-left">Brand</th>
                    <th className="p-2 text-left">Rate</th>
                    <th className="p-2 text-left">Qty</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2 flex items-center">
                        <img
                          src={item.image} // Replace with your image URL
                          alt={item.itemName}
                          className="w-12 h-12 object-cover rounded mr-4"
                        />
                        <span>{item.itemName}</span>
                      </td>
                      <td className="p-2">{item.brand || 'N/A'}</td>
                      <td className="p-2">{item.price}</td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          min="1"
                          className="w-16 p-1 border rounded"
                        />
                      </td>
                      <td className="p-2">
                        ₹{calculateItemTotal(item).toFixed(2)}
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleBuy(item)}
                            className="text-green-500 hover:text-green-700"
                          >
                            <FontAwesomeIcon icon={faShoppingCart} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit Modal */}
            {editingItem && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Edit Item</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700">Item Name</label>
                      <input
                        type="text"
                        value={editingItem.itemName}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, itemName: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Brand</label>
                      <input
                        type="text"
                        value={editingItem.brand}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, brand: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Quantity</label>
                      <input
                        type="number"
                        value={editingItem.quantity}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })
                        }
                        min="1"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setEditingItem(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEditedDetails}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Totals Section */}
            <div className="mt-8 flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="text-gray-700">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Tax (18% GST)</span>
                    <span className="text-gray-700">₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Total</span>
                    <span className="text-gray-700 font-semibold">₹{calculateAmountPayable().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping and Proceed to Payment Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => navigate('/shop')} // Navigate to the home page or shopping page
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;