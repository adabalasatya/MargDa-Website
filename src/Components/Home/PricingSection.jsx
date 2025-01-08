import React, { useState } from 'react';
import { FaTags } from 'react-icons/fa'; // Importing an icon from React Icons

const PricingTable = () => {
  const [showSubscriptionRate, setShowSubscriptionRate] = useState(true);

  const toggleTable = () => {
    setShowSubscriptionRate(!showSubscriptionRate);
  };

  const subscriptionRates = [
    { payment: 'Annual', standard: '₹980', professional: '₹2,700', business: '₹4,400' },
    { payment: 'Half-Yearly', standard: '₹1,274', professional: '₹3,240', business: '₹4,800' },
    { payment: 'Quarterly', standard: '₹1,568', professional: '₹3,780', business: '₹5,280' },
    { payment: 'Monthly', standard: '₹1,862', professional: '₹4,320', business: '₹5,720' },
  ];

  const amountPayable = [
    { payment: 'Annual', standard: '₹11,760', professional: '₹32,400', business: '₹52,800' },
    { payment: 'Half-Yearly', standard: '₹7,644', professional: '₹19,440', business: '₹28,800' },
    { payment: 'Quarterly', standard: '₹4,704', professional: '₹11,340', business: '₹15,840' },
    { payment: 'Monthly', standard: '₹1,862', professional: '₹4,320', business: '₹5,720' },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-center items-center mb-8">
          <FaTags className="text-4xl text-blue-600 mr-3" /> {/* Icon added here */}
          <h1 className="text-4xl font-bold text-gray-800">Pricing</h1>
        </div>
        <p className="text-center text-gray-600 text-lg mb-12">
          Get your complete business set up with a{' '}
          <span className="font-semibold text-blue-600">@very nominal</span> monthly or annual subscription and recharge any add-on as and when required.
        </p>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center mb-12">
          <span className={`mr-4 text-lg font-medium ${showSubscriptionRate ? 'text-blue-600' : 'text-gray-500'}`}>
            Subscription Rate
          </span>
          <button
            onClick={toggleTable}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
              showSubscriptionRate ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform ${
                showSubscriptionRate ? 'translate-x-0' : 'translate-x-6'
              }`}
            ></div>
          </button>
          <span className={`ml-4 text-lg font-medium ${!showSubscriptionRate ? 'text-blue-600' : 'text-gray-500'}`}>
            Amount Payable
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <th className="p-5 text-left">Payment</th>
                <th className="p-5 text-center">Standard**</th>
                <th className="p-5 text-center">Professional**</th>
                <th className="p-5 text-center">Business**</th>
              </tr>
            </thead>
            <tbody>
              {(showSubscriptionRate ? subscriptionRates : amountPayable).map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-5 text-left text-gray-700">{row.payment}</td>
                  <td className="p-5 text-center text-gray-700">{row.standard}</td>
                  <td className="p-5 text-center text-gray-700">{row.professional}</td>
                  <td className="p-5 text-center text-gray-700">{row.business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Notes */}
        <p className=" mt-8 text-gray-500">* GST @18% extra <span className='ml-8'>** Per user</span></p>
      </div>
    </div>
  );
};

export default PricingTable;