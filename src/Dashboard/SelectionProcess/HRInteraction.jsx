import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaExclamationTriangle,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";

const HRInteraction = () => {
  const { questionId } = useParams();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [programText, setProgramText] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    console.log("Initializing video call service...");

    // Set only the default question regardless of questionId
    setCurrentQuestion({
      id: 0,
      text: "Question Not Asked Yet.",
    });

    return () => console.log("Cleaning up video call service...");
  }, []);

  const toggleMicrophone = () => setIsMicOn(!isMicOn);
  const endCall = () => {
    setIsCallActive(false);
    console.log("Video call ended");
  };

  const sendProgramToHR = () => {
    if (programText.trim() === "") {
      alert("Please enter some code before sending!");
      return;
    }
    console.log("Sending program to HR:", programText);
    setProgramText("");
    alert("Program sent to HR successfully!");
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading question...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Left Side - Question Section */}
          <div className="lg:w-2/3 w-full flex">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 transition-all duration-300 flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
                Interview Question
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-inner">
                <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    #{currentQuestion.id}
                  </span>
                  Current Question
                </h3>
                <p className="text-gray-800 text-lg leading-relaxed">
                  {currentQuestion.text}
                </p>
              </div>

              {/* Program Text Box */}
              <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="text-gray-800 font-semibold text-sm mb-2">
                  Write Your Answer
                </h4>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm placeholder-gray-400 resize-y"
                  rows="6"
                  value={programText}
                  onChange={(e) => setProgramText(e.target.value)}
                  placeholder="Enter your answer here..."
                />
                <button
                  onClick={sendProgramToHR}
                  className="mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <FaPaperPlane size={16} />
                  Send to HR
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Video Call Section */}
          <div className="lg:w-1/3 w-full flex">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sticky top-8 flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Interview
              </h3>
              <div className="relative">
                <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-video ring-1 ring-gray-200 relative">
                  {isCallActive ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-white text-center animate-fade-in">
                        <FaVideo className="text-5xl mx-auto mb-3 opacity-80" />
                        <p className="font-medium">Google Meet Video Feed</p>
                        <p className="text-xs opacity-60">
                          (Simulated for demo)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <p className="text-white font-medium animate-fade-in">
                        Call Ended
                      </p>
                    </div>
                  )}
                  {isCallActive && (
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                      {isMicOn ? "Mic On" : "Mic Off"}
                    </div>
                  )}
                </div>

                {isCallActive && (
                  <div className="flex justify-center gap-6 mt-6">
                    <button
                      onClick={toggleMicrophone}
                      className={`p-4 rounded-full shadow-lg ${
                        isMicOn
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white transform hover:scale-105 transition-all duration-200`}
                      title={isMicOn ? "Mute" : "Unmute"}
                    >
                      {isMicOn ? (
                        <FaMicrophone size={22} />
                      ) : (
                        <FaMicrophoneSlash size={22} />
                      )}
                    </button>
                    <button
                      onClick={endCall}
                      className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                      title="End Call"
                    >
                      <FaPhone size={22} />
                    </button>
                  </div>
                )}
              </div>

              {isCallActive && (
                <div className="mt-6 bg-gray-50 p-4 rounded-xl text-sm text-gray-700">
                  <p className="flex justify-between mb-2">
                    <span>Meeting ID:</span>
                    <span className="font-medium text-gray-900">
                      123-456-789
                    </span>
                  </p>
                  <p className="flex justify-between mb-3">
                    <span>Passcode:</span>
                    <span className="font-medium text-gray-900">xyz789</span>
                  </p>
                  <a
                    href="https://meet.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center gap-1 justify-center"
                  >
                    Join in Google Meet
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              )}

              {/* Warning Section */}
              <div className="mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-start gap-3 animate-fade-in">
                <FaExclamationTriangle className="text-yellow-600 text-xl flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-yellow-800 font-semibold text-sm mb-1">
                    During Interview Warning
                  </h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>Ensure your microphone is on when speaking</li>
                    <li>Maintain eye contact with the camera</li>
                    <li>Speak clearly and at a moderate pace</li>
                    <li>Avoid background noise or distractions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 p-6 bg-white shadow-xl rounded-t-3xl border-t border-gray-100">
        <span className="font-medium">
          Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </footer>
    </div>
  );
};

export default HRInteraction;
