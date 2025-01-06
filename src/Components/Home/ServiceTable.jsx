import React from "react";
import { FaDatabase, FaComments } from "react-icons/fa";

const ServicesTable = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Centered Table with Animation */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden w-full max-w-4xl h-74 flex transform transition-all hover:scale-105 animate-fade-in-up">
          {/* Column 1: Verified Data as a Service */}
          <div className="flex-1 p-8">
            <div className="flex items-center mb-6">
              <FaDatabase className="text-orange-500 text-2xl mr-3 animate-bounce" />
              <h3 className="text-gray-800 font-bold text-xl">Verified Data as a Service</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Margdarshak offers millions of personally verified, need-based, curated data on Service/Solution providers.
            </p>
            <br />
            <p className="text-gray-600 leading-relaxed">
              Data can be filtered by country, state, district, PIN, and place per your instant requirements.
            </p>
          </div>

          {/* Vertical Line */}
          <div className="w-px bg-gray-200 my-8"></div>

          {/* Column 2: Unified Communication CRM */}
          <div className="flex-1 p-8">
            <div className="flex items-center mb-6">
              <FaComments className="text-orange-500 text-2xl mr-3 animate-bounce" />
              <h3 className="text-gray-800 font-bold text-xl">Unified Communication CRM</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
            CRM with Unified secured communication system to to Call, Email, SMS, WhatsApp, or Meet virtually.  
            </p>
            <br />
            <p className="text-gray-600 leading-relaxed">
            CRM is integrated with smart innovative tools to manage various functions of your business. Also, it includes maintaining logs and task reminders.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Text Below Table with Animation */}
      <div className="mt-12 text-center text-gray-700 text-lg max-w-2xl mx-auto animate-fade-in-up delay-200">
        <p>
          Let Margdarshak be your trusted companion in every step of your journey related to{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Education</span>,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Work</span>,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Business</span>,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Finance</span>,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Accommodation</span>,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Health</span>,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Matri</span>,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Travel</span>,{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Protection</span>, and{" "}
          <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">Mart</span>.
        </p>
      </div>
    </div>
  );
};

export default ServicesTable;