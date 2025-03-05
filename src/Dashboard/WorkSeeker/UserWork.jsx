import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaUserTie, FaSearch, FaBriefcase, FaUsers, FaPlus, FaListUl, FaHeading, FaBuilding, FaMoneyBillWave } from "react-icons/fa";

const UserWork = () => {
  // Sample data with initial state
  const [jobData, setJobData] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      heading: `Job ${index + 1}`,
      sector: `Sector ${Math.floor(index / 5) + 1}`,
      post: `Post ${Math.floor(index / 5) + 1}`,
      jobType: `Type ${Math.floor(index / 5) + 1}`,
      income: `$${1000 + index * 100}`,
      joining: `${Math.floor(Math.random() * 30)} days`,
      cvVideoUrl: `https://example.com/cv${index + 1}`,
    }))
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(jobData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = jobData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Form states
  const [formData, setFormData] = useState({
    heading: "",
    sector: "",
    post: "",
    jobType: "",
    income: "",
    joining: "",
    file: null,
  });

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [newPost, setNewPost] = useState("");

  // Dynamic options
  const [sectorOptions, setSectorOptions] = useState(
    Array.from({ length: 10 }, (_, i) => `Sector ${i + 1}`)
  );
  const [postOptions, setPostOptions] = useState(
    Array.from({ length: 10 }, (_, i) => `Post ${i + 1}`)
  );
  const [jobTypeOptions, setJobTypeOptions] = useState(
    Array.from({ length: 10 }, (_, i) => `Type ${i + 1}`)
  );

  // Handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectChange = (field, value) => {
    if (value === "add-new" && field === "post") {
      setShowPopup(true);
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.heading || !formData.sector || !formData.post) {
      alert("Please fill all required fields");
      return;
    }
    const newJob = {
      id: jobData.length + 1,
      ...formData,
      cvVideoUrl: formData.file ? URL.createObjectURL(formData.file) : "",
    };
    setJobData([...jobData, newJob]);
    setFormData({
      heading: "",
      sector: "",
      post: "",
      jobType: "",
      income: "",
      joining: "",
      file: null,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobData(jobData.filter((job) => job.id !== id));
    }
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPostOptions([...postOptions, newPost]);
      setFormData({ ...formData, post: newPost });
      setNewPost("");
      setShowPopup(false);
    }
  };

  return (
    <div className="p-6 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-center items-center mb-8">
        <FaUserTie className="text-blue-600 text-4xl mr-3" />
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight">User Work</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl mb-8 border border-gray-300 transform transition-all">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-black-700 mb-1">Heading *</label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter job title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Sector *</label>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-black-400" />
                <select
                  value={formData.sector}
                  onChange={(e) => handleSelectChange("sector", e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Sector</option>
                  {sectorOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Post *</label>
              <div className="relative">
                <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-black-400" />
                <select
                  value={formData.post}
                  onChange={(e) => handleSelectChange("post", e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Post</option>
                  {postOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                  <option value="add-new">+ Add New Post</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Job Type</label>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-black-400" />
                <select
                  value={formData.jobType}
                  onChange={(e) => handleSelectChange("jobType", e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Job Type</option>
                  {jobTypeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Income *</label>
              <input
                type="text"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="$"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Joining *</label>
              <input
                type="text"
                name="joining"
                value={formData.joining}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="days"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Attach (CV/Video) *</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx,video/*"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center"
            >
              <FaPlus className="mr-2" /> Submit
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({ heading: "", sector: "", post: "", jobType: "", income: "", joining: "", file: null })
              }
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl overflow-x-auto border border-gray-300">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-4 text-left text-sm font-semibold text-black-600">
                <div className="flex items-center">
                  <FaListUl className="mr-2 text-black-600" /> Action
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-semibold text-black-600">
                <div className="flex items-center">
                  <FaHeading className="mr-2 text-black-600" /> Heading
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-semibold text-black-600">
                <div className="flex items-center">
                  <FaBuilding className="mr-2 text-black-600" /> Sector-Post
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-semibold text-black-600">
                <div className="flex items-center">
                  <FaBriefcase className="mr-2 text-black-600" /> Job Type / Income
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-semibold text-black-600">
                <div className="flex items-center">
                  <FaEye className="mr-2 text-black-600" /> CV Doc-Video
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="border-b p-4">
                  <div className="flex space-x-3">
                    <button className="text-blue-500 hover:text-blue-700" title="Edit">
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                      onClick={() => handleDelete(record.id)}
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                    <button className="text-green-500 hover:text-green-700" title="View">
                      <FaEye className="h-5 w-5" />
                    </button>
                  </div>
                </td>
                <td className="border-b p-4 text-gray-800">{record.heading}</td>
                <td className="border-b p-4 text-gray-800">{`${record.sector} - ${record.post}`}</td>
                <td className="border-b p-4 text-gray-800">{`${record.jobType || "-"} / ${record.income || "-"}`}</td>
                <td className="border-b p-4">
                  <a
                    href={record.cvVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 flex items-center"
                  >
                    View <FaEye className="h-4 w-4 ml-1" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-2 flex justify-between items-center text-sm text-black-600 p-4">
        <p>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, jobData.length)} of {jobData.length} records</p>
        <div className="flex space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded disabled:text-blue-400 disabled:cursor-not-allowed"
          >
            « Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "text-blue-500 hover:text-blue-700"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded disabled:text-blue-400 disabled:cursor-not-allowed"
          >
            Next »
          </button>
        </div>
      </div>

      {/* Popup for Adding New Post */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Post</h3>
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter new post name"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserWork;