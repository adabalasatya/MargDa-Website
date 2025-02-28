import React, { useState, useRef } from 'react';
import { 
  FaUserGraduate, 
  FaBullhorn, 
  FaSearch,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import User from "../../assets/user.webp"

const TrainerDashboard = () => {
  const [dropdownState, setDropdownState] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Mock data - you would fetch this from an API in a real application
  const students = [
    {
      id: 1,
      name: 'Saloni Gupta',
      dateRange: '12/01/22-12/01/23',
      support: { date: 'Date + Time', lateDays: 0, logs: 0 }
    },
  ];

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const toggleDropdown = (id) => {
    setDropdownState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Function to render numbered circles
  const renderCircles = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
        {i + 1}
      </div>
    ));
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-10 min-h-screen p-6">

      <div className="mb-6 pt-4 flex justify-center">
      <h1 className="text-3xl font-semibold flex items-center">
      <FaUserGraduate className="mr-2 text-blue-600" /> Trainer Dashboard
         </h1>
       </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-300">
        <div className="p-5">
          {/* Search and Items per page controls with reversed order */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            {/* Entries info on left side */}
            <div className="flex items-center">
              <span className="text-sm text-gray-600">
                Show 
                <select
                  className="mx-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                entries
              </span>
            </div>
            
            {/* Search bar on right side */}
            <div className="relative flex items-center w-64">
              <input
                type="text"
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaSearch className="text-blue-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">SNo</th>
                  <th className="border border-gray-300 p-3 text-left">Theory</th>
                  <th className="border border-gray-300 p-3 text-left">Activity</th>
                  <th className="border border-gray-300 p-3 text-left">Practical</th>
                  <th className="border border-gray-300 p-3 text-left">Support</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((student, index) => (
                    <tr key={student.id}>
                      <td className="border border-gray-300 p-3">
                        <div className="flex items-center">
                          <img 
                            src={User} 
                            alt="Student avatar" 
                            className="w-12 h-12 rounded-full mr-3" 
                          />
                          <div className="font-bold">{student.name}</div>
                        </div>
                        <div className="mt-3 text-sm text-black-600">
                          {student.dateRange}
                        </div>
                        <div className="relative">
                     <button 
                 onClick={() => toggleDropdown(student.id)} 
               className="text-2xl font-bold cursor-pointer"
              >
                 ...
             </button>
            {dropdownState[student.id] && (
             <div className="absolute right-4 bottom-0 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
             <a className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100 flex items-center cursor-pointer">
              <FaBullhorn className="mr-2 text-blue-500" />
              <span>Communicate</span>
              </a>
           </div>
             )}
            </div>

                      </td>
                      
                      <td className="border border-gray-300 p-3">
                        <div className="grid grid-cols-4 gap-2">
                          {renderCircles()}
                        </div>
                      </td>
                      
                      <td className="border border-gray-300 p-3">
                        <div className="grid grid-cols-4 gap-2">
                          {renderCircles()}
                        </div>
                      </td>
                      
                      <td className="border border-gray-300 p-3">
                        <div className="grid grid-cols-4 gap-2">
                          {renderCircles()}
                        </div>
                      </td>
                      
                      <td className="border border-gray-300 p-3">
                        <div className="text-sm">{student.support.date}</div>
                        <div className="text-sm">Late({student.support.lateDays}) days</div>
                        <div className="text-sm">Logs ({student.support.logs})</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border border-gray-300 p-4 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        {/* Pagination and Records Info */}
<div className="flex flex-wrap items-center justify-between mt-4">
  {/* Showing Entries Info */}
  <div className="text-sm text-balck-600 font-bold mb-2 md:mb-0">
    Showing {filteredStudents.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} entries
  </div>

  {/* Pagination Controls */}
  <div className="flex items-center space-x-2">
    {/* Previous Button */}
    <button 
      onClick={() => paginate(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg flex items-center transition-all 
      ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105'}`}
    >
      <FaChevronLeft className="mr-1" /> Previous
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
      <button
        key={number}
        onClick={() => paginate(number)}
        className={`px-4 py-2 rounded-lg font-semibold transition-all 
        ${currentPage === number ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}
      >
        {number}
      </button>
    ))}

    {/* Next Button */}
    <button 
      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages || totalPages === 0}
      className={`px-4 py-2 rounded-lg flex items-center transition-all 
      ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105'}`}
    >
      Next <FaChevronRight className="ml-1" />
    </button>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;