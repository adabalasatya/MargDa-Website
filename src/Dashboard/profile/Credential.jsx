import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const CredentialPage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userData ? userData.access_token : null;
  const username = userData.user_data.login;

  const [login, setLogin] = useState(username);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!login) {
      return toast.warn("Provide Username");
    } else if (!password) {
      return toast.warn("Provide New Password");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/updatecredentials",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginID: login, password: password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        userData.user_data.login = login.trim();
        localStorage.setItem("userData", JSON.stringify(userData));
        setPassword("");
        toast.success(data.message);
      } else {
        toast.warn(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-2 sm:px-4">
        <div className="w-full max-w-xs p-2 sm:p-4 bg-white rounded-lg shadow-md sm:max-w-sm mx-2 sm:ml-16">
          <h2 className="text-lg sm:text-2xl font-bold text-center text-gray-800 mb-2 sm:mb-6">
            Update Credentials
          </h2>
          <div className="mb-2 sm:mb-4">
            <label
              htmlFor="username"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Username"
            />
          </div>
          <div className="mb-2 sm:mb-4">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
            >
              New Password
            </label>
            <div className="flex flex-row items-center relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="New Password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 mt-4  transform -translate-y-1/2 text-black-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-1 sm:py-3 px-2 sm:px-4 bg-orange-500 text-white text-xs sm:text-base font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Update
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black text-center py-2 sm:py-4 mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm">
          &copy; 2024 Margdarshak Media. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default CredentialPage;
