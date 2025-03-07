import React, { useState } from 'react';
import { FaChalkboardTeacher, FaKey, FaFile, FaBook, FaEdit, FaTrash, FaSearch, FaCheckCircle, FaPencilAlt, FaCity, FaImage } from 'react-icons/fa';

// Dummy data
const dummyAptitudes = [
  { id: 6, code: 'E', preference: 'Enterprising', details: 'in <b>Enterprising Activities</b>. People with Enterprising interests like work activities that have to do with starting up and carrying out projects, especially business ventures. They like persuading and leading people, making decisions, and taking risks for profit. These people prefer action more than thought.', pic: 'enterprising.jpg' },
  { id: 5, code: 'R', preference: 'Realistic', details: 'in <b>Realistic Activities</b>. People with Realistic interests like work activities that include practical, hands-on problems and solutions. They enjoy dealing with plants, animals, and tangible materials like wood, tools, and machinery. They enjoy outside work. Often people with Realistic interests do not like occupations that mainly involve doing paperwork or working closely with others.', pic: 'realistic.jpg' },
  { id: 4, code: 'A', preference: 'Artistic', details: 'in <b>Artistic Activities</b>. People with Artistic interests like work activities that deal with the artistic side of things, such as forms, designs, and patterns. They like self-expression in their work and prefer settings where work can be done without following a clear set of rules.', pic: 'artistic.jpg' },
  { id: 3, code: 'I', preference: 'Investigative', details: 'in <b>Investigative Activities</b>. People with Investigative interests like work activities that have to do with ideas and thinking more than with physical activity. They like to search for facts and figure out problems mentally more than to persuade or lead people.', pic: 'investigative.jpg' },
  { id: 2, code: 'S', preference: 'Social', details: 'in <b>Social Activities</b>. People with Social interests like work activities that assist others and promote learning and personal development. They prefer to communicate more than to think of solutions or work with objects, machines, or data. They like to teach, give advice, help, or otherwise are of service to people.', pic: 'social.jpg' },
  { id: 1, code: 'C', preference: 'Conventional', details: 'in <b>Conventional Activities</b>. People with Conventional interests like work activities that follow set procedures and routines. They prefer working with data and detail more than with ideas. They prefer work in which there are precise standards more than work in which you have to judge things by yourself. These people like working where the lines of authority are clear.', pic: 'conventional.jpg' },
];

const CareerAptitudeManager = () => {
  const [aptitudeCode, setAptitudeCode] = useState('');
  const [aptitude, setAptitude] = useState('');
  const [details, setDetails] = useState('');
  const [pic, setPic] = useState(null);
  const [aptitudes, setAptitudes] = useState(dummyAptitudes);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      setPic(file);
      // Simulate setting a filename for display (dummy logic)
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

    if (!aptitudeCode) newErrors.aptitudeCode = true;
    else if (aptitudeCode.length > 1) newErrors.aptitudeCodeLength = true;

    if (!aptitude) newErrors.aptitude = true;

    if (!pic) newErrors.pic = true;
    else if (!['image/jpeg', 'image/png', 'image/jpg'].includes(pic.type)) newErrors.picType = true;

    if (details.trim() === '' || details.includes('\n')) newErrors.details = true; // Revert to original validation

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newAptitude = {
      id: aptitudes.length + 1,
      code: aptitudeCode,
      preference: aptitude,
      details, // Use the textarea value
      pic: pic.name || 'default.jpg', // Dummy filename for demo
    };
    setAptitudes([newAptitude, ...aptitudes]);
    setAptitudeCode('');
    setAptitude('');
    setDetails('');
    setPic(null);
    document.getElementById('filenameDisplay').value = '';
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete mastdata: ${id}?`)) {
      setAptitudes(aptitudes.filter((aptitude) => aptitude.id !== id));
    }
  };

  const handleEdit = (id) => {
    // Simulate edit functionality (you can expand this with a form or modal)
    const aptitudeToEdit = aptitudes.find((apt) => apt.id === id); // Fixed typo in 'at.id'
    if (aptitudeToEdit) {
      setAptitudeCode(aptitudeToEdit.code);
      setAptitude(aptitudeToEdit.preference);
      setDetails(aptitudeToEdit.details);
      // Note: Handling file upload for editing would require more complex state management
    }
  };

  const filteredAptitudes = aptitudes.filter(
    (aptitude) =>
      aptitude.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aptitude.preference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aptitude.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aptitude.pic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAptitudes.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredAptitudes.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-blue-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <FaChalkboardTeacher className="mr-2 text-blue-500" /> Career_Aptitude
      </h2>

      {/* Aptitude Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              value={aptitudeCode}
              onChange={(e) => setAptitudeCode(e.target.value)}
              placeholder="aptitude_code"
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
          </div>
          <div className="relative">
            <input
              type="text"
              value={aptitude}
              onChange={(e) => setAptitude(e.target.value)}
              placeholder="aptitude"
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
                <span className="p-2 ">
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
                  className="p-2  border-l border-gray-300 cursor-pointer"
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
        Aptitude Code
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
            {currentRecords.map((aptitude) => (
              <tr key={aptitude.id} className="hover:bg-gray-50 transition">
                <td className="border border-gray-200 px-4 py-2 text-gray-800">
                  {aptitude.id}
                  <button
                    onClick={() => handleEdit(aptitude.id)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(aptitude.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800">{aptitude.code}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800">{aptitude.preference}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800" dangerouslySetInnerHTML={{ __html: aptitude.details }} />
                <td className="border border-gray-200 px-4 py-2 text-gray-800">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <img
                      src={`https://margdarshak.org/uploads/masterTables/career_aptitude_mast/${aptitude.pic}`}
                      alt={aptitude.pic}
                      className="w-5 h-5 mr-2"
                    />
                    {aptitude.pic}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-black-600">
        <span>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredAptitudes.length)} of {filteredAptitudes.length} entries</span>
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

export default CareerAptitudeManager;