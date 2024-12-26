import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem("authToken"); 
    sessionStorage.removeItem("authToken");

   
    navigate("/"); 
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-2xl text-gray-800">Logging out...</h2>
    </div>
  );
};

export default Logout;
