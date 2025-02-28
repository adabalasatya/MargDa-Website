import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
  FaClock,
  FaPaperclip,
  FaEye,
  FaPaperPlane,
  FaReply,
  FaTimesCircle,
} from "react-icons/fa";

const EmailReport = () => {
  const [emails, setEmails] = useState([]);
  const [allEmails, setAllEmails] = useState([]);
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
          "https://margda.in:7000/api/margda.org/report/email-report",
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

        if (data.Emails && Array.isArray(data.Emails)) {
          const transformedEmails = data.Emails.map((email) => ({
            timestamp: email.edate || null,
            dateTime: email.edate
              ? new Date(email.edate).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "N/A",
            smtp: email.source
              ? email.source.startsWith("O")
                ? "Outlook"
                : email.source.startsWith("G")
                ? "Gmail"
                : email.source.startsWith("A")
                ? "AWS"
                : "Unknown"
              : "N/A",
            sender: email.from_mail || "N/A",
            receiver: email.to_mail || "N/A",
            subject: email.subject || "N/A",
            matter: email.matter ? "<View>" : "N/A",
            attach: email.attach ? "<Attach>" : "None",
            viewTime: email.vtime
              ? new Date(email.vtime).toLocaleString()
              : "N/A",
            crm: email.crmID || "N/A",
            success: email.success ? "True" : "False",
            opencount: email.open_count || 0,
          }));
          setEmails(transformedEmails);
          setAllEmails(transformedEmails);
        }

        // Mock team report data
        const uniqueSenders = [
          ...new Set(data.Emails.map((email) => email.from_mail)),
        ];
        const mockTeamReport = uniqueSenders.map((sender) => ({
          associate: sender,
          totalSent: data.Emails.filter((email) => email.from_mail === sender)
            .length,
          totalUnreplied: 0,
          maxDelay: "0 days",
        }));
        setTeamReport(mockTeamReport);

        // Mock team summary data
        setTeamSummary({
          topSender: data.Emails.length + " emails",
          topSenderMember: uniqueSenders[0] || "N/A",
          topReplier: "0 replies",
          topReplierMember: "N/A",
          topNeglecter: "0 unreplied",
          topNeglecterMember: "N/A",
          topDelayer: "0 days average",
          topDelayerMember: "N/A",
          lowestSender: "0 emails",
          lowestSenderMember: uniqueSenders[uniqueSenders.length - 1] || "N/A",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to fetch Email report data: ${err.message}`);
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
        ((item.sender && item.sender.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.receiver && item.receiver.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.subject && item.subject.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    });
  }

  useEffect(() => {
    setCurrentPage(1);
    const data = filterByDateRange(allEmails, startDate, endDate, searchQuery);
    setEmails(data);
  }, [startDate, endDate, searchQuery]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = emails.slice(indexOfFirstRecord, indexOfLastRecord);

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
        <div className="text-orange-500">Loading Email report data...</div>
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
        <h1 className="text-2xl font-bold mb-4 text-black-500">Email Report</h1>
        <div className="flex space-x-16 mb-4">
          <span className="text-lg font-semibold text-black-700">Your Email</span>
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
                <th className="py-3 px-4 text-left font-semibold">SMTP</th>
                <th className="py-3 px-4 text-left font-semibold">Sender</th>
                <th className="py-3 px-4 text-left font-semibold">Receiver</th>
                <th className="py-3 px-4 text-left font-semibold">Subject</th>
                <th className="py-3 px-4 text-left font-semibold">Matter</th>
                <th className="py-3 px-4 text-left font-semibold">Attach</th>
                <th className="py-3 px-4 text-left font-semibold">View+Time</th>
                <th className="py-3 px-4 text-left font-semibold">CRM</th>
                <th className="py-3 px-4 text-left font-semibold">Success</th>
                <th className="py-3 px-4 text-left font-semibold">Open Count</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((email, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="py-3 px-4 text-black-700">{email.dateTime}</td>
                  <td className="py-3 px-4 text-black-700">{email.smtp}</td>
                  <td className="py-3 px-4 text-black-700">{email.sender}</td>
                  <td className="py-3 px-4 text-black-700">{email.receiver}</td>
                  <td className="py-3 px-4 text-black-700">{email.subject}</td>
                  <td className="py-3 px-4 text-black-700">{email.matter}</td>
                  <td className="py-3 px-4 text-black-700">{email.attach}</td>
                  <td className="py-3 px-4 text-black-700">{email.viewTime}</td>
                  <td className="py-3 px-4 text-black-700">{email.crm}</td>
                  <td className="py-3 px-4 text-black-700">{email.success}</td>
                  <td className="py-3 px-4 text-black-700">{email.opencount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span>
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, emails.length)} of {emails.length} records
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
              disabled={indexOfLastRecord >= emails.length}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Next {">>"}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black-500">Your Team's Email Report</h2>
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
                <th className="py-3 px-4 text-left font-semibold">Associates</th>
                <th className="py-3 px-4 text-left font-semibold">Total Sent</th>
                <th className="py-3 px-4 text-left font-semibold">Total Un-replied</th>
                <th className="py-3 px-4 text-left font-semibold">Maximum Delays</th>
              </tr>
            </thead>
            <tbody>
              {teamReport.map((report, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="py-3 px-4 text-black-700">{report.associate}</td>
                  <td className="py-3 px-4 text-black-700">{report.totalSent}</td>
                  <td className="py-3 px-4 text-black-700">{report.totalUnreplied}</td>
                  <td className="py-3 px-4 text-black-700">{report.maxDelay}</td>
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
            Team’s Email Summary
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
                    className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 flex items-center text-gray-700">
                      <item.icon className={`h-5 w-5 mr-2 text-${item.color}`} />
                      {item.label}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{getTeamMember(item.label)}</td>
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

export default EmailReport;