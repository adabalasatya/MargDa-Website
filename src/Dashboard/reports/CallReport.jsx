import React from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaPhone,
  FaUser,
  FaClock,
  FaArrowDown,
  FaArrowUp,
} from 'react-icons/fa';

const CallReport = () => {
  // Sample data for calls
  const calls = [
    {
      dateTime: '12-12-2024 05:47:55',
      callType: 'Incoming',
      caller: 'RP Singh (919212401007)',
      receiver: 'Unknown (919478805499)',
      duration: '0h 0m 12s',
      record: 'to pay audio (No download)',
      crm: 'CRM+',
    },
    // Add more call data here
  ];

  // Sample data for team report
  const teamReport = [
    {
      callType: 'Incoming',
      totalCalls: 47,
      totalTalkTime: '1h 1m 39s',
      averageTime: '0h 1m 18s',
    },
    {
      callType: 'Rejected',
      totalCalls: 2,
      totalTalkTime: '0h 0m 0s',
      averageTime: '0h 1m 18s',
    },
    {
      callType: 'Outgoing',
      totalCalls: 32,
      totalTalkTime: '0h 28m 35s',
      averageTime: '0h 1m 18s',
    },
    {
      callType: 'Missed',
      totalCalls: 25,
      totalTalkTime: '0h 0m 0s',
      averageTime: '0h 1m 18s',
    },
    {
      callType: 'All In + Out',
      totalCalls: 66,
      totalTalkTime: '0h 28m 35s',
      averageTime: '0h 28m 35s',
    },
  ];

  // Sample data for team summary
  const teamSummary = {
    topCaller: 'RP Singh (919212401007) - 32 Calls - 0h 28m 35s',
    topReceiver: 'RP Singh (919212401007) - 43 Calls - 0h 59m 49s',
    topTalkerOutgoing: 'RP Singh (919212401007) - 0h 5m 6s',
    topTalkerIncoming: 'RP Singh (919212401007) - 0h 5m 6s',
    lowestCaller: 'RP Singh (919212401007) - 32 Calls - 0h 28m 35s',
    lowestReceiver: 'RP Singh (919212401007) - 43 Calls - 0h 59m 49s',
    lowestTalkerOutgoing: 'RP Singh (919212401007) - Outgoing - 0h 5m 6s',
    lowestTalkerIncoming: 'RP Singh (919212401007) - Incoming - 0h 5m 6s',
  };

  return (
    <div className="p-4">
      {/* Call Report Section */}
      <div className="mb-8">
  <h1 className="text-2xl font-bold mb-4 text-orange-500">Call Report</h1>
  <div className="flex space-x-16 mb-4">
    <span className="text-lg font-semibold text-black-700">&lt;Your Call&gt;</span>
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
            <span className="ml-2">Records</span>
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

        {/* Table for Calls */}
        <div className="overflow-x-auto rounded-lg shadow-md">
  <table className="w-full border-collapse bg-white">
    <thead>
      <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <th className="py-3 px-4 text-left font-semibold">
          <FaCalendarAlt className="inline mr-2" />Date-Time
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaPhone className="inline mr-2" />Call Type
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Caller
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Receiver
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaClock className="inline mr-2" />Duration
        </th>
        <th className="py-3 px-4 text-left font-semibold">Record</th>
        <th className="py-3 px-4 text-left font-semibold">CRM</th>
      </tr>
    </thead>
    <tbody>
      {calls.map((call, index) => (
        <tr
          key={index}
          className={`border-b border-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-orange-50 transition-colors duration-200`}
        >
          <td className="py-3 px-4 text-gray-700">{call.dateTime}</td>
          <td className="py-3 px-4 text-gray-700">{call.callType}</td>
          <td className="py-3 px-4 text-gray-700">{call.caller}</td>
          <td className="py-3 px-4 text-gray-700">{call.receiver}</td>
          <td className="py-3 px-4 text-gray-700">{call.duration}</td>
          <td className="py-3 px-4 text-gray-700">{call.record}</td>
          <td className="py-3 px-4 text-gray-700">{call.crm}</td>
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
        <h2 className="text-xl font-bold mb-4 text-orange-500">Your Team's Call Report</h2>
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
          <FaPhone className="inline mr-2" />Call Type
        </th>
        <th className="py-3 px-4 text-left font-semibold">Total Calls</th>
        <th className="py-3 px-4 text-left font-semibold">Total Talk Time</th>
        <th className="py-3 px-4 text-left font-semibold">Average Time</th>
      </tr>
    </thead>
    <tbody>
      {teamReport.map((report, index) => (
        <tr
          key={index}
          className="border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200"
        >
          <td className="py-3 px-4 text-gray-700">{report.callType}</td>
          <td className="py-3 px-4 text-gray-700">{report.totalCalls}</td>
          <td className="py-3 px-4 text-gray-700">{report.totalTalkTime}</td>
          <td className="py-3 px-4 text-gray-700">{report.averageTime}</td>
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
            Team’s Call Summary
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
        { icon: FaArrowUp, color: "orange-500", label: "Top Caller", detail: teamSummary.topCaller },
        { icon: FaArrowUp, color: "orange-500", label: "Top Receiver", detail: teamSummary.topReceiver },
        { icon: FaArrowUp, color: "orange-500", label: "Top Talker (Outgoing)", detail: teamSummary.topTalkerOutgoing },
        { icon: FaArrowUp, color: "orange-500", label: "Top Talker (Incoming)", detail: teamSummary.topTalkerIncoming },
        { icon: FaArrowDown, color: "orange-500", label: "Lowest Caller", detail: teamSummary.lowestCaller },
        { icon: FaArrowDown, color: "orange-500", label: "Lowest Receiver", detail: teamSummary.lowestReceiver },
        { icon: FaArrowDown, color: "orange-500", label: "Lowest Talker (Outgoing)", detail: teamSummary.lowestTalkerOutgoing },
        { icon: FaArrowDown, color: "orange-500", label: "Lowest Talker (Incoming)", detail: teamSummary.lowestTalkerIncoming },
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
          <td className="py-3 px-4 text-gray-700">RP Singh (919212401007)</td>
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

export default CallReport;