import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FaChartLine, FaFilter, FaBook, FaBookOpen, FaBookReader, } from "react-icons/fa";

const EfficiencyDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [timeRange, setTimeRange] = useState("30"); // Default to last 30 days

  // Enhanced chart options
  const marksGraphOptions = {
    chart: {
      type: "line",
      height: 350,
      backgroundColor: "transparent",
      zoomType: "x",
    },
    title: {
      text: "Marks Trend",
      style: { color: "#1e3a8a", fontWeight: "bold" },
    },
    xAxis: {
      categories: ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"],
      labels: { style: { color: "#64748b" } },
      gridLineWidth: 1,
      gridLineColor: "#e2e8f0",
    },
    yAxis: {
      title: { text: "Marks", style: { color: "#64748b" } },
      max: 100,
      min: 0,
      gridLineColor: "#e2e8f0",
      labels: { format: "{value}%" },
    },
    series: [
      {
        name: "Marks",
        data: [20, 30, 25, 35, 40],
        color: "#3b82f6",
        lineWidth: 3,
        marker: { enabled: true, radius: 5, fillColor: "#3b82f6" },
      },
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          format: "{y}%",
          style: { color: "#1e3a8a", fontWeight: "bold" },
        },
      },
    },
    tooltip: { valueSuffix: "%" },
    legend: { enabled: false },
    credits: { enabled: false },
  };

  const timeGraphOptions = {
    chart: {
      type: "line",
      height: 350,
      backgroundColor: "transparent",
      zoomType: "x",
    },
    title: {
      text: "Time Efficiency",
      style: { color: "#1e3a8a", fontWeight: "bold" },
    },
    xAxis: {
      categories: ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"],
      labels: { style: { color: "#64748b" } },
      gridLineWidth: 1,
      gridLineColor: "#e2e8f0",
    },
    yAxis: {
      title: { text: "Time (seconds)", style: { color: "#64748b" } },
      min: 0,
      gridLineColor: "#e2e8f0",
    },
    series: [
      {
        name: "Time",
        data: [120, 110, 140, 100, 90],
        color: "#10b981",
        lineWidth: 3,
        marker: { enabled: true, radius: 5, fillColor: "#10b981" },
      },
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          format: "{y}s",
          style: { color: "#1e3a8a", fontWeight: "bold" },
        },
      },
    },
    tooltip: { valueSuffix: "s" },
    legend: { enabled: false },
    credits: { enabled: false },
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-10 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex-1 text-center">
          <h2 className="text-3xl font-bold text-blue-900 flex items-center justify-center">
            <FaChartLine className="mr-3 text-blue-600" /> Efficiency 
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
      <div className="bg-white p-6 rounded-lg shadow-md mb-12 border border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaBook className="text-blue-500 mr-2" /> Class/Exam
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200 "
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
            <FaBookOpen className="text-blue-500 mr-2" /> Subject
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaBookReader className="text-blue-500 mr-2" /> Lesson
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition duration-200 "
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
          >
            <option value="">Select Lesson</option>
            <option value="lesson-1">Lesson 1</option>
            <option value="lesson-2">Lesson 2</option>
            <option value="lesson-3">Lesson 3</option>
          </select>
        </div>
      </div>
    </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200  border border-gray-300">
          <HighchartsReact highcharts={Highcharts} options={marksGraphOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200  border border-gray-300">
          <HighchartsReact highcharts={Highcharts} options={timeGraphOptions} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6  border border-gray-300">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Avg. Marks</h3>
          <p className="text-2xl font-bold text-blue-600">30%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Avg. Time</h3>
          <p className="text-2xl font-bold text-blue-600">112s</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Trend</h3>
          <p className="text-2xl font-bold text-green-600">+20%</p>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyDashboard;