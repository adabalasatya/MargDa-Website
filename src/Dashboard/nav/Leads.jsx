import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  FaUserGraduate,
  FaUsers,
  FaEllipsisV,
  FaChartBar,
  FaEyeSlash,
  FaTasks,
} from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { FcTimeline } from "react-icons/fc";
import { TbTimeline } from "react-icons/tb";
import { PiTextTThin } from "react-icons/pi";

import { TbTimelineEventText } from "react-icons/tb";

import WhatsAppCon from "../../Components/Dashboard/SendWhatsappCon";
import EmailCon from "../../Components/Dashboard/SendEmailCon";
import SendSmsCon from "../../Components/Dashboard/SendSmsCon";
import CallCon from "../../Components/Dashboard/SendCallCon";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { ScheduleMeeting } from "../../Components/Dashboard/ScheduleMeeting";

const Leads = () => {
  // State variables
  const navigate = useNavigate();
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [showWhatsAppSend, setShowWhatsAppSend] = useState(false);
  const [unhideData, setUnhideData] = useState([]);
  const [showEmailSend, setShowEmailSend] = useState(false);
  const [showSmsSend, setShowSmsSend] = useState(false);
  const [showCallCon, setShowCallCon] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedEditTask, setSelectedEditTask] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showScheduleMeeting, setShowScheduleMeeting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  // Dropdown data states
  const [dataTypes, setDataTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDataType, setSelectedDataType] = useState("");
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState("");

  const dropdownRef = useRef(null);

  // Retrieve userID and AccessToken from localStorage
  const userLocalData = JSON.parse(localStorage.getItem("userData")) || {};
  const accessToken = userLocalData.access_token || null;
  const loginUserID = userLocalData.user_data?.userID || null;

  // Fetch data from API
  useEffect(() => {
    fetchData();
    fetch_limit_variables();
    fetchTasks();
  }, [accessToken]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/tasks/get-tasks",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.Tasks)) {
        setTasks(result.Tasks);
      } else {
        console.error("Unexpected API response format:", result);
        setError("Failed to fetch countries. Invalid response format.");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError("Failed to fetch countries. Please try again.");
    }
  };

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
        if (response.status === 401) {
          return navigate("/login");
        }
        if (response.status == 404) {
          return setUserData([]);
        }
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.message && data.message === "Leads not found") {
        setUserData([]);
      } else if (data.Leads && Array.isArray(data.Leads)) {
        const transformedData = data.Leads.map((item) => ({
          id: item.dataID || item.userID,
          dataId: item.dataID,
          leadID: item.leadID,
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
          logs: item.log,
          remarks: item.remarks || "No remarks",
          taskID: item.taskID,
          pic_url: item.pic_url,
          isView: item.isView,
          euser: item.euser || null,
          isShortlisted: item.isShortlisted || false,
          dataType: item.datatype || "N/A", // Add dataType to each entry
        }));
        const unhide = [...transformedData];
        setUnhideData(unhide);

        const hide = transformedData.map((item) => {
          if (item.isView) {
            return item;
          } else {
            const newItem = { ...item };
            // if (newItem.euser === loginUserID || loginUserID == 1) {
            //   return newItem;
            // }
            newItem.phone = newItem.phone
              ? newItem.phone.slice(0, 4) + "********"
              : "N/A";
            newItem.whatsapp = newItem.whatsapp
              ? newItem.whatsapp.slice(0, 4) + "********"
              : "N/A";
            newItem.email = newItem.email
              ? newItem.email.slice(0, 4) +
                "********" +
                newItem.email.slice(
                  newItem.email.length - 3,
                  newItem.email.length
                )
              : "N/A";
            return newItem;
          }
        });
        setUserData(hide);
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

  const fetch_limit_variables = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda/get-limit-variables",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          return navigate("/login");
        }
        if (response.status == 404) {
          return setVariables([]);
        }
      }

      const data = await response.json();
      if (data.Variables && data.Variables.length > 0) {
        setVariables(data.Variables);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Fetch Data Types
  useEffect(() => {
    const fetchDataTypes = async () => {
      try {
        const response = await fetch(
          "https://margda.in:7000/api/master/get-datatypes",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data types");
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setDataTypes(data.data);
        } else {
          throw new Error("Invalid data format for data types");
        }
      } catch (error) {
        console.error("Error fetching data types:", error);
        setError(error.message);
      }
    };

    fetchDataTypes();
  }, [accessToken]);

  // Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://margda.in:7000/api/master/get-countries",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setCountries(data.data);
        } else {
          throw new Error("Invalid data format for countries");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error.message);
      }
    };

    fetchCountries();
  }, [accessToken]);

  // Fetch States based on selected country
  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedCountry) return;

      try {
        const response = await fetch(
          `https://margda.in:7000/api/master/get-states?country_code=${selectedCountry}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch states");
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setStates(data.data);
        } else {
          throw new Error("Invalid data format for states");
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        setError(error.message);
      }
    };

    fetchStates();
  }, [selectedCountry, accessToken]);

  // Fetch Districts based on selected state
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedState) return;

      try {
        const response = await fetch(
          `https://margda.in:7000/api/master/get-districts?state_code=${selectedState}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch districts");
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setDistricts(data.data);
        } else {
          throw new Error("Invalid data format for districts");
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
        setError(error.message);
      }
    };

    fetchDistricts();
  }, [selectedState, accessToken]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(""); // Reset state
    setSelectedDistrict(""); // Reset district
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict(""); // Reset district
  };

  // Handle pincode search
  const handlePincodeSearch = () => {
    setIsPincodeDropdownOpen(false);
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) {
      toast.warning("Select at least one lead");
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
        if (selectedRows.length > 1) {
          toast.warning("Select only one lead to call");
          return;
        }
        setShowCallCon(true);
        break;
      case "meet":
        setShowScheduleMeeting(true);
        break;
      default:
    }
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    setSelectedRows((prevSelectedLeads) =>
      prevSelectedLeads.includes(id)
        ? prevSelectedLeads.filter((lead) => lead !== id)
        : [...prevSelectedLeads, id]
    );
  };

  const handleSelectAll = (isChecked) => {
    setSelectedRows(isChecked ? [...userData] : []);
  };

  const handleEditInputChange = (e, field) => {
    const { value } = e.target;
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Filter data based on search query and selected data type
  const filteredData = userData.filter((item) => {
    const matchesSearchQuery = Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesDataType = selectedDataType
      ? item.dataType === selectedDataType
      : true;
    const matchesTask = selectedTask.taskID
      ? item.taskID == selectedTask.taskID
      : true;
    return matchesSearchQuery && matchesDataType && matchesTask;
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const todayDate = (date) => {
    const dat = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${dat}-${Number(month) + 1}-${year}`;
  };

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

  const addNewTask = async () => {
    if (!newTask) {
      return toast.error("Enter Task Name");
    }
    for (const task of tasks) {
      if (task.task.toLowerCase() == newTask.toLowerCase()) {
        return toast.error("This task already present");
      }
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/tasks/add-task",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: newTask }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        await fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle records per page change
  const handleRecordsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setRecordsPerPage(value);
      setCurrentPage(1); // Reset to first page when records per page changes
    } else {
      setRecordsPerPage(10); // Default or fallback value
    }
  };

  const handleView = async (item) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/data/view-data",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dataID: item.dataId, userID: item.userId }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const resposneData = data.data;
        setUserData((pre) =>
          pre.map((dataItem) =>
            (dataItem.dataId && dataItem.dataId === item.dataId) ||
            (dataItem.userId && dataItem.userId === item.userId)
              ? {
                  ...dataItem,
                  phone: resposneData.mobile,
                  whatsapp: resposneData.whatsapp,
                  email: resposneData.email,
                  isView: true,
                }
              : dataItem
          )
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveTask = async (item) => {
    if (!selectedEditTask) {
      return toast.error("Select a task");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/edit-lead-task",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadID: item.leadID,
            taskID: selectedEditTask,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEditingTaskId(null);
        setUserData((pre) =>
          pre.map((dataItem) =>
            dataItem.leadID == item.leadID
              ? {
                  ...dataItem,
                  taskID: selectedEditTask,
                }
              : dataItem
          )
        );
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  const getDifferenceInDays = (date) => {
    const currentDate = new Date();
    const givenDate = new Date(date);

    // Calculate the difference in milliseconds
    const differenceInTime = currentDate - givenDate;

    // Convert milliseconds to days
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    return differenceInDays < 0 ? 0 : differenceInDays;
  };

  return (
    <div className="p-6 min-h-screen flex flex-col relative">
      <ToastContainer />
      {/* Navbar with Buttons */}
      <div className="flex justify-end items-center mb-6">
        {/* Navbar with Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleBulkAction("email")}
            className="flex flex-col items-center bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
            aria-label="Send Email"
          >
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              Email
              {variables && variables.length > 0 ? (
                <div className="ml-3">{variables[0].email_limit || 0}</div>
              ) : (
                <div className="ml-3">0</div>
              )}
            </div>
            <div>
              {variables && variables.length > 0 ? (
                <div>
                  {variables[0].email_validate
                    ? todayDate(new Date(variables[0].email_validate))
                    : todayDate(new Date())}
                </div>
              ) : (
                <div>{todayDate(new Date())}</div>
              )}
            </div>
          </button>

          <button
            onClick={() => handleBulkAction("whatsapp")}
            className="flex flex-col items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            aria-label="Send WhatsApp"
          >
            <div className="flex items-center">
              <FaWhatsapp className="mr-2" />
              WhatsApp
              {variables && variables.length > 0 ? (
                <div className="ml-3">{variables[0].whatsaps_limit || 0}</div>
              ) : (
                <div className="ml-3">0</div>
              )}
            </div>
            <div>
              {variables && variables.length > 0 ? (
                <div>
                  {variables[0].whatsaps_validate
                    ? todayDate(new Date(variables[0].whatsaps_validate))
                    : todayDate(new Date())}
                </div>
              ) : (
                <div>{todayDate(new Date())}</div>
              )}
            </div>
          </button>

          <button
            onClick={() => handleBulkAction("meet")}
            className="flex flex-col items-center bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
            aria-label="Schedule Meet"
          >
            <div className="flex items-center">
              <FaVideo className="mr-2" />
              Meet
              {variables && variables.length > 0 ? (
                <div className="ml-3">{variables[0].meet_limit || 0}</div>
              ) : (
                <div className="ml-3">0</div>
              )}
            </div>
            <div>
              {variables && variables.length > 0 ? (
                <div>
                  {variables[0].meet_validate
                    ? todayDate(new Date(variables[0].meet_validate))
                    : todayDate(new Date())}
                </div>
              ) : (
                <div>{todayDate(new Date())}</div>
              )}
            </div>
          </button>

          <button
            onClick={() => handleBulkAction("sms")}
            className="flex flex-col items-center bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
            aria-label="Send SMS"
          >
            <div className="flex items-center">
              <FaSms className="mr-2" />
              SMS
              {variables && variables.length > 0 ? (
                <div className="ml-3">{variables[0].sms_limit || 0}</div>
              ) : (
                <div className="ml-3">0</div>
              )}
            </div>
            <div>
              {variables && variables.length > 0 ? (
                <div>
                  {variables[0].sms_validate
                    ? todayDate(new Date(variables[0].sms_validate))
                    : todayDate(new Date())}
                </div>
              ) : (
                <div>{todayDate(new Date())}</div>
              )}
            </div>
          </button>

          <button
            onClick={() => handleBulkAction("phone")}
            className="flex flex-col items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            aria-label="Make Call"
          >
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              Call
              {variables && variables.length > 0 ? (
                <div className="ml-3">
                  {Number(variables[0].call_limit) / 100 || 0}
                </div>
              ) : (
                <div className="ml-3">0</div>
              )}
            </div>
            <div>
              {variables && variables.length > 0 ? (
                <div>
                  {variables[0].call_validate
                    ? todayDate(new Date(variables[0].call_validate))
                    : todayDate(new Date())}
                </div>
              ) : (
                <div>{todayDate(new Date())}</div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-2 shadow rounded-lg mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Show Records */}
          <label className="flex items-center gap-2">
            <span className="text-sm font-semibold">Show</span>
            <input
              type="number"
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
              className="border border-gray-300 p-2 rounded w-16 text-center"
              min="1"
            />
            <span className="text-sm font-bold">Records</span>
          </label>

          {/* Search Input */}
          <div className="relative flex-1 max-w-[200px]">
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-2 pl-8 rounded w-full"
              placeholder="Search"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Data Type Dropdown */}
            <select
              className="border border-gray-300 p-2 rounded w-32"
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
            >
              <option value="">Data Type</option>
              {dataTypes.map((dataType) => (
                <option key={dataType.datatype} value={dataType.datatype}>
                  {dataType.data}
                </option>
              ))}
            </select>

            {/* Country Dropdown */}
            <select
              className="border border-gray-300 p-2 rounded w-32"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Country</option>
              {countries.map((country) => (
                <option key={country.country_code} value={country.country_code}>
                  {country.country}
                </option>
              ))}
            </select>

            {/* State Dropdown */}
            <select
              className="border border-gray-300 p-2 rounded w-32"
              value={selectedState}
              onChange={handleStateChange}
              disabled={!selectedCountry}
            >
              <option value="">State</option>
              {states.map((state) => (
                <option key={state.stateID} value={state.state_code}>
                  {state.state}
                </option>
              ))}
            </select>

            {/* District Dropdown */}
            <select
              className="border border-gray-300 p-2 rounded w-32"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">District</option>
              {districts.map((district) => (
                <option key={district.districtID} value={district.districtID}>
                  {district.district}
                </option>
              ))}
            </select>

            {/* Pincode Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsPincodeDropdownOpen(!isPincodeDropdownOpen)}
                className="border border-gray-300 p-2 rounded flex items-center justify-between w-32 bg-white"
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
                        className="border border-gray-300 p-2 pl-8 rounded w-full"
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

            {/* task button */}
            <div className="relative w-44">
              {/* Dropdown Header */}
              <div
                className="bg-orange-500 text-white border border-gray-300 rounded px-4 py-2 cursor-pointer flex justify-between items-center"
                onClick={() => setIsTaskOpen(!isTaskOpen)}
              >
                <span>{selectedTask.task || "Task"}</span>
              </div>

              {/* Dropdown Menu */}
              {isTaskOpen && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-10 max-h-[400px] overflow-y-auto">
                  {tasks.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedTask(option);
                        setIsTaskOpen(false);
                      }}
                    >
                      {option.task}
                    </div>
                  ))}

                  {/* Input field to add new item */}
                  <div className="flex items-center px-4 py-2 border-t border-gray-200">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg outline-none"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Add new task"
                    />
                    <button
                      className="ml-2 bg-blue-500 text-white px-1 rounded-lg hover:bg-blue-600"
                      onClick={addNewTask}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white p-6 shadow-lg rounded-lg flex-1">
        <table className="w-full text-sm text-left border">
          {/* Table Headers */}
          <thead className="top-0 z-10">
            <tr>
              <th className="px-4 py-3 border">
                <div className="flex items-center space-x-2 text-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === userData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <FaUsers className="text-gray-600" />
                  <span className="font-semibold text-gray-600">Leads</span>
                </div>
              </th>
              {/* <th className="px-6 py-4 border">
                <div className="flex items-center space-x-2">
                  <FaUserCog className="text-blue-500 w-4 h-4" />
                  <span className="font-medium text-gray-700">Actions</span>
                </div>
              </th> */}
              <th className="px-6 py-4 border">
                <div className="flex items-center space-x-2">
                  <FaDatabase className="text-green-500 w-4 h-4" />
                  <span className="font-medium text-gray-700">Details</span>
                </div>
              </th>
              <th className="px-6 py-4 border">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-yellow-600 w-4 h-4" />
                  <span className="font-medium text-gray-700">Location</span>
                </div>
              </th>
              <th className="px-6 py-4 border">
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
                key={item.dataID || item.userID || index}
                className="border-b hover:bg-gray-100 transition-colors duration-200 border"
                onClick={() => handleRowSelect(item)}
              >
                <td className="px-4 py-2 border">
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item)}
                      onChange={() => handleRowSelect(item)}
                      onClick={(e) => e.stopPropagation()}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded  border"
                    />
                    <div className="flex items-center">
                      {item.userId ? (
                        <div className="">
                          <img
                            src={item.pic_url}
                            className="w-10 h-10 rounded-full border border-gray-500"
                            alt={item.name}
                          />
                        </div>
                      ) : (
                        <div className="text-xl px-3 py-2 text-white border rounded-full bg-amber-500">
                          {item.name &&
                            item.name
                              .split(" ")
                              .map((item) => item.slice(0, 1))}
                        </div>
                      )}

                      <div className="relative">
                        <FaEllipsisV
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(item.userId || item.dataId);
                          }}
                        />
                        {(menuOpen === item.userId ||
                          menuOpen === item.dataId) && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            {item.userId ? (
                              <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                                  <Link
                                    to="/user-dashboard"
                                    state={{
                                      item: {
                                        userID: item.userId,
                                        pic_url: item.pic_url,
                                        name: item.name,
                                      },
                                    }}
                                    className="w-full flex items-center"
                                  >
                                    <FaChartBar className="mr-2" /> Career Map
                                  </Link>
                                </li>
                              </ul>
                            ) : (
                              <ul className="py-1">
                                <li
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // handleAddUser(row)
                                  }}
                                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                                >
                                  <FaUser className="mr-2" /> Add User
                                </li>
                              </ul>
                            )}
                            <li
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTaskId(item);
                                setMenuOpen(null);
                                setSelectedEditTask(item.taskID);
                              }}
                              className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                            >
                              <FaTasks className="mr-2" /> Change Task
                            </li>
                          </div>
                        )}
                      </div>
                    </div>
                    {!item.isView && (
                      <div className="relative group">
                        <button
                          className="p-2 bg-teal-600 text-white rounded-full shadow hover:bg-teal-800 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(item);
                          }}
                        >
                          <FaEyeSlash className="w-4 h-4" />
                        </button>
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mb-2 w-max bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          View
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 border">
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
                          <FaDatabase className="text-blue-500 w-4 h-4" />
                          <span className="text-xs text-gray-600">
                            Data Type:{" "}
                            {
                              dataTypes.find(
                                (type) => type.datatype == item.dataType
                              )?.data
                            }
                          </span>
                        </div>
                        {editingTaskId &&
                        ((item.userId && item.userId == editingTaskId.userId) ||
                          (item.dataId &&
                            item.dataId == editingTaskId.dataId)) ? (
                          <div>
                            <select
                              name="edit-task"
                              id="edit-task"
                              value={selectedEditTask || item.taskID}
                              onChange={(e) => {
                                setSelectedEditTask(e.target.value);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="border border-gray-300 py-1 px-2 rounded"
                            >
                              {!item.taskID && (
                                <option value="">Select a task</option>
                              )}
                              {tasks.map((task, index) => (
                                <option key={index} value={task.taskID}>
                                  {task.task}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleSaveTask(item)}
                              className="px-2 py-1 bg-blue-500 text-white rounded ml-2"
                            >
                              Save Task
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <FaTasks className="text-blue-500 w-4 h-4" />
                            <span className="text-xs text-gray-600">
                              Task:{" "}
                              {tasks.find((task) => task.taskID == item.taskID)
                                ?.task || "N/A"}
                            </span>
                          </div>
                        )}

                        {item.userId && (
                          <div className="flex items-center space-x-2">
                            <FaUser className="text-green-500 w-4 h-4" />
                            <span className="text-xs text-gray-600">U</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-2 border">
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

                <td className="py-3 max-w-[300px]">
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-col gap-2">
                      {item.logs &&
                      Array.isArray(item.logs) &&
                      item.logs.length > 0 ? (
                        <div key={index} className="flex flex-col gap-2">
                          <div className="flex gap-2 justify-start">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="text-yellow-500 w-4 h-4" />
                              Follow up
                            </span>
                            <span>
                              {new Date(
                                item.logs[item.logs.length - 1].fdate
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex gap-1 items-center justify-start">
                            <span className="flex items-center gap-1">
                              <MdAccessTimeFilled className="text-slate-500 w-4 h-4" />
                            </span>
                            Late
                            <span className="font-semibold">
                              (
                              {getDifferenceInDays(
                                item.logs[item.logs.length - 1].fdate
                              )}
                              )
                            </span>
                            days
                          </div>
                          <div className="flex items-center gap-2">
                            <FaStickyNote className="text-green-400 w-4 h-4" />{" "}
                            {item.logs[item.logs.length - 1].remarks
                              ? item.logs[item.logs.length - 1].remarks
                              : "No Remarks"}
                          </div>
                          <div className="flex gap-1 items-center justify-start">
                            <TbTimelineEventText className="text-blue-600 w-4 h-4" />
                            <Link
                              to={"/client-timeline"}
                              state={{ item }}
                              className="underline hover:text-blue-600"
                            >
                              Timeline {item.logs.length}
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center ml-7">No Logs</div>
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
          {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
          {filteredData.length} Records
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
          <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
            Page {currentPage} of {totalPages}
          </div>
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
          unhideData={unhideData}
          fetchData={fetchData}
          setSelectedLeads={setSelectedRows}
        />
      )}

      {/* Email Modal */}
      {showEmailSend && (
        <EmailCon
          setSelectedLeads={setSelectedRows}
          selectedLeads={Array.from(selectedRows)}
          setSendEmail={setShowEmailSend}
          unhideData={unhideData}
          fetchData={fetchData}
        />
      )}

      {showScheduleMeeting && (
        <ScheduleMeeting
          selectedLeads={Array.from(selectedRows)}
          setShowScheduleMeeting={setShowScheduleMeeting}
          unhideData={unhideData}
          setSelectedLeads={setSelectedRows}
          fetchData={fetchData}
        />
      )}

      {/* SMS Modal */}
      {showSmsSend && (
        <SendSmsCon
          selectedLeads={Array.from(selectedRows)}
          setSendSms={setShowSmsSend}
          unhideData={unhideData}
          setSelectedLeads={setSelectedRows}
          fetchData={fetchData}
        />
      )}

      {/* Call Modal */}
      {showCallCon && (
        <CallCon
          selectedLeads={Array.from(selectedRows)}
          setShowCallCon={setShowCallCon}
          unhideData={unhideData}
          setSelectedLeads={setSelectedRows}
          fetchData={fetchData}
        />
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

export default Leads;
