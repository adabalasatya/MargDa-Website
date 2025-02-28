import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  FaBookOpen,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaEdit, // Added for Edit
  FaTrash, // Added for Delete
} from "react-icons/fa";
import { FaPersonChalkboard, FaAngleDown } from "react-icons/fa6";
import { toast } from "react-toastify";

const StudyMcq = () => {
  const initialFormData = {
    lesson: null,
    medium: null,
    question: "",
    options: ["", "", "", ""],
    explanation: "",
    weightage: "E",
    correctAnswer: "A",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mcqs, setMcqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [lessonOptions, setLessonOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  // Fetch lessons and languages on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!accessToken) {
        console.error("No access token found in localStorage.");
        toast.error("Please log in to access data.");
        return;
      }

      try {
        setIsLoading(true);
        // Fetch Lessons
        const lessonResponse = await fetch(
          "https://margda.in:7000/api/study/lesson/get-study-lessons",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!lessonResponse.ok)
          throw new Error(
            `Lessons HTTP error! status: ${lessonResponse.status}`
          );
        const lessonData = await lessonResponse.json();
        setLessonOptions(
          lessonData.Lessons.map((lesson) => ({
            value: lesson.lessonID,
            label: lesson.lesson,
          }))
        );

        // Fetch Languages
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
        setLanguageOptions(
          (languageData.data || languageData).map((lang) => ({
            value: lang.langID,
            label: lang.language,
          }))
        );
      } catch (error) {
        console.error("Fetch Initial Data Error:", error);
        toast.error("Failed to fetch initial data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [accessToken]);

  // Fetch MCQs based on selected lessonID with enhanced debugging

  const fetchMcqs = async (lessonID) => {
    try {
      setIsLoading(true);
      setCurrentPage(1);

      const response = await fetch(
        "https://margda.in:7000/api/study/mcq/get-mcqs",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonID: parseInt(lessonID, 10),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`MCQs HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let mcqData = [];
      if (data.MCQ && Array.isArray(data.MCQ)) {
        mcqData = data.MCQ;
      } else if (data.mcq && Array.isArray(data.mcq)) {
        mcqData = data.mcq;
      }

      // Transform MCQ data to match the expected structure
      const transformedMcqs = mcqData.map((mcq) => ({
        question: mcq.content || mcq.question || "",
        option1: mcq.option1 || mcq.options?.[0] || "",
        option2: mcq.option2 || mcq.options?.[1] || "",
        option3: mcq.option3 || mcq.options?.[2] || "",
        option4: mcq.option4 || mcq.options?.[3] || "",
        explained: mcq.explained || mcq.explanation || "",
        correct: mcq.correct || mcq.correctAnswer || "",
        mcqID: mcq.mcqID,
      }));

      // console.log("Transformed MCQs:", transformedMcqs);
      setMcqs(transformedMcqs);

      if (transformedMcqs.length === 0) {
        toast.info("No MCQs found for this lesson");
      }
    } catch (error) {
      console.error("Fetch MCQs Error:", error);
      // toast.error("Failed to fetch MCQs: " + error.message);
      setMcqs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, fieldName, index = null) => {
    if (fieldName === "question" || fieldName === "explanation") {
      setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
    } else if (fieldName === "options") {
      const newOptions = [...formData.options];
      newOptions[index] = e.target.value;
      setFormData((prev) => ({ ...prev, options: newOptions }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.lesson?.value ||
      !formData.medium?.value ||
      !formData.question ||
      !formData.options[0] ||
      !formData.options[1] ||
      !formData.weightage ||
      !formData.correctAnswer
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        lessonID: parseInt(formData.lesson.value, 10),
        medium: parseInt(formData.medium.value, 10),
        weightage: formData.weightage,
        question: formData.question,
        option1: formData.options[0],
        option2: formData.options[1],
        option3: formData.options[2] || null,
        option4: formData.options[3] || null,
        explained: formData.explanation || null,
        correct: formData.correctAnswer,
      };

      const response = await fetch(
        "https://margda.in:7000/api/study/mcq/add-mcq",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Add MCQ HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      await response.json();
      toast.success("MCQ added successfully!");

      const selectedLesson = formData.lesson;
      setFormData({
        ...initialFormData,
        lesson: selectedLesson,
        medium: formData.medium,
      });
      setCurrentPage(1);

      // Refetch MCQs for the current lesson
      // const fetchResponse = await fetch(
      //   "https://margda.in:7000/api/study/mcq/get-mcqs",
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       lessonID: parseInt(selectedLesson.value, 10),
      //     }),
      //   }
      // );

      // if (!fetchResponse.ok) {
      //   throw new Error(`Failed to refresh MCQs after adding new one`);
      // }

      // const newData = await fetchResponse.json();
      // const newMcqData = Array.isArray(newData)
      //   ? newData
      //   : newData.mcqs || newData.MCQs || [];

      // setMcqs(
      //   newMcqData.map((mcq) => ({
      //     question: mcq.question || "",
      //     option1: mcq.option1 || "",
      //     option2: mcq.option2 || "",
      //     option3: mcq.option3 || "",
      //     option4: mcq.option4 || "",
      //     explained: mcq.explained || "",
      //     correct: mcq.correct || "",
      //   }))
      // );
      fetchMcqs(formData.lesson.value);
    } catch (error) {
      console.error("Submit Error:", error);
      // toast.error("Failed to add MCQ: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit handler
  const handleEdit = (mcq, index) => {
    setFormData({
      lesson: formData.lesson,
      medium: formData.medium,
      question: mcq.question,
      options: [mcq.option1, mcq.option2, mcq.option3 || "", mcq.option4 || ""],
      explanation: mcq.explained || "",
      weightage: "E", // Adjust if weightage is available in your MCQ data
      correctAnswer: mcq.correct,
    });
    toast.info(
      "Edit mode activated. Update the form and submit to save changes."
    );
  };

  // Delete handler (assumes a hypothetical DELETE endpoint)
  const handleDelete = async (mcq, index) => {
    if (!window.confirm("Are you sure you want to delete this MCQ?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://margda.in:7000/api/study/mcq/delete-mcq", // Adjust endpoint as needed
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonID: parseInt(formData.lesson.value, 10),
            question: mcq.question, // Use an ID if available
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Delete MCQ HTTP error! status: ${response.status}`);
      }

      setMcqs((prev) => prev.filter((_, i) => i !== index));
      toast.success("MCQ deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete MCQ: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / recordsPerPage))
      setCurrentPage(currentPage + 1);
  };

  const getPaginationRange = () => {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const filteredData = mcqs.filter(
    (mcq) =>
      mcq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mcq.option1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mcq.option2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mcq.option3 &&
        mcq.option3.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (mcq.option4 &&
        mcq.option4.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredMcqs = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleLessonChange = async (selectedLesson) => {
    await fetchMcqs(selectedLesson.value);
    setFormData((prev) => ({ ...prev, lesson: selectedLesson }));
  };

  return (
    <div className="container mx-auto p-4 relative bg-gray-10 min-h-screen">
      <h2 className="text-4xl mb-4 text-primary font-bold flex justify-center items-center">
        <FaBookOpen className="inline-block mr-2 text-blue-500" /> StudyMcq
      </h2>

      <form
        className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-300"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
            <label className="flex items-center text-base font-medium text-gray-700">
              <FaPersonChalkboard className="mr-2 text-blue-500" />
              Select Lesson
            </label>
            <Select
              value={formData.lesson}
              onChange={handleLessonChange}
              options={lessonOptions}
              className="w-full"
              placeholder="Select Lesson"
            />
          </div>

          <div className="space-y-2 relative">
            <label className="flex items-center text-base font-medium text-gray-700">
              <FaAngleDown className="mr-2 text-blue-500" />
              Select Language
            </label>
            <Select
              value={formData.medium}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, medium: selected }))
              }
              options={languageOptions}
              className="w-full"
              placeholder="Select Language"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">
            Question
          </label>
          <textarea
            value={formData.question}
            onChange={(e) => handleInputChange(e, "question")}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Enter your question here"
          />
        </div>

        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Option {index + 1}
            </label>
            <textarea
              value={formData.options[index]}
              onChange={(e) => handleInputChange(e, "options", index)}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="2"
              placeholder={`Enter option ${index + 1} here`}
            />
          </div>
        ))}

        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">
            Explanation
          </label>
          <textarea
            value={formData.explanation}
            onChange={(e) => handleInputChange(e, "explanation")}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Enter explanation here (optional)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <span className="block text-base font-medium text-gray-700">
              Weightage
            </span>
            <div className="flex space-x-4">
              {[
                { value: "E", label: "Easy" },
                { value: "N", label: "Normal" },
                { value: "D", label: "Difficult" },
                { value: "T", label: "Very Tough" },
              ].map((option) => (
                <label key={option.value} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="weightage"
                    value={option.value}
                    checked={formData.weightage === option.value}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        weightage: e.target.value,
                      }))
                    }
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-base font-medium text-gray-700">
              Correct Answer
            </span>
            <div className="flex space-x-4">
              {["A", "B", "C", "D"].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="correct"
                    value={option}
                    checked={formData.correctAnswer === option}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        correctAnswer: e.target.value,
                      }))
                    }
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="flex items-center p-4 justify-between mb-4 mt-6 bg-white rounded-lg shadow-md border border-gray-300">
        <div className="flex items-center">
          <span className="mr-2">Show</span>
          <select
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2">Records</span>
        </div>
        <div className="flex items-center">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-2 bg-white rounded-lg shadow-md border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MCQ Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Option 1
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Option 2
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Option 3
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Option 4
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Explanation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Correct
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  Loading MCQs...
                </td>
              </tr>
            ) : filteredMcqs.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No MCQs found for this lesson or search term.
                </td>
              </tr>
            ) : (
              filteredMcqs.map((mcq, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button
                      // onClick={() => handleEdit(mcq, index)}
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(mcq, index)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{mcq.mcqID}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{mcq.question}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{mcq.option1}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{mcq.option2}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{mcq.option3}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{mcq.option4}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{mcq.explained}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{mcq.correct}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-300">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to{" "}
          {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
          {filteredData.length} Records
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded transition duration-300 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            <FaChevronLeft className="inline-block" /> Previous
          </button>

          {getPaginationRange().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } rounded transition duration-300`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredData.length / recordsPerPage)
            }
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded transition duration-300 ${
              currentPage === Math.ceil(filteredData.length / recordsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Next <FaChevronRight className="inline-block" />
          </button>
        </div>
      </div>

      <footer className="mt-4 w-full bg-gray-50 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
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

export default StudyMcq;
