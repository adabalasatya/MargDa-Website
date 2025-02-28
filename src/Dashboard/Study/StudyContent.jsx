import React, { useState } from "react";
import {
  FaBookOpen,
  FaBookReader,
  FaAngleDown,
  FaFile,
  FaEdit,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaTrash, 
} from "react-icons/fa";

const dummyData = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  course: `Course ${i % 3 + 1}`,
  subject: `Subject ${i % 5 + 1}`,
  lesson: `Lesson ${i % 4 + 1}`,
  file: `File_${i + 1}.pdf`,
}));

const StudyContent = () => {
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [lesson, setLesson] = useState("");
  const [language, setLanguage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert("Only PDF files are allowed");
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    console.log("Form submitted with:", {
      course,
      subject,
      lesson,
      language,
      file: file.name,
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Pagination logic
  const filteredData = dummyData.filter((item) =>
    item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  

  return (
    <div className="container mx-auto p-4 bg-gray-10 min-h-screen">

      <div className="flex justify-center items-center mb-8 pt-4">
        <FaBookOpen className="text-4xl text-blue-500 mr-2" />
        <h2 className="text-4xl text-primary font-bold">Study Content</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <option value="1">Course 1</option>
              <option value="2">Course 2</option>
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
              <option value="1">Subject 1</option>
              <option value="2">Subject 2</option>
            </select>
          </div>

          {/* Lesson Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaBookReader className="text-blue-500 mr-2" /> Lesson
            </label>
            <select
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Lesson</option>
              <option value="1">Lesson 1</option>
              <option value="2">Lesson 2</option>
            </select>
          </div>

          {/* Medium Selection */}
          <div className="col-span-full md:col-span-1">
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaAngleDown className="text-blue-500 mr-2" /> Medium
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a Language</option>
              <option value="1">English</option>
              <option value="2">Hindi</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="col-span-full md:col-span-2">
            <label className="block text-sm font-bold mb-2 flex items-center">
              <FaFile className="text-blue-500 mr-2" /> File Upload
            </label>
            <input type="file" onChange={handleFileChange} className="w-90 border p-2 rounded" />
            {fileName && <p className="mt-2 text-gray-600">Uploaded: {fileName}</p>}
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

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Edit", "Course", "Subject", "Lesson", "File Upload"].map((text, idx) => (
                  <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      {[FaEdit, FaBookReader, FaBookOpen, FaBookReader, FaFile][idx]({ className: "text-blue-500 mr-2" })}
                      {text}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.length > 0 ? (
                currentRecords.map((item) => (
                  <tr key={item.id}>
                     <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit className="w-4 h-4 inline" />
                  </button>&nbsp;
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash className="w-4 h-4 inline" />
                  </button>
                </td>
                    <td className="px-6 py-2">{item.course}</td>
                    <td className="px-6 py-2">{item.subject}</td>
                    <td className="px-6 py-2">{item.lesson}</td>
                    <td className="px-6 py-2">{item.file}</td>
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

export default StudyContent;

