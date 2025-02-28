import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FaUsers, FaFilter, FaSearch, FaTimes,  FaBook, FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";

const CompareDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [search, setSearch] = useState("");
  const [timeRange, setTimeRange] = useState("30");

  const [competitors, setCompetitors] = useState([
    { name: "Akshay", marks: 54 },
    { name: "Bhavya", marks: 69 },
    { name: "Chirag", marks: 72 },
    { name: "Divya", marks: 66 },
    { name: "Eshita", marks: 81 },
  ]);

  // Enhanced bar chart options
  const barChartOptions = {
    chart: {
      type: "bar",
      height: 400,
      backgroundColor: "transparent",
    },
    title: {
      text: "Competitor Comparison",
      style: { color: "#1e3a8a", fontWeight: "bold" },
    },
    xAxis: {
      categories: competitors.map((c) => c.name),
      labels: { style: { color: "#64748b" } },
    },
    yAxis: {
      title: { text: "Average Marks (%)", style: { color: "#64748b" } },
      max: 100,
      min: 0,
      gridLineColor: "#e2e8f0",
      labels: { format: "{value}%" },
    },
    series: [
      {
        name: "Marks",
        data: competitors.map((c) => c.marks),
        color: "#3b82f6",
        borderRadius: 4,
        dataLabels: {
          enabled: true,
          format: "{y}%",
          style: { color: "#1e3a8a", fontWeight: "bold" },
        },
      },
    ],
    plotOptions: {
      bar: {
        pointPadding: 0.1,
        groupPadding: 0.2,
      },
    },
    tooltip: { valueSuffix: "%" },
    legend: { enabled: false },
    credits: { enabled: false },
  };

  const handleRemoveCompetitor = (index) => {
    setCompetitors(competitors.filter((_, i) => i !== index));
  };

  const filteredCompetitors = competitors.filter((comp) =>
    comp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-10 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="flex-1 text-center">
          <h2 className="text-3xl font-bold text-blue-900 flex items-center justify-center ">
            <FaUsers className="mr-3 text-blue-600" /> Compare
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaFilter className="text-blue-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md p-1 "
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaBook className="text-blue-500 mr-2" /> Class/Exam
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class/Exam</option>
            <option value="class-10">Class 10</option>
            <option value="class-11">Class 11</option>
            <option value="class-12">Class 12</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaChalkboardTeacher className="text-blue-500 mr-2" /> Subject
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaClipboardList className="text-blue-500 mr-2" /> Lesson
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200"
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
          >
            <option value="">Select Lesson</option>
            <option value="lesson-1">Lesson 1</option>
            <option value="lesson-2">Lesson 2</option>
          </select>
        </div>
      </div>
    </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-300">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Students (by Name or Email, max 5)
        </label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            type="text"
            className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm transition duration-200"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Competitors Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-300">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Competitors</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Average Marks</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompetitors.slice(0, 5).map((comp, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150"
                >
                 <td className="p-3">
               <button
              onClick={() => handleRemoveCompetitor(index)}
             className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors duration-200"
             >
            <FaTimes />
            <span className="text-black">{comp.name}</span>
            </button>
               </td>
                  <td className="p-3 text-gray-800">{comp.marks}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-300">
        <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
      </div>
    </div>
  );
};

export default CompareDashboard;