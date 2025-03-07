import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFile, FaQrcode, FaMobileAlt, FaUniversity,  FaRupeeSign, FaUser, FaEnvelope } from "react-icons/fa";
import Nav from "../../Components/Home/navbar";
import Footer from "../../Components/Home/Footer";
import QR from "../../assets/QRCode.jpg";

const PaymentOptions = ({
  orderID,
  setFile,
  handleUploadScreenShot,
  formatAmount = (num) => {
    if (num == null || isNaN(Number(num))) return "0";
    return Number(num).toLocaleString("en-IN");
  },
}) => {
  // Local state for form inputs
  const [balanceAmount, setBalanceAmount] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handlePhonePayPayment = async () => {
    if (!balanceAmount || balanceAmount < 1) {
      return alert("Enter amount");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/phonepay-gateway/new-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: balanceAmount, name, mobile }),
        }
      );
      const data = await response.json();
      if (data.success) {
        window.open(data.url, "_blank"); // Redirect to PhonePe payment page
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Error initiating payment");
    }
  };

  const handleRazarPayPayment = async () => {
    if (!balanceAmount) {
      return alert("Enter Amount");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: Number(balanceAmount) * 100 }),
        }
      );
      const data = await response.json();
      const options = {
        key: "rzp_live_PPtt6lw9dt15jf", // Replace with your actual key_id
        amount: data.response.amount,
        currency: "INR",
        name: "Margdarshak",
        description: "Test Transaction",
        image:
          "https://margda.in:7000/profile_pics/1735670742444-984385843.jpeg",
        order_id: data.response.id,
        handler: async function (response) {
          alert("Payment Successful");
          console.log(response);
          const verify = await fetch(
            "https://margda.in:7000/api/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            }
          );
          if (verify.ok) {
            alert("Payment Confirmed");
          } else {
            alert("Payment not Confirmed");
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: mobile,
        },
        notes: {},
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-16 text-center"
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={headingVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center"
          >
            <FaQrcode className="mr-3 text-blue-600 text-3xl" /> Payment Options
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a convenient payment method to complete your transaction securely.
          </p>
        </motion.section>


        {/* Payment Methods and QR Code */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row ml-8 gap-6">
            {/* Left Section: Payment Methods */}
            <motion.div
              variants={listItemVariants}
              className="flex-1 space-y-6 w-full md:w-1/2"
            >
              {/* UPI Payment Details */}
              <motion.div
                variants={listItemVariants}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-blue-300"
              >
                <div className="flex items-center mb-4">
                  <FaMobileAlt className="mr-3 text-sky-600 text-2xl" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    UPI & Mobile Apps
                  </h3>
                </div>
                <div className="text-gray-700 text-sm space-y-2">
                  <p>
                    <span className="font-bold text-yellow-700">UPI ID:</span>{" "}
                    margd78386580@barodampay
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">Mobile No:</span>{" "}
                    7838681293
                  </p>
                  <p className="text-sm text-gray-500">
                    Use apps like BHIM UPI, Paytm, PhonePe, or Google Pay.
                  </p>
                </div>
              </motion.div>

              {/* Bank Deposit Details */}
              <motion.div
                variants={listItemVariants}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-blue-300"
              >
                <div className="flex items-center mb-4">
                  <FaUniversity className="mr-3 text-purple-600 text-2xl" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Bank Deposit/Net Banking
                  </h3>
                </div>
                <div className="text-gray-700 text-sm space-y-2">
                  <p>
                    <span className="font-bold text-yellow-700">Account Name:</span>{" "}
                    Margdarshak Media
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">Account No:</span>{" "}
                    45240200000580
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">IFSC Code:</span>{" "}
                    BARB0DWADEL
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">Bank Name:</span>{" "}
                    Bank of Baroda
                  </p>
                  <p>
                    <span className="font-bold text-yellow-700">Branch:</span>{" "}
                    Dwarka Mor, New Delhi
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports NEFT, IMPS, etc.
                  </p>
                </div>
              </motion.div>

              {/* File Upload for Payment Screenshot */}
              <motion.div
                variants={listItemVariants}
                className="bg-white shadow-lg rounded-lg p-6 border border-blue-300 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center"
              >
                <div className="flex items-center mb-4">
                  <FaFile className="mr-3 text-green-600 text-2xl" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Upload Payment Screenshot
                  </h3>
                </div>
                <label
                  htmlFor="screen-shot"
                  className="text-black underline rounded px-5 py-2 cursor-pointer hover:text-red-500"
                >
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="screen-shot"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUploadScreenShot(orderID)}
                  className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-500 mt-4 transition-colors"
                >
                  Done
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Section: QR Code */}
            <motion.div
              variants={listItemVariants}
              className="w-full md:w-1/2 flex border border-blue-300 items-center justify-center bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center ml-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Scan to Pay
                </h3>
                <img
                  src={QR}
                  alt="qr-code"
                  className="h-auto rounded-lg max-w-full border-2 border-gray-200"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Payment Details For UPI APPS */}

        <motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={sectionVariants}
  className="mb-16 bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto border border-blue-200"
>
  <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center tracking-tight">
    <FaMobileAlt className="inline-block mr-2 text-blue-600" /> Payment Details
  </h2>
  <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Amount Field */}
    <div className="relative">
      <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <FaRupeeSign className="mr-2 text-blue-600" /> Amount (INR)
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          ₹
        </span>
        <input
          type="number"
          id="amount"
          placeholder="Enter Recharge Amount"
          value={balanceAmount}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 0) setBalanceAmount(value);
          }}
          className={`w-full pl-8 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
            balanceAmount && balanceAmount < 1 ? "border-red-500" : "border-gray-300 hover:border-blue-400"
          }`}
          min="1"
          step="1"
        />
      </div>
      {balanceAmount && balanceAmount < 1 && (
        <p className="text-red-500 text-xs mt-2 italic">Amount must be at least 1 INR</p>
      )}
    </div>

    {/* Full Name Field */}
    <div className="relative">
      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <FaUser className="mr-2 text-blue-600" /> Full Name
      </label>
      <input
        type="text"
        id="name"
        placeholder="Enter Your Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
          name && name.length < 2 ? "border-red-500" : "border-gray-300 hover:border-blue-400"
        }`}
      />
      {name && name.length < 2 && (
        <p className="text-red-500 text-xs mt-2 italic">Name must be at least 2 characters</p>
      )}
    </div>

    {/* Mobile Number Field */}
    <div className="relative">
      <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <FaMobileAlt className="mr-2 text-blue-600" /> Mobile Number
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          +91
        </span>
        <input
          type="text"
          id="mobile"
          placeholder="Enter Your Mobile Number"
          value={mobile}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length <= 10) setMobile(value);
          }}
          className={`w-full pl-12 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
            mobile && mobile.length !== 10 ? "border-red-500" : "border-gray-300 hover:border-blue-400"
          }`}
          maxLength="10"
        />
      </div>
      {mobile && mobile.length !== 10 && (
        <p className="text-red-500 text-xs mt-2 italic">Mobile number must be 10 digits</p>
      )}
    </div>

    {/* Email Field */}
    <div className="relative">
      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <FaEnvelope className="mr-2 text-blue-600" /> Email Address
      </label>
      <input
        type="email"
        id="email"
        placeholder="Enter Your Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
          email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? "border-red-500"
            : "border-gray-300 hover:border-blue-400"
        }`}
      />
      {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
        <p className="text-red-500 text-xs mt-2 italic">Please enter a valid email address</p>
      )}
    </div>

    {/* Payment Gateways */}
    <div className="col-span-1 md:col-span-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
      >
        <motion.div
          variants={listItemVariants}
          className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg border border-blue-300 rounded-lg p-6 hover:shadow-xl transition-all duration-300 flex items-center justify-between cursor-pointer"
          onClick={handlePhonePayPayment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center">
            <FaMobileAlt className="text-sky-600 text-2xl mr-3" />
            <span className="text-xl font-semibold text-gray-800">PhonePe Gateway</span>
          </div>
        </motion.div>
        <motion.div
          variants={listItemVariants}
          className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-lg border border-purple-300 rounded-lg p-6 hover:shadow-xl transition-all duration-300 flex items-center justify-between cursor-pointer"
          onClick={handleRazarPayPayment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center">
            <FaUniversity className="text-purple-600 text-2xl mr-3" />
            <span className="text-xl font-semibold text-gray-800">Razorpay Gateway</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </form>
</motion.section>

      
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PaymentOptions;