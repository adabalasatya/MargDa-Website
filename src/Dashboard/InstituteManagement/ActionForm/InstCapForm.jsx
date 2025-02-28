import React, { useState } from "react";
import Select from "react-select";
import {
  FaEdit,
  FaTrash,
  FaBook,
  FaCalendar,
  FaUserFriends,
  FaImages,
  FaInfoCircle,
  FaUniversity,
  FaArrowLeft,
  FaSearch,
  FaGraduationCap,
} from "react-icons/fa";
import { toast } from "react-toastify";

const InstCapForm = () => {
  // State for form fields
  const [courses] = useState([
    { value: 1, label: "Computer Science" },
    { value: 2, label: "Physics" },
    { value: 3, label: "Mathematics" },
  ]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [contest, setContest] = useState("");
  const [benefits, setBenefits] = useState("");
  const [pics, setPics] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [participants, setParticipants] = useState("");
  const [details, setDetails] = useState("");

  // State for contest list
  const [contestList, setContestList] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter contests based on search term
  const filteredContests = contestList.filter((contest) =>
    Object.values(contest).some((value) =>
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

  // Handle file upload
  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setPics(
      filesArray.map((file) => ({ file, url: URL.createObjectURL(file) }))
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedCourse || !contest || !endDate) {
      toast.warn("Course, Contest, and End Date are mandatory");
      return;
    }

    const newContest = {
      id: contestList.length + 1,
      courseName: selectedCourse.label,
      contest: contest,
      benefits: benefits,
      endDate: endDate,
      participants: participants,
      pics: pics.map((p) => p.file.name),
      details: details,
    };

    setContestList([...contestList, newContest]);
    toast.success("Contest added successfully!");

    // Reset form fields
    setSelectedCourse(null);
    setContest("");
    setBenefits("");
    setPics([]);
    setEndDate("");
    setParticipants("");
    setDetails("");
  };

  // Handle contest deletion
  const handleDelete = (id) => {
    setContestList(contestList.filter((contest) => contest.id !== id));
    toast.success("Contest deleted successfully!");
  };

  return (
    <div className=" min-h-screen pt-6">
      <div className="flex items-center justify-between mb-8 mt-4 relative">
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
          <FaGraduationCap className="text-4xl text-blue-500" />
          Institute Cap
        </h2>
      </div>

      <div className="max-w-6xl  mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white rounded-lg shadow-xl p-8 border border-gray-300">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course */}
          <div>
            <label className="block text-blue-700 text-sm font-bold mb-2">
              * Course
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaBook className="text-black-600" />
              <Select
                placeholder="Select Course"
                options={courses}
                value={selectedCourse}
                onChange={setSelectedCourse}
                className="flex-1"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }),
                }}
              />
            </div>
          </div>

          {/* Contest */}
          <div>
            <label className="block text-blue-700 text-sm font-bold mb-2">
              * Contest
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaInfoCircle className="text-black-600" />
              <input
                type="text"
                value={contest}
                onChange={(e) => setContest(e.target.value)}
                placeholder="Enter Contest Name"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-blue-700 text-sm font-bold mb-2">
              * Benefits
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaInfoCircle className="text-black-600" />
              <input
                type="text"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="Enter Benefits"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Pics */}
          <div>
            <label className="block text-blue-700 text-sm font-bold mb-2">
              * Upload Images
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaImages className="text-black-600" />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
              <span className="text-sm text-gray-600">
                {pics.length > 0
                  ? `${pics.length} files selected`
                  : "No files chosen"}
              </span>
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-blue-700 text-sm font-bold mb-2">
              * End Date
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaCalendar className="text-black-600" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Select End Date"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Participants */}
          <div>
            <label className="block text-blue-700 text-sm font-bold mb-2">
              {" "}
              * Participants
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-gray-50">
              <FaUserFriends className="text-black-600" />
              <input
                type="number"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="Enter Number of Participants"
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Details */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="block text-blue-700 text-sm font-bold mb-2">
              * Details
            </label>
            <div className="relative border p-3 rounded-lg shadow-sm bg-gray-50">
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter additional details"
                className="w-full pl-2 p-2 border-none bg-transparent focus:outline-none resize-none"
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
              <FaSearch className="text-blue-500" />
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

        {/* Table for Contest List */}
        <div className="mt-12">
          <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Contest
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Benefits
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  End Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Pics
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
              {currentRecords.length > 0 ? (
                currentRecords.map((contest, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contest.courseName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contest.contest}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contest.benefits}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contest.endDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contest.participants}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contest.pics.length}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contest.details}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 flex space-x-4">
                      <button
                        onClick={() => handleDelete(contest.id)}
                        className="text-red-600 hover:text-red-900 transition-all duration-200"
                      >
                        <FaTrash />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 transition-all duration-200">
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {filteredContests.length > 0 ? indexOfFirstRecord + 1 : 0}{" "}
            to {Math.min(indexOfLastRecord, filteredContests.length)} of{" "}
            {filteredContests.length} entries
            {searchTerm &&
              ` (filtered from ${contestList.length} total records)`}
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

export default InstCapForm;
