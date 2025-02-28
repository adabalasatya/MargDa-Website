import React, { useState } from "react";
import {
  FaBookOpen,
  FaBookReader,
  FaAngleDown,
  FaEdit,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaTrash,
  FaHandPointDown,
  FaLongArrowAltLeft,
  FaPenSquare,
  FaPrint,
} from "react-icons/fa";

const dummyData = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  course: `Course ${i % 3 + 1}`,
  subject: `Subject ${i % 5 + 1}`,
  lesson: `Lesson ${i % 4 + 1}`,
  link: `Link_${i + 1}.com`,
}));

const TeacherDashboard = () => {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { day, time });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const filteredData = dummyData.filter((item) =>
    item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="container mx-auto p-4 bg-gray-10 min-h-screen">
      <div className="flex justify-center items-center mb-8 pt-4">
        <FaBookOpen className="text-4xl text-blue-500 mr-2" />
        <h2 className="text-4xl text-primary font-bold">For Teachers</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Day Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookReader className="text-blue-500 mr-2" /> Select Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Day</option>
              <option value="M">Monday</option>
            </select>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookOpen className="text-blue-500 mr-2" /> Select Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Time</option>
              {/* Add more time options as needed */}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>

        {/* Table Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <label>Show </label>
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="border p-1 rounded"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <label> entries</label>
            </div>
            <div className="flex items-center">
              <FaSearch className="mr-2 text-blue-500" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr>
                {[
                  { text: "Action", icon: FaHandPointDown },
                  { text: "Course", icon: FaBookReader },
                  { text: "Subject", icon: FaLongArrowAltLeft },
                  { text: "Lesson", icon: FaPenSquare },
                  { text: "Link", icon: FaPrint },
                ].map(({ text, icon }, idx) => (
                  <th key={idx} className="px-4 py-2 border-b text-left">
                    <div className="flex items-center">
                      {icon({ className: "text-blue-500 mr-2" })} 
                      {text}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((item) => (
                  <tr key={item.id} className="odd:bg-gray-50 even:bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit className="w-4 h-4 inline" />
                      </button> 
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash className="w-4 h-4 inline" />
                      </button>
                    </td>
                    <td className="px-4 py-2 border-b">{item.course}</td>
                    <td className="px-4 py-2 border-b">{item.subject}</td>
                    <td className="px-4 py-2 border-b">{item.lesson}</td>
                    <td className="px-4 py-2 border-b">
                      <a href="#" className="text-blue-500">{item.link}</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-4">No data available</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <span>
              Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} records
            </span>

            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
              >
                <FaAngleLeft />
              </button>

              <span className="px-4 py-1 border rounded bg-blue-500 text-white">
                {currentPage}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
        <span>Margdarshak © {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">Support</a>
          <a href="#" className="hover:text-blue-600">Help Center</a>
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default TeacherDashboard;

