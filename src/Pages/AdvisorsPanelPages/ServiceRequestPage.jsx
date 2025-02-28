import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Dashboard/Navbar";
import Sidebar from "../../Dashboard/Sidebar";
import ServiceRequest from "../../Dashboard/AdvisorsPanel/ServiceRequest";

const CounsellorsPage = () => {
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
    <div className="flex h-screen ">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      <div className="flex flex-col flex-1">
        <Navbar />
        <ServiceRequest />
        <div className="flex-grow p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CounsellorsPage;
