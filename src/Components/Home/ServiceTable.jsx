import React from "react";
import {
  FaDatabase,
  FaComments,
  FaUsers,
  FaPhone,
  FaHandshake,
  FaTools,
} from "react-icons/fa";

const ServicesTable = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Centered Table with Animation */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row transform transition-all hover:scale-105 animate-fade-in-up">
          {/* Column 1: Left Side */}
          <div className="flex-1 p-6 md:p-8">
            {/* Digital Workplace */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center">
                <FaTools className="text-green-500 text-2xl mr-3 animate-bounce" />
                <h3 className="text-green-600 font-bold text-lg md:text-xl mb-0">
                  Digital Workplace
                </h3>
              </div>
              <p className="text-black-600 leading-relaxed mt-2 text-sm md:text-base">
                Verified data, communication, and tools.
              </p>
            </div>

            {/* Horizontal Line */}
            <hr className="border-t-2 border-gray-600 my-4" />

            {/* Verified Data as a Service */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center">
                <FaDatabase className="text-black-400 text-2xl mr-3 animate-bounce" />
                <h3 className="text-gray-800 font-bold text-lg md:text-xl mb-0">
                  Verified Data as a Service
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mt-2 text-sm md:text-base">
                Margdarshak offers millions of personally verified, need-based,
                curated data on Service/Solution providers. Data can be filtered
                by type, country, state, district, and pin code, depending on
                your requirements.
              </p>
            </div>

            {/* Unified Communication and Tools */}
            <div>
              <div className="flex items-center">
                <FaComments className="text-black-400 text-2xl mr-3 animate-bounce" />
                <h3 className="text-gray-800 font-bold text-lg md:text-xl mb-0">
                  Unified Communication and Tools
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mt-2 text-sm md:text-base">
                The Workplace is integrated with a unified communication system
                for Calls, Email, SMS, WhatsApp, or Virtual Meetings, with
                contact logs and task reminders. It also includes smart tools to
                manage various functions of your business.
              </p>
            </div>
          </div>

          {/* Vertical Line (Hidden on Smaller Screens) */}
          <div className="hidden md:block w-px bg-gray-600 my-8"></div>

          {/* Column 2: Right Side */}
          <div className="flex-1 p-6 md:p-8">
            {/* Advisors Network */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center">
                <FaUsers className="text-green-500 text-2xl mr-3 animate-bounce" />
                <h3 className="text-green-600 font-bold text-lg md:text-xl mb-0">
                  Advisors Network
                </h3>
              </div>
              <p className="text-black-600 leading-relaxed mt-2 text-sm md:text-base">
                Any need, quick solution.
              </p>
            </div>

            {/* Horizontal Line */}
            <hr className="border-t-2 border-gray-600 my-4" />

            {/* Ask for Help 24/7 */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center">
                <FaPhone className="text-black-400 text-2xl mr-3 animate-bounce" />
                <h3 className="text-gray-800 font-bold text-lg md:text-xl mb-0">
                  Ask for Help 24/7
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mt-2 text-sm md:text-base">
                A diverse community of fully vetted Advisors ready to provide
                quick service/solution, anytime, anywhere. You can connect with
                our Advisors without sharing each other’s numbers, and your
                discussion is confidential and safe.
              </p>
            </div>

            {/* One-Time Effort, Lifetime Stable Income */}
            <div>
              <div className="flex items-center">
                <FaHandshake className="text-black-400 text-2xl mr-3 animate-bounce" />
                <h3 className="text-gray-800 font-bold text-lg md:text-xl mb-0">
                  One-Time Effort, Lifetime Stable Income
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mt-2 text-sm md:text-base">
                Start earning by talking to people on the phone and providing
                service and solutions based on your knowledge and expertise. You
                can work from anywhere, flexibly anytime, without affecting your
                current activities for instant income.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Text Below Table with Animation */}
      <div className="mt-8 md:mt-12 text-center text-gray-700 text-base md:text-lg max-w-2xl mx-auto animate-fade-in-up delay-200">
        <p>
          Margdarshak can be your trusted associate in every step of your
          journey related to{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Education
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Work
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Business
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Finance
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Accommodation
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Health
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Matri
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Transportation
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Protection
          </span>
          , and{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            VMart
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ServicesTable;