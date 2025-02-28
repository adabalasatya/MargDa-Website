import React, { useState } from "react";
import { FaEdit, FaTrash, FaBook, FaGraduationCap, FaUniversity, FaCalendar, FaSearch } from "react-icons/fa";
import Select from "react-select"; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const UserEducation = () => {
  // Sample data for demonstration (50 records)
  const sampleData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    course: `Course ${Math.floor(index / 5) + 1}`,
    subjects: [`Subject ${Math.floor(index / 5) + 1}`, `Subject ${Math.floor(index / 5) + 2}`],
    boardUniversity: `University ${Math.floor(index / 5) + 1}`,
    institute: `Institute ${Math.floor(index / 5) + 1}`,
    passingYear: 2015 + (index % 5)
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
  const courseOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `Course ${i + 1}`,
    label: `Course ${i + 1}`
  }));
  const subjectOptions = Array.from({ length: 15 }, (_, i) => ({
    value: `Subject ${i + 1}`,
    label: `Subject ${i + 1}`
  }));
  const boardUniversityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `University ${i + 1}`,
    label: `University ${i + 1}`
  }));
  const instituteOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `Institute ${i + 1}`,
    label: `Institute ${i + 1}`
  }));

  // State for form fields
  const [formData, setFormData] = useState({
    course: "",
    subjects: [],
    boardUniversity: "",
    institute: "",
    passingYear: null // Changed to null for DatePicker
  });

  // Handle select changes
  const handleSelectChange = (field, selectedOption) => {
    if (field === "subjects") {
      setFormData({
        ...formData,
        [field]: selectedOption ? selectedOption.map((option) => option.value) : []
      });
    } else {
      setFormData({
        ...formData,
        [field]: selectedOption ? selectedOption.value : ""
      });
    }
  };

  // Handle year change for DatePicker
  const handleYearChange = (date) => {
    setFormData({ ...formData, passingYear: date ? date.getFullYear() : null });
  };

  // Handle form submission (for demo purposes)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to save data or show a popup for record not found
  };

  // Custom input component for DatePicker to include the icon
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
      <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  ));

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Centered Header with UserEducation Icon */}
      <div className="flex justify-center items-center mb-6">
        <FaGraduationCap className="text-blue-600 text-3xl mr-3" /> {/* UserEducation Icon */}
        <h2 className="font-bold text-2xl text-gray-800">User Education</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <div className="relative mt-1">
                <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Select
                  options={courseOptions}
                  onChange={(selectedOption) => handleSelectChange("course", selectedOption)}
                  placeholder="Search or Select Course"
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
              <label className="block text-sm font-medium text-gray-700">Subject (Multiselect)</label>
              <div className="relative mt-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Select
                  isMulti
                  options={subjectOptions}
                  onChange={(selectedOptions) => handleSelectChange("subjects", selectedOptions)}
                  placeholder="Search or Select Subjects"
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
              <label className="block text-sm font-medium text-gray-700">Board / University</label>
              <div className="relative mt-1">
                <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Select
                  options={boardUniversityOptions}
                  onChange={(selectedOption) => handleSelectChange("boardUniversity", selectedOption)}
                  placeholder="Search or Select Board/University"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Institute</label>
              <div className="relative mt-1">
                <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Select
                  options={instituteOptions}
                  onChange={(selectedOption) => handleSelectChange("institute", selectedOption)}
                  placeholder="Search or Select Institute"
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
              <label className="block text-sm font-medium text-gray-700">Passing Year</label>
              <div className="relative mt-1">
                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={formData.passingYear ? new Date(formData.passingYear, 0, 1) : null}
                  onChange={handleYearChange}
                  showYearPicker
                  dateFormat="yyyy"
                  placeholderText="Select Year"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                  yearItemNumber={10} // Number of years to show in the picker
                  maxDate={new Date()} // Limit to current year or earlier
                  customInput={<CustomDateInput />} // Use custom input to include the icon
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
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Course</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Subjects</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Board / University</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Institute</th>
              <th className="border-b p-4 text-left text-sm font-medium text-gray-600">Passing Year</th>
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
                <td className="border-b p-4 text-gray-800">{record.course}</td>
                <td className="border-b p-4 text-gray-800">{record.subjects.join(", ")}</td>
                <td className="border-b p-4 text-gray-800">{record.boardUniversity}</td>
                <td className="border-b p-4 text-gray-800">{record.institute}</td>
                <td className="border-b p-4 text-gray-800">{record.passingYear}</td>
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

// Custom input component for DatePicker to include the icon
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
    <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
));

export default UserEducation;