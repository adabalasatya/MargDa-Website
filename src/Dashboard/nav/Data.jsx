import React, { useState, useRef, useEffect } from "react";
import Loader from "../../Components/Loader";
import Papa from "papaparse";
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
  FaDownload,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaFacebookMessenger,
  FaUsers,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { GoUnverified } from "react-icons/go";
// import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VerifyDataCon from "../../Components/Dashboard/VerifyDataCon";
import AddDataTeamContainer from "../../Components/Dashboard/Data.jsx/AddDataTeamContainer";

// const initialFormState = {
//   name: "",
//   email: "",
//   phone: "",
//   gender: "",
//   whatsapp: "",
//   remarks: "",
//   datatype: "W",
// };

const Data = () => {
  // State declarations
  const navigate = useNavigate();
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10); // Default to 10 records per page
  const [searchQuery, setSearchQuery] = useState("");
  const [isVerifyFromOpen, setIsVerifyFormOpen] = useState(false);
  const [isAddDataTeamConOpen, setIsAddDataTeamConOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataDetails, setDataDetails] = useState([]);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null); // Track which row is being edited
  const [editingData, setEditingData] = useState({}); // Store temporary edits
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const [saveLoading, setSaveLoading] = useState(false); // Loading state for save operation
  const [error, setError] = useState(null); // Error state
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [showCsvData, setShowCsvData] = useState(false);
  const [dataTypes, setDataTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [dataFilter, setDataFilter] = useState("");
  // const [share, setShare] = useState(true);
  const [dataLimit, setDataLimit] = useState(0);
  const [verifyItem, setVerifyItem] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState(""); // New state for datatype filter
  const [tasks, setTasks] = useState([]);

  const dropdownRef = useRef(null);

  // Retrieve userID and AccessToken from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const loginUserID = userData ? userData.user_data.userID : null;
  const accessToken = userData ? userData.access_token : null;

  // Sample data for pincodes
  const samplePincodes = [
    { pincode: "110001", districtID: "1" },
    { pincode: "110002", districtID: "1" },
    { pincode: "110003", districtID: "1" },
    { pincode: "110004", districtID: "1" },
    { pincode: "110005", districtID: "1" },
  ];

  useEffect(() => {
    fetchData();
    fetchCountries();
    fetchTasks();
    fetch_limit_variables();
  }, []);

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
          return setDataLimit(0);
        }
      }

      const data = await response.json();
      if (data.Variables && data.Variables.length > 0) {
        setDataLimit(data.Variables[0].data_limit);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/get-all-data",
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
          setLoading(false);
          return navigate("/login");
        }
        setLoading(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const transformedData = await result.Data.map((item, index) => ({
        id: index + 1,
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
          city: item.address || "N/A",
          state: "N/A",
          country: "N/A",
          pincode: item.pincode || "N/A",
        },
        log: `Logged in: ${new Date(
          item.edate || Date.now()
        ).toLocaleString()}`,
        remarks: item.remarks || "No remarks",
        euser: item.euser || null, // Include the euser field
        isShortlisted: item.isShortlisted || false, // Add shortlisted status
        datatype: item.datatype || "W", // Include the datatype field
        country_code: item.country_code,
        stateID: item.stateID,
        districtID: item.districtID,
        isView: item.isView,
        dsc: item.dsc,
        team: item.team,
        euserName: item.euserName || "",
      }));
      transformedData.map((item) => {
        if (item.userId) {
          item.dsc = true;
          return item;
        }
      });
      setDataDetails(transformedData);
      setAllData(transformedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };

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
        const tasks = result.Tasks.map((task) => {
          return task.task;
        });
        setTasks(tasks);
      } else {
        console.error("Unexpected API response format:", result);
        setError("Failed to fetch countries. Invalid response format.");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError("Failed to fetch countries. Please try again.");
    }
  };

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setCountries(result.data);
      } else {
        console.error("Unexpected API response format:", result);
        setError("Failed to fetch countries. Invalid response format.");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError("Failed to fetch countries. Please try again.");
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await fetch(
        `https://margda.in:7000/api/master/get-states?country_code=${countryCode}`,
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
      if (result.success && Array.isArray(result.data)) {
        // Filter states based on the selected country (if needed)
        const filteredStates = result.data.filter(
          (state) => state.country_code === countryCode
        );
        setStates(filteredStates);
      } else {
        console.error("Unexpected API response format:", result);
        setStates([]); // Set states to empty if no states are found
        setError("No states found for the selected country.");
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setStates([]); // Set states to empty if there's an error
      setError("Failed to fetch states. Please try again.");
    }
  };

  const fetchDistricts = async (state_code) => {
    try {
      const response = await fetch(
        `https://margda.in:7000/api/master/get-districts`,
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
      if (result.success && Array.isArray(result.data)) {
        const filteredDistricts = result.data.filter(
          (state) => state.state_code === state_code
        );
        setDistricts(filteredDistricts);
      } else {
        console.error("Unexpected API response format:", result);
        setError("Failed to fetch districts. Invalid response format.");
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setError("Failed to fetch districts. Please try again.");
    }
  };

  const fetchPincodes = async (districtID) => {
    try {
      // Use sample pincodes for demonstration
      const filteredPincodes = samplePincodes.filter(
        (pincode) => pincode.districtID === districtID
      );
      setPincodes(filteredPincodes);
    } catch (error) {
      console.error("Error fetching pincodes:", error);
      setError("Failed to fetch pincodes. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedDistrict) {
      fetchPincodes(selectedDistrict);
    } else {
      setPincodes([]); // Reset pincodes if no district is selected
    }
  }, [selectedDistrict]);

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

  const handleSave = async (id) => {
    setSaveLoading(true);
    setError(null);

    try {
      const recordToUpdate = dataDetails.find((item) => item.id === id);

      const updatedData = {
        dataID: recordToUpdate.dataId,
        name: editingData.name || recordToUpdate.name,
        email: editingData.email || recordToUpdate.email,
        mobile: editingData.phone || recordToUpdate.phone,
        gender:
          editingData.gender === "Male"
            ? "M"
            : editingData.gender === "Female"
            ? "F"
            : "O",
        whatsapp: editingData.whatsapp || recordToUpdate.whatsapp,
      };

      const response = await fetch(
        "https://margda.in:7000/api/margda.org/edit-data",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("API endpoint not found. Saving changes locally.");
          // Fallback: Update local state without API call
          setDataDetails((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, ...editingData } : item
            )
          );
          setEditingId(null);
          setEditingData({});
          setError("API endpoint not found. Changes saved locally.");
          return;
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      await response.json();
      setDataDetails((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...editingData } : item
        )
      );

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
      setDataDetails((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
      setError("Failed to delete the record. Please try again.");
    }
  };

  function formatName(input) {
    return input
      .split(" ") // Split the string into words
      .map((word) => {
        if (word.length === 1) {
          // If the word is a single letter, capitalize it and add a dot
          return word.toUpperCase() + ".";
        }
        // Capitalize the first letter of the word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" "); // Join the processed words back into a single string
  }

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      Papa.parse(file, {
        header: true, // Treat the first row as headers
        skipEmptyLines: true, // Skip empty lines
        complete: (results) => {
          const { data, meta } = results;
          const fileHeaders = meta.fields;
          const lowerCaseExpectedHeaders = expectedHeaders.map((header) =>
            header.toLowerCase()
          );
          if (
            JSON.stringify(fileHeaders) !==
            JSON.stringify(lowerCaseExpectedHeaders)
          ) {
            alert(`Invalid columns. Expected: ${expectedHeaders.join(", ")}`);
            setCsvData([]);
            setHeaders([]);
            return;
          }
          data.map((item) => {
            item.name = formatName(item.name);
            return item;
          });

          setHeaders(fileHeaders);
          setCsvData(data);
          setShowCsvData(true);
        },
      });
    }
  };

  const handleAddLeadFromCsv = async () => {
    setShowCsvData(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/add-mutliple-data",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setShowCsvData(false);
      setLoading(false);
      toast.error(error);
    } finally {
      setLoading(false);
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
  const toggleRowSelection = (data) => {
    setError("");
    setSelectedRows((prevSelectedData) =>
      prevSelectedData.includes(data)
        ? prevSelectedData.filter((item) => item != data)
        : [...prevSelectedData, data]
    );
  };

  const toggleSelectAll = (isChecked) => {
    // setError("You Can't Select unverified Data");
    // return toast.warn("You Can't Select unverified Data");
    setSelectedRows(isChecked ? [...dataDetails] : []);
  };

  const expectedHeaders = [
    "datatype",
    "name",
    "mobile",
    "whatsapp",
    "email",
    "gender",
    "country_code",
    "state_id",
    "share",
  ];

  const downloadSample = () => {
    const data =
      "datatype,name,mobile,whatsapp,email,gender,country_code,state_id,share\nW,John Doe,911234567890,911234567890,john@example.com,male,IN,12,yes\nS,Jahn Doe,911234567890,911234567890,jahn@example.com,female,IN,13,y\nW,John Doe,911234567890,911234567890,johndeep@example.com,other,IN,14,n";
    const blob = new Blob([data], { type: "text/csv" }); // Create a Blob object with the file content
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    const a = document.createElement("a"); // Create an anchor element
    a.href = url; // Set the href to the Blob URL
    a.download = "data.csv"; // Set the download filename
    a.click(); // Programmatically click the link to start the download

    URL.revokeObjectURL(url); // Clean up the Blob URL
  };

  // Handle Shortlist
  const handleShortlist = async () => {
    if (selectedRows.length === 0) {
      setError("Please select at least one record to shortlist.");
      return;
    }
    if (!selectedTask) {
      return toast.warn("Select a task to Shortlist");
    }

    setIsLoading(true);
    setError(null);

    try {
      for (const item of selectedRows) {
        if (!item.dsc) {
          toast.error(`${item.name}, data is not verified`);
          continue;
        } else if (
          item.email == "N/A" ||
          item.phone == "N/A" ||
          item.whatsapp == "N/A"
        ) {
          toast.error(`${item.name}, Data is incomplate`);
          continue;
        }
        const payload = {
          dataID: item.dataId, // Use the dataId from the record
          userID: item.userId, // Use the userId from the record
          task: selectedTask,
        };

        const response = await fetch(
          "https://margda.in:7000/api/margda.org/shortlist",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        // Log the successful response
        const result = await response.json();

        if (!response.ok) {
          // Log the error details
          if (response.status == 402) {
            return toast.error(item.name + result.message);
          } else if (response.status == 400) {
            toast.error(`${item.name}, ${result.message}`);
            continue;
          }
          const errorResponse = await response.json().catch(() => null);
          console.error(
            "API Error Response for data:",
            item.email,
            errorResponse
          );

          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        toast.success(`${item.name}, ${result.message}`);
      }

      setSelectedRows([]);
      // setError("Records shortlisted successfully!");
    } catch (error) {
      // Log the error details
      console.error("Error during shortlisting:", error);
      setError("Failed to shortlist records. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dataDetails.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(dataDetails.length / recordsPerPage);

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
    const value = e.target.value;
    if (value) {
      if (value < 1) {
        setRecordsPerPage(1); // Set to 1 if the value is less than 1
      } else if (value > 500) {
        setRecordsPerPage(500);
      } else {
        setRecordsPerPage(value); // Otherwise, set the value
      }
    }
  };

  // Pagination range
  const getPaginationRange = () => {
    const totalPageNumbers = 5; // Number of page numbers to show
    const halfRange = Math.floor(totalPageNumbers / 2);

    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = Math.min(startPage + totalPageNumbers - 1, totalPages);

    if (endPage - startPage + 1 < totalPageNumbers) {
      startPage = Math.max(endPage - totalPageNumbers + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          // Map the API response to the expected format
          const formattedDataTypes = result.data.map((item) => ({
            id: item.datatype, // Use datatype as the unique ID
            value: item.datatype, // Use datatype as the value
            name: item.data, // Use data as the display name
          }));
          setDataTypes(formattedDataTypes);
        } else {
          console.error("Unexpected API response format:", result);
          setError("Failed to fetch data types. Invalid response format.");
        }
      } catch (error) {
        console.error("Error fetching data types:", error);
        setError("Failed to fetch data types. Please try again.");
      }
    };

    fetchDataTypes();
  }, [accessToken]);

  // Helper function to get the data type name
  const getDataTypeName = (datatype) => {
    const dataType = dataTypes.find((type) => type.value === datatype);
    return dataType ? dataType.name : "N/A"; // Return "N/A" if no match is found
  };

  const handleSelectCountry = (e) => {
    const countryCode = e.target.value;
    if (countryCode) {
      setSelectedCountry(countryCode);
      setSelectedState(""); // Reset state selection
      setSelectedDistrict(""); // Reset district selection
      setSelectedPincode(""); // Reset pincode selection
      fetchStates(countryCode); // Fetch states for the selected country
    } else {
      setSelectedCountry("");
      setSelectedState(""); // Reset state selection
      setSelectedDistrict(""); // Reset district selection
      setSelectedPincode(""); // Reset pincode selection
    }
  };

  const handleStateChange = (e) => {
    const state_code = e.target.value;
    if (state_code) {
      const selectedState = states.find(
        (item) => item.state_code == state_code
      );
      setSelectedState(selectedState);
      setSelectedDistrict(""); // Reset district selection
      setSelectedPincode(""); // Reset pincode selection
      fetchDistricts(state_code); // Fetch districts for the selected state
    } else {
      setSelectedState("");
      setSelectedDistrict(""); // Reset district selection
      setSelectedPincode(""); // Reset pincode selection
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedPincode("");
    const districtID = e.target.value;
    if (districtID) {
      setSelectedDistrict(districtID);
      setSelectedPincode(""); // Reset pincode selection
    } else {
      setSelectedDistrict(""); // Reset district selection
      setSelectedPincode(""); // Reset pincode selection
    }
  };

  //custom-select
  const [selectedTask, setSelectedTask] = useState("");
  const [newTask, setNewTask] = useState("");
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const handleSelect = (item) => {
    setSelectedTask(item);
    setIsTaskOpen(false);
  };

  const handleAddNewTask = () => {
    if (newTask.trim() !== "" && !tasks.includes(newTask)) {
      setTasks([...tasks, newTask]);
      setSelectedTask(newTask);
      setNewTask("");
      setIsTaskOpen(false);
    } else {
      toast.warn("This task is already present");
    }
  };

  const handleVerify = async (item) => {
    setVerifyItem(item);
    setIsVerifyFormOpen(true);
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
        setDataDetails((pre) =>
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

  const filter = (
    allData,
    dataFilter,
    dataType,
    country,
    state,
    district,
    searchQuery
  ) => {
    const filteredData = allData.filter((item) => {
      const lowerCaseQuery = searchQuery.toLowerCase().trim();
      const matchesSearchQuery = Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowerCaseQuery)
      );
      const matchesDataType = dataType ? item.datatype === dataType : true;
      const matchCountry = country ? item.country_code == country : true;
      const matchState = state ? item.stateID == state.stateID : true;
      const matchDistrict = district ? item.districtID == district : true;
      if (dataFilter == "self") {
        return (
          matchesSearchQuery &&
          item.euser == loginUserID &&
          matchesDataType &&
          matchCountry &&
          matchState &&
          matchDistrict
        );
      } else if (dataFilter == "others") {
        return (
          matchesSearchQuery &&
          item.euser != loginUserID &&
          matchesDataType &&
          matchCountry &&
          matchState &&
          matchDistrict
        );
      } else if (dataFilter == "team") {
        return (
          matchesSearchQuery &&
          item.team &&
          Array.isArray(item.team) &&
          item.team.includes(loginUserID) &&
          matchesDataType &&
          matchCountry &&
          matchState &&
          matchDistrict
        );
      }
      return (
        matchesSearchQuery &&
        matchesDataType &&
        matchCountry &&
        matchState &&
        matchDistrict
      );
    });

    setDataDetails(filteredData);
  };

  const handleDataFilterChange = (e) => {
    setSelectedRows([]);
    setDataFilter(e.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
    filter(
      allData,
      dataFilter,
      selectedDataType,
      selectedCountry,
      selectedState,
      selectedDistrict,
      searchQuery
    );
  }, [
    dataFilter,
    selectedDataType,
    selectedCountry,
    selectedState,
    selectedDistrict,
    searchQuery,
  ]);

  const handleShowAddTeam = () => {
    if (selectedRows.length == 0) {
      return toast.error("Select Atleast one data");
    }
    setIsAddDataTeamConOpen(true);
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Header Section */}
      {loading && <Loader />}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
            <FaUser className="mr-1" />
            Data
            <div className="ml-1">{dataLimit}</div>
          </button>

          <button
            onClick={() => document.getElementById("csv-upload").click()}
            className="flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition"
          >
            <FaUpload className="mr-2" />
            Upload CSV
          </button>
          <button
            onClick={handleShortlist}
            className="flex items-center px-5 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
            disabled={isLoading}
          >
            <FaUser className="mr-2" />
            {isLoading ? "Shortlisting..." : "Shortlist"}
          </button>

          {/* Task Button */}
          <div className="relative w-44">
            {/* Dropdown Header */}
            <div
              className="bg-orange-500 text-white border border-gray-300 rounded-full px-4 py-2 cursor-pointer flex justify-between items-center"
              onClick={() => setIsTaskOpen(!isTaskOpen)}
            >
              <span>{selectedTask || "Task"}</span>
            </div>

            {/* Dropdown Menu */}
            {isTaskOpen && (
              <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-10 max-h-[400px] overflow-y-auto">
                {tasks.map((option, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
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
                    onClick={handleAddNewTask}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={downloadSample}
            className="flex items-center px-5 py-2 bg-slate-800 rounded-full shadow hover:bg-slate-900 transition text-white"
          >
            <FaDownload className="mr-2" />
            Sample CSV
          </button>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        {dataFilter == "self" && (
          <button
            onClick={handleShowAddTeam}
            className="flex items-center px-2 ml-1 py-2 bg-blue-500 rounded-full shadow hover:bg-blue-900 transition text-white"
          >
            Share to Team
          </button>
        )}
        {/* Search Input - Moved to the right corner */}
        <div className="relative flex-1 max-w-[200px] ml-4">
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 pl-8 rounded w-full"
            placeholder="Search"
          />
        </div>
      </div>

      {csvData.length > 0 && showCsvData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" border border-gray-500 relative bg-white shadow-lg rounded-lg overflow-x-auto overflow-y-auto max-h-[700px] w-3/4 p-6">
            <div style={{ textAlign: "end" }}>
              <button
                onClick={() => setShowCsvData(false)}
                className="bg-green-500 text-white px-4 py-2 mr-3 rounded-lg hover:bg-green-600 mb-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLeadFromCsv}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2"
              >
                Add all data
              </button>
            </div>{" "}
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white text-center">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="py-3 px-4 text-justify uppercase font-semibold text-sm"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-t hover:bg-gray-100 cursor-pointer border"
                  >
                    {headers.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className="py-[9px] px-4 text-justify text-xl font-sans font-normal min-w-50"
                      >
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isVerifyFromOpen && (
        <VerifyDataCon
          verifyItem={verifyItem}
          setIsVerifyFormOpen={setIsVerifyFormOpen}
          setDataDetails={setDataDetails}
        />
      )}

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-7 sm:grid-cols-3 gap-3 my-4">
        {/* Show Records */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Show</span>
          <input
            type="number"
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
            className="border border-gray-300 p-2 rounded w-16 text-center"
            min={1}
            minLength={1}
          />
          <span className="text-sm font-bold">Records</span>
        </div>

        {/* Data Type Dropdown */}
        <select
          className="border border-gray-300 p-2 rounded"
          value={selectedDataType}
          onChange={(e) => setSelectedDataType(e.target.value)}
        >
          <option value="">Data Type</option>
          {Array.isArray(dataTypes) &&
            dataTypes.map((dataType) => (
              <option key={dataType.id} value={dataType.value}>
                {dataType.name}
              </option>
            ))}
        </select>

        {/* Country Dropdown */}
        <select
          className="border border-gray-300 p-2 rounded"
          value={selectedCountry}
          onChange={handleSelectCountry}
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
          className="border border-gray-300 p-2 rounded"
          value={selectedState.state_code}
          onChange={handleStateChange}
          disabled={!selectedCountry || states.length === 0}
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
          className="border border-gray-300 p-2 rounded"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedState || districts.length === 0}
        >
          <option value="">District</option>
          {districts.map((district) => (
            <option key={district.districtID} value={district.districtID}>
              {district.district}
            </option>
          ))}
        </select>

        {/* Pincode Dropdown */}
        <div className="relative mr-0" ref={dropdownRef}>
          <button
            onClick={() => setIsPincodeDropdownOpen(!isPincodeDropdownOpen)}
            className="border border-gray-300 p-2 rounded flex items-center justify-between bg-white"
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
                  onClick={() => setIsPincodeDropdownOpen(false)}
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Data Filter */}
        <select
          className="border border-gray-300 p-2 rounded"
          value={dataFilter}
          onChange={handleDataFilterChange}
          disabled={allData.length == 0}
        >
          <option value="">All Data</option>
          <option value="self">Self Data</option>
          <option value="team">Team Data</option>
          <option value="others">Other Data</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full text-sm text-left border-spacing-x-4">
          <thead>
            <tr className="text-gray-600 top-0 bg-white z-10">
              <th className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === dataDetails.length}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm md:text-sm whitespace-nowrap">
                    Select All
                  </span>
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
              {dataFilter == "team" && (
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-green-600 w-4 h-4" />
                    <span>Team Owner</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRecords.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                  selectedRows.includes(item) ? "bg-blue-50" : ""
                }`}
                onClick={() => toggleRowSelection(item)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item)}
                    onChange={() => toggleRowSelection(item)}
                    onClick={(e) => e.stopPropagation()}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {(item.euser === loginUserID || loginUserID == 1) &&
                    !item.userId ? (
                      editingId === item.id ? (
                        <>
                          <button
                            title="Save"
                            className="p-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSave(item.id);
                            }}
                            disabled={saveLoading}
                          >
                            {saveLoading ? (
                              "Saving..."
                            ) : (
                              <FaSave className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            title="Cancel"
                            className="p-2 bg-gray-500 text-white rounded-full shadow hover:bg-gray-600 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancel();
                            }}
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          {!item.dsc && item.isView && (
                            <div className="relative group">
                              <button
                                title="Delete"
                                className="p-2 bg-slate-500 text-white rounded-full shadow hover:bg-slate-700 transition"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVerify(item);
                                }}
                              >
                                <GoUnverified className="w-4 h-4" />
                              </button>
                              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Verify Data!
                              </span>
                            </div>
                          )}
                          <button
                            title="Edit"
                            className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item.id);
                            }}
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            title="Delete"
                            className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.dataId);
                            }}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </>
                      )
                    ) : item.dsc == null && item.isView ? (
                      <div className="relative group">
                        <button
                          className="p-2 bg-slate-500 text-white rounded-full shadow hover:bg-slate-700 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVerify(item);
                          }}
                        >
                          <GoUnverified className="w-4 h-4" />
                        </button>
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Verify Data!
                        </span>
                      </div>
                    ) : !item.isView ? (
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
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          View
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">
                        No actions available
                      </span>
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
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleEditInputChange(e, "name")}
                          className="border border-gray-300 p-1 rounded"
                        />
                      ) : (
                        <span className="flex gap-1 items-center font-medium text-black">
                          {item.name || "N/A"}
                          {(item.dsc || item.userId) && <MdVerified />}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-purple-400 w-4 h-4" />
                      {editingId === item.id ? (
                        <input
                          type="email"
                          value={editingData.email || ""}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleEditInputChange(e, "email")}
                          className="border border-gray-300 p-1 rounded"
                        />
                      ) : (
                        <span className="flex text-black items-center gap-1">
                          {item.email || "N/A"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-green-400 w-4 h-4" />
                      {editingId === item.id ? (
                        <input
                          type="text"
                          value={editingData.phone || ""}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleEditInputChange(e, "phone")}
                          className="border border-gray-300 p-1 rounded"
                        />
                      ) : (
                        <span className="flex text-black items-center gap-1">
                          {item.phone || "N/A"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaWhatsapp className="text-green-500 w-4 h-4" />
                      {editingId === item.id ? (
                        <input
                          type="text"
                          value={editingData.whatsapp || ""}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleEditInputChange(e, "whatsapp")}
                          className="border border-gray-300 p-1 rounded"
                        />
                      ) : (
                        <span className="flex text-black items-center gap-1">
                          {item.whatsapp || "N/A"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaVenusMars className="text-pink-400 w-4 h-4" />
                      {editingId === item.id ? (
                        <select
                          value={editingData.gender || "Female"}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleEditInputChange(e, "gender")}
                          className="border border-gray-300 p-1 rounded"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <span className="text-black">
                          {item.gender || "N/A"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaDatabase className="text-blue-600 w-4 h-4" />
                      <span className="text-black">
                        {getDataTypeName(item.datatype)}{" "}
                        {/* Use the helper function here */}
                      </span>
                    </div>
                    {item.userId && (
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-blue-600 w-4 h-4" />
                        <span className="text-black">U</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-8 py-2">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        City: {item.location.city || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        State: {item.location.state || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        Country: {item.location.country || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                      <p className="text-xs text-black">
                        Pincode: {item.location.pincode || "N/A"}
                      </p>
                    </div>
                  </div>
                </td>
                {dataFilter == "team" && (
                  <td className="px-8 py-2 text-md font-semibold">
                    {item.euserName}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to{" "}
          {Math.min(indexOfLastRecord, dataDetails.length)} Records
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
          {getPaginationRange().map((page) => (
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

      {/* Copyright Footer */}
      <div className="text-center text-sm text-black-500 mt-8">
        <span>
          Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>

      {isAddDataTeamConOpen && (
        <AddDataTeamContainer
          selectedRows={selectedRows}
          setIsAddDataTeamConOpen={setIsAddDataTeamConOpen}
        />
      )}

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
