import React, { useState } from "react";
import { FaChalkboardUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import CreateSchedule from "./StudyOraniserInsideForms/CreateSchedule";

const StudyOrganizerMain = () => {
  const [activeTab, setActiveTab] = useState("createschedule");
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    switch (tabName) {
      case "createschedule":
        navigate("/study-organiser");
        break;
      case "calender":
        navigate("/view-calender");
        break;
      case "progressreport":
        navigate("/progress-report");
        break;
      case "interactiveClass":
        navigate("/interactive-class");
        break;
      default:
        navigate("/createschedule");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-10 min-h-screen">
      <div className="flex justify-center items-center mb-8 pt-4">
        <FaChalkboardUser className="text-4xl text-blue-500 mr-2" />
        <h2 className="text-4xl text-primary font-bold">Study-organizer</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul
          className="nav nav-tabs flex flex-row justify-center mb-6"
          role="tablist"
        >
          {[
            { id: "createschedule", label: "Create Schedule" },
            { id: "calender", label: "View Calendar" },
            { id: "progressreport", label: "Progress Report" },
            { id: "interactiveClass", label: "Interactive Class" },
          ].map(({ id, label, to }) => (
            <li key={id} className="nav-item" role="presentation">
              <Link
                to={to}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(id);
                }}
                className={`nav-link py-2 px-4 ${
                  activeTab === id
                    ? "active bg-blue-100"
                    : "bg-gray-200 hover:bg-blue-200"
                } rounded-lg mx-1 ${
                  id === "createschedule" ? "mt-[-10px]" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="tab-content pt-6">
          {activeTab === "createschedule" && <CreateSchedule />}
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

export default StudyOrganizerMain;
