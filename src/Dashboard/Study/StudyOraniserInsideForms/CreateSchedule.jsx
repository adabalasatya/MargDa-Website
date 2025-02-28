import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import {
  FaBookOpen, FaBookReader, FaCalendarPlus, FaClock, FaAngleLeft, FaAngleRight, FaSearch, FaTrash, FaEdit, FaBook, 
} from "react-icons/fa";
import { FaCalendarDays, FaChalkboardUser,  FaXmark } from 'react-icons/fa6';
import { Clock } from 'lucide-react';

const CreateSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [alertMessage, setAlertMessage] = useState('');
  const [holidayDateRange, setHolidayDateRange] = useState([null, null]); // State for date range selection
  const [startDate, endDate] = holidayDateRange; // Destructure start and end dates

  const [formData, setFormData] = useState({
    course: '',
    subject: '',
    lessons: '',
    language: '',
    weightage: '',
    startDate: '',
    endDate: '',
    studyDays: [],
    studyHours: '',
    studyMinutes: ''
  });

  const days = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Handle date range selection for holidays
  const handleHolidayDateChange = (dates) => {
    const [start, end] = dates;
    setHolidayDateRange(dates);
    setFormData(prev => ({
      ...prev,
      holidayDates: {
        start: start ? start.toISOString().split('T')[0] : '', // Convert to YYYY-MM-DD
        end: end ? end.toISOString().split('T')[0] : '' // Convert to YYYY-MM-DD
      }
    }));
  };

  const handleDayChange = (day) => {
    setFormData(prev => {
      if (day === 'All') {
        return {
          ...prev,
          studyDays: prev.studyDays.includes('All') ? [] : days.slice(1) // Avoid including 'All' in the list
        };
      }
      
      const updatedDays = prev.studyDays.includes(day)
        ? prev.studyDays.filter(d => d !== day && d !== 'All')
        : [...prev.studyDays, day].filter(d => d !== 'All'); // Remove 'All' if any day is selected
      
      return {
        ...prev,
        studyDays: updatedDays
      };
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateSchedule = () => {
    const { startDate, endDate, studyDays, studyHours, studyMinutes } = formData;

    if (!startDate || !endDate) {
      setAlertMessage('Please select both start and end dates.');
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (studyDays.length > 0) {
      const studyDaysCount = studyDays.length;
      if (studyDaysCount * totalDays  ) {
        setAlertMessage('Select more days or increase the End Date to complete your syllabus.');
        return false;
      }
    } else if (studyHours || studyMinutes) {
      const totalStudyTime = parseInt(studyHours || 0) * 60 + parseInt(studyMinutes || 0);
      if (totalStudyTime ) {
        setAlertMessage('Increase the study time to complete your syllabus.');
        return false;
      }
    }

    setAlertMessage('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateSchedule()) {
      return;
    }

    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        studyDays: checked
          ? [...prev.studyDays, value]
          : prev.studyDays.filter(day => day !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Dummy data for table
  const dummyData = [
    {
      id: 1,
      course: "Career Counselling",
      subject: "Career Professional Practices",
      lessons: "PR, Digital & Social Media",
      startEnd: "2024-06-26/2024-07-06",
      days: "M,T,W,H,F,R,",
      time: "3",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const filteredData = dummyData.filter((item) =>
    item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <section className="about-choice ">
        <form onSubmit={handleSubmit} id="organiserForm">
          <div className="row">
            <div className="row mb-3 ">
              <div className="col">
                <h5 className="text-2xl font-bold mb-8"><FaCalendarPlus className="text-blue-500 inline mr-2 text-2xl" /> Create your study schedule</h5>
              </div>
            </div>
             
              {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                      
              {/* Weightage */}
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2 flex items-center">
                  <FaXmark className="text-blue-500 mr-2" /> Weightage
                </label>
                <select
                  className="form-select w-full border p-2 rounded"
                  id="weightage"
                  name="weightage"
                  value={formData.weightage}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="D">Difficult</option>
                  <option value="E">Easy</option>
                  <option value="N">Normal</option>
                  <option value="T">Very Tough</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2 flex items-center">
                  <FaBook className="text-blue-500 mr-2" /> Course/Exam
                </label>
                <select
                  className="form-select w-full border p-2 rounded"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1">Career Counselling</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-bold mb-2 flex items-center">
                  <FaBookOpen className="text-blue-500 mr-2" /> Subject
                </label>
                <select
                  className="form-select w-full border p-2 rounded"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-bold mb-2 flex items-center">
                  <FaBookReader className="text-blue-500 mr-2" /> Lesson
                </label>
                <select
                  className="form-select w-full border p-2 rounded"
                  id="lessons"
                  name="lessons"
                  value={formData.lessons}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                </select>
              </div>

              {/* Language */}
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2 flex items-center">
                  <FaChalkboardUser className="text-blue-500 mr-2" /> Language
                </label>
                <select
                  className="form-select w-full border p-2 rounded"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1">English</option>
                  <option value="2">Hindi</option>
                  {/* Add more languages */}
                </select>
              </div>


              {/* Start Date */}
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2 flex items-center">
                  <FaCalendarDays className="text-blue-500 mr-2" /> Start Date
                </label>
                <input 
                  type="date" 
                  className="form-control w-full border p-2 rounded" 
                  id="startDate" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleInputChange} 
                />
              </div>

              {/* End Date */}
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2 flex items-center">
                  <FaCalendarDays className="text-blue-500 mr-2" /> End Date
                </label>
                <input 
                  type="date" 
                  className="form-control w-full border p-2 rounded" 
                  id="endDate" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleInputChange} 
                />
              </div>

              {/* Holiday Dates (Date Range Picker) */}
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2 flex items-center">
                  <FaCalendarDays className="text-red-500 mr-2" /> Holiday Dates
                </label>
                <DatePicker
                  selectsRange // Enable date range selection
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleHolidayDateChange}
                  isClearable
                  placeholderText="Select holiday date range"
                  className="form-control w-full border p-2 rounded w-[250px]"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

            </div>

            {/* Study TIME Days Section */}
            <div className="mt-6 space-y-6 p-6 bg-white shadow-lg rounded-lg border border-gray-300 ">
              {/* Title */}
              <h2 className="text-xl font-semibold flex justify-center items-center gap-3 text-gray-800">
                <Clock className="text-blue-500 text-2xl" />
                Select either <span className="font-bold">Study Days</span> OR <span className="font-bold">Study Time</span>
              </h2>

              {/* Study Days Section */}
              <div className="p-4 bg-gray-10 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-blue-500 text-lg" />
                  <span className="text-gray-700 text-lg font-medium">Study Days</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {days.map((day) => (
                    <label key={day} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-blue-50 rounded-md">
                      <input
                        type="checkbox"
                        id={day}
                        checked={formData.studyDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 text-base">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Study Time Section */}
              <div className="p-4 bg-gray-10 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-blue-500 text-lg" />
                  <span className="text-gray-700 text-lg font-medium">Study Time</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="studyHours"
                      value={formData.studyHours}
                      onChange={handleTimeChange}
                      placeholder="01"
                      min="0"
                      max="24"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    />
                    <span className="text-gray-600">Hours</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="studyMinutes"
                      value={formData.studyMinutes}
                      onChange={handleTimeChange}
                      placeholder="15"
                      min="0"
                      max="59"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    />
                    <span className="text-gray-600">Minutes</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 shadow-md"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>

      <div className="mt-8">
        {alertMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{alertMessage}</span>
          </div>
        )}
      </div>

      <div className="mt-8 ">
        <div className="flex justify-between items-center mb-4">
          <div>
            <label>Show </label>
            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="border p-1 rounded"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <label> entries</label>
          </div>
          <div className="flex items-center">
            <FaSearch className="mr-2 text-blue-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
         {/* Table for displaying schedule */}
         <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-200">
              {[
                { text: "Course/Exam", icon: FaBook },
                { text: "Subject", icon: FaBookOpen },
                { text: "Lessons", icon: FaBookReader },
                { text: "Start/End Date", icon: FaCalendarDays },
                { text: "Days", icon: FaCalendarDays },
                { text: "Time", icon: FaClock },
                { text: "Action", icon: FaBookOpen },
              ].map(({ text, icon }, idx) => (
                <th key={idx} className="px-4 py-2 border-b text-left">
                  <div className="flex items-center">
                    {React.createElement(icon, { className: "text-blue-500 mr-2" })}
                    {text}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((item) => (
              <tr key={item.id} className="odd:bg-gray-50 even:bg-white">
                <td className="px-4 py-2 border-b">{item.course}</td>
                <td className="px-4 py-2 border-b">{item.subject}</td>
                <td className="px-4 py-2 border-b">{item.lessons}</td>
                <td className="px-4 py-2 border-b">{item.startEnd}</td>
                <td className="px-4 py-2 border-b">{item.days}</td>
                <td className="px-4 py-2 border-b">{item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit className="w-4 h-4 inline" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 ml-2">
                    <FaTrash className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <span>
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} records
          </span>

          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              <FaAngleLeft />
            </button>

            <span className="px-4 py-1 border rounded bg-blue-500 text-white">
              {currentPage}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;