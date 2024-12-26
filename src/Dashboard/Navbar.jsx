import React, { useState } from "react";
import { FaUsers, FaSignOutAlt, FaBuilding, FaDatabase, FaUserTie, FaBars, FaWhatsapp, FaPhoneAlt, FaSms, FaVideo } from "react-icons/fa"; // Add the new icons
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate for programmatic navigation

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage the menu visibility
  const navigate = useNavigate(); // Initialize navigate

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu
  };

  const handleLogout = () => {
    // Clear authentication data (e.g., remove token from localStorage or sessionStorage)
    localStorage.removeItem("authToken"); // Replace with your authentication logic
    sessionStorage.removeItem("authToken");

    // Redirect to login page or home page after logout
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="relative flex items-center justify-between px-6 py-3 bg-white text-gray-800 shadow-md rounded-lg">
      {/* Left-aligned Title as a Button (Link to Dashboard) */}
      {/* Mobile Menu Icon (Visible only on mobile screens) */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="text-gray-800">
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Dropdown Menu (Visible only when the menu is open) */}
      <div 
        className={`absolute top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-64 sm:hidden 
        ${menuOpen ? "transition-transform duration-300 ease-out opacity-100 translate-y-0" : "transition-transform duration-300 ease-in opacity-0 -translate-y-12"}`}
      >
        <div className="space-y-4">
          <button
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
          >
            <FaBuilding className="mr-2" /> Workplace
          </button>

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

          {/* New Icons After Lead */}
          <Link 
            to="/whatsapp" 
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300 ease-in-out"
          >
            <FaWhatsapp className="mr-2" /> WhatsApp
          </Link>
          <Link 
            to="/phone" 
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
          >
            <FaPhoneAlt className="mr-2" /> Phone
          </Link>
          <Link 
            to="/sms" 
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-yellow-500 hover:text-white transition-colors duration-300 ease-in-out"
          >
            <FaSms className="mr-2" /> SMS
          </Link>
          <Link 
            to="/meeting" 
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out"
          >
            <FaVideo className="mr-2" /> Meeting
          </Link>

          <button className="flex items-center w-full px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out">
            <FaUsers className="mr-2" /> Team
          </button>
          <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Buttons (Visible on larger screens) */}
      <div className={`hidden sm:flex items-center  w-full ml-10`}>
        {/* Centered Nav Items */}
        <div className="flex justify-start w-full  space-x-4 sm:space-x-8">
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
          <button onClick={handleLogout} className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
