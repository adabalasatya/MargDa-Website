import React from 'react';

const Recharge = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">Recharge for Talk-time</h1>

      {/* Available Balance */}
      <div className="mb-6">
        <p className="text-lg">Available balance: <span className="font-bold">₹ 0</span></p>
      </div>

      {/* Recharge Options Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">₹100</th>
              <th className="py-3 px-4 text-left">₹200</th>
              <th className="py-3 px-4 text-left">₹500</th>
              <th className="py-3 px-4 text-left">₹1000</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4">Get 20% extra</td>
              <td className="py-3 px-4">Get 50% extra</td>
              <td className="py-3 px-4">Get 100% extra</td>
              <td className="py-3 px-4">Get 200% extra</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">20 minutes</td>
              <td className="py-3 px-4">44 minutes</td>
              <td className="py-3 px-4">150 minutes</td>
              <td className="py-3 px-4">400 minutes</td>
            </tr>
            <tr>
              <td className="py-3 px-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Recharge</button>
              </td>
              <td className="py-3 px-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Recharge</button>
              </td>
              <td className="py-3 px-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Recharge</button>
              </td>
              <td className="py-3 px-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Recharge</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Order details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Recharge Amount</span>
            <span className="font-bold">₹ 1,000.00</span>
          </div>
          <div className="flex justify-between">
            <span>GST@18%</span>
            <span className="font-bold">₹ 180.00</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="font-bold">Total Amount</span>
            <span className="font-bold">₹ 1,180.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;