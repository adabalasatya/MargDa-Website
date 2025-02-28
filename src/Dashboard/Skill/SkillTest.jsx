import { useState } from "react";
import { FaBook, FaClock, FaCalculator, FaFileAlt } from "react-icons/fa";

const SkillTest = () => {
  const [selectedSkill, setSelectedSkill] = useState("");

  return (
    <div className="bg-gray-10 min-h-screen flex flex-col items-center justify-center pt-24 p-8">
      {/* Title Section */}
      <h2 className="text-4xl font-semibold flex items-center gap-3 mb-6">
        <FaBook className="text-blue-600 text-4xl" /> Skill Test
      </h2>

      <div className="bg-white shadow-lg rounded-xl w-full max-w-6xl p-10">
        {/* Skill Selection */}
        <div className="mb-6">
          <label className="flex items-center gap-3 text-xl font-medium">
            <FaBook className="text-blue-600 text-2xl" /> Skill
          </label>
          <select
            className="w-full p-4 mt-2 border rounded-lg text-lg"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option>Select Skill</option>
            <option>JavaScript</option>
            <option>Python</option>
            <option>React</option>
            <option>Data Science</option>
          </select>
        </div>

        {/* Input Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-6 gap-6 mb-8">
          {/* No. of Questions */}
          <div>
            <label className="flex items-center gap-3 text-lg font-medium">
              <FaFileAlt className="text-blue-600 text-2xl" /> No. of Questions:
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg text-lg mt-2 "
              placeholder="Enter number"
            />
          </div>

          {/* Time */}
          <div>
            <label className="flex items-center gap-3 text-lg font-medium">
              <FaClock className="text-blue-600 text-2xl" /> Time:
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg text-lg mt-2"
              placeholder="Enter time"
            />
          </div>

          {/* Total Marks */}
          <div>
            <label className="flex items-center gap-3 text-lg font-medium">
              <FaCalculator className="text-blue-600 text-2xl" /> Total Marks:
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg text-lg mt-2"
              placeholder="Enter marks"
            />
          </div>

          {/* Negative Marks */}
          <div>
            <label className="flex items-center gap-3 text-lg font-medium">
              <FaCalculator className="text-blue-600 text-2xl" /> Negative Marks:
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg text-lg mt-2 focus:ring focus:ring-blue-300"
              placeholder="Enter marks"
            />
          </div>
        </div>

        {/* Important Instructions */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Important Instructions:</h3>
          <ul className="list-decimal pl-6 space-y-2 text-gray-700 text-lg">
            <li>Your Time Countdown Will begin as soon as you click the 'Begin Test' Button.</li>
            <li>Your Time Countdown Will begin as soon as you click the 'Begin Test' Button.</li>
            <li>Your Time Countdown Will begin as soon as you click the 'Begin Test' Button.</li>
            <li>Your Time Countdown Will begin as soon as you click the 'Begin Test' Button.</li>
          </ul>
        </div>
      </div>

       
{/* Footer */}
<footer className="mt-4 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
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

export default SkillTest;
