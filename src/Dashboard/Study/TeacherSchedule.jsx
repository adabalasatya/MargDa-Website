
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
  FaClock,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare,FaCalendarDays, FaChalkboardUser } from 'react-icons/fa6';

const dummyData = [
  {
    id: 1,
    lesson: "PR, Digital & Social Media",
    medium: "English",
    classDay: "Monday",
    classTime: "11:00 AM",
  },
];

const TeacherSchedule = () => {
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [lesson, setLesson] = useState("");
  const [language, setLanguage] = useState("");
  const [classDay, setClassDay] = useState("");
  const [classTime, setClassTime] = useState("");
  const [classTimings, setClassTimings] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle adding class timings
  const addTiming = () => {
    if (classTime.trim()) {
      const newTime = classTimings ? `${classTimings}, ${classTime}` : classTime;
      setClassTimings(newTime);
      setClassTime(""); // Clear the input after adding
    }
  };

  // Function to handle clearing timings
  const clearTimings = () => {
    setClassTimings("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { course, subject, lesson, language, classDay, classTimings });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const filteredData = dummyData.filter((item) =>
    item.lesson.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-4xl text-primary font-bold">Teacher Schedule</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Course Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookReader className="text-blue-500 mr-2" /> Select Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Course</option>
              <option value="1">Career Counselling</option>
            </select>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookOpen className="text-blue-500 mr-2" /> Select Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Subject</option>
              {/* Options will be dynamically populated */}
            </select>
          </div>

          {/* Lesson Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaChalkboardUser className="text-blue-500 mr-2" /> Select Lesson
            </label>
            <select
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Lesson</option>
              {/* Options will be dynamically populated */}
            </select>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaAngleDown className="text-blue-500 mr-2" /> Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Language</option>
              <option value="1">English</option>
              <option value="2">Hindi</option>
              {/* Add other language options */}
            </select>
          </div>

          {/* Class Day Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaCalendarDays className="text-blue-500 mr-2" /> Class Day
            </label>
            <select
              value={classDay}
              onChange={(e) => setClassDay(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Day</option>
              <option value="U">Sunday</option>
              <option value="M">Monday</option>
              <option value="T">Tuesday</option>
              <option value="W">Wednesday</option>
              <option value="H">Thursday</option>
              <option value="F">Friday</option>
              <option value="S">Saturday</option>
            </select>
          </div>

          {/* Add Class Timings */}
          <div >
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaClock className="text-blue-500 mr-2" /> Add Class Timings
            </label>
            <div className="flex w-full">
              <input 
                type="text" 
                value={classTime} 
                onChange={(e) => setClassTime(e.target.value)} 
                placeholder="HH:SS AM" 
                className="w-1/2 border p-2 rounded"
              />
              <button 
                type="button" 
                onClick={addTiming} 
                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Timings
              </button>
              <button 
                type="button" 
                onClick={clearTimings} 
                className="ml-2 bg-gray-500 text-white py-2 px-4 rounded"
              >
                Clear Timings
              </button>
            </div>
          </div>

          {/* Class Timings Display */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaArrowUpRightFromSquare className="text-blue-500 mr-2" /> Class Timings
            </label>
            <input 
              type="text" 
              value={classTimings} 
              readOnly 
              className="w-full border p-2 rounded" 
            />
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
                {["Action", "Lesson", "Medium", "Class Day", "Class Time"].map((text, idx) => (
                  <th key={idx} className="px-4 py-2 border-b text-left">
                    {text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((item) => (
                  <tr key={item.id} className="odd:bg-gray-50 even:bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash className="w-4 h-4 inline" onClick={() => console.log("Delete", item.id)} />
                      </button> 
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit className="w-4 h-4 inline" onClick={() => console.log("Edit", item.id)} />
                      </button>
                    </td>
                    <td className="px-4 py-2 border-b">{item.lesson}</td>
                    <td className="px-4 py-2 border-b">{item.medium}</td>
                    <td className="px-4 py-2 border-b">{item.classDay}</td>
                    <td className="px-4 py-2 border-b">{item.classTime}</td>
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

export default TeacherSchedule;

