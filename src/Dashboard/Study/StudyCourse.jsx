import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import {
  FaBook,
  FaFileUpload,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaTasks,
  FaEdit,
  FaTrash,
  FaDatabase,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";

const StudyCourse = () => {
  const [formData, setFormData] = useState({
    class_exam: "",
    subject: "",
    Marks_Total: "",
    Marks_Pass: "",
    Marks_Correct: "",
    Marks_Wrong: "",
    MCQ_Questions: "",
    MCQ_Time: "",
    Attempts: "",
    Fee: "",
    syllabus: "",
    syllabus_doc: null,
  });
  const [classExams, setClassExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studyCourses, setStudyCourses] = useState([]);
  const [docUrl, setDocUrl] = useState(null);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classExamsResponse = await fetch(
          "https://margda.in:7000/api/institute/course/get-courses",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!classExamsResponse.ok)
          throw new Error(
            `Class Exams HTTP error! status: ${classExamsResponse.status}`
          );
        const classExamsData = await classExamsResponse.json();
        setClassExams(
          classExamsData.Courses.map((course) => ({
            value: course.courseID,
            label: course.course,
          }))
        );

        const subjectsResponse = await fetch(
          "https://margda.in:7000/api/master/subject/get-subjects",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!subjectsResponse.ok)
          throw new Error(
            `Subjects HTTP error! status: ${subjectsResponse.status}`
          );
        const subjectsData = await subjectsResponse.json();
        setSubjects(
          subjectsData.Subjects.map((subject) => ({
            value: subject.subjectID,
            label: subject.subject,
          }))
        );

        const studyCoursesResponse = await fetch(
          "https://margda.in:7000/api/study/get-study-course",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!studyCoursesResponse.ok)
          throw new Error(
            `Study Courses HTTP error! status: ${studyCoursesResponse.status}`
          );
        const studyCoursesData = await studyCoursesResponse.json();

        console.log("Study Courses Response:", studyCoursesData);

        let coursesArray = [];
        if (studyCoursesData && Array.isArray(studyCoursesData.Courses)) {
          coursesArray = studyCoursesData.Courses;
        } else {
          console.warn(
            "Study courses data is not an array or missing Courses:",
            studyCoursesData
          );
          toast.warn("No valid study courses data found.");
          setStudyCourses([]);
          return;
        }

        const transformedData = coursesArray.map((course, index) => ({
          id: course.studyID || index,
          classExam: course.courseName || "N/A",
          subject: course.subjectName || "N/A",
          MarksTotal: course.marks_total || "N/A",
          MarksPass: course.marks_pass || "N/A",
          Fee: course.fee || "N/A",
          syllabus: course.syllabus || "N/A",
          syllabus_doc: course.docs || null,
          MarksCorrect: course.marks_correct || "N/A",
          MarksWrong: course.marks_wrong || "N/A",
          MCQQuestions: course.test_mcq || "N/A",
          MCQTime: course.test_minutes || "N/A",
          Attempts: course.attempts || "N/A",
        }));
        setStudyCourses(transformedData);
      } catch (error) {
        console.error("Data Fetching Error:", error);
        toast.error("Failed to fetch data: " + error.message);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Marks_Correct" || name === "Marks_Wrong") {
      // Allow empty input or numbers with up to one decimal place, less than 100
      if (
        value === "" ||
        (value.match(/^\d{0,2}(\.\d{0,1})?$/) && parseFloat(value) < 100)
      ) {
        setFormData({ ...formData, [name]: value });
      } else if (parseFloat(value) >= 100) {
        toast.error(`${name.replace("_", " ")} must be less than 100`);
      }
    } else if (
      [
        "Marks_Total",
        "Marks_Pass",
        "MCQ_Questions",
        "MCQ_Time",
        "Attempts",
        "Fee",
      ].includes(name)
    ) {
      if (!value || value.match(/^\d*$/)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, syllabus_doc: e.target.files[0] });
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("files", file);

      const response = await fetch("https://margda.in:7000/api/upload_file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `File upload failed with status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      if (data.success && data.fileUrls && data.fileUrls.length > 0) {
        return data.fileUrls[0];
      } else {
        throw new Error(data.message || "Upload failed - No file URL returned");
      }
    } catch (error) {
      toast.error("File upload failed: " + error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newDocUrl = docUrl;

    try {
      if (
        !formData.class_exam ||
        !formData.subject ||
        !formData.Marks_Total ||
        !formData.Marks_Pass ||
        !formData.Marks_Correct ||
        !formData.Marks_Wrong ||
        !formData.MCQ_Questions ||
        !formData.MCQ_Time ||
        !formData.Attempts ||
        !formData.Fee ||
        !formData.syllabus
      ) {
        toast.error("Please fill out all the required fields.");
        return;
      }

      if (formData.syllabus_doc) {
        newDocUrl = await handleFileUpload(formData.syllabus_doc);
        setDocUrl(newDocUrl);
      }

      const { syllabus_doc, ...restFormData } = formData;
      const payload = {
        courseID: restFormData.class_exam,
        subjectID: restFormData.subject,
        marks_total: parseInt(restFormData.Marks_Total),
        marks_pass: parseInt(restFormData.Marks_Pass),
        marks_correct: parseFloat(restFormData.Marks_Correct),
        marks_wrong: parseFloat(restFormData.Marks_Wrong),
        test_mcq: parseInt(restFormData.MCQ_Questions),
        test_minutes: parseInt(restFormData.MCQ_Time),
        attempts: parseInt(restFormData.Attempts),
        fee: parseInt(restFormData.Fee),
        syllabus: restFormData.syllabus,
        ...(newDocUrl && { docs: newDocUrl }),
      };

      const response = await fetch(
        "https://margda.in:7000/api/study/add-study-course",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status == 409) {
          return toast.error(data.message);
        }
        throw new Error("Failed to submit the study course");
      }
      toast.success("Study course added successfully!");

      setFormData({
        class_exam: "",
        subject: "",
        Marks_Total: "",
        Marks_Pass: "",
        Marks_Correct: "",
        Marks_Wrong: "",
        MCQ_Questions: "",
        MCQ_Time: "",
        Attempts: "",
        Fee: "",
        syllabus: "",
        syllabus_doc: null,
      });
      setDocUrl(null);

      // Clear the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      const fetchStudyCourses = async () => {
        const studyCoursesResponse = await fetch(
          "https://margda.in:7000/api/study/get-study-course",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!studyCoursesResponse.ok)
          throw new Error(
            `Study Courses Refresh HTTP error! status: ${studyCoursesResponse.status}`
          );
        const studyCoursesData = await studyCoursesResponse.json();
        console.log("Refreshed Study Courses Response:", studyCoursesData);

        let coursesArray = [];
        if (studyCoursesData && Array.isArray(studyCoursesData.Courses)) {
          coursesArray = studyCoursesData.Courses;
        } else {
          console.warn(
            "Refreshed study courses data is not an array or missing Courses:",
            studyCoursesData
          );
          toast.warn("No valid study courses data found after refresh.");
          setStudyCourses([]);
          return;
        }

        const transformedData = coursesArray.map((course, index) => ({
          id: course.studyID || index,
          classExam: course.courseName || "N/A",
          subject: course.subjectName || "N/A",
          MarksTotal: course.marks_total || "N/A",
          MarksPass: course.marks_pass || "N/A",
          Fee: course.fee || "N/A",
          syllabus: course.syllabus || "N/A",
          syllabus_doc: course.docs || null,
          MarksCorrect: course.marks_correct || "N/A",
          MarksWrong: course.marks_wrong || "N/A",
          MCQQuestions: course.test_mcq || "N/A",
          MCQTime: course.test_minutes || "N/A",
          Attempts: course.attempts || "N/A",
        }));
        setStudyCourses(transformedData);
      };
      await fetchStudyCourses();
    } catch (error) {
      console.error("Error submitting study course:", error);
      toast.error("Failed to add course: " + error.message);
    }
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    let sortableData = [...studyCourses];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData().slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedData().length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6 flex justify-center items-center">
        <FaGraduationCap className="mr-2 text-green-600" /> Study
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg border border-gray-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaChalkboardTeacher className="text-indigo-600" /> Class Exam
            </label>
            <Select
              options={classExams}
              onChange={(option) => handleSelectChange("class_exam", option)}
              value={
                classExams.find(
                  (option) => option.value === formData.class_exam
                ) || null
              }
              placeholder="Select Class Exam"
              className="w-full mt-1"
              isClearable
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaBook className="text-indigo-600" /> Subject
            </label>
            <Select
              options={subjects}
              onChange={(option) => handleSelectChange("subject", option)}
              value={
                subjects.find((option) => option.value === formData.subject) ||
                null
              }
              placeholder="Select Subject"
              className="w-full mt-1"
              isClearable
            />
          </div>

          {[
            "Marks_Total",
            "Marks_Pass",
            "Marks_Correct",
            "Marks_Wrong",
            "MCQ_Questions",
            "MCQ_Time",
            "Fee",
            "Attempts",
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                <FaTasks className="mr-2 text-indigo-800" />{" "}
                {field.replace("_", " ")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={field.replace("_", " ")}
              />
            </div>
          ))}

          <div className="col-span-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaBook className="text-indigo-600" /> Syllabus
            </label>
            <textarea
              name="syllabus"
              value={formData.syllabus}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter syllabus details"
              rows="5"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              <FaFileUpload className="mr-2 text-indigo-600" /> Syllabus
              Document (Optional)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full mt-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-indigo-100 file:text-indigo-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>

      <div className="flex justify-between pt-6 p-4 shadow-lg rounded-lg mt-2 border border-gray-300 items-center mb-4">
        <div className="flex items-center ml-2">
          <label htmlFor="entries" className="mr-2 ml-4 text-gray-600">
            Show
          </label>
          <select
            id="entries"
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option>5</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="ml-2 text-gray-600">Entries</span>
        </div>

        <div className="relative mr-2">
          <input
            type="text"
            id="search"
            placeholder="Search"
            className="w-40 border border-gray-300 rounded px-2 py-1 pl-8"
          />
          <FaSearch className="absolute top-1/2 left-1 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: "id", label: "Action", width: "10%" },
                  { key: "classExam", label: "Class_Exam", width: "12%" },
                  { key: "subject", label: "Subject", width: "12%" },
                  { key: "MarksTotal", label: "Marks_Total", width: "12%" },
                  { key: "MarksPass", label: "Marks_Pass", width: "12%" },
                  { key: "Fee", label: "Fee", width: "10%" },
                  { key: "syllabus", label: "Syllabus", width: "20%" },
                  { key: "syllabus_doc", label: "Syllabus Doc", width: "12%" },
                ].map(({ key, label, width }) => (
                  <th
                    key={key}
                    style={{ width }}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer bg-gray-50 sticky top-0"
                    onClick={() => requestSort(key)}
                  >
                    <div className="flex items-center space-x-1">
                      <FaDatabase className="text-blue-500" />
                      <span>{label}</span>
                      <span className={`ml-1 ${getClassNamesFor(key)}`}>
                        {sortConfig.key === key &&
                          (sortConfig.direction === "ascending" ? "▲" : "▼")}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 transition-colors duration-150 ease-in-out ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => console.log("Edit", row.id)}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-150"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => console.log("Delete", row.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-150"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-black-500 break-words">
                      {row.classExam}
                    </td>
                    <td className="px-4 py-3 text-sm text-black-500 break-words">
                      {row.subject}
                    </td>
                    <td className="px-4 py-3 text-sm text-black-500 break-words">
                      {row.MarksTotal}
                    </td>
                    <td className="px-4 py-3 text-sm text-black-500 break-words">
                      {row.MarksPass}
                    </td>
                    <td className="px-4 py-3 text-sm text-black-500 break-words">
                      {row.Fee}
                    </td>
                    <td className="px-4 py-3 text-sm text-black-500 break-words">
                      {row.syllabus}
                    </td>
                    <td className="px-4 py-3 text-sm text-black-500 break-words">
                      {row.syllabus_doc ? (
                        <a
                          href={row.syllabus_doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-150"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-3 text-center text-gray-500 bg-gray-50"
                  >
                    No study courses available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg mt-2 border border-gray-300 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, sortedData().length)}
            </span>{" "}
            of <span className="font-medium">{sortedData().length}</span>{" "}
            entries
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <FaAngleLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`relative inline-flex items-center px-3 py-2 rounded-md border text-sm font-medium transition-colors duration-150 ${
                      currentPage === pageNumber
                        ? "z-10 bg-indigo-600 border-indigo-600 text-white"
                        : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <FaAngleRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-4 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
        <span>Margdarshak © {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">
            Support
          </a>
          <a href="#" className="hover:text-blue-600">
            Help Center
          </a>
          <a href="#" className="hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
};

export default StudyCourse;
