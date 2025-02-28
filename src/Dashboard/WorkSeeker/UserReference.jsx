import React, { useState } from "react";
import { FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope, FaLink, FaSearch } from "react-icons/fa";

const UserReference = () => {
  // Sample data for demonstration (50 records)
  const initialReferences = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Reference ${Math.floor(index / 5) + 1}`,
    mobile: `123-456-789${index % 10}`,
    email: `reference${index + 1}@example.com`,
    relation: `Relation ${Math.floor(index / 5) + 1}`
  }));

  // State for form fields and references
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    relation: ""
  });
  const [references, setReferences] = useState(initialReferences);
  const [editingId, setEditingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(references.length / recordsPerPage);

  // Get current records for the page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentReferences = references.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (add or edit reference)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing reference
      setReferences(
        references.map((ref) =>
          ref.id === editingId ? { ...ref, ...formData } : ref
        )
      );
      setEditingId(null);
    } else {
      // Add new reference
      const newReference = {
        id: references.length + 1,
        ...formData
      };
      setReferences([...references, newReference]);
    }
    // Reset form
    setFormData({ name: "", mobile: "", email: "", relation: "" });
  };

  // Handle edit
  const handleEdit = (ref) => {
    setFormData({
      name: ref.name,
      mobile: ref.mobile,
      email: ref.email,
      relation: ref.relation
    });
    setEditingId(ref.id);
  };

  // Handle delete
  const handleDelete = (id) => {
    setReferences(references.filter((ref) => ref.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans max-w-4xl mx-auto">
      {/* Centered Header with UserReference Icon */}
      <div className="flex justify-center items-center mb-6">
        <FaUser className="text-blue-600 text-3xl mr-3" /> {/* UserReference Icon */}
        <h2 className="font-bold text-2xl text-gray-800">User Reference</h2>
      </div>

      {/* Form Section - Wider Layout */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative mt-1">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <div className="relative mt-1">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter Mobile"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Relation</label>
              <div className="relative mt-1">
                <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  placeholder="Enter Relation"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {editingId ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ name: "", mobile: "", email: "", relation: "" });
                setEditingId(null);
              }}
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
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Mobile</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Relation</th>
            </tr>
          </thead>
          <tbody>
            {currentReferences.map((ref) => (
              <tr key={ref.id} className="hover:bg-gray-50">
                <td className="border-b p-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(ref)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(ref.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
                <td className="border-b p-4 text-gray-800">{ref.name}</td>
                <td className="border-b p-4 text-gray-800">{ref.mobile}</td>
                <td className="border-b p-4 text-gray-800">{ref.email}</td>
                <td className="border-b p-4 text-gray-800">{ref.relation}</td>
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
        <p>Showing {indexOfFirstRecord + 1} to {indexOfLastRecord} of {references.length} records</p>
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

export default UserReference;