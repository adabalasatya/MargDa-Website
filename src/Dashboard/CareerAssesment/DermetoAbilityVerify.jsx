// DermatoAbilityVerify.jsx
import React, { useState, useEffect } from 'react';
import { FaReply, FaUser, FaHandPointDown, FaHand, FaTrash, FaPenToSquare } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DermatoAbilityVerify = () => {
  // Sample data (expand as needed)
  const initialData = [
    {
      id: 1,
      user: { name: 'Vimal Kothiyal', email: 'kothiyalvimal0@gmail.com', phone: '08287334006' },
      counsellor: { name: 'Vimal Kothiyal', email: 'kothiyalvimal0@gmail.com', phone: '918287334006' },
      leftHand: 'https://margdarshak.org/uploads/dermato/5318WhatsApp Image 2025-01-04 at 15.32.23_a839c204.jpg',
      rightHand: 'https://margdarshak.org/uploads/dermato/5318WhatsApp Image 2025-01-04 at 15.32.23_a839c204.jpg',
      verified: false,
    },
    {
      id: 2,
      user: { name: 'mimi', email: 'mimanshatakwal@gmail.com', phone: '918700919444' },
      counsellor: { name: 'Mimansha Takwal', email: 'mimanshatakwal@gmail.com', phone: '918700919456' },
      leftHand: 'https://margdarshak.org/uploads/dermato/5319IMG_20250104_143755.jpg',
      rightHand: 'https://margdarshak.org/uploads/dermato/5319IMG_20250104_143749.jpg',
      verified: false,
    },
    {
      id: 3,
      user: { name: 'Vaibhav Krishna SK', email: 'skvaibhavkrishna08@gmail.com', phone: '919789028424' },
      counsellor: { name: 'RP Singh', email: 'nicemarg@gmail.com', phone: '917838681293' },
      leftHand: 'https://margdarshak.org/uploads/dermato/5279LT.jpg',
      rightHand: 'https://margdarshak.org/uploads/dermato/5279RT.jpg',
      verified: true,
    },
  ];

  const [data, setData] = useState(initialData);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.phone.includes(searchTerm) ||
    item.counsellor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.counsellor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.counsellor.phone.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Handle delete confirmation
  const handleDelete = (id, event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));
        Swal.fire('Deleted!', 'The record has been deleted.', 'success');
      }
    });
  };

  // Handle verify form submission
  const handleVerify = (id) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, verified: true } : item
      )
    );
    Swal.fire('Verified!', 'The record has been verified.', 'success');
  };

  // Handle edit action
  const handleEdit = (id) => {
    navigate(`/edit-ability-dermato/${id}`); 
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen p-6">
      {/* Main Content */}
      <main className="content">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold py-4 flex items-center justify-center">
              <FaReply className="text-blue-600 mr-2" />
              Dermeto Ability Verify
            </h2>
          </div>

          {/* Table Controls */}
          <div className="flex justify-between items-center mb-4">
            {/* Records per page */}
            <div className="flex items-center space-x-2">
              <label htmlFor="recordsPerPage" className="text-gray-700">
                Show
              </label>
              <select
                id="recordsPerPage"
                value={recordsPerPage}
                onChange={(e) => {
                  setRecordsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page on change
                }}
                className="border border-gray-300 rounded p-1"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-gray-700">Records</span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="border border-gray-300 rounded p-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-2 top-3 text-blue-400" />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border border-blue-300">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-white">
                    <th className="p-4 text-left" style={{ width: '250px' }}>
                      <FaHandPointDown className="text-blue-600 mr-2 inline" />
                      Action
                    </th>
                    <th className="p-4 text-left" style={{ width: '387px' }}>
                      <FaUser className="text-blue-600 mr-2 inline" />
                      User
                    </th>
                    <th className="p-4 text-left" style={{ width: '387px' }}>
                      <FaUser className="text-blue-600 mr-2 inline" />
                      Counsellor
                    </th>
                    <th className="p-4 text-left" style={{ width: '214px' }}>
                      <FaHand className="text-blue-600 mr-2 inline" />
                      Left Hand
                    </th>
                    <th className="p-4 text-left" style={{ width: '150px' }}>
                      <FaHand className="text-blue-600 mr-2 inline" />
                      Right Hand
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {`${item.id}. `}
                          <button
                            type="button"
                            onClick={(e) => handleDelete(item.id, e)}
                            className="bg-transparent border-none p-0 cursor-pointer text-xl text-red-600"
                          >
                            <FaTrash />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEdit(item.id)}
                            className="text-blue-600 text-xl"
                          >
                            <FaPenToSquare />
                          </button>
                          <form
                            action="#"
                            method="POST"
                            style={{ display: 'inline' }}
                            onSubmit={() => handleVerify(item.id)}
                          >
                            <button
                              type="submit"
                              className={`btn ${
                                item.verified
                                  ? 'bg-green-500 text-white'
                                  : 'bg-blue-600 text-white'
                              } px-2 py-1 rounded text-sm hover:bg-${
                                item.verified ? 'green-600' : 'blue-700'
                              }`}
                            >
                              {item.verified ? 'Verified' : 'Verify'}
                            </button>
                          </form>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="row">{item.user.name}</div>
                          <div className="row">{item.user.email}</div>
                          <div className="row">{item.user.phone}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="row">{item.counsellor.name}</div>
                          <div className="row">{item.counsellor.email}</div>
                          <div className="row">{item.counsellor.phone}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <img
                          src={item.leftHand}
                          alt="Left Hand"
                          className="w-10 h-10 object-cover"
                        />
                      </td>
                      <td className="p-4">
                        <img
                          src={item.rightHand}
                          alt="Right Hand"
                          className="w-10 h-10 object-cover"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination and Record Info */}
          <div className="flex justify-between items-center mt-4 text-black-700">
            {/* Showing Records Info */}
            <div>
              Showing {indexOfFirstRecord + 1} to{' '}
              {indexOfLastRecord > filteredData.length
                ? filteredData.length
                : indexOfLastRecord}{' '}
              of {filteredData.length} total records
            </div>

            {/* Pagination */}
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded ${
                    currentPage === number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
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

export default DermatoAbilityVerify;