import React, { useEffect, useRef, useState } from "react";
import {
  FaFilter,
  FaSort,
  FaSearch,
  FaCheck,
  FaTimes,
  FaFire,
  FaChartLine,
  FaMoneyBillWave,
  FaPhone,
  FaStar,
  FaUserTie,
  FaArrowLeft,
  FaArrowRight,
  FaUpload,
  FaChevronDown,
} from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LuLanguages } from "react-icons/lu";
import "./RatingStars.css";
import StarRating from "../../Components/Consultant/StarRating";
import Loader from "../../Components/Loader";

const CounsellorsAP = () => {
  const [sortOption, setSortOption] = useState(null);
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [consultants, setConsultants] = useState([]);
  const [allConsultants, setAllConsultants] = useState([]);
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [languages, setLanguages] = useState([]);
  const [recharge, setRecharge] = useState("");
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [viewReviewOpen, setViewReviewOpen] = useState(false);
  const [selectedAdvisorReview, setSelectedAdvisorReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedBack, setFeedBack] = useState("");
  const [isComplaint, setIsComplaint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ip, setIP] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIP(data.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleMouseMove = (e, index) => {
    const { left, width } = e.target.getBoundingClientRect();
    const hoverValue = index + (e.clientX - left) / width;
    setHoverRating(parseFloat(hoverValue.toFixed(1)));
  };

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowSortPopup(false);
  };

  useEffect(() => {
    fetchServices();
    fetchServiceTypes();
    fetchAdvisors();
    fetchLanguages();
    fetchRecharge();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchAdvisors = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/get_all_advisors",
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
        advisors.map((advisor) => {
          advisor.reviewGived = false;
          if (advisor.ratings.length > 0) {
            let rating = 0;
            advisor.ratings.map((item) => {
              rating += Number(item.rating);
              if (item.euser == localUserData.user_data.userID) {
                advisor.reviewGived = true;
              }
            });
            advisor.ratingCount = rating / advisor.ratings.length;
          }
          if (advisor.callHistory.length > 0) {
            advisor.callCount = advisor.callHistory.length;
            let callDuartion = 0;
            advisor.callHistory.map((item) => {
              callDuartion += Number(item.duration);
            });
            advisor.callDuration = callDuartion;
          }
        });
        setConsultants(advisors);
        setAllConsultants(advisors);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const sortOptions = [
    { label: "Popularity", icon: <FaFire className="text-gray-500" /> },
    {
      label: "Experience : High to Low",
      icon: <FaChartLine className="text-gray-500" />,
    },
    {
      label: "Experience : Low to High",
      icon: <FaChartLine className="text-gray-500" />,
    },
    {
      label: "Total orders : High to Low",
      icon: <FaMoneyBillWave className="text-gray-500" />,
    },
    {
      label: "Total orders : Low to High",
      icon: <FaMoneyBillWave className="text-gray-500" />,
    },
    {
      label: "Price : High to Low",
      icon: <FaMoneyBillWave className="text-gray-500" />,
    },
    {
      label: "Price : Low to High",
      icon: <FaMoneyBillWave className="text-gray-500" />,
    },
    {
      label: "Rating : High to Low",
      icon: <FaStar className="text-gray-500" />,
    },
  ];

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

  const fetchRecharge = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/get_recharge_info",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return setRecharge(null);
        }
      }

      const result = await response.json();

      if (result.success) {
        setRecharge(result.Data.call_limit / 100);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching recharge info:", error);
    }
  };

  const ProfileFallback = ({ name }) => {
    const firstLetter = name.charAt(0).toUpperCase();
    return (
      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
        {firstLetter}
      </div>
    );
  };

  const handleCall = async (mobile, id) => {
    if (!recharge) {
      return toast.warn("Recharge to make a call");
    }
    setLoading(true);

    const agent = localUserData ? localUserData.user_data.mobile : null;
    try {
      const response = await fetch(
        "https://margda.in:7000/api/cloud_telephony/initiate_call",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agent_number: Number(agent),
            destination_number: Number(mobile),
            advisorID: id,
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

  const formatToAmPm = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  const handleReviewSubmit = async () => {
    if (!rating) {
      return toast.warn("Please Give Ratings");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/advisor/save-review",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            feedback: feedBack,
            rating,
            advisorID: selectedAdvisorReview.advisorID,
            complaint: isComplaint,
            loginIP: ip,
            name: localUserData.user_data.name,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setReviewFormOpen(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleServiceTypeChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSelectedServiceType(value);
      const filterServices = allServices.filter(
        (service) => service.servicetype == value
      );
      setServices(filterServices);
      setConsultants([]);
    } else {
      setSelectedService("");
      setSelectedServiceType("");
      setServices([]);
      setConsultants(allConsultants);
    }
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setSelectedService(value);
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filterConsultants = (query, selectedService) => {
    const filteredRequests = allConsultants.filter((consultant) => {
      // Ensure the request matches the selected service (if selected)
      const matchesService = selectedService
        ? consultant.serviceID == selectedService
        : true;

      // Check if query matches any relevant fields
      const lowerCaseQuery = query.toLowerCase().trim();
      const matchesQuery =
        (consultant.serviceName &&
          consultant.serviceName.toLowerCase().includes(lowerCaseQuery)) ||
        (consultant.details &&
          consultant.details.toLowerCase().includes(lowerCaseQuery)) ||
        (consultant.heading &&
          consultant.heading.toLowerCase().includes(lowerCaseQuery)) ||
        (consultant.avatar_name &&
          consultant.avatar_name.toLowerCase().includes(lowerCaseQuery));

      return matchesService && matchesQuery;
    });

    setConsultants(filteredRequests);
  };

  useEffect(() => {
    filterConsultants(searchQuery, selectedService);
  }, [searchQuery, selectedService]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(consultants.length / itemsPerPage);

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

  useEffect(() => {
    // This will run AFTER the component re-renders with the new currentPage
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="p-4 bg-gray-30">
      {loading && <Loader />}

      <div className="p-4 bg-gray-30 overflow-y-auto">
        {/* Talk-time Balance and Recharge Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <span className="text-lg font-medium text-gray-700 w-full sm:w-auto text-center sm:text-left">
                Talk-time balance:{" "}
                <span className="text-blue-600">
                  ₹{recharge == null ? "  No balance" : recharge}
                </span>
              </span>
              <Link to={"/online-payment"} className="w-full sm:w-auto">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto">
                  Recharge
                </button>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link
                to={"/service-request"}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 w-full sm:w-auto mt-4 sm:mt-0"
              >
                Service Required
              </Link>
              <Link
                to="/advisor"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 w-full sm:w-auto mt-4 sm:mt-0"
              >
                <FaUserTie className="text-lg" />
                <span>Be an Advisor</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center">
          {/* Service Type Dropdown */}
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
            {services &&
              services.length > 0 &&
              services.map((service, index) => (
                <option value={service.serviceID} key={index}>
                  {service.service}
                </option>
              ))}
          </select>

          {/* Sort Button */}
          <button
            onClick={() => setShowSortPopup(true)}
            className="bg-yellow-500 text-white px-5 py-3 rounded hover:bg-yellow-600 transition duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <FaSort /> Sort
          </button>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          </div>
        </div>
      </div>

      {/* Sort Popup */}
      {showSortPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Sort By</h2>
              <button
                onClick={() => setShowSortPopup(false)}
                className="text-gray-500 hover:text-gray-700 transition duration-300"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {sortOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSortOptionClick(option.label)}
                  className={`p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center rounded-md transition duration-200 ${
                    sortOption === option.label ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {option.icon}
                    <span className="text-gray-700">{option.label}</span>
                  </div>
                  {sortOption === option.label && (
                    <FaCheck className="text-blue-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer Section */}
      <div className="bg-gray-30 p-4 rounded-lg mb-6 shadow-sm">
        {/* Centered Link Button */}
        <div className="flex justify-center mb-4">
          <Link
            to=""
            className="flex items-center px-4 py-2 text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition duration-300"
          >
            <FaUserTie className="text-lg" />
            <span className="ml-2">Advisors' Network</span>
          </Link>
        </div>

        {/* Paragraph */}
        <p className="text-sm sm:text-lg lg:text-xl text-gray-800 leading-relaxed">
          The authenticity of the Advisors listed below has been verified;
          however, sharing your personal information, including your mobile
          number, WhatsApp, email address, or any OTP, is strictly prohibited.
          Additionally, you must not make any payments to the Advisors under any
          circumstances. Margdarshak will not be responsible for any financial
          transactions between you and the Advisors or for any other losses that
          may occur.
        </p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((counsellor, index) => (
            <div
              key={index}
              className="bg-white flex flex-col justify-between rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              style={{ height: "auto" }}
            >
              {/* Top Section: Profile and Details */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Profile Section */}
                <div className="flex flex-col items-center sm:items-start">
                  {counsellor.avatar_url ? (
                    <img
                      src={counsellor.avatar_url}
                      alt={counsellor.avatar_url}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                    />
                  ) : (
                    <ProfileFallback name={counsellor.heading} />
                  )}

                  {counsellor.ratings.length > 0 ? (
                    <div className="mt-2 text-center sm:text-left">
                      <StarRating rating={counsellor.ratingCount} />
                      <button
                        onClick={() => {
                          setViewReviewOpen(true);
                          setSelectedAdvisorReview(counsellor);
                        }}
                        className="underline text-sm text-blue-600"
                      >
                        Reviews
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">No reviews</p>
                  )}
                </div>

                {/* Details Section */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-medium text-gray-800">
                      {counsellor.avatar_name}
                    </h2>
                    <div>{counsellor.isDidWallet ? "🟢" : "🔴"}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    {counsellor.heading.length > 40 ? (
                      <>
                        {counsellor.heading.slice(0, 40)}{" "}
                        <span className="font-bold">...</span>
                      </>
                    ) : (
                      counsellor.heading
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {counsellor.details.length > 90 ? (
                      <>
                        {counsellor.details.slice(0, 90)}{" "}
                        <span className="font-bold">....read more</span>
                      </>
                    ) : (
                      counsellor.details
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {services
                      .filter((item) => item.serviceID == counsellor.serviceID)
                      .map((item) => (
                        <span key={item.serviceID}>{item.service}</span>
                      ))}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                    <LuLanguages className="mr-2" />
                    {counsellor.language
                      .map((lang) =>
                        languages
                          .filter((item) => item.langID == lang)
                          .map((item) => item.language)
                      )
                      .flat()
                      .join(", ")}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <b>₹ {counsellor.fee_pm}</b>/min
                  </p>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                    <IoTimeOutline className="mr-2" />
                    {formatToAmPm(counsellor.avail_time[0])} to{" "}
                    {formatToAmPm(counsellor.avail_time[1])}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Call Button and Talk Time */}
              <div className="mt-4">
                {counsellor.callHistory.length > 0 && (
                  <div className="text-sm text-gray-600 mb-2">
                    {counsellor.callCount} calls /{" "}
                    {Math.round(Number(counsellor.callDuration) / 60)} mins talk
                    time
                  </div>
                )}
                {counsellor.isCalled && (
                  <button
                    onClick={() => {
                      setReviewFormOpen(true);
                      setSelectedAdvisorReview(counsellor);
                    }}
                    className="underline mb-6"
                  >
                    {counsellor.reviewGived ? "Update Review" : "Give Review"}
                  </button>
                )}
                <button
                  onClick={() =>
                    handleCall(counsellor.mobile, counsellor.advisorID)
                  }
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  {counsellor.isDidWallet && <FaPhone className="mr-2" />} Call
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-xl font-bold">No Consultants Present</div>
        )}
        {reviewFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex flex-col space-x-2 bg-white p-16 rounded w-1/3 h-1/2">
              <div className="text-xl">
                Give Review to{" "}
                <span className="font-bold">
                  {selectedAdvisorReview.avatar_name}
                </span>{" "}
                . Your review is valuable for us.
              </div>
              <div className="flex flex-col">
                <textarea
                  value={feedBack}
                  onChange={(e) => setFeedBack(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="review"
                  placeholder="Your Feedback"
                  id="review"
                ></textarea>
              </div>
              <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="star-wrapper"
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRatingClick(hoverRating)}
                  >
                    <div
                      className="star"
                      style={{
                        width: `${
                          (rating > index ? Math.min(rating - index, 1) : 0) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                ))}

                <div>
                  Rating:{" "}
                  <span>
                    <input
                      type="number"
                      name="rating"
                      id="rating"
                      value={rating}
                      className="p-1 border border-gray-300 rounded focus:outline-none w-16"
                      onChange={(e) => {
                        if (e.target.value > 5 || e.target.value < 0) {
                          return;
                        }
                        setRating(e.target.value);
                      }}
                      style={{
                        MozAppearance: "textfield",
                        WebkitAppearance: "none",
                      }}
                    />
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="complaint" className="mr-2">
                  Complaint
                </label>
                <input
                  checked={isComplaint}
                  onChange={(e) => setIsComplaint(e.target.checked)}
                  type="checkbox"
                  name="complaint"
                  id="complaint"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={handleReviewSubmit}
                  className="px-6 w-1/3 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  Submit
                </button>
                <button
                  onClick={() => setReviewFormOpen(false)}
                  className="px-6 w-1/3 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {viewReviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex flex-col space-y-4 bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Reviews
              </h2>

              {/* Reviews Section */}
              <div className="space-y-4 overflow-y-auto max-h-64">
                {selectedAdvisorReview.ratings &&
                selectedAdvisorReview.ratings.length > 0 ? (
                  selectedAdvisorReview.ratings.map((rating, key) => (
                    <div
                      key={key}
                      className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-medium text-gray-700">
                          {rating.uname}
                        </span>
                        <StarRating rating={rating.rating} />
                      </div>
                      <p className="text-gray-600 text-sm">{rating.feedback}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews available.</p>
                )}
              </div>

              {/* Close Button */}
              <div>
                <button
                  onClick={() => setViewReviewOpen(false)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
        >
          <FaArrowLeft /> Previous
        </button>
        <span className="mx-4 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CounsellorsAP;
