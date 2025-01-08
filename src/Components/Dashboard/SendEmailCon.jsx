import React, { useState, useEffect } from "react";

const SendEmailCon = ({ setSendEmail, selectedLeads, setSelectedLeads }) => {
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
  const [selectedService, setSelectedService] = useState("outlook-smtp");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;
  const senderName = userLocalData ? userLocalData.user_data.name : "";

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (selectedLeads.length > 0) {
      const firstLeadEmail = selectedLeads[0]?.email || "";
      setEmailDetails((prevState) => ({
        ...prevState,
        replyToEmail: firstLeadEmail,
      }));
    } else {
      setEmailDetails((prevState) => ({
        ...prevState,
        replyToEmail: "",
      }));
    }
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
        (template) => template.temptype === "E "
      );
      console.log("Filtered Email Templates:", filterTemplates);

      setTemplates(filterTemplates);
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

    if (
      (selectedService === "outlook-smtp" || selectedService === "gmail") &&
      (!emailDetails.senderEmail || !emailDetails.senderPassword)
    ) {
      setError("Sender email and password are required for this service.");
      return;
    }

    setLoading(true);
    setError("");

    const urlMap = {
      "outlook-smtp": "https://margda.in:7000/api/email/send-email/outlook-smtp",
      "outlook-graph": "https://margda.in:7000/api/email/send-email/outlook-graph-api",
      aws: "https://margda.in:7000/api/email/send-email/aws",
      gmail: "https://margda.in:7000/api/email/send-email/gmail",
    };
    const url = urlMap[selectedService];

    const emailData = {
      ...emailDetails,
      recipientEmails: selectedLeads.map((lead) => lead.email),
      recipientnames: selectedLeads.map((lead) => lead.name),
      dataIDs: selectedLeads.map((lead) => lead.dataID),
      userIDs: selectedLeads.map((lead) => lead.userID),
      senderName: senderName,
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
      alert(data.message || "Email sent successfully!");

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
    } catch (error) {
      console.error("Error sending email:", error);
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
              placeholder={selectedTemplate ? "Subject from template" : "Enter subject"}
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
              placeholder={selectedTemplate ? "Body from template" : "Enter email body"}
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
              className="px-4 py-2 border border-gray-300 rounded-lg"
              dangerouslySetInnerHTML={{ __html: emailDetails.body }}
            />
          </div>

          {/* Reply-to Email */}
          <div className="flex flex-col">
            <label htmlFor="replyToEmail" className="font-bold mb-2">
              Reply-to Email
            </label>
            <input
              type="email"
              name="replyToEmail"
              id="replyToEmail"
              value={emailDetails.replyToEmail}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reply-to email"
            />
          </div>

          {/* Sender Email and Password (for Outlook SMTP and Gmail) */}
          {(selectedService === "outlook-smtp" || selectedService === "gmail") && (
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
              <option value="outlook-smtp">Outlook SMTP</option>
              <option value="outlook-graph">Outlook Graph API</option>
              <option value="aws">AWS SES</option>
              <option value="gmail">Gmail</option>
            </select>
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