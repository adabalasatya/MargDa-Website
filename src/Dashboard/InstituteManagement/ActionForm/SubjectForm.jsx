import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Pencil, Book, Check, Trash2, Edit } from "lucide-react";
import { FaArrowLeft, FaSearch, FaBook, FaBuilding } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader";

const SubjectManagement = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const [loading, setLoading] = useState(false);
  const [instituteID, setInstituteID] = useState("");
  const [institute, setInstitute] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [marks, setMarks] = useState("");
  const [syllabusDetails, setSyllabusDetails] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fileName, setFileName] = useState("No file chosen");
  const fileInput = useRef(null);

  useEffect(() => {
    setInstituteID(data.instID);
    setInstitute(data.institute);
    fetchInstituteCourses();
    fetchSubjectData();
    fetchInstituteSubjects();
  }, []);

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch("https://margda.in:7000/api/upload_file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return data.fileUrls;
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      toast.error("File upload failed: " + error.message);
      return [];
    }
  };

  const fetchSubjectData = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await fetch(
        "https://margda.in:7000/api/institute/subject/get-subjects",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (response.ok) {
        const subjects = result.Subjects;
        subjects.map((item) => {
          item.label = item.subject;
          item.value = item.subjectID;
          return item;
        });
        setSubjects(subjects);
      } else {
        setSubjects([]);
        console.warn(
          "API response does not contain an expected array of institutes"
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstituteCourses = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await fetch(
        "https://margda.in:7000/api/institute/course/get-institute-courses",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ instID: data.instID }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (response.ok) {
        const courses = result.Courses;
        courses.map((item) => {
          item.label = item.courseName;
          item.value = item.courseID;
          return item;
        });
        setCourses(courses);
      } else {
        setCourses([]);
        console.warn(
          "API response does not contain an expected array of institutes"
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstituteSubjects = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await fetch(
        "https://margda.in:7000/api/institute/subject/get-institute-subjects",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ instID: data.instID }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (response.ok) {
        const subjects = result.Subjects;
        setSubjectList(subjects);
      } else {
        setSubjectList([]);
        console.warn(
          "API response does not contain an expected array of institutes"
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCourse || !selectedSubject) {
      toast.warn("Course and Subject are mandatory fields");
      return;
    }
    try {
      let docUrl = null;
      if (fileInput.current.files.length > 0) {
        const urls = await handleFileUpload(fileInput.current.files);
        docUrl = urls[0]; // Assuming only one file is needed for now
      }

      // Prepare the request body
      const requestBody = {
        courseID: selectedCourse.value,
        instID: instituteID,
        subjectID: selectedSubject.value,
        syllabus: syllabusDetails || null,
        marks: marks || null,
        docs: docUrl,
      };

      const response = await fetch(
        "https://margda.in:7000/api/institute/subject/add-subject",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchInstituteCourses();
        fetchInstituteSubjects();
        // Reset form fields
        setSelectedCourse(null);
        setSelectedSubject(null);
        setSyllabusDetails("");
        setMarks("");
        setFileName("No file chosen");
      } else {
        if (data.message) {
          toast.warn(data.message);
        } else if (data.error) {
          toast.warn(data.error);
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error); // Log any errors
      if (error.error) {
        toast.error(error.error);
      }
    }
  };

  const handleDelete = async (id) => {
    setSubjectList(subjectList.filter((subject) => subject.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };

  const recordsPerPage = parseInt(entriesPerPage, 10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = subjectList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(subjectList.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "38px",
      border: "1px solid #e5e7eb",
      borderRadius: "0.375rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#e5e7eb",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#6b7280",
    }),
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6 mt-4 relative">
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-blue-600 flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
          <FaBook className="text-2xl text-blue-800" />
          Subject
        </h2>
      </div>

      <div className="max-w-full bg-white mx-4 mt-2 p-6 rounded-lg shadow-lg border border-gray-200">
        {loading && <Loader />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              * Institute
            </label>
            <div className="flex items-center gap-2 border p-2 rounded-lg shadow-sm bg-gray-50">
              <FaBuilding className="text-blue-600" />
              <input
                type="text"
                value={institute}
                readOnly
                className="flex-1 text-green-600 font-semibold p-1 border-none bg-transparent focus:outline-none"
                placeholder="Institute Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              * Select Course
            </label>
            <Select
              styles={customSelectStyles}
              options={courses}
              value={selectedCourse}
              onChange={setSelectedCourse}
              placeholder={
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Select Course</span>
                </div>
              }
              className="w-full"
              aria-label="Select course"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              * Select Subject
            </label>
            <Select
              styles={customSelectStyles}
              options={subjects}
              value={selectedSubject}
              onChange={setSelectedSubject}
              placeholder={
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Select Subject</span>
                </div>
              }
              className="w-full"
              aria-label="Select subject"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-blue-700 mb-1">
              * Marks
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Check className="w-5 h-5 text-blue-500 ml-3" />
              <input
                type="text"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                placeholder="Enter Marks"
                maxLength={3}
                className="w-full h-10 pl-3 focus:outline-none"
                aria-label="Enter marks"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              * Upload File
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInput.current.click()}
                className="px-4 py-2 bg-blue-100 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-200 transition-colors"
              >
                Choose File
              </button>
              <span className="text-gray-600">{fileName}</span>
              <input
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              * Syllabus Details
            </label>
            <textarea
              value={syllabusDetails}
              onChange={(e) => setSyllabusDetails(e.target.value)}
              className="w-full p-3 border rounded-lg min-h-[120px] resize-vertical focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter syllabus details"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
        >
          Submit
        </button>

        <div className="mt-8 flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-gray-700">entries</span>
          </div>

          <div className="relative">
            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-3/4 border border-gray-300 rounded-lg shadow-sm px-10 py-1 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="text-left py-3 px-4 text-blue-700 font-semibold">
                <Pencil className="h-4 w-4 inline mr-1" /> Action
              </th>
              <th className="text-left py-3 px-4 text-blue-700 font-semibold">
                <Check className="h-4 w-4 inline mr-1" /> Course
              </th>
              <th className="text-left py-3 px-4 text-blue-700 font-semibold">
                <Book className="h-4 w-4 inline mr-1" /> Subject
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.length > 0 ? (
              currentRecords.map((subject, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(subject.id)}
                      className="text-red-600 hover:text-red-800 mr-3"
                    >
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4 inline" />
                    </button>
                  </td>
                  <td className="py-3 px-4">{subject.courseName}</td>
                  <td className="py-3 px-4">{subject.subjectName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                  No subjects available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstRecord + 1} to
            {Math.min(indexOfLastRecord, subjectList.length)} of
            {subjectList.length} entries
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
                currentPage === Math.ceil(subjectList.length / recordsPerPage)
              }
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectManagement;
