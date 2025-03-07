import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaSearch, FaPlus, FaChalkboardTeacher } from 'react-icons/fa';

// Dummy data based on the image
const dummyKnowledge = [
    { id: 33, knowledge: 'Transportation', group: 'Transportation' },
    { id: 32, knowledge: 'Sociology and Anthropology', group: 'Science & Mathematics' },
    { id: 31, knowledge: 'Psychology', group: 'Science & Mathematics' },
    { id: 30, knowledge: 'Physics', group: 'Science & Mathematics' },
    { id: 29, knowledge: 'Mathematics', group: 'Science & Mathematics' },
    { id: 28, knowledge: 'Geography', group: 'Science & Mathematics' },
    { id: 27, knowledge: 'Chemistry', group: 'Science & Mathematics' },
    { id: 26, knowledge: 'Biology', group: 'Science & Mathematics' },
    { id: 25, knowledge: 'Production and Processing', group: 'Manufacturing & Production' },
    { id: 24, knowledge: 'Food Production', group: 'Manufacturing & Production' },
];

const CareerKnowledge = () => {
    const [knowledge, setKnowledge] = useState('');
    const [group, setGroup] = useState('');
    const [knowledgeItems, setKnowledgeItems] = useState(dummyKnowledge);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Make it a state variable
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!knowledge.trim()) newErrors.knowledge = true;
        if (!group.trim()) newErrors.group = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newKnowledge = {
            id: knowledgeItems.length + 24, // Continue from the last ID in dummy data
            knowledge: knowledge.trim(),
            group: group.trim(),
        };
        setKnowledgeItems([newKnowledge, ...knowledgeItems]);
        setKnowledge('');
        setGroup('');
        setErrors({});
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete knowledge ID: ${id}?`)) {
            setKnowledgeItems(knowledgeItems.filter((item) => item.id !== id));
        }
    };

    const filteredKnowledge = knowledgeItems.filter(
        (item) =>
            item.id.toString().includes(searchTerm) ||
            item.knowledge.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.group.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredKnowledge.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredKnowledge.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-blue-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-500" /> Career-Knowledge
            </h2>

            {/* Knowledge Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 p-4 rounded-lg ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={knowledge}
                            onChange={(e) => setKnowledge(e.target.value)}
                            placeholder="Knowledge"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                        {errors.knowledge && <span className="text-red-500 text-sm">* Knowledge is required</span>}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            placeholder="Group"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                        {errors.group && <span className="text-red-500 text-sm">* Group is required</span>}
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
                                    <FaPencilAlt className="mr-2 text-black-600" />
                                    KnowledgeID
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPencilAlt className="mr-2 text-black-600" />
                                    Knowledge
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPlus className="mr-2 text-black-600" />
                                    Group
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">
                                    {item.id}
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-black-800">{item.knowledge}</td>
                                <td className="border border-gray-200 px-4 py-2 text-black-800">{item.group}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-black-600">
                <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredKnowledge.length)} of {filteredKnowledge.length} entries</span>
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

export default CareerKnowledge;