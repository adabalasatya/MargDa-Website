import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Dashboard/Navbar";
import Sidebar from "../../Dashboard/Sidebar";
import ProgressMeter from "../../Dashboard/Study/ProgressMeter";

const ProgressMeterPage = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-screen ">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      <div className="flex flex-col flex-1">
        <Navbar />
        <ProgressMeter />
        <div className="flex-grow p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProgressMeterPage;
