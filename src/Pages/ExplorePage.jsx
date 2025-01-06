import React from 'react';
import { FaBook, FaBriefcase, FaBuilding, FaRupeeSign , FaUsers, FaHome, FaHeart, FaPlane, FaShieldAlt, FaStore, FaDatabase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const navigate = useNavigate();

  const handleDataClick = () => {
    navigate('/data'); // This will navigate to the /data route
  };

  const sections = [
    { name: 'Education', icon: <FaBook className="text-red-500" />, bgColor: 'bg-gray-100' },
    { name: 'Work', icon: <FaBriefcase className="text-green-500" />, bgColor: 'bg-gray-100' },
    { name: 'Business', icon: <FaBuilding className="text-blue-500" />, bgColor: 'bg-gray-100' },
    { name: 'Finance', icon: <FaRupeeSign className="text-yellow-500" />, bgColor: 'bg-gray-100' },
    { name: 'Accommodation', icon: <FaHome className="text-purple-500" />, bgColor: 'bg-gray-100', smallText: true },
    { name: 'Health', icon: <FaHeart className="text-pink-500" />, bgColor: 'bg-gray-100' },
    { name: 'Matri', icon: <FaUsers className="text-indigo-500" />, bgColor: 'bg-gray-100' },
    { name: 'Travel', icon: <FaPlane className="text-teal-500" />, bgColor: 'bg-gray-100' },
    { name: 'Protection', icon: <FaShieldAlt className="text-gray-500" />, bgColor: 'bg-gray-100' },
    { name: 'Mart', icon: <FaStore className="text-orange-500" />, bgColor: 'bg-gray-100' },
    { name: 'Data', icon: <FaDatabase className="text-cyan-500" />, bgColor: 'bg-gray-100', onClick: handleDataClick }
  ];

  return (
    <div className="font-sans p-8 bg-white min-h-screen">
      {/* Header with enhanced styling */}
      <header className="text-center mb-12 space-y-4">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Explore
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover services and categories tailored for you
        </p>
      </header>

      {/* Enhanced Sections Grid */}
      <div className="max-w-xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {sections.map((section, index) => (
            <div
              key={index}
              onClick={section.onClick}
              className={`group relative flex flex-col items-center justify-center ${section.bgColor} 
                         w-full max-w-xs aspect-square rounded-3xl shadow-sm 
                         hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                         cursor-pointer overflow-hidden ${section.name === 'Data' ? 'hover:bg-cyan-100' : ''}`}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon with enhanced animation */}
              <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {section.icon}
              </div>
              
              {/* Text with conditional sizing */}
              <h3 className={`text-center font-bold text-gray-800 
                            ${section.smallText ? 'text-sm' : 'text-lg'}
                            group-hover:text-gray-900 transition-colors duration-300`}>
                {section.name}
              </h3>

              {/* Subtle interaction hint */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-gray-500">
                  {section.name === 'Data' ? 'Click to view data' : 'Click to explore'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="mt-16 text-center">
        <div className="max-w-4xl mx-auto border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">
            &copy; 2025 Explore Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Explore;