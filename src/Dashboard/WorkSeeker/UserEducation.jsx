import React, { useState } from "react";
import { FaEdit, FaTrash, FaBook, FaGraduationCap, FaUniversity, FaCalendar, FaSearch, FaListUl, FaChalkboard } from "react-icons/fa";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserEducation = () => {
  // Sample data with initial state
  const [educationData, setEducationData] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      course: `Course ${Math.floor(index / 5) + 1}`,
      subjects: [`Subject ${Math.floor(index / 5) + 1}`, `Subject ${Math.floor(index / 5) + 2}`],
      boardUniversity: `University ${Math.floor(index / 5) + 1}`,
      institute: `Institute ${Math.floor(index / 5) + 1}`,
      passingYear: 2015 + (index % 5),
    }))
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(educationData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = educationData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Form state
  const [formData, setFormData] = useState({
    course: "",
    subjects: [],
    boardUniversity: "",
    institute: "",
    passingYear: null,
  });

  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  // Sample options for select fields
  const courseOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `Course ${i + 1}`,
    label: `Course ${i + 1}`,
  }));
  const subjectOptions = Array.from({ length: 15 }, (_, i) => ({
    value: `Subject ${i + 1}`,
    label: `Subject ${i + 1}`,
  }));
  const boardUniversityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `University ${i + 1}`,
    label: `University ${i + 1}`,
  }));
  const instituteOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `Institute ${i + 1}`,
    label: `Institute ${i + 1}`,
  }));

  // Handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectChange = (field, selectedOption) => {
    if (field === "subjects") {
      setFormData({
        ...formData,
        [field]: selectedOption ? selectedOption.map((option) => option.value) : [],
      });
    } else {
      setFormData({
        ...formData,
        [field]: selectedOption ? selectedOption.value : "",
      });
    }
  };

  const handleYearChange = (date) => {
    setFormData({ ...formData, passingYear: date ? date.getFullYear() : null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.course || !formData.boardUniversity || !formData.institute || !formData.passingYear) {
      alert("Please fill all required fields");
      return;
    }
    const newRecord = {
      id: educationData.length + 1,
      ...formData,
    };
    setEducationData([...educationData, newRecord]);
    setFormData({
      course: "",
      subjects: [],
      boardUniversity: "",
      institute: "",
      passingYear: null,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setEducationData(educationData.filter((record) => record.id !== id));
    }
  };

  // Custom input for DatePicker
  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="relative">
      <input
        type="text"
        value={value || ""}
        onClick={onClick}
        readOnly
        ref={ref}
        className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
        placeholder="Select Year"
      />
      <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
    </div>
  ));

  return (
    <div className="p-6  min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-center items-center mb-8">
        <FaGraduationCap className="text-blue-600 text-4xl mr-3  " />
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight">User Education</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl mb-8 border border-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Course *</label>
              <div className="relative">
                <Select
                  options={courseOptions}
                  onChange={(selectedOption) => handleSelectChange("course", selectedOption)}
                  placeholder="Search or Select Course"
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingLeft: "2.5rem",
                      minHeight: "48px",
                      borderRadius: "0.5rem",
                      borderColor: "#d1d5db",
                    }),
                  }}
                />
                <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Subjects (Multiselect) *</label>
              <div className="relative">
                <Select
                  isMulti
                  options={subjectOptions}
                  onChange={(selectedOptions) => handleSelectChange("subjects", selectedOptions)}
                  placeholder="Search or Select Subjects"
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingLeft: "2.5rem",
                      minHeight: "48px",
                      borderRadius: "0.5rem",
                      borderColor: "#d1d5db",
                    }),
                  }}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Board / University *</label>
              <div className="relative">
                <Select
                  options={boardUniversityOptions}
                  onChange={(selectedOption) => handleSelectChange("boardUniversity", selectedOption)}
                  placeholder="Search or Select Board/University"
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingLeft: "2.5rem",
                      minHeight: "48px",
                      borderRadius: "0.5rem",
                      borderColor: "#d1d5db",
                    }),
                  }}
                />
                <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Institute *</label>
              <div className="relative">
                <Select
                  options={instituteOptions}
                  onChange={(selectedOption) => handleSelectChange("institute", selectedOption)}
                  placeholder="Search or Select Institute"
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingLeft: "2.5rem",
                      minHeight: "48px",
                      borderRadius: "0.5rem",
                      borderColor: "#d1d5db",
                    }),
                  }}
                />
                <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black-700 mb-1">Passing Year *</label>
              <DatePicker
                selected={formData.passingYear ? new Date(formData.passingYear, 0, 1) : null}
                onChange={handleYearChange}
                showYearPicker
                dateFormat="yyyy"
                placeholderText="Select Year"
                className="w-full"
                yearItemNumber={10}
                maxDate={new Date()}
                customInput={<CustomDateInput />}
              />
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
                  course: "",
                  subjects: [],
                  boardUniversity: "",
                  institute: "",
                  passingYear: null,
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
                  <FaBook className="mr-2" /> Course
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaChalkboard className="mr-2" /> Subjects
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaUniversity className="mr-2" /> Board / University
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaUniversity className="mr-2" /> Institute
                </div>
              </th>
              <th className="border-b p-4 text-left text-sm font-medium text-black-600">
                <div className="flex items-center">
                  <FaCalendar className="mr-2" /> Passing Year
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
                <td className="border-b p-4 text-gray-800">{record.course}</td>
                <td className="border-b p-4 text-gray-800">{record.subjects.join(", ")}</td>
                <td className="border-b p-4 text-gray-800">{record.boardUniversity}</td>
                <td className="border-b p-4 text-gray-800">{record.institute}</td>
                <td className="border-b p-4 text-gray-800">{record.passingYear}</td>
              </tr>
            ))}
            {currentRecords.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No records found.{" "}
                  <button
                    onClick={() => setShowPopup(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Add a new record
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
      <div className="mt-2 flex justify-between items-center text-sm text-black-600 p-4">
        <p>
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, educationData.length)} of{" "}
          {educationData.length} records
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

      {/* Popup for Adding New Record */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Education Record</h3>
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Course *</label>
                <Select
                  options={courseOptions}
                  onChange={(selectedOption) => handleSelectChange("course", selectedOption)}
                  placeholder="Select Course"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subjects</label>
                <Select
                  isMulti
                  options={subjectOptions}
                  onChange={(selectedOptions) => handleSelectChange("subjects", selectedOptions)}
                  placeholder="Select Subjects"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Board / University *</label>
                <Select
                  options={boardUniversityOptions}
                  onChange={(selectedOption) => handleSelectChange("boardUniversity", selectedOption)}
                  placeholder="Select Board/University"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Institute *</label>
                <Select
                  options={instituteOptions}
                  onChange={(selectedOption) => handleSelectChange("institute", selectedOption)}
                  placeholder="Select Institute"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Passing Year *</label>
                <DatePicker
                  selected={formData.passingYear ? new Date(formData.passingYear, 0, 1) : null}
                  onChange={handleYearChange}
                  showYearPicker
                  dateFormat="yyyy"
                  placeholderText="Select Year"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  yearItemNumber={10}
                  maxDate={new Date()}
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

export default UserEducation;