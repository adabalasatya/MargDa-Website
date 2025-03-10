import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader";
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
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Function to strip HTML tags and decode entities
const stripHtml = (html) => {
  // Remove HTML tags
  const plainText = html.replace(/<[^>]+>/g, "");
  // Decode common HTML entities
  const entities = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
  };
  return plainText.replace(
    /&(?:lt|gt|amp|quot|#39|nbsp);/g,
    (match) => entities[match] || match
  );
};

const EmailReport = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [allEmails, setAllEmails] = useState([]);
  const [showExtractDataBox, setShowExtractDataBox] = useState(false);
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [extractType, setExtractType] = useState("INBOX");
  const [remark, setRemark] = useState("");
  const [followUpDateTime, setFollowUpDateTime] = useState("");
  const [showRemarkForm, setShowRemarkForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [extractLoading, setExtractLoading] = useState(false);
  const [teamReport, setTeamReport] = useState([]);
  const [teamSummary, setTeamSummary] = useState({});
  const [loading, setLoading] = useState(false);
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
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    if (accessToken) {
      fetchData();
    } else {
      setError("Access token not found. Please log in again.");
      setLoading(false);
    }
  }, [accessToken]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://margda.in:7000/api/margda.org/report/email-report",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.Emails && Array.isArray(data.Emails)) {
        setEmails(data.Emails);
        setAllEmails(data.Emails);
      }

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

  function filterByDateRange(data, startDate, endDate, searchQuery) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    start.setHours(23, 59, 59, 999);
    return data.filter((item) => {
      const itemTimestamp = new Date(item.edate);
      return (
        itemTimestamp >= start &&
        itemTimestamp <= end &&
        ((item.from_mail &&
          item.from_mail.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.to_mail &&
            item.to_mail.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.subject &&
            item.subject.toLowerCase().includes(searchQuery.toLowerCase())))
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

  const handleShowExtractData = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/email/get_credentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const credentials = data.Credential;
        setGmail(credentials.email);
        setPassword(credentials.email_pass);
        setShowExtractDataBox(true);
      } else {
        toast.warn("Save Credentials First");
        navigate("/email-auth", { state: { from: "email-report" } });
      }
    } catch (error) {
      console.error(error);
      toast.warn("Save Credentials First");
      navigate("/email-auth", { state: { from: "email-report" } });
    }
  };

  const handleExtractData = async () => {
    setExtractLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/email/imap/extract-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ gmail, password, type: extractType }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setExtractLoading(false);
    }
  };

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
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/report/email-add-remarks",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailsID: selectedRecord.emailsID,
            remarks: remark,
            cEmail:
              selectedRecord.in_out_type == "O"
                ? selectedRecord.to_mail
                : selectedRecord.in_out_type == "I"
                ? selectedRecord.from_mail
                : selectedRecord.to_mail,
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
      console.error(error);
      toast.error("Failed to submit remark");
    }
  };

  const handleShowMessage = (message) => {
    // Clean the HTML content before setting it
    const cleanedMessage = stripHtml(message);
    setSelectedMessage(cleanedMessage);
    setShowMessageModal(true);
  };

  return (
    <div className="p-4">
      {loading && <Loader />}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-black-500">Email Report</h1>
        <div className="flex space-x-16 mb-4 justify-between">
          <div className="flex space-x-16 mb-4">
            <span className="text-lg font-semibold text-black-700">
              Your Email
            </span>
            <span className="text-lg font-semibold text-black-700">
              Team Report
            </span>
            <span className="text-lg font-semibold text-black-700">
              Team Summary
            </span>
          </div>
          <div className="mr-8 pr-9">
            <button
              className="bg-blue-500 px-3 py-2 text-white rounded hover:bg-blue-700"
              onClick={handleShowExtractData}
            >
              Extract
            </button>
          </div>
        </div>
      </div>
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
      {emails && emails.length > 0 ? (
        <>
          <div className="mb-8">
            <div className="rounded-lg shadow-md">
              <table className="w-full border-collapse bg-white table-fixed">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-3 px-4 text-left font-semibold w-[15%]">
                      Date-Time
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[8%]">
                      SMTP
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[8%]">
                      Type
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[15%]">
                      Sender
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[15%]">
                      Receiver
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[15%]">
                      Subject
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[10%]">
                      Matter
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[8%]">
                      Success
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[8%]">
                      Open Count
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[10%]">
                      Remarks
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[8%]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((email, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition-colors duration-200`}
                    >
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.edate
                          ? new Date(email.edate).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.source
                          ? email.source.startsWith("O")
                            ? "Outlook"
                            : email.source.startsWith("G")
                            ? "Gmail"
                            : email.source.startsWith("A")
                            ? "AWS"
                            : "Unknown"
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.in_out_type == "I"
                          ? "Incoming"
                          : email.in_out_type == "O"
                          ? "Outgoing"
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.from_mail ? email.from_mail : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.to_mail ? email.to_mail : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.subject ? email.subject : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.matter ? (
                          <button
                            className="text-blue-600 hover:text-blue-800 underline"
                            onClick={() => handleShowMessage(email.matter)}
                          >
                            View
                          </button>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.success ? "Send" : "Failed"}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {email.open_count ? email.open_count : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-700 break-words">
                        {email.remarks || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <div className="flex items-center justify-center gap-4">
                          <div className="relative group flex items-center">
                            <button
                              className="text-green-600 hover:text-green-800"
                              onClick={() => handleShowRemarkForm(email)}
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
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span>
                Showing {indexOfFirstRecord + 1} to{" "}
                {Math.min(indexOfLastRecord, emails.length)} of {emails.length}{" "}
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
                  disabled={indexOfLastRecord >= emails.length}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Next {">>"}
                </button>
              </div>
            </div>
          </div>

          {/* Team Report and Summary sections remain unchanged */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-black-500">
              Your Team's Email Report
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
                value={searchQuery}
                onChange={handleSearch}
                className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="rounded-lg shadow-md">
              <table className="w-full border-collapse bg-white table-fixed">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-3 px-4 text-left font-semibold w-[40%]">
                      Associates
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[20%]">
                      Total Sent
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[20%]">
                      Total Un-replied
                    </th>
                    <th className="py-3 px-4 text-left font-semibold w-[20%]">
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
                      <td className="py-3 px-4 text-black-700 break-words">
                        {report.associate}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {report.totalSent}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {report.totalUnreplied}
                      </td>
                      <td className="py-3 px-4 text-black-700 break-words">
                        {report.maxDelay}
                      </td>
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

              <div className="rounded-lg shadow-md">
                <table className="w-full border-collapse bg-white table-fixed">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="py-3 px-4 text-left font-semibold w-[33%]">
                        Category
                      </th>
                      <th className="py-3 px-4 text-left font-semibold w-[33%]">
                        Team Member
                      </th>
                      <th className="py-3 px-4 text-left font-semibold w-[33%]">
                        Details
                      </th>
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
                        <td className="py-3 px-4 flex items-center text-gray-700 break-words">
                          <item.icon
                            className={`h-5 w-5 mr-2 text-${item.color}`}
                          />
                          {item.label}
                        </td>
                        <td className="py-3 px-4 text-gray-700 break-words">
                          {getTeamMember(item.label)}
                        </td>
                        <td className="py-3 px-4 text-gray-700 break-words">
                          {item.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>Emails Not Available</div>
      )}

      {/* Modal for showing full message */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-70">
          <div className="bg-white p-6 rounded-lg w-[60%] max-h-[80%] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Email Message</h2>
            <div className="text-gray-700 whitespace-pre-wrap">
              {selectedMessage || "No message content available"}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-700"
                onClick={() => setShowMessageModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showExtractDataBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-70">
          <div className="flex flex-col gap-8 space-x-2 bg-white p-9 pt-5 rounded w-[40%] justify-center items-center">
            <div className="text-xl">Extract Data From {gmail}</div>
            <div className="flex gap-6">
              <button
                onClick={handleExtractData}
                disabled={extractLoading}
                className={`${
                  extractLoading ? "bg-gray-500" : "bg-blue-500"
                } px-3 py-2 text-white rounded hover:${
                  extractLoading ? "bg-gray-700" : "bg-blue-700"
                }`}
              >
                {extractLoading ? "Extracting..." : "Extract Data"}
              </button>
              <button
                className="rounded bg-gray-300 px-3 py-2 hover:bg-gray-500 hover:text-white"
                onClick={() => setShowExtractDataBox(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showRemarkForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-md shadow-2xl max-w-7xl min-w-2xl">
            <div className="text-xl">
              Add Remark for {selectedRecord.mobile}
            </div>
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

export default EmailReport;
