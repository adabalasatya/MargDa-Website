import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaUpload,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";

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
  });

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultants, setConsultants] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [services, setServices] = useState([]);

  // Retrieve userID and AccessToken from localStorage
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const loginUserID = localUserData ? localUserData.user_data.userID : null;
  const accessToken = localUserData ? localUserData.access_token : null;

  // Fetch services and languages on component mount
  useEffect(() => {
    fetchServices();
    fetchLanguages();
  }, []);

  // Fetch services from the API
  const fetchServices = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/services",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const result = await response.json();
      console.log("Services API Response:", result);

      if (result.success && Array.isArray(result.data)) {
        setServices(result.data);
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
        setLanguages(result.data);
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
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.avatarName ||
      !formData.service ||
      !formData.heading ||
      !formData.details ||
      !formData.language.length ||
      !formData.feePerMinute
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Prepare the request body
    const selectedService = services.find(
      (service) => service.service === formData.service
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
    };

    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/add_advisor",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add advisor");
      }

      const result = await response.json();
      console.log("Advisor added successfully:", result);

      // Update local state with the new advisor
      setConsultants([...consultants, formData]);

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
      i === index
        ? { ...consultant, freeTwoMinutes: !consultant.freeTwoMinutes }
        : consultant
    );
    setConsultants(updatedConsultants);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Teleconsultant
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 3-Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div className="space-y-8">
                {/* Avatar Section */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Avatar pic
                  </label>
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
                      <span className="text-sm">Upload Avatar</span>
                    </label>
                  </div>
                </div>

                {/* Avatar Name */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Avatar name
                  </label>
                  <input
                    type="text"
                    name="avatarName"
                    value={formData.avatarName}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.serviceID} value={service.service}>
                        {service.service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-8">
                {/* Details */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Details of the service
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter details"
                    rows="4"
                  />
                </div>

                {/* Heading */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Heading
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter heading"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Language
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                    >
                      {formData.language.length > 0
                        ? formData.language.join(", ")
                        : "Select languages"}
                      <FaChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {isLanguageDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        <div className="p-3">
                          <div className="flex items-center p-2 border-b border-gray-200">
                            <FaSearch className="w-4 h-4 text-gray-500" />
                            <input
                              type="text"
                              placeholder="Search languages"
                              className="w-full p-2 focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-3">
                            {languages.map((lang) => (
                              <label
                                key={lang.langID}
                                className="flex items-center p-2 hover:bg-gray-100"
                              >
                                <input
                                  type="checkbox"
                                  name="language"
                                  value={lang.language}
                                  checked={formData.language.includes(
                                    lang.language
                                  )}
                                  onChange={handleLanguageChange}
                                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  {lang.language}
                                </span>
                              </label>
                            ))}
                          </div>
                          <div className="p-3 border-t border-gray-200">
                            <button
                              type="button"
                              onClick={() => setIsLanguageDropdownOpen(false)}
                              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-8">
                {/* Available Time */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Available time
                  </label>
                  <input
                    type="text"
                    name="availableTime"
                    value={formData.availableTime}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter available time"
                  />
                </div>

                {/* Live Toggle Switch */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Live
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-600">No</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, live: !formData.live })
                      }
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

                {/* Fee per Minute */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Fee per minute
                  </label>
                  <input
                    type="text"
                    name="feePerMinute"
                    value={formData.feePerMinute}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹ Enter fee"
                  />
                </div>

                {/* Free 2 Minutes Toggle Switch */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Free 2 minutes
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
                          formData.freeTwoMinutes
                            ? "translate-x-6"
                            : "translate-x-0"
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

            {/* Table Section (Inside Form) */}
            {consultants.length > 0 && (
              <div className="mt-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Teleconsultants
                </h2>
                <table className="min-w-full bg-white border border-gray-200">
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
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition duration-200"
                      >
                        {/* Avatar */}
                        <td className="py-6 px-6 border-b">
                          <div className="flex flex-col items-center">
                            <img
                              src={consultant.avatarPic}
                              alt={consultant.avatarName}
                              className="w-12 h-12 rounded-full"
                            />
                            <span className="mt-2 text-lg font-medium text-gray-800 text-center">
                              {consultant.avatarName}
                            </span>
                          </div>
                        </td>

                        {/* Service */}
                        <td className="py-6 px-6 border-b">
                          <div>
                            <div className="text-lg font-medium text-gray-800">
                              {consultant.service}
                            </div>
                            <div className="text-sm text-gray-600">
                              {consultant.heading}
                            </div>
                            <div className="text-sm text-gray-500">
                              {consultant.details}
                            </div>
                          </div>
                        </td>

                        {/* Connect */}
                        <td className="py-6 px-6 border-b">
                          <div>
                            <div className="text-lg text-gray-700">
                              {consultant.language.join(", ")}
                            </div>
                            <div className="text-sm text-gray-600">
                              {consultant.availableTime}
                            </div>
                            <div className="flex items-center mt-2">
                              <span className="text-sm text-gray-600 mr-2">
                                Live:
                              </span>
                              <button
                                onClick={() => toggleLiveStatus(index)}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                                  consultant.live
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                                }`}
                              >
                                <span
                                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                    consultant.live
                                      ? "translate-x-6"
                                      : "translate-x-0"
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
                              ₹{consultant.feePerMinute}/min
                            </div>
                            <div className="flex items-center mt-2">
                              <span className="text-sm text-gray-600 mr-2">
                                Free 2 mins:
                              </span>
                              <button
                                onClick={() => toggleFreeTwoMinutes(index)}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                                  consultant.freeTwoMinutes
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                                }`}
                              >
                                <span
                                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                    consultant.freeTwoMinutes
                                      ? "translate-x-6"
                                      : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-6 px-6 border-b">
                          <div className="flex items-center space-x-4">
                            <button className="text-blue-500 hover:text-blue-700">
                              <FaEdit className="w-6 h-6" />
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="w-6 h-6" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Teleconsultant;
