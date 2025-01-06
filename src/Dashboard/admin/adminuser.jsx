import React from 'react';
import {
  FaDatabase,
  FaPlus,
  FaQrcode,
  FaUserTie,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaBuilding,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaVenusMars,
  FaCalendarAlt,
  FaLanguage,
  FaUser,
  FaMapMarkerAlt,
  FaTag,
  FaInfoCircle,
  FaBriefcase,
  FaGraduationCap,
  FaHeart,
  FaBan,
  FaSlidersH,
  FaLink,
  FaUserCircle,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Adminuser = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setProfileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    navigate('/');
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  // Sample data for the table
  const tableData = [
    {
      id: 1,
      name: 'Dhruti',
      email: 'dhrua@gmail.com',
      phone: '91970777717',
      whatsapp: '91970777717',
      gender: 'Female',
      dob: '1990-01-01',
      age: 34,
      language: 'English',
      location: 'Mumbai',
      type: 'Jobs',
      status: 'Invalid',
    },
    // Add more data as needed
  ];

  return (
    <div>
      {/* Navbar */}
      <div className="relative flex items-center justify-between px-6 py-3 bg-white text-gray-800 shadow-md rounded-lg">
       
        {/* Buttons (Visible on larger screens) */}
        <div className="hidden sm:flex items-center w-full ml-10">
          {/* Centered Nav Items */}
          <div className="flex justify-start w-full space-x-4 sm:space-x-8">
            <Link
              to="/admin"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
            >
              <FaDatabase className="mr-2" /> Data
            </Link>
            <Link
              to="/user"
              className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
            >
              <FaUserTie className="mr-2" /> User
            </Link>
          </div>

       {/* Right Side Buttons */}
             <div className="flex space-x-4 sm:space-x-8 ml-auto mr-16 whitespace-nowrap">
       <Link
         to=""
         className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
       >
         <FaShoppingCart className="mr-2" /> Mart
       </Link>
       <Link
         to=""
         className="flex items-center px-3 py-2 text-xs font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-sm"
       >
         <FaUsers className="mr-2" /> Team-Support
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
                  isProfileMenuOpen ? 'rotate-180' : ''
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

      {/* Main Content */}
      <div className="p-4 bg-gray-100 rounded-lg">
        {/* Header with Add and Upload options */}
        <div className="flex items-center justify-between mb-4">
          {/* Left Side: Data Title and Icon */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">
              <FaDatabase className="text-blue-500" /> {/* Icon */}
            </span>
            <span className="text-xl font-semibold text-gray-800">User</span>
          </div>

          {/* Right Side: Add and Upload Buttons */}
          <div className="flex items-center space-x-4">
            {/* Add Button */}
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              <FaPlus className="mr-2" /> {/* Icon */}
              Add
            </button>
          </div>
        </div>

        {/* Search and Records Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-700">Show</span>
            <input
              type="number"
              defaultValue="10"
              className="border border-gray-300 p-2 rounded w-20"
              min="1"
            />
            <span className="text-sm font-semibold text-gray-700">Records</span>
          </div>
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 p-2 pl-10 rounded w-full"
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex items-center space-x-4 mb-4">
          <select className="border border-gray-300 p-2 rounded">
            <option>Data Type</option>
            <option>Lead</option>
            <option>Customer</option>
            <option>Prospect</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>Country</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>State</option>
            <option>Maharashtra</option>
            <option>New York</option>
            <option>London</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>District</option>
            <option>Mumbai</option>
            <option>Manhattan</option>
            <option>Westminster</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>Pin Code</option>
            <option>400001</option>
            <option>10001</option>
            <option>SW1A 1AA</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>Place</option>
            <option>Mumbai</option>
            <option>New York</option>
            <option>London</option>
          </select>
        </div>

        {/* Table Section */}
<div className="bg-white rounded-lg shadow-md p-6">
  <table className="table-auto w-full text-sm text-left">
    <thead className="bg-gray-200">
      <tr>
        <th className="px-4 py-3 text-gray-600">
          <div className="flex items-center space-x-2">
            <FaEdit className="text-gray-500" /> {/* Icon for Action */}
            <span>Action</span>
          </div>
        </th>
        <th className="px-4 py-3 text-gray-600">
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-500" /> {/* Icon for Data */}
            <span>Data</span>
          </div>
        </th>
        <th className="px-4 py-3 text-gray-600">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-500" /> {/* Icon for Location */}
            <span>Location</span>
          </div>
        </th>
        <th className="px-4 py-3 text-gray-600">
          <div className="flex items-center space-x-2">
            <FaTag className="text-gray-500" /> {/* Icon for Type */}
            <span>Type</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {tableData.map((item) => (
        <tr key={item.id} className="hover:bg-gray-100 transition">
          {/* Action Column */}
          <td className="px-4 py-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-500 border-blue-300 rounded focus:ring-blue-500"
                /> {/* [ ] (pic) */}
                <span className="text-gray-600">(pic)</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEdit className="text-blue-500" /> {/* (icon) Edit */}
                <span className="text-blue-500">Edit</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaTrash className="text-red-500" /> {/* (icon) Delete */}
                <span className="text-red-500">Delete</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaInfoCircle className="text-red-500" /> {/* (i) Invalid */}
                <span className="text-red-500">Invalid</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaBan className="text-gray-500" /> {/* (icon) Inactive */}
                <span className="text-gray-600">Inactive</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaSlidersH className="text-purple-500" /> {/* (icon) Variable */}
                <span className="text-purple-500">Variable</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaLink className="text-green-500" /> {/* (icon) Link */}
                <span className="text-green-500">Link</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-orange-500" /> {/* (icon) Account */}
                <span className="text-orange-500">Account</span>
              </div>
            </div>
          </td>
          {/* Data Column */}
          <td className="px-4 py-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-500" />
                <span className="font-medium text-black-800">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-red-500" />
                <span className="text-black-600">{item.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-blue-500" />
                <span className="text-black-600">{item.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaWhatsapp className="text-green-500" />
                <span className="text-black-600">{item.whatsapp}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaVenusMars className="text-purple-500" />
                <span className="text-black-600">{item.gender}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-orange-500" />
                <span className="text-black-600">{item.dob}, Age:{item.age}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaLanguage className="text-brown-500" />
                <span className="text-black-600">{item.language}</span>
              </div>
            </div>
          </td>
          {/* Location Column */}
          <td className="px-4 py-3 text-gray-600">{item.location}</td>
          {/* Type Column */}
          <td className="px-4 py-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaBriefcase className="text-blue-500" /> {/* Jobs Icon */}
                <span>Jobs</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaGraduationCap className="text-green-500" /> {/* Learner Icon */}
                <span>Learner</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaHeart className="text-red-500" /> {/* Matri Icon */}
                <span>Matri</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-500 border-blue-300 rounded focus:ring-blue-500"
                /> {/* [ ] Advisor */}
                <span>Advisor</span>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="mt-4 flex justify-between items-center">
    <span className="text-gray-600 text-sm">
      Showing 1 to {tableData.length} of {tableData.length} entries
    </span>
    <div className="flex space-x-2">
      <button className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300">
        Previous
      </button>
      <button className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300">
        Next
      </button>
    </div>
  </div>
</div>

        {/* Footer Section */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>© Copyright 2024 Margdarshak Media</p>
        </div>
      </div>
    </div>
  );
};

export default Adminuser;