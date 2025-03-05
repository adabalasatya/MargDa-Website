import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaCalendar, FaUserTie, FaBriefcase, FaUsers, FaFile, FaSearch, FaListUl, FaBuilding, FaUser } from "react-icons/fa";

const UserExperience = () => {
  // Sample data for demonstration (50 records)
  const sampleData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    dateFrom: new Date(2023, 0, index % 28 + 1).toISOString().split("T")[0],
    dateTo: new Date(2023, 0, (index % 28 + 1) + 10).toISOString().split("T")[0],
    sector: `Sector ${Math.floor(index / 5) + 1}`,
    post: `Post ${Math.floor(index / 5) + 1}`,
    employer: `Employer ${Math.floor(index / 5) + 1}`,
    employerContact: `Contact ${Math.floor(index / 5) + 1}`,
    keyResponsibility: `Responsibility ${index + 1}`,
    expDocUrl: `https://example.com/doc${index + 1}`,
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(sampleData.length / recordsPerPage);

  // Get current records for the page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sampleData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sample options for select fields
  const sectorOptions = Array.from({ length: 10 }, (_, i) => `Sector ${i + 1}`);
  const postOptions = Array.from({ length: 10 }, (_, i) => `Post ${i + 1}`);
  const employerOptions = Array.from({ length: 10 }, (_, i) => `Employer ${i + 1}`);
  const employerContactOptions = Array.from({ length: 10 }, (_, i) => `Contact ${i + 1}`);

  // State for form fields
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    sector: "",
    post: "",
    keyResponsibility: "",
    employer: "",
    employerContact: "",
    file: null,
  });

  // Handle select changes
  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle form submission (for demo purposes)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to save data or show a popup for record not found
  };

  return (
    <div className="p-6  min-h-screen font-sans">
      {/* Centered Header with UserExperience Icon */}
      <div className="flex justify-center items-center mb-6">
        <FaUserTie className="text-blue-600 text-3xl mr-3" />
        <h2 className="font-bold text-3xl text-gray-800">User Experience</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-black-700">Date From *</label>
              <div className="relative mt-1">
                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <input
                  type="date"
                  name="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black-700">Date To *</label>
              <div className="relative mt-1">
                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <input
                  type="date"
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black-700">Sector *</label>
              <div className="relative mt-1">
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <select
                  value={formData.sector}
                  onChange={(e) => handleSelectChange("sector", e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                >
                  <option value="">Search or Select Sector</option>
                  {sectorOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-black-700">Post *</label>
              <div className="relative mt-1">
                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <select
                  value={formData.post}
                  onChange={(e) => handleSelectChange("post", e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                >
                  <option value="">Search or Select Post</option>
                  {postOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black-700">Key Responsibility *</label>
              <div className="relative mt-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <input
                  type="text"
                  name="keyResponsibility"
                  value={formData.keyResponsibility}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                  placeholder="Enter key responsibility"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-black-700">Employer *</label>
              <div className="relative mt-1">
                <FaUserTie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <select
                  value={formData.employer}
                  onChange={(e) => handleSelectChange("employer", e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                >
                  <option value="">Search or Select Employer</option>
                  {employerOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black-700">Employer Contact *</label>
              <div className="relative mt-1">
                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <select
                  value={formData.employerContact}
                  onChange={(e) => handleSelectChange("employerContact", e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                >
                  <option value="">Search or Select Contact</option>
                  {employerContactOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black-700">Experience Doc *</label>
              <div className="relative mt-1">
                <FaFile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Back
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg border border-gray-300">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaListUl className="mr-2" /> Action
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaCalendar className="mr-2" /> Date from – to
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaBuilding className="mr-2" /> Sector-Post
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaUser className="mr-2" /> Employer
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaBriefcase className="mr-2" /> KR
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaFile className="mr-2" /> Exp Doc
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="border-b p-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash className="h-5 w-5" />
                    </button>
                    <button className="text-green-500 hover:text-green-700">
                      <FaEye className="h-5 w-5" />
                    </button>
                  </div>
                </td>
                <td className="border-b p-4 text-gray-800">{`${record.dateFrom} – ${record.dateTo}`}</td>
                <td className="border-b p-4 text-gray-800">{`${record.sector} - ${record.post}`}</td>
                <td className="border-b p-4 text-gray-800">{record.employer}</td>
                <td className="border-b p-4 text-gray-800">{record.keyResponsibility}</td>
                <td className="border-b p-4">
                  <a href={record.expDocUrl} className="text-blue-500 hover:text-blue-700">
                    url <FaEye className="h-4 w-4 inline" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-gray-500">
          + If record not found then open a Popup so that User can add it.
        </p>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <p>Showing {indexOfFirstRecord + 1} to {indexOfLastRecord} of {sampleData.length} records</p>
        <div className="space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded disabled:text-blue-400 disabled:cursor-not-allowed"
          >
            &lt;&lt; Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`text-blue-500 hover:text-blue-700 px-2 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-100" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded disabled:text-blue-400 disabled:cursor-not-allowed"
          >
            Next &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserExperience;