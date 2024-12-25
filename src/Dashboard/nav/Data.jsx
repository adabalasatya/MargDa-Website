import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaWhatsapp,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const dataDetails = [
  {
    id: 1,
    name: "Dhruti",
    email: "dhrua@gmail.com",
    phone: "91970777717",
    gender: "Female",
    whatsapp: "91970777717",
    log: "Logged in: 2024-12-24",
    remarks: "Pending response",
  },
  {
    id: 2,
    name: "Rajesh",
    email: "rajesh@example.com",
    phone: "919876543210",
    gender: "Male",
    whatsapp: "919876543210",
    log: "Logged in: 2024-12-23",
    remarks: "Follow-up required",
  },
  // ... other data details
];

const Data = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
            <FaUser className="mr-2" />
            Data
          </button>
          <button className="flex items-center px-5 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition">
            <FaUser className="mr-2" />
            Shortlist
          </button>
          <button className="flex items-center px-5 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition">
            (+) Add
          </button>
          <button className="flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition">
            Upload CSV
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-700">Show</label>
          <select className="px-3 py-2 border rounded shadow-sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="table-auto w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-gray-600">#</th>
              <th className="px-4 py-3 text-gray-600">Data</th>
              <th className="px-4 py-3 text-gray-600">Log</th>
              <th className="px-4 py-3 text-gray-600">Remarks</th>
              <th className="px-4 py-3 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dataDetails.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 transition">
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-gray-500" />
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-gray-500" />
                      <span className="text-gray-600">{item.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-gray-500" />
                      <span className="text-gray-600">{item.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaVenusMars className="text-gray-500" />
                      <span className="text-gray-600">{item.gender}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaWhatsapp className="text-green-500" />
                      <span className="text-gray-600">{item.whatsapp}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{item.log}</td>
                <td className="px-4 py-3 text-gray-700">{item.remarks}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button
                      title="Edit"
                      className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-600 text-sm">
            Showing 1 to {dataDetails.length} of {dataDetails.length} entries
          </span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300">
              Previous
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
