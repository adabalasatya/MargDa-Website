import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaUpload, FaChevronDown, FaSearch, FaSave, FaTimes, FaUser } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Teleconsultant = () => {
  const [formData, setFormData] = useState({
    avatarPic: "",
    avatarName: "",
    service: "",
    heading: "",
    details: "",
    language: [],
    availableTime: "08:00 to 16:00",
    live: false,
    feePerMinute: "",
    freeTwoMinutes: false,
    mobile: "",
    servicetype: "",
  });

  const [editFormData, setEditFormData] = useState({
    advisorID: "",
    serviceID: "",
    fee_per_minute: "",
    avatar_url: "",
    avatar_name: "",
    heading: "",
    details: "",
    languages: [], // Initialize as an array
    available_time: [], // Initialize as an array
    live: false,
    free_2_minutes: false,
    mobile: "",
  });

  const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [editingAdvisorId, setEditingAdvisorId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultants, setConsultants] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");

  const languagePopupRef = useRef(null);

  // Retrieve userID and AccessToken from localStorage
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  // Fetch services and languages on component mount
  useEffect(() => {
    fetchServices();
    fetchLanguages();
    fetchAdvisors();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languagePopupRef.current && !languagePopupRef.current.contains(event.target)) {
        setIsLanguagePopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch advisors from the API
  const fetchAdvisors = async () => {
    try {
      const response = await fetch("https://margda.in:7000/api/advisor/get_advisors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch advisors");
      }

      const result = await response.json();
      console.log("Advisors API Response:", result);

      if (response.ok) {
        setConsultants(result.Services); // Update the consultants state with fetched data
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching advisors:", error);
      alert("Failed to fetch advisors. Please try again later.");
    }
  };

  // Fetch services from the API
  const fetchServices = async () => {
    try {
      const response = await fetch("https://margda.in:7000/api/advisor/services", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const result = await response.json();
      console.log("Services API Response:", result);

      if (result.success && Array.isArray(result.data)) {
        const services = result.data;
        const serviceTypes = [...new Set(services.map((item) => item.servicetype))];
        setAllServices(result.data);
        setServiceTypes(serviceTypes);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Failed to fetch services. Please try again later.");
    }
  };

  // Fetch languages from the API
  const fetchLanguages = async () => {
    try {
      const response = await fetch("https://margda.in:7000/api/languages", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch languages");
      }

      const result = await response.json();
      console.log("Languages API Response:", result);

      if (result.success && Array.isArray(result.data)) {
        const sortedLanguages = result.data.sort((a, b) => a.language.localeCompare(b.language));
        setLanguages(sortedLanguages);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
      alert("Failed to fetch languages. Please try again later.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({
            ...formData,
            [name]: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      if ((name === "service" || name === "servicetype") && value === "new") {
        return setIsAddServiceOpen(true);
      }
      if (name === "servicetype") {
        const filter = allServices.filter((item) => item.servicetype == value);
        setServices(filter);
      }
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditFormData({
            ...editFormData,
            [name]: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      if ((name === "service" || name === "servicetype") && value === "new") {
        return setIsAddServiceOpen(true);
      }
      if (name === "servicetype") {
        const filter = allServices.filter((item) => item.servicetype == value);
        setServices(filter);
      }
      setEditFormData({
        ...editFormData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle language selection changes
  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        language: [...formData.language, value],
      });
    } else {
      setFormData({
        ...formData,
        language: formData.language.filter((lang) => lang !== value),
      });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobile: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.avatarName ||
      !formData.avatarPic ||
      !formData.service ||
      !formData.heading ||
      !formData.details ||
      !formData.language.length ||
      !formData.feePerMinute ||
      !formData.mobile
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Prepare the request body
    const selectedService = allServices.find(
      (service) =>
        service.service === formData.service && service.servicetype == formData.servicetype
    );
    const serviceID = selectedService ? selectedService.serviceID : null;

    const requestBody = {
      serviceID: serviceID,
      fee_per_minute: parseFloat(formData.feePerMinute),
      avatar_url: formData.avatarPic,
      avatar_name: formData.avatarName,
      heading: formData.heading,
      details: formData.details,
      languages: formData.language
        .map((lang) => {
          const selectedLang = languages.find((l) => l.language === lang);
          return selectedLang ? selectedLang.langID : null;
        })
        .filter((id) => id !== null),
      available_time: formData.availableTime.split(" to "),
      live: formData.live,
      free_2_minutes: formData.freeTwoMinutes,
      mobile: formData.mobile,
    };

    try {
      const response = await fetch("https://margda.in:7000/api/advisor/add_advisor", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        if (response.status == 409) {
          return alert("This service is already added");
        }
        throw new Error("Failed to add advisor");
      }

      const result = await response.json();
      console.log("Advisor added successfully:", result);

      // Update local state with the new advisor
      setConsultants([...consultants, result.data]);

      // Reset form data
      setFormData({
        avatarPic: "",
        avatarName: "",
        service: "",
        heading: "",
        details: "",
        language: [],
        availableTime: "08:00 to 16:00",
        live: false,
        feePerMinute: "",
        freeTwoMinutes: false,
        mobile: "",
      });

      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding advisor:", error);
      alert("Failed to add advisor. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete action
  const handleDelete = (index) => {
    const updatedConsultants = consultants.filter((_, i) => i !== index);
    setConsultants(updatedConsultants);
  };

  // Toggle live status
  const toggleLiveStatus = (index) => {
    const updatedConsultants = consultants.map((consultant, i) =>
      i === index ? { ...consultant, live: !consultant.live } : consultant
    );
    setConsultants(updatedConsultants);
  };

  // Toggle free 2 minutes
  const toggleFreeTwoMinutes = (index) => {
    const updatedConsultants = consultants.map((consultant, i) =>
      i === index ? { ...consultant, freeTwoMinutes: !consultant.freeTwoMinutes } : consultant
    );
    setConsultants(updatedConsultants);
  };

  // Handle showing the edit form with pre-filled data
  const handleShowEditForm = (consultant) => {
    setIsEditFormOpen(true);
    setEditFormData({
      ...consultant,
      languages: consultant.languages || [], // Ensure languages is an array
      available_time: consultant.available_time || [], // Ensure available_time is an array
    });
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !editFormData.avatar_name ||
      !editFormData.avatar_url ||
      !editFormData.heading ||
      !editFormData.details ||
      !editFormData.languages.length ||
      !editFormData.fee_per_minute ||
      !editFormData.mobile
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Prepare the request body
    const requestBody = {
      advisorID: parseInt(editFormData.advisorID, 10), // Ensure advisorID is an integer
      serviceID: parseInt(editFormData.serviceID, 10), // Ensure serviceID is an integer
      fee_per_minute: parseFloat(editFormData.fee_per_minute), // Ensure fee_per_minute is a number
      avatar_url: editFormData.avatar_url,
      avatar_name: editFormData.avatar_name,
      heading: editFormData.heading,
      details: editFormData.details,
      languages: editFormData.languages
        .map((lang) => {
          const selectedLang = languages.find((l) => l.language === lang);
          return selectedLang ? selectedLang.langID : null;
        })
        .filter((id) => id !== null), // Map language names to their IDs
      available_time: editFormData.available_time, // Ensure this is an array of times
      live: editFormData.live,
      free_2_minutes: editFormData.free_2_minutes,
      mobile: editFormData.mobile, // Ensure mobile is a string
    };

    try {
      const response = await fetch("https://margda.in:7000/api/advisor/update_advisor", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response
        console.error("Error response:", errorResponse);
        throw new Error("Failed to update advisor");
      }

      const result = await response.json();
      console.log("Advisor updated successfully:", result);

      // Update local state with the updated advisor
      const updatedConsultants = consultants.map((consultant) =>
        consultant.advisorID === editFormData.advisorID ? { ...consultant, ...result.data } : consultant
      );
      setConsultants(updatedConsultants);

      // Close the edit form
      setIsEditFormOpen(false);
    } catch (error) {
      console.error("Error updating advisor:", error);
      alert("Failed to update advisor. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      {/* Add Services Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isFormVisible ? "Close Form" : "Add Services"}
        </button>
      </div>

      {/* Form Section */}
      {isFormVisible && (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Teleconsultant</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 3x4 Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div className="space-y-8">
                {/* Avatar Section */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Avatar Pic
                  </label>
                  {formData.avatarPic && (
                    <img
                      src={formData.avatarPic}
                      alt="Profile Picture"
                      className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md mx-auto mb-4"
                    />
                  )}
                  <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition duration-300">
                    <input
                      type="file"
                      name="avatarPic"
                      onChange={handleChange}
                      className="hidden"
                      id="avatarPic"
                    />
                    <label
                      htmlFor="avatarPic"
                      className="flex flex-col items-center text-gray-600 cursor-pointer hover:text-blue-600"
                    >
                      <FaUpload className="w-8 h-8 mb-2" />
                      <span className="text-sm">
                        {formData.avatarPic ? "Change Avatar" : "Upload Avatar"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Avatar Name */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Avatar Name
                  </label>
                  <input
                    type="text"
                    name="avatarName"
                    value={formData.avatarName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter Avatar Name"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Service Type
                  </label>
                  <select
                    name="servicetype"
                    value={formData.servicetype}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service type</option>
                    {serviceTypes.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                    <option value="new">Add New Service Type</option>
                  </select>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.serviceID} value={service.service}>
                        {service.service}
                      </option>
                    ))}
                    <option value="new">Add New Service</option>
                  </select>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-8">
                {/* Mobile Number */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Service Mobile Number
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={formData.mobile}
                    onChange={handlePhoneChange}
                    placeholder="Mobile"
                    inputStyle={{
                      width: "100%",
                      height: "50px",
                      paddingLeft: "58px",
                    }}
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Details of the Service
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter Service Details"
                    rows="4"
                  />
                </div>

                {/* Heading */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Heading
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter Service Heading"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Language
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsLanguagePopupOpen(!isLanguagePopupOpen)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                    >
                      {formData.language.length > 0
                        ? formData.language.join(", ")
                        : "Select languages"}
                      <FaChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-8">
                {/* Available Time */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Available Time
                  </label>
                  <input
                    type="text"
                    name="availableTime"
                    value={formData.availableTime}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter Available Time"
                  />
                </div>

                {/* Live Toggle */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Live
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-600">No</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, live: !formData.live })}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        formData.live ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          formData.live ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="ml-2 text-sm text-gray-600">Yes</span>
                  </div>
                </div>

                {/* Fee Per Minute */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Fee Per Minute
                  </label>
                  <input
                    type="number"
                    name="feePerMinute"
                    value={formData.feePerMinute}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="₹ Fee Per Minute"
                  />
                </div>

                {/* Free 2 Minutes Toggle */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Free 2 Minutes
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-600">No</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          freeTwoMinutes: !formData.freeTwoMinutes,
                        })
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        formData.freeTwoMinutes ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          formData.freeTwoMinutes ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="ml-2 text-sm text-gray-600">Yes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Consultants Table */}
      {consultants.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Teleconsultants</h2>
          <table className="min-w-full bg-white border border-gray-200 mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Avatar
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Service
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Connect
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Fee
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {consultants.map((consultant, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-200">
                  {/* Avatar */}
                  <td className="py-6 px-6 border-b">
                    <div className="flex flex-col items-center">
                      <img
                        src={consultant.avatar_url}
                        alt={consultant.avatar_name}
                        className="w-12 h-12 rounded-full"
                      />

                      <span className="mt-2 text-lg font-medium text-gray-800 text-center">
                        {consultant.avatar_name}
                      </span>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="py-6 px-6 border-b">
                    <div>
                      <div className="text-lg font-medium text-gray-800">
                        {services
                          .filter((item) => item.serviceID == consultant.serviceID)
                          .map((item) => (
                            <div key={item.serviceID}>{item.service}</div>
                          ))}
                      </div>
                      <div className="text-sm text-gray-600">{consultant.heading}</div>
                      <div className="text-sm text-gray-500">{consultant.details}</div>
                    </div>
                  </td>

                  {/* Connect */}
                  <td className="py-6 px-6 border-b">
                    <div>
                      <div className="text-lg text-gray-700 flex flex-row">
                        {consultant.language.map((lang) =>
                          languages
                            .filter((item) => item.langID == lang)
                            .map((item) => (
                              <div key={item.langID}>{item.language}, </div>
                            ))
                        )}
                      </div>

                      <div className="text-sm text-gray-600">
                        {consultant.availableTime}
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600 mr-2">Live:</span>
                        <button
                          onClick={() => toggleLiveStatus(index)}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            consultant.live ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                              consultant.live ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Fee */}
                  <td className="py-6 px-6 border-b">
                    <div>
                      <div className="text-lg text-gray-800">
                        ₹{consultant.fee_pm}/min
                      </div>

                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600 mr-2">Free 2 mins:</span>
                        <button
                          onClick={() => toggleFreeTwoMinutes(index)}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            consultant.free ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                              consultant.free ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-6 px-6 border-b">
                    <div className="flex items-center space-x-4">
                      <>
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleShowEditForm(consultant)}
                        >
                          <FaEdit className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="w-6 h-6" />
                        </button>
                      </>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Form Modal */}
      {isEditFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Edit Consultant</h2>

            <form onSubmit={handleEditSubmit} className="space-y-6 w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
              {/* 3x4 Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="space-y-6">
                  {/* Avatar Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avatar Pic
                    </label>
                    <div className="flex items-center justify-center">
                      <label htmlFor="avatarPic" className="cursor-pointer">
                        {editFormData.avatar_url ? (
                          <img
                            src={editFormData.avatar_url}
                            alt="Profile Picture"
                            className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-sm hover:border-blue-600 transition duration-300"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-sm flex items-center justify-center hover:border-blue-500 transition duration-300">
                            <FaUser className="w-10 h-10 text-gray-400 hover:text-blue-500 transition duration-300" />
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        name="avatarPic"
                        onChange={handleEditChange}
                        className="hidden"
                        id="avatarPic"
                      />
                    </div>
                  </div>

                  {/* Advisor ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Advisor ID
                    </label>
                    <input
                      type="number"
                      name="advisorID"
                      value={editFormData.advisorID}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      placeholder="Enter Advisor ID"
                      disabled // Disable editing of advisorID
                    />
                  </div>

                  {/* Service ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service ID
                    </label>
                    <input
                      type="number"
                      name="serviceID"
                      value={editFormData.serviceID}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      placeholder="Enter Service ID"
                    />
                  </div>

                  {/* Fee Per Minute */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fee Per Minute
                    </label>
                    <input
                      type="number"
                      name="fee_per_minute"
                      value={editFormData.fee_per_minute}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      placeholder="₹ Fee Per Minute"
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {/* Avatar Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avatar Name
                    </label>
                    <input
                      type="text"
                      name="avatar_name"
                      value={editFormData.avatar_name}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      placeholder="Enter Avatar Name"
                    />
                  </div>

                  {/* Heading */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      name="heading"
                      value={editFormData.heading}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      placeholder="Enter Service Heading"
                    />
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Languages
                    </label>
                    <input
                      type="text"
                      name="languages"
                      value={editFormData.languages?.join(", ") || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          languages: e.target.value.split(",").map((lang) => lang.trim()),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      placeholder="Enter Languages"
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Details
                    </label>
                    <textarea
                      name="details"
                      value={editFormData.details}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      placeholder="Enter Service Details"
                      rows="3"
                    />
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-6">
                  {/* Available Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time
                    </label>
                    <input
                      type="text"
                      name="available_time"
                      value={editFormData.available_time?.join(", ") || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          available_time: e.target.value.split(",").map((time) => time.trim()),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      placeholder="Enter Available Time"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={editFormData.mobile}
                      onChange={(value) => setEditFormData({ ...editFormData, mobile: value })}
                      placeholder="Mobile"
                      inputStyle={{
                        width: "100%",
                        height: "50px",
                        paddingLeft: "58px",
                      }}
                    />
                  </div>

                  {/* Live Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-600">No</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditFormData({
                            ...editFormData,
                            live: !editFormData.live,
                          })
                        }
                        className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${
                          editFormData.live ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            editFormData.live ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </div>
                  </div>

                  {/* Free 2 Minutes Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Free 2 Minutes
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-600">No</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditFormData({
                            ...editFormData,
                            free_2_minutes: !editFormData.free_2_minutes,
                          })
                        }
                        className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${
                          editFormData.free_2_minutes ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            editFormData.free_2_minutes ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  onClick={() => setIsEditFormOpen(false)}
                  className="px-6 ml-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teleconsultant;