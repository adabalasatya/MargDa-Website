import React from "react";
import Highcharts from "highcharts";
import "highcharts/highcharts-3d";
import HighchartsReact from "highcharts-react-official";
import { FaChartPie } from "react-icons/fa";

const ProgressMeter = () => {
  const pieChartOptions = {
    chart: { type: "pie" },
    title: { text: "Subject Percentage" },
    series: [
      {
        name: "Subjects",
        data: [
          { name: "Math", y: 40 },
          { name: "Science", y: 30 },
          { name: "English", y: 20 },
          { name: "History", y: 10 },
        ],
      },
    ],
  };

  const barChartOptions = {
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25,
      },
    },
    title: {
      text: "Marks vs Time",
    },
    xAxis: {
      categories: ["Time 1", "Time 2", "Time 3", "Time 4"],
    },
    yAxis: {
      title: {
        text: "Marks",
      },
    },
    series: [
      {
        name: "Marks",
        data: [45, 78, 92, 60],
        colorByPoint: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-10 min-h-screen">
      <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
        <FaChartPie /> Progress Meter
      </h2>

      <div className="mt-4 flex gap-4">
        <select className="p-2 border rounded-md">
          <option>Class/Exam (select)</option>
          <option>Class 10</option>
          <option>Class 12</option>
        </select>
        <span className="text-xl">+</span>
        <select className="p-2 border rounded-md">
          <option>Subject (select)</option>
          <option>Math</option>
          <option>Science</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded-md">
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
        <div className="bg-white p-4 shadow rounded-md" style={{ height: "400px" }}>
          <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ProgressMeter;