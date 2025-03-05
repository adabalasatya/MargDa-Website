import { useEffect, useState, useRef } from "react";
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
  FaSlidersH,
  FaLink,
  FaUserCircle,
  FaLock,
} from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles
import UserVariableForm from "../admin/tableform/UserVariableForm";
import UserProfileForm from "../admin/tableform/UserProfileForm";
import UserLinkForm from "../admin/tableform/UserLinkForm";

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataDetails, setDataDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set()); // Track selected rows

  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userData ? userData.access_token : null;

  useEffect(() => {
    fetchData();
  }, []);

  const handleVariableClick = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const [showLinkForm, setShowLinkForm] = useState(false);

  const handleLinkClick = (user) => {
    setSelectedUser(user);
    setShowLinkForm(true);
  };

  const handleCloseLinkForm = () => {
    setShowLinkForm(false);
    setSelectedUser(null);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/admin/getallusers",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setData([]);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setError("Failed to fetch data. Please try again.");
    }
  };

  const handleSave = async (newData) => {
    try {
      const update = await fetch(
        "https://margda.in:7000/api/admin/edit-variable",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: selectedUser.userID,
            email: newData.officeEmail,
            email_pass: newData.emailPasscode,
            mobile: newData.officeMobile,
            did: newData.didNumber,
            data_limit: newData.dataLimit,
            data_view: newData.dataView,
            lead_limit: newData.leadLimit,
            whatsapp_limit: newData.whatsApSLimit,
            whatsapp_api_limit: newData.whatsApILimit,
            email_limit: newData.emailLimit,
            sms_limit: newData.smsLimit,
            sns_limit: newData.snsLimit,
            call_limit: newData.callLimit,
            meet_limit: newData.meetLimit,
            team_limit: newData.teamLimit,
            self_income: newData.selfIncome,
            team1_income: newData.team1Income,
            team2_income: newData.team2Income,
            team3_income: newData.team3Income,
            refer_income: newData.referIncome,
            pincode_income: newData.pinCodeIncome,
            district_income: newData.districtIncome,
            state_income: newData.stateIncome,
            country_income: newData.countryIncome,
            royalty_income: newData.royaltyIncome,
            call_wallet: newData.callWallet,
            meet_wallet: newData.meetWallet,
            business: newData.businessMonthly,
            validate_date: newData.validDate,
            call_rate: newData.callrate,
          }),
        }
      );
      const data = await update.json();
      if (update.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    setShowForm(false); // Close the form
    setSelectedUser(null); // Reset selected user
  };

  // Delete record
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://margda.in:7000/api/margda.org/delete-data`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dataID: id }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (response.ok) {
        setDataDetails((prev) => prev.filter((item) => item.id !== id));
      }

      // Update local state to remove the deleted record
    } catch (error) {
      console.error("Error deleting record:", error);
      setError("Failed to delete the record. Please try again.");
    }
  };
  // Inline Editing Handlers
  const handleEdit = (item) => {
    setSelectedUser(item);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedUser(null);
  };

  // Filtering and pagination
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
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

  const handleRecordsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse the input value as an integer
    setCurrentPage(1);
    if (value < 1) {
      setRecordsPerPage(1); // Set to 1 if the value is less than 1
    } else {
      setRecordsPerPage(value); // Otherwise, set the value
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPincodeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-8">
      {/* Search and Filter Section */}
      <div className="bg-white p-2 shadow rounded-lg mb-6 mt-9">
        <div className="flex flex-wrap items-center justify-between space-y-4 md:space-y-2">
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
      <div className="bg-white rounded-lg shadow-md p-6 mt-9">
        {currentRecords.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="w-full text-sm text-left border-spacing-x-4">
              <thead>
                <tr className="text-gray-600 top-0 bg-white z-10">
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
                      <FaLock className="text-green-600 w-4 h-4" />
                      <span>Login</span>
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-600 w-4 h-4" />
                      <span>Location</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRecords.map((item) => (
                  <tr
                    key={item.userID}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      selectedRows.has(item.userID) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="space-y-2">
                        <div
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit className="text-blue-500" />
                          <span className="text-blue-500">Edit</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaTrash className="text-red-500" />
                          <span className="text-red-500">Delete</span>
                        </div>
                        {/* <div className="flex items-center space-x-2">
                          <FaInfoCircle className="text-red-500" />
                          <span className="text-red-500">Invalid</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaBan className="text-gray-500" />
                          <span className="text-gray-600">Inactive</span>
                        </div> */}
                        <div
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleVariableClick(item)}
                        >
                          <FaSlidersH className="text-purple-500" />
                          <span className="text-purple-500">Variable</span>
                        </div>
                        <div
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleLinkClick(item)}
                        >
                          <FaLink className="text-green-500" />
                          <span className="text-green-500">Link</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaUserCircle className="text-orange-500" />
                          <span className="text-orange-500">Account</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-row items-center">
                        <div className="mr-5 w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500">
                          <img
                            src={
                              item.pic_url
                                ? item.pic_url
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4uQmq5l06DIuhNUDihsvATgceMTbyKNBzT4Rharp2hacekLEJHq9eaKF1LPaT9_iRpA&usqp=CAU"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-400 w-4 h-4" />

                            <span className="font-medium text-black">
                              {item.name || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-purple-400 w-4 h-4" />

                            <span className="text-black">
                              {item.email || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaPhone className="text-green-400 w-4 h-4" />

                            <span className="text-black">
                              {item.mobile || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaWhatsapp className="text-green-500 w-4 h-4" />

                            <span className="text-black">
                              {item.whatsapp || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaVenusMars className="text-pink-400 w-4 h-4" />

                            <span className="text-black">
                              {item.gender == "M"
                                ? "Male"
                                : item.gender == "F"
                                ? "Female"
                                : item.gender == "O"
                                ? "Other"
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-col items-center justify-start space-x-2">
                          <div className="flex items-center gap-2 justify-start">
                            <FaUser />
                            <span> {item.login}</span>
                          </div>
                          <span>ID: {item.userID}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-2">
                      <div className="flex flex-col space-y-1">
                        {/* <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                          <p className="text-xs text-black">
                            City: {item.placeID || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                          <p className="text-xs text-black">
                            State: {item.placeID || "N/A"}
                          </p>
                        </div> */}
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                          <p className="text-xs text-black">
                            Address: {item.address || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                          <p className="text-xs text-black">
                            Pincode: {item.placeID || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>You don't have access of this page</>
        )}
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
      {showForm && (
        <UserVariableForm
          user={selectedUser}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}

      {showEditForm && (
        <UserProfileForm
          user={selectedUser}
          setShowEditForm={handleCloseEditForm}
        />
      )}

      {showLinkForm && (
        <UserLinkForm user={selectedUser} onClose={handleCloseLinkForm} />
      )}
      {/* Copyright Footer */}
      <div className="text-center text-sm text-black-500 mt-8">
        <span>
          Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default AllUsers;
