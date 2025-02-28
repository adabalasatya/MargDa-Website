import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaPaperPlane,
  FaReply,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const WhatsAppReport = () => {
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
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

  // State for the reply modal
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyMobile, setReplyMobile] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyMethod, setReplyMethod] = useState("SIM"); // Default to SIM

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://margda.in:7000/api/margda.org/report/whatsapp-report",
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

        // Transform API data for messages table
        if (data.Chats && Array.isArray(data.Chats)) {
          const transformedMessages = data.Chats.map((chat) => ({
            incomingOutgoing: chat.I_O === "I" ? "Incoming" : "Outgoing", // Map I_O to Incoming/Outgoing
            name: chat.sender || chat.sender || "N/A",
            mobile: chat.receiver || "N/A",
            message: chat.message || "N/A",
            timestamp: chat.edate || null,
            dateTime: chat.edate
              ? new Date(chat.edate).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "N/A",
            scanApi: chat.source === "S" ? "SIM" : "API", // Map source to SIM/API
            crm: chat.crmID || "N/A", // Use crmID or default to "N/A"
          }));
          setMessages(transformedMessages);
          setAllMessages(transformedMessages);
        }

        // Mock team report data (replace with actual data when available)
        const uniqueSenders = [
          ...new Set(data.Chats.map((chat) => chat.sender)),
        ];
        const mockTeamReport = uniqueSenders.map((sender) => ({
          associate: sender,
          totalSent: data.Chats.filter((chat) => chat.sender === sender).length,
          totalUnreplied: 0,
          maxDelay: "0h",
        }));
        setTeamReport(mockTeamReport);

        // Mock team summary data (replace with actual data when available)
        setTeamSummary({
          topSender: data.Chats.length + " messages",
          topSenderMember: uniqueSenders[0] || "N/A",
          topReplier: "0 replies",
          topReplierMember: "N/A",
          topNeglecter: "0 unreplied",
          topNeglecterMember: "N/A",
          topDelayer: "0h average",
          topDelayerMember: "N/A",
          lowestSender: "0 messages",
          lowestSenderMember: uniqueSenders[uniqueSenders.length - 1] || "N/A",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to fetch WhatsApp report data: ${err.message}`);
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
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = messages.slice(indexOfFirstRecord, indexOfLastRecord);

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
  function filterByDateRange(data, startDate, endDate, searchQuery) {
    const start = new Date(startDate); // Start of the day (00:00:00)
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // End of the day (23:59:59.999)
    start.setHours(23, 59, 59, 999);
    return data.filter((item) => {
      const itemTimestamp = new Date(item.timestamp); // Convert to Date object
      return (
        itemTimestamp >= start &&
        itemTimestamp <= end &&
        ((item.name && item.name.includes(searchQuery)) ||
          (item.mobile && item.mobile.includes(searchQuery)) ||
          (item.message && item.message.includes(searchQuery)))
      );
    });
  }
  useEffect(() => {
    setCurrentPage(1);
    const data = filterByDateRange(
      allMessages,
      startDate,
      endDate,
      searchQuery
    );
    setMessages(data);
  }, [startDate, endDate, searchQuery]);

  // Open reply modal and set the receiver's mobile number
  const handleReply = (mobile) => {
    setReplyMobile(mobile);
    setIsReplyModalOpen(true);
  };

  // Close the reply modal
  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setReplyMobile("");
    setReplyMessage("");
    setReplyMethod("SIM"); // Reset to default
  };

  // Handle sending the reply
  const handleSendReply = () => {
    // Implement the logic to send the reply here
    console.log(
      `Sending reply to ${replyMobile} via ${replyMethod}: ${replyMessage}`
    );
    closeReplyModal();
  };

  const getTeamMember = (category) => {
    switch (category) {
      case "Top Sender":
        return teamSummary.topSenderMember || "N/A";
      case "Top Replier":
        return teamSummary.topReplierMember || "N/A";
      case "Top Neglecter":
        return teamSummary.topNeglecterMember || "N/A";
      case "Top Delayer":
        return teamSummary.topDelayerMember || "N/A";
      case "Lowest Sender":
        return teamSummary.lowestSenderMember || "N/A";
      default:
        return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-orange-500">Loading WhatsApp report data...</div>
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
      {/* WhatsApp Report Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-black-500">
          WhatsApp Report
        </h1>
        <div className="flex space-x-16 mb-4">
          <span className="text-lg font-semibold text-black-700">
            &lt;Your WhatsApp&gt;
          </span>
          <span className="text-lg font-semibold text-black-700">
            &lt;Team Report&gt;
          </span>
          <span className="text-lg font-semibold text-black-700">
            &lt;Team Summary&gt;
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
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Task List and Search Bar */}
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

        {/* Table for WhatsApp Messages */}
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
                  <td className="py-3 px-4 text-black-700">
                    {message.message}
                  </td>
                  <td className="py-3 px-4 text-black-700">
                    {message.dateTime}
                  </td>
                  <td className="py-3 px-4 text-black-700">
                    {message.scanApi}
                  </td>
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
          Your Team's WhatsApp Report
        </h2>
        <div className="flex items-center mb-4">
          <FaUser className="mr-2 text-blue-500" />
          <span className="text-lg font-semibold text-gray-700">
            Associates
          </span>
          <span className="text-lg font-semibold text-gray-700 mx-4">
            &lt;List&gt;
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
            value={searchQuery}
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
                  <td className="py-3 px-4 text-blacks-700">
                    {report.maxDelay}
                  </td>
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
            Team’s WhatsApp Summary
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
                      {getTeamMember(item.label)}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-orange-500">Reply</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Receiver</label>
              <input
                type="text"
                value={replyMobile}
                readOnly
                className="w-full p-2 border rounded focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full p-2 border rounded focus:border-orange-500 focus:ring-orange-500"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Method</label>
              <select
                value={replyMethod}
                onChange={(e) => setReplyMethod(e.target.value)}
                className="w-full p-2 border rounded focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="SIM">SIM</option>
                <option value="API">API</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeReplyModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
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

export default WhatsAppReport;
