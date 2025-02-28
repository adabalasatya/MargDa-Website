import React, { useState } from "react";
import {
  FaBookOpen, FaBookReader, FaCalendarPlus, FaAngleLeft, FaAngleRight, FaSearch, FaBook, FaVideo, FaChalkboardTeacher,
  FaFileAlt, FaPlayCircle, FaPenFancy, FaTasks, FaTools, FaQuestionCircle, FaArrowLeft, FaUser, FaStar, FaDownload, FaUpload, FaPhone
} from "react-icons/fa";
import { FaCalendarDays } from 'react-icons/fa6';

const InteractiveClass = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false); // Simulate loading state
  
  const [formData, setFormData] = useState({
    course: '',
    subject: '',
    lesson: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Updated dummy data for table
  const dummyData = [
    {
      id: 1,
      course: "Mathematics",
      subject: "Algebra",
      lesson: "Linear Equations",
      teacher: "Mr. John Doe",
      teacherImg: "https://via.placeholder.com/50",
      date: "2023-10-01",
      pdf: "algebra.pdf",
      ppt: "algebra.ppt",
      videoUrl: "https://example.com/video1",
      testUrl: "https://example.com/test1",
      marks: "85/100",
      assignmentUrl: "https://example.com/assignment1",
      queriesTime: "3 PM to 4 PM",
      ratings: 4.5,
      remarks: "Good performance, needs improvement in solving complex equations",
      logs: 2,
    },
    {
      id: 2,
      course: "Physics",
      subject: "Mechanics",
      lesson: "Kinematics",
      teacher: "Ms. Jane Smith",
      teacherImg: "https://via.placeholder.com/50",
      date: "2023-10-02",
      pdf: "kinematics.pdf",
      ppt: "kinematics.ppt",
      videoUrl: "https://example.com/video2",
      testUrl: "https://example.com/test2",
      marks: "90/100",
      assignmentUrl: "https://example.com/assignment2",
      queriesTime: "2 PM to 3 PM",
      ratings: 4.8,
      remarks: "Excellent understanding of concepts",
      logs: 3,
    },
  ];

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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-10 p-6 ">

    <div className="flex items-center justify-between py-4 mb-8">
    <button
    onClick={() => window.history.back()}
    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition flex items-center"
    >
    <FaArrowLeft className="mr-2" />
    Back
   </button>
    <div className="flex-1 flex justify-center items-center">
    <h2 className="text-4xl font-bold text-gray-800 flex items-center">
      <FaCalendarPlus className="text-blue-600 mr-2 " />
      Interactive Class
     </h2>
     </div>
    <div className="w-[120px]"></div> {/* Spacer to balance the layout */}
     </div>
    
      {/* Form Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-300">
        <form onSubmit={handleSubmit} id="organiserForm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form fields */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FaBook className="text-blue-600 mr-2" /> Select Course / Exam
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
              >
                <option value="">Select a Course</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FaBookOpen className="text-blue-600 mr-2" /> Select Subject / Module
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value="">Select a Subject</option>
                <option value="Algebra">Algebra</option>
                <option value="Mechanics">Mechanics</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FaBookReader className="text-blue-600 mr-2" /> Select Lesson
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                id="lesson"
                name="lesson"
                value={formData.lesson}
                onChange={handleInputChange}
              >
                <option value="">Select a Lesson</option>
                <option value="Linear Equations">Linear Equations</option>
                <option value="Kinematics">Kinematics</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Table Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Show </label>
            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <label className="text-gray-700"> entries</label>
          </div>
          <div className="flex items-center space-x-2">
            <FaSearch className="text-blue-600" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
        
        {/* Table */}
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading...</p>
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    { text: "Your Teacher", icon: FaUser, width: "w-2/12" },
                    { text: "Attend Class", icon: FaVideo, width: "w-1/12" },
                    { text: "Read Content", icon: FaFileAlt, width: "w-2/12" },
                    { text: "Watch Video", icon: FaPlayCircle, width: "w-1/12" },
                    { text: "Give Test", icon: FaPenFancy, width: "w-1/12" },
                    { text: "Complete Assignment", icon: FaTasks, width: "w-2/12" },
                    { text: "Discuss Queries", icon: FaQuestionCircle, width: "w-2/12" },
                  ].map(({ text, icon, width }, idx) => (
                    <th key={idx} className={`px-2 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${width}`}>
                      <div className="flex items-center">
                        {React.createElement(icon, { className: "text-blue-600 mr-1" })}
                        {text}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    {/* Your Teacher */}
                    <td className="px-2 py-3 whitespace-normal text-xs">
                      <div className="flex items-center">
                        <img src={item.teacherImg} alt="Teacher" className="w-8 h-8 rounded-full mr-2 shadow-sm" />
                        <div>
                          <p className="text-gray-800 font-semibold">{item.teacher}</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            Ratings: {item.ratings} <FaStar className="ml-1 text-yellow-500" />
                          </p>
                          <p className="text-xs text-gray-500">Remarks: {item.remarks}</p>
                        </div>
                      </div>
                    </td>

                    {/* Attend Class */}
                    <td className="px-2 py-3 whitespace-normal text-xs">
                      <p className="text-gray-700">Date: {item.date}</p>
                      <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Join</a>
                    </td>

                    {/* Read Content */}
                    <td className="px-2 py-3 whitespace-normal text-xs">
                      <p className="text-gray-700">PDF: <a href={item.pdf} className="text-blue-600 hover:underline">Download</a></p>
                      <p className="text-gray-700">PPT: <a href={item.ppt} className="text-blue-600 hover:underline">Download</a></p>
                    </td>

                    {/* Watch Video */}
                    <td className="px-2 py-3 whitespace-normal text-xs">
                      <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Watch</a>
                    </td>

                    {/* Give Test */}
                    <td className="px-2 py-3 whitespace-normal text-xs">
                      <a href={item.testUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Test</a>
                      <p className="text-gray-700">Marks: {item.marks}</p>
                    </td>

                    {/* Complete Assignment */}
                    <td className="px-2 py-3 whitespace-normal text-xs">
                      <a href={item.assignmentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Download</a>
                      <button className="mt-1 px-2 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center text-xs" title="Upload Assignment">
                        <FaUpload className="mr-1" /> Upload
                      </button>
                    </td>

                    {/* Discuss Queries */}
                    <td className="px-2 py-3 whitespace-normal text-xs">
                      <p className="text-gray-700">{item.queriesTime}</p>
                      <button className="mt-1 px-2 py-1 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center text-xs" title="Call Teacher">
                        <FaPhone className="mr-1" /> Call
                      </button>
                      <p className="text-xs text-gray-500">Logs: {item.logs}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
       
      </section>

       {/* Pagination Controls */}
       <div className="flex justify-between items-center mt-4 ">
          <span className="text-black-700 text-sm">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} records
          </span>

          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-300 rounded-lg shadow-sm ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-blue-600 text-white hover:bg-blue-700"} transition`}
            >
              <FaAngleLeft />
            </button>

            <span className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm bg-blue-600 text-white">
              {currentPage}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-300 rounded-lg shadow-sm ${currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-blue-600 text-white hover:bg-blue-700"} transition`}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

    </div>
  );
};

export default InteractiveClass;