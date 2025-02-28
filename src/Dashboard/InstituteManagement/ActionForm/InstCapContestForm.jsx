import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaBook,
  FaInfoCircle,
  FaClock,
  FaListOl,
  FaCheck,
  FaTimes,
  FaTrophy,
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";

const InstCapContestForm = () => {
  const [institute, setInstitute] = useState("University of Delhi");
  const [capList, setCapList] = useState([]);

  const [cap, setCap] = useState("");
  const [marksTotal, setMarksTotal] = useState("");
  const [marksPass, setMarksPass] = useState("");
  const [marksCorrect, setMarksCorrect] = useState("");
  const [marksWrong, setMarksWrong] = useState("");
  const [testQuestion, setTestQuestion] = useState("");
  const [testMinutes, setTestMinutes] = useState("");
  const [attempts, setAttempts] = useState("");
  const [details, setDetails] = useState("");

  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter contests based on search term
  const filteredContests = capList.filter((cap) =>
    Object.values(cap).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const recordsPerPage = parseInt(entriesPerPage, 10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredContests.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredContests.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    if (
      !cap ||
      !marksTotal ||
      !marksPass ||
      !marksCorrect ||
      !marksWrong ||
      !testQuestion ||
      !testMinutes ||
      !attempts
    ) {
      toast.warn("All fields are mandatory");
      return;
    }

    const newCap = {
      id: capList.length + 1,
      cap: cap,
      marksTotal: marksTotal,
      marksPass: marksPass,
      marksCorrect: marksCorrect,
      marksWrong: marksWrong,
      testQuestion: testQuestion,
      testMinutes: testMinutes,
      attempts: attempts,
      details: details,
    };

    setCapList([...capList, newCap]);
    toast.success("CAP added successfully!");

    // Reset form fields
    setCap("");
    setMarksTotal("");
    setMarksPass("");
    setMarksCorrect("");
    setMarksWrong("");
    setTestQuestion("");
    setTestMinutes("");
    setAttempts("");
    setDetails("");
  };

  const handleDelete = (id) => {
    setCapList(capList.filter((cap) => cap.id !== id));
    toast.success("CAP deleted successfully!");
  };

  return (
    <div className="min-h-screen pt-6">
      <div className="flex items-center justify-between mb-6 mt-4 relative">
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
          <FaTrophy className="text-4xl text-blue-500" />
          Institute Cap Contest
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white rounded-lg shadow-xl p-8 border border-gray-300">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cap Name */}
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm font-bold mb-1">
              * Cap Name
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaBook className="text-gray-600" />
              <input
                type="text"
                value={cap}
                onChange={(e) => setCap(e.target.value)}
                placeholder="Enter cap name"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Total Marks */}
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm font-bold mb-1">
              * Total Marks
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaListOl className="text-gray-600" />
              <input
                type="number"
                value={marksTotal}
                onChange={(e) => setMarksTotal(e.target.value)}
                placeholder="Enter total marks"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Pass Marks */}
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm font-bold mb-1">
              * Pass Marks
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaCheck className="text-gray-600" />
              <input
                type="number"
                value={marksPass}
                onChange={(e) => setMarksPass(e.target.value)}
                placeholder="Enter pass marks"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Marks for Correct Answer */}
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm font-bold mb-1">
              * Marks for Correct Answer*
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaCheck className="text-gray-600" />
              <input
                type="number"
                value={marksCorrect}
                onChange={(e) => setMarksCorrect(e.target.value)}
                placeholder="Enter marks for correct answer"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Marks for Wrong Answer */}
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm font-bold mb-1">
              * Marks for Wrong Answer*
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaTimes className="text-gray-600" />
              <input
                type="number"
                value={marksWrong}
                onChange={(e) => setMarksWrong(e.target.value)}
                placeholder="Enter marks for wrong answer"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Number of Test Questions */}
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm font-bold mb-1">
              * Number of Test Questions*
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaListOl className="text-gray-600" />
              <input
                type="number"
                value={testQuestion}
                onChange={(e) => setTestQuestion(e.target.value)}
                placeholder="Enter number of test questions"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Test Duration (minutes) */}
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm font-bold mb-1">
              * Test Duration (minutes)*
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaClock className="text-gray-600" />
              <input
                type="number"
                value={testMinutes}
                onChange={(e) => setTestMinutes(e.target.value)}
                placeholder="Enter test duration"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Number of Attempts Allowed */}
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm font-bold mb-1">
              * Number of Attempts Allowed*
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaInfoCircle className="text-gray-600" />
              <input
                type="number"
                value={attempts}
                onChange={(e) => setAttempts(e.target.value)}
                placeholder="Enter number of attempts allowed"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Details */}
          <div className="col-span-full flex flex-col gap-2">
            <h2 className="text-lg text-blue-700 font-semibold flex items-center gap-2">
              <FaInfoCircle className="text-black-600" />
              Details
            </h2>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Details"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
        >
          Submit
        </button>

        {/* New table controls */}
        <div className="flex justify-between items-center my-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 bg-gray-50"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-gray-600">entries</span>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Table for CAP List */}
        <div className="mt-12">
          <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Total Marks
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Pass Marks
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Correct Marks
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Wrong Marks
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Test Questions
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Test Minutes
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((cap, index) => (
                <tr
                  key={cap.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cap.marksTotal}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cap.marksPass}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cap.marksCorrect}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cap.marksWrong}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cap.testQuestion}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cap.testMinutes}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cap.details}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 flex space-x-4">
                    <button
                      onClick={() => handleDelete(cap.id)}
                      className="text-red-600 hover:text-red-900 transition-all duration-200"
                    >
                      <FaTrash />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 transition-all duration-200">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {filteredContests.length > 0 ? indexOfFirstRecord + 1 : 0}{" "}
            to {Math.min(indexOfLastRecord, filteredContests.length)} of{" "}
            {filteredContests.length} entries
            {searchTerm && ` (filtered from ${capList.length} total records)`}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            <span className="px-4 py-2 border rounded-md bg-blue-50 text-blue-600">
              {currentPage}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstCapContestForm;
