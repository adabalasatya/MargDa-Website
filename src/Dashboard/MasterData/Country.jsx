import React, { useState } from 'react';
import { FaCity, FaKey, FaTrash, FaSearch } from 'react-icons/fa';

// Dummy data
const dummyCountries = [
  { id: 249, name: 'Zimbabwe', code: 'ZW' },
  { id: 248, name: 'Zambia', code: 'ZM' },
  { id: 247, name: 'Yemen', code: 'YE' },
  { id: 246, name: 'Western Sahara', code: 'EH' },
  { id: 245, name: 'Wallis and Futuna', code: 'WF' },
];

const CountryManager = () => {
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countries, setCountries] = useState(dummyCountries);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!country) newErrors.country = true;
    if (!countryCode) newErrors.countryCode = true;
    else if (countryCode.length > 2) newErrors.countryCodeLength = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCountry = {
      id: countries.length + 1,
      name: country,
      code: countryCode,
    };
    setCountries([newCountry, ...countries]);
    setCountry('');
    setCountryCode('');
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete countryID: ${id}?`)) {
      setCountries(countries.filter((country) => country.id !== id));
    }
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCountries.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredCountries.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-blue-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center">
        <FaCity className="mr-2 text-blue-500" /> Country Management
      </h2>

       {/* Country Input & Add Button */}
       <div className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country name"
            className={`w-full border rounded-lg py-2 pl-10 px-4  ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
        </div>
        <div className="relative w-1/3">
          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Enter country code"
            className={`w-full border rounded-lg py-2 pl-10 px-4  ${
              errors.countryCode || errors.countryCodeLength ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Add
        </button>
      </div>
      {errors.countryCodeLength && (
        <span className="text-red-500 text-sm mb-4 block">
          * Country code must be less than three characters
        </span>
      )}

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
            placeholder="Search countries..."
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
              <th className="border border-gray-200 px-4 py-2 text-left">Country ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Country Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Country Code</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((country) => (
              <tr key={country.id} className="hover:bg-gray-50 transition">
                <td className="border border-gray-200 px-4 py-2">{country.id}</td>
                <td className="border border-gray-200 px-4 py-2">{country.name}</td>
                <td className="border border-gray-200 px-4 py-2">{country.code}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleDelete(country.id)}
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
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredCountries.length)} of{' '}
          {filteredCountries.length} records
        </span>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-400 text-black py-1 px-3 rounded-lg disabled:opacity-50"
          >
            &lt;&lt; Previous
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
            Next &gt;&gt;
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default CountryManager;