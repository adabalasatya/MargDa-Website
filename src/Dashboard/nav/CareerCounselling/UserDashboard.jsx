import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import "highcharts/highcharts-3d";
import "highcharts/modules/cylinder";
import "highcharts/modules/funnel3d";
import "highcharts/modules/pyramid3d";
import "highcharts/modules/exporting";
import "highcharts/modules/accessibility";
import {
  FaBullseye,
  FaUserGraduate,
  FaChartLine,
  FaDna,
  FaBookReader,
  FaChartBar,
  FaTachometerAlt,
  FaRoad,
  FaHeart,
  FaTrophy,
  FaPhone,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [attitudeData, setAttitudeData] = useState([]);
  const [aptitudeData, setAptitudeData] = useState([]);
  const [abilityData, setAbilityData] = useState([]);
  const [learningStyleData, setLearningStyleData] = useState([]);
  const [links, setLinks] = useState([]);
  const [userData, setUserData] = useState({});
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const loginUserID = localUserData ? localUserData.user_data.userID : null;
  const accessToken = localUserData ? localUserData.access_token : null;
  const [aptitudeOrder, setAptitudeOrder] = useState([
    "Realistic",
    "Investigative",
    "Artistic",
    "Social",
    "Enterprising",
    "Conventional",
  ]);

  const attitudeOrder = [
    "Achievements",
    "Independence",
    "Recognition",
    "Relationship",
    "Support",
    "Working_Condition",
  ];

  const abilityLabels = [
    "Logical",
    "Verbal",
    "Inter Personal",
    "Intra Personal",
    "Bodily Kinaesthetic",
    "Visual Spatial",
    "Musical Harmonic",
    "Naturalistic Existential",
  ];

  const exactAbilityLabels = [
    "logical_mathematical",
    "verbal_linguistic",
    "inter_personal",
    "intra_personal",
    "bodily_kinaesthetic",
    "visual_spatial",
    "musical_harmonic",
    "naturalistic existential",
  ];
  const learningStyleLabels = [
    "Read Write",
    "Auditory",
    "Visual",
    "Kinaesthetic",
  ];
  const exactLearningStyleLabels = [
    "read_write",
    "auditory",
    "visual",
    "kinaesthetic",
  ];

  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setUserData(location.state.item);
      fetchData(location.state.item.userID);
    } else {
      setUserData(localUserData.user_data);
      fetchData(localUserData.user_data.userID);
    }
  }, []);
  const fetchData = async (userID) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/career-map/get-data",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            euser: loginUserID,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (result.Links && Array.isArray(result.Links)) {
          setLinks(result.Links);
        }
        if (result.abilityResult && result.abilityResult.length > 0) {
          const temp = result.abilityResult[0];
          const extractedAbilityData = exactAbilityLabels.map(
            (key) => temp[key.toLowerCase()]
          );
          const extractLearningStyleData = exactLearningStyleLabels.map(
            (key) => temp[key.toLowerCase()]
          );
          setAbilityData(
            abilityLabels.map((item, index) => [
              item,
              Number(extractedAbilityData[index]),
            ])
          );
          setLearningStyleData(
            learningStyleLabels.map((item, index) => [
              item,
              Number(extractLearningStyleData[index]),
            ])
          );
        }
        if (result.aptitudeResult && result.aptitudeResult.length > 0) {
          const temp = result.aptitudeResult[0];
          const extractedAptitudeData = aptitudeOrder.map(
            (key) => temp[key.toLowerCase()]
          );

          const combined = aptitudeOrder.map((category, index) => ({
            category,
            score: extractedAptitudeData[index],
          }));

          combined.sort((a, b) => a.score - b.score);

          const sortedCategories = combined.map((item) => item.category);
          const sortedScores = combined.map((item) =>
            item.score ? item.score : 0
          );
          setAptitudeData(sortedScores);
          setAptitudeOrder(sortedCategories);
        }
        if (result.attitudeResult && result.attitudeResult.length > 0) {
          const temp = result.attitudeResult[0];
          const extractedAttitudeData = attitudeOrder.map(
            (key) => temp[key.toLowerCase()]
          );

          const combined = attitudeOrder.map((category, index) => [
            category,
            extractedAttitudeData[index],
          ]);

          setAttitudeData([
            ["Achievements", Number(combined[0][1]) || 0],
            ["Independence", Number(combined[1][1]) || 0],
            ["Recognition", Number(combined[2][1]) || 0],
            ["Relationship", Number(combined[3][1]) || 0],
            ["Support", Number(combined[4][1]) || 0],
            ["Working_Condition", Number(combined[5][1]) || 0],
          ]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Career Aptitude Chart
    if (aptitudeData && aptitudeData.length > 0 && aptitudeData[0]) {
      Highcharts.chart("careerAptitudeChart", {
        chart: { type: "column" },
        title: { text: "Career Aptitude", align: "left" },
        xAxis: {
          categories: aptitudeOrder,
        },
        yAxis: { min: 0, title: { text: "Score" } },
        series: [
          {
            name: "Score",
            data: [
              { y: aptitudeData[0], color: "#FF5733" },
              { y: aptitudeData[1], color: "#33B5E5" },
              { y: aptitudeData[2], color: "#FFBB33" },
              { y: aptitudeData[3], color: "#FF7F50" },
              { y: aptitudeData[4], color: "#8E44AD" },
              { y: aptitudeData[5], color: "#1ABC9C" },
            ],
          },
        ],
      });
    }

    // Work Attitude chart
    if (attitudeData && attitudeData.length > 0 && attitudeData[0][1]) {
      const sortedAttitudeData = [...attitudeData].sort((a, b) => b[1] - a[1]);
      Highcharts.chart("workAttitudeChart", {
        chart: {
          type: "pyramid3d",
          options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50,
          },
        },
        title: {
          text: "Work Attitude",
        },
        plotOptions: {
          series: {
            animation: {
              duration: 1500,
              easing: "easeOutBounce",
            },
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b> ({point.y:,.4f})",
              allowOverlap: true,
              x: 10,
              y: -5,
            },
            width: "60%",
            height: "80%",
            center: ["50%", "45%"],
          },
        },
        series: [
          {
            name: "Score",
            data: sortedAttitudeData,
          },
        ],
      });
    }

    // Inborn Ability Chart
    if (abilityData && abilityData.length > 0) {
      const sortedAttitudeData = [...abilityData].sort((a, b) => b[1] - a[1]);
      Highcharts.chart("inbornAbilityChart", {
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45,
          },
        },
        title: {
          text: "Inborn Ability",
          align: "left",
        },
        plotOptions: {
          pie: {
            innerSize: 100, // Creates the donut shape
            depth: 45, // 3D effect depth
          },
        },
        series: [
          {
            name: "Score",
            data: sortedAttitudeData,
          },
        ],
      });
    }

    // Learning Styles Chart
    if (learningStyleData && learningStyleData.length > 0) {
      const sortedLearningData = [...learningStyleData].sort(
        (a, b) => b[1] - a[1]
      );
      Highcharts.chart("learningStylesChart", {
        chart: {
          type: "funnel3d",
          options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50,
          },
        },
        title: {
          text: "Learning Styles",
        },
        accessibility: {
          screenReaderSection: {
            beforeChartFormat:
              "<{headingTagName}>" +
              "{chartTitle}</{headingTagName}><div>{typeDescription}</div>" +
              "<div>{chartSubtitle}</div><div>{chartLongdesc}</div>",
          },
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b> ({point.y:,.0f})",
              allowOverlap: true,
              y: 10,
            },
            neckWidth: "30%",
            neckHeight: "25%",
            width: "80%",
            height: "80%",
            animation: {
              duration: 1000, // Animation duration in milliseconds
              easing: "easeOutBounce", // Animation easing effect
            },
          },
        },
        series: [
          {
            name: "Score",
            data: sortedLearningData,
          },
        ],
      });
    }
  }, [aptitudeData, aptitudeOrder, attitudeData]);

  // SMART AIM Card Data
  const smartAimData = [
    {
      age: "21/24",
      qualification: "4/4",
      title: "Customer Service Associate",
    },
    {
      age: "21/24",
      qualification: "4/6",
      title: "Bank Clerk",
    },
    {
      age: "21/24",
      qualification: "4/6",
      title: "Bank Processionary Officer",
    },
  ];

  // Education & Training Pathways Data
  const educationTrainingData = [
    {
      courseExam: "BCom/BBBA",
      institute: "Rani Channamma University, Belagavi",
      year: "2025",
    },
    {
      courseExam: "Bank Competition",
      institute: "Self-study",
      year: "2024",
    },
    {
      courseExam: "English communication",
      institute: "Self preparation",
      year: "2024",
    },
  ];

  const handleAssessmentLink = async (type) => {
    if (localUserData.user_data.userID == userData.userID) {
      return toast.warn("You Can't Assign Test to Self");
    }
    try {
      const apiUrl =
        type == "Aptitude"
          ? "https://margda.in:7000/api/career/aptitude/assign-test"
          : "https://margda.in:7000/api/career/attitude/assign-test";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userData.userID,
          euser: localUserData.user_data.userID,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    }
  };

  const handleScanFaceLink = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/ability/assign-link",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userData.userID,
            euser: localUserData.user_data.userID,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      {/* User Info Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img
            src={userData.pic_url}
            alt={userData.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              {userData.name}
              <button className="ml-3 text-green-600 hover:text-green-800">
                <FaPhone className="mt-4" />
              </button>
            </h1>
            <p className="text-gray-600">Student / Job Seeker</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center">
          <FaTachometerAlt className="mr-2" /> Career Map
        </button>
      </div>
      <hr className="mb-8" />

      {/* Smart and Career */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6 relative">
          {/* Left Column */}
          <div className="pr-6 relative">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaBullseye className="mr-2" /> SMART AIM
            </h2>
            <hr className="my-3 border-gray-300" />
            <p className="text-black-600 text-lg">
              Career by choice, not by chance!
            </p>
            <p className="text-gray-600 text-sm">
              Most students adopt a "let's see what happens" mindset. They
              either consider traditional careers or heed the casual, half-baked
              advice of family members, relatives, and friends
            </p>
            <br />
            <p className="text-gray-600 text-sm">
              You must define Specific, Measurable, Acceptable, Realistic, and
              Time-specific career objectives.
            </p>
            <button className="text-blue-600 hover:text-blue-800 mt-2">
              + Add
            </button>
          </div>

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full border-l border-gray-300"></div>

          {/* Right Column */}
          <div className="pl-6">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaRoad className="mr-2" /> Career Map
            </h2>
            <hr className="my-3 border-gray-300" />
            <p className="text-black-600 text-lg">Don't follow the crowd!</p>
            <p className="text-gray-600 text-sm">
              84% of students either follow the crowd or get lured by useless
              courses and training programs, wasting hard-earned money and
              precious time during the career-building phase. Choose courses,
              skills, training, and institutions based on your career objectives
              and financial situation.
            </p>
            <br />
            <p className="text-gray-600 text-sm">
              Choose courses, skills, training, and institutions based on your
              career objectives and financial situation.
            </p>
            <button className="text-blue-600 hover:text-blue-800 mt-2">
              + Add
            </button>
          </div>

          {/* More Rows */}
          <div className="pr-6">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaChartBar className="mr-2" /> Career Aptitude
            </h2>
            <hr className="my-3 border-gray-300" />
            {aptitudeData && aptitudeData.length > 0 && aptitudeData[0] ? (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="text-center bg-blue-100 p-4 rounded-t-lg">
                  <h2 className="text-xl font-semibold">
                    <FaChartBar className="inline-block mr-2" /> Career Aptitude
                  </h2>
                </div>
                <div className="p-4">
                  <div id="careerAptitudeChart"></div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-black-600 text-lg">
                  Be what you want to be!
                </p>
                <p className="text-gray-600 text-sm">
                  Career Aptitude Assessment is an authentic, scientifically
                  formulated psychometric tool that helps students discover
                  their true interests and align them with their career goals.
                </p>
                {links.length > 0 &&
                links.find((link) => link.link == "Aptitude Assessment") &&
                userData.userID != 2 ? (
                  links
                    .filter((link) => link.link == "Aptitude Assessment")
                    .map((link) => (
                      <div key={link.linkID} className="text-blue-800">
                        <div>Link Already Assigned</div>
                        <div>
                          Valid Date:{" "}
                          {new Date(link.valid).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                ) : (
                  <button
                    onClick={() => handleAssessmentLink("Aptitude")}
                    className="text-blue-600 hover:text-blue-800 mt-2"
                  >
                    + Assessment link
                  </button>
                )}
              </div>
            )}

            {/* Career Aptitude Card */}
          </div>

          <div className="pl-6">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaHeart className="mr-2" /> Work Attitude
            </h2>
            <hr className="my-3 border-gray-300" />
            {attitudeData && attitudeData.length > 0 && attitudeData[0][1] ? (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="text-center bg-blue-100 p-4 rounded-t-lg">
                  <h2 className="text-xl font-semibold">
                    <FaChartLine className="inline-block mr-2" />
                    Work Attitude
                  </h2>
                </div>
                <div className="p-4">
                  <div id="workAttitudeChart"></div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-black-600 text-lg">
                  Listen to your heart & mind!
                </p>
                <p className="text-gray-600 text-sm">
                  Work Attitude Assessment identifies occupations that may be
                  fulfilling for you, based on the alignment between your work
                  values and the characteristics of those occupations.
                </p>
                {links.length > 0 &&
                links.find((link) => link.link == "Attitude Assessment") &&
                userData.userID != 2 ? (
                  links
                    .filter((link) => link.link == "Attitude Assessment")
                    .map((link) => (
                      <div key={link.linkID} className="text-blue-800">
                        <div>Link Already Assigned</div>
                        <div>
                          Valid Date: {new Date(link.valid).toLocaleString()}
                        </div>
                      </div>
                    ))
                ) : (
                  <button
                    onClick={() => handleAssessmentLink("Attitude")}
                    className="text-blue-600 hover:text-blue-800 mt-2"
                  >
                    + Assessment link
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="pr-6">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaDna className="mr-2" /> Inborn Ability
            </h2>
            <hr className="my-3 border-gray-300" />
            {abilityData && abilityData.length > 0 ? (
              <div className="p-4">
                <div id="inbornAbilityChart"></div>
              </div>
            ) : (
              <div>
                <p className="text-black-600 text-lg">
                  Don't teach a fish to climb a tree!
                </p>
                <p className="text-gray-600 text-sm">
                  Every person has unique talents. An analysis of innate
                  abilities identifies nine types of intelligence.
                </p>
                <button
                  onClick={handleScanFaceLink}
                  className="text-blue-600 hover:text-blue-800 mt-2"
                >
                  Assign Test
                </button>
              </div>
            )}
          </div>

          <div className="pl-6">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaBookReader className="mr-2" /> Learning Styles
            </h2>
            <hr className="my-3 border-gray-300" />
            {learningStyleData && learningStyleData.length > 0 ? (
              <div className="p-4">
                <div id="learningStylesChart"></div>
              </div>
            ) : (
              <div>
                <p className="text-black-600 text-lg">
                  Remove the 'trial and error' approach!
                </p>
                <p className="text-gray-600 text-sm">
                  Discover which learning style suits you best: Visual, Aural,
                  Reading & Writing, or Kinaesthetic.
                </p>
                <button className="text-blue-600 hover:text-blue-800 mt-2">
                  + Scan finger
                </button>
              </div>
            )}
          </div>

          <div className="pr-6">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaTachometerAlt className="mr-2" /> Progress Meter
            </h2>
            <hr className="my-3 border-gray-300" />
            <p className="text-black-600 text-lg">
              Know your results before the exam!
            </p>
            <p className="text-gray-600 text-sm">
              "How is your study going?" - Ask any student and you'll get the
              quick reply "It is fine". Progress Meter helps students manage and
              self-monitor their studies based on the difficulty level and
              available time, resulting in 100% consistent marks on all the exam
              papers.
            </p>
            <button className="text-blue-600 hover:text-blue-800 mt-2">
              + Study Organiser
            </button>
          </div>

          <div className="pl-6">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaTrophy className="mr-2" /> Accomplishments
            </h2>
            <hr className="my-3 border-gray-300" />
            <p className="text-black-600 text-lg">
              Inspire the path to success!
            </p>
            <p className="text-gray-600 text-sm">
              The career awareness contest provides a catalytic effect to
              accomplish higher academic excellence. The prizes and accolades
              won during contests have far-reaching consequences and induce very
              motivating effects throughout life.
            </p>
            <button className="text-blue-600 hover:text-blue-800 mt-2">
              + CAP-Contest
            </button>
          </div>
        </div>
      </div>

      {/* Original Charts Section */}
      <div className="grid grid-cols-1 p-2 md:grid-cols-2 gap-6">
        {/* SMART AIM Card with Original Layout */}
        {/* <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="text-center bg-orange-500 text-white p-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">
              <FaBullseye className="inline-block mr-2" /> SMART AIM
            </h2>
          </div>
          <div className="p-2">
            {smartAimData.map((item, index) => (
              <div key={index} className="mb-2">
                <div>
                  <span className="text-sm text-gray-700">Age</span>
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                    <div
                      className="bg-green-500 h-full"
                      style={{
                        width: `${
                          (parseInt(item.age.split("/")[0]) /
                            parseInt(item.age.split("/")[1])) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{item.age}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-700">Qualification</span>
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                    <div
                      className="bg-yellow-500 h-full"
                      style={{
                        width: `${
                          (parseInt(item.qualification.split("/")[0]) /
                            parseInt(item.qualification.split("/")[1])) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">
                    {item.qualification}
                  </span>
                </div>
                <p className="text-sm font-bold">{item.title}</p>
              </div>
            ))}
            <div className="text-center">
              <a href="" className="text-2xl text-black no-underline">
                +
              </a>
            </div>
          </div>
        </div> */}

        {/* Education & Training Pathways Card with Original Layout */}
        {/* <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="text-center bg-orange-500 text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">
              <FaUserGraduate className="inline-block mr-2" />
              Education & Training Pathways
            </h2>
          </div>
          <div className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Course/Exam</th>
                  <th className="py-2">Institute</th>
                  <th className="py-2">Year</th>
                </tr>
              </thead>
              <tbody>
                {educationTrainingData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.courseExam}</td>
                    <td className="py-2">{item.institute}</td>
                    <td className="py-2">{item.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center mt-4">
              <a href="" className="text-4xl text-black no-underline">
                +
              </a>
            </div>
          </div>
        </div> */}

        {/* Learning Styles Card */}
        {/* <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-center bg-blue-100 p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">
            <FaBookReader className="inline-block mr-2" />
            Learning Styles
          </h2>
        </div>
        <div className="p-4">
          <div id="learningStylesChart"></div>
        </div>
      </div> */}
      </div>

      {/* Footer */}
      <footer className="mt-8 w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
        <span>Margdarshak © {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">
            Support
          </a>
          <a href="#" className="hover:text-blue-600">
            Help Center
          </a>
          <a href="#" className="hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
