import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaSearch, FaPlus, FaChalkboardTeacher } from 'react-icons/fa';

// Dummy data based on the image
const dummyZones = [
    { id: 5, careerZoneId: 5, careerZoneDesc: 'Occupations that need Extensive Preparation' },
    { id: 4, careerZoneId: 4, careerZoneDesc: 'Occupations that need Considerable Preparation' },
    { id: 3, careerZoneId: 3, careerZoneDesc: 'Occupations that need Medium Preparation' },
    { id: 2, careerZoneId: 2, careerZoneDesc: 'Occupations that need Some Preparation Needed' },
    { id: 1, careerZoneId: 1, careerZoneDesc: 'Occupations that need Little or No Preparation' },
];

const CareerZone = () => {
    const [careerZoneId, setCareerZoneId] = useState('');
    const [careerZoneDesc, setCareerZoneDesc] = useState('');
    const [zones, setZones] = useState(dummyZones);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Make it a state variable
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!careerZoneId.trim()) newErrors.careerZoneId = true;
        if (!careerZoneDesc.trim()) newErrors.careerZoneDesc = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Ensure careerZoneId is a number and increment from the last ID
        const newId = zones.length + 1;
        const newZone = {
            id: newId,
            careerZoneId: parseInt(careerZoneId.trim(), 10), // Convert to number
            careerZoneDesc: careerZoneDesc.trim(),
        };
        setZones([newZone, ...zones]);
        setCareerZoneId('');
        setCareerZoneDesc('');
        setErrors({});
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete zone ID: ${id}?`)) {
            setZones(zones.filter((zone) => zone.id !== id));
        }
    };

    const filteredZones = zones.filter(
        (zone) =>
            zone.id.toString().includes(searchTerm) ||
            zone.careerZoneId.toString().includes(searchTerm) ||
            zone.careerZoneDesc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredZones.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredZones.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-blue-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-500" /> Career-Zone
            </h2>

            {/* Zone Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 p-4 rounded-lg ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={careerZoneId}
                            onChange={(e) => setCareerZoneId(e.target.value)}
                            placeholder="CareerZone ID"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                        {errors.careerZoneId && <span className="text-red-500 text-sm">* CareerZone ID is required</span>}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={careerZoneDesc}
                            onChange={(e) => setCareerZoneDesc(e.target.value)}
                            placeholder="CareerZone Description"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                        {errors.careerZoneDesc && <span className="text-red-500 text-sm">* CareerZone Description is required</span>}
                    </div>
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
                                    <FaPencilAlt className="mr-2 text-gray-600" />
                                    ZoneID
                                </div>
                            </th>
                            <th className="border border-gray-200 px-5 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPencilAlt className="mr-2 text-gray-600" />
                                    CareerZoneID
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPlus className="mr-2 text-gray-600" />
                                    CareerZoneDesc
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((zone) => (
                            <tr key={zone.id} className="hover:bg-gray-50 transition">
                                <td className="border border-gray-200 px-4 py-2 text-black-800">
                                    {zone.id}
                                    <button
                                        onClick={() => handleDelete(zone.id)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                                <td className="border border-gray-200 px-5 py-2 text-black-800">{zone.careerZoneId}</td>
                                <td className="border border-gray-200 px-4 py-2 text-black-800">{zone.careerZoneDesc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-black-600">
                <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredZones.length)} of {filteredZones.length} entries</span>
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

export default CareerZone;