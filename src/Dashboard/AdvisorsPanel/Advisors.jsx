import React from "react";
import {
  FaGraduationCap,
  FaHandshake,
  FaChartLine,
  FaHandHoldingUsd,
  FaBed,
  FaStethoscope,
  FaRing,
  FaCar,
  FaBalanceScale,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/margdarshakendra-logo.webp";

const Advisors = () => {
  const navigate = useNavigate();

  const services = {
    "Education and Career": [
      "Career counselling",
      "Admission to schools, universities",
      "Study abroad assistance",
      "Scholarships and bank loans",
      "Courses and certifications",
      "Tutoring and mentoring",
      "Exam preparation, etc.",
    ],
    "Work Exchange": [
      "Resume building and job planning",
      "Freelance and remote work opportunities",
      "Internship placement",
      "Skill development programs",
      "Job listings and database services",
      "Recruitment Process Outsourcing, etc.",
    ],
    "Business and Industry": [
      "Business Consulting",
      "Business project reports",
      "Funding and loan assistance",
      "Market research and feasibility studies",
      "Export-Import advice",
      "Start-up mentorship, etc.",
    ],
    "Finance and Insurance": [
      "Funding and loan assistance",
      "Insurance advice",
      "Medical insurance assistance",
      "Home loan and mortgage",
      "Payment and recovery agents, etc.",
    ],
    "Accommodation and Properties": [
      "Rental and property listings",
      "PG and hostel assistance",
      "Relocation support",
      "Interior designing and furnishing advice, etc.",
    ],
    "Health & Wellness": [
      "Online doctor consultations",
      "Mental health counselling",
      "Fitness and nutrition guidance",
      "Home healthcare services",
      "Yoga and meditation coaching",
      "Hospital attendants, etc.",
    ],
    "Matrimonial and Relationship": [
      "Matchmaking services",
      "Relationship counselling",
      "Friends for emotional support",
      "Wedding planning guidance, etc.",
    ],
    "Transportation and Delivery": [
      "Local and urgent Travel",
      "Tour packages and itinerary planning",
      "Flight and hotel booking",
      "Visa and passport services",
      "Adventure travel options",
      "On-road emergency service, etc.",
    ],
    "Legal Protection": [
      "Legal consultation",
      "Cybersecurity emergency",
      "Personal security solutions",
      "Consumer rights",
      "Business protection",
      "Identity theft prevention",
      "Legal and documentation, etc.",
    ],
    "Local Virtual Mart": [
      "Shopping through street vendors",
      "Grocery and essentials delivery",
      "Lowest rate offers, etc.",
    ],
  };

  const iconColors = {
    "Education and Career": "text-red-500",
    "Work Exchange": "text-green-500",
    "Business and Industry": "text-blue-500",
    "Finance and Insurance": "text-yellow-500",
    "Accommodation and Properties": "text-purple-500",
    "Health & Wellness": "text-pink-500",
    "Matrimonial and Relationship": "text-indigo-500",
    "Transportation and Delivery": "text-teal-500",
    "Legal Protection": "text-gray-500",
    "Local Virtual Mart": "text-orange-500",
  };

  return (
    <div className="font-sans p-4 sm:p-8 bg-white min-h-screen">
      {/* Logo */}
      <div className="flex justify-center sm:justify-start sm:ml-6 pb-4 sm:pb-6">
        <img
          src={Logo}
          alt="Margdarshak Logo"
          className="w-32 sm:w-48 h-8 sm:h-12"
        />
      </div>

      {/* Advisors Network Section */}
      <section className="mb-8 sm:mb-16 animate-fade-in">
        {/* Header with Button */}
        <div className="flex flex-col p-2 sm:p-4 md:flex-row justify-between items-start md:items-center mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-0 flex items-center">
            <FaUsers className="mr-2" />
            Advisors Network
          </h2>
          <button
            className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-md text-sm sm:text-base"
            onClick={() => navigate("/teleconsultant")}
          >
            <span>Add Your Service</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-8">
          Work and earn from anywhere, anytime using your mobile or laptop,
          without disturbing your current activities.
        </p>

        {/* Income Models */}
        <div className="space-y-6 sm:space-y-12">
          {/* Daily Instant Income */}
          <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2 sm:mb-4">
              A. Work for Daily Instant Income
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
              <li>
                You earn by talking and guiding people on the phone. You can
                provide consultation and solutions based on your knowledge and
                expertise.
              </li>
              <li>
                You can get data from Margdarshak Workplace and invite people
                for a virtual meeting to understand the opportunity and assist
                them in onboarding on the Margdarshak platform.
              </li>
            </ul>
          </div>

          {/* Lifelong Fixed Income */}
          <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-2 sm:mb-4">
              B. Work for Lifelong Fixed Income
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
              <li>
                You will receive a Data Share Certificate of Margdarshak once
                you have verified the credentials of a maximum of one thousand
                Advisors. Now, you are eligible for a lifetime income with
                almost a one-time effort.
              </li>
            </ul>
          </div>

          {/* Monthly Big Income */}
          <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-2 sm:mb-4">
              C. Work for a Monthly Big Income
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
              <li>
                You can give presentations on Margdarshak's Digital Workplace to
                businesses, explaining how it automates processes, enhances
                productivity, and increases profitability.
              </li>
              <li>
                To share the fortune we have created, you can get a franchise of
                a pin code, district, or state. A pin code franchisee has to
                build and manage a team of 9 Associates, a district franchisee
                has to develop a franchise in all the district's pin codes, and
                a state franchise has to give franchise rights to all the
                districts.
              </li>
            </ul>
          </div>

          {/* Income Breakdown Section */}
          <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
              Accordingly, you can create a stable source of income as
              illustrated below:
            </h3>

            {/* Daily Instant Income Breakdown */}
            <div className="mb-4 sm:mb-8">
              <h4 className="text-base sm:text-lg font-semibold text-blue-600 mb-2 sm:mb-4">
                A. Daily Instant Income
              </h4>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
                <li>
                  (a) You can start earning instantly by offering tele-guidance
                  @per-minute talk time. You share 50% of the fee.
                </li>
                <li>
                  (b) Additionally, you earn ₹20 per attendee of a virtual
                  meeting invited by you + 10% of the fee. You also get @₹1 per
                  minute of the total talk time of all the Advisors onboarded by
                  you.
                </li>
              </ul>
              <div className="mt-2 sm:mt-4 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Work
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Average
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Rate
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Income
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        Tele guidance
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        Talk time 100 minutes @₹5.00 per minute
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        50% of the quoted amount ₹2.50 per minute
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹250
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        Meeting invite
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        10 persons
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹20 per person
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹200
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        Average 25 recharge
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹25 x 200 = ₹5,000
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        @10%
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹500
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td
                        className="border border-gray-300 p-1 sm:p-2 font-semibold pl-32 sm:pl-64"
                        colSpan="3"
                      >
                        Total expected Daily income
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2 font-semibold">
                        ₹950 per day
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td
                        className="border border-gray-300 p-1 sm:p-2 font-semibold pl-32 sm:pl-64"
                        colSpan="3"
                      >
                        Total expected Monthly income
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2 font-semibold">
                        ₹28,500 p.m
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lifelong Fixed Income Breakdown */}
            <div className="mb-4 sm:mb-8">
              <h4 className="text-base sm:text-lg font-semibold text-green-600 mb-2 sm:mb-4">
                B. Lifelong Fixed Income
              </h4>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
                <li>
                  (c) As per the terms of the Data Share Certificate, you will
                  receive a lifelong income through data magnetisation at ₹1
                  multiplied by the total number of Advisors that you and your
                  team of Associates have verified.
                </li>
              </ul>
              <div className="mt-2 sm:mt-4 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-1 sm:p-2">
                        DSC holders
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Total Data
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Amount per month
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">You</td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        1,000
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹1,000 p.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        9 Associates
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        9,000
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹9,000 p.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        40% Active Associates
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        32,000
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹32,000 p.m.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-1 sm:p-2 font-semibold">
                        Total Expected Lifelong Income
                      </td>
                      <td
                        className="border border-gray-300 p-1 sm:p-2"
                        colSpan="2"
                      >
                        ₹42,000 per month
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monthly Big Income Breakdown */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-purple-600 mb-2 sm:mb-4">
                C. Monthly Big Income
              </h4>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
                <li>
                  (d) You can earn @10% of the total business generated through
                  your team’s Associates from Workplace subscriptions.
                </li>
                <li>
                  (e) You’ll get 5% of the total business from all sources of
                  the pin code area, 3% of the district, and 2% of the state.
                </li>
              </ul>
              <div className="mt-2 sm:mt-4 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Business through
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Average Workplace subscription
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Your share
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2">
                        Expected Income
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        Self
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹2,700 x 20 users = ₹54,000
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        @10%
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹5,400 per month
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        Team Associates
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹54,000 x 15 = ₹8,10,000
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        @10%
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹81,000 per month
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        Pin code
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹8,10,000 x 10 = ₹81,00,000
                      </td>
                      <td className="border border-gray-300 p-1 sm:p-2">@5%</td>
                      <td className="border border-gray-300 p-1 sm:p-2">
                        ₹4,05,000 per month
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Margdarshak Advisors’ Panel Section */}
      <section className="mb-8 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-center sm:text-left animate-fade-in">
          Margdarshak Advisors’ Panel
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-8 text-center sm:text-left">
          To start instant earnings right now, click{" "}
          <button
            className="text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md px-2 mt-1 cursor-pointer text-xs sm:text-sm"
            onClick={() => navigate("/teleconsultant")}
          >
            Add Your Service
          </button>{" "}
          and update the services you can offer along with the per-minute rate
          you want from clients. You can create multiple profiles for various
          services. The prerequisite for providing tele-guidance is the
          integration of web-telephony, which is a paid third-party service.
          Below are examples of some of the services available:
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {Object.entries(services).map(([service, details]) => (
            <div
              key={service}
              className="bg-white p-3 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:scale-105 animate-fade-in-up"
            >
              {/* Left-aligned header */}
              <h3 className="text-lg sm:text-xl font-semibold flex items-center">
                {React.createElement(
                  {
                    "Education and Career": FaGraduationCap,
                    "Work Exchange": FaHandshake,
                    "Business and Industry": FaChartLine,
                    "Finance and Insurance": FaHandHoldingUsd,
                    "Accommodation and Properties": FaBed,
                    "Health & Wellness": FaStethoscope,
                    "Matrimonial and Relationship": FaRing,
                    "Transportation and Delivery": FaCar,
                    "Legal Protection": FaBalanceScale,
                    "Local Virtual Mart": FaShoppingCart,
                  }[service],
                  { className: `mr-2 ${iconColors[service]}` }
                )}
                <span>{service}</span>
              </h3>
              {/* Left-aligned list */}
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 mt-2 sm:mt-4">
                {details.map((detail, index) => (
                  <li key={index} className="mb-1 sm:mb-2">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Add your Service Button with Arrows */}
      <div className="flex justify-center sm:justify-end items-center mb-8 sm:mb-16 animate-fade-in">
        <button
          className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-md text-sm sm:text-base"
          onClick={() => navigate("/teleconsultant")}
        >
          <span>Add Your Service</span>
        </button>
      </div>

      {/* Enhanced Footer */}
      <footer className="mt-8 sm:mt-16 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto border-t border-gray-200 pt-4 sm:pt-8">
          <p className="text-xs sm:text-sm text-gray-500">
            &copy; 2025 Margdarshak Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Advisors;
