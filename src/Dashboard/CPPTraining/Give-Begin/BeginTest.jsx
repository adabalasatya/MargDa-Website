import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Clock from "../../../assets/clock-test.webp";
import { toast } from "react-toastify";

const BeginTest = () => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestionCount, setCurrentQuestionCount] = useState(1);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [answers, setAnswers] = useState([]);
  const [stopWatch, setStopWatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Initial page load
  const [MCQs, setMCQs] = useState([]);
  const [lessonName, setLessonName] = useState("");
  const [lessonID, setLessonID] = useState("");
  const [resultID, setResultID] = useState(0);
  const [totalTestMinutes, setTotalTestMinutes] = useState(0);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    const lessonID = sessionStorage.getItem("lessonID");
    const lessonName = sessionStorage.getItem("lessonName");
    const testMinutes = sessionStorage.getItem("test_minutes");
    const fetchRemainingTime = localStorage.getItem("remaining-time");
    if (lessonID && !isNaN(lessonID) && testMinutes && !isNaN(testMinutes)) {
      if (fetchRemainingTime && JSON.parse(fetchRemainingTime)) {
        const parse = JSON.parse(fetchRemainingTime);
        if (parse.lessonName && parse.lessonName == lessonName) {
          setTimer(parse.timer);
        } else {
          setTimer({ minutes: testMinutes, seconds: 0 });
        }
      } else {
        setTimer({ minutes: testMinutes, seconds: 0 });
      }
      setLessonName(lessonName);
      setTotalTestMinutes(testMinutes);
      setLessonID(lessonID);
      fetchMcqs(lessonID);
      startTest(lessonID);
    } else {
      navigate("/trainee-dashboard");
    }
  }, [accessToken]);

  const startTest = async (lessonID) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/cpp_training/trainee/test/start_test",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lessonID }),
        }
      );
      const data = await response.json();
      if (response.ok && data.data) {
        setResultID(data.data.resultID);
        const answers = data.Answers;
        if (answers && Array.isArray(answers) && answers.length > 0) {
          setAnswers(answers);
        }
      } else {
        toast.error("Unable to Start Test");
        return navigate("/trainee-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMcqs = async (lessonID) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://margda.in:7000/api/cpp_training/trainee/test/fetch_mcqs",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonID: parseInt(lessonID),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.MCQ && Array.isArray(data.MCQ)) {
        const allMcqs = data.MCQ;
        setTotalQuestions(allMcqs.length);
        setCurrentQuestion(allMcqs[0]);
        setMCQs(allMcqs);
      } else {
        setMCQs([]);
      }
    } catch (error) {
      console.error("Fetch MCQs Error:", error);
      setMCQs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAnswer = async (mcqID, answer, ans_seconds) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/cpp_training/trainee/test/update_answer",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resultID, mcqID, answer, ans_seconds }),
        }
      );
      await response.json();
      if (!response.ok) {
        toast.error("Unknown Error in Test, Please Try Again Later");
        return navigate("/trainee-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStopWatch((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(interval);
            localStorage.removeItem("remaining-time");
            handleTimeUp();
            return prev;
          }

          localStorage.setItem(
            "remaining-time",
            JSON.stringify({ lessonName: lessonName, timer: prev })
          );
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        localStorage.setItem(
          "remaining-time",
          JSON.stringify({ lessonName: lessonName, timer: prev })
        );
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lessonName]);

  const handleTimeUp = () => {
    handleSubmitTest();
  };

  const handleNav = (direction) => {
    if (direction === "next" && currentQuestionCount < totalQuestions) {
      const currentQuestionNumber = currentQuestionCount;
      setCurrentQuestion(MCQs[currentQuestionNumber]);
      setCurrentQuestionCount(currentQuestionNumber + 1);
    } else if (direction === "prev" && currentQuestionCount > 1) {
      const currentQuestionNumber = currentQuestionCount;
      setCurrentQuestion(MCQs[currentQuestionNumber - 2]);
      setCurrentQuestionCount(currentQuestionNumber - 1);
    }
    setStopWatch(0);
  };

  const handleSubmitTest = async () => {
    console.log(answers);
    const timeRemaingInSeconds = timer.minutes * 60 + timer.seconds;
    const timetaken = totalTestMinutes * 60 - timeRemaingInSeconds;
    try {
      const response = await fetch(
        "https://margda.in:7000/api/cpp_training/trainee/test/submit_result",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resultID,
            lessonID,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
    navigate("/result", {
      state: {
        resultID: resultID,
      },
    });
  };

  const handleAnswerSelect = async (checked, mcqID, answer) => {
    const find = answers.find((answer) => answer.mcqID == mcqID);
    if (checked) {
      if (find) {
        const removeCurrentQuestion = answers.filter(
          (answer) => answer.mcqID != mcqID
        );
        setAnswers([
          ...removeCurrentQuestion,
          {
            mcqID,
            answer,
            ans_seconds: Number(find.ans_seconds) + Number(stopWatch),
          },
        ]);
        await updateAnswer(
          mcqID,
          answer,
          Number(find.ans_seconds) + Number(stopWatch)
        );
      } else {
        setAnswers((pre) => [
          ...pre,
          { mcqID, answer, ans_seconds: stopWatch },
        ]);
        await updateAnswer(mcqID, answer, stopWatch);
      }
    } else {
      const removeCurrentQuestion = answers.filter(
        (answer) => answer.mcqID != mcqID
      );
      setAnswers([
        ...removeCurrentQuestion,
        {
          mcqID,
          answer: null,
          ans_seconds: Number(find.ans_seconds) + Number(stopWatch),
        },
      ]);
      // setAnswers(removeCurrentQuestion);
      await updateAnswer(mcqID, null, stopWatch);
    }
  };

  const handleQuestionClickFromProgress = (index) => {
    setCurrentQuestionCount(index + 1);
    setCurrentQuestion(MCQs[index]);
  };

  // Initial page loading
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6 relative">
      {/* Question transition loading */}

      {MCQs && Array.isArray(MCQs) && MCQs.length > 0 ? (
        <div className="px-1 mx-auto bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Lesson: {lessonName || "N/A"}
                </h1>
                <p className="text-blue-100 mt-1">
                  Question {currentQuestionCount} of {totalQuestions}
                </p>
              </div>
              <div className="relative w-28 h-28 animate-pulse">
                <img
                  src={Clock}
                  alt="Clock"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-mono text-xl font-semibold drop-shadow-md">
                    {String(timer.minutes).padStart(2, "0")}:
                    {String(timer.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-8 gap-8">
            {currentQuestion ? (
              <div className="flex-1">
                <div className="animate-fade-in">
                  <p className="text-xl font-medium text-gray-800 mb-6 leading-relaxed">
                    Q{currentQuestionCount}: {currentQuestion.question}
                  </p>
                  <div className="space-y-4">
                    {currentQuestion.option1 && (
                      <label
                        key={1}
                        className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer border-2 transform transition-all duration-200 hover:scale-[1.02] ${
                          answers.find(
                            (answer) =>
                              answer.mcqID == currentQuestion.mcqID &&
                              answer.answer == "A"
                          )
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="answer"
                          value="A"
                          checked={
                            answers.find(
                              (answer) =>
                                answer.mcqID == currentQuestion.mcqID &&
                                answer.answer == "A"
                            )
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleAnswerSelect(
                              e.target.checked,
                              currentQuestion.mcqID,
                              "A"
                            )
                          }
                          className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-lg text-gray-800 font-medium">
                          {1}. {currentQuestion.option1}
                        </span>
                      </label>
                    )}
                    {currentQuestion.option2 && (
                      <label
                        key={2}
                        className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer border-2 transform transition-all duration-200 hover:scale-[1.02] ${
                          answers.find(
                            (answer) =>
                              answer.mcqID == currentQuestion.mcqID &&
                              answer.answer == "B"
                          )
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="answer"
                          value="B"
                          checked={
                            answers.find(
                              (answer) =>
                                answer.mcqID == currentQuestion.mcqID &&
                                answer.answer == "B"
                            )
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleAnswerSelect(
                              e.target.checked,
                              currentQuestion.mcqID,
                              "B"
                            )
                          }
                          className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-lg text-gray-800 font-medium">
                          {2}. {currentQuestion.option2}
                        </span>
                      </label>
                    )}
                    {currentQuestion.option3 && (
                      <label
                        key={3}
                        className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer border-2 transform transition-all duration-200 hover:scale-[1.02] ${
                          answers.find(
                            (answer) =>
                              answer.mcqID == currentQuestion.mcqID &&
                              answer.answer == "C"
                          )
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="answer"
                          value="C"
                          checked={
                            answers.find(
                              (answer) =>
                                answer.mcqID == currentQuestion.mcqID &&
                                answer.answer == "C"
                            )
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleAnswerSelect(
                              e.target.checked,
                              currentQuestion.mcqID,
                              "C"
                            )
                          }
                          className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-lg text-gray-800 font-medium">
                          3. {currentQuestion.option3}
                        </span>
                      </label>
                    )}
                    {currentQuestion.option4 && (
                      <label
                        key={4}
                        className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer border-2 transform transition-all duration-200 hover:scale-[1.02] ${
                          answers.find(
                            (answer) =>
                              answer.mcqID == currentQuestion.mcqID &&
                              answer.answer == "D"
                          )
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="answer"
                          value="D"
                          checked={
                            answers.find(
                              (answer) =>
                                answer.mcqID == currentQuestion.mcqID &&
                                answer.answer == "D"
                            )
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleAnswerSelect(
                              e.target.checked,
                              currentQuestion.mcqID,
                              "D"
                            )
                          }
                          className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-lg text-gray-800 font-medium">
                          {4}. {currentQuestion.option4}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex justify-center space-x-6 mt-12">
                  <button
                    onClick={() => handleNav("prev")}
                    className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-md"
                    disabled={currentQuestionCount === 1}
                  >
                    {"<< Previous"}
                  </button>

                  <button
                    onClick={() => {
                      if (currentQuestionCount < totalQuestions) {
                        handleNav("next");
                      } else {
                        handleSubmitTest();
                      }
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105 shadow-md"
                  >
                    {currentQuestionCount < totalQuestions
                      ? "Next >>"
                      : "Submit Test"}
                  </button>
                </div>
              </div>
            ) : (
              <div>Unable to get Question, Please Try Again Later</div>
            )}

            <div className="w-72 border-l border-gray-200 pl-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center tracking-tight">
                Your Progress
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {MCQs.map((mcq, i) => (
                  <div
                    key={i + 1}
                    className={`relative flex items-center justify-center
                    border-2 rounded-lg p-3 cursor-pointer transition-all duration-200
                    ${
                      answers.find(
                        (answer) =>
                          answer.mcqID == mcq.mcqID && answer.answer != null
                      )
                        ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }
                    ${
                      currentQuestionCount === i + 1 &&
                      "ring-2 ring-blue-400 ring-opacity-75"
                    }
                    hover:scale-105`}
                    onClick={() => handleQuestionClickFromProgress(i)}
                  >
                    <span className="font-medium">{i + 1}</span>
                    {answers.find(
                      (answer) =>
                        answer.mcqID == mcq.mcqID && answer.answer != null
                    ) && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-8 flex-col items-center justify-center bg-white text-xl ">
          <div className="mt-8 rounded shadow p-4 border border-gray-300">
            MCQs Not Available for this Lesson
          </div>
          <Link
            className="bg-blue-500 rounded px-2 py-1 text-white"
            to={"/trainee-dashboard"}
          >
            Back
          </Link>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BeginTest;
