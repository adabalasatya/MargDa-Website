import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import {
  FaSearch,
  FaCalendarAlt,
  FaPhone,
  FaUser,
  FaClock,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const CallReport = () => {
  const [calls, setCalls] = useState([]);
  const [allCalls, setAllCalls] = useState([]);
  const [teamReport, setTeamReport] = useState([]);
  const [teamSummary, setTeamSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchQuery, setSearchQuery] = useState("");

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://margda.in:7000/api/margda.org/report/call-report",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              startDate,
              endDate,
              searchQuery,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data && data.Calls) {
          const sortedCalls = data.Calls.sort(
            (a, b) => new Date(b.call_start) - new Date(a.call_start)
          ).map(call => ({
            ...call,
            timestamp: call.call_start || null,
            dateTime: call.call_start
              ? new Date(call.call_start).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "N/A",
          }));
          setCalls(sortedCalls);
          setAllCalls(sortedCalls);

          // Team report logic
          const outgoingCalls = sortedCalls.filter(
            (call) => call.calltype === "O"
          );
          const incomingCalls = sortedCalls.filter(
            (call) => call.calltype === "I"
          );

          const totalOutgoingCalls = outgoingCalls.length;
          const totalIncomingCalls = incomingCalls.length;

          const totalOutgoingTalkTime = outgoingCalls.reduce(
            (sum, call) => sum + call.duration,
            0
          );
          const totalIncomingTalkTime = incomingCalls.reduce(
            (sum, call) => sum + call.duration,
            0
          );

          const averageOutgoingTalkTime =
            totalOutgoingCalls > 0
              ? (totalOutgoingTalkTime / totalOutgoingCalls).toFixed(2)
              : 0;
          const averageIncomingTalkTime =
            totalIncomingCalls > 0
              ? (totalIncomingTalkTime / totalIncomingCalls).toFixed(2)
              : 0;

          const teamReportData = [
            {
              callType: "Outgoing",
              totalCalls: totalOutgoingCalls,
              totalTalkTime: totalOutgoingTalkTime,
              averageTime: averageOutgoingTalkTime,
            },
            {
              callType: "Incoming",
              totalCalls: totalIncomingCalls,
              totalTalkTime: totalIncomingTalkTime,
              averageTime: averageIncomingTalkTime,
            },
          ];
          setTeamReport(teamReportData);

          // Team summary logic
          const callerStats = {};
          const receiverStats = {};

          sortedCalls.forEach((call) => {
            if (call.calltype === "O") {
              if (!callerStats[call.caller]) {
                callerStats[call.caller] = {
                  totalCalls: 0,
                  totalTalkTime: 0,
                  details: call.details,
                };
              }
              callerStats[call.caller].totalCalls += 1;
              callerStats[call.caller].totalTalkTime += call.duration;
            }

            if (call.calltype === "I") {
              if (!receiverStats[call.receiver]) {
                receiverStats[call.receiver] = {
                  totalCalls: 0,
                  totalTalkTime: 0,
                  details: call.details,
                };
              }
              receiverStats[call.receiver].totalCalls += 1;
              receiverStats[call.receiver].totalTalkTime += call.duration;
            }
          });

          const topCaller = Object.keys(callerStats).reduce((a, b) =>
            callerStats[a].totalCalls > callerStats[b].totalCalls ? a : b
          );
          const lowestCaller = Object.keys(callerStats).reduce((a, b) =>
            callerStats[a].totalCalls < callerStats[b].totalCalls ? a : b
          );

          const topReceiver = Object.keys(receiverStats).reduce((a, b) =>
            receiverStats[a].totalCalls > receiverStats[b].totalCalls ? a : b
          );
          const lowestReceiver = Object.keys(receiverStats).reduce((a, b) =>
            receiverStats[a].totalCalls < receiverStats[b].totalCalls ? a : b
          );

          const topTalkerOutgoing = Object.keys(callerStats).reduce((a, b) =>
            callerStats[a].totalTalkTime > callerStats[b].totalTalkTime ? a : b
          );
          const lowestTalkerOutgoing = Object.keys(callerStats).reduce((a, b) =>
            callerStats[a].totalTalkTime < callerStats[b].totalTalkTime ? a : b
          );

          const topTalkerIncoming = Object.keys(receiverStats).reduce((a, b) =>
            receiverStats[a].totalTalkTime > receiverStats[b].totalTalkTime ? a : b
          );
          const lowestTalkerIncoming = Object.keys(receiverStats).reduce((a, b) =>
            receiverStats[a].totalTalkTime < receiverStats[b].totalTalkTime ? a : b
          );

          const teamSummaryData = {
            topCaller: {
              name: topCaller,
              details: callerStats[topCaller]?.details || "No details",
            },
            topReceiver: {
              name: topReceiver,
              details: receiverStats[topReceiver]?.details || "No details",
            },
            topTalkerOutgoing: {
              name: topTalkerOutgoing,
              details: callerStats[topTalkerOutgoing]?.details || "No details",
            },
            topTalkerIncoming: {
              name: topTalkerIncoming,
              details: receiverStats[topTalkerIncoming]?.details || "No details",
            },
            lowestCaller: {
              name: lowestCaller,
              details: callerStats[lowestCaller]?.details || "No details",
            },
            lowestReceiver: {
              name: lowestReceiver,
              details: receiverStats[lowestReceiver]?.details || "No details",
            },
            lowestTalkerOutgoing: {
              name: lowestTalkerOutgoing,
              details: callerStats[lowestTalkerOutgoing]?.details || "No details",
            },
            lowestTalkerIncoming: {
              name: lowestTalkerIncoming,
              details: receiverStats[lowestTalkerIncoming]?.details || "No details",
            },
          };
          setTeamSummary(teamSummaryData);
        } else {
          setCalls([]);
          setAllCalls([]);
          setTeamReport([]);
          setTeamSummary({});
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to fetch Call report data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    } else {
      setError("Access token not found. Please log in again.");
      setLoading(false);
    }
  }, [accessToken]);

  function filterByDateRange(data, startDate, endDate, searchQuery) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    start.setHours(23, 59, 59, 999);
    return data.filter((item) => {
      const itemTimestamp = new Date(item.timestamp);
      return (
        itemTimestamp >= start &&
        itemTimestamp <= end &&
        ((item.caller && item.caller.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.receiver && item.receiver.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    });
  }

  useEffect(() => {
    setCurrentPage(1);
    const data = filterByDateRange(allCalls, startDate, endDate, searchQuery);
    setCalls(data);
  }, [startDate, endDate, searchQuery]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = calls.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-orange-500">Loading Call report data...</div>
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

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-black-500">Call Report</h1>
        <div className="flex space-x-16 mb-4">
          <span className="text-lg font-semibold text-black-700">Your Calls</span>
          <span className="text-lg font-semibold text-black-700">Team Report</span>
          <span className="text-lg font-semibold text-black-700">Team Summary</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="mr-2 text-gray-500" />
          <span className="mr-4">From Date</span>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
          <FaCalendarAlt className="mr-2 text-gray-500 ml-4" />
          <span className="mr-4">To Date</span>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
          <FaSearch className="mr-2 text-gray-500 ml-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">Show</span>
            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="ml-2">records</span>
          </div>
          <div className="flex items-center">
            <FaSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left font-semibold">Date-Time</th>
                <th className="py-3 px-4 text-left font-semibold">Call Type</th>
                <th className="py-3 px-4 text-left font-semibold">Caller</th>
                <th className="py-3 px-4 text-left font-semibold">Receiver</th>
                <th className="py-3 px-4 text-left font-semibold">Duration</th>
                <th className="py-3 px-4 text-left font-semibold">Record</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((call, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 text-black-700">{call.dateTime}</td>
                    <td className="py-3 px-4 text-black-700">{call.calltype}</td>
                    <td className="py-3 px-4 text-black-700">{call.caller}</td>
                    <td className="py-3 px-4 text-black-700">{call.receiver}</td>
                    <td className="py-3 px-4 text-black-700">{call.duration}</td>
                    <td className="py-3 px-4 text-black-700">
                      {call.call_url &&
                      call.call_url.startsWith("https://cloud") ? (
                        <ReactAudioPlayer
                          src={call.call_url}
                          controls
                          onError={(e) => console.error("Error playing audio:", e)}
                        />
                      ) : call.call_url &&
                        call.call_url.startsWith("https://drive") ? (
                        <div className="flex items-center justify-center">
                          <iframe
                            width="100%"
                            height="60"
                            className="rounded-lg border-2 border-slate-500 shadow-md"
                            sandbox="allow-same-origin allow-scripts allow-presentation"
                            src={call.call_url.split("view")[0] + "preview"}
                          ></iframe>
                        </div>
                      ) : (
                        "No recording"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No call records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span>
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, calls.length)} of {calls.length} records
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {"<<"} Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastRecord >= calls.length}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Next {">>"}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black-500">Your Team's Call Report</h2>
        <div className="flex items-center mb-4">
          <FaUser className="mr-2 text-blue-500" />
          <span className="text-lg font-semibold text-gray-700">Associates</span>
          <span className="text-lg font-semibold text-gray-700 mx-4">List</span>
          <FaCalendarAlt className="mr-2 text-gray-500" />
          <span className="mr-4">From Date</span>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
          <FaCalendarAlt className="mr-2 text-gray-500 ml-4" />
          <span className="mr-4">To Date</span>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
          <FaSearch className="mr-2 text-gray-500 ml-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left font-semibold">Call Type</th>
                <th className="py-3 px-4 text-left font-semibold">Total Calls</th>
                <th className="py-3 px-4 text-left font-semibold">Total Talk Time</th>
                <th className="py-3 px-4 text-left font-semibold">Average Time</th>
              </tr>
            </thead>
            <tbody>
              {teamReport.map((report, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="py-3 px-4 text-black-700">{report.callType}</td>
                  <td className="py-3 px-4 text-black-700">{report.totalCalls}</td>
                  <td className="py-3 px-4 text-black-700">{report.totalTalkTime}</td>
                  <td className="py-3 px-4 text-black-700">{report.averageTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-blue-500" />
            Team’s Call Summary
          </h3>

          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-4 text-left font-semibold">Category</th>
                  <th className="py-3 px-4 text-left font-semibold">Team Member</th>
                  <th className="py-3 px-4 text-left font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { icon: FaArrowUp, color: "gray-500", label: "Top Caller", detail: teamSummary.topCaller?.name, details: teamSummary.topCaller?.details },
                  { icon: FaArrowUp, color: "gray-500", label: "Top Receiver", detail: teamSummary.topReceiver?.name, details: teamSummary.topReceiver?.details },
                  { icon: FaArrowUp, color: "gray-500", label: "Top Talker (Outgoing)", detail: teamSummary.topTalkerOutgoing?.name, details: teamSummary.topTalkerOutgoing?.details },
                  { icon: FaArrowUp, color: "gray-500", label: "Top Talker (Incoming)", detail: teamSummary.topTalkerIncoming?.name, details: teamSummary.topTalkerIncoming?.details },
                  { icon: FaArrowDown, color: "gray-500", label: "Lowest Caller", detail: teamSummary.lowestCaller?.name, details: teamSummary.lowestCaller?.details },
                  { icon: FaArrowDown, color: "gray-500", label: "Lowest Receiver", detail: teamSummary.lowestReceiver?.name, details: teamSummary.lowestReceiver?.details },
                  { icon: FaArrowDown, color: "gray-500", label: "Lowest Talker (Outgoing)", detail: teamSummary.lowestTalkerOutgoing?.name, details: teamSummary.lowestTalkerOutgoing?.details },
                  { icon: FaArrowDown, color: "gray-500", label: "Lowest Talker (Incoming)", detail: teamSummary.lowestTalkerIncoming?.name, details: teamSummary.lowestTalkerIncoming?.details },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 flex items-center text-gray-700">
                      <item.icon className={`h-5 w-5 mr-2 text-${item.color}`} />
                      {item.label}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.detail}</td>
                    <td className="py-3 px-4 text-gray-700">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallReport;