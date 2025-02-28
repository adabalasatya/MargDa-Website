import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const EmailAuth = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/email/get_credentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const credentials = data.Credential;
        setGmail(credentials.email);
        setPassword(credentials.email_pass);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://margda.in:7000/api/email/save_credentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ email: gmail, email_pass: password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.info(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
          Email App Password
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Gmail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
              placeholder="Your Gmail"
              required
            />
          </div>
          <div className="flex flex-col items-start relative">
            <div className="flex flex-row">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div
                onMouseEnter={() => setShowHelp(true)}
                onMouseLeave={() => setShowHelp(false)}
                className="ml-4 mb-2 flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full cursor-pointer"
              >
                ?
              </div>
              {showHelp && (
                <div className="absolute bottom-full left-1/2 w-full transform -translate-x-1/2 mb-2 w-48 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg group-hover:block">
                  Generate an App Specific Password from your google account.
                  <br /> <span>1. Go To Manage Your Google Account</span>
                  <br /> <span>
                    {" "}
                    2. Turn on 2-step Authentication
                  </span> <br /> <span>3. Generate App Specific Password</span>
                </div>
              )}
            </div>
            <div className="flex flex-row w-full items-center mx-auto">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="App Specific Password"
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
            className="w-full py-2 px-4 bg-orange-500 text-white font-medium text-sm rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailAuth;
