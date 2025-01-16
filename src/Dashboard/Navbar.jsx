import React, { useState } from "react";
import {
  FaUsers,
  FaDatabase,
  FaUserTie,
  FaShoppingCart,
  FaCreditCard, // Import a payment icon
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../Pages/NavPages/UserProfilePage";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const loginUserID = userData ? userData.user_data.userID : null;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="relative flex items-center justify-between px-6 py-3 bg-white text-gray-800 shadow-md rounded-lg">
      {/* Mobile Buttons (Visible only on mobile screens) */}
      <div className="sm:hidden flex space-x-4">
        <Link
          to="/data"
          className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
        >
          <FaDatabase className="mr-2" /> Data
        </Link>
        <Link
          to="/lead"
          className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
        >
          <FaUserTie className="mr-2" /> Lead
        </Link>
        <Link
          to="/payment"
          className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
        >
          <FaCreditCard className="mr-2" /> Payment
        </Link>
      </div>

      {/* Buttons (Visible on larger screens) */}
      <div className="hidden sm:flex items-center w-full ml-10">
        {/* Centered Nav Items */}
        <div className="flex justify-start w-full space-x-4 sm:space-x-8">
          <Link
            to="/data"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaDatabase className="mr-2" /> Data
          </Link>
          <Link
            to="/lead"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaUserTie className="mr-2" /> Lead
          </Link>
          {loginUserID === 1 && (
            <Link
              to="/allusers"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
            >
              <FaUserTie className="mr-2" /> All Users
            </Link>
          )}

          <Link
            to="/payment"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaCreditCard className="mr-2" /> Payment
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex space-x-4 sm:space-x-8 ml-auto mr-16 whitespace-nowrap">
          <Link
            to="/shop-Home"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaShoppingCart className="mr-2" /> Mart
          </Link>
          <Link
            to="/team-support"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaUsers className="mr-2" /> Team-Support
          </Link>
        </div>

        {/* Profile Section */}
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
