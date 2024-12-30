import React from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
  FaClock,
  FaPaperclip,
  FaEye,
  FaPaperPlane,
  FaReply,
  FaTimesCircle,
} from 'react-icons/fa';

const EmailReport = () => {
  const emails = [
    {
      dateTime: '10-12-2024 00:00',
      smtp: 'Gmail, Outlook, AWS',
      sender: 'SK Sharma',
      receiver: 'Email',
      subject: 'Invitation for a virtual meeting',
      matter: '<View>',
      attach: '<Attach> if any',
      viewTime: 'Last view Date+Time',
      crm: 'CRM+',
    },
    // Add more email data here
  ];

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

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="mb-8">
  <h1 className="text-2xl font-bold mb-4 text-orange-500">Email Report</h1>
  <div className="flex space-x-16 mb-4">
    <span className="text-lg font-semibold text-black-700">&lt;Your Email&gt;</span>
    <span className="text-lg font-semibold text-black-700">&lt;Team Report&gt;</span>
    <span className="text-lg font-semibold text-black-700">&lt;Team Summary&gt;</span>
  </div>
</div>

      {/* Email Report Section */}
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
        {/* New Section for "Show [ ] records" and "Search [ ]" */}
        <div className="flex justify-between items-center mb-4">
          {/* Left Side: Show [ ] records */}
          <div className="flex items-center">
            <span className="mr-2">Show</span>
            <input
              type="number"
              className="border p-2 rounded w-20 focus:border-orange-500 focus:ring-orange-500"
              placeholder="10"
            />
            <span className="ml-2">Records</span>
          </div>

          {/* Right Side: Search Bar */}
          <div className="flex items-center">
            <FaSearch className="mr-2 text-orange-500" />
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
  <table className="w-full border-collapse bg-white">
    <thead>
      <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <th className="py-3 px-4 text-left font-semibold">
          <FaCalendarAlt className="inline mr-2" />Date-Time
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaEnvelope className="inline mr-2" />SMTP
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Sender
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Receiver
        </th>
        <th className="py-3 px-4 text-left font-semibold">Subject</th>
        <th className="py-3 px-4 text-left font-semibold">Matter</th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaPaperclip className="inline mr-2" />Attach
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaEye className="inline mr-2" />View+Time
        </th>
        <th className="py-3 px-4 text-left font-semibold">CRM</th>
      </tr>
    </thead>
    <tbody>
      {emails.map((email, index) => (
        <tr
          key={index}
          className={`border-b border-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-orange-50 transition-colors duration-200`}
        >
          <td className="py-3 px-4 text-gray-700">{email.dateTime}</td>
          <td className="py-3 px-4 text-gray-700">{email.smtp}</td>
          <td className="py-3 px-4 text-gray-700">{email.sender}</td>
          <td className="py-3 px-4 text-gray-700">{email.receiver}</td>
          <td className="py-3 px-4 text-gray-700">{email.subject}</td>
          <td className="py-3 px-4 text-gray-700">{email.matter}</td>
          <td className="py-3 px-4 text-gray-700">{email.attach}</td>
          <td className="py-3 px-4 text-gray-700">{email.viewTime}</td>
          <td className="py-3 px-4 text-gray-700">{email.crm}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

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
  <h2 className="text-xl font-bold mb-4 text-orange-500">Your Team's Email Report</h2>
  {/* Header with all elements in the same line */}
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

  {/* Table */}
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
            <FaEnvelope className="text-orange-500 h-5 w-5 mr-2" />
            Team’s Email Summary
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
        { icon: FaPaperPlane, color: "green-500", label: "Top Sender", detail: "32 SMS" },
        { icon: FaReply, color: "blue-500", label: "Top Replier", detail: "32 SMS" },
        { icon: FaTimesCircle, color: "red-500", label: "Top Neglecter", detail: "49 SMS" },
        { icon: FaClock, color: "yellow-500", label: "Top Delayer", detail: "34 SMS" },
        { icon: FaPaperPlane, color: "gray-500", label: "Lowest Sender", detail: "32 SMS" },
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

export default EmailReport;