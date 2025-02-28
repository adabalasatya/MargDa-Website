import { useState, useEffect } from "react";
import {
  FaClock,
  FaQuestion,
  FaCalculator,
  FaHandPointDown,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GiveTest = () => {
  const navigate = useNavigate();
  const [lessonName, setLessonName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [studyInfo, setStudyInfo] = useState(null);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    const lessonName = sessionStorage.getItem("lessonName");
    const studyID = sessionStorage.getItem("studyID");
    if (studyID && !isNaN(studyID)) {
      setLessonName(lessonName);
      fetchStudyInfo(studyID);
    } else {
      navigate("/trainee-dashboard");
    }
  }, []);

  const fetchStudyInfo = async (studyID) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://margda.in:7000/api/cpp_training/trainee/get_study_info",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studyID: parseInt(studyID),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.Study) {
        setStudyInfo(data.Study);
      } else {
        setStudyInfo(null);
      }
    } catch (error) {
      console.error("Fetch MCQs Error:", error);
      // toast.error("MCQs not available for this lesson");

      setStudyInfo(null);
      // return navigate("/trainee-dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBeginTest = () => {
    sessionStorage.setItem("test_minutes", studyInfo.test_minutes);
    navigate("/begin-test");
  };

  // Render loading animation matching TrainingDashboard
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Main content after loading
  return (
    <div className="min-h-screen bg-light">
      <div className="container mx-auto px-4 py-2 mt-8">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <FaClock className="mr-2 text-blue-600" />
            Lesson MCQ Test
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
          <div className="mb-5">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-lg">
                <p>
                  Lesson:- <strong>{lessonName}</strong>
                </p>
              </div>
              <div className="text-lg text-right">
                <FaClock className="inline-block mb-1 mr-2" />
                <span>Time: {studyInfo.test_minutes} minutes</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={`Total Questions: ${studyInfo.test_mcq}`}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded-md px-3 py-2 w-full font-bold pl-10 bg-gray-100 cursor-not-allowed"
                />
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700">
                  <FaQuestion />
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={`Total Marks: ${studyInfo.marks_total}`}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded-md px-3 py-2 w-full font-bold pl-10 bg-gray-100 cursor-not-allowed"
                />
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700">
                  <FaCalculator />
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={`Right Marks: ${Number(studyInfo.marks_correct)}`}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded-md px-3 py-2 w-full font-bold text-green-600 pl-10 bg-gray-100 cursor-not-allowed"
                />
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-green-600">
                  <FaCheck />
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={`Wrong Marks: ${Number(studyInfo.marks_wrong)}`}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded-md px-3 py-2 w-full font-bold text-red-600 pl-10 bg-gray-100 cursor-not-allowed"
                />
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-600">
                  <FaTimes />
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg mb-2 flex items-center">
                <FaHandPointDown className="mr-2" />
                Important Instructions:
              </h3>
              <ul className="list-decimal pl-5">
                <li>
                  Your time countdown will begin as soon as you click the
                  'Begin' Test button.
                </li>
                <br />
                <li>
                  Your test will automatically end when the test time is over.
                </li>
                <br />
                <li>
                  During the test, you can move backwards and forward or jump to
                  any question you wish.
                </li>
                <br />
                <li>You can change the answers to your questions.</li>
                <br />
                <li>
                  If the browser window closes during the test, you can resume
                  the test with the same question.
                </li>
              </ul>
            </div>

            <button
              onClick={handleBeginTest}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Begin Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveTest;
