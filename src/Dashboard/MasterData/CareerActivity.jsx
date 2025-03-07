import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaSearch, FaPlus, FaChalkboardTeacher } from 'react-icons/fa';

// Dummy data based on the image
const dummyActivities = [
    { id: 41, activity: 'Performing General Physical Activities', group: 'Performing Physical and Manual Work Activities' },
    { id: 40, activity: 'Operating Vehicles, Mechanized Devices, or Equipment', group: 'Performing Physical and Manual Work Activities' },
    { id: 39, activity: 'Handling and Moving Objects', group: 'Performing Physical and Manual Work Activities' },
    { id: 38, activity: 'Controlling Machines and Processes', group: 'Performing Physical and Manual Work Activities' },
    { id: 37, activity: 'Working with Computers', group: 'Performing Complex and Technical Activities' },
    { id: 43, activity: 'Repairing and Maintaining Mechanical Equipment', group: 'Performing Complex and Technical Activities' },
    { id: 42, activity: 'Repairing and Maintaining Electronic Equipment', group: 'Performing Complex and Technical Activities' },
    { id: 36, activity: 'Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment', group: 'Performing Complex and Technical Activities' },
    { id: 35, activity: 'Documenting/Recording Information', group: 'Performing Clerical and Administrative Activities' },
    { id: 34, activity: 'Updating and Using Relevant Knowledge', group: 'Reasoning and Decision Making' },
];

const CareerActivity = () => {
    const [activity, setActivity] = useState('');
    const [group, setGroup] = useState('');
    const [activities, setActivities] = useState(dummyActivities);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!activity) newErrors.activity = true;
        if (!group) newErrors.group = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newActivity = {
            id: activities.length + 41, // Continue from the last ID in dummy data
            activity,
            group,
        };
        setActivities([newActivity, ...activities]);
        setActivity('');
        setGroup('');
        setErrors({});
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete activity ID: ${id}?`)) {
            setActivities(activities.filter((act) => act.id !== id));
        }
    };

    const filteredActivities = activities.filter(
        (act) =>
            act.id.toString().includes(searchTerm) ||
            act.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
            act.group.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredActivities.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredActivities.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-blue-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-500" /> Career-Activity
            </h2>

            {/* Activity Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            placeholder="Activity"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                        {errors.activity && <span className="text-red-500 text-sm">* Activity is required</span>}
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
                        onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg py-1 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {[10, 20, 30].map((option) => (
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
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPencilAlt className="mr-2 text-gray-600" />
                                    ActivityID
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPencilAlt className="mr-2 text-gray-600" />
                                    Activity
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPlus className="mr-2 text-gray-600" />
                                    Group
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((act) => (
                            <tr key={act.id} className="hover:bg-gray-50 transition">
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">
                                    {act.id}
                                    <button
                                        onClick={() => handleDelete(act.id)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">{act.activity}</td>
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">{act.group}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-black-600">
                <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredActivities.length)} of {filteredActivities.length} entries</span>
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

export default CareerActivity;