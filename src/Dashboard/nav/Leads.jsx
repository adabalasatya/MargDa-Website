import React from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaSms,
  FaPhone,
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const Leads = () => {
  const userData = [
    {
      id: 1,
      name: "Dhruti",
      email: "dhrua@gmail.com",
      phone: "91970777717",
      gender: "Female",
      whatsapp: "91970777717",
      location: {
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
      },
    },
    {
      id: 2,
      name: "John",
      email: "john@example.com",
      phone: "91970777718",
      gender: "Male",
      whatsapp: "91970777718",
      location: {
        city: "New York",
        state: "NY",
        country: "USA",
      },
    },
    {
      id: 3,
      name: "Sara",
      email: "sara@example.com",
      phone: "91970777719",
      gender: "Female",
      whatsapp: "91970777719",
      location: {
        city: "London",
        state: "England",
        country: "UK",
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar with Buttons (WhatsApp, Email, Phone, SMS) */}
      <div className="flex justify-end mb-6">
        <div className="flex space-x-2">
          <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </button>
          <button className="flex items-center bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600">
            <FaEnvelope className="mr-2" />
            Email
          </button>
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
            <FaPhone className="mr-2" />
            Phone
          </button>
          <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
            <FaSms className="mr-2" />
            SMS
          </button>
        </div>
      </div>

      {/* Search and Show Section */}
      <div className="bg-white p-4 shadow rounded-lg mb-6 flex justify-between items-center">
        {/* Show Section */}
        <label className="flex items-center">
          <span className="text-sm font-semibold mr-2">Show</span>
          <input
            type="number"
            className="border border-gray-300 p-2 rounded w-20"
            placeholder="10"
          />
          <span className="text-sm font-bold ml-2">Records</span>
        </label>

        {/* Search Section */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="border border-gray-300 p-2 pl-10 rounded w-72"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <div className="flex flex-wrap items-center space-x-4">
          <select className="border border-gray-300 p-2 rounded">
            <option>At The Data Type</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>At The Data Country</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>At The Data State</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>At The Data District</option>
          </select>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded"
            placeholder="Pin Code"
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded shadow">
            + At The Data Task
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white p-4 shadow rounded-lg flex-1">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-16 py-2">Data</th>
              <th className="px-16 py-2">Location</th>
              <th className="px-4 py-2">Logs</th>
              <th className="px-4 py-2">Remarks</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-4">
                    {/* Rounded Profile Avatar */}
                    <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs">Email: {item.email}</p>
                      <p className="text-xs">Phone: {item.phone}</p>
                      <p className="text-xs">Gender: {item.gender}</p>
                      <p className="text-xs">Whatsapp: {item.whatsapp}</p>
                    </div>
                  </div>
                </td>
                <td className="px-16 py-2">
                  <p className="text-xs">City: {item.location.city}</p>
                  <p className="text-xs">State: {item.location.state}</p>
                  <p className="text-xs">Country: {item.location.country}</p>
                </td>
                <td className="px-4 py-2">
                  <p className="text-xs">Logged In: 2024-12-24 10:30 AM</p>
                  <p className="text-xs">Last Update: 2024-12-23</p>
                </td>
                <td className="px-4 py-2">
                  <p className="text-xs">Follow-up scheduled for 2024-12-26</p>
                  <p className="text-xs">Pending response from user</p>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <FaEdit className="text-gray-500 hover:text-orange-500 cursor-pointer" />
                  <FaTrash className="text-red-500 hover:text-orange-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">Showing 1 to 10 of 50 records</span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
              Previous
            </button>
            <button className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black text-center py-4 mt-6">
        <p>&copy; 2024 Margdarshak Media. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Leads;
