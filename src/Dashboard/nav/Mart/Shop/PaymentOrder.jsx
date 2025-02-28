import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Razorpay from "razorpay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCreditCard,
  faBank,
  faQrcode,
  faTimes,
  faChalkboard,
  faCartShopping,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import QRCode from "../../../../assets/QRCode.jpg";

const PaymentOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || { cart: [], total: 0 };
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [showNetBankingModal, setShowNetBankingModal] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false); // State for QR code modal
  const [razorpayDetails, setRazorpayDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [netBankingDetails, setNetBankingDetails] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const handleRazorpayPayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "Margdarshak",
      description: "Payment for your order",
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        handlePlaceOrder();
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#4CAF50",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      navigate("/shop");
    }, 3000);
  };

  const handleCancelOrder = () => {
    navigate("/cart");
  };

  const handleRazorpaySubmit = (e) => {
    e.preventDefault();
    // Handle Razorpay payment logic here
    alert("Razorpay details submitted successfully!");
    setShowRazorpayModal(false);
    handleRazorpayPayment(); // Trigger Razorpay payment after form submission
  };

  const handleNetBankingSubmit = (e) => {
    e.preventDefault();
    // Handle Net Banking payment logic here
    alert("Net Banking details submitted successfully!");
    setShowNetBankingModal(false);
    handlePlaceOrder(); // Place the order after submitting Net Banking details
  };

  const calculateAmountPayable = () => {
    return total;
  };

  return (
    <div className="bg-gray-30 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src="https://margdarshak.org/img/margdarshakendra.png"
            alt="Logo"
            className="h-10"
          />
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-700 hover:text-green-600 transition"
            >
              <FontAwesomeIcon icon={faChalkboard} className="mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center text-gray-700 hover:text-green-600 transition"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              Cart
              <span className="ml-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-5xl mx-auto pt-24 pb-8 px-6">
        {orderPlaced && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-6xl mb-4 animate-bounce"
              />
              <h2 className="text-2xl font-semibold mb-4">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600">
                You will be redirected to the Shopping page shortly.
              </p>
            </div>
          </div>
        )}

        {/* Razorpay Modal */}
        {showRazorpayModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-6">
                Enter Card Details
              </h2>
              <form onSubmit={handleRazorpaySubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Card Number</label>
                    <input
                      type="text"
                      value={razorpayDetails.cardNumber}
                      onChange={(e) =>
                        setRazorpayDetails({
                          ...razorpayDetails,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      value={razorpayDetails.expiryDate}
                      onChange={(e) =>
                        setRazorpayDetails({
                          ...razorpayDetails,
                          expiryDate: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">CVV</label>
                    <input
                      type="text"
                      value={razorpayDetails.cvv}
                      onChange={(e) =>
                        setRazorpayDetails({
                          ...razorpayDetails,
                          cvv: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowRazorpayModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Net Banking Modal */}
        {showNetBankingModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-6">
                Net Banking Details
              </h2>
              <form onSubmit={handleNetBankingSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Bank Name</label>
                    <input
                      type="text"
                      value={netBankingDetails.bankName}
                      onChange={(e) =>
                        setNetBankingDetails({
                          ...netBankingDetails,
                          bankName: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={netBankingDetails.accountNumber}
                      onChange={(e) =>
                        setNetBankingDetails({
                          ...netBankingDetails,
                          accountNumber: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">IFSC Code</label>
                    <input
                      type="text"
                      value={netBankingDetails.ifscCode}
                      onChange={(e) =>
                        setNetBankingDetails({
                          ...netBankingDetails,
                          ifscCode: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNetBankingModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRCodeModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-6">Scan QR Code</h2>
              <img
                src={QRCode} // Replace with your QR code image URL
                alt="UPI QR Code"
                className="w-64 h-64 mx-auto mb-6"
              />
              <button
                onClick={() => setShowQRCodeModal(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
          <FontAwesomeIcon
            icon={faCreditCard} // Use an appropriate icon, e.g., faCreditCard, faMoneyBill, etc.
            className="text-blue-500 text-3xl mr-3" // Adjust size and color as needed
          />
          Payment
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-500 hover:text-green-600 mb-6 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Cart
        </button>

        {/* Order Summary (Smaller Card) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                {/* Item Image and Brand Name */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image} // Replace with the actual image URL from your data
                    alt={item.itemName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-gray-700 font-medium">
                      {item.brandName}
                    </p>
                    <p className="text-gray-500 text-sm">{item.itemName}</p>
                  </div>
                </div>

                {/* Quantity and Rate */}
                <div className="flex items-center space-x-6">
                  <p className="text-gray-700">
                    Qty: <span className="font-semibold">{item.quantity}</span>
                  </p>
                  <p className="text-gray-700">
                    Rate: <span className="font-semibold">₹{item.price}</span>
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 flex justify-between">
              <p className="text-gray-700 font-bold">Total Amount:</p>
              <p className="text-gray-900 font-bold">₹{total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
          <h3 className="text-3xl font-semibold mb-8 text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-3 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Payment Details
          </h3>

          <div className="space-y-8">
            {/* Amount Payable (Header) */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 ml-2 rounded-xl border border-gray-200 max-w-sm mx-auto shadow-md">
              <div className="flex items-center justify-between">
                {" "}
                {/* Flexbox for side-by-side layout */}
                <p className="text-gray-800 font-medium">Amount Payable:</p>
                <p className="text-3xl font-extrabold text-blue-700">
                  ₹{calculateAmountPayable().toFixed(2)}
                </p>
              </div>
            </div>

            {/* Two Columns Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Account Balance */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-800 font-medium">
                      Account Balance:
                    </p>
                    <p className="text-3xl font-extrabold text-blue-700">
                      ₹500.00
                    </p>
                  </div>
                </div>

                {/* Wallet Balance */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-800 font-medium">Wallet Balance:</p>
                    <p className="text-3xl font-extrabold text-blue-700">
                      ₹200.00
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Deduct Amount and Pay Now (Account Balance) */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 shadow-md">
                  <div className="flex items-center justify-between gap-4">
                    {" "}
                    {/* Flexbox for single-line layout */}
                    <div className="flex items-center gap-2">
                      {" "}
                      {/* Flexbox for Balance Amount */}
                      <p className="text-gray-800 font-medium">
                        Deduct Amount:
                      </p>
                      <p className="text-blue-600 font-semibold">₹0.00</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-300 whitespace-nowrap">
                      Pay Now
                    </button>
                  </div>
                </div>

                {/* Deduct Amount and Pay Now (Account Balance) */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 shadow-md">
                  <div className="flex items-center justify-between gap-4">
                    {" "}
                    {/* Flexbox for single-line layout */}
                    <div className="flex items-center gap-2">
                      {" "}
                      {/* Flexbox for Balance Amount */}
                      <p className="text-gray-800 font-medium">
                        Deduct Amount:
                      </p>
                      <p className="text-blue-600 font-semibold">₹0.00</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-300 whitespace-nowrap">
                      Pay Now
                    </button>
                  </div>
                </div>

                {/* Balance and Pay Online */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 shadow-md">
                  <div className="flex items-center justify-between gap-4">
                    {" "}
                    {/* Flexbox for single-line layout */}
                    <div className="flex items-center gap-2">
                      {" "}
                      {/* Flexbox for Balance Amount */}
                      <p className="text-gray-800 font-medium">
                        Balance Amount:
                      </p>
                      <p className="text-blue-600 font-semibold">₹0.00</p>
                    </div>
                    <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-300 whitespace-nowrap">
                      Pay Online
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Razorpay Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="text-blue-500 text-2xl mr-3"
                />
                <h3 className="font-semibold">Credit/Debit Card - Razorpay</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Pay securely using your credit or debit card.
              </p>
              <button
                onClick={() => setShowRazorpayModal(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Pay with Razorpay
              </button>
            </div>

            {/* Net Banking */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faBank}
                  className="text-green-500 text-2xl mr-3"
                />
                <h3 className="font-semibold">Net Banking</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Bank details for net banking payment.
              </p>
              <button
                onClick={() => setShowNetBankingModal(true)}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
              >
                Pay With NetBanking
              </button>
            </div>

            {/* UPI */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faQrcode}
                  className="text-purple-500 text-2xl mr-3"
                />
                <h3 className="font-semibold">UPI</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Scan the QR code to pay via UPI.
              </p>
              <button
                onClick={() => setShowQRCodeModal(true)}
                className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition"
              >
                Scan
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleCancelOrder}
            className="flex items-center bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Cancel Order
          </button>
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
          >
            Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOrder;
