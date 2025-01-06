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
  FaVideo,
  FaVenusMars,
  FaBirthdayCake,
  FaLanguage,
  FaUserClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStickyNote,
  FaUserCog,
  FaDatabase,
  FaUserPlus
} from "react-icons/fa";

const Leads = () => {
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([
    {
      id: 1,
      name: "Dhruti",
      email: "dhrua@gmail.com",
      phone: "91970777717",
      gender: "Female",
      whatsapp: "91970777717",
      dob: "1990-05-15",
      age: 33,
      language: "Hindi",
      location: {
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400001",
      },
      log: "Logged In: 2024-12-24 10:30 AM | Last Update: 2024-12-23",
      remarks: "Follow-up scheduled for 2024-12-26 | Pending response from user",
    },
    {
      id: 2,
      name: "John",
      email: "john@example.com",
      phone: "91970777718",
      gender: "Male",
      whatsapp: "91970777718",
      dob: "1985-10-22",
      age: 38,
      language: "English",
      location: {
        city: "New York",
        state: "NY",
        country: "USA",
        pincode: "10001",
      },
      log: "Logged In: 2024-12-24 09:15 AM | Last Update: 2024-12-22",
      remarks: "Follow-up scheduled for 2024-12-27 | Awaiting confirmation",
    },
    {
      id: 3,
      name: "Sara",
      email: "sara@example.com",
      phone: "91970777719",
      gender: "Female",
      whatsapp: "91970777719",
      dob: "1995-03-30",
      age: 28,
      language: "Spanish",
      location: {
        city: "London",
        state: "England",
        country: "UK",
        pincode: "SW1A 1AA",
      },
      log: "Logged In: 2024-12-24 11:45 AM | Last Update: 2024-12-21",
      remarks: "Follow-up scheduled for 2024-12-28 | No response yet",
    },
  ]);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPincodeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle pincode search
  const handlePincodeSearch = () => {
    console.log("Searching for pincode:", pincodeSearch);
    setIsPincodeDropdownOpen(false);
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} action triggered`);
  };

  // Handle delete
  const handleDelete = (id) => {
    setUserData((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter data based on search query
  const filteredData = userData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col relative">
      <div>
      <button
    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-orange-600 transition"
  >
    <FaUserPlus className="mr-2" /> 
     Lead
  </button>
        </div>
      {/* Navbar with Buttons */}
      <div className="flex justify-end mb-6">
        <div className="flex space-x-2">
        
          <button
            onClick={() => handleBulkAction("email")}
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
          >
            <FaEnvelope className="mr-2" />
            Email
          </button>

          <button
            onClick={() => handleBulkAction("whatsapp")}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </button>

          <button
            onClick={() => handleBulkAction("meet")}
            className="flex items-center bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
          >
            <FaVideo className="mr-2" />
            Meet
          </button>

          <button
            onClick={() => handleBulkAction("sms")}
            className="flex items-center bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
          >
            <FaSms className="mr-2" />
            SMS
          </button>

          <button
            onClick={() => handleBulkAction("phone")}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            <FaPhone className="mr-2" />
            Call
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-2 shadow rounded-lg mb-6">
        <div className="flex flex-wrap items-center justify-between space-y-4 md:space-y-2">
          {/* Show Records */}
          <label className="flex items-center">
            <span className="text-sm font-semibold mr-2">Show</span>
            <input
              type="number"
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded w-20"
              min="1"
            />
            <span className="text-sm font-bold ml-2">Records</span>
          </label>

          {/* Search Input */}
          <div className="relative w-full md:w-48">
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
          <div className="flex flex-wrap items-center space-x-3">
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
                <FaChevronDown
                  className={`ml-2 transform transition-transform ${
                    isPincodeDropdownOpen ? "rotate-180" : ""
                  }`}
                />
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
      <div className="bg-white p-6 shadow-lg rounded-lg flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left border-separate border-spacing-x-4">
          {/* Table Headers */}
          <thead className="top-0 z-10">
            <tr>
              <th className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <FaUserCog className="text-blue-500 w-4 h-4" />
                  <span className="font-medium text-gray-700">Actions</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <FaDatabase className="text-green-500 w-4 h-4" />
                  <span className="font-medium text-gray-700">Data</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-yellow-600 w-4 h-4" />
                  <span className="font-medium text-gray-700">Location</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-purple-500 w-4 h-4" />
                  <span className="font-medium text-gray-700">Logs</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <FaStickyNote className="text-red-500 w-4 h-4" />
                  <span className="font-medium text-gray-700">Remarks</span>
                </div>
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentRecords.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      title="Edit"
                      className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <FaEnvelope className="text-purple-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">{item.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaPhone className="text-green-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">{item.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaVenusMars className="text-pink-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">{item.gender}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaWhatsapp className="text-green-600 w-4 h-4" />
                          <span className="text-xs text-gray-600">{item.whatsapp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaBirthdayCake className="text-yellow-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">{item.dob}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaUserClock className="text-blue-400 w-4 h-4" />
                          <span className="text-xs text-gray-600">Age: {item.age}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaLanguage className="text-orange-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">{item.language}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-2">
                <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
               <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
              <p className="text-xs text-black">City: {item.location.city}</p>
               </div>
              <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
               <p className="text-xs text-black">State: {item.location.state}</p>
                   </div>
           <div className="flex items-center space-x-2">
             <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                  <p className="text-xs text-black">Country: {item.location.country}</p>
               </div>
                 <div className="flex items-center space-x-2">
                       <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                 <p className="text-xs text-black">Pincode: {item.location.pincode}</p>
             </div>
                  </div>
                 </td>

             <td className="px-4 py-3">
          <div className="flex items-center space-x-2">
         <FaSearch className="text-yellow-500 w-4 h-4" />
        <span className="text-black">{item.log}</span>
         </div>
         </td>

        <td className="px-4 py-3">
         <div className="flex items-center space-x-2">
               <FaStickyNote className="text-red-400 w-4 h-4" />
                     <span className="text-black">{item.remarks}</span>
                            </div>
                        </td>  
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} records
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
            }`}
          >
            {"<<"} Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 ${
                currentPage === page
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } rounded`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
            }`}
          >
            Next {">>"}
          </button>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>(c) Copyright 2024 Margdarshak Media</p>
      </div>
    </div>
  );
};

export default Leads;