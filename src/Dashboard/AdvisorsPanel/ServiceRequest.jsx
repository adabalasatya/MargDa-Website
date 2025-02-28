import { useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaEdit,
  FaPhone,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const ServiceRequest = () => {
  const [formData, setFormData] = useState({
    serviceID: "",
    service: "",
    servicetype: "",
    heading: "",
    details: "",
    language: [],
    pincode: "",
    mobile: "",
  });

  const [editFormData, setEditFormData] = useState({
    servicereqID: "",
    serviceID: "",
    service: "",
    servicetype: "",
    heading: "",
    details: "",
    language: [],
    mobile: "",
    pincode: "",
  });

  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [isEditLanguagePopupOpen, setIsEditLanguagePopupOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [filterServices, setFilterServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [editServices, setEditServices] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [addNewService, setAddNewService] = useState(false);
  const [addNewServiceInEdit, setAddNewServiceInEdit] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [searchLanguageQuery, setSearchLanguageQuery] = useState("");
  const [serviceRequestForm, setServiceRequestFrom] = useState(false);
  const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const loginUserID = localUserData ? localUserData.user_data.userID : null;
  const accessToken = localUserData ? localUserData.access_token : null;

  const languagePopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languagePopupRef.current &&
        !languagePopupRef.current.contains(event.target)
      ) {
        setIsLanguagePopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchServiceTypes();
    fetchServices();
    fetchLanguages();
    fetchServiceRequests();
  }, []);

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/get-service-requests",
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

      if (response.ok) {
        const advisors = result.Services;
        setRequests(advisors);
        setAllRequests(advisors);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
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
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "servicetype") {
      const filter = allServices.filter((item) => item.servicetype == value);
      setFormData({ ...formData, ["service"]: "", ["servicetype"]: value });
      return setServices(filter);
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobile: value });
  };

  const handleEditChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "language") {
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
      setEditServices(filter);
      setEditFormData({
        ...editFormData,
        [name]: value,
        ["service"]: "",
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.language.toLowerCase().includes(searchLanguageQuery.toLowerCase())
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

  const handleShowEditForm = (consultant) => {
    setIsEditFormOpen(true);
    const filter = allServices.filter(
      (item) => item.servicetype === consultant.serviceType
    );
    setEditServices(filter);
    setEditFormData({
      servicereqID: consultant.servicereqID,
      serviceID: consultant.serviceID,
      service: consultant.serviceName,
      servicetype: consultant.serviceType,
      heading: consultant.heading,
      details: consultant.details,
      language: consultant.language.map((lang) => {
        const selectedLang = languages.find((item) => item.langID == lang);
        return selectedLang ? selectedLang.language : null;
      }),
      mobile: consultant.mobile,
      pincode: consultant.pincode,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.heading ||
      !formData.details ||
      !formData.language.length ||
      !formData.service ||
      !formData.servicetype ||
      !formData.mobile
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    const requestBody = {
      serviceName: formData.service,
      serviceType: formData.servicetype,
      heading: formData.heading,
      details: formData.details,
      mobile: formData.mobile,
      languages: formData.language
        .map((lang) => {
          const selectedLang = languages.find((l) => l.language === lang);
          return selectedLang ? selectedLang.langID : null;
        })
        .filter((id) => id !== null),
      referCode: formData.refercode || null,
      pincode: formData.pincode || null,
    };

    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/service-request",
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

      fetchServiceRequests();

      setFormData({
        service: "",
        heading: "",
        details: "",
        language: [],
        servicetype: "",
        pincode: "",
      });
      toast.success(result.message);
      setServiceRequestFrom(false);
    } catch (error) {
      console.error("Error adding advisor:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceTypeChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSelectedServiceType(value);
      const filterServices = allServices.filter(
        (service) => service.servicetype == value
      );
      setFilterServices(filterServices);
      setRequests([]);
    } else {
      setRequests(allRequests);
      setFilterServices([]);
      setSelectedServiceType("");
      setSelectedService("");
    }
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    if (value) {
      setRequests([]);
      setSelectedService(value);
    } else {
      setRequests([]);
      setSelectedService("");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filterRequests = (query, selectedService) => {
    const filteredRequests = allRequests.filter((request) => {
      const matchesService = selectedService
        ? request.serviceID == selectedService
        : true;

      const lowerCaseQuery = query.toLowerCase().trim();
      const matchesQuery =
        (request.serviceName &&
          request.serviceName.toLowerCase().includes(lowerCaseQuery)) ||
        (request.details &&
          request.details.toLowerCase().includes(lowerCaseQuery)) ||
        (request.heading &&
          request.heading.toLowerCase().includes(lowerCaseQuery));

      return matchesService && matchesQuery;
    });

    setRequests(filteredRequests);
  };

  useEffect(() => {
    filterRequests(searchQuery, selectedService);
  }, [searchQuery, selectedService]);

  const handleCall = async (mobile) => {
    setLoading(true);

    const agent = localUserData ? localUserData.user_data.mobile : null;
    try {
      const response = await fetch(
        "https://margda.in:7000/api/cloud_telephony/initiate_call_to_lead",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agent_number: Number(agent),
            destination_number: Number(mobile),
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Call initiated successfully.");
      } else {
        if (data.message && !data.message.startsWith("Web telephony")) {
          toast.error(data.message || "Failed to initiate call.");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (
      !editFormData.service ||
      !editFormData.servicetype ||
      !editFormData.heading ||
      !editFormData.details ||
      !editFormData.language.length ||
      !editFormData.mobile ||
      editFormData.mobile.length < 11
    ) {
      toast.warn("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    const requestBody = {
      servicereqID: editFormData.servicereqID,
      serviceName: editFormData.service,
      serviceType: editFormData.servicetype,
      heading: editFormData.heading,
      details: editFormData.details,
      languages: editFormData.language
        .map((lang) => {
          const selectedLang = languages.find((l) => l.language === lang);
          return selectedLang ? selectedLang.langID : null;
        })
        .filter((id) => id !== null),
      mobile: editFormData.mobile,
      pincode: editFormData.pincode,
    };

    try {
      const response = await fetch(
        `https://margda.in:7000/api/advisor/update-service-request`,
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
      await fetchServiceRequests();
      toast.success(result.message);

      setIsEditFormOpen(false);
    } catch (error) {
      console.error("Error updating advisor:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-9 bg-gray-30">
      {loading && <Loader />}
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Service Request
        </h2>
        <button
          onClick={() => setServiceRequestFrom(true)}
          className="h-12 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 w-full sm:w-auto mt-4 sm:mt-0"
        >
          Service Required
        </button>
      </div>
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center">
          <select
            value={selectedServiceType}
            onChange={handleServiceTypeChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <option value="">Service Type</option>
            {serviceTypes &&
              serviceTypes.length > 0 &&
              serviceTypes.map((service, index) => (
                <option value={service.servicetypeID} key={index}>
                  {service.servicetype}
                </option>
              ))}
          </select>
          {/* Service Dropdown */}
          <select
            value={selectedService}
            onChange={handleServiceChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <option value="">Service</option>
            {filterServices &&
              filterServices.length > 0 &&
              filterServices.map((service, index) => (
                <option value={service.serviceID} key={index}>
                  {service.service}
                </option>
              ))}
          </select>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          </div>
        </div>
      </div>

      {serviceRequestForm && (
        <div
          role="dialog"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
        >
          <div className="bg-white p-8 rounded-lg shadow-md mb-8  max-w-[60%]">
            <div className="font-semibold text-xl mb-5">Request A Service</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type
                    </label>
                    <select
                      name="servicetype"
                      value={formData.servicetype}
                      onChange={handleChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        New Service
                      </label>
                      <input
                        id="newService"
                        value={formData.service}
                        onChange={handleChange}
                        name="service"
                        placeholder="New Service"
                        className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        type="text"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option
                            key={service.serviceID}
                            value={service.service}
                          >
                            {service.service}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex items-center flex-row">
                    <label
                      htmlFor="newservicecheckbox"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Add New Service
                    </label>
                    <input
                      checked={addNewService}
                      onChange={() => setAddNewService(!addNewService)}
                      type="checkbox"
                      className="ml-1 mb-1"
                      name="newservicecheckbox"
                      id="newservicecheckbox"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pin Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Pin Code"
                    />
                  </div>
                </div>

                <div className="space-y-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsLanguagePopupOpen(!isLanguagePopupOpen)
                        }
                        className="w-full p-1.5 border border-gray-300 rounded-md text-left bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
                      >
                        {formData.language.length > 0
                          ? formData.language.join(", ")
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
                      value={formData.details}
                      onChange={handleChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Service Details"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="heading"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Heading
                    </label>
                    <input
                      type="text"
                      id="heading"
                      name="heading"
                      value={formData.heading}
                      onChange={handleChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Service Heading"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 items-center"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <button
                  onClick={() => setServiceRequestFrom(false)}
                  className="px-4 ml-2 py-1.5 bg-gray-400 text-white rounded-md hover:bg-gray-700 transition duration-300 items-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
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
                value={searchLanguageQuery}
                onChange={(e) => setSearchLanguageQuery(e.target.value)}
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

      {requests.length > 0 && (
        <div className="mt-8">
          <table className="min-w-full bg-white border border-gray-200 mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Actions
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Service
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Heading
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Details
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Languages
                </th>
                <th className="py-4 px-6 border-b text-left text-lg font-medium text-gray-700">
                  Call
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((consultant, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-6 px-6 border-b">
                    {consultant.euser == loginUserID || loginUserID == 1 ? (
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                          onClick={() => handleShowEditForm(consultant)}
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                          //   onClick={() => handleShowEditForm(consultant)}
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-black-500">
                        Actions not available
                      </div>
                    )}
                  </td>
                  <td className="py-6 px-6 border-b">
                    <div className="text-sm text-black-500">
                      {consultant.serviceName}
                    </div>
                  </td>
                  <td className="py-6 px-6 border-b">
                    <div className="text-sm text-black-600">
                      {consultant.heading}
                    </div>
                  </td>
                  <td className="py-6 px-6 border-b">
                    <div className="text-sm text-black-600">
                      {consultant.details}
                    </div>
                  </td>

                  <td className="py-6 px-6 border-b">
                    <div>
                      <div className="text-lg text-gray-700 flex flex-row">
                        {consultant.language
                          .map(
                            (lang) =>
                              languages.find((item) => item.langID === lang)
                                ?.language
                          )
                          .filter(Boolean) // Removes undefined values
                          .join(", ")}
                      </div>
                    </div>
                  </td>

                  <td className="py-6 px-6 border-b">
                    <button
                      onClick={() => handleCall(consultant.mobile)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                    >
                      <FaPhone className="mr-2" /> Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                value={searchLanguageQuery}
                onChange={(e) => setSearchLanguageQuery(e.target.value)}
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
                      Service Type
                    </label>
                    <select
                      name="servicetype"
                      value={editFormData.servicetype}
                      onChange={handleEditChange}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select a service type</option>
                      {serviceTypes.map((service, index) => (
                        <option key={index} value={service.servicetypeID}>
                          {service.servicetype}
                        </option>
                      ))}
                    </select>
                  </div>

                  {addNewServiceInEdit ? (
                    <div>
                      <label
                        htmlFor="newServiceInEdit"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        New Service
                      </label>
                      <input
                        id="newServiceInEdit"
                        value={editFormData.service}
                        onChange={handleEditChange}
                        name="service"
                        placeholder="New Service"
                        className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        type="text"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service
                      </label>
                      <select
                        name="service"
                        value={editFormData.service}
                        onChange={handleEditChange}
                        className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select a service</option>
                        {editServices.map((service) => (
                          <option
                            key={service.serviceID}
                            value={service.service}
                          >
                            {service.service}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex items-center flex-row">
                    <label
                      htmlFor="newservicecheckboxinedit"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Add New Service
                    </label>
                    <input
                      checked={addNewServiceInEdit}
                      onChange={() =>
                        setAddNewServiceInEdit(!addNewServiceInEdit)
                      }
                      type="checkbox"
                      className="ml-1 mb-1"
                      name="newservicecheckboxinedit"
                      id="newservicecheckboxinedit"
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

export default ServiceRequest;
