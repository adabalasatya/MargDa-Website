import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import Navbar from './navbar';

export const Sign = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    mobile: "",
    terms: true,
    opt1: true,
    opt2: true,
    opt3: true,
    opt4: true,
  });
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, mobile: value });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOpt = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.mobile) newErrors.mobile = "Please input your mobile number.";
    if (!formValues.email) newErrors.email = "Please input your email.";
    if (!formValues.name) newErrors.name = "Please input your name.";
    if (!formValues.terms) newErrors.terms = "Please check Terms of Use and Privacy Policy.";
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
    // Here you would typically handle the form submission
    console.log('Form submitted:', formValues);
    toast.success('Form submitted successfully!');
  };

  const handleVerification = () => {
    toast.success('Verification code sent!');
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col sm:flex-row min-h-screen justify-center items-center">
        {/* Left Image Section */}
        <div className="hidden sm:flex w-1/2">
          <img
            src="https://margdarshak.org/img/skill%20rehan.png"
            alt="Illustration"
            className="block max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div
          className="flex flex-col justify-between p-4 sm:p-6"
          style={{
            width: "100%",
            maxWidth: "550px",
            marginTop: "-50px",
          }}
        >
          <div className="flex items-center mb-4">
            <img
              src="https://margdarshak.in/img/Mlogo.png"
              alt="Logo"
              className="w-12"
            />
            <h1 className="text-2xl sm:text-4xl font-bold ml-4 mb-6 mt-3">Sign Up</h1>
          </div>

          {/* Name Input */}
          <div className="relative mb-4">
            <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden hover:border-orange-500 focus-within:border-orange-500 transition"
              
            >
              <div className="p-4">
                <FaUser className="text-black-500" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={formValues.name}
                onChange={handleInputChange}
                className="w-full sm:w-full p-3 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Phone Input with OTP button */}
          <div className="relative mb-4">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <PhoneInput
                country={"in"}
                value={formValues.mobile}
                onChange={handlePhoneChange}
                placeholder="Mobile"
                inputStyle={{
                  width: "100%",
                  height: "50px",
                  paddingLeft: "58px",
                }}
              />
              <button
                className="w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-md"
                onClick={handleVerification}
              >
                Code
              </button>
            </div>
          </div>

          {/* Email Input */}
          <div className="relative mb-4">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden hover:border-orange-500 focus-within:border-orange-500 transition w-full">
                <div className="p-4">
                  <FaEnvelope className="text-black-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="w-full p-3 text-sm focus:outline-none"
                />
              </div>
              <button
                onClick={handleVerification}
                className="w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Code
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formValues.terms}
                onChange={handleInputChange}
                className="rounded focus:ring focus:ring-blue-300"
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-orange-600 font-medium">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-600 font-medium">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>

          {/* Communication Preferences */}
          <div className="mb-4 space-y-3">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              I consent to receive updates via:
            </label>
            <div className="flex flex-wrap gap-4">
              {["Whatsapp", "Email", "Call", "SMS"].map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${index}-opt`}
                    name={`opt${index + 1}`}
                    className="rounded focus:ring focus:ring-blue-300"
                    checked={formValues[`opt${index + 1}`]}
                    onChange={handleOpt}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              You can opt-out anytime by replying <b>'STOP'</b>.
            </p>
          </div>

          {/* Sign Up Button */}
          <div className="mt-6">
            <button
              className="w-full bg-orange-500 text-white text-lg font-medium py-3 rounded-lg hover:bg-orange-600 focus:ring focus:ring-blue-300"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>

          {/* Already Have an Account */}
          <div className="text-center mt-4 text-sm">
            <p className="text-black-700">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-orange-400 font-medium hover:text-orange-600 transition duration-300"
              >
                Sign In
              </NavLink>
            </p>
          </div>

          {/* Toast Notifications */}
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
        </div>
      </div>
    </>
  );
};

export default Sign;