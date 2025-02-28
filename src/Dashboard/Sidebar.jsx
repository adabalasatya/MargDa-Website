import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaBuilding,
  FaVideo,
  FaPhone,
  FaSms,
  FaEnvelope,
  FaChartBar,
  FaUsers,
  FaComments,
  FaTasks,
  FaUserTie,
  FaEdit,
  Fa500Px,
  FaAdversal,
  FaLightbulb,
  FaBookReader,
  FaUserGraduate,
  FaUniversity,
  FaSchool,
} from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdSchool, MdFindInPage, MdArrowForward } from "react-icons/md";
import { FaDatabase, FaUser } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import Logo from "../assets/margdarshakendra-logo.webp";
import { toast } from "react-toastify";

const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [wallet, setWallet] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [links, setLinks] = useState([]);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const loginUserID = localUserData ? localUserData.user_data.userID : null;
  const navigate = useNavigate();
  if (
    !localUserData ||
    !localUserData.user_data ||
    !localUserData.user_data.pic_url ||
    !localUserData.user_data.country_code
  ) {
    navigate("/profile");
  }

  const [isReportMenuOpen, setReportMenuOpen] = useState(false);
  const [isCareerMenuOpen, setCareerMenuOpen] = useState(false);
  const [isAdvisorMenuOpen, setAdvisorMenuOpen] = useState(false);
  const [isTemplateMenuOpen, setTemplateMenuOpen] = useState(false);
  const [isCareerAwarenessMenuOpen, setCareerAwarenessMenuOpen] =
    useState(false);
  const [isInstituteMenuOpen, setIsInstituteMenuOpen] = useState(false);
  const [isSkillMCQMenuOpen, setIsSkillMCQMenuOpen] = useState(false);
  const [isStudyMenuOpen, setStudyMenuOpen] = useState(false);
  const [isCPPTrainingMenuOpen, setIsCPPTrainingMenuOpen] = useState(false);
  const [isBusinessMenuOpen, setBusinessMenuOpen] = useState(false);

  const toggleBusinessMenu = (e) => {
    e.stopPropagation();
    setBusinessMenuOpen(!isBusinessMenuOpen);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await fetch(
        "https://margda.in:7000/api/user/get-links",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        const links = result.data;
        setLinks(links);
      } else {
        setLinks([]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleInstituteMenu = () => {
    setIsInstituteMenuOpen(!isInstituteMenuOpen);
  };

  const toggleCPPTrainingMenu = () => {
    setIsCPPTrainingMenuOpen(!isCPPTrainingMenuOpen);
  };

  const toggleCareerAwarenessMenu = (e) => {
    e.stopPropagation();
    setCareerAwarenessMenuOpen(!isCareerAwarenessMenuOpen);
  };

  const toggleStudyMenu = (e) => {
    e.stopPropagation();
    setStudyMenuOpen(!isStudyMenuOpen);
  };

  const toggleSkillMCQMenu = (e) => {
    e.stopPropagation();
    setIsSkillMCQMenuOpen(!isSkillMCQMenuOpen);
  };

  const toggleReportMenu = (e) => {
    e.stopPropagation();
    setReportMenuOpen(!isReportMenuOpen);
  };

  const toggleCareerMenu = (e) => {
    e.stopPropagation();
    setCareerMenuOpen(!isCareerMenuOpen);
  };

  const toggleAdvisorMenu = (e) => {
    e.stopPropagation();
    setAdvisorMenuOpen(!isAdvisorMenuOpen);
  };

  const toggleTemplateMenu = (e) => {
    e.stopPropagation();
    setTemplateMenuOpen(!isTemplateMenuOpen);
  };

  useEffect(() => {
    fetch_wallet_info();
  }, []);

  const fetch_wallet_info = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/user_account/wallet",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setWallet("0.00");
        } else if (response.status === 401) {
          navigate("/login");
        }
      }

      const result = await response.json();

      if (result.success) {
        setWallet(result.Data.balance / 100);
      }
    } catch (error) {
      console.error("Error fetching wallet info:", error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest("aside")) {
        setReportMenuOpen(false);
        setAdvisorMenuOpen(false);
        setTemplateMenuOpen(false);
        setCareerAwarenessMenuOpen(false);
        setCareerMenuOpen(false);
        setStudyMenuOpen(false);
        setIsSkillMCQMenuOpen(false);
        setIsInstituteMenuOpen(false);
        setBusinessMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleWithdrawClick = () => {
    alert("Your account is not activated or linked to a bank account.");
  };

  // Add this state declaration with the other useState hooks at the top of the Sidebar component
const [isWorkSeekerMenuOpen, setIsWorkSeekerMenuOpen] = useState(false);

// Add this toggle function with the other toggle functions
const toggleWorkSeekerMenu = (e) => {
  e.stopPropagation();
  setIsWorkSeekerMenuOpen(!isWorkSeekerMenuOpen);
};


  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`relative z-2 ${isMobile ? "fixed inset-y-0 left-0" : ""}`}
      >
        <aside
          className={` text-gray-900 transition-all duration-300 ease-in-out h-screen ${
            isOpen ? "w-64" : "w-20"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo Section */}
          <div className="bg-white p-4 flex items-center border-b border-gray-200 shadow-sm">
            {isOpen && (
              <div className="flex items-center space-x-2">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-32 h-8 object-contain"
                />
              </div>
            )}
            <button
              className={`${
                isOpen ? "ml-auto" : "mx-auto"
              } bg-white text-gray-900 p-2 rounded-full shadow hover:bg-orange-500 hover:text-white focus:outline-none transition-all duration-300`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="p-1 space-y-4 overflow-y-auto max-h-[calc(100vh-64px)]">
            {/* Workplace Button */}
            <div className="bg-white rounded-lg shadow-md">
              <Link
                to="/data"
                onClick={handleLinkClick}
                className={`flex items-center px-4 py-3 text-lg font-medium rounded-lg text-black-700 hover:bg-orange-500 ${
                  !isOpen ? "justify-center" : ""
                }`}
              >
                <FaBuilding className="text-lg" />
                {isOpen && <span className="ml-4">Workplace</span>}
              </Link>
            </div>

            {/* Stats Card */}
            {isOpen && (
              <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💬</span>
                  <span className="font-semibold">Messages: 0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💼</span>
                  <span className="font-semibold">Business: ₹0.00</span>
                </div>
                <div className="flex items-center space-x-2 relative">
                  <span className="text-lg">💰</span>
                  <span className="font-semibold">Wallet: ₹{wallet}</span>
                  <span
                    className="cursor-pointer"
                    onMouseEnter={() => setShowMessage(true)}
                    onMouseLeave={() => setShowMessage(false)}
                    onClick={handleWithdrawClick}
                  >
                    <FcMoneyTransfer className="text-green-500 text-xl" />
                  </span>
                  {showMessage && (
                    <span className="absolute top-9 left-1/2 w-full transform -translate-x-1/2 mb-2 w-16 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg group-hover:block">
                      Withdraw, Your money only valid for one month.
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-lg">📊</span>
                  <span className="font-semibold">Account: ₹0.00</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💸</span>
                  <span className="font-semibold">Income: ₹0.00</span>
                </div>
              </div>
            )}
            
            {loginUserID == 1 ? (
              <>
                {/* Communication Card */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleReportMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        <FaComments />
                      </span>
                      {isOpen && (
                        <span className="font-semibold">Communication</span>
                      )}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isReportMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isReportMenuOpen && (
                    <div className="border-t border-gray-100">
                      {[
                        {
                          title: "Email Report",
                          icon: <FaEnvelope />,
                          link: "/email-report",
                        },
                        {
                          title: "WhatsApp Report",
                          icon: <FaWhatsapp />,
                          link: "/whatsapp-report",
                        },
                        {
                          title: "SMS Report",
                          icon: <FaSms />,
                          link: "/sms-report",
                        },
                        {
                          title: "Call Report",
                          icon: <FaPhone />,
                          link: "/call-report",
                        },
                        {
                          title: "Meeting Report",
                          icon: <FaVideo />,
                          link: "/meeting-report",
                        },
                        {
                          title: "Work Nodes",
                          icon: <FaTasks />,
                          link: "/my-work-report",
                        },
                        {
                          title: "Client Nodes",
                          icon: <FaChartBar />,
                          link: "/client-timeline",
                        },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          onClick={handleLinkClick}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-balck-600 hover:bg-orange-500 ${
                            !isOpen ? "justify-center" : ""
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          {isOpen && <span className="ml-2">{item.title}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>


                <div className="bg-white rounded-lg shadow-md">
               <div
                className={`p-4 flex items-center cursor-pointer ${
              !isOpen ? "justify-center" : "justify-between"
              }`}
              onClick={toggleWorkSeekerMenu}
              >
             <div className="flex items-center space-x-2">
              <span className="text-lg">
               <FaUser />
            </span>
           {isOpen && <span className="font-semibold">Work-Seeker</span>}
             </div>
              {isOpen && (
           <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 transition-transform ${
          isWorkSeekerMenuOpen ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    )}
  </div>
  {isWorkSeekerMenuOpen && (
    <div className="border-t border-gray-100">
      {[
        { title: "User Work", icon: <FaTasks />, link: "/user-work" },
        { title: "User Experience", icon: <FaChartBar />, link: "/user-experience" },
        { title: "User Education", icon: <FaUniversity />, link: "/user-education" },
        { title: "User Skills", icon: <FaLightbulb />, link: "/user-skills" },
        { title: "User Reference", icon: <FaUserTie />, link: "/user-reference" },
      ].map((item, index) => (
        <Link
          key={index}
          to={item.link}
          onClick={handleLinkClick}
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
            !isOpen ? "justify-center" : ""
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          {isOpen && <span className="ml-2">{item.title}</span>}
        </Link>
      ))}
           </div>
           )}
          </div>

                {/* New Study Section */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleStudyMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        <MdSchool />
                      </span>
                      {isOpen && <span className="font-semibold">Study</span>}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isStudyMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isStudyMenuOpen && (
                    <div className="border-t border-gray-100">
                      {[
                        {
                          title: "Study Course",
                          icon: <MdArrowForward />,
                          link: "/study-course",
                        },
                        {
                          title: "Study Lesson",
                          icon: <MdArrowForward />,
                          link: "/study-lesson",
                        },

                        {
                          title: "Study Aca",
                          icon: <MdArrowForward />,
                          link: "/study-aca",
                        },
                        {
                          title: "Study Mcq",
                          icon: <MdArrowForward />,
                          link: "/study-mcq",
                        },
                        {
                          title: "Mcq Results",
                          icon: <MdArrowForward />,
                          link: "/mcq-results",
                        },
                        {
                          title: "Trainee Dashboard",
                          icon: <FaUser />,
                          link: "/trainee-dashboard",
                        },

                        {
                          title: "Study Content",
                          icon: <MdArrowForward />,
                          link: "/study-content",
                        },
                        {
                          title: "Study Video",
                          icon: <MdArrowForward />,
                          link: "/study-video",
                        },
                        {
                          title: "Study Activity",
                          icon: <MdArrowForward />,
                          link: "/study-activity",
                        },
                        {
                          title: "Study Practical",
                          icon: <MdArrowForward />,
                          link: "/study-practical",
                        },
                        {
                          title: "Teacher Dashboard",
                          icon: <MdArrowForward />,
                          link: "/teacher-dashboard",
                        },
                        {
                          title: "Teacher Schedule",
                          icon: <MdArrowForward />,
                          link: "/teacher-schedule",
                        },
                        {
                          title: "Study Organiser",
                          icon: <MdArrowForward />,
                          link: "/study-organiser",
                        },
                        {
                          title: "Study Writer",
                          icon: <MdArrowForward />,
                          link: "/study-writer",
                        },
                        {
                          title: "Progress Meter",
                          icon: <MdArrowForward />,
                          link: "/progress-meter",
                        },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          onClick={handleLinkClick}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                            !isOpen ? "justify-center" : ""
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          {isOpen && <span className="ml-2">{item.title}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Business Dropdown Menu */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleBusinessMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        <FaBuilding /> {/* Icon for Business */}
                      </span>
                      {isOpen && (
                        <span className="font-semibold">Business</span>
                      )}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isBusinessMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isBusinessMenuOpen && (
                    <div className="border-t border-gray-100">
                      {[
                        {
                          title: "Data Entry Form",
                          icon: <FaDatabase />,
                          link: "/business-data-entry",
                        },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          onClick={handleLinkClick}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                            !isOpen ? "justify-center" : ""
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          {isOpen && <span className="ml-2">{item.title}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* New Skill MCQ Section */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleSkillMCQMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        <MdFindInPage />
                      </span>
                      {isOpen && <span className="font-semibold">Skill</span>}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isSkillMCQMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isSkillMCQMenuOpen && (
                    <div className="border-t border-gray-100">
                      <Link
                        to=""
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                          !isOpen ? "justify-center" : ""
                        }`}
                      >
                        <span className="text-lg">
                          <MdArrowForward />
                        </span>
                        {isOpen && <span className="ml-2">Add Skill</span>}
                      </Link>

                      <Link
                        to="/skill-mcq"
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                          !isOpen ? "justify-center" : ""
                        }`}
                      >
                        <span className="text-lg">
                          <MdArrowForward />
                        </span>
                        {isOpen && <span className="ml-2">Skill MCQ</span>}
                      </Link>

                      <Link
                        to="/skill-test"
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                          !isOpen ? "justify-center" : ""
                        }`}
                      >
                        <span className="text-lg">
                          <MdArrowForward />
                        </span>
                        {isOpen && <span className="ml-2">Skill Test</span>}
                      </Link>
                      <Link
                        to=""
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                          !isOpen ? "justify-center" : ""
                        }`}
                      >
                        <span className="text-lg">
                          <MdArrowForward />
                        </span>
                        {isOpen && <span className="ml-2">Skill Report</span>}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Career Awareness */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleCareerAwarenessMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        <FaLightbulb />
                      </span>
                      {isOpen && (
                        <span className="font-semibold">Career Awareness</span>
                      )}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isCareerAwarenessMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isCareerAwarenessMenuOpen && (
                    <div className="border-t border-gray-100">
                      {[
                        {
                          title: "Subject-Career Pathway",
                          icon: <FaBookReader />,
                          link: "/subject-career-pathway",
                        },
                        {
                          title: "Career Choice",
                          icon: <FaUserGraduate />,
                          link: "/career-choice",
                        },
                        {
                          title: "Career Data",
                          icon: <FaDatabase />,
                          link: "/career-data",
                          restricted: true, // Marks restricted items
                        },
                      ]
                        .filter((item) => !item.restricted || loginUserID === 1) // Filter restricted items
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            <span className="text-lg">{item.icon}</span>
                            {isOpen && (
                              <span className="ml-2">{item.title}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* CPP Training */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleCPPTrainingMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        <FaBookReader />
                      </span>
                      {isOpen && (
                        <span className="font-semibold">CPP Training</span>
                      )}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isCPPTrainingMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isCPPTrainingMenuOpen && (
                    <div className="border-t border-gray-100">
                      <Link
                        to="/trainer-dashboard"
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                          !isOpen ? "justify-center" : ""
                        }`}
                      >
                        <span className="text-lg">
                          <FaUser />
                        </span>
                        {isOpen && (
                          <span className="ml-2">Trainer Dashboard</span>
                        )}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Institute Management */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleInstituteMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        <FaUniversity /> {/* Updated Icon */}
                      </span>
                      {isOpen && (
                        <span className="font-semibold">
                          Institute Management
                        </span>
                      )}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isInstituteMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isInstituteMenuOpen && (
                    <div className="border-t border-gray-100">
                      {[
                        {
                          title: "Institute-Higher",
                          icon: <FaSchool />, // Updated Icon
                          link: "/institute-higher",
                        },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          onClick={handleLinkClick}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                            !isOpen ? "justify-center" : ""
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          {isOpen && <span className="ml-2">{item.title}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Career Asssesment */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleCareerMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        <FaTasks />
                      </span>
                      {isOpen && (
                        <span className="font-semibold">Career Assessment</span>
                      )}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isCareerMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isCareerMenuOpen && (
                    <div className="border-t border-gray-100">
                      {[
                        {
                          title: "Aptitude Assessment",
                          icon: <FaChartBar />,
                          link: "/aptitude-assesment",
                        },
                        {
                          title: "Attitude Assessment",
                          icon: <FaAdversal />,
                          link: "/attitude-assesment",
                        },
                        {
                          title: "Ability Analyzer",
                          icon: <Fa500Px />,
                          link: "#",
                        },
                        {
                          title: "Career Map",
                          icon: <Fa500Px />,
                          link: "/user-dashboard",
                        },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          onClick={handleLinkClick}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-balck-600 hover:bg-orange-500 ${
                            !isOpen ? "justify-center" : ""
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          {isOpen && <span className="ml-2">{item.title}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Advisors Panel Button with Dropdown */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleAdvisorMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-lg" />
                      {isOpen && (
                        <span className="font-semibold">Advisors Panel</span>
                      )}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isAdvisorMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isAdvisorMenuOpen && (
                    <div className="border-t border-gray-100">
                      <Link
                        to="/advisor"
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                          !isOpen ? "justify-center" : ""
                        }`}
                      >
                        <FaUserTie className="text-lg" />
                        {isOpen && <span className="ml-2">Be an Advisor</span>}
                      </Link>

                      <Link
                        to="/advisors-team"
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                          !isOpen ? "justify-center" : ""
                        }`}
                      >
                        <FaUsers className="text-lg" />
                        {isOpen && <span className="ml-2">Advisors Team</span>}
                      </Link>

                      <Link
                        to="/all-advisors"
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                          !isOpen ? "justify-center" : ""
                        }`}
                      >
                        <FaUserTie className="text-lg" />
                        {isOpen && <span className="ml-2">All Advisors</span>}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Template Card */}
                <div className="bg-white rounded-lg shadow-md">
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                    onClick={toggleTemplateMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📄</span>
                      {isOpen && (
                        <span className="font-semibold">Template</span>
                      )}
                    </div>
                    {isOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transition-transform ${
                          isTemplateMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {isTemplateMenuOpen && (
                    <div className="border-t border-gray-100">
                      {[
                        {
                          title: "Templates List",
                          icon: "📋",
                          link: "/templates-list",
                        },
                        { title: "Footer", icon: "🦶", link: "/add-footer" },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          onClick={handleLinkClick}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-balck-600 hover:bg-orange-500 ${
                            !isOpen ? "justify-center" : ""
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          {isOpen && <span className="ml-2">{item.title}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    window.location.href = "/master-data";
                  }}
                  className={`cursor-pointer flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-orange-50 border-t border-gray-100 ${
                    !isOpen ? "justify-center" : ""
                  }`}
                >
                  <span className="text-lg">
                    <FaEdit /> {/* Edit Icon for Master Data */}
                  </span>
                  {isOpen && <span className="ml-4">{"Master Data"}</span>}
                </button>
                <button
                  onClick={() => {
                    window.location.href = "/cloudwhatsapp";
                  }}
                  className={`cursor-pointer flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-orange-50 border-t border-gray-100 ${
                    !isOpen ? "justify-center" : ""
                  }`}
                >
                  <span className="text-lg">
                    <FaWhatsapp />
                  </span>
                  {isOpen && <span className="ml-4">{"cloud whatsapp"}</span>}
                </button>
              </>
            ) : (
              <>
                {/* Communication Card */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find(
                      (link) => link.group_link == "Communication"
                    ) && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleReportMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <FaComments />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">Communication</span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isReportMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isReportMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter((link) => link.group_link == "Communication")
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* New Study Section */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find((link) => link.group_link == "Study") && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleStudyMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <MdSchool />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">Study</span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isStudyMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isStudyMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter((link) => link.group_link == "Study")
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* Business Dropdown Menu */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find((link) => link.group_link == "Business") && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleBusinessMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <FaBuilding />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">Business</span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isBusinessMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isBusinessMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter((link) => link.group_link == "Business")
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* New Skill MCQ Section */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find((link) => link.group_link == "Skill") && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleSkillMCQMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <MdFindInPage />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">Skill</span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isStudyMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isSkillMCQMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter((link) => link.group_link == "Skill")
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* Career Awareness */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find(
                      (link) => link.group_link == "Career Awareness"
                    ) && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleCareerAwarenessMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <FaLightbulb />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">
                              Career Awareness
                            </span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isCareerAwarenessMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isCareerAwarenessMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter((link) => link.group_link == "Career Awareness")
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* CPP Training */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find((link) => link.group_link == "CPP Training") && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleCPPTrainingMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <FaBookReader />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">CPP Training</span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isCPPTrainingMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isCPPTrainingMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter((link) => link.group_link == "CPP Training")
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* Institute Management */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find(
                      (link) => link.group_link == "Institute Management"
                    ) && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleInstituteMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <FaUniversity />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">
                              Institute Management
                            </span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isInstituteMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isInstituteMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter(
                          (link) => link.group_link == "Institute Management"
                        )
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* Career Asssesment */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find(
                      (link) => link.group_link == "Career Assessment"
                    ) && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleCareerMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <FaTasks />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">
                              Career Assessment
                            </span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isInstituteMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isCareerMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter(
                          (link) => link.group_link == "Career Assessment"
                        )
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* Advisors Panel Button with Dropdown */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find(
                      (link) => link.group_link == "Advisors Panel"
                    ) && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleAdvisorMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            <FaUsers className="text-lg" />
                          </span>
                          {isOpen && (
                            <span className="font-semibold">
                              Advisors Panel
                            </span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isAdvisorMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isAdvisorMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter((link) => link.group_link == "Advisors Panel")
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>

                {/* Template Card */}
                <div className="bg-white rounded-lg shadow-md">
                  {links &&
                    Array.isArray(links) &&
                    links.find((link) => link.group_link == "Template") && (
                      <div
                        className={`p-4 flex items-center cursor-pointer ${
                          !isOpen ? "justify-center" : "justify-between"
                        }`}
                        onClick={toggleTemplateMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">📄</span>
                          {isOpen && (
                            <span className="font-semibold">Template</span>
                          )}
                        </div>
                        {isOpen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform ${
                              isTemplateMenuOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                  {isTemplateMenuOpen && (
                    <div className="border-t border-gray-100">
                      {links
                        .filter((link) => link.group_link == "Template")
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={item.link_url}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-black-600 hover:bg-orange-500 ${
                              !isOpen ? "justify-center" : ""
                            }`}
                          >
                            {/* <span className="text-lg">{item.icon}</span> */}
                            {isOpen && (
                              <span className="ml-2">{item.link}</span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
