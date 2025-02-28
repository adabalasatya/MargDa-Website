import React, { useState, useEffect, useCallback } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaPaperPlane,
  FaReply,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const SMSReport = () => {
  // State variables
  const [messages, setMessages] = useState([]);
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
  const [isReplyPopUpOpen, setIsReplyPopUpOpen] = useState(false);
  const [replyData, setReplyData] = useState({
    receiver: "",
    message: "",
    simApi: "SIM",
  });

  // Fetch access token from localStorage
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  // Function to calculate team report from Sms data
  const calculateTeamReport = (smsData) => {
    if (!smsData || !Array.isArray(smsData)) return [];

    const senderMap = new Map();
    smsData.forEach((message) => {
      const sender = message.umobile || message.euser || "Unknown";
      if (!senderMap.has(sender)) {
        senderMap.set(sender, {
          associate: sender,
          totalSent: 0,
          totalUnreplied: 0,
          maxDelay: "0h",
        });
      }
      senderMap.get(sender).totalSent += 1;
    });

    return Array.from(senderMap.values());
  };

  // Function to calculate team summary from team report
  const calculateTeamSummary = (teamReport) => {
    if (!teamReport || !Array.isArray(teamReport) || teamReport.length === 0) {
      return {
        topSender: "N/A",
        topSenderMember: "N/A",
        topReplier: "N/A",
        topReplierMember: "N/A",
        topNeglecter: "N/A",
        topNeglecterMember: "N/A",
        topDelayer: "N/A",
        topDelayerMember: "N/A",
        lowestSender: "N/A",
        lowestSenderMember: "N/A",
      };
    }

    const topSender = teamReport.reduce((prev, current) =>
      prev.totalSent > current.totalSent ? prev : current
    );

    const topDelayer = teamReport.reduce((prev, current) =>
      parseFloat(prev.maxDelay) > parseFloat(current.maxDelay) ? prev : current
    );

    const lowestSender = teamReport.reduce((prev, current) =>
      prev.totalSent < current.totalSent ? prev : current
    );

    return {
      topSender: `${topSender.totalSent} SMS`,
      topSenderMember: topSender.associate || "N/A",
      topReplier: "N/A",
      topReplierMember: "N/A",
      topNeglecter: "N/A",
      topNeglecterMember: "N/A",
      topDelayer: `${topDelayer.maxDelay} hours`,
      topDelayerMember: topDelayer.associate || "N/A",
      lowestSender: `${lowestSender.totalSent} SMS`,
      lowestSenderMember: lowestSender.associate || "N/A",
    };
  };

  // Function to filter messages by date range and search query
  const filterByDateRange = (data, startDate, endDate, searchQuery) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    start.setHours(0, 0, 0, 0);
    return data.filter((item) => {
      const itemTimestamp = new Date(item.dateTime);
      return (
        itemTimestamp >= start &&
        itemTimestamp <= end &&
        (
          (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.mobile && item.mobile.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    });
  };

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced function to handle search
  const handleSearchDebounced = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setCurrentPage(1); // Reset pagination
    }, 300), // 300ms delay
    []
  );

  // Function to fetch and update data
  const fetchAndUpdateData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://margda.in:7000/api/margda.org/report/sms-report",
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
        const errorData = await response.json();
        throw new Error(
          errorData.message || `API responded with status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.Sms && Array.isArray(data.Sms)) {
        let transformedMessages = data.Sms.map((message) => ({
          incomingOutgoing: message.I_O === "I" ? "Incoming" : "Outgoing",
          name: message.mobile || "N/A",
          mobile: message.mobile || "N/A",
          message: message.message || "N/A",
          dateTime: message.edate
            ? new Date(message.edate).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "N/A",
          simApi: message.source === "S" ? "SIM" : "API",
          crm: message.crmID || "N/A",
          sender: message.sender || "Unknown",
        }));

        transformedMessages = filterByDateRange(transformedMessages, startDate, endDate, searchQuery);
        setMessages(transformedMessages);

        const calculatedTeamReport = calculateTeamReport(transformedMessages);
        setTeamReport(calculatedTeamReport);

        const calculatedTeamSummary = calculateTeamSummary(calculatedTeamReport);
        setTeamSummary(calculatedTeamSummary);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Failed to fetch SMS report data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [accessToken, startDate, endDate, searchQuery]);

  // Use effect to fetch data when dependencies change
  useEffect(() => {
    if (accessToken) {
      fetchAndUpdateData();
    } else {
      setError("Access token not found. Please log in again.");
      setLoading(false);
    }
  }, [accessToken, startDate, endDate, searchQuery, fetchAndUpdateData]);

  // Handle search input change
  const handleSearch = (e) => {
    handleSearchDebounced(e.target.value);
  };

  // Handle date input changes
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setCurrentPage(1); // Reset pagination
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setCurrentPage(1); // Reset pagination
  };

  // Handle reply functionality
  const handleReply = (mobile) => {
    setReplyData({
      receiver: mobile,
      message: "",
      simApi: "SIM",
    });
    setIsReplyPopUpOpen(true);
  };

  // Handle send message
  const handleSendMessage = () => {
    console.log("Sending message:", replyData);
    setIsReplyPopUpOpen(false);
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = messages.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-orange-500">Loading SMS report data...</div>
      </div>
    );
  }

  // Error state
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
      {/* SMS Report Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-black-500">SMS Report</h1>
        <div className="flex space-x-16 mb-4">
          <span className="text-lg font-semibold text-black-700">
            Your SMS
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
            onChange={handleSearch}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Table for SMS Messages */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left font-semibold">
                  Incoming/Outgoing
                </th>
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Mobile</th>
                <th className="py-3 px-4 text-left font-semibold">Message</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Date + Time Stamp
                </th>
                <th className="py-3 px-4 text-left font-semibold">SIM+API</th>
                <th className="py-3 px-4 text-left font-semibold">CRM+</th>
                <th className="py-3 px-4 text-left font-semibold">Reply</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((message, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="py-3 px-4 text-black-700">
                    {message.incomingOutgoing}
                  </td>
                  <td className="py-3 px-4 text-black-700">{message.name}</td>
                  <td className="py-3 px-4 text-black-700">{message.mobile}</td>
                  <td className="py-3 px-4 text-black-700">{message.message}</td>
                  <td className="py-3 px-4 text-black-700">
                    {message.dateTime}
                  </td>
                  <td className="py-3 px-4 text-black-700">{message.simApi}</td>
                  <td className="py-3 px-4 text-black-700">{message.crm}</td>
                  <td className="py-3 px-4 text-black-700">
                    <button
                      onClick={() => handleReply(message.mobile)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaReply />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <span>
            Showing {indexOfFirstRecord + 1} to{" "}
            {Math.min(indexOfLastRecord, messages.length)} of {messages.length}{" "}
            records
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
              disabled={indexOfLastRecord >= messages.length}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Next {">>"}
            </button>
          </div>
        </div>
      </div>

      {/* Team Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black-500">
          Your Team's SMS Report
        </h2>

        <div className="flex items-center mb-4">
          <FaUser className="mr-2 text-blue-500" />
          <span className="text-lg font-semibold text-gray-700">
            Associates
          </span>
          <span className="text-lg font-semibold text-gray-700 mx-4">
            List
          </span>
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
            onChange={handleSearch}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left font-semibold">
                  <FaUser className="inline mr-2" />
                  Associates
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Total Sent
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Total Un-replied
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Maximum Delays
                </th>
              </tr>
            </thead>
            <tbody>
              {teamReport.map((report, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="py-3 px-4 text-black-700">
                    {report.associate}
                  </td>
                  <td className="py-3 px-4 text-black-700">
                    {report.totalSent}
                  </td>
                  <td className="py-3 px-4 text-black-700">
                    {report.totalUnreplied}
                  </td>
                  <td className="py-3 px-4 text-black-700">{report.maxDelay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Summary Section */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-blue-500" />
            Team’s SMS Summary
          </h3>

          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-blue-500 text-white">
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
                {[
                  {
                    icon: FaPaperPlane,
                    color: "green-500",
                    label: "Top Sender",
                    detail: teamSummary.topSender,
                  },
                  {
                    icon: FaReply,
                    color: "blue-500",
                    label: "Top Replier",
                    detail: teamSummary.topReplier,
                  },
                  {
                    icon: FaTimesCircle,
                    color: "red-500",
                    label: "Top Neglecter",
                    detail: teamSummary.topNeglecter,
                  },
                  {
                    icon: FaClock,
                    color: "yellow-500",
                    label: "Top Delayer",
                    detail: teamSummary.topDelayer,
                  },
                  {
                    icon: FaPaperPlane,
                    color: "gray-500",
                    label: "Lowest Sender",
                    detail: teamSummary.lowestSender,
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
                      {teamSummary[
                        `${item.label.replace(/\s+/g, "").toLowerCase()}Member`
                      ] || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reply Pop-Up */}
      {isReplyPopUpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Reply to Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Receiver
                </label>
                <input
                  type="text"
                  value={replyData.receiver}
                  readOnly
                  className="mt-1 p-2 border rounded w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  value={replyData.message}
                  onChange={(e) =>
                    setReplyData({ ...replyData, message: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full focus:border-orange-500 focus:ring-orange-500"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Send Via
                </label>
                <select
                  value={replyData.simApi}
                  onChange={(e) =>
                    setReplyData({ ...replyData, simApi: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="SIM">SIM</option>
                  <option value="API">API</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsReplyPopUpOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SMSReport;