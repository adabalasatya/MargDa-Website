import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BookOpen } from 'lucide-react';
import Image from "../../assets/progressmeter.png";

const ProgressMeter = () => {
  // Sample data
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science'];
  const classes = ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Final Exam'];
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  
  // Sample subject percentage data for pie chart
  const subjectData = [
    { name: 'Mathematics', value: 35 },
    { name: 'Science', value: 25 },
    { name: 'English', value: 20 },
    { name: 'History', value: 10 },
    { name: 'Computer Science', value: 10 },
  ];
  
  // Sample time and marks data for bar chart
  const timeAndMarksData = [
    { name: '0', time: 0, marks: 0 },
    { name: '10', time: 10, marks: 20 },
    { name: '20', time: 20, marks: 35 },
    { name: '30', time: 30, marks: 45 },
    { name: '40', time: 40, marks: 60 },
    { name: '50', time: 50, marks: 70 },
    { name: '60', time: 60, marks: 75 },
    { name: '70', time: 70, marks: 80 },
    { name: '80', time: 80, marks: 85 },
    { name: '90', time: 90, marks: 90 },
    { name: '100', time: 100, marks: 95 },
  ];
  
  // Colors for pie chart
  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8'];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4); // Loop through 4 steps
    }, 1000); // Change every 1 second

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-center gap-3 my-6">
        <BookOpen size={32} className="text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800">Progress Meter</h1>
      </div>

      {/* Main dashboard container */}
      <div className="w-full p-4 bg-white rounded-lg shadow border border-gray-300">
        {/* Selectors */}
        <div className="flex flex-col md:flex-row mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Class/Exam</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class/Exam</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Pie Chart → Subject percentage</p>
          </div>
          
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Color bar → time + marks</p>
          </div>
        </div>
        
        {/* Charts */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Pie Chart */}
          <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-2 text-center">Subject Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
                 
         {/* Image Chart with Colored Overlay */}
        <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-2 text-center">
        Time vs Marks Progress
      </h2>
      <div className="h-64 flex items-center justify-center relative">
        {/* Base image */}
        <img src={Image} alt="Time vs Marks Progress" className="max-w-full max-h-full" />

        {/* Animated Progress Bar */}
        <div className="absolute top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-[72%] h-7 rounded-full overflow-hidden border border-gray-300 flex">
          {/* Red - Appears first */}
          <div className={`h-full transition-all duration-500 ${activeStep >= 1 ? "bg-red-500" : "bg-transparent"}`} style={{ width: "30%" }}></div>
          {/* Yellow - Appears second */}
          <div className={`h-full transition-all duration-500 ${activeStep >= 2 ? "bg-yellow-400" : "bg-transparent"}`} style={{ width: "30%" }}></div>
          {/* Green - Appears third */}
          <div className={`h-full transition-all duration-500 ${activeStep >= 3 ? "bg-green-500" : "bg-transparent"}`} style={{ width: "40%" }}></div>
         </div>
        </div>
        </div>
          
        </div>
        
        {/* Progress Summary */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold mb-2">Progress Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-xl font-bold text-blue-600">78%</p>
            </div>
            <div className="p-3 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Time Spent</p>
              <p className="text-xl font-bold text-blue-600">42 hrs</p>
            </div>
            <div className="p-3 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Completion</p>
              <p className="text-xl font-bold text-blue-600">65%</p>
            </div>
            <div className="p-3 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Strongest Subject</p>
              <p className="text-xl font-bold text-blue-600">Mathematics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressMeter;