import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Attitude = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [resultID, setResultID] = useState("");
  const [answers, setAnswers] = useState([[]]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [quesOrder, setQuesOrder] = useState([]);
  const questionsPerPage = 5;

  const navigate = useNavigate();

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const resultID = localStorage.getItem("resultID");
  const euserID = localStorage.getItem("euserID");

  useEffect(() => {
    // save_result();
    fetchQuestions();
  }, []);

  // const save_result = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://margda.in:7000/api/career/attitude/save-result",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     if (response.ok) {
  //       const resultID = data.data.resultID;
  //       setResultID(resultID);
  //     } else {
  //       toast.error("Unable to start test");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Unable to start test");
  //   }
  // };

  const updateAnswer = async (
    qorderID,
    qpref1,
    qpref2,
    qpref3,
    qpref4,
    qpref5
  ) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/attitude/update-answer",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resultID,
            qorderID,
            qpref1,
            qpref2,
            qpref3,
            qpref4,
            qpref5,
            euser: euserID,
          }),
        }
      );
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/attitude/questions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (response.ok) {
        const allQuestions = result.data.map((q) => ({
          id: q.questID,
          text: q.attiquest,
          rank: "?",
          attID: q.attID,
        }));
        setAllQuestions(allQuestions);
        const order = result.order;
        order.sort((a, b) => a.qorderID - b.qorderID);
        const current = [
          allQuestions.find((ques) => ques.id === order[0]?.option1) || {},
          allQuestions.find((ques) => ques.id === order[0]?.option2) || {},
          allQuestions.find((ques) => ques.id === order[0]?.option3) || {},
          allQuestions.find((ques) => ques.id === order[0]?.option4) || {},
          allQuestions.find((ques) => ques.id === order[0]?.option5) || {},
        ];
        setCurrentQuestions(current);
        setQuesOrder(order);
        setTotalPages(result.order.length);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const ranking = (id) => {
    const currentIndex = currentQuestions.findIndex((q) => q.id === id);
    const currentQuestion = currentQuestions[currentIndex];

    if (!currentQuestion) return;

    // If the question is already ranked, remove it and adjust ranks
    if (currentQuestion.rank !== "?") {
      const removedRank = currentQuestion.rank;

      // Remove rank and update positions
      const updatedQuestions = currentQuestions.map((q) =>
        q.id === id ? { ...q, rank: "?" } : q
      );

      // Adjust ranks of remaining questions
      updatedQuestions.forEach((q) => {
        if (q.rank !== "?" && q.rank > removedRank) {
          q.rank -= 1; // Shift rank up
        }
      });
      const sortedArr = updatedQuestions.sort((a, b) => {
        if (a.rank === "?") return 1; // Move items with "?" to the end
        if (b.rank === "?") return -1;
        return a.rank - b.rank; // Sort by rank normally
      });

      setCurrentQuestions(sortedArr);
    } else {
      // Assign next available rank
      const usedRanks = currentQuestions
        .map((q) => q.rank)
        .filter((r) => r !== "?")
        .map(Number)
        .sort((a, b) => a - b);

      let newRank = 1;
      while (usedRanks.includes(newRank)) {
        newRank++;
      }

      // setCurrentQuestions(
      //   currentQuestions.map((q) => (q.id === id ? { ...q, rank: newRank } : q))
      // );

      const update = currentQuestions.map((q) =>
        q.id === id ? { ...q, rank: newRank } : q
      );

      const sortedArr = update.sort((a, b) => {
        if (a.rank === "?") return 1; // Move items with "?" to the end
        if (b.rank === "?") return -1;
        return a.rank - b.rank; // Sort by rank normally
      });
      setCurrentQuestions(sortedArr);
    }
  };

  const deselect = () => {
    setCurrentQuestions(currentQuestions.map((q) => ({ ...q, rank: "?" })));
  };

  const isPageFullyRanked = () => {
    const rankedQues = currentQuestions.filter((ques) => ques.rank != "?");
    if (rankedQues.length == questionsPerPage) {
      return true;
    } else {
      return false;
    }
  };

  const handleNext = async () => {
    if (isPageFullyRanked()) {
      const qorderID = quesOrder[currentPage - 1].qorderID;
      const opt1 = currentQuestions.find((ques) => ques.rank == 1);
      const opt2 = currentQuestions.find((ques) => ques.rank == 2);
      const opt3 = currentQuestions.find((ques) => ques.rank == 3);
      const opt4 = currentQuestions.find((ques) => ques.rank == 4);
      const opt5 = currentQuestions.find((ques) => ques.rank == 5);
      updateAnswer(qorderID, opt1.id, opt2.id, opt3.id, opt4.id, opt5.id);
      if (currentPage == totalPages) {
        toast.success("Thanks For Your Time");
        const response = await fetch(
          "https://margda.in:7000/api/career/attitude/submit-result",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ resultID, paid: false, euser: euserID }),
          }
        );
        const data = await response.json();
        alert(data.message);
        navigate("/assesment-payment");
      } else {
        setAnswers((pre) => [...pre, currentQuestions]);
        const newCurrentPage = currentPage + 1;
        const current = [
          allQuestions.find(
            (ques) => ques.id === quesOrder[currentPage]?.option1
          ) || {},
          allQuestions.find(
            (ques) => ques.id === quesOrder[currentPage]?.option2
          ) || {},
          allQuestions.find(
            (ques) => ques.id === quesOrder[currentPage]?.option3
          ) || {},
          allQuestions.find(
            (ques) => ques.id === quesOrder[currentPage]?.option4
          ) || {},
          allQuestions.find(
            (ques) => ques.id === quesOrder[currentPage]?.option5
          ) || {},
        ];
        setCurrentQuestions(current);
        setCurrentPage(newCurrentPage);
      }
    } else {
      toast.warn("Please Rank all the Options on this page");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const current = answers[currentPage - 1];
      console.log(answers);
      setCurrentQuestions(current);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 flex justify-between items-center">
          <span className="font-bold text-xl text-blue-600 bg-blue-100 px-2 py-1 rounded-lg shadow-sm">
            In my ideal job, it's crucial that:
          </span>
          <button
            onClick={deselect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Deselect All
          </button>
        </div>
        <p className="text-sm text-right">
          Page {currentPage} of {totalPages}
        </p>
        <>
          <table className="w-full border-collapse mt-4">
            <tbody>
              {currentQuestions.map((q) => (
                <tr
                  key={q.id}
                  className={`cursor-pointer hover:bg-blue-100 ${
                    q.rank !== "?" ? "bg-blue-200" : ""
                  }`}
                  onClick={() => ranking(q.id)}
                >
                  <td className="border px-4 py-2">{q.rank || "?"}</td>
                  <td
                    className="border px-4 py-2"
                    dangerouslySetInnerHTML={{ __html: q.text }}
                  ></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            {/* <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Previous
            </button> */}
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Next
            </button>
          </div>
        </>
        {/* )} */}
      </div>
    </div>
  );
};

export default Attitude;
