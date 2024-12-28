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
        <table className="w-full border-collapse border border-orange-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-orange-300 p-2">
                <FaCalendarAlt className="inline mr-2 text-orange-500" />Date-Time
              </th>
              <th className="border border-orange-300 p-2">
                <FaEnvelope className="inline mr-2 text-orange-500" />SMTP
              </th>
              <th className="border border-orange-300 p-2">
                <FaUser className="inline mr-2 text-orange-500" />Sender
              </th>
              <th className="border border-orange-300 p-2">
                <FaUser className="inline mr-2 text-orange-500" />Receiver
              </th>
              <th className="border border-orange-300 p-2">Subject</th>
              <th className="border border-orange-300 p-2">Matter</th>
              <th className="border border-orange-300 p-2">
                <FaPaperclip className="inline mr-2 text-orange-500" />Attach
              </th>
              <th className="border border-orange-300 p-2">
                <FaEye className="inline mr-2 text-orange-500" />View+Time
              </th>
              <th className="border border-orange-300 p-2">CRM</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <tr key={index} className="hover:bg-orange-50">
                <td className="border border-orange-300 p-2">{email.dateTime}</td>
                <td className="border border-orange-300 p-2">{email.smtp}</td>
                <td className="border border-orange-300 p-2">{email.sender}</td>
                <td className="border border-orange-300 p-2">{email.receiver}</td>
                <td className="border border-orange-300 p-2">{email.subject}</td>
                <td className="border border-orange-300 p-2">{email.matter}</td>
                <td className="border border-orange-300 p-2">{email.attach}</td>
                <td className="border border-orange-300 p-2">{email.viewTime}</td>
                <td className="border border-orange-300 p-2">{email.crm}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-200 text-black-700">
                <tr>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Team Member</th>
                  <th className="py-2 px-4">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaPaperPlane className="text-green-500 h-5 w-5 mr-2" />
                    Top Sender
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">32 SMS</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaReply className="text-blue-500 h-5 w-5 mr-2" />
                    Top Replier
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">32 SMS</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaTimesCircle className="text-red-500 h-5 w-5 mr-2" />
                    Top Neglecter
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">49 SMS</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaClock className="text-yellow-500 h-5 w-5 mr-2" />
                    Top Delayer
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">34 SMS</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaPaperPlane className="text-gray-500 h-5 w-5 mr-2" />
                    Lowest Sender
                  </td>
                  <td className="py-2 px-4">RP Singh</td>
                  <td className="py-2 px-4">32 SMS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailReport;