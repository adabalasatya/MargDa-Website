import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  // State to manage cart items
  const [cart, setCart] = useState([]);

  // Handle back to shop
  const handleBackToShop = () => {
    navigate('/shop');
  };

  // Handle adding item to cart
  const handleAddToCart = () => {
    if (product) {
      setCart([...cart, product]); // Add the item to the cart
      alert(`${product.itemName} added to cart!`); // Show a confirmation message
    }
  };

  // Handle Buy Now - Add item to cart and redirect to cart page
  const handleBuyNow = () => {
    if (product) {
      setCart([...cart, product]); // Add the item to the cart
      navigate('/cart', { state: { cart: [...cart, product] } }); // Navigate to the cart page with updated cart
    }
  };

  if (!product) {
    return <div className="text-center text-red-500 text-2xl mt-8">Product not found.</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md py-4 px-8 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://margdarshak.org/img/margdarshakendra.png"
              alt="Logo"
              className="h-12"
            />
          </div>

          {/* Cart Button */}
          <button
            onClick={() => navigate('/cart', { state: { cart } })}
            className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
            <span className="font-semibold">Cart</span>
            <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
              {cart.length} {/* Dynamic cart count */}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToShop}
            className="mb-6 text-blue-500 hover:text-blue-600 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Shop
          </button>

          {/* Split-Screen Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Section */}
            <div className="flex justify-center items-center">
              <img
                src={product.image}
                alt={product.itemName}
                className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Product Details Section */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-800">
                {product.itemName}
              </h1>

              {/* Brand and Seller */}
              <div className="space-y-2 ">
                <p className="text-gray-600">
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Seller:</span> {product.seller}
                </p>
              </div>

              {/* MRP and Details */}
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">MRP per kg:</span> {product.mrpPerKg}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Details:</span> {product.details}
                </p>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  defaultValue={product.quantity}
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">MRP:</span> ₹{product.mrp}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Discount:</span> ₹{product.discount}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Tax @ {product.tax}%:</span> ₹
                  {(product.mrp * product.tax) / 100}
                </p>
                <p className="text-gray-600 font-bold">
                  <span className="font-semibold">Total:</span> ₹
                  {product.mrp - product.discount + (product.mrp * product.tax) / 100}
                </p>
              </div>

              {/* Coupon Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Coupon:
                </label>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;