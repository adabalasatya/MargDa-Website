import React, { useEffect, useState } from 'react';
import { FaUsers, FaDatabase, FaInfoCircle, FaUser, FaTasks, FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const VerifyReference = () => {
  const navigate = useNavigate();

  // Sample data (replace with your actual data source or API)
  const allReferences = [
    {
      id: 1,
      service: 'Career Aptitude Assessment',
      reference: { name: 'shridhar shindhe', email: 'shridharshindhe28@gmail.com', phone: '8618465245' },
      referBy: { name: 'Prajwal Shivale', email: 'ambikahudedar.07@gmail.com', phone: '918904572307' },
      verified: true,
    },
    {
      id: 2,
      service: 'Career Aptitude Assessment',
      reference: { name: 'geeta shindhe', email: 'geetashindhe24@gmail.com', phone: '8197952307' },
      referBy: { name: 'Prajwal Shivale', email: 'ambikahudedar.07@gmail.com', phone: '918904572307' },
      verified: true,
    },
    {
      id: 3,
      service: 'Dermato Ability Analyser',
      reference: { name: 'bhoomika pai', email: 'bhoomikapai@28gmail.com', phone: '7259905314' },
      referBy: { name: 'Prajwal Shivale', email: 'ambikahudedar.07@gmail.com', phone: '918904572307' },
      verified: true,
    },
    {
      id: 4,
      service: 'Work Attitude Assessment',
      reference: { name: 'Ankita', email: 'Ankitas@gmai.com', phone: '839060433511' },
      referBy: { name: 'Prajwal Shivale', email: 'ambikahudedar.07@gmail.com', phone: '918904572307' },
      verified: false,
    },
    // Add more data for pagination testing
    {
      id: 5,
      service: 'Career Aptitude Assessment',
      reference: { name: 'Test User 1', email: 'test1@gmail.com', phone: '91234567890' },
      referBy: { name: 'Test Referrer 1', email: 'refer1@gmail.com', phone: '918123456789' },
      verified: false,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter data based on search term
  const filteredReferences = allReferences.filter((ref) =>
    ref.reference.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.reference.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.referBy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReferences.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReferences.length / itemsPerPage);

  // Handle verification with SweetAlert2
  const handleVerification = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Verify it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Verifying reference with ID: ${id}`);
        Swal.fire('Verified!', 'The reference has been verified.', 'success');
      }
    });
  };

  // Handle edit button click
  const handleEdit = (id) => {
    navigate(`/edit-reference/${id}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 flex justify-center items-center py-5">
              <FaUsers className="mr-2 text-blue-600" />
              Verify Reference
            </h2>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border border-blue-300">
            {/* Records per Page and Search Bar */}
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
                  <option value={30}>30</option>
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto rounded-lg shadow-md border border-blue-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm font-semibold uppercase">
                    <th className="py-3 px-6 text-left">
                      <FaDatabase className="inline mr-2" /> Sr.no
                    </th>
                    <th className="py-3 px-6 text-left">
                      <FaInfoCircle className="inline mr-2" /> Service
                    </th>
                    <th className="py-3 px-6 text-left">
                      <FaUser className="inline mr-2" /> Reference
                    </th>
                    <th className="py-3 px-6 text-left">
                      <FaUser className="inline mr-2" /> Refer by
                    </th>
                    <th className="py-3 px-6 text-center">
                      <FaTasks className="inline mr-2" /> Verify
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((ref) => (
                    <tr
                      key={ref.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-gray-700">{ref.id}</td>
                      <td className="py-4 px-6 text-gray-700">{ref.service}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col text-gray-700">
                          <span className="text-sm font-medium">{ref.reference.name}</span>
                          <span className="text-xs text-gray-500">{ref.reference.email}</span>
                          <span className="text-xs text-gray-500">{ref.reference.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col text-gray-700">
                          <span className="text-sm font-medium">{ref.referBy.name}</span>
                          <span className="text-xs text-gray-500">{ref.referBy.email}</span>
                          <span className="text-xs text-gray-500">{ref.referBy.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {ref.verified ? (
                          <button
                            disabled
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-not-allowed"
                          >
                            Verified
                          </button>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleVerification(ref.id);
                              }}
                            >
                              <input type="hidden" name="referID" value={ref.id} />
                              <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                              >
                                Verify
                              </button>
                            </form>
                            <button
                              onClick={() => handleEdit(ref.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full text-sm"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination and Total Records */}
            <div className="flex justify-between items-center mt-4 p-4 bg-white rounded-lg shadow-md">
              <span className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredReferences.length)} of {filteredReferences.length} total records
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
          </div>
        </div>
      </main>

      {/* Copyright Footer */}
      <div className="text-center text-sm text-black-500 mt-6 p-4">
        <span>
          Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default VerifyReference;