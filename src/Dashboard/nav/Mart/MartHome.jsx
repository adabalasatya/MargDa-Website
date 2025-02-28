import React from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaShoppingCart,
  FaTag,
  FaCartPlus,
  FaCreditCard,
} from "react-icons/fa"; // Import all required icons

const MartHome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Animated h1 */}
      <h1 className="text-4xl font-bold text-center mb-32 animate-slide-up">
        Welcome to Mart
      </h1>

      {/* App Links in 3-column Grid */}
      <nav className="w-full max-w-2xl">
        <ul className="grid grid-cols-3 gap-6 justify-center">
          {/* Add Products Card */}
          <li className="flex justify-center">
            <Link
              to="/seller-add-product"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-blue-600 hover:text-blue-800 w-48"
            >
              <FaEdit className="w-12 h-12 mb-4" />
              <span className="text-lg font-semibold">Add Products</span>
            </Link>
          </li>

          {/* Coupon Card */}
          <li className="flex justify-center">
            <Link
              to="/seller-coupon"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-green-600 hover:text-green-800 w-48"
            >
              <FaTag className="w-12 h-12 mb-4" />
              <span className="text-lg font-semibold">Coupon</span>
            </Link>
          </li>

          {/* Shopping Mart Card */}
          <li className="flex justify-center">
            <Link
              to="/shop"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-red-600 hover:text-red-800 w-48"
            >
              <FaShoppingCart className="w-12 h-12 mb-4" />
              <span className="text-lg font-semibold">Mart</span>
            </Link>
          </li>

          {/* 
          <li className="flex justify-center">
            <Link
              to="/cart-form"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-purple-600 hover:text-purple-800 w-48"
            >
              <FaCartPlus className="w-12 h-12 mb-4" />
              <span className="text-lg font-semibold">Cart</span>
            </Link>
          </li>
 
          <li className="flex justify-center">
            <Link
              to="/payment-form"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-yellow-600 hover:text-yellow-800 w-48"
            >
              <FaCreditCard className="w-12 h-12 mb-4" />
              <span className="text-lg font-semibold">Payment</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default MartHome;
