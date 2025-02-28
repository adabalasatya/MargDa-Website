import React, { useEffect, useState } from "react";
import { Globe, BarChart, MessageSquare } from "lucide-react";
import {
  FaStar,
  FaArrowLeft,
  FaSearch,
  FaBook,
  FaBuilding,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader";

const SurveyForm = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const [loading, setLoading] = useState(false);
  const [instituteID, setInstituteID] = useState("");
  const [institute, setInstitute] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [survey1, setSetSurvey1] = useState(false);
  const [survey2, setSetSurvey2] = useState(false);
  const [survey3, setSetSurvey3] = useState(false);
  const [survey4, setSetSurvey4] = useState(false);
  const [survey5, setSetSurvey5] = useState(false);
  const [surveyData, setSurveyData] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [ip, setIP] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIP(data.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  useEffect(() => {
    setInstituteID(data.instID);
    setInstitute(data.institute);
    fetchInstituteCourses();
    fetchInstituteSurvey();
  }, []);

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
        // If Institutes is not an array or doesn't exist, set to empty array
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

  const fetchInstituteSurvey = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await fetch(
        "https://margda.in:7000/api/institute/survey/get-institute-survey",
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
        const survey = result.Survey;
        setSurveyData(result.Survey);
      } else {
        setSurveyData([]);
        // If Institutes is not an array or doesn't exist, set to empty array
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

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalRecords = surveyData.length;

  // Get records for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = surveyData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      return toast.warn("Select a course");
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/institute/survey/add-survey",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseID: selectedCourse,
            instID: instituteID,
            survey1: survey1,
            survey2: survey2,
            survey3: survey3,
            survey4: survey4,
            survey5: survey5,
            rating,
            review: review || null,
            loginIP: ip,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setReview("");
        setRating(0);
        setSetSurvey1(false);
        setSetSurvey2(false);
        setSetSurvey3(false);
        setSetSurvey4(false);
        setSetSurvey5(false);
        setSelectedCourse("");
      } else {
        if (data.message) {
          toast.warn(data.message);
        } else if (data.error) {
          toast.warn(data.error);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.error) {
        toast.error(error.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (set, currentState) => {
    set(!currentState);
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(totalRecords / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
          <Globe className="w-8 h-8 text-blue-500" />
          Survey
        </h2>
      </div>

      <div className="p-6">
        {loading && <Loader />}

        {/* Title & Institute Info */}
        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Institute *
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

        {/* Survey Form */}
        <div className="max-w-full bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Course *
              </label>
              <select
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select a course</option>
                {courses.length > 0 &&
                  courses.map((course, index) => (
                    <option value={course.value} key={index}>
                      {course.label}
                    </option>
                  ))}
              </select>
            </div>

            {/* Toggle Switches for Yes/No */}
            {[
              {
                label: "Are you satisfied with the teaching and other staff?",
                currentState: survey1,
                setState: setSetSurvey1,
              },
              {
                label:
                  "Are you satisfied with educational and extra-curricular facilities?",
                currentState: survey2,
                setState: setSetSurvey2,
              },
              {
                label: "Are you satisfied with the fee and other charges?",
                currentState: survey3,
                setState: setSetSurvey3,
              },
              {
                label:
                  "Are you satisfied with career guidance and placement assistance?",
                currentState: survey4,
                setState: setSetSurvey4,
              },
              {
                label: "Will you recommend your family members to study here?",
                currentState: survey5,
                setState: setSetSurvey5,
              },
            ].map(({ label, currentState, setState }, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
              >
                <span className="text-gray-700">{label}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">No</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={currentState}
                      onChange={() => handleToggle(setState, currentState)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                  <span className="text-gray-700">Yes</span>
                  {/* <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={noState}
                      onChange={() => handleNoToggle(setYesState, setNoState)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label> */}
                </div>
              </div>
            ))}

            {/* Star Rating */}
            <div className="flex items-center space-x-2 mb-4">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className={`cursor-pointer text-2xl ${
                      starValue <= (hover || rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(rating)}
                  />
                );
              })}
            </div>

            {/* Review Input */}
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Write your Review here"
              value={review}
              maxLength={1000}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>

            {/* Submit Button */}
            <div className="flex items-center justify-start">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>

            {/* Survey Data Table */}
            <div className="mt-8">
              {/* Top Controls */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <label className="text-gray-700 text-sm font-medium mr-2">
                    Show
                  </label>
                  <select className="border px-2 py-1 rounded">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-gray-700 text-sm font-medium ml-2">
                    entries
                  </span>
                </div>
                <div className="relative">
                  <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    type="text"
                    className="border px-8 py-1 rounded"
                    placeholder="Search..."
                  />
                </div>
              </div>

              {/* Table */}
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">
                      <FaBook className="inline w-4 h-4 text-gray-700 mr-1" />{" "}
                      Course
                    </th>
                    <th className="border px-4 py-2">
                      <BarChart className="inline w-4 h-4 text-gray-700 mr-1" />{" "}
                      Survey 1
                    </th>
                    <th className="border px-4 py-2">
                      <BarChart className="inline w-4 h-4 text-gray-700 mr-1" />{" "}
                      Survey 2
                    </th>
                    <th className="border px-4 py-2">
                      <BarChart className="inline w-4 h-4 text-gray-700 mr-1" />{" "}
                      Survey 3
                    </th>
                    <th className="border px-4 py-2">
                      <BarChart className="inline w-4 h-4 text-gray-700 mr-1" />{" "}
                      Survey 4
                    </th>
                    <th className="border px-4 py-2">
                      <BarChart className="inline w-4 h-4 text-gray-700 mr-1" />{" "}
                      Survey 5
                    </th>
                    <th className="border px-4 py-2">
                      <MessageSquare className="inline w-4 h-4 text-gray-700 mr-1" />{" "}
                      Review
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                    currentRecords.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td className="border px-4 py-2">{row.courseName}</td>
                        <td className="border px-4 py-2">
                          {row.survey1 ? "YES" : "NO"}
                        </td>
                        <td className="border px-4 py-2">
                          {row.survey2 ? "YES" : "NO"}
                        </td>
                        <td className="border px-4 py-2">
                          {row.survey3 ? "YES" : "NO"}
                        </td>
                        <td className="border px-4 py-2">
                          {row.survey4 ? "YES" : "NO"}
                        </td>
                        <td className="border px-4 py-2">
                          {row.survey5 ? "YES" : "NO"}
                        </td>
                        <td className="border px-4 py-2">
                          {row.review || "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-gray-500 py-3"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstRecord + 1} to{" "}
                  {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords}{" "}
                  records
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 border border-gray-300 rounded">
                    {currentPage}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={
                      currentPage === Math.ceil(totalRecords / recordsPerPage)
                    }
                    className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SurveyForm;
