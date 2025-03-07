import React, { useState } from 'react';
import { FaLock, FaFile, FaTrash, FaSearch, FaPencilAlt, FaMapPin, FaBuilding, FaUser } from 'react-icons/fa';

// Dummy data (initially empty, as shown in the screenshot)
const dummyPincodes = [];

const PincodeUploadManager = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [pincodes, setPincodes] = useState(dummyPincodes);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      // Simulate uploading and adding dummy data (for demo purposes)
      const dummyData = [
        { id: 1, pincode: '123456', postoffice: 'Main Office', stateCode: 'RJ', associate: 'John Doe' },
        { id: 2, pincode: '789012', postoffice: 'Sub Office', stateCode: 'MP', associate: 'Jane Smith' },
      ];
      setPincodes(dummyData); // Add dummy data after upload (optional for demo)
    } else {
      alert('Please upload a CSV file.');
      setCsvFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (csvFile) {
      // Simulate file submission (no real API call, just updating state for demo)
      console.log('CSV file submitted:', csvFile.name);
      setCsvFile(null); // Reset file input after submission
    } else {
      alert('Please select a CSV file.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete pincode ID: ${id}?`)) {
      setPincodes(pincodes.filter((pincode) => pincode.id !== id));
    }
  };

  const filteredPincodes = pincodes.filter(
    (pincode) =>
      pincode.pincode.toString().includes(searchTerm) ||
      pincode.postoffice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pincode.stateCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pincode.associate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPincodes.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredPincodes.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <FaLock className="mr-2 text-blue-500" /> Pincode-upload
      </h2>

      {/* File Upload Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="relative">
          <label className="block text-gray-700 mb-2 sr-only">CSV File</label> 
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex items-center px-3 py-2 bg-gray-10 border-r border-gray-300">
              <FaFile className="text-black-600" />
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full py-2 px-3 text-gray-600 cursor-pointer focus:outline-none"
              id="csvUpload"
              style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
            />
            <label
              htmlFor="csvUpload"
              className="w-full py-2 px-3 text-gray-600 cursor-pointer flex-1 truncate"
            >
              CSV File
            </label>
            <span className="px-3 py-2 text-gray-500 bg-gray-100 border-l border-gray-300">
              Click to choose file
            </span>
          </div>
          {csvFile && <span className="text-gray-600 ml-2">Selected: {csvFile.name}</span>}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Show Records & Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-gray-600">
          <span className="mr-2">Show</span>
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {[10, 25, 50].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="ml-2">entries</span>
        </div>
        <div className="relative w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">Action</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">Pincode</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">Postoffice</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">State Code</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">Associate</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentRecords.map((pincode) => (
                <tr key={pincode.id} className="hover:bg-gray-50 transition">
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleDelete(pincode.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg transition"
                    >
                      <FaTrash className="text-white" />
                    </button>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-800">{pincode.pincode}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-800">{pincode.postoffice}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-800">{pincode.stateCode}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-800">{pincode.associate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-gray-600">
        <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredPincodes.length)} of {filteredPincodes.length} entries</span>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`py-1 px-3 rounded-lg ${
                currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PincodeUploadManager;