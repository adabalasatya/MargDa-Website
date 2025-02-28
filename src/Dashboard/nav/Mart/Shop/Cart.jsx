import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faCartShopping,
  faEdit,
  faTrash,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist cart state in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update item quantity in cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }
    setError(null);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle buy action
  const handleBuy = (item) => {
    navigate("/payment-order", {
      state: { cart: [item], total: calculateItemTotal(item) },
    });
  };

  // Calculate total for a single item
  const calculateItemTotal = (item) => {
    return item.mrp - item.discount + (item.mrp * item.tax) / 100;
  };

  // Calculate total amount for all items
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
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
      navigate("/payment-order", {
        state: { cart, total: calculateAmountPayable() },
      });
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              onClick={() => navigate("/")} // Navigate to the home page
              className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faChalkboard} className="mr-2" />
              <span className="font-semibold">Dashboard</span>
            </button>
            <button
              onClick={() => navigate("/cart")} // Navigate to the cart page
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
        <h1 className="text-3xl font-bold mb-8 text-blue-500 flex items-center">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-blue-400 mr-2"
          />
          Your Cart
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Cart Items */}
        {cart.length > 0 ? (
          <>
            {/* Card Layout */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start gap-6"
                >
                  {/* Column 1: Images */}
                  <div className="flex flex-col gap-4 w-1/4">
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <img
                      src={item.videoThumbnail} // Replace with video thumbnail
                      alt="Video Thumbnail"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <img
                      src={item.brochure} // Replace with brochure image
                      alt="Brochure"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Column 2: Item Details */}
                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-bold">{item.itemName}</h2>
                    <p className="text-gray-600">
                      <span className="font-semibold">Brand:</span> {item.brand}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">MRP per kg:</span> ₹
                      {item.mrpPerKg}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Seller:</span>{" "}
                      {item.seller}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Details:</span>{" "}
                      {item.details}
                    </p>
                    <div className="flex items-center gap-4">
                      <label className="text-gray-700 font-semibold">
                        Quantity:
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        min="1"
                        className="w-16 p-1 border rounded"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-600">
                        <span className="font-semibold">MRP:</span> ₹{item.mrp}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Coupon:</span> [ ] if
                        any
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Discount:</span> ₹
                        {item.discount}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Total:</span> ₹
                        {calculateItemTotal(item).toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">
                          Tax @ {item.tax}%:
                        </span>{" "}
                        ₹{(item.mrp * item.tax) / 100}
                      </p>
                      <p className="text-gray-600 font-bold">
                        <span className="font-semibold">Amount Payable:</span> ₹
                        {calculateItemTotal(item).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Buy Now Button (Right Side) */}
                  <div className="flex items-center justify-end w-1/4">
                    <button
                      onClick={() => handleBuy(item)}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Totals Section */}
            <div className="mt-8 flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="text-gray-700">
                      ₹{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Tax (18% GST)</span>
                    <span className="text-gray-700">
                      ₹{calculateTax().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Total</span>
                    <span className="text-gray-700 font-semibold">
                      ₹{calculateAmountPayable().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Layout */}
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                {/* Table Headers */}
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-left">Brand</th>
                    <th className="px-4 py-2 text-left">Rate</th>
                    <th className="px-4 py-2 text-left">Qty</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{item.itemName}</td>
                      <td className="px-4 py-2">{item.brand}</td>
                      <td className="px-4 py-2">₹{item.mrp}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">
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
                      <td className="px-4 py-2">
                        ₹{calculateItemTotal(item).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleBuy(item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
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

            {/* Continue Shopping and Proceed to Payment Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => navigate("/shop")} // Navigate to the home page or shopping page
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
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

export default Cart;
