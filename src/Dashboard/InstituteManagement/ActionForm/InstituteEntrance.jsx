import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaCheck,
  FaTimes,
  FaUniversity,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaBookOpen,
  FaClipboardList,
  FaCheckCircle,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa";

const InstituteEntrance = () => {
  const location = useLocation();
  const [institute, setInstitute] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [qualifyingCourse, setQualifyingCourse] = useState("");
  const [qualifyingSubjects, setQualifyingSubjects] = useState([]);
  const [entranceTest, setEntranceTest] = useState(false);
  const [entranceDetails, setEntranceDetails] = useState("");
  const [coursesList, setCoursesList] = useState([
    "B.Sc",
    "B.A",
    "B.Com",
    "B.Tech",
  ]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const subjects = [
    "1.Mathematics",
    "2.Physics",
    "3.Chemistry",
    "4.Biology",
    "5.History",
    "6.Economics",
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // You can adjust the number of records per page

  useEffect(() => {
    const { instituteName, instID } = location.state || {};
    if (instituteName) {
      setInstitute(instituteName);
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};
    if (!course) newErrors.course = "Course is required";
    if (!qualifyingCourse)
      newErrors.qualifyingCourse = "Qualifying Course is required";
    if (qualifyingSubjects.length === 0)
      newErrors.qualifyingSubjects =
        "At least one qualifying subject is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const newCourse = {
      id: editCourseId || courses.length + 1,
      institute,
      course,
      qualifyingCourse,
      qualifyingSubjects,
      entranceTest,
      entranceDetails,
    };

    if (editCourseId) {
      setCourses(courses.map((c) => (c.id === editCourseId ? newCourse : c)));
      setEditCourseId(null);
    } else {
      setCourses([...courses, newCourse]);
    }

    // Reset form fields
    setCourse("");
    setQualifyingCourse("");
    setQualifyingSubjects([]);
    setEntranceTest(false);
    setEntranceDetails("");
    setLoading(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const handleEdit = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    if (courseToEdit) {
      setInstitute(courseToEdit.institute); // This should ideally come from location state, not courses
      setCourse(courseToEdit.course);
      setQualifyingCourse(courseToEdit.qualifyingCourse);
      setQualifyingSubjects(courseToEdit.qualifyingSubjects);
      setEntranceTest(courseToEdit.entranceTest);
      setEntranceDetails(courseToEdit.entranceDetails);
      setEditCourseId(id);
    }
  };

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = courses.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => {
    if (currentPage < Math.ceil(courses.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-48 p-8">
      <div className="relative w-full flex items-center mb-4">
        {/* Back Button (Left Aligned) */}
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        {/* Centered Heading */}
        <h2 className="absolute left-1/2 text-blue-700 transform -translate-x-1/2 text-3xl font-bold flex items-center">
          <FaUniversity className="mr-2 text-blue-500" />
          Institute Entrance Form
        </h2>
      </div>

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8 mb-8 border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Institute Name */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              * Board/University/Institute
            </label>
            <input
              type="text"
              value={institute}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter Institute Name"
              required
              disabled
            />
          </div>

          {/* Select Course */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              * Select Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Select Course</option>
              {coursesList.map((courseOption, index) => (
                <option key={index} value={courseOption}>
                  {courseOption}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">{errors.course}</p>
            )}
          </div>

          {/* Qualifying Course */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              * Qualifying Course
            </label>
            <input
              type="text"
              value={qualifyingCourse}
              onChange={(e) => setQualifyingCourse(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter Qualifying Course"
              required
            />
            {errors.qualifyingCourse && (
              <p className="text-red-500 text-sm mt-1">
                {errors.qualifyingCourse}
              </p>
            )}
          </div>

          {/* Qualifying Subjects */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              * Qualifying Subjects
            </label>
            <select
              multiple
              value={qualifyingSubjects}
              onChange={(e) => {
                const selectedSubjects = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setQualifyingSubjects(selectedSubjects);
              }}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.qualifyingSubjects && (
              <p className="text-red-500 text-sm mt-1">
                {errors.qualifyingSubjects}
              </p>
            )}
          </div>

          {/* Entrance Test Toggle */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              * Entrance Test Required?
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setEntranceTest(true)}
                className={`px-4 py-2 rounded ${
                  entranceTest
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setEntranceTest(false)}
                className={`px-4 py-2 rounded ${
                  !entranceTest
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Entrance Details (Fixed Layout Shift) */}
          <div className="transition-all duration-300 ease-in-out min-h-[80px]">
            {entranceTest && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  * Entrance Details
                </label>
                <input
                  type="text"
                  value={entranceDetails}
                  onChange={(e) => setEntranceDetails(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-6 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter Entrance Details"
                  required
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Table to Display Submitted Data */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8 border border-gray-300 ">
        <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
          <FaFileAlt className="text-lg text-gray-600 mr-2" />
          Submitted Courses *
        </h2>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <FaUniversity className="text-blue-500" />
                  Institute
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <FaBookOpen className="text-blue-500" />
                  Course
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <FaFileAlt className="text-purple-500" />
                  Qualifying Course
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <FaFileAlt className="text-gray-500" />
                  Qualifying Subjects
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-teal-500 text-lg" />
                  Entrance Test
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <FaInfoCircle className="text-indigo-500 text-lg" />
                  Entrance Details
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <FaClipboardList className="text-indigo-500" />
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No Data Available
                </td>
              </tr>
            ) : (
              currentRecords.map((course) => (
                <tr key={course.id} className="bg-white border-b">
                  <td className="px-6 py-4">{course.institute}</td>
                  <td className="px-6 py-4">{course.course}</td>
                  <td className="px-6 py-4">{course.qualifyingCourse}</td>
                  <td className="px-6 py-4">
                    {course.qualifyingSubjects.join(", ")}
                  </td>
                  <td className="px-6 py-4">
                    {course.entranceTest ? (
                      <FaCheck className="text-lg text-green-500" />
                    ) : (
                      <FaTimes className="text-lg text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4">{course.entranceDetails || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FaEdit
                        className="text-blue-500 text-lg cursor-pointer"
                        onClick={() => handleEdit(course.id)}
                      />
                      <FaTrash
                        className="text-red-500 text-lg cursor-pointer"
                        onClick={() => handleDelete(course.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {courses.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstRecord + 1} to
              {Math.min(indexOfLastRecord, courses.length)} of
              {courses.length} entries
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <span className="px-3 py-1 border border-gray-300 rounded-lg bg-blue-100 text-blue-700">
                {currentPage}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(courses.length / recordsPerPage)
                }
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstituteEntrance;
