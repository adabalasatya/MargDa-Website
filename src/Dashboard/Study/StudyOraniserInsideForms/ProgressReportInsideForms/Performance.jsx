import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FaChartBar, FaFilter, FaBookOpen, FaBookReader, } from "react-icons/fa";

const PerformanceDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [timeRange, setTimeRange] = useState("30"); // Default to last 30 days

  // Enhanced chart options with more customization
  const subjectMarksOptions = {
    chart: {
      type: "column",
      height: 300,
      backgroundColor: "transparent",
    },
    title: {
      text: "Subject Average Marks",
      style: { color: "#1e3a8a", fontWeight: "bold" },
    },
    xAxis: {
      categories: ["Math", "Science", "History", "English"],
      labels: { style: { color: "#64748b" } },
    },
    yAxis: {
      title: { text: "Marks", style: { color: "#64748b" } },
      max: 100,
      gridLineColor: "#e2e8f0",
    },
    series: [
      {
        name: "Marks",
        data: [75, 85, 65, 90],
        color: "#3b82f6",
        borderRadius: 4,
      },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "{y}%",
          style: { color: "#1e3a8a", fontWeight: "bold" },
        },
      },
    },
    legend: { enabled: false },
    credits: { enabled: false },
  };

  const lessonMarksOptions = {
    chart: {
      type: "column",
      height: 300,
      backgroundColor: "transparent",
    },
    title: {
      text: "Lesson Average Marks",
      style: { color: "#1e3a8a", fontWeight: "bold" },
    },
    xAxis: {
      categories: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"],
      labels: { style: { color: "#64748b" } },
    },
    yAxis: {
      title: { text: "Marks", style: { color: "#64748b" } },
      max: 100,
      gridLineColor: "#e2e8f0",
    },
    series: [
      {
        name: "Marks",
        data: [70, 80, 60, 85],
        color: "#10b981",
        borderRadius: 4,
      },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "{y}%",
          style: { color: "#1e3a8a", fontWeight: "bold" },
        },
      },
    },
    legend: { enabled: false },
    credits: { enabled: false },
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-10 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 relative">
  <div className="flex-1 text-center">
    <h2 className="text-3xl font-bold text-blue-900 flex items-center justify-center">
      <FaChartBar className="mr-3 text-blue-600" /> Performance 
    </h2>
  </div>
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <FaFilter className="text-blue-500" />
    <select
      value={timeRange}
      onChange={(e) => setTimeRange(e.target.value)}
      className="border border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-blue-500"
    >
      <option value="7">Last 7 Days</option>
      <option value="30">Last 30 Days</option>
      <option value="90">Last 90 Days</option>
      <option value="all">All Time</option>
    </select>
  </div>
</div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-12 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaBookOpen className="mr-2 text-blue-500" /> Class/Exam
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
              <option value="jee">JEE Main</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaBookReader className="mr-2 text-blue-500" /> Subject
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option value="math">Mathematics</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="english">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-300">
          <HighchartsReact highcharts={Highcharts} options={subjectMarksOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-300">
          <HighchartsReact highcharts={Highcharts} options={lessonMarksOptions} />
        </div>
      </div>

      {/* Additional Stats (Optional) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-300">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Average Score</h3>
          <p className="text-2xl font-bold text-blue-600">78%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Tests Taken</h3>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Improvement</h3>
          <p className="text-2xl font-bold text-green-600">+15%</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;