import React, { useState } from 'react';

const OnlinePaymentOption = () => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showNetBankingForm, setShowNetBankingForm] = useState(false);

  const handleCardClick = () => {
    setShowCardForm(!showCardForm); // Toggle the card form visibility
    setShowNetBankingForm(false); // Close the net banking form if open
  };

  const handleNetBankingClick = () => {
    setShowNetBankingForm(!showNetBankingForm); // Toggle the net banking form visibility
    setShowCardForm(false); // Close the card form if open
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">Online Payment Option</h1>

      {/* Payment Options */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Choose Payment Method</h2>
        <div className="space-y-4">
          {/* Credit/Debit Card Option */}
          <div
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleCardClick}
          >
            <span>Credit/Debit Card</span>
            <span className="text-gray-600">- Razorpay</span>
          </div>

          {/* Card Details Form */}
          {showCardForm && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Enter Card Details</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="mt-1 block w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-1 block w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
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
          )}

          {/* Net Banking Option */}
          <div
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleNetBankingClick}
          >
            <span>Net Banking</span>
            <span className="text-gray-600">- Bank details</span>
          </div>

          {/* Net Banking Form */}
          {showNetBankingForm && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Select Bank</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Name</label>
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
                  <label className="block text-sm font-medium text-gray-700">Net Banking ID</label>
                  <input
                    type="text"
                    placeholder="Enter your Net Banking ID"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
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
          )}

          {/* UPI Option */}
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <span>UPI</span>
            <span className="text-gray-600">- Scanner page</span>
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div className="space-y-6">
        {/* Billing Statement */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Subject: {`{user}`}, Billing Statement {`{orderID}`}</h2>
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
              <p className="text-sm text-gray-600">Rupees Six thousand eighteen only.</p>
            </div>
            <p className="text-sm text-gray-600">
              Please refer to the terms of service and refund policy on the website.
            </p>
            <p className="text-sm text-gray-600">Thanks for being part of the Margdarshak family.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Pay now
            </button>
          </div>
        </div>

        {/* Payment Receipt */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Subject: {`{user}`}, Payment Receipt {`{receiptID}`}</h2>
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
                We have received a sum of INR ₹6,018.00 (INR Six thousand eighteen only) towards payment of Order ID: 3816337209 for Database and Margda CRM subscription.
              </p>
              <p>We assure you of the best services always.</p>
              <p>Thanks for being part of the Margdarshak family.</p>
            </div>
          </div>
        </div>

        {/* Delivery Challan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Subject: {`{user}`}, Delivery Challan {`{orderID}`}</h2>
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
              <p className="font-semibold">Database and Software as a Service</p>
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
              I acknowledge that I have received access and accept the above digital service in accordance with the terms of use and refund policy given on the website.
            </p>
            <p className="text-sm text-gray-600">Thanks for being part of the Margdarshak family.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Confirm Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlinePaymentOption;