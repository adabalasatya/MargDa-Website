import React, { useEffect, useState } from 'react';
import { FaBookOpen, FaUserTie, FaEnvelope, FaPhone, FaEye, FaTimes, FaCheck, FaSearch } from 'react-icons/fa';

const CareerReport = () => {
  useEffect(() => {
    console.log('DataTable would be initialized here with responsive settings');
  }, []);

  // Sample data
  const allCareerData = [
    {
      user: { name: 'Vaibhav Mishra', email: 'vaib.iitk@gmail.com', phone: '919990111965' },
      careerAptitude: { status: false },
      workAttitude: { status: true, date: '02-02-2025' },
      abilityAnalyser: { status: false },
      counselor: { name: 'Manimala', email: 'manimala@margdarshak.org', phone: '8368566224' },
      actionLink: '/user-dashboard/5326',
    },
    {
      user: { name: 'Yogita Gaur', email: 'yogita.gour177@gmail.com', phone: '917819834017' },
      careerAptitude: { status: false },
      workAttitude: { status: true, date: '04-09-2024' },
      abilityAnalyser: { status: false },
      counselor: { name: 'DRASHTI JAIN', email: 'workwithdrashti@gmail.com', phone: '917302693705' },
      actionLink: '/user-dashboard/4925',
    },
    {
      user: { name: 'Ankitta B', email: 'ankitta.b@gmail.com', phone: '919876543210' },
      careerAptitude: { status: false },
      workAttitude: { status: true, date: '03-09-2024' },
      abilityAnalyser: { status: false },
      counselor: { name: 'Ankitta', email: 'ankita@margdarshak.org', phone: '81987654321' },
      actionLink: '/user-dashboard/4926',
    },
    {
      user: { name: 'Dolly', email: 'dolly@gmail.com', phone: '918765432109' },
      careerAptitude: { status: false },
      workAttitude: { status: true, date: '28-08-2024' },
      abilityAnalyser: { status: false },
      counselor: { name: 'Ankitta', email: 'ankita@margdarshak.org', phone: '81987654321' },
      actionLink: '/user-dashboard/4927',
    },
    {
      user: { name: 'Atharva Mishra', email: 'atharva2005@gmail.com', phone: '7202088916' },
      careerAptitude: { status: true, date: '24-07-2024' },
      workAttitude: { status: true, date: '25-07-2024' },
      abilityAnalyser: { status: true, date: '30-07-2024' },
      counselor: { name: 'Manish Mishra', email: 'mish1026@gmail.com', phone: '9142739662' },
      actionLink: '/user-dashboard/4928',
    },
    {
      user: { name: 'Prayjal Shival', email: 'ambikahu2007@gmail.com', phone: '91804572301' },
      careerAptitude: { status: true, date: '05-08-2024' },
      workAttitude: { status: true, date: '05-08-2024' },
      abilityAnalyser: { status: true, date: '05-08-2024' },
      counselor: { name: 'Akash Shinde', email: 'akashshinde17@gmail.com', phone: '91823456890' },
      actionLink: '/user-dashboard/4929',
    },
    {
      user: { name: 'Test User 1', email: 'test1@gmail.com', phone: '91123456789' },
      careerAptitude: { status: false },
      workAttitude: { status: false },
      abilityAnalyser: { status: false },
      counselor: { name: 'Test Counselor', email: 'test@margdarshak.org', phone: '81123456789' },
      actionLink: '/user-dashboard/4930',
    },
    {
      user: { name: 'Test User 2', email: 'test2@gmail.com', phone: '91234567890' },
      careerAptitude: { status: true, date: '01-01-2025' },
      workAttitude: { status: true, date: '02-01-2025' },
      abilityAnalyser: { status: false },
      counselor: { name: 'Test Counselor 2', email: 'test2@margdarshak.org', phone: '82234567890' },
      actionLink: '/user-dashboard/4931',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter data based on search term
  const filteredData = allCareerData.filter((row) =>
    row.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.counselor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusIcon = (status, date = null) => {
    if (status) {
      return (
        <div className="flex items-center justify-center">
          <FaCheck className="text-green-500 text-xl mr-1" />
          {date && <span className="text-xs text-gray-600">{date}</span>}
        </div>
      );
    }
    return <FaTimes className="text-red-500 text-xl" />;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="mb-4 p-6 ">
        <h2 className="text-4xl font-semibold text-gray-800 flex justify-center items-center mb-4">
          <FaBookOpen className="text-blue-600 mr-2" />
          Career Report
        </h2>
        
      </div>

      <div className="flex justify-between items-center mb-6">
          <div>
            <label className="mr-2 text-gray-600">Show </label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="p-1 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="ml-2 text-gray-600">records</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 pl-10 border rounded-md w-64 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <FaSearch className="absolute left-3 top-3 text-blue-400" />
          </div>
        </div>

      <div className="overflow-x-auto border border-blue-200">
        <table className="min-w-full bg-white rounded-lg shadow-md ">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm font-semibold uppercase">
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-center">Career Aptitude</th>
              <th className="py-3 px-6 text-center">Work Attitude</th>
              <th className="py-3 px-6 text-center">Ability Analyser</th>
              <th className="py-3 px-6 text-left">Counselor</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6">
                  <div className="flex flex-col text-gray-700">
                    <span className="flex items-center text-sm font-medium">
                      <FaUserTie className="text-gray-500 text-xs mr-2" /> {row.user.name}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <FaEnvelope className="text-gray-500 text-xs mr-2" /> {row.user.email}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <FaPhone className="text-gray-500 text-xs mr-2" /> {row.user.phone}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  {getStatusIcon(row.careerAptitude.status, row.careerAptitude.date)}
                </td>
                <td className="py-4 px-6 text-center">
                  {getStatusIcon(row.workAttitude.status, row.workAttitude.date)}
                </td>
                <td className="py-4 px-6 text-center">
                  {getStatusIcon(row.abilityAnalyser.status, row.abilityAnalyser.date)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col text-gray-700">
                    <span className="flex items-center text-sm font-medium">
                      <FaUserTie className="text-gray-500 text-xs mr-2" /> {row.counselor.name}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <FaEnvelope className="text-gray-500 text-xs mr-2" /> {row.counselor.email}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <FaPhone className="text-gray-500 text-xs mr-2" /> {row.counselor.phone}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <a href={row.actionLink} className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4 p-4 bg-white rounded-lg shadow-md border border-blue-200">
        <span className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} total records
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
        {/* Copyright Footer */}
        <div className="text-center text-sm text-black-500 mt-6 p-4">
        <span>
          Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default CareerReport;