import React, { useState } from "react";
import { FaPen, FaArrowUp, FaBook, FaChartBar, FaBookOpen, FaBookReader,  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Test = () => {
  // State for form selections
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Sample data (could come from props or API)
  const testData = [
    {
      lesson: "Lesson Name",
      attempts: 4,
      avgMarks: 8,
      id: 1
    },
    // Add more test data objects as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-0">
      {/* Tab Title */}
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 flex items-center justify-center">
        <FaBook className="mr-2 text-blue-500" /> Test 
      </h3>

       {/* Filters */}
           <div className="bg-white p-6 rounded-lg shadow-md mb-12 border border-gray-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                   <FaBookOpen className="mr-2 text-blue-500" /> Class/Exam
                 </label>
                 <select
                   className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200"
                   value={selectedClass}
                   onChange={(e) => setSelectedClass(e.target.value)}
                 >
                   <option value="">Select Class/Exam</option>
                   <option value="class-10">Class 10</option>
                   <option value="class-11">Class 11</option>
                   <option value="class-12">Class 12</option>
                   <option value="jee">JEE Main</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                   <FaBookReader className="mr-2 text-blue-500" /> Subject
                 </label>
                 <select
                   className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200"
                   value={selectedSubject}
                   onChange={(e) => setSelectedSubject(e.target.value)}
                 >
                   <option value="">Select Subject</option>
                   <option value="math">Mathematics</option>
                   <option value="science">Science</option>
                   <option value="history">History</option>
                   <option value="english">English</option>
                 </select>
               </div>
             </div>
           </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Lesson</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Test</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Attempts</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Results</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Improve</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((test) => (
              <tr 
                key={test.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="py-4 px-6 border-b text-gray-800">{test.lesson}</td>
                <td className="py-4 px-6 border-b">
                  <button 
                    className="flex items-center text-blue-600 hover:text-blue-800 
                      transition-colors duration-200 font-medium"
                  >
                    <FaPen className="mr-2" /> Give Test
                  </button>
                </td>
                <td className="py-4 px-6 border-b text-gray-600">{test.attempts}</td>
                <td className="py-4 px-6 border-b">
                  <div className="text-gray-600">
                    Avg Marks ({test.avgMarks}%)
                    <br />
                    <Link 
                      to={`/answer-sheet/${test.id}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Answer Sheet
                    </Link>
                  </div>
                </td>
                <td className="py-4 px-6 border-b">
                  <button 
                    className="flex items-center text-green-600 hover:text-green-800 
                      transition-colors duration-200 font-medium"
                  >
                    <FaArrowUp className="mr-2" /> Improve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Test;