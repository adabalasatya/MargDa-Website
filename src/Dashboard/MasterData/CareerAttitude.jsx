import React, { useState } from 'react';
import { FaChalkboardTeacher, FaKey, FaFile, FaBook, FaEdit, FaTrash, FaSearch, FaCheckCircle, FaPencilAlt, FaCity, FaImage } from 'react-icons/fa';

// Dummy data updated to match the image (Attitudes)
const dummyAttitudes = [
    { id: 6, code: 'W', preference: 'Working', details: 'Have many different things to do; Involve working alone; Require you to be busy all the time; Suit your work style.', pic: 'working.jpg' },
    { id: 5, code: 'S', preference: 'Support', details: 'Where the company stands behind its workers; Where the workers are comfortable with managements\' style of supervision; In companies with a reputation for competent, considerate and fair management.', pic: 'support.jpg' },
    { id: 4, code: 'R', preference: 'Relationship', details: 'That does not make you do anything that goes against your sense of right and wrong; Where your Co-workers are friendly; That let you be of service to others.', pic: 'relationship.jpg' },
    { id: 3, code: 'I', preference: 'Independence', details: 'Do things on your own initiative; Make decisions on your own.', pic: 'independence.jpg' },
    { id: 2, code: 'Rc', preference: 'Recognition', details: 'With good possibilities for advancement with prestige; With the potential of leadership.', pic: 'recognition.jpg' },
    { id: 1, code: 'A', preference: 'Achievements', details: 'Give you a feeling of accomplishment; let you see the results of your efforts; Let you use your best abilities.', pic: 'achievements.jpg' },
];

const CareerAttitudeManager = () => {
    const [attitudeCode, setAttitudeCode] = useState('');
    const [attitude, setAttitude] = useState('');
    const [details, setDetails] = useState('');
    const [pic, setPic] = useState(null);
    const [attitudes, setAttitudes] = useState(dummyAttitudes);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            setPic(file);
            document.getElementById('filenameDisplay').value = file.name;
        } else {
            setPic(null);
            document.getElementById('filenameDisplay').value = '';
            setErrors({ ...errors, pic: true });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!attitudeCode) newErrors.attitudeCode = true;
        else if (attitudeCode.length > 1) newErrors.attitudeCodeLength = true;

        if (!attitude) newErrors.attitude = true;

        if (!pic) newErrors.pic = true;
        else if (!['image/jpeg', 'image/png', 'image/jpg'].includes(pic.type)) newErrors.picType = true;

        if (details.trim() === '' || details.includes('\n')) newErrors.details = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newAttitude = {
            id: attitudes.length + 1,
            code: attitudeCode,
            preference: attitude,
            details,
            pic: pic.name || 'default.jpg',
        };
        setAttitudes([newAttitude, ...attitudes]);
        setAttitudeCode('');
        setAttitude('');
        setDetails('');
        setPic(null);
        document.getElementById('filenameDisplay').value = '';
        setErrors({});
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete mastdata: ${id}?`)) {
            setAttitudes(attitudes.filter((attitude) => attitude.id !== id));
        }
    };

    const handleEdit = (id) => {
        const attitudeToEdit = attitudes.find((att) => att.id === id);
        if (attitudeToEdit) {
            setAttitudeCode(attitudeToEdit.code);
            setAttitude(attitudeToEdit.preference);
            setDetails(attitudeToEdit.details);
        }
    };

    const filteredAttitudes = attitudes.filter(
        (attitude) =>
            attitude.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attitude.preference.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attitude.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attitude.pic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredAttitudes.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredAttitudes.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-blue-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-500" /> Career_Attitude
            </h2>

            {/* Attitude Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={attitudeCode}
                            onChange={(e) => setAttitudeCode(e.target.value)}
                            placeholder="attitude_code"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={attitude}
                            onChange={(e) => setAttitude(e.target.value)}
                            placeholder="attitude"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                    </div>
                    <div className="relative">
                        <label htmlFor="pic" className="w-full">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <input
                                    type="file"
                                    id="pic"
                                    name="pic"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    accept=".jpg,.jpeg,.png"
                                />
                                <span className="p-2">
                                    <FaFile className="text-black-600" />
                                </span>
                                <input
                                    type="text"
                                    disabled
                                    id="filenameDisplay"
                                    placeholder="Picture"
                                    className="w-1/3 p-1 bg-white focus:outline-none border-0"
                                />
                                <span
                                    className="p-2 border-l border-gray-300 cursor-pointer"
                                    onClick={() => document.getElementById('pic').click()}
                                >
                                    Click to choose file
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="details" className="flex items-center mb-2">
                        <FaBook className="text-black-600 mr-2" />
                        <span className="text-black-600">Details</span>
                    </label>
                    <textarea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Details"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows="4"
                    />
                    {errors.details && (
                        <span className="text-red-500 text-sm">* Details cannot be empty or contain new lines</span>
                    )}
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
                        {[10, 25, 50].map((option) => (
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
                            <th className="border border-gray-200 px-4 py-2 text-left text-black-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPencilAlt className="mr-2 text-black-600" />
                                    MastData
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-black-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaKey className="mr-2 text-black-600" />
                                    Attitude Code
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-black-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaCity className="mr-2 text-black-600" />
                                    Preference
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-black-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaBook className="mr-2 text-black-600" />
                                    Details
                                </div>
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-black-700 font-semibold whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaImage className="mr-2 text-black-600" />
                                    Pic (File_name + Placeholder)
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((attitude) => (
                            <tr key={attitude.id} className="hover:bg-gray-50 transition">
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">
                                    {attitude.id}
                                    <button
                                        onClick={() => handleEdit(attitude.id)}
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(attitude.id)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">{attitude.code}</td>
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">{attitude.preference}</td>
                                <td className="border border-gray-200 px-4 py-2 text-gray-800" dangerouslySetInnerHTML={{ __html: attitude.details }} />
                                <td className="border border-gray-200 px-4 py-2 text-gray-800">
                                    <div className="flex items-center">
                                        <FaCheckCircle className="text-green-500 mr-2" />
                                        <img
                                            src={`https://margdarshak.org/uploads/masterTables/career_attitude_mast/${attitude.pic}`}
                                            alt={attitude.pic}
                                            className="w-5 h-5 mr-2"
                                        />
                                        {attitude.pic}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-black-600">
                <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredAttitudes.length)} of {filteredAttitudes.length} entries</span>
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

export default CareerAttitudeManager;