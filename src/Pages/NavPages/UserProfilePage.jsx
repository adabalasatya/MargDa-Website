import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaQrcode, FaSignOutAlt,FaCode } from "react-icons/fa";

const UserProfile = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userName = userData ? userData.user_data.name : "User"; // Access user name
  const profilePicUrl = userData ? userData.user_data.pic_url : null; // Access profile picture URL
  const userInitial = userData ? userData.user_data.name.charAt(0).toUpperCase() : "U"; // Get user initial

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("userData");

    // Redirect to the home page
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleProfileMenu}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none"
      >
        {/* User Avatar with Profile Picture or Initials */}
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-orange-500 flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500">
          {profilePicUrl ? (
            <img
              src={profilePicUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-sm">{userInitial}</span>
          )}
        </div>
        {/* User Name */}
        <span className="text-sm font-medium text-gray-700">{userName}</span>
        {/* Dropdown Icon */}
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
            {/* Profile Section */}
            {userData && (
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-orange-500 flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500">
                    {profilePicUrl ? (
                      <img
                        src={profilePicUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">{userInitial}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{userData.user_data.name}</p>
                    <p className="text-xs text-gray-500">{userData.user_data.email}</p>
                  </div>
                </div>
              </div>
            )}
            {/* Links */}
            <Link
              to="/data-share"
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <span className="w-5 h-5 mr-2 flex items-center justify-center">📤</span>
              <span>Data Share</span>
            </Link>
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
            {/* <Link
              to="/dsc"
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <FaCode className="w-5 h-5 mr-2 text-gray-700" /> 
              <span>DSC</span>
            </Link> */}
            <Link
              to="/email-auth"
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <span className="w-5 h-5 mr-2 flex items-center justify-center">📧</span>
              <span>Email Auth</span>
            </Link>
           
            <Link
              to="/qr-scan"
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <FaQrcode className="w-5 h-5 mr-2 text-gray-700" />
              <span>WhatsApp Scan</span>
            </Link>
            {/* Logout Button */}
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
  );
};

export default UserProfile;