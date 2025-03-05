import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AttitudeAssesment = () => {
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
        "https://margda.in:7000/api/career/attitude/fetch-tests",
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
      //   toast.error("Unable to start test");
    }
  };

  const handleStart = async (test) => {
    localStorage.setItem("resultID", test.resultID);
    localStorage.setItem("euserID", test.euser);
    navigate("/attitude-test");
  };

  return (
    <div className="p-9 bg-gray-20">
      <div className="text-xl flex flex-row justify-between items-center gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <FaUserAlt />
          </div>
          <div>Work Attitude Assessment</div>
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
          The Career Aptitude Assessment is conducted to find your best fit
          career options based on:
        </div>
        <div
          className="border rounded-tr-full rounded-bl-full pl-4 mt-3 font-semibold text-xl py-1 text-gray-500"
          style={{
            backgroundColor: "#FFE4C4",
            boxShadow: "0px 0px 10px 0px grey",
          }}
        >
          What is important to you.
        </div>
        <div>
          Your work attitudes (values) are beliefs about what is most important
          for you in any job. Some people care most about their relationships
          with other workers. Some people want support from their organisation
          or their managerss while others prefer to work more independently.
          Receiving recognition for work well done counts a lot for some. On the
          other hand, some people care most about their own sense of
          achievement. Clearly none of these values are better or more important
          than the others.
        </div>

        <div>
          Work Attitude Assessment can help you identify the work values that
          are more important to you and to explore occupations that are aligned
          with those values.
        </div>

        <div
          style={{
            backgroundColor: "#85E7C6",
            boxShadow: "0px 0px 10px 0px grey",
          }}
          className="border rounded-tr-full rounded-bl-full pl-4 mt-3 font-semibold text-xl py-1 text-gray-500"
        >
          How to complete Work Attitude Assessment
        </div>
        <div>
          Each of the statement that follows has five options. You have to write
          your preferences in order of importance.
        </div>

        <div>(1=Most important, 5=Least important)</div>

        <div>1 2 3 4 5</div>
        <div>Order the following 5 statements from 1 to 5.</div>

        {availableTests && availableTests.length > 0 ? (
          <div>
            {availableTests.map((test, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-lg font-semibold">
                  Test Assigned by {test.euserData.name}
                </div>
                {test.support ? (
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

export default AttitudeAssesment;
