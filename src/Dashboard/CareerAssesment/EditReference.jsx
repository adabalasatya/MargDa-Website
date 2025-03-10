import React, { useState, useEffect } from 'react';
import { FaUsers, FaUser, FaPhone, FaEnvelope, FaBook } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

// Mock data (replace with API call in a real app)
const getReferenceById = (id) => {
  const references = [
    {
      id: 1,
      service: 'Career Aptitude Assessment',
      reference: { name: 'shridhar shindhe', email: 'shridharshindhe28@gmail.com', phone: '8618465245' },
      referBy: { name: 'Prajwal Shivale', email: 'ambikahudedar.07@gmail.com', phone: '918904572307' },
      verified: true,
    },
    {
      id: 2,
      service: 'Career Aptitude Assessment',
      reference: { name: 'geeta shindhe', email: 'geetashindhe24@gmail.com', phone: '8197952307' },
      referBy: { name: 'Prajwal Shivale', email: 'ambikahudedar.07@gmail.com', phone: '918904572307' },
      verified: true,
    },
    {
      id: 3,
      service: 'Dermato Ability Analyser',
      reference: { name: 'bhoomika pai', email: 'bhoomikapai@28gmail.com', phone: '7259905314' },
      referBy: { name: 'Prajwal Shivale', email: 'ambikahudedar.07@gmail.com', phone: '918904572307' },
      verified: true,
    },
    {
      id: 4,
      service: 'Work Attitude Assessment',
      reference: { name: 'Ankita', email: 'Ankitas@gmai.com', phone: '839060433511' },
      referBy: { name: 'Prajwal Shivale', email: 'ambikahudedar.07@gmail.com', phone: '918904572307' },
      verified: false,
    },
  ];
  return references.find((ref) => ref.id === parseInt(id)) || null;
};

const EditReference = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    classExam: '',
  });

  // Load reference data when component mounts
  useEffect(() => {
    const reference = getReferenceById(id);
    if (reference) {
      setFormData({
        name: reference.reference.name || '',
        email: reference.reference.email || '',
        mobile: reference.reference.phone || '',
        classExam: '12', // Default value as per the image
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.mobile) {
      Swal.fire('Error!', 'Name and Mobile are required.', 'error');
      return;
    }
    // Placeholder for submission logic (e.g., API call)
    Swal.fire('Success!', 'Reference updated successfully.', 'success');
    console.log('Updated Reference:', formData);
    window.history.back(); // Navigate to the previous page
  };

  const handleBack = () => {
    window.history.back(); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Heading */}
      <header className="py-6 bg-white ">
        <div className="container mx-auto flex justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaUsers className="mr-3 text-blue-600" />
            Edit Student Reference
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 border border-blue-300 transition-all duration-300 hover:shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 flex items-center text-lg">
                    <FaUser className="mr-2 text-blue-600" />
                    Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-lg"
                    required
                  />
                </div>

                {/* Mobile Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 flex items-center text-lg">
                    <FaPhone className="mr-2 text-blue-600" />
                    Mobile <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-lg"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 flex items-center text-lg">
                    <FaEnvelope className="mr-2 text-blue-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-lg"
                  />
                </div>

                {/* Class/Exam Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 flex items-center text-lg">
                    <FaBook className="mr-2 text-blue-600" />
                    Class/Exam
                  </label>
                  <input
                    type="text"
                    name="classExam"
                    value={formData.classExam}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-lg"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-10">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg text-lg"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition duration-200 shadow-md hover:shadow-lg text-lg"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

        {/* Copyright Footer */}
        <div className="text-center text-sm text-gray-500 mt-2 p-2">
        <span>
          Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default EditReference;