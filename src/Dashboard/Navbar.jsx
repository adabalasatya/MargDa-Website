import React, { useState } from "react";
import {
  FaUsers,
  FaSignOutAlt,
  FaBuilding,
  FaDatabase,
  FaUserTie,
  FaQrcode,
  FaShoppingCart, // Added shopping cart icon
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

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
      </div>

      {/* Buttons (Visible on larger screens) */}
      <div className="hidden sm:flex items-center w-full ml-10">
        {/* Centered Nav Items */}
        <div className="flex justify-start w-full space-x-4 sm:space-x-8">
          <button className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm">
            <FaBuilding className="mr-2" /> Workplace
          </button>
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
        </div>

        {/* Right Side Buttons */}
        <div className="flex space-x-4 sm:space-x-8 ml-auto mr-16">
        <Link
            to="/ddmart"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaShoppingCart className="mr-2" /> DDMart
          </Link>
          <Link
            to="/team"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaUsers className="mr-2" /> Team
          </Link>

        </div>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
              S
            </div>
            <span className="text-sm font-medium text-gray-700">Satya</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isProfileMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 transform transition-all duration-300 ease-in-out">
              <div className="p-2 space-y-1">
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center">👤</span>
                  <span>Profile</span>
                </Link>
                <Link
                  to="/credential"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center">🔑</span>
                  <span>Credential</span>
                </Link>
                <Link
                  to="/email-auth"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center">📧</span>
                  <span>Email Auth</span>
                </Link>
                <Link
                  to="/data-share"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center">📤</span>
                  <span>Data Share</span>
                </Link>
                <Link
                  to="/qr-scan"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <FaQrcode className="w-5 h-5 mr-2 text-gray-700" />
                  <span>WhatsApp Scan</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-red-100 rounded-lg transition-colors duration-300"
                >
                  <FaSignOutAlt className="w-5 h-5 mr-2 text-red-600" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;