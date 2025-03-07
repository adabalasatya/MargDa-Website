import React, { useState } from 'react';
import { FaCity, FaKey, FaBook, FaTrash, FaSearch } from 'react-icons/fa';

// Dummy data
const dummyStates = [
  { id: 36, name: 'Puducherry', countryCode: 'IN', stateCode: 'PY', zone: 'Southern', advisor: '' },
  { id: 35, name: 'Lakshadweep', countryCode: 'IN', stateCode: 'LD', zone: 'Southern', advisor: '' },
  { id: 34, name: 'Ladakh', countryCode: 'IN', stateCode: 'LA', zone: 'Northern', advisor: '' },
  { id: 33, name: 'Jammu and Kashmir', countryCode: 'IN', stateCode: 'JK', zone: 'Northern', advisor: '' },
  { id: 32, name: 'Delhi NCT', countryCode: 'IN', stateCode: 'DL', zone: 'Northern', advisor: '' },
];

const StateManager = () => {
  const [state, setState] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [zone, setZone] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [states, setStates] = useState(dummyStates);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!state) newErrors.state = true;
    if (!stateCode) newErrors.stateCode = true;
    else if (stateCode.length > 2) newErrors.stateCodeLength = true;
    if (!countryCode) newErrors.countryCode = true;
    else if (countryCode.length > 2) newErrors.countryCodeLength = true;
    if (!zone) newErrors.zone = true;
    else if (zone.length > 13) newErrors.zoneLength = true;
    if (advisor.length > 10) newErrors.advisorLength = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newState = {
      id: states.length + 1,
      name: state,
      countryCode,
      stateCode,
      zone,
      advisor,
    };
    setStates([newState, ...states]);
    setState('');
    setStateCode('');
    setCountryCode('');
    setZone('');
    setAdvisor('');
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete stateID: ${id}?`)) {
      setStates(states.filter((state) => state.id !== id));
    }
  };

  const filteredStates = states.filter(
    (state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.stateCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.countryCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.advisor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStates.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredStates.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg border border-blue-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center">
        <FaCity className="mr-2 text-blue-500" /> State Management
      </h2>

      {/* State Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center border rounded-lg">
              <span className="p-2 bg-gray-10 border-r">
                <FaCity className="text-black-600" />
              </span>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className={`w-full p-2 rounded-r-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center border rounded-lg">
              <span className="p-2 bg-gray-10 border-r">
                <FaKey className="text-black-600" />
              </span>
              <input
                type="text"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                placeholder="State Code"
                className={`w-full p-2 rounded-r-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.stateCode || errors.stateCodeLength ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.stateCodeLength && (
              <span className="text-red-500 text-sm">* State code must be less than 3 characters</span>
            )}
          </div>
          <div>
            <div className="flex items-center border rounded-lg">
              <span className="p-2 bg-gray-10 border-r">
                <FaBook className="text-black-600" />
              </span>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                placeholder="Zone"
                className={`w-full p-2 rounded-r-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.zone || errors.zoneLength ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.zoneLength && (
              <span className="text-red-500 text-sm">* Zone must be less than 14 characters</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center border rounded-lg">
              <span className="p-2 bg-gray-10 border-r">
                <FaBook className="text-black-600" />
              </span>
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                placeholder="Country Code"
                className={`w-full p-2 rounded-r-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.countryCode || errors.countryCodeLength ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.countryCodeLength && (
              <span className="text-red-500 text-sm">* Country code must be less than 3 characters</span>
            )}
          </div>
          <div>
            <div className="flex items-center border rounded-lg">
              <span className="p-2 bg-gray-10 border-r">
                <FaBook className="text-black-600" />
              </span>
              <input
                type="text"
                value={advisor}
                onChange={(e) => setAdvisor(e.target.value)}
                placeholder="Advisor"
                className={`w-full p-2 rounded-r-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.advisorLength ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.advisorLength && (
              <span className="text-red-500 text-sm">* Advisor must be less than 11 characters</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Submit
        </button>
      </form>

      {/* Show Records & Search Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <span className="mr-2">Show</span>
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded-lg py-1 px-2 focus:ring-2 focus:ring-blue-500"
          >
            {[10, 25, 50].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="ml-2">Records </span>
        </div>
        <div className="relative w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search states..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 px-4 focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">State ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">State</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Country Code</th>
              <th className="border border-gray-200 px-4 py-2 text-left">State Code</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Zone</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Advisor</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((state) => (
              <tr key={state.id} className="hover:bg-gray-50 transition">
                <td className="border border-gray-200 px-4 py-2">{state.id}</td>
                <td className="border border-gray-200 px-4 py-2">{state.name}</td>
                <td className="border border-gray-200 px-4 py-2">{state.countryCode}</td>
                <td className="border border-gray-200 px-4 py-2">{state.stateCode}</td>
                <td className="border border-gray-200 px-4 py-2">{state.zone}</td>
                <td className="border border-gray-200 px-4 py-2">{state.advisor}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleDelete(state.id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredStates.length)} of{' '}
          {filteredStates.length} records
        </span>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-400 text-black py-1 px-3 rounded-lg disabled:opacity-50"
          >
            {'<< Previous'}
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 py-1 px-3 rounded-lg ${
                currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 hover:bg-gray-400 text-black py-1 px-3 rounded-lg disabled:opacity-50"
          >
            {'Next >>'}
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default StateManager;