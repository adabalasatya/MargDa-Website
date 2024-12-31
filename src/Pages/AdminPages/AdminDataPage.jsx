import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../Dashboard/Sidebar";
import Admindata from "../../Dashboard/admin/admindata"

const ProfilePage = () => {
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
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <div className="flex flex-col flex-1">
        
       <Admindata/>
        <div className="flex-grow p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
