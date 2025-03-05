import React, { useState } from "react";
import { FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope, FaLink, FaSearch, FaListUl } from "react-icons/fa";

const UserReference = () => {
  // Sample data with dynamic state
  const [references, setReferences] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      name: `Reference ${Math.floor(index / 5) + 1}`,
      mobile: `123-456-789${index % 10}`,
      email: `reference${index + 1}@example.com`,
      relation: `Relation ${Math.floor(index / 5) + 1}`,
    }))
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    relation: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(references.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentReferences = references.slice(indexOfFirstRecord, indexOfLastRecord);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  // Handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email || !formData.relation) {
      alert("Please fill all fields");
      return;
    }
    if (editingId) {
      setReferences(
        references.map((ref) =>
          ref.id === editingId ? { ...ref, ...formData } : ref
        )
      );
      setEditingId(null);
    } else {
      const newReference = {
        id: references.length + 1,
        ...formData,
      };
      setReferences([...references, newReference]);
    }
    setFormData({ name: "", mobile: "", email: "", relation: "" });
  };

  const handleEdit = (ref) => {
    setFormData({
      name: ref.name,
      mobile: ref.mobile,
      email: ref.email,
      relation: ref.relation,
    });
    setEditingId(ref.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reference?")) {
      setReferences(references.filter((ref) => ref.id !== id));
    }
  };

  return (
    <div className="p-6  min-h-screen font-sans max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-center items-center mb-8">
        <FaUser className="text-blue-600 text-4xl mr-3" />
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight">User Reference</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl mb-8 border border-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-md font-semibold text-black-700 mb-2">Name *</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 text-xl" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-12 text-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-md font-semibold text-black-700 mb-2">Mobile *</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 text-xl" />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter Mobile"
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-12 text-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-md font-semibold text-black-700 mb-2">Email *</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 text-xl" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-12 text-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-md font-semibold text-black-700 mb-2">Relation</label>
              <div className="relative">
                <FaLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 text-xl" />
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  placeholder="Enter Relation"
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-12 text-lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 text-lg"
            >
              {editingId ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ name: "", mobile: "", email: "", relation: "" });
                setEditingId(null);
              }}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 text-lg"
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
              <th className="border-b p-6 text-left text-md font-medium text-black-600">
                <div className="flex items-center">
                  <FaListUl className="mr-3 text-xl" /> Action
                </div>
              </th>
              <th className="border-b p-6 text-left text-md font-medium text-black-600">
                <div className="flex items-center">
                  <FaUser className="mr-3 text-xl" /> Name
                </div>
              </th>
              <th className="border-b p-6 text-left text-md font-medium text-black-600">
                <div className="flex items-center">
                  <FaPhone className="mr-3 text-xl" /> Mobile
                </div>
              </th>
              <th className="border-b p-6 text-left text-md font-medium text-black-600">
                <div className="flex items-center">
                  <FaEnvelope className="mr-3 text-xl" /> Email
                </div>
              </th>
              <th className="border-b p-6 text-left text-md font-medium text-black-600">
                <div className="flex items-center">
                  <FaLink className="mr-3 text-xl" /> Relation
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentReferences.map((ref) => (
              <tr key={ref.id} className="hover:bg-gray-50 transition-colors">
                <td className="border-b p-6 text-lg">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(ref)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FaEdit className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(ref.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash className="h-6 w-6" />
                    </button>
                  </div>
                </td>
                <td className="border-b p-6 text-gray-800 text-lg">{ref.name}</td>
                <td className="border-b p-6 text-gray-800 text-lg">{ref.mobile}</td>
                <td className="border-b p-6 text-gray-800 text-lg">{ref.email}</td>
                <td className="border-b p-6 text-gray-800 text-lg">{ref.relation}</td>
              </tr>
            ))}
            {currentReferences.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500 text-lg">
                  No records found.{" "}
                  <button
                    onClick={() => setShowPopup(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Add a new reference
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="mt-2 text-md text-gray-500">
          + If record not found then open a Popup so that User can add it.
        </p>
      </div>

      {/* Pagination */}
      <div className="mt-2 p-4 flex justify-between items-center text-md text-black-600">
        <p>
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, references.length)} of{" "}
          {references.length} records
        </p>
        <div className="space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-blue-500 hover:text-blue-700 px-4 py-2 rounded disabled:text-blue-400 disabled:cursor-not-allowed"
          >
            « Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "text-blue-500 hover:text-blue-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-blue-500 hover:text-blue-700 px-4 py-2 rounded disabled:text-blue-400 disabled:cursor-not-allowed"
          >
            Next »
          </button>
        </div>
      </div>

      {/* Popup for Adding New Reference */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
            <h3 className="text-xl font-semibold mb-4">Add New Reference</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-md font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  className="border border-gray-300 p-4 w-full rounded-lg text-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-gray-700 mb-2">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter Mobile"
                  className="border border-gray-300 p-4 w-full rounded-lg text-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className="border border-gray-300 p-4 w-full rounded-lg text-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-gray-700 mb-2">Relation</label>
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  placeholder="Enter Relation"
                  className="border border-gray-300 p-4 w-full rounded-lg text-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReference;