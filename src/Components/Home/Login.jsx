import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from './navbar';

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    login: "",
    password: "",
    terms: false, // Default to false to ensure user checks it
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.login) newErrors.login = "Please input your Login Id.";
    if (!formValues.password) newErrors.password = "Please input your Password.";
    if (!formValues.terms) newErrors.terms = "Please agree to the Terms of Use and Privacy Policy.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => toast.error(error));
      return;
    }

    try {
      const response = await fetch("https://margda.in:7000/api/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formValues.login,
          password: formValues.password,
        }),
      });

      if (response.status === 404) {
        toast.error("Invalid login ID.");
      } else if (response.status === 401) {
        toast.error("Invalid password.");
      } else if (response.status === 200) {
        const userData = await response.json();
        toast.success("Login successful!");

        // Reset form values
        setFormValues({
          login: "",
          password: "",
          terms: false,
        });

        // Navigate to dashboard or handle user details
        setTimeout(() => {
          navigate("/explore", { state: { user: userData } });
        }, 2000);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } catch (error) {
      toast.error("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen justify-center items-center gap-48 -mt-6">
        <div className="mt-30 w-1/2 hidden sm:flex flex-nowrap">
          <img
            src="https://margdarshak.org/img/skill%20rehan.png"
            alt="Illustration"
            className="block"
          />
        </div>

        <div className="flex flex-col p-6 -mt-20" style={{ width: "400px" }}>
          <div className="flex items-center mb-4">
            <img
              src="https://margdarshak.in/img/Mlogo.png"
              alt=""
              className="w-12"
            />
            <h1 className="text-4xl font-bold ml-4 mb-6 mt-3">Sign In</h1>
          </div>

          <div className="flex items-center space-x-3 mb-4 relative">
            <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-black-500" />
            <input
              id="login"
              name="login"
              type="text"
              placeholder="Login ID"
              value={formValues.login}
              onChange={handleInputChange}
              className="border border-gray-400 p-2.5 pl-10 pr-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-100 hover:border-orange-500"
            />
          </div>

          <div className="flex items-center space-x-3 mb-4 relative">
            <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-black-500" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formValues.password}
              onChange={handleInputChange}
              className="border border-gray-400 p-2.5 pl-10 pr-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-100 hover:border-orange-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formValues.terms}
              onChange={handleInputChange}
              className="focus:bg-orange-600"
              required
            />
            <label htmlFor="terms" className="text-sm text-start ml-4">
              I agree to the{" "}
              <span className="font-bold" style={{ color: "#eb7134" }}>
                Terms of Use and Privacy Policy.
              </span>
            </label>
          </div>

          <button
            className="text-white py-2 rounded-lg mb-2 font-semibold"
            style={{ backgroundColor: "#eb5223" }}
            onClick={handleSubmit}
          >
            SIGN IN
          </button>

          <p className="flex items-center justify-center gap-4 text-sm mt-4">
            <span className="flex items-center gap-2 text-orange-600 font-medium hover:text-gray-800 transition duration-300 cursor-pointer">
              Forget Password?
            </span>
            <span className="text-gray-400">|</span>
            <NavLink
              to="/signup"
              className="flex items-center gap-2 text-orange-600 font-medium hover:text-gray-800 transition duration-300"
            >
              Create Account
            </NavLink>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Login;