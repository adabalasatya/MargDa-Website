import React, { useState } from "react";
import { FaChalkboardUser, FaArrowLeft } from "react-icons/fa6";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const changeMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const renderDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    let days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="border p-2"></td>);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <td key={day} className="border p-2 text-center text-blue-500">{day}</td>
      );
    }

    let rows = [];
    let cells = [];

    days.forEach((day, i) => {
      if (i % 7 === 0) {
        rows.push(<tr key={i}>{cells}</tr>);
        cells = [day];
      } else {
        cells.push(day);
      }
    });

    if (cells.length > 0) {
      rows.push(<tr key={days.length}>{cells}</tr>);
    }

    return rows;
  };

  return (
    <div className="p-4">
      {/* Header and Back Button in Same Line */}
      <div className="flex items-center justify-between py-4 mb-8">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="flex-1 flex justify-center">
          <FaChalkboardUser className="text-4xl text-blue-500 mr-2" />
          <h2 className="text-3xl text-blue-600 font-bold underline">Study Calendar</h2>
        </div>
        <div className="w-[120px]"></div> 
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button className="text-lg ml-2 font-bold" onClick={() => changeMonth(-1)}>
          {"<<"} Today
        </button>
        <span className="text-xl font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button className="text-lg mr-2 font-bold" onClick={() => changeMonth(1)}>
          Next {">>"}
        </button>
      </div>

      {/* Calendar Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className="border p-2 bg-gray-200">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderDays()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;