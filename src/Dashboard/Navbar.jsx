import React from "react";
import { FaUsers, FaSignOutAlt, FaBuilding, FaDatabase, FaUserTie, FaWhatsapp, FaPhoneAlt, FaSms, FaVideo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    // Clear authentication data (e.g., remove token from localStorage or sessionStorage)
    localStorage.removeItem("authToken"); // Replace with your authentication logic
    sessionStorage.removeItem("authToken");

    // Redirect to login page or home page after logout
    navigate("/"); // Redirect to the login page
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
          <button
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
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

        {/* Other Buttons (Logout) */}
        <div className="flex space-x-4 sm:space-x-8">
          <Link
            to="/team"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaUsers className="mr-2" /> Team
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;