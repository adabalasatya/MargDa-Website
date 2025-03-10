import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaLink,
  FaClock,
  FaVideo,
} from "react-icons/fa";

const MeetingReport = () => {
  const [meetings, setMeetings] = useState([]);
  const [teamReport, setTeamReport] = useState([]);
  const [teamSummary, setTeamSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0]
  ); // Feb 6, 2025 (30 days ago from Mar 8, 2025)
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Mar 8, 2025
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  // Helper function to calculate duration
  const calculateDuration = (start, end) => {
    if (!start || !end) return "N/A";
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime - startTime;
    const minutes = Math.round(diffMs / 60000);
    return `${minutes} minutes`;
  };

  // Helper function to format join time
  const formatJoinTime = (start, end) => {
    if (!start || !end) return "N/A";
    const startTime = new Date(start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${startTime} - ${endTime}`;
  };

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://margda.in:7000/api/margda.org/report/meeting-report",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API Response:", data);

      // Extract Meetings array and sort by dateTime (latest first)
      const meetingsArray = data.Meetings || [];
      console.log("Meetings Array:", meetingsArray);

      const formattedMeetings = meetingsArray
        .map((meeting) => ({
          dateTime: meeting.edate || meeting.start_time || "N/A",
          meetType: meeting.source === "G" ? "Google Meet" : "Unknown",
          meetingLink: meeting.link_code || "N/A",
          host: meeting.euser ? `User ${meeting.euser}` : "N/A",
          client: meeting.invitees?.[0] || "N/A",
          joinTime: formatJoinTime(meeting.start_time, meeting.end_time),
          duration: calculateDuration(meeting.start_time, meeting.end_time),
          crm: meeting.crmID || "N/A",
          recordingLink: meeting.meet_video || "N/A", // Use meet_video or update if recording_link exists
        }))
        .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      console.log("Formatted Meetings (Sorted):", formattedMeetings);
      setMeetings(formattedMeetings);

      // Mock teamReport
      const uniqueHosts = [...new Set(formattedMeetings.map((m) => m.host))];
      const mockTeamReport = uniqueHosts.map((host) => ({
        associate: host,
        totalAligned: formattedMeetings.filter((m) => m.host === host).length,
        totalJoined: 0,
        totalOnboarded: 0,
      }));
      console.log("Team Report:", mockTeamReport);
      setTeamReport(mockTeamReport);

      // Mock teamSummary
      const mockTeamSummary = {
        topAligner: uniqueHosts[0]
          ? `${uniqueHosts[0]} - ${formattedMeetings.length}`
          : "N/A - 0",
        topJoiner: uniqueHosts[0] ? `${uniqueHosts[0]} - 0` : "N/A - 0",
        topOnboarder: uniqueHosts[0] ? `${uniqueHosts[0]} - 0` : "N/A - 0",
        topTeamBuilder: uniqueHosts[0]
          ? `${uniqueHosts[0]} - 0 + 0`
          : "N/A - 0 + 0",
        lowestAligner: uniqueHosts[uniqueHosts.length - 1]
          ? `${uniqueHosts[uniqueHosts.length - 1]} - 0`
          : "N/A - 0",
        lowestJoiner: uniqueHosts[uniqueHosts.length - 1]
          ? `${uniqueHosts[uniqueHosts.length - 1]} - 0`
          : "N/A - 0",
        lowestOnboarder: uniqueHosts[uniqueHosts.length - 1]
          ? `${uniqueHosts[uniqueHosts.length - 1]} - 0`
          : "N/A - 0",
        lowestTeamBuilder: uniqueHosts[uniqueHosts.length - 1]
          ? `${uniqueHosts[uniqueHosts.length - 1]} - 0 + 0`
          : "N/A - 0 + 0",
      };
      console.log("Team Summary:", mockTeamSummary);
      setTeamSummary(mockTeamSummary);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Failed to fetch meeting report data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
    } else {
      setError("Access token not found. Please log in again.");
      setLoading(false);
    }
  }, [accessToken]);

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Filtering
  const filteredMeetings = meetings.filter((meeting) => {
    const meetingDate = new Date(meeting.dateTime);
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const matchesDate = meetingDate >= start && meetingDate <= end;
    const matchesSearch =
      meeting.host?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.meetingLink?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDate && matchesSearch;
  });
  console.log("Filtered Meetings:", filteredMeetings);

  const currentFilteredRecords = filteredMeetings.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  console.log("Current Filtered Records:", currentFilteredRecords);
  console.log(
    `Pagination - Page: ${currentPage}, Records Per Page: ${recordsPerPage}, ` +
      `First Index: ${indexOfFirstRecord}, Last Index: ${indexOfLastRecord}, ` +
      `Total Filtered: ${filteredMeetings.length}`
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 text-blue-500">
        Loading meeting report data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No Meeting Report Available
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-blue-500">
          Meeting Report
        </h1>
        <div className="flex space-x-16 mb-4">
          <span className="text-lg font-semibold text-black-700">
            Your Meeting
          </span>
          <span className="text-lg font-semibold text-black-700">
            Team Report
          </span>
          <span className="text-lg font-semibold text-black-700">
            Team Summary
          </span>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          <span className="mr-4">From Date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          />
          <FaCalendarAlt className="mr-2 text-blue-500 ml-4" />
          <span className="mr-4">To Date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          />
          <FaSearch className="mr-2 text-blue-500 ml-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">Show</span>
            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="ml-2">records</span>
          </div>
          <div className="flex items-center">
            <FaSearch className="mr-2 text-blue-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                <th className="py-3 px-4 text-left font-semibold">
                  <FaCalendarAlt className="inline mr-2" />
                  Date-Time
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaUser className="inline mr-2" />
                  Meet Type
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaLink className="inline mr-2" />
                  Meeting Link
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaUser className="inline mr-2" />
                  Host
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaUser className="inline mr-2" />
                  Client
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaClock className="inline mr-2" />
                  Join Time
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaClock className="inline mr-2" />
                  Duration
                </th>
                <th className="py-3 px-4 text-left font-semibold">CRM</th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaVideo className="inline mr-2" />
                  View Recording
                </th>
              </tr>
            </thead>
            <tbody>
              {currentFilteredRecords.length > 0 ? (
                currentFilteredRecords.map((meeting, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {meeting.dateTime
                        ? new Date(meeting.dateTime).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {meeting.meetType || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      <a
                        href={meeting.meetingLink}
                        className="text-blue-500 hover:underline"
                      >
                        {meeting.meetingLink || "N/A"}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {meeting.host || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {meeting.client || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {meeting.joinTime || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {meeting.duration || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {meeting.crm || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {meeting.recordingLink &&
                      meeting.recordingLink !== "N/A" ? (
                        <a
                          href={meeting.recordingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View Recording
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="py-3 px-4 text-gray-500 text-center"
                  >
                    No Meeting Report Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span>
            Showing {indexOfFirstRecord + 1} to{" "}
            {Math.min(indexOfLastRecord, filteredMeetings.length)} of{" "}
            {filteredMeetings.length} records
          </span>
          <div className="inline-block">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {"<<"} Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastRecord >= filteredMeetings.length}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Next {">>"}
            </button>
          </div>
        </div>
      </div>

      {/* Team Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-500">
          Your Team's Meeting Report
        </h2>
        <div className="flex items-center mb-4">
          <FaUser className="mr-2 text-blue-500" />
          <span className="text-lg font-semibold text-gray-700">
            Associates
          </span>
          <span className="text-lg font-semibold text-gray-700 mx-4">List</span>
          <FaCalendarAlt className="mr-2 text-blue-500" />
          <span className="mr-4">From Date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          />
          <FaCalendarAlt className="mr-2 text-blue-500 ml-4" />
          <span className="mr-4">To Date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          />
          <FaSearch className="mr-2 text-blue-500 ml-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                <th className="py-3 px-4 text-left font-semibold">
                  <FaUser className="inline mr-2" />
                  Associates
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Total Aligned
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Total Joined
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Total Onboarded
                </th>
              </tr>
            </thead>
            <tbody>
              {teamReport.length > 0 ? (
                teamReport.map((report, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {report.associate || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {report.totalAligned || 0}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {report.totalJoined || 0}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {report.totalOnboarded || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-3 px-4 text-gray-500 text-center"
                  >
                    No Meeting Report Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Summary Section */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            <span className="mr-4">From Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
            />
            <FaCalendarAlt className="mr-2 text-blue-500 ml-4" />
            <span className="mr-4">To Date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
            />
            <FaSearch className="mr-2 text-blue-500 ml-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-blue-500" />
            Team’s Meeting Summary
          </h3>

          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                  <th className="py-3 px-4 text-left font-semibold">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Team Member
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(teamSummary).length > 0 ? (
                  [
                    {
                      icon: FaUser,
                      color: "blue-500",
                      label: "Top Aligner",
                      detail: teamSummary.topAligner,
                    },
                    {
                      icon: FaUser,
                      color: "blue-500",
                      label: "Top Joiner",
                      detail: teamSummary.topJoiner,
                    },
                    {
                      icon: FaUser,
                      color: "blue-500",
                      label: "Top On-boarder",
                      detail: teamSummary.topOnboarder,
                    },
                    {
                      icon: FaUser,
                      color: "blue-500",
                      label: "Top Team Builder",
                      detail: teamSummary.topTeamBuilder,
                    },
                    {
                      icon: FaUser,
                      color: "blue-500",
                      label: "Lowest Aligner",
                      detail: teamSummary.lowestAligner,
                    },
                    {
                      icon: FaUser,
                      color: "blue-500",
                      label: "Lowest Joiner",
                      detail: teamSummary.lowestJoiner,
                    },
                    {
                      icon: FaUser,
                      color: "blue-500",
                      label: "Lowest On-boarder",
                      detail: teamSummary.lowestOnboarder,
                    },
                    {
                      icon: FaUser,
                      color: "blue-500",
                      label: "Lowest Team Builder",
                      detail: teamSummary.lowestTeamBuilder,
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition-colors duration-200`}
                    >
                      <td className="py-3 px-4 flex items-center text-gray-700">
                        <item.icon
                          className={`h-5 w-5 mr-2 text-${item.color}`}
                        />
                        {item.label}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {item.detail?.split(" - ")[0] || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {item.detail?.split(" - ")[1] || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-3 px-4 text-gray-500 text-center"
                    >
                      No Meeting Report Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetingReport;
