import React from 'react';
import { FaCheck, FaQuestionCircle } from "react-icons/fa"; 

const WhyMargdarshakPage = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 md:px-6 py-12 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Content in the center */}
          <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center border-b-2 border-indigo-200 pb-2 flex items-center">
              Why Margdarshak 
              <FaQuestionCircle className="mr-4 ml-2 text-indigo-600" /> 
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {[
                "Expert advice from professionals",
                "Affordable and flexible pricing plans",
                "24/7 availability for support and solutions",
                "Secure and confidential services",
                "One-stop solution for multiple needs",
                "Personalised assistance",
                "Verified service providers"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start bg-gray-50 rounded-lg p-4 hover:bg-gray-200 transition-colors duration-300"
                >
                  <FaCheck className="text-green-600 text-xl md:text-2xl mr-3 mt-1" />
                  <p className="text-gray-800 text-base md:text-lg font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 text-base md:text-lg mt-10">
              Browse our services, and connect with trusted solution providers, just{" "}
              <span className="font-semibold text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors duration-200">
                Click to Call
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyMargdarshakPage;