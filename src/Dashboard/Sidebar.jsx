import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  FaWhatsapp,
  FaQrcode,
  FaVideo,
  FaPhone,
  FaSms,
  FaEnvelope,
  FaChartBar,
  FaUsers,
  FaRegFileAlt,
  FaIdCard,
  FaCogs,
  FaComments,
  FaTasks,
  FaHome, // Added FaHome for Dashboard icon
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive"; // Import useMediaQuery
import Logo from "../assets/margdarshakendra-logo.webp";

const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Detect mobile screen size
  const [isOpen, setIsOpen] = useState(!isMobile); // Default to closed on mobile

  const [isReportMenuOpen, setReportMenuOpen] = useState(() => {
    const saved = localStorage.getItem("reportMenuOpen");
    return saved ? JSON.parse(saved) : false;
  });

  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("reportMenuOpen", JSON.stringify(isReportMenuOpen));
  }, [isReportMenuOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest("aside")) {
        setReportMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleReportMenu = (e) => {
    e.stopPropagation();
    setReportMenuOpen(!isReportMenuOpen);
  };

  const toggleAdminMenu = (e) => {
    e.stopPropagation();
    setAdminMenuOpen(!isAdminMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false); // Close sidebar on mobile when a link is clicked
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`relative z-30 ${isMobile ? "fixed inset-y-0 left-0" : ""}`}>
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
                <img src={Logo} alt="Logo" className="w-32 h-8 object-contain" />
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

          <div className="p-1 space-y-4">
            {/* Dashboard Button */}
            <div className="bg-white rounded-lg shadow-md">
              <Link
                to="/data" // Redirect to home
                onClick={handleLinkClick}
                className={`flex items-center px-4 py-3 text-lg font-medium rounded-lg text-black-700 hover:bg-orange-500 ${
                  !isOpen ? "justify-center" : ""
                }`}
              >
                <FaHome className="text-lg" /> {/* Dashboard icon */}
                {isOpen && <span className="ml-4">Dashboard</span>}
              </Link>
            </div>

            {/* Admin Button */}
            <div className="bg-white rounded-lg shadow-md">
              <Link
                to="/admin"
                onClick={handleLinkClick}
                className={`flex items-center px-4 py-3 text-lg font-medium rounded-lg text-black-700 hover:bg-orange-500 ${
                  !isOpen ? "justify-center" : ""
                }`}
              >
                <FaUsers className="text-lg" /> {/* Changed Admin icon */}
                {isOpen && <span className="ml-4">Admin</span>}
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
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💰</span>
                  <span className="font-semibold">Wallet: ₹0.00</span>
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
                  {isOpen && <span className="font-semibold">Communication</span>}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
              {isReportMenuOpen && (
                <div className="border-t border-gray-100">
                  {[
                    { title: "Email Report", icon: <FaEnvelope />, link: "/email-report" },
                    { title: "WhatsApp Report", icon: <FaWhatsapp />, link: "/whatsapp-report" },
                    { title: "SMS Report", icon: <FaSms />, link: "/sms-report" },
                    { title: "Call Report", icon: <FaPhone />, link: "/call-report" },
                    { title: "Meeting Report", icon: <FaVideo />, link: "/meeting-report" },
                    { title: "Work Nodes", icon: <FaTasks />, link: "/my-work-report" },
                    { title: "Client Nodes", icon: <FaChartBar />, link: "/client-timeline" },
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

            {/* Independent Menu Items Card */}
            <div className="bg-white rounded-lg shadow-md">
              {[
                { title: "Template", icon: "📄", link: "/template" },
                { title: "Master Data", icon: "📁", link: "/master-data" },
                { title: "Settings", icon: "⚙️", link: "/settings" },
                { title: "Logout", icon: "🚪", link: "/logout" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  onClick={handleLinkClick}
                  className={`flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-orange-50 ${
                    index !== 0 ? "border-t border-gray-100" : ""
                  } ${!isOpen ? "justify-center" : ""}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isOpen && <span className="ml-4">{item.title}</span>}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;