import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaUser,
  FaHandsHelping,
  FaAward,
  FaPhoneAlt,
  FaSearch,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import User from "../../assets/user.webp";

const TrainingDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [studyCourses, setStudyCourses] = useState([]);
  const [allStudyCourses, setAllStudyCourses] = useState([]);
  const [selectedStudyCourse, setSelectedStudyCourse] = useState(null);
  const [studySubjects, setStudySubjects] = useState([]);
  const [selectedStudySubject, setSelectedStudySubject] = useState(null);
  const [lessons, setLessons] = useState([]);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    fetchStudyCourses();
  }, []);

  const fetchStudyCourses = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/cpp_training/trainee/get_study_courses",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok && Array.isArray(data.Courses)) {
        const courses = data.Courses;
        courses.map((course) => {
          course.value = course.studyID;
          course.label = course.courseName;
        });
        setAllStudyCourses(courses);
        const uniqueData = courses.reduce((acc, item) => {
          if (!acc.some((obj) => obj.courseID === item.courseID)) {
            acc.push(item);
          }
          return acc;
        }, []);
        setStudyCourses(uniqueData);
        const selectedStudyCourse = sessionStorage.getItem(
          "trainee-study-course"
        );
        const selectedStudySubject = sessionStorage.getItem(
          "trainee-study-subject"
        );
        if (selectedStudyCourse && selectedStudySubject) {
          const studyCourse = JSON.parse(selectedStudyCourse);
          if (studyCourse.courseID) {
            const filterStudySubjects = courses.filter(
              (course) => course.courseID == studyCourse.courseID
            );
            const subjects = filterStudySubjects.map((subject) => ({
              ...subject, // Spread the object to create a new copy
              label: subject.subjectName, // Modify label without affecting original
            }));
            setStudySubjects(subjects);
            setSelectedStudyCourse(studyCourse);
          }
          const studySubject = JSON.parse(selectedStudySubject);
          setSelectedStudySubject(studySubject);
          if (studySubject.studyID) {
            fetchLessons(studySubject.studyID);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLessons = async (studyID) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/cpp_training/trainee/get_lessons",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studyID }),
        }
      );
      const data = await response.json();
      if (response.ok && Array.isArray(data.Lessons)) {
        setLessons(data.Lessons);
      } else {
        setLessons([]);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const coordinator = {
    name: "Test",
    mobile: "9876543210",
    pic: "coordinator.jpg",
    edate: "2025-1-11",
    endate: "2025-12-12",
  };

  const trainer = {
    name: "",
    mobile: "9123456789",
    pic: "trainer.jpg",
  };

  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCall = (type) => {
    const phoneNumber =
      type === "coordinator" ? coordinator.mobile : trainer.mobile;
    if (!phoneNumber) {
      Swal.fire(
        "",
        `No contact info for ${
          type === "coordinator" ? "Coordinator" : "Trainer"
        }`,
        "error"
      );
      return;
    }
    Swal.fire("Call dialed. Kindly check your phone", "", "success");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const updateModuleStatus = (moduleId) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.moduleID === moduleId ? { ...module, finished: "Y" } : module
      )
    );
  };

  // const handleOpenPdf = (moduleId) => {
  //   Swal.fire({
  //     title: "Opening PDF",
  //     text: `Opening PDF for module ${moduleId}.`,
  //     icon: "info",
  //   });
  // };

  // Navigation with loading animation
  const handleNavigate = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 1000); // Simulate loading delay (1 second)
  };

  const handleStudyCourseChange = (selectedOption) => {
    setSelectedStudyCourse(selectedOption);
    sessionStorage.setItem(
      "trainee-study-course",
      JSON.stringify(selectedOption)
    );
    const filterStudySubjects = allStudyCourses.filter(
      (course) => course.courseID == selectedOption.courseID
    );
    const subjects = filterStudySubjects.map((subject) => ({
      ...subject, // Spread the object to create a new copy
      label: subject.subjectName, // Modify label without affecting original
    }));
    setSelectedStudySubject(null);
    setStudySubjects(subjects);
  };

  const handleStudySubjectChange = (selectedOption) => {
    setSelectedStudySubject(selectedOption);
    sessionStorage.setItem(
      "trainee-study-subject",
      JSON.stringify(selectedOption)
    );
    if (selectedOption.studyID) {
      fetchLessons(selectedOption.studyID);
    }
  };

  const handleGiveTestClick = (lesson) => {
    sessionStorage.setItem("lessonID", lesson.lessonID);
    sessionStorage.setItem("lessonName", lesson.lesson);
    sessionStorage.setItem("studyID", lesson.studyID);
    navigate("/give-test");
  };

  return (
    <div className="min-h-screen bg-gray-10 relative">
      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 mt-2">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center justify-center md:justify-start">
          <FaUserGraduate className="mr-3 text-blue-600" />
          Training & Certification as a Career Counselling Professional (CCP)
        </h2>

        {/* Navigation Buttons */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-300">
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button
              onClick={() => handleNavigate("/trainee-dashboard")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <FaUser className="mr-2" /> Study Theory
            </button>
            <button
              onClick={() => handleNavigate("/complete-activity")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <FaUser className="mr-2" /> Complete Activity
            </button>
            <button
              disabled
              className="bg-gray-300 text-gray-600 px-5 py-3 rounded-lg shadow-md cursor-not-allowed flex items-center"
            >
              <FaHandsHelping className="mr-2" /> Do Practical
            </button>
            <button
              disabled
              className="bg-gray-300 text-gray-600 px-5 py-3 rounded-lg shadow-md cursor-not-allowed flex items-center"
            >
              <FaUserGraduate className="mr-2" /> Competency Sheet
            </button>
            <button
              disabled
              className="bg-gray-300 text-gray-600 px-5 py-3 rounded-lg shadow-md cursor-not-allowed flex items-center"
            >
              <FaAward className="mr-2" /> CCP Certificate
            </button>
          </div>
        </div>

        {/* Coordinator & Trainer Info */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300">
              <h6 className="text-lg font-bold text-gray-900 tracking-tight">
                Start Date
              </h6>
              <p className="mt-2 text-xl font-extrabold text-blue-700">
                {formatDate(coordinator.edate)}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300">
              <h6 className="text-lg font-bold text-gray-900 tracking-tight">
                Completion Date
              </h6>
              <p className="mt-2 text-xl font-extrabold text-blue-700">
                {formatDate(coordinator.endate)}
              </p>
            </div>
          </div>
          <hr className="my-4 border-gray-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-300 text-center">
              <h5 className="text-xl font-bold text-gray-900 tracking-tight">
                Coordinator
              </h5>
              <img
                src={User}
                alt="Coordinator"
                className="w-24 h-24 rounded-full mx-auto my-4 border-4 border-blue-200 shadow-sm"
              />
              <h5 className="text-lg font-medium text-gray-700">
                {coordinator.name || "Not opted"}
              </h5>
              <button
                onClick={() => handleCall("coordinator")}
                className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 hover:text-green-800 transition duration-200 flex items-center justify-center mx-auto font-semibold"
              >
                <FaPhoneAlt className="mr-2" /> Support
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-300 text-center">
              <h5 className="text-xl font-bold text-gray-900 tracking-tight">
                Trainer
              </h5>
              <img
                src={User}
                alt="Trainer"
                className="w-24 h-24 rounded-full mx-auto my-4 border-4 border-blue-200 shadow-sm"
              />
              <h5 className="text-lg font-medium text-gray-700">
                {trainer.name || "Not opted"}
              </h5>
              <button
                disabled
                className="mt-4 bg-gray-200 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed flex items-center justify-center mx-auto font-semibold"
              >
                <FaPhoneAlt className="mr-2" /> Support
              </button>
            </div>
          </div>
        </div>

        {/* Modules Table */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
            <FaUserGraduate className="mr-2 text-blue-600" /> Study Theory
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-around mb-6 gap-4">
            <div className="flex w-1/2 mx-4 flex-col items-center gap-2">
              <span className="text-gray-700">Course</span>
              <Select
                value={selectedStudyCourse}
                onChange={handleStudyCourseChange}
                options={studyCourses}
                className="w-full"
                placeholder="Select Study Course"
              />
            </div>
            <div className="flex w-1/2 mx-4 flex-col items-center gap-2">
              <span className="text-gray-700">Subject</span>
              <Select
                value={selectedStudySubject}
                onChange={handleStudySubjectChange}
                options={studySubjects}
                className="w-full"
                placeholder="Select Study Subject"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Show</span>
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-gray-700">Records</span>
            </div>
            <div className="flex items-center gap-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 p-2 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SNO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Module
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lessons.map((lesson, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {lesson.lesson}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {lesson.content_url &&
                      Array.isArray(lesson.content_url) &&
                      lesson.content_url.length > 0 ? (
                        <ul>
                          {lesson.content_url.map((url, index) => (
                            <li key={index}>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {url
                                  .split(".")
                                  [
                                    url.split(".").length - 1
                                  ].toUpperCase()}{" "}
                                File
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      {lesson.finished === "Y" ? (
                        <>
                          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
                            Completed
                          </span>
                          <Link
                            to={`/result?moduleId=${lesson.lessonID}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                          >
                            Result
                          </Link>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleGiveTestClick(lesson)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                          >
                            Give Test
                          </button>
                          <span className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed">
                            Result
                          </span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <span className="text-gray-600 text-sm">
              Showing 1 to {Math.min(recordsPerPage, lessons.length)} of{" "}
              {lessons.length} entries
            </span>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                className="px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200 flex items-center gap-1 disabled:opacity-50"
                disabled={true}
              >
                <FaAngleLeft /> Previous
              </button>
              <span className="px-4 py-2 border rounded-lg bg-blue-600 text-white font-semibold">
                1
              </span>
              <button
                className="px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200 flex items-center gap-1 disabled:opacity-50"
                disabled={true}
              >
                Next <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard;
