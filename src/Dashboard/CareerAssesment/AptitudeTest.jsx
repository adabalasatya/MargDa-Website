import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AptitudeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const questionsPerPage = 20;

  const navigate = useNavigate();

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const resultID = localStorage.getItem("resultID");
  const euserID = localStorage.getItem("euserID");
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/aptitude-test-quest",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          return navigate("/login");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (response.ok) {
        setQuestions(result.data);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const saveAnswer = async (resultID, questID, prefer) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/aptitude/update-answer",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resultID, questID, prefer }),
        }
      );
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswer = async (index, ans) => {
    await saveAnswer(resultID, index, ans);
    setSelectedAnswers((prev) => {
      const filtered = prev.filter((item) => item.index !== index);
      return [...filtered, { index, ans }];
    });
  };

  const handleNextPage = () => {
    if (!isPageFullyAnswered()) {
      alert("Please answer all questions before proceeding to the next page.");
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
    setIsSubmitted(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    if (!isPageFullyAnswered()) {
      alert("Please answer all questions before submitting.");
      return;
    }
    if (currentPage === 9) {
      const A_quests = questions.filter((ques) => ques.aptID == "A");
      const C_quests = questions.filter((ques) => ques.aptID == "C");
      const E_quests = questions.filter((ques) => ques.aptID == "E");
      const I_quests = questions.filter((ques) => ques.aptID == "I");
      const R_quests = questions.filter((ques) => ques.aptID == "R");
      const S_quests = questions.filter((ques) => ques.aptID == "S");
      const A = selectedAnswers.filter(
        (item) =>
          A_quests.some((obj) => obj.questID === item.index) && item.ans === "L"
      );
      const C = selectedAnswers.filter(
        (item) =>
          C_quests.some((obj) => obj.questID === item.index) && item.ans === "L"
      );
      const E = selectedAnswers.filter(
        (item) =>
          E_quests.some((obj) => obj.questID === item.index) && item.ans === "L"
      );
      const I = selectedAnswers.filter(
        (item) =>
          I_quests.some((obj) => obj.questID === item.index) && item.ans === "L"
      );
      const R = selectedAnswers.filter(
        (item) =>
          R_quests.some((obj) => obj.questID === item.index) && item.ans === "L"
      );
      const S = selectedAnswers.filter(
        (item) =>
          S_quests.some((obj) => obj.questID === item.index) && item.ans === "L"
      );
      try {
        const response = await fetch(
          "https://margda.in:7000/api/career/aptitude/submit-result",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              A: A.length,
              C: C.length,
              E: E.length,
              I: I.length,
              R: R.length,
              S: S.length,
              euser: euserID,
            }),
          }
        );
        await response.json();
        if (response.ok) {
          toast.success("Thanks For Your Time");
          navigate("/assesment-payment");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsSubmitted(true);
  };

  const isPageFullyAnswered = () => {
    return currentQuestions.every((question, index) =>
      selectedAnswers.some(
        (item) => item.index === indexOfFirstQuestion + index + 1
      )
    );
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  return (
    <div className="p-9 bg-gray-20">
      <div className="text-xl flex items-center gap-3">
        <FaUserAlt />
        <div>Psychometric Aptitude Assessments</div>
      </div>
      <div className="bg-white mt-4 text-sm p-9 rounded flex flex-col gap-9">
        <ul style={{ listStyleType: "disc" }} className="text-blue-500">
          <li>If you like the activity, click the "Like" button.</li>
          <li>If you do not like the activity, click the "Dislike" button.</li>
          <li>If you are unsure, click the "Unsure" button.</li>
        </ul>
        <div className="border border-black p-6 flex flex-col gap-5">
          {currentQuestions.map((question, index) => (
            <div key={index} className="flex items-center">
              <span>{indexOfFirstQuestion + index + 1}. </span>
              <span className="ml-4 flex flex-col">
                {" "}
                {/* {question.aptiquest.split("<br>").map((item, index) => (
                  <>
                  <div
                  id="preview"
                  className="px-4 py-2 border border-gray-300 rounded overflow-x-scroll"
                  dangerouslySetInnerHTML={{ __html: item }}
                />

<span key={index}>{item}</span>
                </>
                ))} */}
                <div
                  id="preview"
                  dangerouslySetInnerHTML={{ __html: question.aptiquest }}
                />
              </span>

              <span className="align-right self-end justify-end ml-auto">
                <span className="mr-5">
                  <button
                    onClick={() =>
                      handleAnswer(indexOfFirstQuestion + index + 1, "L")
                    }
                    className={`${
                      selectedAnswers.find(
                        (item) =>
                          item.index === indexOfFirstQuestion + index + 1 &&
                          item.ans === "L"
                      )
                        ? "bg-blue-500 text-white"
                        : ""
                    } border border-blue-500 rounded px-3 py-1 text-blue-500 hover:bg-blue-500 hover:text-white`}
                  >
                    Like
                  </button>
                </span>
                <span className="mr-5">
                  <button
                    onClick={() =>
                      handleAnswer(indexOfFirstQuestion + index + 1, "D")
                    }
                    className={`${
                      selectedAnswers.find(
                        (item) =>
                          item.index === indexOfFirstQuestion + index + 1 &&
                          item.ans === "D"
                      )
                        ? "bg-blue-500 text-white"
                        : ""
                    } border border-blue-500 rounded px-3 py-1 text-blue-500 hover:bg-blue-500 hover:text-white`}
                  >
                    Dislike
                  </button>
                </span>
                <span className="mr-5">
                  <button
                    onClick={() =>
                      handleAnswer(indexOfFirstQuestion + index + 1, "U")
                    }
                    className={`${
                      selectedAnswers.find(
                        (item) =>
                          item.index === indexOfFirstQuestion + index + 1 &&
                          item.ans === "U"
                      )
                        ? "bg-blue-500 text-white"
                        : ""
                    } border border-blue-500 rounded px-3 py-1 text-blue-500 hover:bg-blue-500 hover:text-white`}
                  >
                    Unsure
                  </button>
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Submit
          </button>
          <button
            onClick={handleNextPage}
            disabled={!isSubmitted || indexOfLastQuestion >= questions.length}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
