import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import Loader from "../../../Components/Loader";

const CareerMap = () => {
  const [attitudeData, setAttitudeData] = useState([]);
  const [aptitudeData, setAptitudeData] = useState([]);
  const [userData, setUserData] = useState({});
  const [resultID, setResultID] = useState(null);
  const [loading, setLoading] = useState(false);

  const [availableAbilityTests, setAvailableAbilityTests] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState("");
  const localUserData = JSON.parse(localStorage.getItem("userData"));
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

  useEffect(() => {
    fetchTests();
    setUserData(localUserData.user_data);
    fetchData(localUserData.user_data.userID);
  }, []);

  const fetchData = async (userID) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/career-map/self-data",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (result.aptitudeResult && result.aptitudeResult.length > 0) {
          const temp = result.aptitudeResult.filter((item) => item.artistic);
          const availableData = temp.length > 0 ? temp[0] : {};
          const extractedAptitudeData = aptitudeOrder.map(
            (key) => availableData[key.toLowerCase()]
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
          const temp = result.attitudeResult.filter((item) => item.support);
          const availableData = temp.length > 0 ? temp[0] : {};
          const extractedAttitudeData = attitudeOrder.map(
            (key) => availableData[key.toLowerCase()]
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

  const fetchTests = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/ability/fetch-tests",
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
        setAvailableAbilityTests(data.data);
      }
    } catch (error) {
      console.log(error);
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

    if (attitudeData && attitudeData.length > 0 && attitudeData[0][1]) {
      // Sort attitudeData in descending order based on the score
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
    // Highcharts.chart("inbornAbilityChart", {
    //   chart: {
    //     type: "pie",
    //     options3d: {
    //       enabled: true,
    //       alpha: 45,
    //     },
    //   },
    //   title: {
    //     text: "Inborn Ability",
    //     align: "left",
    //   },
    //   plotOptions: {
    //     pie: {
    //       innerSize: 100, // Creates the donut shape
    //       depth: 45, // 3D effect depth
    //     },
    //   },
    //   series: [
    //     {
    //       name: "Score",
    //       data: [
    //         ["Logical", 4.6],
    //         ["Verbal", 4.2],
    //         ["Spatial", 3.1],
    //         ["Musical", 3.2],
    //       ],
    //     },
    //   ],
    // });

    // Learning Styles Chart
    // Highcharts.chart("learningStylesChart", {
    //   chart: {
    //     type: "funnel3d",
    //     options3d: {
    //       enabled: true,
    //       alpha: 10,
    //       depth: 50,
    //       viewDistance: 50,
    //     },
    //   },
    //   title: {
    //     text: "Learning Styles",
    //   },
    //   accessibility: {
    //     screenReaderSection: {
    //       beforeChartFormat:
    //         "<{headingTagName}>" +
    //         "{chartTitle}</{headingTagName}><div>{typeDescription}</div>" +
    //         "<div>{chartSubtitle}</div><div>{chartLongdesc}</div>",
    //     },
    //   },
    //   plotOptions: {
    //     series: {
    //       dataLabels: {
    //         enabled: true,
    //         format: "<b>{point.name}</b> ({point.y:,.0f})",
    //         allowOverlap: true,
    //         y: 10,
    //       },
    //       neckWidth: "30%",
    //       neckHeight: "25%",
    //       width: "80%",
    //       height: "80%",
    //       animation: {
    //         duration: 1000, // Animation duration in milliseconds
    //         easing: "easeOutBounce", // Animation easing effect
    //       },
    //     },
    //   },
    //   series: [
    //     {
    //       name: "Score",
    //       data: [
    //         ["Read/Write", 42],
    //         ["Auditory", 8],
    //         ["Visual", 42],
    //         ["Kinaesthetic", 8],
    //       ],
    //     },
    //   ],
    // });
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

  const startCamera = async (test) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraOn(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStream(stream);
      setResultID(test.resultID);
    } catch (error) {
      if (error.toString().startsWith("NotAllowedError")) {
        return toast.error("Camera Permission Required");
      }
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas image to Base64
      const imageUrl = canvas.toDataURL("image/png");
      setImage(imageUrl);
      setIsCameraOn(false);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop()); // Stop each track
        setStream(null);
      }
    }
  };

  const handleSaveImage = async () => {
    setLoading(true);
    const canvas = canvasRef.current;

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("files", blob, `${localUserData.user_data.name}.png`);

      try {
        const response = await axios.post(
          "https://margda.in:7000/api/upload_file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status == 200) {
          const imageUrl = response.data.fileUrls[0];
          const response2 = await fetch(
            "https://margda.in:7000/api/career/ability/save-face-image",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                imageUrl: imageUrl,
                resultID: resultID,
              }),
            }
          );
          const data = await response2.json();
          if (response2.ok) {
            setImage(null);
            return toast.success(data.message);
          } else {
            return toast.error(data.message);
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }, "image/png");
  };

  return (
    <div className="bg-white min-h-screen p-8">
      {/* User Info Section */}
      {/* {loading && <Loader />} */}
      <div className="flex justify-between items-center mb-8">
        <div
          className={`flex flex-col gap-1 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 ${
            isCameraOn ? "block" : "hidden"
          }`}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-[90vh]"
          ></video>
          <button
            onClick={captureImage}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xl"
          >
            Capture
          </button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

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
              </div>
            )}
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
              </div>
            )}
          </div>

          <div className="pr-6">
            <hr className="my-3 border-gray-300" />
            <h2 className="text-green-600 text-lg font-bold flex items-center">
              <FaDna className="mr-2" /> Inborn Ability
            </h2>
            <hr className="my-3 border-gray-300" />
            <p className="text-black-600 text-lg">
              Don't teach a fish to climb a tree!
            </p>
            <p className="text-gray-600 text-sm">
              Every person has unique talents. An analysis of innate abilities
              identifies nine types of intelligence.
            </p>
            {availableAbilityTests && availableAbilityTests.length > 0 ? (
              <div className="flex mt-2 justify-start gap-1">
                {availableAbilityTests.map((test, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start border px-2 rounded bg-gray-100"
                  >
                    <div className="text-lg font-semibold">
                      Test Assigned by {test.euserData.name}
                    </div>
                    <button
                      onClick={() => startCamera(test)}
                      className="cursor-pointer text-blue-600 hover:text-blue-800 mt-2"
                    >
                      + Scan face
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-blue-600 hover:text-blue-800 mt-2">
                Test Not Assigned
              </div>
            )}
            {/* <button
              onClick={startCamera}
              className="text-blue-600 hover:text-blue-800 mt-2"
            >
              + Scan face
            </button> */}
            {image && (
              <div className="flex flex-col gap-2 items-center">
                <img className="mt-2" src={image} alt="Captured" />
                <button
                  onClick={handleSaveImage}
                  disabled={loading}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded w-max"
                >
                  {loading ? "Saving" : "Save Image"}
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

        {/* Inborn Ability Card */}
        {/* <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-center bg-blue-100 p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">
            <FaDna className="inline-block mr-2" />
            Inborn Ability
          </h2>
        </div>
        <div className="p-4">
          <div id="inbornAbilityChart"></div>
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

export default CareerMap;
