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
} from "react-icons/fa";
import Logo from "../assets/margdarshakendra-logo.webp";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const location = useLocation();
  const [isUserMenuOpen, setUserMenuOpen] = useState(() => {
    const saved = localStorage.getItem("userMenuOpen");
    return saved ? JSON.parse(saved) : false;
  });

  const [isReportMenuOpen, setReportMenuOpen] = useState(() => {
    const saved = localStorage.getItem("reportMenuOpen");
    return saved ? JSON.parse(saved) : false;
  });

  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("userMenuOpen", JSON.stringify(isUserMenuOpen));
  }, [isUserMenuOpen]);

  useEffect(() => {
    localStorage.setItem("reportMenuOpen", JSON.stringify(isReportMenuOpen));
  }, [isReportMenuOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest("aside")) {
        setUserMenuOpen(false);
        setReportMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setUserMenuOpen(!isUserMenuOpen);
  };

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
      toggleSidebar();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
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
              onClick={toggleSidebar}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="p-1 space-y-4">
            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 flex items-center justify-between">
                <div className={`flex items-center ${isOpen ? "space-x-2" : "justify-center"}`}>
                  <div
                    className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer"
                    onClick={toggleUserMenu}
                  >
                    S
                  </div>
                  {isOpen && <h2 className="text-lg font-semibold">Satya</h2>}
                </div>
                {isOpen && (
                  <button
                    onClick={toggleUserMenu}
                    className="text-gray-600 hover:text-orange-500 focus:outline-none"
                    title="Toggle Menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {isUserMenuOpen && (
                <div className="border-t border-gray-100">
                  {[
                    { title: "Profile", icon: "👤", link: "/profile" },
                    { title: "Credential", icon: "🔑", link: "/credential" },
                    { title: "Email Auth", icon: "📧", link: "/email-auth" },
                    { title: "Data Share", icon: "📤", link: "/data-share" },
                    { title: "Qr Scan", icon: <FaQrcode />, link: "/qr-scan" },
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

            {/* Admin Section Card */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 flex items-center justify-between">
                <div className={`flex items-center ${isOpen ? "space-x-2" : "justify-center"}`}>
                  <div
                    className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer"
                    onClick={toggleAdminMenu}
                  >
                    A
                  </div>
                  {isOpen && <h2 className="text-lg font-semibold">Admin</h2>}
                </div>
                {isOpen && (
                  <button
                    onClick={toggleAdminMenu}
                    className="text-gray-600 hover:text-orange-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 transition-transform ${
                        isAdminMenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {isAdminMenuOpen && (
                <div className="border-t border-gray-100">
                  {[
                    { title: "User Link", icon: <FaIdCard />, link: "/user-link" },
                    { title: "Variable", icon: <FaCogs />, link: "/variable" },
                    { title: "Team", icon: <FaUsers />, link: "/team" },
                    { title: "Template Approval", icon: <FaRegFileAlt />, link: "/template-approval" },
                    { title: "User KYC", icon: <FaIdCard />, link: "/user-kyc" },
                    { title: "WhatsApp Scan", icon: <FaQrcode />, link: "/whatsapp-scan" },
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
                    { title: "Work Time-line", icon: "📅", link: "/my-work-report" },
                    { title: "Client Timeline", icon: <FaChartBar />, link: "/client-timeline" },
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