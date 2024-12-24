import React, { useState } from "react";

const SMSReport = () => {
  const [records, setRecords] = useState(10); // Number of records to show

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        SMS Report
      </h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Here is your and the Team's SMS Report
        </h2>
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>Advisor</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>Through</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>User</option>
          </select>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Search
          </button>
        </div>
        {/* Record Controls */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="text-gray-700">
              Show
              <select
                className="mx-2 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={records}
                onChange={(e) => setRecords(e.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              records
            </label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        {/* Table */}
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4">Date - Time</th>
              <th className="py-2 px-4">Through</th>
              <th className="py-2 px-4">Advisor</th>
              <th className="py-2 px-4">Client</th>
              <th className="py-2 px-4">Content</th>
              <th className="py-2 px-4">Replied</th>
              <th className="py-2 px-4">Delay (in days)</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4">2024-12-24</td>
              <td className="py-2 px-4">Mobile</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">Message Content</td>
              <td className="py-2 px-4">Yes</td>
              <td className="py-2 px-4">3</td>
            </tr>
          </tbody>
        </table>
        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p>Showing 1 to {records} of 207 records</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md">
              Previous
            </button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded-md">
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Summary */}
      <div className="mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Team Summary
          </h3>
          <table className="w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-2 px-4">Advisor</th>
                <th className="py-2 px-4">Total Sent</th>
                <th className="py-2 px-4">Total Un-replied</th>
                <th className="py-2 px-4">Maximum Delay</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4">RP Singh</td>
                <td className="py-2 px-4">47</td>
                <td className="py-2 px-4">23</td>
                <td className="py-2 px-4">12 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SMSReport;
