/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SendEmailCon = ({
  setSendEmail,
  selectedLeads,
  setSelectedLeads,
  unhideData,
  fetchData,
}) => {
  const navigate = useNavigate();
  const [emailDetails, setEmailDetails] = useState({
    recipientEmails: [],
    subject: "",
    body: "",
    senderEmail: "",
    senderPassword: "",
    replyToEmail: "",
    senderName: "",
    recipientnames: [],
    attachment_urls: [],
    tempID: null,
    dataIDs: [],
    userIDs: [],
  });

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [adminCredentails, setAdminCredentials] = useState({});
  const [selectedService, setSelectedService] = useState("aws");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [followUpDateTime, setFollowUpDateTime] = useState("");
  const [error, setError] = useState("");

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;
  const senderName = userLocalData ? userLocalData.user_data.name : "";
  const replyToEmail = userLocalData ? userLocalData.user_data.email : "";

  const [emailServices, setEmailServices] = useState([
    { value: "aws", name: "AWS" },
    { value: "outlook-smtp", name: "Outlook SMTP" },
    { value: "outlook-graph", name: "Outlook API" },
    { value: "gmail", name: "Gmail Self" },
    { value: "gmailAPI", name: "Gmail API" },
  ]);

  useEffect(() => {
    check();
    fetchTemplates();
    fetchAdminCredentials();
    fetchCredentials();
  }, []);

  const check = () => {
    if (selectedLeads.length > 0) {
      for (let i = 0; i < selectedLeads.length; i++) {
        const lead = selectedLeads[i];
        if (lead.email && lead.email.includes("*")) {
          setEmailServices([
            { value: "aws", name: "AWS" },
            { value: "outlook-smtp", name: "Outlook SMTP", disabled: true },
            { value: "outlook-graph", name: "Outlook API" },
            { value: "gmail", name: "Gmail Self", disabled: true },
            { value: "gmailAPI", name: "Gmail API" },
          ]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    setEmailDetails((prevState) => ({
      ...prevState,
      replyToEmail: gmail,
    }));
  }, [selectedLeads]);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/templates/get-templates",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      console.log("API Response:", data);

      const filterTemplates = data.Templates.filter(
        (template) => template.temptype === "E"
      );
      console.log("Filtered Email Templates:", filterTemplates);

      setTemplates(filterTemplates);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setError("Failed to fetch templates. Please try again later.");
    }
  };

  const fetchAdminCredentials = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/email/admin_credentials",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      setAdminCredentials(data.Credential);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setError("Failed to fetch templates. Please try again later.");
    }
  };

  const handleTemplateSelection = (template) => {
    if (template) {
      setSelectedTemplate(template);
      setEmailDetails((prevState) => ({
        ...prevState,
        subject: template.subject || "",
        body: template.matter || "",
        attachment_urls: template.attach_url ? [template.attach_url] : [],
        tempID: template.tempID || null,
      }));
    } else {
      setSelectedTemplate(null);
      setEmailDetails((prevState) => ({
        ...prevState,
        subject: "",
        body: "",
        attachment_urls: [],
        tempID: null,
      }));
    }
  };

  const fetchCredentials = async () => {
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
      } else if (response.status == 404) {
        setGmail("");
        setPassword("");
        toast.info("Update Your email credentials first");
        return navigate("/email-auth");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLeads.length) {
      setError("Please select at least one lead.");
      return;
    }

    if (!selectedTemplate) {
      setError("Please select a template.");
      return;
    }

    if (!followUpDateTime) {
      setError("Please provide follow up date and time");
      toast.warn("Please provide follow up date and time");
      return;
    }

    if (!remarks) {
      toast.warn("Please Enter Remarks");
      return;
    }

    if (
      selectedService === "outlook-smtp" &&
      (!emailDetails.senderEmail || !emailDetails.senderPassword)
    ) {
      setError("Sender email and password are required for this service.");
      return;
    }

    setLoading(true);
    setError("");

    const urlMap = {
      "outlook-smtp":
        "https://margda.in:7000/api/email/send-email/outlook-smtp",
      "outlook-graph":
        "https://margda.in:7000/api/email/send-email/outlook-graph-api",
      aws: "https://margda.in:7000/api/email/send-email/aws",
      gmail: "https://margda.in:7000/api/email/send-email/gmail",
      gmailAPI: "https://margda.in:7000/api/email/send-email/gmail",
    };
    const url = urlMap[selectedService];
    if (selectedService == "gmailAPI") {
      if (!adminCredentails.gmailID || !adminCredentails.gmail_pass) {
        return alert("Gmail API service is not available");
      }
      emailDetails.senderEmail = adminCredentails.gmailID;
      emailDetails.senderPassword = adminCredentails.gmail_pass;
    } else if (selectedService == "gmail") {
      emailDetails.senderEmail = gmail;
      emailDetails.senderPassword = password;
    }
    emailDetails.replyToEmail = gmail;

    const emailData = {
      ...emailDetails,
      recipientEmails: selectedLeads.map((lead) => {
        // Find the matching item in unhideData
        const match = unhideData.find(
          (item) => item.userId === lead.userId && item.dataId === lead.dataId
        );
        return match.email || lead.email; // Return the matching item or the original lead
      }),
      recipientnames: selectedLeads.map((lead) => lead.name),
      dataIDs: selectedLeads.map((lead) => lead.dataId),
      userIDs: selectedLeads.map((lead) => lead.userId),
      senderName: senderName,
      remarks,
      followUpDateTime,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email");
      }

      const data = await response.json();
      toast.success("Email sent, Verify in email report");

      setEmailDetails({
        recipientEmails: [],
        subject: "",
        body: "",
        senderEmail: "",
        senderPassword: "",
        replyToEmail: "",
        senderName: "",
        recipientnames: [],
        attachment_urls: [],
        tempID: null,
        dataIDs: [],
        userIDs: [],
      });
      setSelectedLeads([]);
      setSelectedTemplate(null);
      fetchData();
      setSendEmail(false);
    } catch (error) {
      console.error("Error sending email:", error);
      alert(error.message);
      setError(error.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Send Email</h2>
          <button
            onClick={() => setSendEmail(false)}
            className="text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Service Selection */}
          <div className="flex flex-col">
            <label htmlFor="emailService" className="font-bold mb-2">
              Select Email Service
            </label>
            <select
              id="emailService"
              value={selectedService}
              onChange={handleServiceChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {emailServices.map((service, index) => (
                <option
                  key={index}
                  value={service.value}
                  disabled={service.disabled}
                >
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          {/* Sender Email and Password (for Outlook SMTP and Gmail) */}
          {selectedService === "outlook-smtp" && (
            <>
              <div className="flex flex-col">
                <label htmlFor="senderEmail" className="font-bold mb-2">
                  Sender Email
                </label>
                <input
                  type="email"
                  name="senderEmail"
                  id="senderEmail"
                  value={emailDetails.senderEmail}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sender email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="senderPassword" className="font-bold mb-2">
                  Sender Password
                </label>
                <input
                  type="password"
                  name="senderPassword"
                  id="senderPassword"
                  value={emailDetails.senderPassword}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sender password"
                  required
                />
              </div>
            </>
          )}

          {/* Template Selection */}
          <div className="flex flex-col">
            <label htmlFor="template" className="font-bold mb-2">
              Select Template
            </label>
            <select
              id="template"
              value={selectedTemplate ? selectedTemplate.tempID : ""}
              onChange={(e) => {
                const selected = templates.find(
                  (template) => template.tempID === e.target.value
                );
                handleTemplateSelection(selected);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a template</option>
              {templates.length > 0 ? (
                templates.map((template) => (
                  <option key={template.tempID} value={template.tempID}>
                    {template.template}
                  </option>
                ))
              ) : (
                <option disabled>No templates available</option>
              )}
            </select>
          </div>

          {/* Subject */}
          <div className="flex flex-col">
            <label htmlFor="subject" className="font-bold mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={emailDetails.subject}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder={
                selectedTemplate ? "Subject from template" : "Enter subject"
              }
              disabled={!!selectedTemplate}
            />
          </div>

          {/* Body */}
          <div className="flex flex-col">
            <label htmlFor="body" className="font-bold mb-2">
              Body
            </label>
            <textarea
              name="body"
              id="body"
              value={emailDetails.body}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder={
                selectedTemplate ? "Body from template" : "Email body"
              }
              disabled={!!selectedTemplate}
            />
          </div>

          {/* Preview Section */}
          <div className="flex flex-col">
            <label htmlFor="preview" className="font-bold mb-2">
              Preview
            </label>
            <div
              id="preview"
              className="px-4 py-2 border border-gray-300 rounded overflow-x-scroll"
              dangerouslySetInnerHTML={{ __html: emailDetails.body }}
            />
          </div>

          {/* Remarks */}
          <div className="flex flex-col">
            <label htmlFor="remarks" className="font-bold mb-2">
              Remarks
            </label>
            <textarea
              name="remarks"
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Remarks"
            />
          </div>

          {/* Follow Up date and time */}
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="followup-date-time" className="font-bold mb-2">
                Follow up date
              </label>
              <input
                name="followup-date-time"
                id="followup-date-time"
                value={followUpDateTime}
                onChange={(e) => setFollowUpDateTime(e.target.value)}
                type="datetime-local"
                className="px-3 py-1 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={loading || !selectedLeads.length || !selectedTemplate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
            <button
              type="button"
              onClick={() => setSendEmail(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendEmailCon;
