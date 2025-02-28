import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaUserTie, FaSearch, FaBriefcase, FaUsers } from "react-icons/fa";

const UserWork = () => {
  // Sample data for demonstration (50 records)
  const sampleData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    heading: `Job ${index + 1}`,
    sector: `Sector ${Math.floor(index / 5) + 1}`,
    post: `Post ${Math.floor(index / 5) + 1}`,
    jobType: `Type ${Math.floor(index / 5) + 1}`,
    income: `$${1000 + index * 100}`,
    joining: `${Math.floor(Math.random() * 30)} days`,
    cvVideoUrl: `https://example.com/cv${index + 1}`
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
  const jobTypeOptions = Array.from({ length: 10 }, (_, i) => `Type ${i + 1}`);

  // State for form fields
  const [formData, setFormData] = useState({
    heading: "",
    sector: "",
    post: "",
    jobType: "",
    income: "",
    joining: "",
    file: null
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
    // Add logic to save data or show a popup for post not found
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Centered Header with UserWork Icon */}
      <div className="flex justify-center items-center mb-6">
        <FaUserTie className="text-blue-600 text-3xl mr-3" /> {/* UserWork Icon */}
        <h2 className="font-bold text-2xl text-gray-800">User Work</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Heading</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleInputChange}
              className="mt-1 border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter heading"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Sector with Searchable Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Sector</label>
              <div className="relative mt-1">
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.sector}
                  onChange={(e) => handleSelectChange("sector", e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                >
                  <option value="">Search or Select Sector</option>
                  {sectorOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Post with Searchable Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Post</label>
              <div className="relative mt-1">
                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.post}
                  onChange={(e) => handleSelectChange("post", e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                >
                  <option value="">Search or Select Post</option>
                  {postOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Type with Searchable Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <div className="relative mt-1">
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.jobType}
                  onChange={(e) => handleSelectChange("jobType", e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                >
                  <option value="">Search or Select Job Type</option>
                  {jobTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Income</label>
              <input
                type="text"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                className="mt-1 border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Joining</label>
              <input
                type="text"
                name="joining"
                value={formData.joining}
                onChange={handleInputChange}
                className="mt-1 border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="days"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Attach (CV doc + Video)</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="mt-1 border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                accept=".pdf,.doc,.docx,video/*"
              />
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
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Action</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Heading</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Sector-Post</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Job Type / Income</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">CV Doc-Video</th>
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
                <td className="border-b p-4 text-gray-800">{record.heading}</td>
                <td className="border-b p-4 text-gray-800">{`${record.sector} - ${record.post}`}</td>
                <td className="border-b p-4 text-gray-800">{`${record.jobType} / ${record.income}`}</td>
                <td className="border-b p-4">
                  <a href={record.cvVideoUrl} className="text-blue-500 hover:text-blue-700">
                    url <FaEye className="h-4 w-4 inline" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-gray-500">
          + If post not found then open a Popup so that User can add it.
        </p>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <p>Showing {indexOfFirstRecord + 1} to {indexOfLastRecord} of {sampleData.length} records</p>
        <div className="space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded disabled:text-gray-300 disabled:cursor-not-allowed"
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
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Next &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserWork;