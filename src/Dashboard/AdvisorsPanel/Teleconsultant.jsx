import React, { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaTrash,
  FaUpload,
  FaChevronDown,
  FaSearch,
  FaSave,
  FaTimes,
  FaPhoneAlt,
  FaRupeeSign,
} from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Teleconsultant = () => {
  const [formData, setFormData] = useState({
    avatarPic: "",
    avatarName: "",
    service: "",
    heading: "",
    details: "",
    language: [],
    availableTime: ["09:00", "18:00"],
    live: false,
    feePerMinute: "",
    freeTwoMinutes: false,
    mobile: "",
    servicetype: "",
    refercode: "",
    pincode: "",
  });

  const [editFormData, setEditFormData] = useState({
    advisorID: "",
    serviceID: "",
    avatarPic: "",
    avatarName: "",
    serviceName: "",
    serviceType: "",
    heading: "",
    details: "",
    language: [],
    availableTime: ["", ""],
    live: false,
    feePerMinute: "",
    freeTwoMinutes: false,
    mobile: "",
    pincode: "",
  });

  const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
  const [isEditLanguagePopupOpen, setIsEditLanguagePopupOpen] = useState(false);
  const [editingAdvisorId, setEditingAdvisorId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultants, setConsultants] = useState([]);
  const [referedConsultants, setReferedConsultants] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [addNewService, setAddNewService] = useState(false);

  const languagePopupRef = useRef(null);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    fetchServices();
    fetchServiceTypes();
    fetchLanguages();
    fetchAdvisors();
    fetchReferedAdvisors();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch("https://margda.in:7000/api/upload_file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();
      if (result.success) {
        return result.fileUrls[0];
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again later.");
      return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languagePopupRef.current &&
        !languagePopupRef.current.contains(event.target)
      ) {
        setIsLanguagePopupOpen(false);
        setIsEditLanguagePopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchAdvisors = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/get_advisors",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch advisors");
      }

      const result = await response.json();

      if (response.ok) {
        setConsultants(result.Services);
        if (result.Services.length == 0) {
          setIsFormVisible(true);
        }
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching advisors:", error);
      // alert("Failed to fetch advisors. Please try again later.");
    }
  };

  const fetchReferedAdvisors = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/get_refered_advisors",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (result.Advisors.length > 0) {
          setReferedConsultants(result.Advisors);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching refered advisors:", error);
    }
  };

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

      if (result.success && Array.isArray(result.data)) {
        setAllServices(result.data);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Failed to fetch services. Please try again later.");
    }
  };

  const fetchServiceTypes = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/service/get-servicetypes",
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

      if (result.success && Array.isArray(result.data)) {
        const services = result.data;
        setServiceTypes(services);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Failed to fetch services. Please try again later.");
    }
  };

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

      if (result.success && Array.isArray(result.data)) {
        const sortedLanguages = result.data.sort((a, b) =>
          a.language.localeCompare(b.language)
        );
        setLanguages(sortedLanguages);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
      alert("Failed to fetch languages. Please try again later.");
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const fileUrl = await uploadFile(file);
        if (fileUrl) {
          setFormData({
            ...formData,
            [name]: fileUrl,
          });
        }
      }
    } else {
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

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (name == "start") {
      setFormData({
        ...formData,
        ["availableTime"]: [value, formData.availableTime[1]],
      });
    } else if (name == "end") {
      setFormData({
        ...formData,
        ["availableTime"]: [formData.availableTime[0], value],
      });
    }
  };

  const handleEditChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const fileUrl = await uploadFile(file);
        if (fileUrl) {
          setEditFormData({
            ...editFormData,
            [name]: fileUrl,
          });
        }
      }
    } else if (name === "language") {
      const { value, checked } = e.target;
      if (checked) {
        setEditFormData({
          ...editFormData,
          language: [...editFormData.language, value],
        });
      } else {
        setEditFormData({
          ...editFormData,
          language: editFormData.language.filter((lang) => lang !== value),
        });
      }
    } else if (name === "servicetype") {
      const filter = allServices.filter((item) => item.servicetype == value);
      setServices(filter);
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleEditTimeChange = (e) => {
    const { name, value } = e.target;
    if (name == "start") {
      setEditFormData({
        ...editFormData,
        ["availableTime"]: [value, editFormData.availableTime[1]],
      });
    } else if (name == "end") {
      setEditFormData({
        ...editFormData,
        ["availableTime"]: [editFormData.availableTime[0], value],
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.avatarName ||
      !formData.avatarPic ||
      !formData.service ||
      !formData.heading ||
      !formData.details ||
      !formData.language.length ||
      !formData.feePerMinute ||
      !formData.mobile ||
      !formData.service ||
      !formData.servicetype
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    const requestBody = {
      serviceName: formData.service,
      serviceType: formData.servicetype,
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
      available_time: formData.availableTime,
      live: formData.live,
      free_2_minutes: formData.freeTwoMinutes,
      mobile: formData.mobile,
      referCode: formData.refercode || null,
      pincode: formData.pincode || null,
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

      const result = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("This service is already added.");
        } else if (response.status === 400) {
          return alert(result.message);
        }
        throw new Error("Failed to add advisor.");
      }

      setConsultants([...consultants, result.data]);

      setFormData({
        avatarPic: "",
        avatarName: "",
        service: "",
        heading: "",
        details: "",
        language: [],
        availableTime: ["", ""],
        live: false,
        feePerMinute: "",
        freeTwoMinutes: false,
        mobile: "",
        servicetype: "",
        pincode: "",
      });

      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding advisor:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (index) => {
    const updatedConsultants = consultants.filter((_, i) => i !== index);
    setConsultants(updatedConsultants);
  };

  const toggleLiveStatus = (index) => {
    const updatedConsultants = consultants.map((consultant, i) =>
      i === index ? { ...consultant, live: !consultant.live } : consultant
    );
    setConsultants(updatedConsultants);
  };

  const toggleFreeTwoMinutes = (index) => {
    const updatedConsultants = consultants.map((consultant, i) =>
      i === index
        ? { ...consultant, freeTwoMinutes: !consultant.freeTwoMinutes }
        : consultant
    );
    setConsultants(updatedConsultants);
  };

  const handleShowEditForm = (consultant) => {
    setIsEditFormOpen(true);
    const filter = allServices.filter(
      (item) => item.servicetype === consultant.serviceType
    );
    setServices(filter);
    setEditFormData({
      advisorID: consultant.advisorID,
      serviceID: consultant.serviceID,
      avatarPic: consultant.avatar_url,
      avatarName: consultant.avatar_name,
      serviceName: consultant.serviceName,
      serviceType: consultant.serviceType,
      heading: consultant.heading,
      details: consultant.details,
      language: consultant.language.map((lang) => {
        const selectedLang = languages.find((item) => item.langID == lang);
        return selectedLang ? selectedLang.language : null;
      }),
      availableTime: consultant.avail_time,
      live: consultant.live,
      feePerMinute: consultant.fee_pm,
      freeTwoMinutes: consultant.free,
      mobile: consultant.mobile,
      pincode: consultant.pincode,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (
      !editFormData.avatarName ||
      !editFormData.avatarPic ||
      !editFormData.serviceName ||
      !editFormData.serviceType ||
      !editFormData.heading ||
      !editFormData.details ||
      !editFormData.language.length ||
      !editFormData.feePerMinute ||
      !editFormData.mobile
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    const requestBody = {
      advisorID: editFormData.advisorID,
      serviceName: editFormData.serviceName,
      serviceType: editFormData.serviceType,
      fee_per_minute: parseFloat(editFormData.feePerMinute),
      avatar_url: editFormData.avatarPic,
      avatar_name: editFormData.avatarName,
      heading: editFormData.heading,
      details: editFormData.details,
      languages: editFormData.language
        .map((lang) => {
          const selectedLang = languages.find((l) => l.language === lang);
          return selectedLang ? selectedLang.langID : null;
        })
        .filter((id) => id !== null),
      available_time: editFormData.availableTime,
      live: editFormData.live,
      free_2_minutes: editFormData.freeTwoMinutes,
      mobile: editFormData.mobile,
      pincode: editFormData.pincode,
    };

    try {
      const response = await fetch(
        `https://margda.in:7000/api/advisor/update_advisor`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Advisor not found. Please check the ID and try again."
          );
        } else {
          throw new Error("Failed to update advisor.");
        }
      }

      const result = await response.json();

      // Re-fetch advisors to update the list
      await fetchAdvisors();

      setIsEditFormOpen(false);
    } catch (error) {
      console.error("Error updating advisor:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isFormVisible ? "Close Form" : "Add Services"}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Teleconsultant
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Avatar pic
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="avatarPic"
                      className="cursor-pointer w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition duration-300"
                    >
                      {formData.avatarPic ? (
                        <div className="flex items-center justify-center">
                          <img
                            src={formData.avatarPic}
                            alt="Profile Picture"
                            className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-sm"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <FaUpload className="w-6 h-6 text-gray-500" />
                          </div>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      name="avatarPic"
                      onChange={handleChange}
                      className="hidden"
                      id="avatarPic"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Avatar name
                  </label>
                  <input
                    type="text"
                    name="avatarName"
                    value={formData.avatarName}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Avtar Name"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Service Type
                  </label>
                  <select
                    name="servicetype"
                    value={formData.servicetype}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service type</option>
                    {serviceTypes.map((service, index) => (
                      <option key={index} value={service.servicetypeID}>
                        {service.servicetype}
                      </option>
                    ))}
                  </select>
                </div>

                {addNewService ? (
                  <div>
                    <label
                      htmlFor="newService"
                      className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      New Service
                    </label>
                    <input
                      id="newService"
                      value={formData.service}
                      onChange={handleChange}
                      name="service"
                      placeholder="New Service"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
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
                )}
                <div className="flex items-center flex-row">
                  <label htmlFor="newservicecheckbox"> Add New Service</label>
                  <input
                    checked={addNewService}
                    onChange={() => setAddNewService(!addNewService)}
                    type="checkbox"
                    className="ml-1"
                    name="newservicecheckbox"
                    id="newservicecheckbox"
                  />
                </div>
              </div>

              <div>
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
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

                <div>
                  <label className="block text-lg font-medium p-2 text-gray-700 mb-3">
                    Heading
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Service Heading"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium p-2 text-gray-700 mb-3">
                    Language
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsLanguagePopupOpen(!isLanguagePopupOpen)
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                    >
                      {formData.language.length > 0
                        ? formData.language.join(", ")
                        : "Select languages"}
                      <FaChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Details of the service
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Service Details"
                    rows="4"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium p-2 text-gray-700 mb-3">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Pin Code"
                  />
                </div>
                <div>
                  <label
                    className="block text-lg font-medium text-gray-700 mb-3"
                    htmlFor="avail_time"
                  >
                    Available Hours
                  </label>

                  <input
                    type="time"
                    name="start"
                    id="avail_time"
                    className="mr-4"
                    value={formData.availableTime[0]}
                    onChange={handleTimeChange}
                  />
                  <input
                    type="time"
                    value={formData.availableTime[1]}
                    name="end"
                    id="avail_time"
                    onChange={handleTimeChange}
                  />
                </div>

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

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Fee per minute
                  </label>
                  <input
                    type="number"
                    name="feePerMinute"
                    value={formData.feePerMinute}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹ Fee Per Minute"
                  />
                </div>

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
                {consultants.length == 0 && (
                  <div>
                    <label
                      className="block text-lg font-medium text-gray-700 mb-3"
                      htmlFor="refercode"
                    >
                      Refer Code
                    </label>
                    <input
                      type="text"
                      value={formData.refercode}
                      onChange={handleChange}
                      placeholder="Refer By"
                      name="refercode"
                      id="refercode"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 items-center"
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

      {consultants.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Teleconsultants
          </h2>
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
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-200"
                >
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

                  <td className="py-6 px-6 border-b">
                    <div>
                      <div className="text-lg font-medium text-gray-800">
                        {services
                          .filter(
                            (item) => item.serviceID == consultant.serviceID
                          )
                          .map((item) => (
                            <div key={item.serviceID}>{item.service}</div>
                          ))}
                      </div>

                      <div className="text-sm text-black-500">
                        <strong>Service:</strong> {consultant.serviceName}
                      </div>
                      <div className="text-sm text-black-600">
                        <strong> Heading:</strong> {consultant.heading}
                      </div>
                      <div className="text-sm text-black-500">
                        <strong>Details:</strong> {consultant.details}
                      </div>
                      <div className="text-sm text-black-500">
                        <strong>Timing:</strong>{" "}
                        {consultant.avail_time[0] +
                          " - " +
                          consultant.avail_time[1]}
                      </div>
                    </div>
                  </td>

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
                        <span className="text-sm text-gray-600 mr-2">
                          Live:
                        </span>
                        <button
                          disabled
                          onClick={() => toggleLiveStatus(index)}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            consultant.live ? "bg-blue-600" : "bg-gray-300"
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

                  <td className="py-6 px-6 border-b">
                    <div>
                      <div className="text-lg text-gray-800">
                        ₹{consultant.fee_pm}/min
                      </div>

                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600 mr-2">
                          Free 2 mins:
                        </span>
                        <button
                          disabled={editingAdvisorId != consultant.advisorID}
                          onClick={() => toggleFreeTwoMinutes(index)}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            consultant.free ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                              consultant.free
                                ? "translate-x-6"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="py-6 px-6 border-b">
                    <div className="flex items-center space-x-4">
                      <>
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleShowEditForm(consultant)}
                        >
                          <FaEdit className="w-6 h-6" />
                        </button>
                        {/*<button
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="w-6 h-6" />
                        </button>*/}
                        {/* <Link to={"/online-payment"}>
                          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <FaPhoneAlt className="w-5 h-5" />{" "}
                            <span className="text-left">
                              Web telephony is not activated. <br />
                              Pay <FaRupeeSign className="inline" />
                              2,700 + GST for activation.
                            </span>
                          </button>
                        </Link> */}
                      </>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="font-bold text-xl mb-4">You Refered These Advisors</p>
          {referedConsultants && referedConsultants.length > 0 ? (
            <div className="flex flex-col gap-3">
              {referedConsultants.map((consultant, index) => (
                <div
                  key={index}
                  className="bg-gray-100 flex rounded p-5 items-center hover:bg-gray-300"
                >
                  <div className="mr-9">{index + 1}.</div>
                  <div className="mr-9">
                    <p>Advisor Name</p>
                    <div>{consultant.avatar_name}</div>
                  </div>
                  <div className="mr-9">
                    <p>Service</p>
                    <div>{consultant.serviceName}</div>
                  </div>
                  <div className="mr-9">
                    <p>Fee Per Minute</p>
                    <div> {consultant.fee_pm}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div> You had not refered any advisor yet</div>
          )}
        </div>
      )}

      {isLanguagePopupOpen && (
        <div
          role="dialog"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={languagePopupRef}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Select Languages
            </h2>
            <div className="flex items-center p-2 border-b border-gray-200 mb-4">
              <FaSearch className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search languages"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredLanguages.map((lang) => (
                <label
                  key={lang.langID}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <input
                    type="checkbox"
                    name="language"
                    value={lang.language}
                    checked={formData.language.includes(lang.language)}
                    onChange={handleLanguageChange}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {lang.language}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsLanguagePopupOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditLanguagePopupOpen && (
        <div
          role="dialog"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={languagePopupRef}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Select Languages
            </h2>
            <div className="flex items-center p-2 border-b border-gray-200 mb-4">
              <FaSearch className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search languages"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredLanguages.map((lang) => (
                <label
                  key={lang.langID}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <input
                    type="checkbox"
                    name="language"
                    value={lang.language}
                    checked={editFormData.language.includes(lang.language)}
                    onChange={handleEditChange}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {lang.language}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditLanguagePopupOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditFormOpen && (
        <div
          role="dialog"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
        >
          <div className="bg-white p-8 rounded-lg shadow-md mb-8  max-w-[60%]">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Teleconsultant
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar pic
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="editAvatarPic" className="cursor-pointer">
                        {editFormData.avatarPic ? (
                          <img
                            src={editFormData.avatarPic}
                            alt="Profile Picture"
                            className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-sm hover:border-blue-600 transition duration-300"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500 transition duration-300">
                            <FaUpload className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        name="avatarPic"
                        onChange={handleEditChange}
                        className="hidden"
                        id="editAvatarPic"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type
                    </label>
                    <select
                      name="servicetype"
                      value={editFormData.serviceType}
                      onChange={handleEditChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      disabled
                    >
                      <option value="">Select a service type</option>
                      {serviceTypes.map((service, index) => (
                        <option key={index} value={service.servicetypeID}>
                          {service.servicetype}
                        </option>
                      ))}
                      <option value="new"> Add New Service Type</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service
                    </label>
                    <select
                      name="service"
                      value={editFormData.serviceName}
                      onChange={handleEditChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      disabled
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.serviceID} value={service.service}>
                          {service.service}
                        </option>
                      ))}
                      <option value="new"> Add New Service</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pin Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={editFormData.pincode}
                      onChange={handleEditChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Pin Code"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar name
                    </label>
                    <input
                      type="text"
                      name="avatarName"
                      value={editFormData.avatarName}
                      onChange={handleEditChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Avatar Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Mobile Number
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={editFormData.mobile}
                      onChange={(value) =>
                        setEditFormData({ ...editFormData, mobile: value })
                      }
                      placeholder="Mobile"
                      inputStyle={{
                        width: "100%",
                        height: "36px",
                        paddingLeft: "40px",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditLanguagePopupOpen(!isEditLanguagePopupOpen)
                        }
                        className="w-full p-1.5 border border-gray-300 rounded-md text-left bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
                      >
                        {editFormData.language.length > 0
                          ? editFormData.language.join(", ")
                          : "Select languages"}
                        <FaChevronDown className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Details of the service
                    </label>
                    <textarea
                      name="details"
                      value={editFormData.details}
                      onChange={handleEditChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Service Details"
                      rows="2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading
                    </label>
                    <input
                      type="text"
                      name="heading"
                      value={editFormData.heading}
                      onChange={handleEditChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Service Heading"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-lg font-medium text-gray-700 mb-3"
                      htmlFor="avail_edit_time"
                    >
                      Available Hours
                    </label>

                    <input
                      type="time"
                      name="start"
                      id="avail_edit_time"
                      className="mr-4"
                      value={editFormData.availableTime[0]}
                      onChange={handleEditTimeChange}
                    />
                    <input
                      type="time"
                      value={editFormData.availableTime[1]}
                      name="end"
                      id="avail_edit_time"
                      onChange={handleEditTimeChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Live
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 text-xs text-gray-600">No</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditFormData({
                            ...editFormData,
                            live: !editFormData.live,
                          })
                        }
                        className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${
                          editFormData.live ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                            editFormData.live
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="ml-2 text-xs text-gray-600">Yes</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fee per minute
                    </label>
                    <input
                      type="number"
                      name="feePerMinute"
                      value={editFormData.feePerMinute}
                      onChange={handleEditChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="₹ Fee Per Minute"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Free 2 minutes
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 text-xs text-gray-600">No</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditFormData({
                            ...editFormData,
                            freeTwoMinutes: !editFormData.freeTwoMinutes,
                          })
                        }
                        className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${
                          editFormData.freeTwoMinutes
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                            editFormData.freeTwoMinutes
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="ml-2 text-xs text-gray-600">Yes</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-3 w-3 mr-2 text-white"
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
                  className="px-4 ml-2 py-1.5 bg-gray-400 text-white rounded-md hover:bg-gray-700 transition duration-300 items-center"
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
