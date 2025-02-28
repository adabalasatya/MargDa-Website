import React, { useState } from "react";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaBook, FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";

const RankingPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");

  // Sample ranking data (could be fetched from an API)
  const rankingData = {
    country: 1,
    state: 1,
    district: 1,
    pinArea: 1,
    class: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen bg-gray-10 pt-0">
      {/* Header */}
      <h2 className="text-3xl font-bold text-blue-900 mb-12 flex items-center justify-center gap-2">
        <AiOutlineTrophy className="text-yellow-500" /> Ranking Dashboard
      </h2>

      {/* Selection Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-12 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaBook className="text-blue-500 mr-2" /> Class/Exam
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm  transition duration-200"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class/Exam</option>
              <option value="class-10">Class 10</option>
              <option value="class-12">Class 12</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaChalkboardTeacher className="text-blue-500 mr-2" /> Subject
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm  transition duration-200"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaClipboardList className="text-blue-500 mr-2" /> Lesson
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm  transition duration-200"
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
            >
              <option value="">Select Lesson</option>
              <option value="algebra">Algebra</option>
              <option value="physics">Physics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AiOutlineTrophy className="text-yellow-500" /> Your Rank
        </h3>
        <div className="overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-3 text-left text-sm font-semibold text-black-700 border-b border-gray-200">Your Rank Country</th>
        <th className="p-3 text-left text-sm font-semibold text-black-700 border-b border-gray-200">State</th>
        <th className="p-3 text-left text-sm font-semibold text-black-700 border-b border-gray-200">District</th>
        <th className="p-3 text-left text-sm font-semibold text-black-700 border-b border-gray-200">PIN Area</th>
        <th className="p-3 text-left text-sm font-semibold text-black-700 border-b border-gray-200">Class</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-50 transition duration-150">
        <td className="p-3 pl-12 text-gray-800 text-left">{rankingData.country}</td>
        <td className="p-3 pl-5 text-gray-800 text-left">{rankingData.state}</td>
        <td className="p-3 pl-5 text-gray-800 text-left">{rankingData.district}</td>
        <td className="p-3 pl-5 text-gray-800 text-left">{rankingData.pinArea}</td>
        <td className="p-3 pl-5 text-gray-800 text-left">{rankingData.class}</td>
      </tr>
    </tbody>
  </table>
</div>
      </div>

      {/* Additional Stats (Optional) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center border border-gray-300">
          <h4 className="text-md font-semibold text-gray-700">Total Participants</h4>
          <p className="text-2xl font-bold text-blue-600">1,245</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center border border-gray-300">
          <h4 className="text-md font-semibold text-gray-700">Your Percentile</h4>
          <p className="text-2xl font-bold text-blue-600">99.9%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center border border-gray-300">
          <h4 className="text-md font-semibold text-gray-700">Rank Change</h4>
          <p className="text-2xl font-bold text-green-600">+2</p>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;