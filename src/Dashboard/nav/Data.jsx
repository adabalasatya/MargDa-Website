import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaWhatsapp,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronDown,
  FaUserCog,
  FaDatabase,
  FaMapMarkerAlt,
  FaClipboardList,
  FaStickyNote,
  FaUpload,
} from "react-icons/fa";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  gender: "Female",
  whatsapp: "",
  remarks: "",
};

const Data = () => {
  // State declarations
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataDetails, setDataDetails] = useState([
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
        pincode: "400001",
      },
      log: "Logged In: 2024-12-24 10:30 AM | Last Update: 2024-12-234",
      remarks: "Follow-up scheduled for 2024-12-26 | Pending response from use",
    },
    {
      id: 2,
      name: "Rajesh",
      email: "rajesh@example.com",
      phone: "919876543210",
      gender: "Male",
      whatsapp: "919876543210",
      location: {
        city: "New York",
        state: "NY",
        country: "USA",
        pincode: "10001",
      },
      log: "Logged In: 2024-12-24 09:15 AM | Last Update: 2024-12-22",
      remarks: "Follow-up scheduled for 2024-12-27 | Awaiting confirmation",
    },
  ]);

  const dropdownRef = useRef(null);

  // Effects
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPincodeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      whatsapp: name === "phone" ? value : prev.whatsapp,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: dataDetails.length + 1,
      ...formData,
      location: {
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
      log: `Logged in: ${new Date().toISOString().split("T")[0]}`,
    };

    setDataDetails((prev) => [...prev, newRecord]);
    setFormData(initialFormState);
    setIsAddFormOpen(false);
  };

  // Data handlers
  const handleDelete = (id) => {
    setDataDetails((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      console.log("File selected:", uploadedFile);
    }
  };

  const handlePincodeSearch = () => {
    if (pincodeSearch) {
      console.log("Searching for pincode:", pincodeSearch);
      setIsPincodeDropdownOpen(false);
    }
  };

  // Filtering and pagination
  const filteredData = dataDetails.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
            <FaUser className="mr-2" />
            Data
          </button>
          <button className="flex items-center px-5 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition">
            <FaUser className="mr-2" />
            Shortlist
          </button>
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center px-5 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition"
          >
            (+) Add
          </button>
          <button
            onClick={() => document.getElementById("csv-upload").click()}
            className="flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition"
          >
            <FaUpload className="mr-2" />
            Upload CSV
          </button>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Add Form Modal */}
      {isAddFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Record</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter remarks"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="bg-white p-2 shadow rounded-lg mb-6">
        <div className="flex flex-wrap items-center justify-between space-y-4 md:space-y-2">
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

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm text-left border-spacing-x-4">
            <thead>
              <tr className="text-gray-600 sticky top-0 bg-white z-10">
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaUserCog className="text-blue-600 w-4 h-4" />
                    <span>Action</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaDatabase className="text-purple-600 w-4 h-4" />
                    <span>Data</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-green-600 w-4 h-4" />
                    <span>Location</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaClipboardList className="text-yellow-600 w-4 h-4" />
                    <span>Log</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaStickyNote className="text-red-600 w-4 h-4" />
                    <span>Remarks</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRecords.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        title="Edit"
                        className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        title="Delete"
                        className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-blue-400 w-4 h-4" />
                        <span className="font-medium text-black">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-purple-400 w-4 h-4" />
                        <span className="text-black">{item.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaPhone className="text-green-400 w-4 h-4" />
                        <span className="text-black">{item.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaWhatsapp className="text-green-500 w-4 h-4" />
                        <span className="text-black">{item.whatsapp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaVenusMars className="text-pink-400 w-4 h-4" />
                        <span className="text-black">{item.gender}</span>
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

export default Data;