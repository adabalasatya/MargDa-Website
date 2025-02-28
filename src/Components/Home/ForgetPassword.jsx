import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import Navbar from "./navbar";

export const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!phone) newErrors.phone = "Please input your phone number.";
    return newErrors;
  };

  const forgotPasswordSendOtp = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => toast.error(error));
      return;
    }

    try {
      // Log the payload for debugging
      console.log("Sending OTP with payload:", { mobile: phone });

      const response = await fetch(
        "https://margda.in:7000/api/android/forget-password-send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: phone }), // Use the phone number directly
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } else {
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred while sending OTP.");
    }
  };

  const forgotPasswordOtpverify = async () => {
    try {
      if (!otp) {
        toast.error("Please enter the OTP.");
        return;
      }

      // Log the payload for debugging
      console.log("Verifying OTP with payload:", { mobile: phone, otp });

      const response = await fetch(
        "https://margda.in:7000/api/android/forget-password-verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: phone, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verified successfully!");
      } else {
        toast.error(data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred during OTP verification.");
    }
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
            <h1 className="text-2xl sm:text-4xl font-bold ml-4 mb-6 mt-3">
              Forgot Password
            </h1>
          </div>

          {/* Phone Input */}
          <div className="relative mb-4">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <PhoneInput
                country={"in"}
                value={phone}
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
                onClick={forgotPasswordSendOtp}
              >
                Code
              </button>
            </div>
          </div>

          {/* OTP Input and Verify Button */}
          {otpSent && (
            <div className="mt-4">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                className="w-full p-3 text-sm border border-gray-400 rounded-lg"
              />
              <button
                className="w-full mt-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={forgotPasswordOtpverify}
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Back to Sign In */}
          <div className="text-center mt-4 text-sm">
            <p className="text-black-700">
              Remember your password?{" "}
              <NavLink
                to="/login"
                className="text-orange-400 font-medium hover:text-orange-600 transition duration-300"
              >
                Sign In
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
