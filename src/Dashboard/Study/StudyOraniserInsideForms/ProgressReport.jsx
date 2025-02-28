import React, { useState } from "react";
import { FaChalkboardUser, FaArrowLeft } from "react-icons/fa6";
import Test from "./ProgressReportInsideForms/Test";
import Result from "./ProgressReportInsideForms/Results";
import Performance from "./ProgressReportInsideForms/Performance";
import Efficiency from "./ProgressReportInsideForms/Efficiency";
import Compare from "./ProgressReportInsideForms/Compare";
import Ranking from "./ProgressReportInsideForms/Ranking";

const ProgressReport = () => {
  const [activeTab, setActiveTab] = useState("test");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-10 min-h-screen ">
      {/* Header and Back Button in Same Line */}
      <div className="flex items-center justify-between mb-8 py-4">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="flex-1 flex justify-center items-center">
          <FaChalkboardUser className="text-4xl text-blue-500 mr-2" />
          <h2 className="text-4xl text-primary font-bold">Progress Report</h2>
        </div>
        <div className="w-[120px]"></div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-lg shadow-md ">
        <ul
          className="nav nav-tabs flex flex-row justify-center mb-2 "
          role="tablist"
        >
          {[
            { id: "test", label: "Test" },
            { id: "result", label: "Result" },
            { id: "performance", label: "Performance" },
            { id: "efficiency", label: "Efficiency" },
            { id: "compare", label: "Compare" },
            { id: "ranking", label: "Ranking" },
          ].map(({ id, label }) => (
            <li key={id} className="nav-item" role="presentation">
              <button
                onClick={() => handleTabClick(id)}
                className={`nav-link py-2 px-4 ${
                  activeTab === id
                    ? "active bg-blue-100"
                    : "bg-gray-200 hover:bg-blue-200"
                } rounded-lg mx-1`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="tab-content pt-6">
          {activeTab === "test" && <Test />}
          {activeTab === "result" && <Result />}
          {activeTab === "performance" && <Performance />}
          {activeTab === "efficiency" && <Efficiency />}
          {activeTab === "compare" && <Compare />}
          {activeTab === "ranking" && <Ranking />}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
        <span>Margdarshak © {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">
            Support
          </a>
          <a href="#" className="hover:text-blue-600">
            Help Center
          </a>
          <a href="#" className="hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ProgressReport;
