import React, { useState } from "react";
import { FaEdit, FaTrash, FaBook, FaStar, FaCheck, FaFile, FaSearch, FaListUl } from "react-icons/fa";
import Select, { components } from "react-select";

const UserSkills = () => {
  // Dynamic data state
  const [skillsData, setSkillsData] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      skill: `Skill ${Math.floor(index / 5) + 1}`,
      score: `${Math.floor(Math.random() * 100)}`,
      skillsLevel: `Level ${Math.floor(index / 5) + 1}`,
      useExample: `Example ${index + 1}`,
      proofUrl: `https://example.com/proof${index + 1}`,
    }))
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(skillsData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = skillsData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Form state
  const [formData, setFormData] = useState({
    skill: "",
    score: "",
    skillsLevel: "",
    useExample: "",
    proofFile: null,
  });

  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  // Sample options for select fields
  const skillOptions = Array.from({ length: 15 }, (_, i) => ({
    value: `Skill ${i + 1}`,
    label: `Skill ${i + 1}`,
  }));

  // Handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSkillChange = (selectedOption) => {
    setFormData({
      ...formData,
      skill: selectedOption ? selectedOption.value : "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proofFile: e.target.files[0] });
  };

  const handleSkillsTest = () => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    if (newWindow) {
      newWindow.document.write("<h3>Skills Test</h3><p>Simulating test... Score: 85</p>");
      setTimeout(() => {
        setFormData({ ...formData, score: "85" });
        newWindow.close();
      }, 2000);
    } else {
      alert("Please allow popups to take the skills test.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.skill) {
      alert("Please select a skill");
      return;
    }
    if (!formData.score) {
      handleSkillsTest();
      return;
    }
    const newSkill = {
      id: skillsData.length + 1,
      ...formData,
      proofUrl: formData.proofFile ? URL.createObjectURL(formData.proofFile) : "",
    };
    setSkillsData([...skillsData, newSkill]);
    setFormData({
      skill: "",
      score: "",
      skillsLevel: "",
      useExample: "",
      proofFile: null,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setSkillsData(skillsData.filter((skill) => skill.id !== id));
    }
  };

  // Custom Control component for react-select
  const CustomControl = ({ children, ...props }) => {
    return (
      <components.Control {...props}>
        <FaSearch className="ml-3 text-black-400" />
        {children}
      </components.Control>
    );
  };

  return (
    <div className="p-6  min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-center items-center mb-8">
        <FaBook className="text-blue-600 text-4xl mr-3 " />
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight">User Skills</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl mb-8 border border-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Skills *</label>
              <Select
                options={skillOptions}
                onChange={handleSkillChange}
                placeholder="Search or Select Skill"
                className="w-full"
                classNamePrefix="react-select"
                components={{ Control: CustomControl }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    minHeight: "48px",
                    borderRadius: "0.5rem",
                    borderColor: "#d1d5db",
                    display: "flex",
                    alignItems: "center",
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    paddingLeft: "2.5rem", // Space for the icon
                  }),
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Score *</label>
              <div className="relative flex items-center">
                <FaStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <input
                  type="text"
                  name="score"
                  value={formData.score}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                  placeholder="Enter Score or Take Test"
                />
              
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Skills Level *</label>
              <div className="relative">
                <FaCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <input
                  type="text"
                  name="skillsLevel"
                  value={formData.skillsLevel}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                  placeholder="Enter Skills Level"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Use Example *</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <input
                  type="text"
                  name="useExample"
                  value={formData.useExample}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg pl-10"
                  placeholder="Enter Use Example"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Proof File *</label>
              <div className="relative">
                <FaFile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-3 w-full rounded-lg  pl-10"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  skill: "",
                  score: "",
                  skillsLevel: "",
                  useExample: "",
                  proofFile: null,
                })
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
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaListUl className="mr-2" /> Action
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaBook className="mr-2" /> Skills
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaStar className="mr-2" /> Score-Level
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaCheck className="mr-2" /> Use Example
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaFile className="mr-2" /> Proof
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="border-b p-4">
                  <div className="flex space-x-2">
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
                  </div>
                </td>
                <td className="border-b p-4 text-gray-800">{record.skill}</td>
                <td className="border-b p-4 text-gray-800">{`${record.score} - ${record.skillsLevel}`}</td>
                <td className="border-b p-4 text-gray-800">{record.useExample}</td>
                <td className="border-b p-4">
                  <a
                    href={record.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Doc URL
                  </a>
                </td>
              </tr>
            ))}
            {currentRecords.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No records found.{" "}
                  <button
                    onClick={() => setShowPopup(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Add a new skill
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-gray-500">
          + If record not found then open a Popup so that User can add it.
        </p>
      </div>

      {/* Pagination */}
      <div className="mt-2 p-4 flex justify-between items-center text-sm text-black-600">
        <p>
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, skillsData.length)} of{" "}
          {skillsData.length} records
        </p>
        <div className="space-x-2">
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
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "text-blue-500 hover:text-blue-700"
              }`}
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

      {/* Popup for Adding New Skill */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Skills *</label>
                <Select
                  options={skillOptions}
                  onChange={handleSkillChange}
                  placeholder="Search or Select Skill"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Score</label>
                <input
                  type="text"
                  name="score"
                  value={formData.score}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg"
                  placeholder="Enter Score or Take Test"
                />
                {!formData.score && (
                  <button
                    type="button"
                    onClick={handleSkillsTest}
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Take Test
                  </button>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Skills Level</label>
                <input
                  type="text"
                  name="skillsLevel"
                  value={formData.skillsLevel}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg"
                  placeholder="Enter Skills Level"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Use Example</label>
                <input
                  type="text"
                  name="useExample"
                  value={formData.useExample}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 w-full rounded-lg"
                  placeholder="Enter Use Example"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Proof File</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-3 w-full rounded-lg"
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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

export default UserSkills;