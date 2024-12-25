import React from "react";

const WhatsAppReport = () => {
  const reportData = [
    {
      dateTime: "12-12-2024 05:47:55",
      through: "App",
      advisor: "RP Singh",
      client: "John Doe",
      content: "Message content",
      repliedDelay: "2 days",
    },
  ];

  const summaryData = [
    { advisor: "RP Singh", totalSent: 47, totalUnReplied: 23, maxDelay: "12 days" },
    { advisor: "SK Sharma", totalSent: 2, totalUnReplied: 12, maxDelay: "1 day" },
  ];

  return (
   <>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">WhatsApp Report</h1>

        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Advisor</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Through</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">User</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">From Date</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">To Date</button>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Report Table */}
        <div className="bg-white shadow-md rounded-md p-4">
          <table className="table-auto w-full text-left text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date-Time</th>
                <th className="px-4 py-2">Through</th>
                <th className="px-4 py-2">Advisor</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Content</th>
                <th className="px-4 py-2">Replied Delay</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((data, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{data.dateTime}</td>
                  <td className="px-4 py-2">{data.through}</td>
                  <td className="px-4 py-2">{data.advisor}</td>
                  <td className="px-4 py-2">{data.client}</td>
                  <td className="px-4 py-2">{data.content}</td>
                  <td className="px-4 py-2">{data.repliedDelay}</td>
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

        {/* Summary Section */}
        <div className="bg-white shadow-md rounded-md p-4 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">WhatsApp Summary</h2>
          <table className="table-auto w-full text-left text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Advisor</th>
                <th className="px-4 py-2">Total Sent</th>
                <th className="px-4 py-2">Total Un-replied</th>
                <th className="px-4 py-2">Maximum Delay</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((summary, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{summary.advisor}</td>
                  <td className="px-4 py-2">{summary.totalSent}</td>
                  <td className="px-4 py-2">{summary.totalUnReplied}</td>
                  <td className="px-4 py-2">{summary.maxDelay}</td>
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

export default WhatsAppReport;
