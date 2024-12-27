import React, { useState, useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaSms,
  FaPhone,
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronDown,
} from "react-icons/fa";

const Leads = () => {
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPincodeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePincodeSearch = () => {
    console.log("Searching for pincode:", pincodeSearch);
    setIsPincodeDropdownOpen(false);
  };

  const userData = [
    {
      id: 1,
      name: "Dhruti",
      email: "dhrua@gmail.com",
      phone: "91970777717",
      gender: "Female",
      whatsapp: "91970777717",
      location: {
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400001"
      },
    },
    {
      id: 2,
      name: "John",
      email: "john@example.com",
      phone: "91970777718",
      gender: "Male",
      whatsapp: "91970777718",
      location: {
        city: "New York",
        state: "NY",
        country: "USA",
        pincode: "10001"
      },
    },
    {
      id: 3,
      name: "Sara",
      email: "sara@example.com",
      phone: "91970777719",
      gender: "Female",
      whatsapp: "91970777719",
      location: {
        city: "London",
        state: "England",
        country: "UK",
        pincode: "SW1A 1AA"
      },
    },
  ];

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} action triggered`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col relative">
      {/* Navbar with Buttons */}
      <div className="flex justify-end mb-6">
        <div className="flex space-x-2">
          <button 
            onClick={() => handleBulkAction('whatsapp')}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </button>
          <button 
            onClick={() => handleBulkAction('email')}
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
          >
            <FaEnvelope className="mr-2" />
            Email
          </button>
          <button 
            onClick={() => handleBulkAction('phone')}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            <FaPhone className="mr-2" />
            Phone
          </button>
          <button 
            onClick={() => handleBulkAction('sms')}
            className="flex items-center bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
          >
            <FaSms className="mr-2" />
            SMS
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <div className="flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          {/* Show Records */}
          <label className="flex items-center">
            <span className="text-sm font-semibold mr-2">Show</span>
            <input
              type="number"
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(e.target.value)}
              className="border border-gray-300 p-2 rounded w-20"
              min="1"
            />
            <span className="text-sm font-bold ml-2">Records</span>
          </label>

          {/* Search Input */}
          <div className="relative w-full md:w-56">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-2 pl-10 rounded w-full"
              placeholder="Search"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4">
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
            
            {/* New Pincode Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsPincodeDropdownOpen(!isPincodeDropdownOpen)}
                className="border border-gray-300 p-2 rounded flex items-center justify-between min-w-[150px] bg-white"
              >
                <span className="text-gray-700">Pincode</span>
                <FaChevronDown className={`ml-2 transform transition-transform ${isPincodeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isPincodeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3">
                    <div className="relative mb-3">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={pincodeSearch}
                        onChange={(e) => setPincodeSearch(e.target.value)}
                        className="border border-gray-300 p-2 pl-10 rounded w-full"
                        placeholder="Search Pincode"
                      />
                    </div>
                    <button
                      onClick={handlePincodeSearch}
                      className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    >
                      Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
            + Task
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white p-4 shadow rounded-lg flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-16 py-2">Data</th>
              <th className="px-16 py-2">Location</th>
              <th className="px-4 py-2">Logs</th>
              <th className="px-4 py-2">Remarks</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs">Email: {item.email}</p>
                      <p className="text-xs">Phone: {item.phone}</p>
                      <p className="text-xs">Gender: {item.gender}</p>
                      <p className="text-xs">Whatsapp: {item.whatsapp}</p>
                    </div>
                  </div>
                </td>
                <td className="px-16 py-2">
                  <p className="text-xs">City: {item.location.city}</p>
                  <p className="text-xs">State: {item.location.state}</p>
                  <p className="text-xs">Country: {item.location.country}</p>
                  <p className="text-xs">Pincode: {item.location.pincode}</p>
                </td>
                <td className="px-4 py-2">
                  <p className="text-xs">Logged In: 2024-12-24 10:30 AM</p>
                  <p className="text-xs">Last Update: 2024-12-23</p>
                </td>
                <td className="px-4 py-2">
                  <p className="text-xs">Follow-up scheduled for 2024-12-26</p>
                  <p className="text-xs">Pending response from user</p>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <FaEdit className="text-gray-500 hover:text-orange-500 cursor-pointer" />
                    <FaTrash className="text-red-500 hover:text-orange-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing 1 to {recordsPerPage} of {userData.length} records
          </span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
              Previous
            </button>
            <button className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black text-center py-4 mt-6">
        <p>&copy; 2024 Margdarshak Media. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Leads;