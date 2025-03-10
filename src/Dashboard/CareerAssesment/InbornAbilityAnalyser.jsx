import React, { useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';

const InbornAbilityAnalyser = () => {
  const [leftPreview, setLeftPreview] = useState(null);
  const [rightPreview, setRightPreview] = useState(null);
  const [leftError, setLeftError] = useState('');
  const [rightError, setRightError] = useState('');

  // Handle file input and preview
  const handleFileChange = (event, side) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        if (side === 'left') {
          setLeftPreview(imageData); // Set left thumb preview
        } else if (side === 'right') {
          setRightPreview(imageData); // Set right thumb preview
        }
      };
      reader.readAsDataURL(file);

      // Validate file type
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.test(file.name)) {
        if (side === 'left') {
          setLeftError('* Only jpg, jpeg, png, gif are allowed');
        } else {
          setRightError('* Only jpg, jpeg, png, gif are allowed');
        }
      } else {
        if (side === 'left') setLeftError('');
        else setRightError('');
      }
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const leftFile = document.getElementById('leftfile').files[0];
    const rightFile = document.getElementById('rightfile').files[0];

    if (!leftFile || !rightFile) {
      if (!leftFile) setLeftError('* File is required');
      if (!rightFile) setRightError('* File is required');
      return;
    }

    // Form submission logic (e.g., API call)
    console.log('Form submitted:', { leftFile, rightFile });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          <div className="mb-3">
            <h2 className="text-2xl md:text-3xl font-bold py-5 flex items-center">
              <FaChalkboardTeacher className="mr-2" />
              Dermatoglyphics Multiple Intelligence
            </h2>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border border-blue-300">
            <h6 className="text-center text-lg font-semibold bg-yellow-100 py-4 rounded-tl-3xl rounded-br-3xl">
              Upload Finger Print
            </h6>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="mt-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Thumb */}
                <div>
                  <h4 className="text-xl font-semibold mb-2">Left Thumb</h4>
                  <label
                    htmlFor="leftfile"
                    className={`relative flex flex-col items-center justify-center h-48 p-5 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-800 ${
                      leftError ? 'border-red-500' : ''
                    }`}
                  >
                    <span className="text-lg font-bold text-gray-700">
                      Drop Your Left Thumb Image here
                    </span>
                    <span className="text-gray-600">or Click here to Browse</span>
                    <input
                      type="file"
                      id="leftfile"
                      accept="image/*"
                      name="leftThumb"
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                      onChange={(e) => handleFileChange(e, 'left')}
                    />
                  </label>
                  {leftPreview && (
                    <div className="mt-3">
                      <img
                        src={leftPreview}
                        alt="Preview Left Thumb"
                        className="w-full max-w-[450px] h-[300px] object-cover rounded-md ml-8"
                      />
                    </div>
                  )}
                  {leftError && (
                    <span className="text-red-500 text-sm block mt-1">{leftError}</span>
                  )}
                </div>

                {/* Right Thumb */}
                <div>
                  <h4 className="text-xl font-semibold mb-2">Right Thumb</h4>
                  <label
                    htmlFor="rightfile"
                    className={`relative flex flex-col items-center justify-center h-48 p-5 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-800 ${
                      rightError ? 'border-red-500' : ''
                    }`}
                  >
                    <span className="text-lg font-bold text-gray-700">
                      Drop Your Right Thumb Image here
                    </span>
                    <span className="text-gray-600">or Click here to Browse</span>
                    <input
                      type="file"
                      id="rightfile"
                      accept="image/*"
                      name="rightThumb"
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                      onChange={(e) => handleFileChange(e, 'right')}
                    />
                  </label>
                  {rightPreview && (
                    <div className="mt-3">
                      <img
                        src={rightPreview}
                        alt="Preview Right Thumb"
                        className="w-full max-w-[450px] h-[300px] object-cover rounded-md ml-8"
                      />
                    </div>
                  )}
                  {rightError && (
                    <span className="text-red-500 text-sm block mt-1">{rightError}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Copyright Footer */}
      <div className="text-center text-sm text-black-500 mt-6 p-4">
        <span>
          Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default InbornAbilityAnalyser;