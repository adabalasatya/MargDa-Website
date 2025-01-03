import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from '../../assets/m.jpeg';
import { FaPhone, FaTicketAlt } from 'react-icons/fa'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faPhone, faIndianRupeeSign, faUsers } from '@fortawesome/free-solid-svg-icons'; 
import RPSingh from '../../assets/RPSingh.jpg';
import Mani from '../../assets/manimala.jpg';

// Define header variants for animation
const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DownArrow = () => (
  <div className="flex justify-center my-8">
    <svg 
      className="w-8 h-8 text-gray-600 animate-bounce"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </div>
);

const UpArrow = () => (
  <div className="flex justify-center my-8">
    <svg 
      className="w-8 h-8 text-gray-600 animate-bounce"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </div>
);

const TeamSupport = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const supportCall = () => {
    console.log("Support call initiated");
  };

  const openSupportTicket = () => {
    navigate('/support-ticket'); // Navigate to the Support Ticket page
  };

  const handleCallClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`; // Initiate a call
  };

  const callWeb = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`; // Initiate a call
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header Section */}
      <motion.header
        className="bg-gray-50"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <motion.img
              src={Logo}
              alt="Logo"
              className="w-12 h-12 rounded-lg shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.h1
              className="text-3xl font-bold bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{
                background: "linear-gradient(to right, purple, blue, cyan, purple)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                MozBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Team Support
            </motion.h1>
          </div>
        </div>
      </motion.header>
<br />
      {/* Support Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Support Call */}
        <div className="flex flex-col items-center group">
          <div className="w-[360px] h-28 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-400 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-400 transition-all duration-300">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <motion.img
                src={Logo}
                alt="Support Call"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                whileHover={{ scale: 1.1, boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)" }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </div>
          <button
            onClick={supportCall}
            className="flex items-center bg-blue-900 text-white px-8 py-2 rounded-md hover:bg-purple-700 transition-colors mt-12 shadow-md hover:shadow-lg"
          >
            <FaPhone className="mr-2" /> Support Call
          </button>
        </div>
        {/* Support Ticket */}
        <div className="flex flex-col items-center group">
          <div className="w-[360px] h-28 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-400 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-400 transition-all duration-300">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <motion.img
                src={Logo}
                alt="Support Ticket"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                whileHover={{ scale: 1.1, boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)" }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </div>
          <button
            onClick={openSupportTicket}
            className="flex items-center bg-blue-900 text-white px-8 py-2 rounded-md hover:bg-purple-700 transition-colors mt-12 shadow-md hover:shadow-lg"
          >
            <FaTicketAlt className="mr-2" /> Support Ticket
          </button>
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Team Advisor", name: "Rani", phone: "+1234567890" },
            { title: "Team Leader", name: "Ankita B", phone: "+1234567890" },
            { title: "Team Mentor", name: "Admin", phone: "+1234567890" }
          ].map((member) => (
            <div key={member.title} className="flex flex-col items-center group">
              <div className="w-[360px] h-32 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-500 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-500 transition-all duration-300">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <motion.img
                    src={Logo}
                    alt={member.title}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                    whileHover={{ scale: 1.1, boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-12 text-gray-800">{member.title}</h3>
              <p className="text-gray-600">{member.name}</p>
              <button
                onClick={() => handleCallClick(member.phone)}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
              >
                <FaPhone className="mr-2" /> Click to Call
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Team Leaders */}
      <div className="space-y-8">
        {/* Up Arrow on top of Support Team */}
        <UpArrow />

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">My Support TEAM</h2>
          <div className="flex flex-col items-center group">
            <div className="w-[360px] h-32 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-500 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-500 transition-all duration-300">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <motion.img
                  src={RPSingh}
                  alt="RP Singh"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                  whileHover={{ scale: 1.1, boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-12 text-gray-800">RP Singh</h3>
          </div>
        </div>

        {/* Down Arrow below Support Team */}
        <DownArrow />

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">My Business TEAM</h2>
          <div className="flex flex-col items-center group">
            <div className="w-[360px] h-32 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-500 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-500 transition-all duration-300">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <motion.img
                  src={Mani}
                  alt="Manimala"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                  whileHover={{ scale: 1.1, boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-12 text-gray-800">Manimala</h3>
          </div>
        </div>

        {/* Social Icons Section */}
        <ul className="social flex justify-center space-x-6 mt-6">
          {/* Phone with Icon */}
          <li>
            <a
              onClick={() => callWeb(9289572711)}
              title="Click to call"
              className="flex items-center text-gray-700 hover:text-blue-500 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faPhone} className="text-xl mr-2" />
            </a>
          </li>

          {/* Indian Rupee Sign Icon */}
          <li>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors relative group"
            >
              <FontAwesomeIcon icon={faIndianRupeeSign} className="text-xl mr-2" />
              <span className="font-semibold">0</span>
              {/* Optional Tooltip */}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Current Balance
              </span>
            </a>
          </li>

          {/* Users with Icon and Badge */}
          <li>
            <a
              href="https://margdarshak.org/team-support/4584"
              className="flex items-center text-gray-700 hover:text-purple-500 transition-colors relative"
            >
              <FontAwesomeIcon icon={faUsers} className="text-xl mr-2" />
              <span>Users</span>
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs rounded-full px-2">
                3
              </span>
            </a>
          </li>
        </ul>
      </div>

      <footer className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
            {/* Left Section */}
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                <a
                  href="https://www.margdarshak.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                >
                  <strong>Margdarshak</strong>
                </a>{' '}
                &copy; {new Date().getFullYear()}
              </p>
            </div>

            {/* Right Section */}
            <div>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-500 transition-colors"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-500 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-500 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-500 transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeamSupport;