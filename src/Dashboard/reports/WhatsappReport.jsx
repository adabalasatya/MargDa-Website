import React from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaPaperPlane,
  FaReply,
  FaTimesCircle,
  FaClock,
} from 'react-icons/fa';

const WhatsAppReport = () => {
  // Sample data for WhatsApp messages
  const messages = [
    {
      task: 'Task 1',
      name: 'SK Sharma',
      mobile: '1234567890',
      message: 'Invitation for a virtual meeting',
      dateTime: '10-12-2024 00:00',
      scanApi: 'Scan',
      crm: 'CRM+',
    },
    {
      task: 'Task 2',
      name: 'RP Singh',
      mobile: '9876543210',
      message: 'Follow-up on project update',
      dateTime: '11-12-2024 10:30',
      scanApi: 'API',
      crm: 'CRM+',
    },
    // Add more message data here
  ];

  // Sample data for team report
  const teamReport = [
    {
      associate: 'RP Singh',
      totalSent: 47,
      totalUnreplied: 23,
      maxDelay: '12 days',
    },
    {
      associate: 'SK Sharma',
      totalSent: 2,
      totalUnreplied: 12,
      maxDelay: '1 day',
    },
    // Add more team report data here
  ];

  // Sample data for team summary
  const teamSummary = {
    topSender: 'RP Singh - 32 WhatsApp',
    topReplier: 'RP Singh - 32 WhatsApp',
    topNeglecter: 'RP Singh - 49 WhatsApp',
    topDelayer: 'RP Singh - 34 WhatsApp',
    lowestSender: 'RP Singh - 32 WhatsApp',
  };

  return (
    <div className="p-4">
      {/* WhatsApp Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-orange-500">WhatsApp Report</h2>
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="mr-2 text-orange-500" />
          <span className="mr-4">From Date</span>
          <FaCalendarAlt className="mr-2 text-orange-500" />
          <span className="mr-4">To Date</span>
          <FaSearch className="mr-2 text-orange-500" />
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Task List and Search Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">Show</span>
            <input
              type="number"
              placeholder="10"
              className="border p-2 rounded w-16 focus:border-orange-500 focus:ring-orange-500"
            />
            <span className="ml-2">records</span>
          </div>
          <div className="flex items-center">
            <FaSearch className="mr-2 text-orange-500" />
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Table for WhatsApp Messages */}
        <table className="w-full border-collapse border border-orange-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-orange-300 p-2">Task</th>
              <th className="border border-orange-300 p-2">Name</th>
              <th className="border border-orange-300 p-2">Mobile</th>
              <th className="border border-orange-300 p-2">Message</th>
              <th className="border border-orange-300 p-2">Date + Time Stamp</th>
              <th className="border border-orange-300 p-2">Scan/API</th>
              <th className="border border-orange-300 p-2">CRM+</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={index} className="hover:bg-orange-50">
                <td className="border border-orange-300 p-2">{message.task}</td>
                <td className="border border-orange-300 p-2">{message.name}</td>
                <td className="border border-orange-300 p-2">{message.mobile}</td>
                <td className="border border-orange-300 p-2">{message.message}</td>
                <td className="border border-orange-300 p-2">{message.dateTime}</td>
                <td className="border border-orange-300 p-2">{message.scanApi}</td>
                <td className="border border-orange-300 p-2">{message.crm}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4">
          <span>Showing 1 to 10 records</span>
          <div className="inline-block float-right">
            <button className="mr-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              {"<<"} Previous
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Next {">>"}
            </button>
          </div>
        </div>
      </div>

      {/* Team Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Your Team's WhatsApp Report</h2>
        <div className="flex items-center mb-4">
          <FaSearch className="mr-2 text-orange-500" />
          <input
            type="text"
            placeholder="Search Associates"
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500 mr-4"
          />
          <FaCalendarAlt className="mr-2 text-orange-500" />
          <span className="mr-4">From Date</span>
          <FaCalendarAlt className="mr-2 text-orange-500" />
          <span className="mr-4">To Date</span>
        </div>
        <table className="w-full border-collapse border border-orange-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-orange-300 p-2">
                <FaUser className="inline mr-2 text-orange-500" />Associates
              </th>
              <th className="border border-orange-300 p-2">Total Sent</th>
              <th className="border border-orange-300 p-2">Total Un-replied</th>
              <th className="border border-orange-300 p-2">Maximum Delays</th>
            </tr>
          </thead>
          <tbody>
            {teamReport.map((report, index) => (
              <tr key={index} className="hover:bg-orange-50">
                <td className="border border-orange-300 p-2">{report.associate}</td>
                <td className="border border-orange-300 p-2">{report.totalSent}</td>
                <td className="border border-orange-300 p-2">{report.totalUnreplied}</td>
                <td className="border border-orange-300 p-2">{report.maxDelay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Team Summary Section */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-orange-500" />
            Team’s WhatsApp Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-left">
              <thead className="bg-orange-100 text-black-700">
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Team Member</th>
                  <th className="py-2 px-4">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaPaperPlane className="h-5 w-5 mr-2 text-orange-500" />
                    Top Sender
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">{teamSummary.topSender}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaReply className="h-5 w-5 mr-2 text-orange-500" />
                    Top Replier
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">{teamSummary.topReplier}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaTimesCircle className="h-5 w-5 mr-2 text-orange-500" />
                    Top Neglecter
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">{teamSummary.topNeglecter}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaClock className="h-5 w-5 mr-2 text-orange-500" />
                    Top Delayer
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">{teamSummary.topDelayer}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaPaperPlane className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Sender
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">{teamSummary.lowestSender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatsAppReport;