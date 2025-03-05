import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const HRGiveTest = () => {
  const [questionStates, setQuestionStates] = useState({});
  const [remark, setRemark] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const dummyResponses = {
      setQuestion: { status: true },
      setQuesRank: { status: true },
      resetAsk: { status: true },
      submitInterview: { status: true },
    };
  }, []);

  const getAsk = (id) => {
    setQuestionStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isAsked: true },
    }));
  };

  const setRank = (quesID, val) => {
    setQuestionStates((prev) => ({
      ...prev,
      [quesID]: { ...prev[quesID], rank: val },
    }));
    setTimeout(() => {
      console.log(`Rank ${val} set for question ${quesID} (dummy response)`);
    }, 500);
  };

  const resetAsk = (quesID) => {
    setQuestionStates((prev) => ({
      ...prev,
      [quesID]: { isAsked: false, rank: "" },
    }));
    setTimeout(() => {
      console.log(`Question ${quesID} reset (dummy response)`);
    }, 500);
  };

  const handleSubmit = () => {
    const askedCount = Object.values(questionStates).filter(
      (q) => q?.isAsked
    ).length;

    if (askedCount <= 1) {
      console.log("Please ask at least one Question!");
    } else if (remark.trim().length === 0) {
      console.log("Please enter remarks");
    } else if (result.trim().length === 0) {
      console.log("Please select result");
    } else {
      setTimeout(() => {
        console.log("Submitted (dummy response)!");
        console.log("Redirecting to dashboard (simulated)");
      }, 1000);
    }
  };

  const questions = [
    {
      id: 1,
      text: "Describe yourself in three words and then introduce yourself",
    },
    {
      id: 2,
      text: "What is something people assume about you that is incorrect?",
    },
    {
      id: 3,
      text: "If you could change one thing about your personality, what is this?",
    },
    { id: 4, text: "What critical feedback do you most often receive?" },
    { id: 5, text: "What is the difference between education and career?" },
    { id: 6, text: "Who has inspired you in your life and why?" },
    {
      id: 7,
      text: "People are not willing to spare 40 minutes to manage their career, but they are ready to struggle for 40 years in their working lives - comment.",
    },
    { id: 8, text: "What do you mean by 'Career'?" },
    { id: 9, text: "What is contingent hiring?" },
  ];

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12 w-full">
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-300">
            <h5 className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 text-3xl font-bold tracking-tight">
              HR Interview Questions
            </h5>
            <div className="p-6 md:p-10">
              <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-blue-300 shadow-sm mb-10">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-blue-600 text-white text-left">
                        <th className="px-4 py-3 font-semibold w-16">S_No.</th>
                        <th className="px-4 py-3 font-semibold">Question</th>
                        <th className="px-4 py-3 font-semibold w-24 text-center">
                          Action
                        </th>
                        <th className="px-4 py-3 font-semibold w-36 text-center">
                          Reset
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((question) => (
                        <tr
                          key={question.id}
                          className="border-b hover:bg-gray-100 transition-colors duration-200"
                        >
                          <td className="px-4 py-3 align-middle font-medium text-gray-700">
                            {question.id}.
                          </td>
                          <td className="px-4 py-3 align-middle text-gray-800">
                            {question.text}
                          </td>
                          <td className="px-4 py-3 align-middle w-24 text-center">
                            {!questionStates[question.id]?.isAsked ? (
                              <button
                                onClick={() => getAsk(question.id)}
                                className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer py-2 px-3 rounded-lg text-sm font-medium text-center block shadow-md"
                              >
                                Ask
                              </button>
                            ) : (
                              <select
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm"
                                value={questionStates[question.id]?.rank || ""}
                                onChange={(e) =>
                                  setRank(question.id, e.target.value)
                                }
                              >
                                <option value="">Rank</option>
                                {[...Array(10)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            )}
                          </td>
                          <td className="px-4 py-3 align-middle w-36 text-center">
                            <button
                              onClick={() => resetAsk(question.id)}
                              className="w-full bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200 cursor-pointer py-2 px-3 rounded-lg text-sm font-medium text-center block shadow-md"
                            >
                              Reset Ask
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-center w-full">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-l-lg border border-r-0 border-gray-300 flex-shrink-0">
                      <FaPencilAlt className="text-gray-600 text-lg" />
                    </span>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-r-lg bg-white text-gray-700 shadow-sm placeholder-gray-400"
                      type="text"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      placeholder="Enter your remarks here..."
                    />
                  </div>
                  <div className="w-full">
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm"
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                    >
                      <option value="">Select Result</option>
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                      <option value="P">Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-lg font-semibold shadow-lg"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-600 p-2 bg-white shadow-lg rounded-t-3xl mt-0">
        <span>
          Margdarshak © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </footer>
    </div>
  );
};

export default HRGiveTest;
