import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from './navbar';

const Login = () => {
  const navigate = useNavigate(); // For navigation
  const [formValues, setFormValues] = useState({
    login: "",
    password: "",
    terms: true,
  });
  const [errors, setErrors] = useState({});

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
    if (!formValues.password)
      newErrors.password = "Please input your Password.";
    if (!formValues.terms)
      newErrors.terms = "Please check Terms of Use and Privacy Policy.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => toast.error(error));
      return;
    }

    // Simulate a successful login (Replace with actual logic)
    toast.success("Login successful!");

    // Reset form values
    setFormValues({
      login: "",
      password: "",
      terms: true,
    });

    // Navigate to dashboard
    setTimeout(() => {
      navigate("/data");
    }, 2000); // Delay for user to see the toast
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

        <div className="flex flex-col p-6 -mt-20 w-1/2" style={{ width: "400px" }}>
          <div className="flex items-center mb-4">
            <img
              src="https://margdarshak.in/img/Mlogo.png"
              alt=""
              className="w-12"
            />
            <h1 className="text-4xl font-bold ml-4 mb-6 mt-3">Sign In</h1>
          </div>

          {/* Email Input with Icon */}
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

          {/* Password Input with Icon */}
          <div className="flex items-center space-x-3 mb-4 relative">
            <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-black-500" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleInputChange}
              className="border border-gray-400 p-2.5 pl-10 pr-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-100 hover:border-orange-500"
            />
          </div>

          {/* Terms and Conditions Checkbox */}
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

          {/* Submit Button */}
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
