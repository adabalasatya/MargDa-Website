import React, { useState } from "react";

const ResultsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Number of records per page

  // Mock data function (Replace with API response)
  const sortedData = () => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      testDate: `2025-02-${(i % 28) + 1}`,
      totalQuestions: 20,
      attempted: 18,
      right: 15,
      wrong: 3,
      totalMarks: 100,
      markReceived: 75,
      percentage: "75%",
    }));
  };

  const totalRecords = sortedData().length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastItem = currentPage * recordsPerPage;
  const indexOfFirstItem = indexOfLastItem - recordsPerPage;
  const currentItems = sortedData().slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-gray-10 min-h-screen">
      <h2 className="text-2xl font-semibold flex justify-center items-center gap-2">
        <span className="text-blue-500">📊</span> Results
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {["Course", "Subject", "Select Lesson"].map((label, idx) => (
            <div key={idx}>
              <label className="flex items-center gap-2 font-semibold">
                <span className="text-blue-500">📘</span> {label}
              </label>
              <select className="w-full p-2 border rounded">
                <option>Select {label}</option>
              </select>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <label>Show </label>
            <select className="border p-1 rounded">
              <option>10</option>
            </select>
            <label> entries</label>
          </div>
          <div className="flex items-center border p-1 rounded">
            <span className="text-gray-500">🔍</span>
            <input
              type="text"
              className="border-none outline-none ml-2"
              placeholder="Search..."
            />
          </div>
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-left">
              {[
                "📅 Test Date",
                "📋 Total Questions",
                "📊 Attempted",
                "✔ Right",
                "❌ Wrong",
                "📈 Total Marks",
                "📉 Mark Received",
                "📊 % Percentage",
              ].map((heading, idx) => (
                <th key={idx} className="p-2 border">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className="border">
                  <td className="p-2 border">{item.testDate}</td>
                  <td className="p-2 border">{item.totalQuestions}</td>
                  <td className="p-2 border">{item.attempted}</td>
                  <td className="p-2 border">{item.right}</td>
                  <td className="p-2 border">{item.wrong}</td>
                  <td className="p-2 border">{item.totalMarks}</td>
                  <td className="p-2 border">{item.markReceived}</td>
                  <td className="p-2 border">{item.percentage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Record Information and Pagination on the same line */}
        <div className="flex justify-between items-center py-3">
          <div className="text-black-500">
            Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalRecords)} of {totalRecords} records
          </div>
          <div className="flex items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
             &lt;&lt; Prev
            </button>
            <span className="mx-3 font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next &gt;&gt;
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
<footer className="mt-8 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
        <span>Margdarshak © {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">
            Support
          </a>
          <a href="#" className="hover:text-blue-600">
            Help Center
          </a>
          <a href="#" className="hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms
          </a>
        </div>
 </footer>

    </div>
  );
};

export default ResultsPage;
