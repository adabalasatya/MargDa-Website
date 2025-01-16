import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaPhone,
  FaUser,
  FaClock,
  FaArrowDown,
  FaArrowUp,
  FaPlay,
  FaPause,
  FaStop,
} from 'react-icons/fa';

const CallReport = () => {
  const [calls, setCalls] = useState([]);
  const [teamReport, setTeamReport] = useState([]);
  const [teamSummary, setTeamSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingAudio, setPlayingAudio] = useState(null);
  const [playbackStates, setPlaybackStates] = useState({});

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch('https://margda.in:7000/api/margda.org/report/call-report', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
            searchQuery: searchQuery
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data && data.Calls) {
          // Sort calls in decreasing order of date
          const sortedCalls = data.Calls.sort((a, b) => new Date(b.call_start) - new Date(a.call_start));
          setCalls(sortedCalls);

          const outgoingCalls = sortedCalls.filter(call => call.calltype === 'O');
          const incomingCalls = sortedCalls.filter(call => call.calltype === 'I');

          const totalOutgoingCalls = outgoingCalls.length;
          const totalIncomingCalls = incomingCalls.length;

          const totalOutgoingTalkTime = outgoingCalls.reduce((sum, call) => sum + call.duration, 0);
          const totalIncomingTalkTime = incomingCalls.reduce((sum, call) => sum + call.duration, 0);

          const averageOutgoingTalkTime = totalOutgoingCalls > 0 ? (totalOutgoingTalkTime / totalOutgoingCalls).toFixed(2) : 0;
          const averageIncomingTalkTime = totalIncomingCalls > 0 ? (totalIncomingTalkTime / totalIncomingCalls).toFixed(2) : 0;

          const teamReportData = [
            { callType: 'Outgoing', totalCalls: totalOutgoingCalls, totalTalkTime: totalOutgoingTalkTime, averageTime: averageOutgoingTalkTime },
            { callType: 'Incoming', totalCalls: totalIncomingCalls, totalTalkTime: totalIncomingTalkTime, averageTime: averageIncomingTalkTime },
          ];
          setTeamReport(teamReportData);

          const callerStats = {};
          const receiverStats = {};

          sortedCalls.forEach(call => {
            if (call.calltype === 'O') {
              if (!callerStats[call.caller]) {
                callerStats[call.caller] = { totalCalls: 0, totalTalkTime: 0 };
              }
              callerStats[call.caller].totalCalls += 1;
              callerStats[call.caller].totalTalkTime += call.duration;
            }

            if (call.calltype === 'I') {
              if (!receiverStats[call.receiver]) {
                receiverStats[call.receiver] = { totalCalls: 0, totalTalkTime: 0 };
              }
              receiverStats[call.receiver].totalCalls += 1;
              receiverStats[call.receiver].totalTalkTime += call.duration;
            }
          });

          const topCaller = Object.keys(callerStats).reduce((a, b) => callerStats[a].totalCalls > callerStats[b].totalCalls ? a : b);
          const lowestCaller = Object.keys(callerStats).reduce((a, b) => callerStats[a].totalCalls < callerStats[b].totalCalls ? a : b);

          const topReceiver = Object.keys(receiverStats).reduce((a, b) => receiverStats[a].totalCalls > receiverStats[b].totalCalls ? a : b);
          const lowestReceiver = Object.keys(receiverStats).reduce((a, b) => receiverStats[a].totalCalls < receiverStats[b].totalCalls ? a : b);

          const topTalkerOutgoing = Object.keys(callerStats).reduce((a, b) => callerStats[a].totalTalkTime > callerStats[b].totalTalkTime ? a : b);
          const lowestTalkerOutgoing = Object.keys(callerStats).reduce((a, b) => callerStats[a].totalTalkTime < callerStats[b].totalTalkTime ? a : b);

          const topTalkerIncoming = Object.keys(receiverStats).reduce((a, b) => receiverStats[a].totalTalkTime > receiverStats[b].totalTalkTime ? a : b);
          const lowestTalkerIncoming = Object.keys(receiverStats).reduce((a, b) => receiverStats[a].totalTalkTime < receiverStats[b].totalTalkTime ? a : b);

          const teamSummaryData = {
            topCaller,
            topReceiver,
            topTalkerOutgoing,
            topTalkerIncoming,
            lowestCaller,
            lowestReceiver,
            lowestTalkerOutgoing,
            lowestTalkerIncoming,
          };
          setTeamSummary(teamSummaryData);
        } else {
          setCalls([]);
          setTeamReport([]);
          setTeamSummary({});
        }

      } catch (err) {
        setError(`Failed to fetch call report data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    } else {
      setError('Access token not found. Please log in again.');
      setLoading(false);
    }
  }, [accessToken, startDate, endDate, searchQuery]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = calls.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setCurrentPage(1);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setCurrentPage(1);
  };

  const handlePlayPause = (url, callId) => {
    if (playingAudio && playingAudio.src === url) {
      playingAudio.pause();
      setPlayingAudio(null);
    } else {
      if (playingAudio) {
        playingAudio.pause();
      }

      const audio = new Audio(url);
      audio.play();

      audio.addEventListener('timeupdate', () => {
        setPlaybackStates((prevStates) => ({
          ...prevStates,
          [callId]: {
            ...prevStates[callId],
            currentTime: audio.currentTime,
          },
        }));
      });

      audio.addEventListener('loadedmetadata', () => {
        setPlaybackStates((prevStates) => ({
          ...prevStates,
          [callId]: {
            ...prevStates[callId],
            duration: audio.duration,
          },
        }));
      });

      setPlayingAudio(audio);
    }
  };

  const handleStop = (callId) => {
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0; // Reset playback to the beginning
      setPlayingAudio(null);
    }

    // Reset the playback state for the specific call
    setPlaybackStates((prevStates) => ({
      ...prevStates,
      [callId]: {
        ...prevStates[callId],
        currentTime: 0,
      },
    }));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formatDateTimeIST = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-orange-500">Loading call report data...</div>
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
        <h1 className="text-2xl font-bold mb-4 text-orange-500">Call Report</h1>
        
        <div className="flex items-center mb-4 space-x-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-orange-500" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-orange-500" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleEndDateChange(e.target.value)}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          
          <div className="flex items-center">
            <FaSearch className="mr-2 text-orange-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
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
            <span className="ml-2">Records</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                <th className="py-3 px-4 text-left font-semibold">
                  <FaCalendarAlt className="inline mr-2" />Date-Time
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaPhone className="inline mr-2" />Call Type
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaUser className="inline mr-2" />Caller
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaUser className="inline mr-2" />Receiver
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  <FaClock className="inline mr-2" />Duration
                </th>
                <th className="py-3 px-4 text-left font-semibold">Record</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((call, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-orange-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 text-gray-700">{formatDateTimeIST(call.call_start)}</td>
                    <td className="py-3 px-4 text-gray-700">{call.calltype}</td>
                    <td className="py-3 px-4 text-gray-700">{call.caller}</td>
                    <td className="py-3 px-4 text-gray-700">{call.receiver}</td>
                    <td className="py-3 px-4 text-gray-700">{call.duration}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {call.call_url ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePlayPause(call.call_url, call.id || index)}
                            className="text-orange-500 hover:text-orange-600"
                          >
                            {playingAudio && playingAudio.src === call.call_url ? (
                              <FaPause className="inline" />
                            ) : (
                              <FaPlay className="inline" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{
                                  width: `${((playbackStates[call.id || index]?.currentTime || 0) / (playbackStates[call.id || index]?.duration || 1)) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatTime(playbackStates[call.id || index]?.currentTime || 0)} / {formatTime(playbackStates[call.id || index]?.duration || 0)}
                            </div>
                          </div>
                          <button
                            onClick={() => handleStop(call.id || index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FaStop className="inline" />
                          </button>
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
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastRecord >= calls.length}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Your Team's Call Report</h2>
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                <th className="py-3 px-4 text-left font-semibold">
                  <FaPhone className="inline mr-2" />Call Type
                </th>
                <th className="py-3 px-4 text-left font-semibold">Total Calls</th>
                <th className="py-3 px-4 text-left font-semibold">Total Talk Time</th>
                <th className="py-3 px-4 text-left font-semibold">Average Time</th>
              </tr>
            </thead>
            <tbody>
              {teamReport.map((report, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4 text-gray-700">{report.callType}</td>
                  <td className="py-3 px-4 text-gray-700">{report.totalCalls}</td>
                  <td className="py-3 px-4 text-gray-700">{report.totalTalkTime}</td>
                  <td className="py-3 px-4 text-gray-700">{report.averageTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-orange-500" />
            Team’s Call Summary
          </h3>

          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                  <th className="py-3 px-4 text-left font-semibold">Category</th>
                  <th className="py-3 px-4 text-left font-semibold">Team Member</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { icon: FaArrowUp, color: "orange-500", label: "Top Caller", detail: teamSummary.topCaller },
                  { icon: FaArrowUp, color: "orange-500", label: "Top Receiver", detail: teamSummary.topReceiver },
                  { icon: FaArrowUp, color: "orange-500", label: "Top Talker (Outgoing)", detail: teamSummary.topTalkerOutgoing },
                  { icon: FaArrowUp, color: "orange-500", label: "Top Talker (Incoming)", detail: teamSummary.topTalkerIncoming },
                  { icon: FaArrowDown, color: "orange-500", label: "Lowest Caller", detail: teamSummary.lowestCaller },
                  { icon: FaArrowDown, color: "orange-500", label: "Lowest Receiver", detail: teamSummary.lowestReceiver },
                  { icon: FaArrowDown, color: "orange-500", label: "Lowest Talker (Outgoing)", detail: teamSummary.lowestTalkerOutgoing },
                  { icon: FaArrowDown, color: "orange-500", label: "Lowest Talker (Incoming)", detail: teamSummary.lowestTalkerIncoming },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-orange-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 flex items-center text-gray-700">
                      <item.icon className={`h-5 w-5 mr-2 text-${item.color}`} />
                      {item.label}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.detail}</td>
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