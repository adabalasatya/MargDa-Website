import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Clock from "../../assets/clock-test.webp";

const CommunicationTest = () => {
  const [remainingTime, setRemainingTime] = useState(760); // 12 minutes 40 seconds
  const [hidden, setHidden] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          setHidden(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime < 60 && remainingTime >= 0) {
      const alert = document.getElementById('alert');
      if (alert) {
        alert.style.display = 'block';
        alert.textContent = `You will not be able to write an answer after ${remainingTime} seconds`;
      }
    }
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isFormValid = true;
    const answer = document.getElementById('answer')?.value || '';
    const fileInput = document.getElementById('file');
    const ansDiv = document.getElementById('ansDiv');

    const validateFileType = () => {
      const files = fileInput?.files;
      if (!files || files.length === 0) return false;
      const allowedExtensionsRegx = /(\.mp4)$/i;
      return allowedExtensionsRegx.test(files[0].name);
    };

    const validateFileSize = () => {
      const files = fileInput?.files;
      if (!files || files.length === 0) return false;
      const sizeInMb = files[0].size / (1024 * 1024);
      return sizeInMb <= 30;
    };

    if (!validateFileType()) {
      isFormValid = false;
      Swal.fire("", "File is required, Only (.mp4) are allowed!", "warning");
      document.getElementById("dropcontainer")?.style.setProperty("border", "1px solid red");
    } else {
      document.getElementById("dropcontainer")?.style.setProperty("border", "2px dashed #4B5563");
    }

    if (!validateFileSize()) {
      isFormValid = false;
      Swal.fire("", "Maximum File Size: 30 MB!", "warning");
      document.getElementById("dropcontainer")?.style.setProperty("border", "1px solid red");
    }

    if (answer.trim().length === 0 && !hidden) {
      isFormValid = false;
      Swal.fire("", "Answer is Mandatory!", "warning");
      ansDiv?.style.setProperty("border", "1px solid red");
    } else {
      ansDiv?.style.setProperty("border", "");
    }

    if (isFormValid) {
      Swal.fire({
        text: 'Please wait while we process your test submission!',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Test submitted successfully (dummy response)',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }, 2000);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const preview = document.getElementById('previewFileName');
      if (preview) {
        preview.style.display = 'block';
        preview.textContent = 'video: ' + file.name;
      }
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <h5 className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 text-2xl font-semibold">
              Communication Skills Test
            </h5>
            <div className="p-8 border border-blue-300">
              <div className="bg-gray-100 p-8 rounded-xl border border-gray-300 mb-8">
                <div className="hidden bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6" id="alert" role="alert"></div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium text-gray-800 flex-1">
                    What is the root cause of attrition? Explain from employees and employers points of view.
                  </div>
                  <div 
                    className="ml-6" 
                    id="showTimer" 
                    style={{ display: hidden ? 'none' : 'block' }}
                  >
                    <div className="relative">
                      <img 
                        src={Clock} 
                        alt="Timer" 
                        className="w-24 h-32"
                      />
                      <p 
                        ref={timerRef}
                        className="absolute top-[45%] left-1/2 transform -translate-x-1/2 font-mono text-2xl font-bold text-blue-700"
                      >
                        {formatTime(remainingTime)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form id="hireTestForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="space-y-10">
                  <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                      <label 
                        htmlFor="file" 
                        className="flex flex-col items-center justify-center h-64 p-8 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200"
                        id="dropcontainer"
                      >
                        <span className="text-2xl font-semibold text-gray-700 mb-3">Drop Your Video Here</span>
                        <span className="text-gray-500 text-lg">or Click to Browse (MP4 only, max 30MB)</span>
                        <input 
                          type="file" 
                          className="hidden"
                          id="file" 
                          name="fileupload" 
                          onChange={handleFileChange}
                          accept="video/mp4"
                        />
                      </label>
                      <span className="text-red-500 text-sm block mt-3" id="file_error"></span>
                      <h3 id="previewFileName" className="mt-4 text-center text-gray-600 font-medium text-lg"></h3>
                    </div>
                  </div>

                  <div id="ansDiv" style={{ display: hidden ? 'none' : 'block' }}>
                    <label htmlFor="answer" className="block text-xl font-semibold text-gray-800 mb-4">
                     * Your Answer *
                    </label>
                    <textarea 
                      name="answer" 
                      id="answer" 
                      className="w-full h-64 p-6 border border-gray-300 rounded-xl resize-y shadow-sm transition-all duration-200"
                      placeholder="Enter your detailed response here..."
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <input 
                      type="submit" 
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium text-lg shadow-md"
                      value="Submit Assessment"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Copyright Footer */}
      <div className="text-center text-sm text-black-500 mt-0 p-4">
        <span>Margdarshak © {new Date().getFullYear()}. All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default CommunicationTest;