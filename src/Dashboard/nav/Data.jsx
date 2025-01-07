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
  FaSave,
  FaTimes,
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
  const [dataDetails, setDataDetails] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which row is being edited
  const [editingData, setEditingData] = useState({}); // Store temporary edits
  const [selectedRows, setSelectedRows] = useState(new Set()); // Track selected rows
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const [saveLoading, setSaveLoading] = useState(false); // Loading state for save operation
  const [error, setError] = useState(null); // Error state

  const dropdownRef = useRef(null);

  // Retrieve userID and AccessToken from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userID = userData ? userData.user_data.userID : null;
  const accessToken = userData ? userData.access_token : null;

  console.log("Fetching data from API...", accessToken);

  // Fetch data from API
  const fetchData = async () => {
    try {
      console.log("Fetching data from API...");

      const response = await fetch("https://margda.in:7000/api/margda.org/get-all-data", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API response:", result);

      // Transform API data
      const transformedData = result.Data.map((item) => ({
        id: item.dataID || item.userID,
        name: item.name || "N/A",
        email: item.email || "N/A",
        phone: item.mobile || "N/A",
        gender: item.gender === "M" ? "Male" : item.gender === "F" ? "Female" : "Other",
        whatsapp: item.whatsapp || item.mobile || "N/A",
        location: {
          city: item.address || "N/A",
          state: "N/A",
          country: "N/A",
          pincode: item.pincode || "N/A",
        },
        log: `Logged in: ${new Date(item.edate || Date.now()).toLocaleString()}`,
        remarks: item.remarks || "No remarks",
        euser: item.euser || null, // Include the euser field
        isShortlisted: item.isShortlisted || false, // Add shortlisted status
      }));

      console.log("Transformed data:", transformedData);
      setDataDetails(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newRecord = {
      name: formData.name,
      email: formData.email,
      mobile: formData.phone,
      gender: formData.gender === "Male" ? "M" : formData.gender === "Female" ? "F" : "O",
      whatsapp: formData.whatsapp,
      remarks: formData.remarks,
      userID: userID, // Use the logged-in user's ID
    };

    try {
      const response = await fetch("https://margda.in:7000/api/addlead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API response:", result);

      // Fetch the latest data after adding a new record
      await fetchData();

      setFormData(initialFormState);
      setIsAddFormOpen(false);
    } catch (error) {
      console.error("Error adding new record:", error);
      setError("Failed to add the record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited record
  const handleSave = async (id) => {
    setSaveLoading(true);
    setError(null);

    try {
      const recordToUpdate = dataDetails.find((item) => item.id === id);

      const updatedData = {
        dataID: id,
        name: editingData.name || recordToUpdate.name,
        email: editingData.email || recordToUpdate.email,
        mobile: editingData.phone || recordToUpdate.phone,
        gender: editingData.gender === "Male" ? "M" : editingData.gender === "Female" ? "F" : "O",
        whatsapp: editingData.whatsapp || recordToUpdate.whatsapp,
        remarks: editingData.remarks || recordToUpdate.remarks,
        userID: userID, // Use the logged-in user's ID
      };

      const response = await fetch("https://margda.in:7000/api/margda.org/edit-data", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("API endpoint not found. Saving changes locally.");
          // Fallback: Update local state without API call
          setDataDetails((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...editingData } : item))
          );
          setEditingId(null);
          setEditingData({});
          setError("API endpoint not found. Changes saved locally.");
          return;
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      const result = await response.json();
      console.log("API response after editing:", result);

      // Update local state
      setDataDetails((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...editingData } : item))
      );

      // Reset editing state
      setEditingId(null);
      setEditingData({});
    } catch (error) {
      console.error("Error updating record:", error);
      setError("Failed to update the record. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete record
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://margda.in:7000/api/margda.org/delete-data`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataID: id, userID: userID }), // Include the dataID and userID
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API response after deletion:", result);

      // Update local state to remove the deleted record
      setDataDetails((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
      setError("Failed to delete the record. Please try again.");
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      console.log("File selected:", uploadedFile);

      // Optionally, you can handle the file upload logic here
      // For example, send the file to an API endpoint
      const formData = new FormData();
      formData.append("file", uploadedFile);

      fetch("https://margda.in:7000/api/upload-csv", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("File upload successful:", result);
          // Refresh the data after uploading the file
          fetchData();
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setError("Failed to upload the file. Please try again.");
        });
    }
  };

  // Inline Editing Handlers
  const handleEdit = (id) => {
    const recordToEdit = dataDetails.find((item) => item.id === id);
    setEditingData(recordToEdit);
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  const handleEditInputChange = (e, field) => {
    const { value } = e.target;
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Row Selection Handlers
  const toggleRowSelection = (id) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === currentRecords.length) {
      setSelectedRows(new Set()); // Deselect all
    } else {
      const allIds = currentRecords.map((item) => item.id);
      setSelectedRows(new Set(allIds)); // Select all
    }
  };

  // Handle Shortlist
  const handleShortlist = async () => {
    if (selectedRows.size === 0) {
      setError("Please select at least one record to shortlist.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://margda.in:7000/api/margda.org/shortlist", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataIDs: Array.from(selectedRows), // Convert Set to Array
          userID: userID, // Include the logged-in user's ID
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API response after shortlisting:", result);

      // Update local state to reflect the shortlisted status
      setDataDetails((prev) =>
        prev.map((item) =>
          selectedRows.has(item.id) ? { ...item, isShortlisted: true } : item
        )
      );

      // Clear the selected rows after shortlisting
      setSelectedRows(new Set());

      setError("Records shortlisted successfully!");
    } catch (error) {
      console.error("Error shortlisting records:", error);
      setError("Failed to shortlist records. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filtering and pagination
  const filteredData = dataDetails.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
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
          <button
            onClick={handleShortlist}
            className="flex items-center px-5 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
            disabled={isLoading}
          >
            <FaUser className="mr-2" />
            {isLoading ? "Shortlisting..." : "Shortlist"}
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-11/12 max-w-4xl">
            <h3 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">Add New Record</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="Enter WhatsApp number"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm"
                  disabled={isLoading}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "ADD"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="bg-white p-2 shadow rounded-lg mb-6">
        <div className="flex flex-wrap items-center justify-between space-y-4 md:space-y-2">
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
                      onClick={() => setIsPincodeDropdownOpen(false)}
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
                    <input
                      type="checkbox"
                      checked={selectedRows.size === currentRecords.length}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm md:text-sm whitespace-nowrap">Select All</span>
                  </div>
                </th>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRecords.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    selectedRows.has(item.id) ? "bg-blue-50" : ""
                  }`}
                  onClick={() => toggleRowSelection(item.id)}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {item.euser === userID ? (
                        editingId === item.id ? (
                          <>
                            <button
                              title="Save"
                              className="p-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                              onClick={() => handleSave(item.id)}
                              disabled={saveLoading}
                            >
                              {saveLoading ? "Saving..." : <FaSave className="w-4 h-4" />}
                            </button>
                            <button
                              title="Cancel"
                              className="p-2 bg-gray-500 text-white rounded-full shadow hover:bg-gray-600 transition"
                              onClick={handleCancel}
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              title="Edit"
                              className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                              onClick={() => handleEdit(item.id)}
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
                          </>
                        )
                      ) : (
                        <span className="text-gray-400">No actions available</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-blue-400 w-4 h-4" />
                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={editingData.name || ""}
                            onChange={(e) => handleEditInputChange(e, "name")}
                            className="border border-gray-300 p-1 rounded"
                          />
                        ) : (
                          <span className="font-medium text-black">{item.name || "N/A"}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-purple-400 w-4 h-4" />
                        {editingId === item.id ? (
                          <input
                            type="email"
                            value={editingData.email || ""}
                            onChange={(e) => handleEditInputChange(e, "email")}
                            className="border border-gray-300 p-1 rounded"
                          />
                        ) : (
                          <span className="text-black">{item.email || "N/A"}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaPhone className="text-green-400 w-4 h-4" />
                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={editingData.phone || ""}
                            onChange={(e) => handleEditInputChange(e, "phone")}
                            className="border border-gray-300 p-1 rounded"
                          />
                        ) : (
                          <span className="text-black">{item.phone || "N/A"}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaWhatsapp className="text-green-500 w-4 h-4" />
                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={editingData.whatsapp || ""}
                            onChange={(e) => handleEditInputChange(e, "whatsapp")}
                            className="border border-gray-300 p-1 rounded"
                          />
                        ) : (
                          <span className="text-black">{item.whatsapp || "N/A"}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaVenusMars className="text-pink-400 w-4 h-4" />
                        {editingId === item.id ? (
                          <select
                            value={editingData.gender || "Female"}
                            onChange={(e) => handleEditInputChange(e, "gender")}
                            className="border border-gray-300 p-1 rounded"
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <span className="text-black">{item.gender || "N/A"}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-2">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                        <p className="text-xs text-black">City: {item.location.city || "N/A"}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                        <p className="text-xs text-black">State: {item.location.state || "N/A"}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                        <p className="text-xs text-black">Country: {item.location.country || "N/A"}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                        <p className="text-xs text-black">Pincode: {item.location.pincode || "N/A"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <FaClipboardList className="text-yellow-500 w-4 h-4" />
                        <span className="text-black">{item.log || "N/A"}</span>
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
                          <span className="text-black">{item.remarks || "No remarks"}</span>
                        )}
                      </div>
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

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default Data;