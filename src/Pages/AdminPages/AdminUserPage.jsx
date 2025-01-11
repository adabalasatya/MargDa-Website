import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../../Dashboard/admin/adminnavbar";
import AdminSidebar from '../../Dashboard/admin/adminsidebar'
import Adminuser from "../../Dashboard/admin/adminuser"

const AdminUserPage = () => {
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
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <div className="flex flex-col flex-1">
        <AdminNavbar/>
       <Adminuser/>
        <div className="flex-grow p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
