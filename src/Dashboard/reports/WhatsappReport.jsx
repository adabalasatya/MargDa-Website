import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaPaperPlane,
  FaReply,
  FaTimesCircle,
  FaClock,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

const WhatsAppReport = () => {
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [teamReport, setTeamReport] = useState([]);
  const [teamSummary, setTeamSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [remark, setRemark] = useState("");
  const [followUpDateTime, setFollowUpDateTime] = useState("");
  const [showRemarkForm, setShowRemarkForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
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
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyMobile, setReplyMobile] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyMethod, setReplyMethod] = useState("SIM");

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const fetchData = async () => {
    // ... (keep fetchData function unchanged)
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

      if (data.Chats && Array.isArray(data.Chats)) {
        const formattedMessages = data.Chats.map((chat) => ({
          ...chat,
          edate: chat.edate || new Date().toISOString(),
          mobile: chat.mobile || (chat.sender || chat.receiver),
          whatsID: chat.whatsID || chat.id || `msg_${Date.now()}_${chat.sender}`,
          remarks: chat.remarks || "N/A",
        }));
        setMessages(formattedMessages);
        setAllMessages(formattedMessages);
      }

      const uniqueSenders = [...new Set(data.Chats.map((chat) => chat.sender))];
      const mockTeamReport = uniqueSenders.map((sender) => ({
        associate: sender,
        totalSent: data.Chats.filter((chat) => chat.sender === sender).length,
        totalUnreplied: 0,
        maxDelay: "0h",
      }));
      setTeamReport(mockTeamReport);

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

  useEffect(() => {
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

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  function filterByDateRange(data, startDate, endDate, searchQuery) {
    // ... (keep filterByDateRange unchanged)
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    start.setHours(0, 0, 0, 0);
    return data.filter((item) => {
      const itemTimestamp = new Date(item.edate);
      return (
        itemTimestamp >= start &&
        itemTimestamp <= end &&
        ((item.sender && item.sender.includes(searchQuery)) ||
          (item.receiver && item.receiver.includes(searchQuery)) ||
          (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    });
  }

  useEffect(() => {
    setCurrentPage(1);
    const data = filterByDateRange(allMessages, startDate, endDate, searchQuery);
    setMessages(data);
  }, [startDate, endDate, searchQuery]);

  const handleReply = (mobile) => {
    setReplyMobile(mobile || "N/A");
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setReplyMobile("");
    setReplyMessage("");
    setReplyMethod("SIM");
  };

  const handleSendReply = () => {
    console.log(`Sending reply to ${replyMobile} via ${replyMethod}: ${replyMessage}`);
    closeReplyModal();
  };

  const getTeamMember = (category) => {
    // ... (keep getTeamMember unchanged)
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

  const handleShowRemarkForm = (record) => {
    setSelectedRecord(record);
    setShowRemarkForm(true);
  };

  const handleRemarkSubmit = async () => {
    // ... (keep handleRemarkSubmit unchanged)
    if (!remark) {
      return toast.error("Enter Remark");
    } else if (!followUpDateTime) {
      return toast.error("Enter Follow Up date and time");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/report/whatsapp-add-remark",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            whatsID: selectedRecord.whatsID,
            remarks: remark,
            cMobile:
              selectedRecord.in_out_type === "I"
                ? selectedRecord.sender
                : selectedRecord.receiver,
            fdate: followUpDateTime,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setShowRemarkForm(false);
        setRemark("");
        setFollowUpDateTime("");
        await fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showFullMessage = (message) => {
    setSelectedMessage(message);
  };

  const closeMessagePopup = () => {
    setSelectedMessage(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center p-4 text-orange-500">Loading WhatsApp report data...</div>;
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
        <h1 className="text-2xl font-bold mb-4 text-black-500">WhatsApp Report</h1>
        <div className="flex space-x-16 mb-4">
          <span className="text-lg font-semibold text-black-700">Your WhatsApp</span>
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
                <th className="py-3 px-4 text-left font-semibold">Incoming/Outgoing</th>
                <th className="py-3 px-4 text-left font-semibold">Sender</th>
                <th className="py-3 px-4 text-left font-semibold">Receiver</th>
                <th className="py-3 px-4 text-left font-semibold">Message</th>
                <th className="py-3 px-4 text-left font-semibold">Date + Time Stamp</th>
                <th className="py-3 px-4 text-left font-semibold">SIM+API</th>
                <th className="py-3 px-4 text-left font-semibold">Reply</th>
                <th className="py-3 px-4 text-left font-semibold">Remarks</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((message, index) => {
                const messageText = message.message || "N/A";
                const isLongMessage = messageText.length > 50;
                const truncatedMessage = isLongMessage 
                  ? `${messageText.substring(0, 50)}...` 
                  : messageText;

                return (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4">
                      {message.in_out_type === "O"
                        ? "Outgoing"
                        : message.in_out_type === "I"
                        ? "Incoming"
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">{message.sender || "N/A"}</td>
                    <td className="py-3 px-4">{message.receiver || "N/A"}</td>
                    <td className="py-3 px-4 max-w-[250px]">
                      <div className="flex items-center">
                        <span className="truncate">{truncatedMessage}</span>
                        {isLongMessage && (
                          <button
                            onClick={() => showFullMessage(message)}
                            className="ml-2 text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap"
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {message.edate
                        ? new Date(message.edate).toLocaleString("en-US", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {message.source === "S"
                        ? "SIM"
                        : message.source === "A"
                        ? "API"
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleReply(message.mobile)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaReply />
                      </button>
                    </td>
                    <td className="py-3 px-4">{message.remarks || "N/A"}</td>
                    <td className="py-3 px-4">
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleShowRemarkForm(message)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

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
      {/* ... (keep unchanged) */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black-500">Your Team's WhatsApp Report</h2>
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
                <th className="py-3 px-4 text-left font-semibold">
                  <FaUser className="inline mr-2" /> Associates
                </th>
                <th className="py-3 px-4 text-left font-semibold">Total Sent</th>
                <th className="py-3 px-4 text-left font-semibold">Total Un-replied</th>
                <th className="py-3 px-4 text-left font-semibold">Maximum Delays</th>
              </tr>
            </thead>
            <tbody>
              {teamReport.map((report, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="py-3 px-4">{report.associate}</td>
                  <td className="py-3 px-4">{report.totalSent}</td>
                  <td className="py-3 px-4">{report.totalUnreplied}</td>
                  <td className="py-3 px-4">{report.maxDelay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Summary Section */}
      {/* ... (keep unchanged) */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-blue-500" /> Team’s WhatsApp Summary
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
                  { icon: FaPaperPlane, color: "green-500", label: "Top Sender", detail: teamSummary.topSender },
                  { icon: FaReply, color: "blue-500", label: "Top Replier", detail: teamSummary.topReplier },
                  { icon: FaTimesCircle, color: "red-500", label: "Top Neglecter", detail: teamSummary.topNeglecter },
                  { icon: FaClock, color: "yellow-500", label: "Top Delayer", detail: teamSummary.topDelayer },
                  { icon: FaPaperPlane, color: "gray-500", label: "Lowest Sender", detail: teamSummary.lowestSender },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 flex items-center text-gray-700">
                      <item.icon className={`h-5 w-5 mr-2 text-${item.color}`} />
                      {item.label}
                    </td>
                    <td className="py-3 px-4">{getTeamMember(item.label)}</td>
                    <td className="py-3 px-4">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Message Popup Card */}
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-500">Full Message</h3>
              <button
                onClick={closeMessagePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Sender:</strong> {selectedMessage.sender || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Receiver:</strong> {selectedMessage.receiver || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {selectedMessage.edate
                  ? new Date(selectedMessage.edate).toLocaleString("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })
                  : "N/A"}
              </p>
            </div>
            <div className="border-t pt-4">
              <p className="text-gray-800 whitespace-pre-wrap">
                {selectedMessage.message || "N/A"}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeMessagePopup}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remark Form */}
      {/* ... (keep unchanged) */}
      {showRemarkForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-md shadow-2xl max-w-7xl min-w-2xl">
            <div className="text-xl">Add Remark for {selectedRecord.cmobile || selectedRecord.sender || "N/A"}</div>
            <div className="flex flex-col gap-4">
              <div className="mt-4">
                <label htmlFor="remark" className="block font-semibold text-sm font-medium text-gray-700 mb-1">Remark</label>
                <input
                  type="text"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Remark"
                />
              </div>
              <div>
                <label htmlFor="follow">Follow Up Date Time</label>
                <input
                  className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  type="datetime-local"
                  name="follow"
                  value={followUpDateTime}
                  onChange={(e) => setFollowUpDateTime(e.target.value)}
                  id="follow"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => setShowRemarkForm(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={handleRemarkSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {/* ... (keep unchanged) */}
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