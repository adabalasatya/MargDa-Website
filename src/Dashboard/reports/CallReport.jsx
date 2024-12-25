import React from "react";

const CallReport = () => {
  const callData = [
    {
      dateTime: "12-12-2024 05:47:55",
      callType: "Incoming",
      caller: "RP Singh 919212401007",
      receiver: "Unknown 919478805499",
      duration: "0h 0m 12s",
      record: "to pay audio",
    },
  ];

  const summaryData = [
    { callType: "Incoming", totalCalls: 47, totalTalkTime: "1h 1m 39s", avg: "0h 1m 18s" },
    { callType: "Rejected", totalCalls: 2, totalTalkTime: "0h 0m 0s", avg: "0h 0m 0s" },
    { callType: "Outgoing", totalCalls: 32, totalTalkTime: "0h 28m 35s", avg: "0h 1m 18s" },
    { callType: "Missed", totalCalls: 25, totalTalkTime: "0h 0m 0s", avg: "0h 0m 0s" },
  ];

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Call Report</h1>

        <div className="bg-white shadow-md rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Advisor</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Through</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Call Type</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">From Date</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">To Date</button>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <table className="table-auto w-full text-left text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date-Time</th>
                <th className="px-4 py-2">Call Type</th>
                <th className="px-4 py-2">Caller</th>
                <th className="px-4 py-2">Receiver</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Record</th>
              </tr>
            </thead>
            <tbody>
              {callData.map((call, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{call.dateTime}</td>
                  <td className="px-4 py-2">{call.callType}</td>
                  <td className="px-4 py-2">{call.caller}</td>
                  <td className="px-4 py-2">{call.receiver}</td>
                  <td className="px-4 py-2">{call.duration}</td>
                  <td className="px-4 py-2 text-blue-500 underline">{call.record}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <p>Showing 1 to 10 of 207 records</p>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-gray-300 rounded">Previous</button>
              <button className="px-2 py-1 bg-gray-300 rounded">1</button>
              <button className="px-2 py-1 bg-gray-300 rounded">Next</button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md p-4 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Call Summary</h2>
          <table className="table-auto w-full text-left text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Call Type</th>
                <th className="px-4 py-2">Total Calls</th>
                <th className="px-4 py-2">Total Talk Time</th>
                <th className="px-4 py-2">Average</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((summary, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{summary.callType}</td>
                  <td className="px-4 py-2">{summary.totalCalls}</td>
                  <td className="px-4 py-2">{summary.totalTalkTime}</td>
                  <td className="px-4 py-2">{summary.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
     {/* Footer */}
     <footer className="text-black text-center py-4 mt-6">
        <p>&copy; 2024 Margdarshak Media. All rights reserved.</p>
      </footer>
    </>
  );
};

export default CallReport;
