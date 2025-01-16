import React, { useState } from "react";

const OnlinePaymentOption = () => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showNetBankingForm, setShowNetBankingForm] = useState(false);
  const [upiQrCode, setUpiQrCode] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const handleCardClick = () => {
    setShowCardForm(!showCardForm); // Toggle the card form visibility
    setShowNetBankingForm(false); // Close the net banking form if open
  };

  const handlePhonePayPayment = async () => {
    if (!amount || amount < 1) {
      return alert("Enter amout");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/phonepay-gateway/new-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, name, mobile }),
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

  const handleNetBankingClick = () => {
    setShowNetBankingForm(!showNetBankingForm); // Toggle the net banking form visibility
    setShowCardForm(false); // Close the card form if open
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">Recharge for Talk-time</h1>

      <div className="flex flex-row justify-center items-start">
        <div className="flex flex-col w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6 m-4 ">
            <div className="max-h-[400px] overflow-y-auto w-auto">
              <table className="w-full text-sm text-left border-spacing-x-2 border ">
                <thead className="divide-y divide-gray-200 border">
                  <tr className="text-gray-600 sticky top-0 bg-white z-10 p-7 text-center">
                    <th className="px-4 py-3 border">₹100</th>
                    <th className="border">₹200</th>
                    <th className="border">₹500</th>
                    <th className="border">₹1000</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border">
                  <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7 text-center">
                    <td className="border"></td>
                    <td className="py-3">Get 20% Extra</td>
                    <td className="border">Get 50% Extra</td>
                    <td className="border">Get 1000% Extra</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7 text-center">
                    <td className="px-4 py-3 border">20 minutes</td>
                    <td className="border">44 minutes</td>
                    <td className="border">150 minutes</td>
                    <td className="border">400 minutes</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-200 border p-7">
                    <td className="py-3 border">₹100+18% Gst = ₹118</td>
                    <td className="border">₹200+18% Gst = ₹236</td>
                    <td className="border">₹500+18% Gst = ₹590</td>
                    <td className="border">₹1000+18% Gst = ₹1180</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            {/* Mobile Apps */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="text-lg font-semibold text-sky-600 mb-3">
                Through Mobile Apps like BHIM UPI, Paytm, Phonepe, Google Pay,
                etc.
              </div>
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-bold text-yellow-700">UPI ID:</span>{" "}
                  margd78386580@barodampay
                </p>
                <p>
                  <span className="font-bold text-yellow-700">Mobile No:</span>{" "}
                  7838681293
                </p>
              </div>
            </div>

            {/* Bank Deposit */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="text-lg font-semibold text-sky-600 mb-3">
                Through bank deposit/net banking/NEFT/IMPS, etc.
              </div>
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-bold text-yellow-700">
                    Account Name:
                  </span>{" "}
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
              </div>
            </div>
          </div>
        </div>
        {/* QR Code Section */}
        <div className="flex-1 text-center w-1/2">
          <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <img
              src="https://margda.com/assets/recharge-qr-payment.png"
              alt="qr-code"
              className="w-[80%] h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      <div
        className="flex items-center my-5 justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={handleCardClick}
      >
        <span>PhonePe Gateway</span>
      </div>
      {showCardForm && (
        <div className="p-4 flex flex-col">
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full my-5 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            type="number"
            placeholder="Your mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Amount in ruppes"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="w-full flex justify-center">
            <button
              className="w-1/2  my-5  bg-blue-500 text-white px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder-gray-400"
              onClick={handlePhonePayPayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* UPI Option */}
      {/* <div
            onClick={() => setUpiQrCode(true)}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span>UPI</span>
            <span className="text-gray-600">- Scanner page</span>
          </div> */}

      {/* {upiQrCode && (
            <div className="fixed inset-0 p-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
              <div className="bg-white p-8 rounded-3xl shadow-2xl w-11/12 max-w-4xl flex flex-col items-center justify-center">
                <div className="w-1/2 h-1/2 flex items-center justify-center">
                  <img
                    src="https://margda.com/assets/recharge-qr-payment.png"
                    alt=""
                  />
   
                src="https://margda.com/assets/recharge-qr-payment.png"             </div>
                <div
                  onClick={() => setUpiQrCode(false)}
                  className="cursor-pointer p-2 px-6 mt-4 bg-blue-500 text-white rounded hover:bg-gray-300 hover:text-black"
                >
                  ok
                </div>
              </div>
            </div>
          )} */}
      {/* Credit/Debit Card Option */}
      {/* <div
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleCardClick}
          >
            <span>Credit/Debit Card</span>
            <span className="text-gray-600">- Razorpay</span>
          </div> */}

      {/* Card Details Form */}
      {/* {showCardForm && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Enter Card Details</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="mt-1 block w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-1 block w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          )} */}

      {/* Net Banking Option */}
      {/* <div
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleNetBankingClick}
          >
            <span>Net Banking</span>
            <span className="text-gray-600">- Bank details</span>
          </div> */}

      {/* Net Banking Form */}
      {/* {showNetBankingForm && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Select Bank</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <select className="mt-1 block w-full p-2 border rounded-md">
                    <option value="">Select your bank</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="Axis">Axis Bank</option>
                    <option value="Kotak">Kotak Mahindra Bank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Net Banking ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Net Banking ID"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          )} */}

      {/* Email Templates */}
      {/* Billing Statement */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">
            Subject: {`{user}`}, Billing Statement {`{orderID}`}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Invoice</span>
              <span className="text-gray-600">GSTIN: 27AAGCG4576J1Z6</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Margdarshak Media</p>
                <p>🏠 C-67, Dwarka Mor, New Delhi</p>
                <p>📞 07965174000</p>
                <p>💬 +918130960040</p>
                <p>✉️ mail@margda.com</p>
                <p>🌐 www.margda.com</p>
              </div>
              <div>
                <p className="font-semibold">Bill to:</p>
                <p>Margdarshak Media</p>
                <p>S-56 Sector 12</p>
                <p>NOIDA – 201301</p>
                <p>Uttar Pradesh</p>
              </div>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="font-semibold">Order ID: 3816337209</span>
              <span className="text-gray-600">Date: 12.01.2025</span>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Description</p>
              <p>1. Database – 1000 records</p>
              <p>2. Margda CRM – 1 user</p>
              <p>Period: 10/01/2025 - 09/02/2025</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>MRP</span>
                <span>₹2,600.00</span>
              </div>
              <div className="flex justify-between">
                <span>MRP</span>
                <span>₹2,500.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span>₹5,100.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹918.00</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total INR</span>
                <span>₹6,018.00</span>
              </div>
              <p className="text-sm text-gray-600">
                Rupees Six thousand eighteen only.
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Please refer to the terms of service and refund policy on the
              website.
            </p>
            <p className="text-sm text-gray-600">
              Thanks for being part of the Margdarshak family.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Pay now
            </button>
          </div>
        </div> */}

      {/* Payment Receipt */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">
            Subject: {`{user}`}, Payment Receipt {`{receiptID}`}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Receipt</span>
              <span className="text-gray-600">Receipt ID: {`{receiptID}`}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Margdarshak Media</p>
                <p>🏠 C-67, Dwarka Mor, New Delhi</p>
                <p>📞 07965174000</p>
                <p>💬 +918130960040</p>
                <p>✉️ mail@margda.com</p>
                <p>🌐 www.margda.com</p>
              </div>
              <div>
                <p className="font-semibold">Payment Date:</p>
                <p>{`{paymentDate}`}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Dear RP Singh,</p>
              <p>
                We have received a sum of INR ₹6,018.00 (INR Six thousand
                eighteen only) towards payment of Order ID: 3816337209 for
                Database and Margda CRM subscription.
              </p>
              <p>We assure you of the best services always.</p>
              <p>Thanks for being part of the Margdarshak family.</p>
            </div>
          </div>
        </div> */}

      {/* Delivery Challan */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">
            Subject: {`{user}`}, Delivery Challan {`{orderID}`}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Delivery</span>
              <span className="text-gray-600">Order ID: {`{orderID}`}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Margdarshak Media</p>
                <p>🏠 C-67, Dwarka Mor, New Delhi</p>
                <p>📞 07965174000</p>
                <p>💬 +918130960040</p>
                <p>✉️ mail@margda.com</p>
                <p>🌐 www.margda.com</p>
              </div>
              <div>
                <p className="font-semibold">Customer:</p>
                <p>Margdarshak Media</p>
                <p>S-56 Sector 12</p>
                <p>NOIDA – 201301</p>
                <p>Uttar Pradesh</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Order Date: 12.01.2025</p>
              <p>Payment Date: 12.01.2025</p>
              <p>Delivery Date: 12.01.2025</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">
                Database and Software as a Service
              </p>
              <p>Database – 1000 records</p>
              <p>Margda CRM – 1 user</p>
              <p>Period: 10/01/2025 - 09/02/2025</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Delivery Method:</p>
              <p>Online through CRM</p>
              <p>URL: https://margda.com</p>
            </div>
            <p className="text-sm text-gray-600">
              I acknowledge that I have received access and accept the above
              digital service in accordance with the terms of use and refund
              policy given on the website.
            </p>
            <p className="text-sm text-gray-600">
              Thanks for being part of the Margdarshak family.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Confirm Delivery
            </button>
          </div>
        </div> */}
    </div>
  );
};

export default OnlinePaymentOption;
