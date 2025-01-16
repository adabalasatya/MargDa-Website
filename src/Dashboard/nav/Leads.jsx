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
  FaUser,
  FaClipboardList,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import WhatsAppCon from "../../Components/Dashboard/SendWhatsappCon";
import EmailCon from "../../Components/Dashboard/SendEmailCon";
import SendSmsCon from "../../Components/Dashboard/SendSmsCon";
import CallCon from "../../Components/Dashboard/SendCallCon";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Leads = () => {
  // State variables
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [showWhatsAppSend, setShowWhatsAppSend] = useState(false);
  const [showEmailSend, setShowEmailSend] = useState(false);
  const [showSmsSend, setShowSmsSend] = useState(false);
  const [showCallCon, setShowCallCon] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [enableTableScroll, setEnableTableScroll] = useState(false); // New state for scroll control

  const dropdownRef = useRef(null);

  // Retrieve userID and AccessToken from localStorage
  const userLocalData = JSON.parse(localStorage.getItem("userData")) || {};
  const accessToken = userLocalData.access_token || null;
  const loginUserID = userLocalData.user_data?.userID || null;

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

        if (!response.ok) {
          if (response.status == 404) {
            return setUserData([]);
          }
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data.message && data.message === "Leads not found") {
          setUserData([]);
          // setError("Leads not found");
        } else if (data.Leads && Array.isArray(data.Leads)) {
          const transformedData = data.Leads.map((item) => ({
            id: item.dataID || item.userID,
            dataId: item.dataID,
            userId: item.userID,
            name: item.name || "N/A",
            email: item.email || "N/A",
            phone: item.mobile || "N/A",
            gender:
              item.gender === "M"
                ? "Male"
                : item.gender === "F"
                ? "Female"
                : "Other",
            whatsapp: item.whatsapp || item.mobile || "N/A",
            location: {
              city: item.city || "N/A",
              state: item.state || "N/A",
              country: item.country || "N/A",
              pincode: item.pincode || "N/A",
            },
            log: `Logged in: ${new Date(
              item.edate || Date.now()
            ).toLocaleString()}`,
            remarks: item.remarks || "No remarks",
            euser: item.euser || null,
            isShortlisted: item.isShortlisted || false,
          }));
          setUserData(transformedData);
          setError(null);
        } else {
          setUserData([]);
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
  }, [accessToken]);

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
    if (selectedRows.size === 0) {
      alert("Select at least one lead");
      return;
    }

    switch (action) {
      case "whatsapp":
        setShowWhatsAppSend(true);
        break;
      case "email":
        setShowEmailSend(true);
        break;
      case "sms":
        setShowSmsSend(true);
        break;
      case "phone":
        setShowCallCon(true);
        break;
      default:
        console.log(`Bulk action "${action}" not implemented`);
    }
  };

  // Handle delete
  const handleDelete = async (item) => {
    if (!item) {
      console.error("No ID provided for deletion");
      return;
    }

    try {
      console.log(item);
      const payload = item.userId
        ? { userID: item.userId }
        : item.dataId
        ? { dataID: item.dataId }
        : "";
      console.log(payload);
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/delete-lead",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      const data = await response.json();

      if (data.message === "Lead deleted successfully") {
        setUserData((prev) => prev.filter((preitem) => preitem !== item));
        if (selectedRows.length > 0) {
          setSelectedRows([
            ...selectedRows,
            selectedRows.filter((pre) => pre.id !== item.id),
          ]);
        }
      } else {
        throw new Error(data.message || "Failed to delete lead");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      setError(error.message);
    }
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedRows.size === currentRecords.length) {
      setSelectedRows(new Set());
      setIsSelectAllChecked(false);
      setEnableTableScroll(false); // Disable scroll when "Select All" is unchecked
    } else {
      const allIds = currentRecords.map((item) => item.id);
      setSelectedRows(new Set(allIds));
      setIsSelectAllChecked(true);
      setEnableTableScroll(true); // Enable scroll when "Select All" is checked
    }
  };

  const handleEditInputChange = (e, field) => {
    const { value } = e.target;
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  // Handle records per page change
  const handleRecordsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setRecordsPerPage(1);
    } else {
      setRecordsPerPage(value);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen flex flex-col relative">
      {/* Add Lead Button */}
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
            aria-label="Send Email"
          >
            <FaEnvelope className="mr-2" />
            Email
          </button>

          <button
            onClick={() => handleBulkAction("whatsapp")}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            aria-label="Send WhatsApp"
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </button>

          <button
            onClick={() => handleBulkAction("meet")}
            className="flex items-center bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
            aria-label="Schedule Meet"
          >
            <FaVideo className="mr-2" />
            Meet
          </button>

          <button
            onClick={() => handleBulkAction("sms")}
            className="flex items-center bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
            aria-label="Send SMS"
          >
            <FaSms className="mr-2" />
            SMS
          </button>

          <button
            onClick={() => handleBulkAction("phone")}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            aria-label="Make Call"
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

            {/* Pincode Dropdown */}
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
      <div
        className={`bg-white p-6 shadow-lg rounded-lg flex-1 ${
          enableTableScroll ? "overflow-x-auto" : ""
        }`}
      >
        <table className="w-full text-sm text-left border-separate border-spacing-x-4">
          {/* Table Headers */}
          <thead className="top-0 z-10">
            <tr>
              <th className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isSelectAllChecked}
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
            {filteredData.map((item, index) => (
              <tr
                key={item.dataID || item.userID || index}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => handleRowSelect(item.id)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <>
                      <button
                        title="Delete"
                        className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </>
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
                          {editingId === item.id ? (
                            <input
                              type="email"
                              value={editingData.email || ""}
                              onChange={(e) =>
                                handleEditInputChange(e, "email")
                              }
                              className="border border-gray-300 p-1 rounded"
                            />
                          ) : (
                            <span className="text-xs text-gray-600">
                              {item.email}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaPhone className="text-green-500 w-4 h-4" />
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editingData.phone || ""}
                              onChange={(e) =>
                                handleEditInputChange(e, "phone")
                              }
                              className="border border-gray-300 p-1 rounded"
                            />
                          ) : (
                            <span className="text-xs text-gray-600">
                              {item.phone}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaVenusMars className="text-pink-500 w-4 h-4" />
                          {editingId === item.id ? (
                            <select
                              value={editingData.gender || "Female"}
                              onChange={(e) =>
                                handleEditInputChange(e, "gender")
                              }
                              className="border border-gray-300 p-1 rounded"
                            >
                              <option value="Female">Female</option>
                              <option value="Male">Male</option>
                              <option value="Other">Other</option>
                            </select>
                          ) : (
                            <span className="text-xs text-gray-600">
                              {item.gender}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaWhatsapp className="text-green-600 w-4 h-4" />
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editingData.whatsapp || ""}
                              onChange={(e) =>
                                handleEditInputChange(e, "whatsapp")
                              }
                              className="border border-gray-300 p-1 rounded"
                            />
                          ) : (
                            <span className="text-xs text-gray-600">
                              {item.whatsapp}
                            </span>
                          )}
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
                      <p className="text-xs text-black">
                        City: {item.location.city}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        State: {item.location.state}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        Country: {item.location.country}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        Pincode: {item.location.pincode}
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
                      {editingId === item.id ? (
                        <input
                          type="text"
                          value={editingData.remarks || ""}
                          onChange={(e) => handleEditInputChange(e, "remarks")}
                          className="border border-gray-300 p-1 rounded"
                        />
                      ) : (
                        <span className="text-black">{item.remarks}</span>
                      )}
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
          {Math.min(indexOfLastRecord, filteredData.length)} Records
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
          selectedLeads={Array.from(selectedRows)}
          setSendWhatsApp={setShowWhatsAppSend}
        />
      )}

      {/* Email Modal */}
      {showEmailSend && (
        <EmailCon
          setSelectedLeads={setSelectedRows}
          selectedLeads={Array.from(selectedRows)}
          setSendEmail={setShowEmailSend}
        />
      )}

      {/* SMS Modal */}
      {showSmsSend && (
        <SendSmsCon
          selectedLeads={Array.from(selectedRows)}
          setSendSms={setShowSmsSend}
        />
      )}

      {/* Call Modal */}
      {showCallCon && (
        <CallCon
          selectedLeads={Array.from(selectedRows)}
          setShowCallCon={setShowCallCon}
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
