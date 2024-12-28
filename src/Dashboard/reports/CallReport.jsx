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
        <table className="w-full border-collapse border border-orange-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-orange-300 p-2">
                <FaCalendarAlt className="inline mr-2 text-orange-500" />Date-Time
              </th>
              <th className="border border-orange-300 p-2">
                <FaPhone className="inline mr-2 text-orange-500" />Call Type
              </th>
              <th className="border border-orange-300 p-2">
                <FaUser className="inline mr-2 text-orange-500" />Caller
              </th>
              <th className="border border-orange-300 p-2">
                <FaUser className="inline mr-2 text-orange-500" />Receiver
              </th>
              <th className="border border-orange-300 p-2">
                <FaClock className="inline mr-2 text-orange-500" />Duration
              </th>
              <th className="border border-orange-300 p-2">Record</th>
              <th className="border border-orange-300 p-2">CRM</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call, index) => (
              <tr key={index} className="hover:bg-orange-50">
                <td className="border border-orange-300 p-2">{call.dateTime}</td>
                <td className="border border-orange-300 p-2">{call.callType}</td>
                <td className="border border-orange-300 p-2">{call.caller}</td>
                <td className="border border-orange-300 p-2">{call.receiver}</td>
                <td className="border border-orange-300 p-2">{call.duration}</td>
                <td className="border border-orange-300 p-2">{call.record}</td>
                <td className="border border-orange-300 p-2">{call.crm}</td>
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
        <table className="w-full border-collapse border border-orange-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-orange-300 p-2">
                <FaPhone className="inline mr-2 text-orange-500" />Call Type
              </th>
              <th className="border border-orange-300 p-2">Total Calls</th>
              <th className="border border-orange-300 p-2">Total Talk Time</th>
              <th className="border border-orange-300 p-2">Average Time</th>
            </tr>
          </thead>
          <tbody>
            {teamReport.map((report, index) => (
              <tr key={index} className="hover:bg-orange-50">
                <td className="border border-orange-300 p-2">{report.callType}</td>
                <td className="border border-orange-300 p-2">{report.totalCalls}</td>
                <td className="border border-orange-300 p-2">{report.totalTalkTime}</td>
                <td className="border border-orange-300 p-2">{report.averageTime}</td>
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
            <FaUser className="h-5 w-5 mr-2 text-orange-500" />
            Team’s Call Summary
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
                    <FaArrowUp className="h-5 w-5 mr-2 text-orange-500" />
                    Top Caller
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamSummary.topCaller}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaArrowUp className="h-5 w-5 mr-2 text-orange-500" />
                    Top Receiver
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamSummary.topReceiver}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaArrowUp className="h-5 w-5 mr-2 text-orange-500" />
                    Top Talker (Outgoing)
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamSummary.topTalkerOutgoing}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaArrowUp className="h-5 w-5 mr-2 text-orange-500" />
                    Top Talker (Incoming)
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamSummary.topTalkerIncoming}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaArrowDown className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Caller
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamSummary.lowestCaller}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaArrowDown className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Receiver
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamSummary.lowestReceiver}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaArrowDown className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Talker (Outgoing)
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamSummary.lowestTalkerOutgoing}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaArrowDown className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Talker (Incoming)
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamSummary.lowestTalkerIncoming}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallReport;