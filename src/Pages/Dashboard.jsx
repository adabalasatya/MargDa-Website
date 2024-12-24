import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-grow p-4 overflow-auto">
          {/* Placeholder text for the homepage */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard!</h1>
            <p className="text-gray-600">
              This is the central hub for managing your activities, tracking reports, and accessing key features. 
              Use the navigation menu on the left to explore different sections of the dashboard.
            </p>
            <p className="text-gray-600 mt-2">
              Whether you're looking to view reports, manage data, or collaborate with your team, 
              everything you need is just a click away.
            </p>
            <p className="text-gray-600 mt-4">
              Stay productive, and if you have any questions, feel free to reach out for support.
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
