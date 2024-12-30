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
  <h1 className="text-2xl font-bold mb-4 text-orange-500">Whatsapp Report</h1>
  <div className="flex space-x-16 mb-4">
    <span className="text-lg font-semibold text-black-700">&lt;Your Whatsapp&gt;</span>
    <span className="text-lg font-semibold text-black-700">&lt;Team Report&gt;</span>
    <span className="text-lg font-semibold text-black-700">&lt;Team Summary&gt;</span>
  </div>
</div>

      <div className="mb-8">
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
        <div className="overflow-x-auto rounded-lg shadow-md">
  <table className="w-full border-collapse bg-white">
    <thead>
      <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <th className="py-3 px-4 text-left font-semibold">Task</th>
        <th className="py-3 px-4 text-left font-semibold">Name</th>
        <th className="py-3 px-4 text-left font-semibold">Mobile</th>
        <th className="py-3 px-4 text-left font-semibold">Message</th>
        <th className="py-3 px-4 text-left font-semibold">Date + Time Stamp</th>
        <th className="py-3 px-4 text-left font-semibold">Scan/API</th>
        <th className="py-3 px-4 text-left font-semibold">CRM+</th>
      </tr>
    </thead>
    <tbody>
      {messages.map((message, index) => (
        <tr
          key={index}
          className={`border-b border-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-orange-50 transition-colors duration-200`}
        >
          <td className="py-3 px-4 text-gray-700">{message.task}</td>
          <td className="py-3 px-4 text-gray-700">{message.name}</td>
          <td className="py-3 px-4 text-gray-700">{message.mobile}</td>
          <td className="py-3 px-4 text-gray-700">{message.message}</td>
          <td className="py-3 px-4 text-gray-700">{message.dateTime}</td>
          <td className="py-3 px-4 text-gray-700">{message.scanApi}</td>
          <td className="py-3 px-4 text-gray-700">{message.crm}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

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
            {/* Associates */}
            <div className="flex items-center mr-4">
              <FaUser className="mr-2 text-orange-500" />
              <span className="text-lg font-semibold text-gray-700">Associates</span>
            </div>
            {/* List */}
            <span className="text-lg font-semibold text-gray-700 mr-4">&lt;List&gt;</span>
            {/* Search Bar */}
            <div className="flex items-center mr-4">
              <FaSearch className="mr-2 text-orange-500" />
              <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {/* From Date */}
            <div className="flex items-center mr-4">
              <FaCalendarAlt className="mr-2 text-orange-500" />
              <span className="text-lg font-semibold text-gray-700">From Date</span>
            </div>
            {/* To Date */}
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-orange-500" />
              <span className="text-lg font-semibold text-gray-700">To Date</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-md">
  <table className="w-full border-collapse bg-white">
    <thead>
      <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Associates
        </th>
        <th className="py-3 px-4 text-left font-semibold">Total Sent</th>
        <th className="py-3 px-4 text-left font-semibold">Total Un-replied</th>
        <th className="py-3 px-4 text-left font-semibold">Maximum Delays</th>
      </tr>
    </thead>
    <tbody>
      {teamReport.map((report, index) => (
        <tr
          key={index}
          className={`border-b border-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-orange-50 transition-colors duration-200`}
        >
          <td className="py-3 px-4 text-gray-700">{report.associate}</td>
          <td className="py-3 px-4 text-gray-700">{report.totalSent}</td>
          <td className="py-3 px-4 text-gray-700">{report.totalUnreplied}</td>
          <td className="py-3 px-4 text-gray-700">{report.maxDelay}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      {/* Team Summary Section */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
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
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-orange-500" />
            Team’s WhatsApp Summary
          </h3>

          <div className="overflow-x-auto rounded-lg shadow-md">
  <table className="w-full border-collapse bg-white">
    <thead>
      <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <th className="py-3 px-4 text-left font-semibold">Category</th>
        <th className="py-3 px-4 text-left font-semibold">Team Member</th>
        <th className="py-3 px-4 text-left font-semibold">Details</th>
      </tr>
    </thead>
    <tbody>
      {[
        { icon: FaPaperPlane, color: "green-500", label: "Top Sender", detail: teamSummary.topSender },
        { icon: FaReply, color: "blue-500", label: "Top Replier", detail: teamSummary.topReplier },
        { icon: FaTimesCircle, color: "red-500", label: "Top Neglecter", detail: teamSummary.topNeglecter },
        { icon: FaClock, color: "yellow-500", label: "Top Delayer", detail: teamSummary.topDelayer },
        { icon: FaPaperPlane, color: "gray-500", label: "Lowest Sender", detail: teamSummary.lowestSender },
      ].map((item, index) => (
        <tr
          key={index}
          className={`border-b border-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-orange-50 transition-colors duration-200`}
        >
          <td className="py-3 px-4 flex items-center text-gray-700">
            <item.icon className={`h-5 w-5 mr-2 text-${item.color}`} />
            {item.label}
          </td>
          <td className="py-3 px-4 text-gray-700">RP Singh</td>
          <td className="py-3 px-4 text-gray-700">{item.detail}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
      </section>
    </div>
  );
};

export default WhatsAppReport;