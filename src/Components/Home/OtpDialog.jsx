import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const OtpDialog = ({ open, onClose, onSubmit }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to the next input if value is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    // Move to the previous input if backspace is pressed and the current input is empty
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp.join("")); // Join the OTP array into a single string and pass it to the parent
  };

  if (!open) return null; // Don't render if not open

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  };

  const dialogStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "24px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "40px",
    height: "40px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "20px",
    margin: "0 5px",
  };

  const buttonStyle = {
    margin: "10px",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ccc",
    color: "#333",
  };

  const verifyButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007BFF",
    color: "#fff",
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Enter OTP</h2>
        <form id="otp-form" onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onFocus={(e) => e.target.select()} // Select the input value on focus
              ref={(ref) => (inputRefs.current[index] = ref)}
              maxLength={1} // Restrict input to a single character
              style={inputStyle}
            />
          ))}
        </form>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <button type="button" onClick={onClose} style={cancelButtonStyle}>
            Cancel
          </button>
          <button type="submit" form="otp-form" style={verifyButtonStyle}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop types for better validation
OtpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default OtpDialog;
