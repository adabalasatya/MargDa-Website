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
          className={`bg-white text-gray-900 transition-all duration-300 ease-in-out shadow-lg ${
            isOpen ? "w-64" : "w-20"
          } max-h-screen overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex items-center border-b border-gray-300">
            {isOpen && (
              <div className="flex items-center space-x-2">
                <img src={Logo} alt="Logo" className="w-32 h-8 object-contain" />
              </div>
            )}
            <button
              className={`${
                isOpen ? "ml-auto" : "mx-auto"
              } bg-gray-100 text-gray-900 p-2 rounded-full shadow hover:bg-orange-500 focus:outline-none transition-transform duration-300`}
              onClick={toggleSidebar}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* User Menu */}
          <div className="p-4 flex items-center border-b border-gray-300 relative">
            <div
              className={`flex items-center ${
                isOpen ? "space-x-2" : "justify-center"
              }`}
            >
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
                className="ml-auto text-gray-600 hover:text-red-600 focus:outline-none"
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
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>

          {isUserMenuOpen && (
            <div className="mt-2 overflow-hidden rounded-lg transition-all duration-300 max-h-screen">
              <div className={`bg-gray-50 shadow-md ${!isOpen ? "text-center" : ""}`}>
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
                    className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white transition-colors duration-300 ${
                      !isOpen ? "justify-center" : ""
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isOpen && <span className="ml-2">{item.title}</span>}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Profile Stats Section */}
          {isOpen && (
            <div className="p-4 space-y-2 mt-4">
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

          {/* Report Section */}
          <nav className="mt-4">
            <div className="relative">
              <div
                className={`flex items-center px-4 py-5 text-lg font-medium text-gray-700 transition-colors duration-300 ${!isOpen ? "justify-center" : "justify-start"} hover:bg-orange-500 rounded-2xl hover:text-white`}
                onClick={toggleReportMenu}
              >
                <span className="text-lg">
                  <FaChartBar />
                </span>
                {isOpen && <span className="ml-4">Report</span>}
                {isOpen && (
                  <button
                    className="ml-auto text-gray-600 hover:text-red-600 focus:outline-none"
                    title="Toggle Report Menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 transition-transform ${
                        isReportMenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {isReportMenuOpen && (
                <div className="ml-3 overflow-hidden">
                  {[
                    { title: "Call Report", icon: <FaPhone />, link: "/call" },
                    { title: "SMS Report", icon: <FaSms />, link: "/sms" },
                    { title: "Email Report", icon: <FaEnvelope />, link: "/email" },
                    {
                      title: "WhatsApp Report",
                      icon: <FaWhatsapp />,
                      link: "/whatsapp",
                    },
                   
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      onClick={handleLinkClick}
                      className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300 ${
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
          </nav>

          {/* Independent Menu Items */}
          <nav className="mt-4">
            {[
              { title: "Template", icon: "📄", link: "/template" },
              { title: "Meeting", icon: <FaVideo />, link: "/meeting" },
              { title: "Master Data", icon: "📁", link: "/master-data" },
              { title: "Settings", icon: "⚙️", link: "/settings" }, 
              { title: "Logout", icon: "🚪", link:"/logout" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={handleLinkClick}
                className={`flex items-center px-4 py-5 text-lg font-medium text-gray-700 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300 ${!isOpen ? "justify-center" : "justify-start"}`}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span className="ml-4">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
