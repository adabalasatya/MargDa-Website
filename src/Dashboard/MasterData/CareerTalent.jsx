import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaSearch, FaPlus, FaChalkboardTeacher } from 'react-icons/fa';

// Dummy data based on the image
const dummyTalents = [
    { id: 52, talent: 'Visual Colour Discrimination', group: 'Sensory Abilities', subgroup: 'Visual Abilities' },
    { id: 51, talent: 'Peripheral Vision', group: 'Sensory Abilities', subgroup: 'Visual Abilities' },
    { id: 50, talent: 'Night Vision', group: 'Sensory Abilities', subgroup: 'Visual Abilities' },
    { id: 49, talent: 'Near Vision', group: 'Sensory Abilities', subgroup: 'Visual Abilities' },
    { id: 48, talent: 'Glare Sensitivity', group: 'Sensory Abilities', subgroup: 'Visual Abilities' },
    { id: 47, talent: 'Far Vision', group: 'Sensory Abilities', subgroup: 'Visual Abilities' },
    { id: 46, talent: 'Depth Perception', group: 'Sensory Abilities', subgroup: 'Visual Abilities' },
    { id: 45, talent: 'Speech Recognition', group: 'Sensory Abilities', subgroup: 'Auditory and Speech Abilities' },
    { id: 44, talent: 'Speech Clarity', group: 'Sensory Abilities', subgroup: 'Auditory and Speech Abilities' },
    { id: 43, talent: 'Sound Localization', group: 'Sensory Abilities', subgroup: 'Auditory and Speech Abilities' },
];

const CareerTalent = () => {
    const [talent, setTalent] = useState('');
    const [group, setGroup] = useState('');
    const [subgroup, setSubgroup] = useState('');
    const [talents, setTalents] = useState(dummyTalents);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Make it a state variable
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!talent.trim()) newErrors.talent = true;
        if (!group.trim()) newErrors.group = true;
        if (!subgroup.trim()) newErrors.subgroup = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newTalent = {
            id: talents.length + 43, // Continue from the last ID in dummy data
            talent: talent.trim(),
            group: group.trim(),
            subgroup: subgroup.trim(),
        };
        setTalents([newTalent, ...talents]);
        setTalent('');
        setGroup('');
        setSubgroup('');
        setErrors({});
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete talent ID: ${id}?`)) {
            setTalents(talents.filter((tal) => tal.id !== id));
        }
    };

    const filteredTalents = talents.filter(
        (tal) =>
            tal.id.toString().includes(searchTerm) ||
            tal.talent.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tal.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tal.subgroup.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredTalents.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredTalents.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-blue-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-500" /> Career-Talent
            </h2>

            {/* Talent Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 p-4 rounded-lg ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={talent}
                            onChange={(e) => setTalent(e.target.value)}
                            placeholder="Talent"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                        {errors.talent && <span className="text-red-500 text-sm">* Talent is required</span>}
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
                    <div className="relative">
                        <input
                            type="text"
                            value={subgroup}
                            onChange={(e) => setSubgroup(e.target.value)}
                            placeholder="Subgroup"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                        {errors.subgroup && <span className="text-red-500 text-sm">* Subgroup is required</span>}
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
                        {[10].map((option) => (
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
                                    TalentID
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPencilAlt className="mr-2 text-gray-600" />
                                    Talent
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPlus className="mr-2 text-gray-600" />
                                    Group
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPlus className="mr-2 text-gray-600" />
                                    Subgroup
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((tal) => (
                            <tr key={tal.id} className="hover:bg-gray-50 transition">
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">
                                    {tal.id}
                                    <button
                                        onClick={() => handleDelete(tal.id)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-black-800">{tal.talent}</td>
                                <td className="border border-gray-200 px-4 py-2 text-black-800">{tal.group}</td>
                                <td className="border border-gray-200 px-4 py-2 text-black-800">{tal.subgroup}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-black-600">
                <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredTalents.length)} of {filteredTalents.length} entries</span>
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

export default CareerTalent;