import React, { useState } from 'react';
import { FaCity, FaTrash, FaSearch, FaMapMarkerAlt, FaCode, FaUser } from 'react-icons/fa';

// Dummy data
const dummyDistricts = [
  { id: 795, name: 'Kuchaman City', stateCode: 'RJ', countryCode: 'IN', advisor: '' },
  { id: 794, name: 'Sujangarh', stateCode: 'RJ', countryCode: 'IN', advisor: '' },
  { id: 793, name: 'Nagpur', stateCode: 'MP', countryCode: 'IN', advisor: '' },
  { id: 792, name: 'Mahar', stateCode: 'MP', countryCode: 'IN', advisor: '' },
  { id: 791, name: 'Chachura', stateCode: 'MP', countryCode: 'IN', advisor: '' },
  { id: 790, name: 'Yanam', stateCode: 'PY', countryCode: 'IN', advisor: '' },
  { id: 789, name: 'Puducherry', stateCode: 'PY', countryCode: 'IN', advisor: '' },
  { id: 788, name: 'Mahe', stateCode: 'PY', countryCode: 'IN', advisor: '' },
  { id: 787, name: 'Karaikal', stateCode: 'PY', countryCode: 'IN', advisor: '' },
];

const DistrictManager = () => {
  const [district, setDistrict] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [districts, setDistricts] = useState(dummyDistricts);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDistrict = {
      id: districts.length + 1,
      name: district,
      stateCode,
      countryCode,
      advisor,
    };
    setDistricts([newDistrict, ...districts]);
    setDistrict('');
    setStateCode('');
    setCountryCode('');
    setAdvisor('');
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete districtID: ${id}?`)) {
      setDistricts(districts.filter((district) => district.id !== id));
    }
  };

  const filteredDistricts = districts.filter(
    (district) =>
      district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.stateCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.countryCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.advisor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredDistricts.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredDistricts.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-blue-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <FaCity className="mr-2 text-blue-500" /> District
      </h2>

      {/* District Input Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="District"
              className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
            />
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
          </div>
          <div className="relative">
            <input
              type="text"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              placeholder="State Code"
              className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
            />
            <FaCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
          </div>
          <div className="relative">
            <input
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              placeholder="Country Code"
              className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
            />
            <FaCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
          </div>
          <div className="relative">
            <input
              type="text"
              value={advisor}
              onChange={(e) => setAdvisor(e.target.value)}
              placeholder="Advisor"
              className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
          </div>
        </div>
        <div className="mt-4">
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
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">District ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">District</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">State Code</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">Country Code</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">Advisor</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((district) => (
              <tr key={district.id} className="hover:bg-gray-50 transition">
                <td className="border border-gray-200 px-4 py-2 text-gray-800">{district.id}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800">{district.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800">{district.stateCode}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800">{district.countryCode}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800">{district.advisor}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleDelete(district.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg transition"
                  >
                    <FaTrash className="text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-black-600">
        <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredDistricts.length)} of {filteredDistricts.length} entries</span>
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

export default DistrictManager;

