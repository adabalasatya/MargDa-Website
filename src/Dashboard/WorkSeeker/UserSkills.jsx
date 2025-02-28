import React, { useState } from "react";
import { FaEdit, FaTrash, FaBook, FaStar, FaCheck, FaFile, FaSearch } from "react-icons/fa";
import Select from "react-select";

const UserSkills = () => {
  // Sample data for demonstration (50 records)
  const sampleData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    skill: `Skill ${Math.floor(index / 5) + 1}`,
    score: `${Math.floor(Math.random() * 100)}`,
    skillsLevel: `Level ${Math.floor(index / 5) + 1}`,
    useExample: `Example ${index + 1}`,
    proofUrl: `https://example.com/proof${index + 1}`
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
  const skillOptions = Array.from({ length: 15 }, (_, i) => ({
    value: `Skill ${i + 1}`,
    label: `Skill ${i + 1}`
  }));

  // State for form fields
  const [formData, setFormData] = useState({
    skill: "",
    score: "",
    skillsLevel: "",
    useExample: "",
    proofFile: null
  });

  // Handle select changes for Skills
  const handleSkillChange = (selectedOption) => {
    setFormData({
      ...formData,
      skill: selectedOption ? selectedOption.value : ""
    });
  };

  // Handle input changes for other fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, proofFile: e.target.files[0] });
  };

  // Handle skills test (open a new page or modal for testing)
  const handleSkillsTest = () => {
    // For demo, open a new window or modal (you can customize this logic)
    const newWindow = window.open("/skills-test", "_blank", "width=800,height=600");
    if (newWindow) {
      newWindow.focus();
    } else {
      alert("Please allow popups to take the skills test.");
    }
    // After the test, you could update the score via a callback or state update
  };

  // Handle form submission (for demo purposes)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.score) {
      handleSkillsTest(); // Open skills test if no score is provided
    } else {
      console.log("Form submitted:", formData);
      // Add logic to save data or show a popup for record not found
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Centered Header with UserSkills Icon */}
      <div className="flex justify-center items-center mb-6">
        <FaBook className="text-blue-600 text-3xl mr-3" /> {/* UserSkills Icon */}
        <h2 className="font-bold text-2xl text-gray-800">User Skills</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <div className="relative mt-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Select
                  options={skillOptions}
                  onChange={handleSkillChange}
                  placeholder="Search or Select Skill"
                  className="border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingLeft: "2.5rem",
                      minHeight: "48px",
                      borderRadius: "0.5rem",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999, // Ensure the dropdown appears above other elements
                    }),
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Score</label>
              <div className="relative mt-1 flex items-center">
                <FaStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="score"
                  value={formData.score}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                  placeholder="Enter Score (or take test)"
                />
                {!formData.score && (
                  <button
                    type="button"
                    onClick={handleSkillsTest}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Take Test
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Skills Level</label>
              <div className="relative mt-1">
                <FaCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="skillsLevel"
                  value={formData.skillsLevel}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                  placeholder="Enter Skills Level"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Use Example</label>
              <div className="relative mt-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="useExample"
                  value={formData.useExample}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                  placeholder="Enter Use Example"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proof File</label>
              <div className="relative mt-1">
                <FaFile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
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
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Action</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Skills</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Score-Level</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Use Example</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Proof</th>
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
                  </div>
                </td>
                <td className="border-b p-4 text-gray-800">{record.skill}</td>
                <td className="border-b p-4 text-gray-800">{`${record.score} - ${record.skillsLevel}`}</td>
                <td className="border-b p-4 text-gray-800">{record.useExample}</td>
                <td className="border-b p-4">
                  <a href={record.proofUrl} className="text-blue-500 hover:text-blue-700">
                    Doc URL
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

export default UserSkills;