import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AptitudeAssesment = () => {
  const navigate = useNavigate();
  const [availableTests, setAvailableTests] = useState([]);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/aptitude/fetch-tests",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.data && Array.isArray(data.data)) {
        setAvailableTests(data.data);
      } else {
        // toast.error("Unable to start test");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to start test");
    }
  };

  const handleStart = async (test) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/aptitude/save-result",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: localUserData.user_data.userID,
            euser: test.euser,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const resultID = data.data.resultID;
        localStorage.setItem("resultID", resultID);
        localStorage.setItem("euserID", test.euser);
        navigate("/aptitude-test");
      } else {
        // toast.error("Unable to start test");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to start test");
    }
  };

  return (
    <div className="p-9 bg-gray-20">
      <div className="text-xl flex flex-row justify-between items-center gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <FaUserAlt />
          </div>
          <div>Psychometric Aptitude Assessments</div>
        </div>
        <div className="text-md">
          <Link
            className="p-2 bg-blue-500 rounded text-white hover:bg-blue-700"
            to={"/assesment-payment"}
          >
            Assesment Payment
          </Link>
        </div>
      </div>
      <div className="bg-white mt-4 text-sm p-9 rounded flex flex-col gap-9">
        <div>
          The Psychometric Aptitude Assessment is conducted to find your best
          fit career options based on:
        </div>
        <div
          className="border rounded-tr-full rounded-bl-full pl-4 mt-3 font-semibold text-xl py-1 text-gray-500"
          style={{
            backgroundColor: "#FFE4C4",
            boxShadow: "0px 0px 10px 0px grey",
          }}
        >
          What you like to do.
        </div>
        <div>
          The Aptitude Assessment helps you discover the type of occupations
          that you would like and find exciting. You identify and learn about
          broad interest areas most relevant to yourself. You can use your
          Aptitude Assessment results to explore the world of work. You receive
          an accurate, reliable profile of your vocational interests that:
        </div>
        <ul style={{ listStyleType: "disclosure-closed" }}>
          <li>
            Provides valuable self-knowledge about your career related
            interests,
          </li>
          <li>Fosters career awareness, and</li>
          <li>Provides a window to the entire world of work.</li>
        </ul>
        <div>The Aptitude Assessment is based on:</div>
        <ul style={{ listStyleType: "disc" }}>
          <li>Rich and extensive research</li>
          <li>Widely accepted and used by counselors</li>
          <li>Easy to use and well authenticated by clients</li>
          <li>
            Interest items represent a broad variety of occupations and
            complexity levels
          </li>
          <li>Extensive and thorough development effort</li>
          <li>Client input during all stages</li>
          <li>Construct validity and reliability evidence</li>
          <li>Can be self-administered and self-interpreted</li>
        </ul>
        <div>
          Aptitude Assessment has a series of questions about activities you
          might perform at work. All of the questions are of multiple choices.
        </div>
        <div>
          You have to read each question carefully and decide whether or not you
          would like to do the work activity.
        </div>

        <div>As you answer the questions, try NOT to think about:</div>
        <ul style={{ listStyleType: "square" }}>
          <li>If you have enough education or training to do the work or</li>
          <li>How much money you would make doing the work.</li>
        </ul>
        <div>Just think about if you would like or dislike doing the work.</div>
        <div
          style={{
            backgroundColor: "#85E7C6",
            boxShadow: "0px 0px 10px 0px grey",
          }}
          className="border rounded-tr-full rounded-bl-full pl-4 mt-3 font-semibold text-xl py-1 text-gray-500"
        >
          THIS IS NOT A TEST!
        </div>
        <div>There are no right or wrong answers!</div>

        <div>
          Please take your time answering the questions. There is no need to
          rush!
        </div>

        <div>
          You will not be able to move to the next page until you have answered
          all the questions.
        </div>
        <div>
          To review a screen you have already completed, click on the back
          button. At any point you can change your answer to a question. Simply
          use your mouse to move to the question where you want to change your
          answer. Then select your new answer.
        </div>
        <div>
          The only goal is for you to learn about your interests so you can
          explore work that might be satisfying and rewarding to you.
        </div>
        <div>
          The assessment is composed of 180 items describing work activities
          that represent a wide variety of occupations as well as a broad range
          of training levels.
        </div>
        <div
          style={{
            backgroundColor: "#F0E68C",
            boxShadow: "0px 0px 10px 0px grey",
          }}
          className="border rounded-tr-full rounded-bl-full pl-4 mt-3 font-semibold text-xl py-1 text-gray-500"
        >
          Completion time: 30 minute approx.
        </div>
        {availableTests && availableTests.length > 0 ? (
          <div className="flex flex-col gap-3">
            {availableTests.map((test, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="text-lg font-semibold">
                  Test Assigned by {test.euserData.name}
                </div>
                {test.social ? (
                  <div className="text-base bg-green-500 text-white py-2 rounded w-1/3 text-center">
                    Test Already Completed
                  </div>
                ) : (
                  <button
                    onClick={() => handleStart(test)}
                    className="text-base bg-blue-500 text-white py-2 rounded w-1/3 text-center hover:bg-blue-600"
                  >
                    Start
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>Test Not Assigned</div>
        )}
      </div>
    </div>
  );
};

export default AptitudeAssesment;
