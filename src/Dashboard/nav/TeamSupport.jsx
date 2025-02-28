import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../../assets/m.jpeg";
import { FaPhone, FaTicketAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faIndianRupeeSign,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import RPSingh from "../../assets/RPSingh.jpg";
import Mani from "../../assets/manimala.jpg";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

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
  const [loading, setLoading] = useState(false);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const [refered, setRefered] = useState([]);
  const [mentor, setMentor] = useState(null);
  const [associate, setAssociate] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    fetchTeamDeatils();
  }, []);

  const fetchTeamDeatils = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/user/team/team-details",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.Refered && data.Refered.length > 0) {
          setRefered(data.Refered);
        }
        if (data.mentor) {
          setMentor(data.mentor);
        }
        if (data.associate) {
          setAssociate(data.associate);
        }
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const supportCall = () => {
    console.log("Support call initiated");
  };

  const openSupportTicket = () => {
    navigate("/support-ticket"); // Navigate to the Support Ticket page
  };

  const handleCallClick = async (phoneNumber) => {
    if (phoneNumber) {
      setLoading(true);
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
              agent_number: localUserData.user_data.mobile,
              destination_number: phoneNumber,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message || "Call initiated successfully.");
        } else {
          toast.error(data.message || "Failed to initiate call.");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error);
        setLoading(false);
      }
    } else {
      toast.error("This team member hadn't added mobile number yet");
    }
  };

  const callWeb = (phoneNumber) => {
    // window.location.href = `tel:${phoneNumber}`; // Initiate a call
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header Section */}
      {loading && <Loader />}
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
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)",
              }}
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
                background:
                  "linear-gradient(to right, purple, blue, cyan, purple)",
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
                src="https://www.margda.com/assets/support.jpg"
                alt="Support Call"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </div>
          <button
            onClick={() => handleCallClick("7965174000")}
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
                src="https://www.margda.com/assets/support-ticket.jpeg"
                alt="Support Ticket"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)",
                }}
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
        <div className="flex flex-row justify-around px-6 items-center">
          {associate ? (
            <div className="flex flex-col items-center group ">
              <div className="w-[360px] h-32 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-500 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-500 transition-all duration-300">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <motion.img
                    src={associate.pic_url}
                    alt={associate.name}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-12 text-gray-800">
                Associate
              </h3>
              <p className="text-gray-600">{associate.name}</p>
              <button
                onClick={() => handleCallClick(associate.mobile)}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
              >
                <FaPhone className="mr-2" /> Click to Call
              </button>
            </div>
          ) : (
            <div className="text-xl">You don't have associate</div>
          )}
          {mentor ? (
            <div className="flex flex-col items-center group ">
              <div className="w-[360px] h-32 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-500 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-500 transition-all duration-300">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <motion.img
                    src={mentor.pic_url}
                    alt={mentor.name}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-12 text-gray-800">
                Mentor
              </h3>
              <p className="text-gray-600">{mentor.name}</p>
              <button
                onClick={() => handleCallClick(mentor.mobile)}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
              >
                <FaPhone className="mr-2" /> Click to Call
              </button>
            </div>
          ) : (
            <div className="text-xl font-semibold">You don't have mentor</div>
          )}
        </div>
      </div>

      {/* Team Leaders */}
      <div className="space-y-8">
        {/* Up Arrow on top of Support Team */}
        <UpArrow />

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            My Support TEAM
          </h2>
          <div className="flex flex-col items-center group">
            <div className="w-[360px] h-32 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-500 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-500 transition-all duration-300">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <motion.img
                  src={localUserData.user_data.pic_url}
                  alt={localUserData.user_data.name}
                  className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-12 text-gray-800">
              {localUserData.user_data.name}
            </h3>
          </div>
        </div>

        {/* Down Arrow below Support Team */}
        <DownArrow />

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            My Business TEAM
          </h2>

          {refered.length > 0 ? (
            <div className="flex flex-row flex-wrap w-full gap-3">
              {refered.map((item, index) => (
                <div
                  className="flex flex-col items-center group mb-9"
                  key={index}
                >
                  <div className="w-[360px] h-32 bg-[#183258] rounded-b-full relative mb-4 shadow-lg group-hover:bg-sky-500 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-sky-500 transition-all duration-300">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <motion.img
                        src={
                          item.pic_url
                            ? item.pic_url
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4uQmq5l06DIuhNUDihsvATgceMTbyKNBzT4Rharp2hacekLEJHq9eaKF1LPaT9_iRpA&usqp=CAU"
                        }
                        alt={item.name}
                        className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0px 10px 15px rgba(255, 0, 0, 0.3)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mt-12 text-gray-800">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => handleCallClick(item.mobile)}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    <FaPhone className="mr-2" /> Click to Call
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>You didn't refer any advisor yet.</div>
          )}
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
              <FontAwesomeIcon
                icon={faIndianRupeeSign}
                className="text-xl mr-2"
              />
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
                </a>{" "}
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
