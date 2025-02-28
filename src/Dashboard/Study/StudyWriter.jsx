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
  FaGlobe,
  FaHandPointDown,
} from "react-icons/fa";
import {
  FaRegPenToSquare,
  FaRegCalendarDays,
  FaCalendarDays,
  FaPenToSquare,
} from "react-icons/fa6";

const dummyData = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  writer: {
    name: "RP Singh",
    email: "nicemarg@gmail.com",
    phone: "917838681293",
  },
  course: "Career Counselling",
  subject: [
    "Career Professional Practices",
    "Virtual Platform & Team",
    "PR, Digital & Social Media",
    "Communication and CRM",
    "Counselling and Guidance",
    "Adolescence Psychology",
    "Parents as Career Planners",
    "Education in India",
    "Study Abroad",
    "Scholarships & Fundings",
    "World of Occupations",
    "Psychometric Career Assessments",
    "Employability Skills",
    "Personality Development",
    "Job Planning to Placement",
    "Human Resource Management",
    "Interactive Learning & CMS",
    "Career Education in School",
  ][i % 18],
  medium: "English",
  lastDate: new Date(2026 + i, i % 12, i * 2 + 9).toISOString().split("T")[0],
}));

const StudyWriter = () => {
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [writer, setWriter] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      course,
      subject,
      language,
      writer,
      lastDate,
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const filteredData = dummyData.filter(
    (item) =>
      item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.medium.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-10 min-h-screen">
      <div className="flex justify-center items-center mb-8 pt-4">
        <FaPenToSquare className="text-4xl text-blue-500 mr-2" />
        <h2 className="text-4xl text-primary font-bold">Study Writer</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <form
          onSubmit={handleSubmit}
          id="studyWriterForm"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
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

          {/* Medium Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaGlobe className="text-blue-500 mr-2" /> Medium
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Medium</option>
              <option value="1">English</option>
              <option value="2">Hindi</option>
              <option value="6">Marathi</option>
              <option value="7">Kannad</option>
              <option value="8">Gujrati</option>
              <option value="9">Malyalam</option>
              <option value="12">Kannada</option>
              <option value="13">Tamil</option>
              <option value="14">Oriya</option>
              <option value="15">Odia</option>
              <option value="16">Telugu</option>
              <option value="17">Bhopuri</option>
              <option value="18">Khortha</option>
              <option value="20">Urdu</option>
            </select>
          </div>

          {/* Writer Input */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaRegPenToSquare className="text-blue-500 mr-2" /> Writer
            </label>
            <div className="input-group">
              <input type="hidden" name="writer" id="writer" value={writer} />
              <input
                type="text"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Search"
                data-bs-toggle="modal"
                data-bs-target="#teacher3_modal"
              />
            </div>
          </div>

          {/* Last Date Input */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaRegCalendarDays className="text-blue-500 mr-2" /> Last Date
            </label>
            <input
              type="date"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
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
                  { text: "Writer", icon: FaPenToSquare },
                  { text: "Course", icon: FaBookReader },
                  { text: "Subject", icon: FaBookOpen },
                  { text: "Medium", icon: FaGlobe },
                  { text: "Last Date", icon: FaCalendarDays },
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
              {currentRecords.map((item) => (
                <tr key={item.id} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash
                        className="w-4 h-4 inline"
                        onClick={() => console.log("Delete", item.id)}
                      />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 ml-2">
                      <FaEdit
                        className="w-4 h-4 inline"
                        onClick={() => console.log("Edit", item.id)}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div>{item.writer.name}</div>
                    <div>{item.writer.email}</div>
                    <div>{item.writer.phone}</div>
                  </td>
                  <td className="px-4 py-2 border-b">{item.course}</td>
                  <td className="px-4 py-2 border-b">{item.subject}</td>
                  <td className="px-4 py-2 border-b">{item.medium}</td>
                  <td className="px-4 py-2 border-b">{item.lastDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <span>
              Showing {indexOfFirstRecord + 1} to{" "}
              {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords}{" "}
              records
            </span>

            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
              >
                <FaAngleLeft />
              </button>

              <span className="px-4 py-1 border rounded bg-blue-500 text-white">
                {currentPage}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white"
                }`}
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

export default StudyWriter;
