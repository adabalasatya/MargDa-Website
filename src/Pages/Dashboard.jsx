import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FaDatabase, FaUserTie, FaBuilding, FaUsers } from "react-icons/fa"; // Importing icons
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
        <div className="flex-grow p-6 overflow-auto bg-gray-100">

          {/* Dashboard Homepage Content */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Satya!</h1>

            {/* Explore sections with profile-like links */}
            <div className="text-gray-600 mb-4">
              <span>Explore the following sections: </span>
              <div className="flex space-x-4 mt-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center hover:shadow-xl transition duration-300 ease-in-out">
                  <FaDatabase size={30} className="text-blue-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Data</h3>
                  <a href="/data" className="text-blue-500 hover:underline">View Data</a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center hover:shadow-xl transition duration-300 ease-in-out">
                  <FaUserTie size={30} className="text-green-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Leads</h3>
                  <a href="/lead" className="text-blue-500 hover:underline">View Leads</a>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center hover:shadow-xl transition duration-300 ease-in-out">
                  <FaBuilding size={30} className="text-purple-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Workplace</h3>
                  <a href="/workplace" className="text-blue-500 hover:underline">View Workplace</a>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center hover:shadow-xl transition duration-300 ease-in-out">
                  <FaUsers size={30} className="text-orange-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Team</h3>
                  <a href="/team" className="text-blue-500 hover:underline">View Team</a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Action 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create New Report</h3>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                Create Report
              </button>
            </div>

            {/* Quick Action 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Data</h3>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">
                Manage Data
              </button>
            </div>

            {/* Quick Action 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">View Reports</h3>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200">
                View Reports
              </button>
            </div>
          </div>

          {/* Placeholder for Outlet */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
