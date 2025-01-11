import React, { useEffect, useState } from "react";
import {
  FaFilter,
  FaSort,
  FaSearch,
  FaCheck,
  FaTimes,
  FaFire,
  FaChartLine,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import Logo from "../../assets/m.jpeg";
import { toast, ToastContainer } from "react-toastify";
import { LuLanguages } from "react-icons/lu";

const CounsellorsAP = () => {
  const [sortOption, setSortOption] = useState(null);
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [consultants, setConsultants] = useState([]);
  const [services, setServices] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [recharge, setRecharge] = useState("");

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowSortPopup(false);
    // Implement sorting logic here based on the selected option
  };

  useEffect(() => {
    fetchServices();
    fetchAdvisors();
    fetchLanguages();
    fetchRecharge();
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
      console.log("Services API Response:", result);

      if (response.ok) {
        setConsultants(result.Services);
        console.log(result.Services);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Failed to fetch services. Please try again later.");
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
        // Sort languages alphabetically
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
      console.log("Recharge API Response:", result);

      if (result.success) {
        setRecharge(result.Data.call_limit / 100);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching recharge info:", error);
      alert("Failed to recharge info. Please try again later.");
    }
  };

  // Fallback component for profile image
  const ProfileFallback = ({ name }) => {
    const firstLetter = name.charAt(0).toUpperCase();
    return (
      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
        {firstLetter}
      </div>
    );
  };

  const handleCall = async (mobile) => {
    if (!recharge) {
      return alert("Recharge to make a call");
    }

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
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Call initiated successfully.");
      } else {
        toast.error(data.message || "Failed to initiate call.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", error);
    }
  };

  const formatToAmPm = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <ToastContainer />
      {/* Talk-time Balance and Recharge Section */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-gray-700">
            Talk-time balance:{" "}
            <span className="text-blue-600">
              ₹{recharge == null ? "  No balance" : recharge}
            </span>
          </span>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Recharge
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0 min-w-[120px] bg-white shadow-sm hover:shadow-md transition-shadow">
          <option>Service</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0 min-w-[120px] bg-white shadow-sm hover:shadow-md transition-shadow">
          <option>Country</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0 min-w-[120px] bg-white shadow-sm hover:shadow-md transition-shadow">
          <option>State</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0 min-w-[120px] bg-white shadow-sm hover:shadow-md transition-shadow">
          <option>District</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0 min-w-[120px] bg-white shadow-sm hover:shadow-md transition-shadow">
          <option>Pin Code</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex-shrink-0 min-w-[80px] shadow-sm hover:shadow-md flex items-center justify-center gap-2">
          <FaFilter /> Filter
        </button>
        <button
          onClick={() => setShowSortPopup(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 flex-shrink-0 min-w-[80px] shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <FaSort /> Sort
        </button>
        <div className="relative flex-shrink-0 min-w-[200px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
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
      <div className="bg-yellow-100 p-4 rounded-lg mb-6 shadow-sm">
        <p className="text-sm text-yellow-800">
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
        {consultants.map((counsellor, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex gap-4 items-center">
              {/* Left Side: Profile Picture, Star Rating, and Orders */}
              <div className="flex flex-col items-center">
                {/* Profile Picture or Fallback */}
                {counsellor.avatar_url ? (
                  <img
                    src={counsellor.avatar_url}
                    alt={counsellor.avatar_url}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <ProfileFallback name={counsellor.heading} />
                )}
                <div>
                  <span className="mt-2 text-yellow-500 text-3xl">{"***"}</span>
                  <span className="mt-2 text-gray-500 text-3xl">{"**"}</span>
                </div>
              </div>

              {/* Right Side: Details and Checkmark */}
              <div className="flex-1">
                {/* Checkmark at Top Right */}
                <div className="flex flex-row justify-between">
                  <div className="text-xl text-gray-600">
                    {counsellor.avatar_name}
                  </div>
                  <div className="flex justify-end ">
                    {counsellor.live ? "🟢" : "🔴"}
                  </div>
                </div>
                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-800 ">
                  {counsellor.heading}
                </h3>
                <p className="text-sm text-gray-600 ">{counsellor.details}</p>
                <p className="text-sm text-gray-600 m">
                  {services
                    .filter((item) => item.serviceID == counsellor.serviceID)
                    .map((item) => (
                      <div key={item.serviceID}>{item.service}</div>
                    ))}
                </p>
                <p className="text-sm text-gray-600 m flex flex-row items-center">
                  <LuLanguages />
                  &nbsp;
                  {counsellor.language
                    .map((lang) =>
                      languages
                        .filter((item) => item.langID == lang)
                        .map((item) => item.language)
                    )
                    .flat()
                    .join(", ")}
                </p>

                <p className="text-sm text-gray-600 ">
                  <b> ₹ {counsellor.fee_pm}</b>/min
                </p>
                <p className="text-sm text-gray-600 flex flex-row items-center">
                  <span>
                    <IoTimeOutline />
                  </span>
                  &nbsp;
                  {formatToAmPm(counsellor.avail_time[0])} to{" "}
                  {formatToAmPm(counsellor.avail_time[1])}
                </p>
                {/* Star Rating */}
              </div>
            </div>

            {/* Call Button */}
            <button
              onClick={() => handleCall(counsellor.mobile)}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Call
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounsellorsAP;
