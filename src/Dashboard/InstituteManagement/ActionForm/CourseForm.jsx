import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import {
  FaEdit,
  FaTrash,
  FaBuilding,
  FaBook,
  FaClock,
  FaArrowLeft,
  FaRupeeSign,
  FaUserGraduate,
  FaFileAlt,
  FaSearch,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Loader from "../../../Components/Loader";
import { toast } from "react-toastify";

const CourseManagement = () => {
  const location = useLocation();
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const [institute, setInstitute] = useState("University of Delhi");
  const [instituteID, setInstituteID] = useState("University of Delhi");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studyTypes, setStudyTypes] = useState([
    { value: "R", label: "Regular" },
    { value: "O", label: "Online" },
    { value: "P", label: "Part Time" },
  ]);
  const [selectedStudyType, setSelectedStudyType] = useState(null);
  const [recognitions, setRecognitions] = useState([]);
  const [selectedRecognition, setSelectedRecognition] = useState(null);
  const [duration, setDuration] = useState("");
  const [fee, setFee] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [admission, setAdmission] = useState("");
  const [womenOnly, setWomenOnly] = useState(false);
  const [courseDetails, setCourseDetails] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");
  const fileInput = useRef(null);
  const { data } = location.state || {};

  useEffect(() => {
    setInstitute(data.institute);
    setInstituteID(data.instID);
    fetchData();
    fetchInstituteCourses();
    fetchRecogniseTypes();
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await fetch(
        "https://margda.in:7000/api/institute/course/get-courses",
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
        const courses = result.Courses;
        courses.map((item) => {
          item.label = item.course;
          item.value = item.courseID;
          return item;
        });
        setCourses(result.Courses);
      } else {
        setCourses([]); // If Institutes is not an array or doesn't exist, set to empty array
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

  const fetchRecogniseTypes = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await fetch(
        "https://margda.in:7000/api/institute/course/get-recognise-types",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (response.ok) {
        const recognise = result.Recognise;
        recognise.map((item) => {
          item.label = item.recogniseby;
          item.value = item.recogniseID;
          return item;
        });
        setRecognitions(recognise);
      } else {
        setRecognitions([]); // If Institutes is not an array or doesn't exist, set to empty array
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
        setCourseList(courses);
      } else {
        setCourseList([]);
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

  const handleSubmit = async () => {
    if (!selectedCourse || !selectedStudyType) {
      return toast.warn("Course and Study type are mandatory");
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
        studytype: selectedStudyType.value,
        recogniseID: selectedRecognition?.value || null,
        womenonly: womenOnly ? "Y" : "N",
        duration: duration || null,
        fee: fee || null,
        eligibility: eligibility || null,
        admonth: admission || null,
        details: courseDetails || null,
        doc: docUrl, // Use the stored URL here
      };

      const response = await fetch(
        "https://margda.in:7000/api/institute/course/add-course",
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
        // Reset form fields
        setSelectedCourse(null);
        setSelectedStudyType(null);
        setSelectedRecognition(null);
        setDuration("");
        setFee("");
        setEligibility("");
        setAdmission("");
        setWomenOnly(false);
        setCourseDetails("");
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
    setCourseList(courseList.filter((course) => course.id !== id));
  };

  return (
    <div className="bg-gray-10 min-h-screen pt-4">
      <div className="mb-2">
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h2 className="text-3xl text-center font-bold text-blue-600 mb-6 flex items-center justify-center gap-2">
          <FaBook className="text-2xl text-blue-800" />
          Course
        </h2>
      </div>

      {loading && <Loader />}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border border-gray-300 space-y-6 bg-white rounded shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Institute Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              {" "}
              * Institute{" "}
            </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaBuilding className="text-black-600" />
              <input
                type="text"
                value={institute}
                readOnly
                className="flex-1 text-green-500 font-bold p-2 border-none bg-transparent focus:outline-none"
                placeholder="Institute Name"
              />
            </div>
          </div>

          {/* Course */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              {" "}
              * Course{" "}
            </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaBook className="text-black-600" />
              <Select
                placeholder="Select Course*"
                options={courses}
                value={selectedCourse}
                onChange={setSelectedCourse}
                className="flex-1"
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "none",
                    boxShadow: "none",
                  }),
                }}
              />
            </div>
          </div>

          {/* Study Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              {" "}
              * Study Type{" "}
            </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaBook className="text-black-600" />
              <Select
                placeholder="Study Type*"
                options={studyTypes}
                value={selectedStudyType}
                onChange={setSelectedStudyType}
                className="flex-1"
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "none",
                    boxShadow: "none",
                  }),
                }}
              />
            </div>
          </div>

          {/* Recognised By */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              * Recognised By{" "}
            </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaUserGraduate className="text-black-600" />
              <Select
                placeholder="Recognised by"
                options={recognitions}
                value={selectedRecognition}
                onChange={setSelectedRecognition}
                className="flex-1"
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "none",
                    boxShadow: "none",
                  }),
                }}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              {" "}
              * Duration{" "}
            </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaClock className="text-black-600" />
              <input
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Fee */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">* Fee </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaRupeeSign className="text-black-600" />
              <input
                type="text"
                placeholder="Fee"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Eligibility */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              {" "}
              * Eligibility{" "}
            </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaUserGraduate className="text-black-600" />
              <input
                type="text"
                placeholder="Eligibility"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Admission Month and Year */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              * Admission Month and Year{" "}
            </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaUserGraduate className="text-black-600" />
              <input
                type="text"
                placeholder="Admission Month and Year"
                value={admission}
                onChange={(e) => setAdmission(e.target.value)}
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Syllabus */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              * Syllabus{" "}
            </label>
            <div className="flex items-center gap-2 border p-2 rounded shadow-sm">
              <FaFileAlt className="text-black-600" />
              <input
                type="text"
                value={fileName}
                readOnly
                className="flex-1 p-2 border-none bg-transparent focus:outline-none"
                placeholder="Syllabus"
              />
              <button
                onClick={() => fileInput.current.click()}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Browse
              </button>
              <input
                type="file"
                ref={fileInput}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label className="text-sm font-medium text-blue-700">
            * Women Only{" "}
          </label>
          <div className="flex items-center gap-4 border p-3 w-[250px] rounded shadow-sm">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={womenOnly}
                  onChange={() => setWomenOnly(true)}
                  className="form-radio text-blue-500"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!womenOnly}
                  onChange={() => setWomenOnly(false)}
                  className="form-radio text-blue-500"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="border p-3 rounded shadow-sm">
          <label className="block mb-2 text-blue-700 font-medium">
            {" "}
            * Course Details{" "}
          </label>
          <textarea
            value={courseDetails}
            onChange={(e) => setCourseDetails(e.target.value)}
            className="w-full p-3 border rounded mb-4 min-h-[100px] resize-vertical focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter course details"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <label className="mr-2 text-sm font-medium text-gray-700">
                Show
              </label>
              <select className="border rounded-md shadow-sm px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <label className="ml-2 text-sm font-medium text-gray-700">
                entries
              </label>
            </div>
            <div className="relative">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="border rounded-md shadow-sm px-10 py-1 pl-10"
              />
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Study Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Recognition
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courseList.map((course, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(course.instcourID)}
                      className="text-red-600 hover:text-red-900 mr-2"
                    >
                      <FaTrash />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <FaEdit />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {course.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {course.studytype == "O"
                      ? "Online"
                      : course.studytype == "P"
                      ? "Part Time"
                      : course.studytype == "R"
                      ? "Regular"
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {course.recogniseID == "U"
                      ? "UGC"
                      : course.recogniseID == "A"
                      ? "AICTE"
                      : course.recogniseID == "N"
                      ? "NAAC"
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Showing 1 to 10 of {courseList.length} entries
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-200">
                Previous
              </button>
              <span className="px-3 py-1 border border-gray-300 rounded">
                1
              </span>
              <button className="px-3 py-1 border rounded hover:bg-gray-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
