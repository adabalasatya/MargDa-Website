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
import Logo from "../../assets/m.jpeg";

const CounsellorsAP = () => {
  const [sortOption, setSortOption] = useState(null);
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [consultants, setConsultants] = useState([]);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowSortPopup(false);
    // Implement sorting logic here based on the selected option
  };

  useEffect(() => {
    fetchAdvisors();
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

  // Example data for counsellors
  // const counsellors = [
  //   {
  //     name: 'Aumodaya',
  //     expertise: 'Vedic, Prashana, Palmistry',
  //     languages: 'English, Hindi',
  //     experience: '4 Years',
  //     orders: '1000 orders',
  //     responseTime: '18min',
  //     rating: '★★★★★',
  //     image: '', // Placeholder image URL
  //   },
  //   {
  //     name: 'Maaran',
  //     expertise: 'Vedic, Numerology',
  //     languages: 'English, Hindi, Tamil',
  //     experience: '3 Years',
  //     orders: '5218 orders',
  //     responseTime: '18min',
  //     rating: '★★★★★',
  //     image: '', // Placeholder image URL
  //   },
  //   {
  //     name: 'Yugandina',
  //     expertise: 'Numerology, Tarot, Palmistry',
  //     languages: 'English, Hindi, Marathi',
  //     experience: '3 Years',
  //     orders: '714 orders',
  //     responseTime: '18min',
  //     rating: '★★★★★',
  //     image: '', // No image provided
  //   },
  //   {
  //     name: 'Jhanvi',
  //     expertise: 'Numerology, Tarot',
  //     languages: 'English, Hindi',
  //     experience: '5 Years',
  //     orders: '582 orders',
  //     responseTime: '23min',
  //     rating: '★★★★★',
  //     image: '', // Placeholder image URL
  //   },
  //   {
  //     name: 'Nirman',
  //     expertise: 'Vedic',
  //     languages: 'English, Hindi, Telugu',
  //     experience: '3 Years',
  //     orders: '2698 orders',
  //     responseTime: '23min',
  //     rating: '★★★★★',
  //     image: '', // No image provided
  //   },
  //   {
  //     name: 'Sanchukta',
  //     expertise: 'Tarot, Psychic, Life Coaching',
  //     languages: 'English, Hindi, Nepali',
  //     experience: '3 Years',
  //     orders: '1699 orders',
  //     responseTime: '21min',
  //     rating: '★★★★★',
  //     image: '', // Placeholder image URL
  //   },
  //   {
  //     name: 'Rudraaye',
  //     expertise: 'Tarot, Face Reading, Life Coaching',
  //     languages: 'English, Hindi, Punjabi',
  //     experience: '6 Years',
  //     orders: 'New',
  //     responseTime: '25min',
  //     rating: '★★★★★',
  //     image: '', // No image provided
  //   },
  //   {
  //     name: 'Harshyali',
  //     expertise: 'Vedic, Numerology, Tarot',
  //     languages: 'English, Hindi',
  //     experience: '10 Years',
  //     orders: '5257 orders',
  //     responseTime: '22min',
  //     rating: '★★★★★',
  //     image: '', // Placeholder image URL
  //   },
  //   {
  //     name: 'Neerad',
  //     expertise: 'Vedic, Numerology',
  //     languages: 'English, Hindi',
  //     experience: '27 Years',
  //     orders: '2737 orders',
  //     responseTime: '36min',
  //     rating: '★★★★★',
  //     image: '', // No image provided
  //   },
  //   // Add more counsellors as needed
  // ];

  // Fallback component for profile image
  const ProfileFallback = ({ name }) => {
    const firstLetter = name.charAt(0).toUpperCase();
    return (
      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
        {firstLetter}
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Talk-time Balance and Recharge Section */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-gray-700">
            Talk-time balance: <span className="text-blue-600">₹60</span>
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
            <div className="flex gap-4">
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
                {/* Star Rating */}
                <div className="mt-2 text-yellow-500 text-sm">
                  {counsellor.rating}
                </div>
                {/* Orders */}
                <div className="text-sm text-gray-600 mt-1">
                  {counsellor.orders}
                </div>
              </div>

              {/* Right Side: Details and Checkmark */}
              <div className="flex-1">
                {/* Checkmark at Top Right */}
                <div className="flex justify-end ">
                  <FaCheck className="text-yellow-500 w-5 h-5" />
                </div>
                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-800 ">
                  {counsellor.heading}
                </h3>
                {/* Expertise */}
                <p className="text-sm text-gray-600 ">{counsellor.expertise}</p>
                {/* Languages */}
                <p className="text-sm text-gray-600 ">{counsellor.languages}</p>
                {/* Experience */}

                <p className="text-sm text-gray-600 ">
                  Details: {counsellor.details}
                </p>
                <p className="text-sm text-gray-600 ">
                  Fees Per minute: {counsellor.fee_pm}
                </p>
                <p className="text-sm text-gray-600 ">
                  Avalable At:{" "}
                  {`${counsellor.avail_time[0]} to ${counsellor.avail_time[1]}`}
                </p>
              </div>
            </div>

            {/* Call Button */}
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Call
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounsellorsAP;
