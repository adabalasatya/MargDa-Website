import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import {
  FaBookOpen,
  FaBookReader,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";

const InstCapMcqForm = () => {
  const [skill, setSkill] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [explanation, setExplanation] = useState("");
  const [weightage, setWeightage] = useState("E");
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [mcqs, setMcqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const skillsOptions = [];

  const handleEditorChange = (content, editor, fieldName) => {
    if (fieldName === "question") {
      setQuestion(content);
    } else if (fieldName === "explanation") {
      setExplanation(content);
    } else {
      const newOptions = [...options];
      newOptions[fieldName] = content;
      setOptions(newOptions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMcq = {
      skill: skill ? skill.value : null,
      question,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      explanation,
      weightage,
      correct: correctAnswer,
    };

    setMcqs([...mcqs, newMcq]);
    // Reset form
    setSkill(null);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setExplanation("");
    setWeightage("E");
    setCorrectAnswer("A");
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = mcqs.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(mcqs.length / recordsPerPage))
      setCurrentPage(currentPage + 1);
  };

  const getPaginationRange = () => {
    const totalPages = Math.ceil(mcqs.length / recordsPerPage);
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
      mcq.option3.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mcq.option4.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMcqs = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Effect to handle dropdown overlapping with editor
  useEffect(() => {
    const handleDropdownPosition = () => {
      const selectElement = document.querySelector(".select__menu");
      if (selectElement) {
        const editorElement = document.querySelector(".tox.tox-tinymce");
        if (
          editorElement &&
          selectElement.getBoundingClientRect().bottom >
            editorElement.getBoundingClientRect().top
        ) {
          selectElement.style.zIndex = "1000"; // Ensure the dropdown appears above the editor
        }
      }
    };

    // Listen for when the dropdown menu is opened
    document.addEventListener("mousedown", handleDropdownPosition);

    return () => {
      document.removeEventListener("mousedown", handleDropdownPosition);
    };
  }, []);

  return (
    <div className="container mx-auto p-4 relative bg-gray-10 min-h-screen">
      <div className="flex items-center justify-between mb-6 mt-4 relative">
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
          <FaBookOpen className="text-4xl text-blue-500" />
          CAP – MCQ
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-300"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 flex items-center">
            <FaBookReader className="inline-block text-blue-500 mr-2" /> Select
            CAP
          </label>
          <Select
            value={skill}
            onChange={setSkill}
            options={skillsOptions}
            placeholder="Select a Cap"
            className="w-1/2 z-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Question</label>
          <Editor
            apiKey="your-api-key"
            initialValue={question}
            init={{
              height: 320,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content, editor) =>
              handleEditorChange(content, editor, "question")
            }
          />
          <span id="ques_err" className="text-red-500 hidden">
            * Minimum Length 2000 characters
          </span>
        </div>
        {["opt1", "opt2", "opt3", "opt4"].map((opt, index) => (
          <div key={opt} className="mb-4">
            <label className="block text-sm font-bold mb-2">{`Option ${
              index + 1
            }`}</label>
            <Editor
              apiKey="your-api-key"
              initialValue={options[index]}
              init={{
                height: 320,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(content, editor) =>
                handleEditorChange(content, editor, index)
              }
            />
            <span id={`${opt}_err`} className="text-red-500 hidden">
              * Minimum Length 2000 characters
            </span>
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Explain</label>
          <Editor
            apiKey="your-api-key"
            initialValue={explanation}
            init={{
              height: 320,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content, editor) =>
              handleEditorChange(content, editor, "explanation")
            }
          />
          <span id="explain_err" className="text-red-500 hidden">
            * Minimum Length 2000 characters
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-bold mb-2">Weightage</span>
          <div className="flex space-x-4">
            {["E", "N", "D", "T"].map((val) => (
              <label key={val} className="inline-flex items-center">
                <input
                  type="radio"
                  value={val}
                  checked={weightage === val}
                  onChange={() => setWeightage(val)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">
                  {val === "E"
                    ? "Easy"
                    : val === "N"
                    ? "Normal"
                    : val === "D"
                    ? "Difficult"
                    : "Very Tough"}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-bold mb-2">Answer</span>
          <div className="flex space-x-4">
            {["A", "B", "C", "D"].map((val) => (
              <label key={val} className="inline-flex items-center">
                <input
                  type="radio"
                  value={val}
                  checked={correctAnswer === val}
                  onChange={() => setCorrectAnswer(val)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">{val}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          Submit
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

      {/* Table to display MCQs */}
      <div className="mt-2 bg-white rounded-lg shadow-md border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Question
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Option 1
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Option 2
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Option 3
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Option 4
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Explain
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Correct
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMcqs.map((mcq, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span>{mcq.skill}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{mcq.question}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{mcq.option1}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{mcq.option2}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{mcq.option3}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{mcq.option4}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{mcq.explanation}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{mcq.correct}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-lg shadow-md">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to{" "}
          {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
          {filteredData.length} Records
        </div>
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
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

          {/* Page Numbers */}
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

          {/* Current Page Display */}
          <span className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow-md">
            {currentPage}
          </span>

          {/* Next Button */}
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

      {/* Footer */}
      <footer className="mt-6 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
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

export default InstCapMcqForm;
