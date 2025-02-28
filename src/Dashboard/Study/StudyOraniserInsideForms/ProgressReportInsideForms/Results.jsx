import React, { useState } from "react";
import {
  FaBookOpen, FaBookReader, FaCalendarPlus, FaClock, FaAngleLeft, 
  FaAngleRight, FaSearch, FaTrash, FaEdit, FaBook
} from "react-icons/fa";
import { FaCalendarDays } from 'react-icons/fa6';

const Results = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    course: '',
    subject: '',
    lessons: '',
  });

  // Sample data
  const dummyData = [
    {
      id: 1,
      course: "Career Counselling",
      subject: "Career Professional Practices",
      lessons: "PR, Digital & Social Media",
      testDate: "2024-06-26",
      totalQuestions: 50,
      attempted: 45,
      right: 40,
      wrong: 5,
      totalMarks: 20,
      marksobtained: "-4",
    },
    // Add more dummy data as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredData = dummyData.filter((item) =>
    Object.values(item).some(val => 
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
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
    <div className="container mx-auto px-4 py-8 pt-0">
      {/* Tab Title */}
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 flex items-center justify-center">
        <FaBook className="mr-2 text-blue-500" /> Results 
      </h3>

      {/* Filters Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-12 border border-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaBook className="text-blue-500 mr-2" /> Course/Exam
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 transition duration-200"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
              >
                <option value="">Select Course</option>
                <option value="career-counselling">Career Counselling</option>
                <option value="web-dev">Web Development</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaBookOpen className="text-blue-500 mr-2" /> Subject
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 transition duration-200"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value="">Select Subject</option>
                <option value="career-practices">Career Professional Practices</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaBookReader className="text-blue-500 mr-2" /> Lesson
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 transition duration-200"
                id="lessons"
                name="lessons"
                value={formData.lessons}
                onChange={handleInputChange}
              >
                <option value="">Select Lesson</option>
                <option value="pr-digital">PR, Digital & Social Media</option>
              </select>
            </div>
          </div>
        </form>
      </section>

      {/* Results Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { text: "Test Date", icon: FaCalendarDays },
                  { text: "Total Qs", icon: FaBook },
                  { text: "Attempted", icon: FaBookReader },
                  { text: "Right", icon: FaBookOpen },
                  { text: "Wrong", icon: FaTrash },
                  { text: "Total Marks", icon: FaBook },
                  { text: "Marks Obtained", icon: FaClock },
                ].map(({ text, icon }, idx) => (
                  <th key={idx} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center">
                      {React.createElement(icon, { className: "text-blue-500 mr-2" })}
                      {text}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRecords.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 text-gray-800">{item.testDate}</td>
                  <td className="px-6 py-4 text-gray-800">{item.totalQuestions}</td>
                  <td className="px-6 py-4 text-gray-800">{item.attempted}</td>
                  <td className="px-6 py-4 text-green-600">{item.right}</td>
                  <td className="px-6 py-4 text-red-600">{item.wrong}</td>
                  <td className="px-6 py-4 text-gray-800">{item.totalMarks}</td>
                  <td className="px-6 py-4 text-gray-800">{item.marksobtained}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Results;