import React, { useState, useEffect, useCallback } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaPaperPlane,
  FaReply,
  FaTimesCircle,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";

const SMSReport = () => {
  // State variables
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [teamReport, setTeamReport] = useState([]);
  const [teamSummary, setTeamSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [remark, setRemark] = useState("");
  const [followUpDateTime, setFollowUpDateTime] = useState("");
  const [showRemarkForm, setShowRemarkForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isReplyPopUpOpen, setIsReplyPopUpOpen] = useState(false);
  const [replyData, setReplyData] = useState({
    receiver: "",
    message: "",
    simApi: "SIM",
  });
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [fullMessageContent, setFullMessageContent] = useState("");

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

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

  const filterByDateRange = (data, startDate, endDate, searchQuery) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const query = searchQuery.toLowerCase().trim();

    return data
      .filter((item) => {
        const itemDate = new Date(item.edate);
        const isValidDate = !isNaN(itemDate.getTime());
        const matchesDate = isValidDate && itemDate >= start && itemDate <= end;

        const name = (item.name || "").toLowerCase();
        const mobile = (item.mobile || "").toLowerCase();
        const message = (item.message || "").toLowerCase();

        if (!query) return matchesDate;

        return matchesDate && (name.includes(query) || mobile.includes(query) || message.includes(query));
      })
      .sort((a, b) => new Date(b.edate) - new Date(a.edate));
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearchDebounced = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://margda.in:7000/api/margda.org/report/sms-report", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.Sms && Array.isArray(data.Sms)) {
        const transformedMessages = data.Sms.map((message) => ({
          incomingOutgoing: message.I_O === "I" ? "Incoming" : "Outgoing",
          name: message.umobile || "N/A",
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
          edate: message.edate,
          simApi: message.source === "S" ? "SIM" : "API",
          crm: message.crmID || "N/A",
          sender: message.sender || "Unknown",
          smsID: message.smsID,
          remarks: message.remarks || "N/A",
        }));

        setMessages(transformedMessages);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Failed to fetch SMS report data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const filterMessages = useCallback(() => {
    const filtered = filterByDateRange(messages, startDate, endDate, searchQuery);
    setFilteredMessages(filtered);

    const calculatedTeamReport = calculateTeamReport(filtered);
    setTeamReport(calculatedTeamReport);

    const calculatedTeamSummary = calculateTeamSummary(calculatedTeamReport);
    setTeamSummary(calculatedTeamSummary);
  }, [messages, startDate, endDate, searchQuery]);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    } else {
      setError("Access token not found. Please log in again.");
      setLoading(false);
    }
  }, [accessToken, fetchData]);

  useEffect(() => {
    filterMessages();
  }, [messages, startDate, endDate, searchQuery, filterMessages]);

  const handleSearch = (e) => {
    handleSearchDebounced(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setCurrentPage(1);
  };

  const handleReply = (mobile) => {
    setReplyData({
      receiver: mobile,
      message: "",
      simApi: "SIM",
    });
    setIsReplyPopUpOpen(true);
  };

  const handleSendMessage = async () => {
    if (!replyData.message) {
      toast.error("Please enter a message");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://margda.in:7000/api/margda.org/send-sms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver: replyData.receiver,
          message: replyData.message,
          simApi: replyData.simApi,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      const data = await response.json();
      toast.success(data.message || "Message sent successfully");
      setIsReplyPopUpOpen(false);
      setReplyData({ receiver: "", message: "", simApi: "SIM" });
      await fetchData();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(`Failed to send message: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMessages.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShowRemarkForm = (record) => {
    setSelectedRecord(record);
    setShowRemarkForm(true);
  };

  const handleRemarkSubmit = async () => {
    if (!remark) {
      return toast.error("Enter Remark");
    } else if (!followUpDateTime) {
      return toast.error("Enter Follow Up date and time");
    }
    try {
      const response = await fetch("https://margda.in:7000/api/margda.org/report/sms-add-remarks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smsID: selectedRecord.smsID,
          remarks: remark,
          cMobile: selectedRecord.mobile,
          fdate: followUpDateTime,
        }),
      });
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
      console.error(error);
      toast.error("Failed to submit remark");
    }
  };

  const handleShowFullMessage = (message) => {
    setFullMessageContent(message);
    setShowFullMessage(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-orange-500">Loading SMS report data...</div>
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
        <h1 className="text-2xl font-bold mb-4 text-gray-900">SMS Report</h1>
        <div className="flex space-x-16 mb-4">
          <span className="text-lg font-semibold text-gray-700">Your SMS</span>
          <span className="text-lg font-semibold text-gray-700">Team Report</span>
          <span className="text-lg font-semibold text-gray-700">Team Summary</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4 flex-wrap gap-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <span className="mr-4">From Date</span>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <span className="mr-4">To Date</span>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center">
            <FaSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, mobile, or message"
              onChange={handleSearch}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500 w-64"
            />
          </div>
        </div>

        <div className="rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white table-fixed">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left font-semibold w-[10%]">Incoming Outgoing</th>
                <th className="py-3 px-4 text-left font-semibold w-[10%]">Your Mobile</th>
                <th className="py-3 px-4 text-left font-semibold w-[10%]">Client Mobile</th>
                <th className="py-3 px-4 text-left font-semibold w-[20%]">Message</th>
                <th className="py-3 px-4 text-left font-semibold w-[15%]">Date + Time Stamp</th>
                <th className="py-3 px-4 text-left font-semibold w-[8%]">SIM+API</th>
                <th className="py-3 px-4 text-left font-semibold w-[8%]">CRM+</th>
                <th className="py-3 px-4 text-left font-semibold w-[8%]">Reply</th>
                <th className="py-3 px-4 text-left font-semibold w-[11%]">Remarks</th>
                <th className="py-3 px-4 text-left font-semibold w-[8%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((message, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 text-gray-700 break-words">{message.incomingOutgoing}</td>
                    <td className="py-3 px-4 text-gray-700 break-words">{message.name}</td>
                    <td className="py-3 px-4 text-gray-700 break-words">{message.mobile}</td>
                    <td className="py-3 px-4 text-gray-700 break-words">
                      {message.message.length > 50 ? (
                        <>
                          {message.message.substring(0, 50)}...
                          <button
                            onClick={() => handleShowFullMessage(message.message)}
                            className="text-blue-500 hover:text-blue-700 ml-2 text-sm"
                          >
                            Read More
                          </button>
                        </>
                      ) : (
                        message.message
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-700 break-words">{message.dateTime}</td>
                    <td className="py-3 px-4 text-gray-700 break-words">{message.simApi}</td>
                    <td className="py-3 px-4 text-gray-700 break-words">{message.crm}</td>
                    <td className="py-3 px-4 text-gray-700">
                      <button
                        onClick={() => handleReply(message.mobile)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaReply />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-gray-700 break-words">{message.remarks}</td>
                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex items-center justify-center gap-4">
                        <div className="relative group flex items-center">
                          <button
                            className="text-green-600 hover:text-green-800"
                            onClick={() => handleShowRemarkForm(message)}
                          >
                            <FaEdit />
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-max bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Update Remark
                            </span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showFullMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-bold mb-4">Full Message</h2>
              <p className="text-gray-700 break-words">{fullMessageContent}</p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowFullMessage(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
          <span>
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredMessages.length)} of{" "}
            {filteredMessages.length} records
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
              disabled={indexOfLastRecord >= filteredMessages.length}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Next {">>"}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Your Team's SMS Report</h2>
        <div className="flex items-center mb-4 flex-wrap gap-4">
          <div className="flex items-center">
            <FaUser className="mr-2 text-blue-500" />
            <span className="text-lg font-semibold text-gray-700">Associates</span>
            <span className="text-lg font-semibold text-gray-700 mx-4">List</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <span className="mr-4">From Date</span>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <span className="mr-4">To Date</span>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center">
            <FaSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearch}
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500 w-64"
            />
          </div>
        </div>

        <div className="rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white table-fixed">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left font-semibold w-[40%]">
                  <FaUser className="inline mr-2" />
                  Associates
                </th>
                <th className="py-3 px-4 text-left font-semibold w-[20%]">Total Sent</th>
                <th className="py-3 px-4 text-left font-semibold w-[20%]">Total Un-replied</th>
                <th className="py-3 px-4 text-left font-semibold w-[20%]">Maximum Delays</th>
              </tr>
            </thead>
            <tbody>
              {teamReport.length > 0 ? (
                teamReport.map((report, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 text-gray-700 break-words">{report.associate}</td>
                    <td className="py-3 px-4 text-gray-700 break-words">{report.totalSent}</td>
                    <td className="py-3 px-4 text-gray-700 break-words">{report.totalUnreplied}</td>
                    <td className="py-3 px-4 text-gray-700 break-words">{report.maxDelay}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-blue-500" />
            Team’s SMS Summary
          </h3>
          <div className="rounded-lg shadow-md">
            <table className="w-full border-collapse bg-white table-fixed">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-4 text-left font-semibold w-[33%]">Category</th>
                  <th className="py-3 px-4 text-left font-semibold w-[33%]">Team Member</th>
                  <th className="py-3 px-4 text-left font-semibold w-[34%]">Details</th>
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
                    className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 flex items-center text-gray-700 break-words">
                      <item.icon className={`h-5 w-5 mr-2 text-${item.color}`} />
                      {item.label}
                    </td>
                    <td className="py-3 px-4 text-gray-700 break-words">
                      {teamSummary[`${item.label.replace(/\s+/g, "").toLowerCase()}Member`] || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700 break-words">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {isReplyPopUpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Reply to Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Receiver</label>
                <input
                  type="text"
                  value={replyData.receiver}
                  readOnly
                  className="mt-1 p-2 border rounded w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={replyData.message}
                  onChange={(e) => setReplyData({ ...replyData, message: e.target.value })}
                  className="mt-1 p-2 border rounded w-full focus:border-orange-500 focus:ring-orange-500"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Send Via</label>
                <select
                  value={replyData.simApi}
                  onChange={(e) => setReplyData({ ...replyData, simApi: e.target.value })}
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
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRemarkForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-md shadow-2xl max-w-7xl min-w-2xl">
            <div className="text-xl">Add Remark for {selectedRecord.mobile}</div>
            <div className="flex flex-col gap-4">
              <div className="mt-4">
                <label
                  htmlFor="remark"
                  className="block font-semibold text-sm font-medium text-gray-700 mb-1"
                >
                  Remark
                </label>
                <input
                  type="text"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Remark"
                />
              </div>
              <div>
                <label
                  htmlFor="follow"
                  className="block font-semibold text-sm font-medium text-gray-700 mb-1"
                >
                  Follow Up Date Time
                </label>
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
    </div>
  );
};

export default SMSReport;