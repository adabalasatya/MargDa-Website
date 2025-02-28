import React, { useEffect, useState } from "react";
import AppImage from "../../../assets/app.png";
import PlayStore from "../../../assets/playstore.png";
import Get from "../../../assets/Get.png";

const DownloadAppPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const appImage = document.querySelector(".app-image");
    if (appImage) {
      appImage.style.opacity = "0";
      appImage.style.transform = "translateY(20px)";
      setTimeout(() => {
        appImage.style.transition = "all 0.8s ease";
        appImage.style.opacity = "1";
        appImage.style.transform = "translateY(0)";
      }, 100);
    }

    const title = document.querySelector(".page-title");
    if (title) {
      title.style.opacity = "0";
      title.style.transform = "translateX(-20px)";
      setTimeout(() => {
        title.style.transition = "all 0.8s ease";
        title.style.opacity = "1";
        title.style.transform = "translateX(0)";
      }, 200);
    }

    const buttons = document.querySelectorAll(".download-button");
    buttons.forEach((button, index) => {
      button.style.opacity = "0";
      button.style.transform = "translateY(20px)";
      setTimeout(() => {
        button.style.transition = "all 0.8s ease";
        button.style.opacity = "1";
        button.style.transform = "translateY(0)";
      }, 400 + index * 100);
    });
  }, []);

  const steps = [
    {
      title: "Disable Play Protect",
      description: "First, you need to disable Google Play Protect to install apps from outside the Play Store",
      substeps: [
        "Open Google Play Store on your Android device",
        "Tap on your profile picture in the top right corner",
        "Select 'Play Protect' from the menu",
        "Tap the settings icon (gear) in the top right corner",
        "Toggle off 'Scan apps with Play Protect'"
      ]
    },
    {
      title: "Download the APK",
      description: "Download the Margdarshak APK file to your device",
      substeps: [
        "Click the 'Download Full Version APK Here' button on our website",
        "Wait for the download to complete"
      ]
    },
    {
      title: "Install the APK",
      description: "Install the downloaded APK file",
      substeps: [
        "Tap on the downloaded APK file in your notification panel or file manager",
        "Tap 'Install' when prompted",
        "If asked to allow installation from unknown sources, tap 'Settings' and enable 'Allow from this source'",
        "Return to the installation and tap 'Install' again",
        "Wait for the installation to complete and tap 'Open' to launch Margdarshak"
      ]
    },
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-80 flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white shadow-2xl border border-gray-300 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-black page-title">
              Margdarshak
              <span className="block text-lg md:text-xl mt-2 font-normal text-gray-600">
                One life :: Make it :: The best
              </span>
            </h1>
            <p className="text-gray-700 mt-4 text-lg leading-relaxed">
              Discover the power of Margdarshak with expert advice, tailored solutions, and continuous support to navigate life's challenges and reach your goals. Download now for a better tomorrow!
            </p>

            <div className="flex flex-col md:flex-row mt-24 space-y-4 md:space-y-0 md:space-x-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.margdarshakendra.margdarshak"
                target="_blank"
                rel="noopener noreferrer"
                className="download-button flex items-center justify-center bg-black text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
              >
                <img src={PlayStore} alt="Get it on Google Play" className="h-8 mr-2" />
                <span className="font-semibold">Get Lite Version on Playstore</span>
              </a>
              <a
                href="https://margda.com/margdarshak_apk/margdarshak.apk"
                download
                className="download-button flex items-center justify-center bg-black text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-300"
              >
                <img src={Get} alt="Download APK Here" className="h-8 mr-2" />
                <span className="font-semibold">Download Full Version APK Here</span>
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src={AppImage}
                alt="Explore Section"
                className="w-full max-w-xs rounded-2xl shadow-xl transform transition-transform hover:scale-105 app-image"
              />
              <div className="absolute rounded-tl-xl p-2 shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Added Arrow and Installing Guide Section */}
      <div className="mt-12 mb-8 flex flex-col items-center">
        <div className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Installing Guide
        </div>
        <div className="mt-4 animate-bounce">
          <svg 
            className="w-12 h-12 text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Installing APK */}
      <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl shadow-lg  border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">How to Install Margdarshak APK</h1>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div className={`rounded-full flex items-center justify-center w-10 h-10 ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {index + 1}
                </div>
                <span className="text-xs mt-2 text-center hidden md:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Step {currentStep + 1}: {steps[currentStep].title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">{steps[currentStep].description}</p>
          
          <ol className="ml-6 space-y-4">
            {steps[currentStep].substeps.map((substep, index) => (
              <li key={index} className="text-gray-700 flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-3 text-sm">
                  {index + 1}
                </span>
                {substep}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex justify-between">
          <button 
            onClick={goToPreviousStep} 
            className={`px-6 py-3 rounded-lg font-medium ${currentStep === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          
          <button 
            onClick={goToNextStep} 
            className={`px-6 py-3 rounded-lg font-medium ${currentStep === steps.length - 1 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-800">Important Note</h3>
          <p className="text-yellow-700 mt-2">
            Installing apps from outside the Google Play Store may pose security risks. Only download the APK from our official website at <span className="font-bold text-black">margda.com</span>. 
          </p>
        </div>
      </div>
      <footer className="mt-8 text-gray-600 text-sm text-center">
          <p>© {new Date().getFullYear()} Margdarshak Media. All Rights Reserved.</p>
        </footer>
    </div>
  );
};

export default DownloadAppPage;