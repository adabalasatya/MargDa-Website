import React, { useState } from "react";
import {
  FaUsers,
  FaDatabase,
  FaUserTie,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../Pages/NavPages/UserProfilePage";
import AddDataForm from "../Components/Dashboard/Data.jsx/AddDataForm";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAddDataFormOpen, setIsAddDataFormOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex items-center justify-between px-3 py-2 bg-white text-gray-800 shadow-md rounded-lg">
      {/* Mobile Menu Icon (Visible only on mobile screens) */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
        >
          {isMenuOpen ? (
            <FaTimes className="mr-2" />
          ) : (
            <FaBars className="mr-2" />
          )}
          Menu
        </button>
      </div>

      {/* User Profile Icon (Visible only on mobile screens) */}
      <div className="sm:hidden flex items-center ml-auto">
        <div className="px-3 py-2">
          <UserProfile />
        </div>
      </div>

      {isAddDataFormOpen && (
        <AddDataForm setIsAddDataFormOpen={setIsAddDataFormOpen} />
      )}

      {/* Mobile Menu (Visible only on mobile screens) */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="flex flex-col space-y-2 p-4">
            <Link
              to="/data"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
            >
              <FaDatabase className="mr-2" /> Data
            </Link>
            <button
              onClick={() => setIsAddDataFormOpen(true)}
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
            >
              (+) Add Data
            </button>
            <Link
              to="/lead"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
            >
              <FaUserTie className="mr-2" /> Lead
            </Link>
            <Link
              to="/consultants-panel"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
            >
              <FaUserTie className="mr-2" /> Advisor
            </Link>
            {loginUserID === 1 && (
              <Link
                to="/allusers"
                className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
              >
                <FaUserTie className="mr-2" /> All Users
              </Link>
            )}
            <Link
              to="/shop-Home"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
            >
              <FaShoppingCart className="mr-2" /> Mart
            </Link>
            <Link
              to="/team-support"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
            >
              <FaUsers className="mr-2" /> Team-Support
            </Link>
          </div>
        </div>
      )}

      {/* Buttons (Visible on larger screens) */}
      <div className="hidden sm:flex items-center w-full ml-10">
        {/* Centered Nav Items */}
        <div className="flex justify-start w-full space-x-4 sm:space-x-8 whitespace-nowrap">
          <Link
            to="/data"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaDatabase className="mr-2" /> Data
          </Link>
          <button
            onClick={() => setIsAddDataFormOpen(true)}
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out"
          >
            (+) Add Data
          </button>
          <Link
            to="/lead"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaUserTie className="mr-2" /> Lead
          </Link>
          <Link
            to="/consultants-panel"
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaUserTie className="mr-2" /> Advisor
          </Link>
          {loginUserID === 1 && (
            <Link
              to="/allusers"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
            >
              <FaUserTie className="mr-2" /> All Users
            </Link>
          )}
        </div>

        {/* Right Side Buttons */}
        <div className="flex space-x-4 sm:space-x-8 ml-auto mr-16 whitespace-nowrap">
          <Link
            to="/mart-home"
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
