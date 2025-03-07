import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaSearch, FaPlus, FaChalkboardTeacher } from 'react-icons/fa';

// Dummy data based on the image
const dummyManagements = [
    { id: 38, management: 'Private' },
    { id: 37, management: 'Puducherry Administration' },
    { id: 36, management: 'Lakshadweep Administration' },
    { id: 35, management: 'Ladakh Administration' },
    { id: 34, management: 'Jammu and Kashmir Administration' },
    { id: 33, management: 'Dadra and Nagar Haveli Administration' },
    { id: 32, management: 'Chandigarh Administration' },
    { id: 31, management: 'Andaman and Nicobar Islands Administration' },
    { id: 30, management: 'Govt of Delhi' },
    { id: 29, management: 'Govt of West Bengal' },
];

const Management = () => {
    const [management, setManagement] = useState('');
    const [managements, setManagements] = useState(dummyManagements);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Make it a state variable
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!management.trim()) newErrors.management = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newManagement = {
            id: managements.length + 29, // Continue from the last ID in dummy data
            management: management.trim(),
        };
        setManagements([newManagement, ...managements]);
        setManagement('');
        setErrors({});
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete management ID: ${id}?`)) {
            setManagements(managements.filter((mg) => mg.id !== id));
        }
    };

    const filteredManagements = managements.filter(
        (mg) =>
            mg.id.toString().includes(searchTerm) ||
            mg.management.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredManagements.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredManagements.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-blue-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-500" /> Management
            </h2>

            {/* Management Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 p-4 rounded-lg ">
                <div className="relative">
                    <input
                        type="text"
                        value={management}
                        onChange={(e) => setManagement(e.target.value)}
                        placeholder="Management"
                        className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                    {errors.management && <span className="text-red-500 text-sm">* Management is required</span>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Submit
                </button>
            </form>

            {/* Show Records & Search Bar */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-black-600">
                    <span className="mr-2">Show</span>
                    <select
                        value={recordsPerPage}
                        onChange={(e) => {
                            setRecordsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page when changing entries per page
                        }}
                        className="border border-gray-300 rounded-lg py-1 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {[10, 20, 30].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <span className="ml-2">Records</span>
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
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPencilAlt className="mr-2 text-black-600" />
                                    Action
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPencilAlt className="mr-2 text-black-600" />
                                    Management
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((mg) => (
                            <tr key={mg.id} className="hover:bg-gray-50 transition">
                                <td className="border border-gray-200 px-4 py-2 text-black-800">
                                    <button
                                        onClick={() => handleDelete(mg.id)}
                                        className="mr-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FaPencilAlt />
                                    </button>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-black-800">{mg.management}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-black-600">
                <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredManagements.length)} of {filteredManagements.length} entries</span>
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

export default Management;