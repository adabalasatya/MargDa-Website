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
  FaUserPlus,
} from "react-icons/fa";
import WhatsAppCon from "../../Components/Dashboard/SendWhatsappCon";
import EmailCon from "../../Components/Dashboard/SendEmailCon"; // Import the EmailCon component

const Leads = () => {
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [selectAll, setSelectAll] = useState(false); // Track "Select All" state
  const [showWhatsAppSend, setShowWhatsAppSend] = useState(false);
  const [showEmailSend, setShowEmailSend] = useState(false); // State for email modal

  const dropdownRef = useRef(null);

  // Retrieve userID and AccessToken from localStorage
  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://margda.in:7000/api/margda.org/get-leads",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response status:", response.status); // Log the status code for debugging

        // Handle non-OK responses
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Check if the response contains a "message" indicating no leads were found
        if (data.message && data.message === "Leads not found") {
          setUserData([]); // Set userData to an empty array
          setError("Leads not found"); // Set a user-friendly error message
        } else if (data.Leads && Array.isArray(data.Leads)) {
          setUserData(data.Leads); // Set the array of leads
          setError(null); // Clear any previous error messages
        } else {
          setUserData([]); // Fallback to an empty array
          setError("Invalid data format received from the server");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    console.log(
      `Bulk ${action} action triggered for selected rows:`,
      selectedRows
    );
    if (selectedRows.length === 0) {
      alert("Select at least one lead");
      return;
    }

    switch (action) {
      case "whatsapp":
        setShowWhatsAppSend(true);
        break;
      case "email":
        setShowEmailSend(true); // Show the email modal
        break;
      default:
        console.log(`Bulk action "${action}" not implemented`);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/delete-lead",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dataID: id }), // Send the dataID to delete
        }
      );

      console.log("Delete API Response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      const data = await response.json();
      console.log("Delete API Response:", data);

      if (data.message === "Lead deleted successfully") {
        // Remove the deleted lead from the UI
        setUserData((prev) => prev.filter((item) => item.dataID !== id));
        setSelectedRows((prev) => prev.filter((rowId) => rowId !== id)); // Remove from selected rows if applicable
      } else {
        throw new Error(data.message || "Failed to delete lead");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      setError(error.message);
    }
  };

  // Handle row selection
  const handleRowSelect = (lead) => {
    if (lead.mobile.includes("**")) {
      return alert("You can't select this lead");
    }
    if (selectedRows.includes(lead)) {
      setSelectedRows(selectedRows.filter((item) => item !== lead));
    } else {
      setSelectedRows([...selectedRows, lead]);
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRecords.map((item) => item));
    }
    setSelectAll(!selectAll);
  };

  // Filter data based on search query
  const filteredData = userData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
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

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  const handleRecordsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse the input value as an integer
    if (value < 1) {
      setRecordsPerPage(1); // Set to 1 if the value is less than 1
    } else {
      setRecordsPerPage(value); // Otherwise, set the value
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col relative">
      <div>
        <button className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
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
              onChange={handleRecordsPerPageChange}
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
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="font-medium text-gray-700">Select All</span>
                </div>
              </th>
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
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item)}
                    onChange={() => handleRowSelect(item)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                </td>
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
                      onClick={() => handleDelete(item.dataID || item.userID)} // Call handleDelete with dataID
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <FaEnvelope className="text-purple-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">
                            {item.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaPhone className="text-green-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">
                            {item.mobile}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaVenusMars className="text-pink-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">
                            {item.gender}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaWhatsapp className="text-green-600 w-4 h-4" />
                          <span className="text-xs text-gray-600">
                            {item.whatsapp}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaBirthdayCake className="text-yellow-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">
                            {item.dob}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaUserClock className="text-blue-400 w-4 h-4" />
                          <span className="text-xs text-gray-600">
                            Age: {item.age}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaLanguage className="text-orange-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">
                            {item.language}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-2">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">City: {item.city}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">State: {item.state}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        Country: {item.country}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        Pincode: {item.pincode}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-yellow-500 w-4 h-4" />
                      <span className="text-black">{item.log}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaStickyNote className="text-red-400 w-4 h-4" />
                      <span className="text-black">{item.remarks}</span>
                    </div>
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
          Showing {indexOfFirstRecord + 1} to{" "}
          {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
          {filteredData.length} records
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
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
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Next {">>"}
          </button>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsAppSend && (
        <WhatsAppCon
          selectedLeads={selectedRows}
          setSendWhatsApp={setShowWhatsAppSend}
        />
      )}

      {/* Email Modal */}
      {showEmailSend && (
        <EmailCon
          setSelectedLeads={setSelectedRows}
          selectedLeads={selectedRows}
          setSendEmail={setShowEmailSend}
        />
      )}

      {/* Copyright Footer */}
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>(c) Copyright 2024 Margdarshak Media</p>
      </div>
    </div>
  );
};

export default Leads;