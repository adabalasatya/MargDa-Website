import { useEffect, useState } from "react";
import {
  FaCogs,
  FaUserGraduate,
  FaRunning,
  FaBrain,
  FaSmile,
  FaBriefcase,
  FaIndustry,
  FaBook,
  FaChartLine,
  FaRoute,
  FaTools,
  FaMicroscope,
  FaLaptop,
  FaWrench,
  FaUserTie,
  FaHardHat,
  FaMapMarkerAlt,
  FaEye,
  FaChartBar,
  FaTimes,
} from "react-icons/fa";
import Highcharts from "highcharts";
import "highcharts/highcharts-3d"; // Import Highcharts 3D module
import "highcharts/modules/cylinder"; // Import the missing cylinder.js module
import "highcharts/modules/funnel3d"; // Import funnel3d module
import "highcharts/modules/pyramid3d"; // Import pyramid3d module
import "highcharts/modules/exporting"; // Import exporting module
import "highcharts/modules/accessibility"; // Import accessibility module
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const CareerChoice = () => {
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const [ability, setAbility] = useState([]);
  const [aptitude, setAptitude] = useState([]);
  const [activity, setActivity] = useState([]);
  const [attitude, setAttitude] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [outlook, setOutlook] = useState([]);
  const [pathway, setPathway] = useState([]);
  const [preference, setPreference] = useState([]);
  const [sector, setSector] = useState([]);
  const [skills, setSkills] = useState([]);
  const [stem, setStem] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [tools, setTools] = useState([]);
  const [traits, setTraits] = useState([]);
  const [zone, setZone] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [graphData, setGraphData] = useState([]);
  const [graphTableHeading, setGraphTableHeading] = useState("heading");
  const [graphRowTitle, setGraphRowTitle] = useState("Score");
  const colors = [
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
    "#1ABC9C",
    "#8E44AD",
    "#FF7F50",
    "#FFBB33",
    "#33B5E5",
    "#FF5733",
  ];

  useEffect(() => {
    fetchMasterData();
  }, []);

  useEffect(() => {
    // Career Aptitude Chart
    if (graphData.length > 0) {
      Highcharts.chart("careerAptitudeChart", {
        chart: { type: "bar" },
        title: { text: "", align: "left" },
        xAxis: {
          categories: graphData.map((item) => item.option),
        },
        yAxis: {
          min: 0,
          title: { text: graphRowTitle },
          labels: {
            formatter: function () {
              return this.value + "%"; // Show percentage on y-axis labels
            },
          },
        },
        series: [
          {
            name: graphRowTitle,
            data: graphData.map((item, index) => {
              return { y: item.importance, color: colors[index] };
            }),
            dataLabels: {
              enabled: true, // Show values on bars
              format: "{y:.0f}%", // Display values as percentages with 1 decimal place
            },
          },
        ],
      });
    }
  }, [graphData]);

  const fetchGraphData = async (code, choiceID) => {
    if (!code) {
      return [];
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/choice/get-graph-data",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, choiceID }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setGraphData(data.GraphData);
      } else {
        toast.error("Data not present");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      return [];
    }
  };

  const fetchMasterData = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/choice/get-master-data",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAbility(data.Ability);
        setAptitude(data.Aptitude);
        setAttitude(data.Attitude);
        setActivity(data.Activity);
        setIndustry(data.Industry);
        setKnowledge(data.Knowledge);
        setOutlook(data.Outlook);
        setPathway(data.Pathway);
        setPreference(data.Preference);
        setSkills(data.Skills);
        setStem(data.Stem);
        setSector(data.Sector);
        setTechnology(data.Technology);
        setTools(data.Tools);
        setTraits(data.Traits);
        setZone(data.Zone);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async (mastID, choiceID) => {
    if (!mastID || !choiceID) {
      return [];
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/choice/get-data",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mastID, choiceID }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        console.log(data.Careers);
        return data.Careers;
      } else {
        setLoading(false);
        return [];
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      return [];
    }
  };

  const handleCareerChange = async (mastID, choiceID) => {
    try {
      const data = await fetchData(mastID, choiceID);
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRecords = records.filter(
    (record) =>
      (record.career &&
        record.career
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim())) ||
      (record.details &&
        record.details.toLowerCase().includes(searchQuery.toLowerCase().trim()))
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4">
      {Array.isArray(graphData) && graphData.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white rounded-md shadow-2xl  w-1/2">
            <div className=" flex items-center justify-between text-center bg-blue-100 p-4 rounded-t-lg">
              <FaChartBar className="inline-block mr-2" />
              <div className="text-xl font-semibold">{graphTableHeading}</div>
              <div>
                <button
                  onClick={() => {
                    setGraphData([]);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="">
              <div id="careerAptitudeChart"></div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <FaUserGraduate className="text-blue-500" /> {/* Icon added */}
          <span>Career Choice</span>
        </h1>

        {/* 4x4 Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <FaCogs className="text-2xl text-blue-500" />,
              label: "Career Ability",
              data: ability,
              choiceID: 1,
            },
            {
              icon: <FaRunning className="text-2xl text-green-500" />,
              label: "Career Activity",
              data: activity,
              choiceID: 2,
            },
            {
              icon: <FaBrain className="text-2xl text-purple-500" />,
              label: "Career Aptitude",
              data: aptitude,
              choiceID: 3,
            },
            {
              icon: <FaSmile className="text-2xl text-yellow-500" />,
              label: "Career Attitude",
              data: attitude,
              choiceID: 4,
            },
            {
              icon: <FaBriefcase className="text-2xl text-indigo-500" />,
              label: "Career Industry",
              data: industry,
              choiceID: 5,
            },
            {
              icon: <FaBook className="text-2xl text-pink-500" />,
              label: "Career Knowledge",
              data: knowledge,
              choiceID: 6,
            },
            {
              icon: <FaChartLine className="text-2xl text-teal-500" />,
              label: "Career Outlook",
              data: outlook,
              choiceID: 7,
            },
            {
              icon: <FaRoute className="text-2xl text-orange-500" />,
              label: "Career Pathway",
              data: pathway,
              choiceID: 8,
            },
            {
              icon: <FaHardHat className="text-2xl text-red-600" />,
              label: "Career Preference",
              data: preference,
              choiceID: 9,
            },

            {
              icon: <FaIndustry className="text-2xl text-red-500" />,
              label: "Career Sector",
              data: sector,
              choiceID: 10,
            },
            {
              icon: <FaTools className="text-2xl text-blue-600" />,
              label: "Career Skills",
              data: skills,
              choiceID: 11,
            },
            {
              icon: <FaMicroscope className="text-2xl text-green-600" />,
              label: "Career Stem",
              data: stem,
              choiceID: 12,
            },
            {
              icon: <FaLaptop className="text-2xl text-purple-600" />,
              label: "Career Technology",
              data: technology,
              choiceID: 13,
            },
            {
              icon: <FaWrench className="text-2xl text-yellow-600" />,
              label: "Career Tools",
              data: tools,
              choiceID: 14,
            },
            {
              icon: <FaUserTie className="text-2xl text-indigo-600" />,
              label: "Career Trait",
              data: traits,
              choiceID: 15,
            },
            {
              icon: <FaMapMarkerAlt className="text-2xl text-pink-600" />,
              label: "Career Zone",
              data: zone,
              choiceID: 16,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3"
            >
              {item.icon}
              <div>
                <p className="text-gray-600 font-medium">{item.label}</p>
                <select
                  className="mt-1 p-1 w-full border rounded"
                  onChange={(e) =>
                    handleCareerChange(e.target.value, item.choiceID)
                  }
                >
                  <option value="">
                    Select a Career {item.label.split(" ")[1]}
                  </option>
                  {item.data.length > 0 &&
                    item.data.map((subitem, index) => (
                      <option value={subitem.mastID} key={index}>
                        {subitem.option}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <div>
            Show
            <select
              className="mx-2 p-1 border rounded"
              value={recordsPerPage}
              onChange={(e) => {
                setRecordsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            entries
          </div>
          <div>
            Search:{" "}
            <input
              type="text"
              className="border rounded p-1 ml-2"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="border p-2 border w-[30%]">Occupations</th>
              <th className="border p-2">Ability</th>
              <th className="border p-2">Activity</th>
              <th className="border p-2">Knowledge</th>
              <th className="border p-2">Preference</th>
              <th className="border p-2">Skills</th>
              <th className="border p-2">Traits</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              currentRecords.map((record, index) => (
                <tr
                  key={index}
                  className={`border ${index % 2 == 0 ? "bg-gray-100" : ""}`}
                >
                  <td className="py-2 pl-2">{record.career}</td>
                  <td
                    onClick={() => {
                      fetchGraphData(record.code, 1);
                      setGraphRowTitle("Ability");
                      setGraphTableHeading(record.career);
                    }}
                  >
                    <div className=" flex items-center justify-center">
                      <FaEye />
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      fetchGraphData(record.code, 2);

                      setGraphRowTitle("Activity");
                    }}
                  >
                    <div className=" flex items-center justify-center">
                      <FaEye />
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      fetchGraphData(record.code, 6);
                      setGraphRowTitle("Knowledge");
                    }}
                  >
                    <div className=" flex items-center justify-center">
                      <FaEye />
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      fetchGraphData(record.code, 9);
                      setGraphRowTitle("Preference");
                    }}
                  >
                    <div className=" flex items-center justify-center">
                      <FaEye />
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      fetchGraphData(record.code, 11);
                      setGraphRowTitle("Skills");
                    }}
                  >
                    <div className=" flex items-center justify-center">
                      <FaEye />
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      fetchGraphData(record.code, 15);
                      setGraphRowTitle("Traits");
                    }}
                  >
                    <div className=" flex items-center justify-center">
                      <FaEye />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="9">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <p>
              Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
              {Math.min(currentPage * recordsPerPage, records.length)}
            </p>
          </div>
          <div>
            <button
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
              className="px-3 py-1 border rounded-lg"
            >
              &lt;&lt; Previous
            </button>
            {totalPages <= 5 ? (
              // Show all pages if totalPages is less than or equal to 5
              Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                    currentPage === index + 1 ? "bg-slate-500 text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              <>
                {/* First page */}
                <button
                  onClick={() => handlePageChange(1)}
                  className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                    currentPage === 1 ? "bg-slate-500 text-white" : ""
                  }`}
                >
                  1
                </button>

                {/* Second page */}
                {currentPage === 2 && (
                  <button
                    onClick={() => handlePageChange(2)}
                    className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                      currentPage === 2 ? "bg-slate-500 text-white" : ""
                    }`}
                  >
                    2
                  </button>
                )}

                {/* Ellipsis */}
                {currentPage > 3 && (
                  <span className="px-3 py-2 font-normal text-sm">...</span>
                )}

                {/* Current page */}
                {currentPage > 2 && currentPage < totalPages - 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage)}
                    className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white bg-slate-500 text-white`}
                  >
                    {currentPage}
                  </button>
                )}

                {/* Ellipsis for remaining pages */}
                {currentPage < totalPages - 2 && (
                  <span className="px-3 py-2 font-normal text-sm">...</span>
                )}
                {currentPage === totalPages - 1 && (
                  <button
                    onClick={() => handlePageChange(2)}
                    className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                      currentPage === totalPages - 1
                        ? "bg-slate-500 text-white"
                        : ""
                    }`}
                  >
                    {totalPages - 1}
                  </button>
                )}

                {/* Last page */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                    currentPage === totalPages ? "bg-slate-500 text-white" : ""
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              className="px-3 py-1 border rounded-lg"
            >
              Next &gt;&gt;
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-500">
        <p>Margdarshak ©</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:underline">
            Support
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CareerChoice;
