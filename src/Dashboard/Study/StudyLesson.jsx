import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import {
  FaBook,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaTasks,
  FaEdit,
  FaTrash,
  FaDatabase,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaAngleDown,
  FaClock,
  FaPercent,
  FaInfoCircle,
  FaFileUpload,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  BookOpen,
  GraduationCap,
  ClipboardList,
  Edit,
  Trash2,
  Star,
  Clock,
  Calculator,
  MessageCircle,
} from "lucide-react";

const StudyLesson = () => {
  const initialFormData = {
    course: "",
    unit: "",
    language: "",
    lesson: "",
    lesson_rank: "",
    study_time: "",
    marks: "",
    syllabus: "", // Renamed to Information in UI
    studyID: null,
    content_files: [], // Added for multiple file uploads
  };

  const [formData, setFormData] = useState(initialFormData);
  const [courseOptions, setCourseOptions] = useState([]);
  const [unitOptions] = useState([{ value: "1", label: "Test" }]);
  const [allSubjectUnits, setAllSubjectUnits] = useState([]);
  const [subjectUnits, setSubjectUnits] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [studyLessons, setStudyLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await fetch(
          "https://margda.in:7000/api/study/get-study-course",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!courseResponse.ok)
          throw new Error(
            `Courses HTTP error! status: ${courseResponse.status}`
          );
        const courseData = await courseResponse.json();

        let coursesArray = courseData;
        if (!Array.isArray(courseData)) {
          if (courseData.data && Array.isArray(courseData.data)) {
            coursesArray = courseData.data;
          } else if (courseData.Courses && Array.isArray(courseData.Courses)) {
            coursesArray = courseData.Courses;
          } else {
            throw new Error(
              "Course API response is not an array or does not contain a recognizable array property"
            );
          }
        }

        const courses = coursesArray.map((course) => ({
          value: course.studyID || course.id || course.courseId,
          label: `Course: ${course.courseName}, Subject: ${course.subjectName}`,
          studyID: course.studyID || course.studyId,
        }));
        coursesArray.map((course) => {
          course.value = course.studyID;
          course.label = `Course: ${course.courseName}, Subject: ${course.subjectName}`;
        });
        setCourseOptions(coursesArray);
        const languageResponse = await fetch(
          "https://margda.in:7000/api/languages",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!languageResponse.ok)
          throw new Error(
            `Languages HTTP error! status: ${languageResponse.status}`
          );
        const languageData = await languageResponse.json();

        if (
          languageData &&
          languageData.data &&
          Array.isArray(languageData.data)
        ) {
          setLanguageOptions(
            languageData.data.map((lang) => ({
              value: lang.langID,
              label: lang.language,
            }))
          );
        } else {
          console.error("Unexpected language data format:", languageData);
          toast.error("Failed to load languages: Invalid data format");
          setLanguageOptions([]);
        }

        const lessonsResponse = await fetch(
          "https://margda.in:7000/api/study/lesson/get-study-lessons",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!lessonsResponse.ok)
          throw new Error(
            `Lessons HTTP error! status: ${lessonsResponse.status}`
          );
        const lessonsData = await lessonsResponse.json();

        const transformedLessons = lessonsData.Lessons.map((lesson, index) => ({
          id: lesson.lessonID || lesson.id || index,
          lesson: lesson.lesson || "",
          courseName: lesson.courseName,
          subjectName: lesson.subjectName,
          rank: lesson.lesson_rank || lesson.rank || "",
          studyTime:
            lesson.study_time || lesson.studyTime || lesson.study_minutes || "",
          marks: lesson.marks || "",
          information: lesson.syllabus || lesson.content || "",
          content_urls: lesson.content_url || [], // Added to store uploaded file URLs
        }));
        setStudyLessons(transformedLessons);
      } catch (error) {
        console.error("Data Fetching Error:", error);
        toast.error("Failed to fetch data: " + error.message);
      }
    };

    if (accessToken) {
      fetchData();
      fetchSubjectUnits();
    }
  }, [accessToken]);

  const fetchSubjectUnits = async () => {
    try {
      const resposne = await fetch(
        "https://margda.in:7000/api/master/subject-unit/get-subject-units",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await resposne.json();
      if (resposne.ok && Array.isArray(data.SubjectUnits)) {
        const units = data.SubjectUnits;
        units.map((unit) => {
          unit.label = unit.subject_unit;
          unit.value = unit.unitID;
        });
        setAllSubjectUnits(units);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, selectedOption) => {
    if (name === "course" && selectedOption) {
      const filterUnits = allSubjectUnits.filter(
        (unit) => unit.subjectID == selectedOption.subjectID
      );
      setSubjectUnits(filterUnits);
      setFormData({
        ...formData,
        course: selectedOption.value,
        studyID: selectedOption.studyID,
      });
    } else {
      setFormData({
        ...formData,
        [name]: selectedOption ? selectedOption.value : "",
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, content_files: Array.from(e.target.files) });
  };

  const handleFileUpload = async (files) => {
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const uploadFormData = new FormData();
        uploadFormData.append("files", file);

        const response = await fetch("https://margda.in:7000/api/upload_file", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: uploadFormData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `File upload failed with status: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        if (data.success && data.fileUrls && data.fileUrls.length > 0) {
          uploadedUrls.push(data.fileUrls[0]);
        } else {
          throw new Error(
            data.message || "Upload failed - No file URL returned"
          );
        }
      }
      return uploadedUrls;
    } catch (error) {
      toast.error("File upload failed: " + error.message);
      throw error;
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const missingFields = [];
      if (!formData.course) missingFields.push("Course");
      if (!formData.studyID) missingFields.push("Course (Study ID)");
      if (!formData.lesson || formData.lesson.trim() === "")
        missingFields.push("Lesson");
      if (!formData.lesson_rank || formData.lesson_rank.trim() === "")
        missingFields.push("Lesson Rank");
      if (!formData.language) missingFields.push("Language");
      if (!formData.study_time || formData.study_time.trim() === "")
        missingFields.push("Study Time");

      if (missingFields.length > 0) {
        toast.error(
          `Please fill out all required fields: ${missingFields.join(", ")}`
        );
        return;
      }

      let contentUrls = [];
      if (formData.content_files.length > 0) {
        contentUrls = await handleFileUpload(formData.content_files);
      }

      const { course, content_files, ...restFormData } = formData;
      const payload = {
        studyID: parseInt(restFormData.studyID),
        unitID: restFormData.unit ? parseInt(restFormData.unit) : undefined,
        lesson: restFormData.lesson,
        rank: parseInt(restFormData.lesson_rank),
        medium: parseInt(restFormData.language),
        study_minutes: parseInt(restFormData.study_time),
        marks: restFormData.marks ? parseInt(restFormData.marks) : undefined,
        content: restFormData.syllabus || undefined,
        content_url: contentUrls.length > 0 ? contentUrls : [],
        share: false,
      };

      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined)
      );
      const response = await fetch(
        "https://margda.in:7000/api/study/lesson/add-study-lesson",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanedPayload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Add Study Lesson Error Response:", errorText);
        throw new Error(
          `Failed to add study lesson: ${response.status} - ${errorText}`
        );
      }

      const responseData = await response.json();
      toast.success("Study lesson added successfully!");
      resetForm();

      const lessonsResponse = await fetch(
        "https://margda.in:7000/api/study/lesson/get-study-lessons",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!lessonsResponse.ok)
        throw new Error(
          `Lessons refresh HTTP error! status: ${lessonsResponse.status}`
        );
      const lessonsData = await lessonsResponse.json();

      const transformedLessons = lessonsData.Lessons.map((lesson, index) => ({
        id: lesson.lessonID || lesson.id || index,
        lesson: lesson.lesson || "",
        courseName: lesson.courseName,
        subjectName: lesson.subjectName,
        rank: lesson.lesson_rank || lesson.rank || "",
        studyTime:
          lesson.study_time || lesson.studyTime || lesson.study_minutes || "",
        marks: lesson.marks || "",
        information: lesson.syllabus || lesson.content || "",
        content_urls: lesson.content_url || [],
      }));
      setStudyLessons(transformedLessons);
      setCurrentPage(1);
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Failed to add study lesson: " + error.message);
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
    let sortableData = [...studyLessons];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key] || "";
        const bValue = b[sortConfig.key] || "";
        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  };

  const getClassNamesFor = (name) => {
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData().length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center items-center ">
        <FaGraduationCap className="mr-2 text-green-600" /> Study Lesson
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg border border-gray-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaChalkboardTeacher className="text-indigo-600" /> Course{" "}
              <span className="text-red-500">*</span>
            </label>
            <Select
              options={courseOptions}
              onChange={(option) => handleSelectChange("course", option)}
              value={
                courseOptions.find(
                  (option) => option.value === formData.course
                ) || null
              }
              placeholder="Select Course"
              className="w-full mt-1"
              isClearable
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaDatabase className="text-indigo-600" /> Subject Units
            </label>
            <Select
              options={subjectUnits}
              onChange={(option) => handleSelectChange("unit", option)}
              value={
                subjectUnits.find((option) => option.value === formData.unit) ||
                null
              }
              placeholder="Select Subject Units"
              className="w-full mt-1"
              isClearable
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaAngleDown className="text-indigo-600" /> Language{" "}
              <span className="text-red-500">*</span>
            </label>
            <Select
              options={languageOptions}
              onChange={(option) => handleSelectChange("language", option)}
              value={
                languageOptions.find(
                  (option) => option.value === formData.language
                ) || null
              }
              placeholder="Select Language"
              className="w-full mt-1"
              isClearable
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaBook className="text-indigo-600" /> Lesson{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lesson"
              value={formData.lesson}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Lesson"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaTasks className="text-indigo-600" /> Lesson Rank{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="lesson_rank"
              value={formData.lesson_rank}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Lesson Rank"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaClock className="text-indigo-600" /> Study Time{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="study_time"
              value={formData.study_time}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Study Time"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaPercent className="text-indigo-600" /> Marks
            </label>
            <input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Marks"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaInfoCircle className="text-indigo-600" /> Information
            </label>
            <textarea
              name="syllabus"
              value={formData.syllabus}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              placeholder="Enter information content here..."
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaFileUpload className="text-indigo-600" /> Content Files
              (Optional)
            </label>
            <input
              type="file"
              multiple
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
          <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
        <div className="overflow-x-auto shadow-lg rounded-lg mt-8">
          <table className="table-auto w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <Edit className="w-4 h-4 mr-2 text-blue-500" />
                    Edit
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                    Course
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                    Subject
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                    Lesson
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <Star className="w-4 h-4 mr-2 text-blue-500" />
                    Rank
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    Study Time
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <Calculator className="w-4 h-4 mr-2 text-blue-500" />
                    Marks
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                    Information
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase">
                    <FaFileUpload className="w-4 h-4 mr-2 text-blue-500" />
                    Content URLs
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit className="w-4 h-4 inline" />
                      </button>{" "}
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.subjectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.lesson}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.studyTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.marks}</td>
                    <td
                      className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis break-words"
                      title={row.information}
                    >
                      {row.information}
                    </td>
                    <td className="px-6 py-4">
                      {row.content_urls.length > 0 ? (
                        <ul>
                          {row.content_urls.map((url, index) => (
                            <li key={index}>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                File {index + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No study lessons available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex mt-2 bg-white shadow-lg rounded-lg justify-between items-center py-3 px-6">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, sortedData().length)} of{" "}
          {sortedData().length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaAngleLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-2 py-1 rounded-full border ${
                  currentPage === pageNumber
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaAngleRight />
          </button>
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

export default StudyLesson;
