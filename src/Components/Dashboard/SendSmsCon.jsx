import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SendSmsCon = ({
  setSendSms,
  selectedLeads,
  unhideData,
  setSelectedLeads,
  fetchData,
}) => {
  const [inputValues, setInputValues] = useState([]);
  const [smsContent, setSmsContent] = useState("");
  const [token, setToken] = useState("");
  const [smsType, setSmsType] = useState("S");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [variablesCount, setVariablesCount] = useState(0);
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [followUpDateTime, setFollowUpDateTime] = useState("");
  const [smsServices, setSmsServices] = useState([
    { value: "S", name: "SIM" },
    { value: "A", name: "API" },
  ]);
  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;
  const userMobile = userLocalData.user_data.mobile;

  useEffect(() => {
    fetchToken();
    fetchTemplates();
  }, []);

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

      const filterTemplates = data.Templates.filter(
        (template) => template.temptype.trim() === "S"
      );
      setTemplates(filterTemplates);
      if (selectedLeads.length > 0) {
        for (let i = 0; i < selectedLeads.length; i++) {
          const lead = selectedLeads[i];
          if (lead.phone && lead.phone.includes("*")) {
            setSmsServices([
              { value: "S", name: "SIM", disabled: true },
              { value: "A", name: "API" },
            ]);
            setSmsType("A");
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setError("Failed to fetch templates. Please try again later.");
    }
  };

  const fetchToken = async () => {
    setLoading(true);
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userLocalData ? userLocalData.access_token : null;
    try {
      const response = await fetch(
        "https://margda.in:7000/api/android/push-notification/get-token",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const token = data.Token.token;
        if (token) {
          setToken(token);
        }
      }
    } catch (err) {
      setError("Failed to fetch token. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelection = (index) => {
    if (index) {
      const template = templates[index];
      setSmsContent(template.matter);
      const matches = template.matter.match(/{#var#}/g);
      const count = matches ? matches.length : 0;
      setVariablesCount(count);
      setSelectedTemplate(index);
    } else {
      setVariablesCount(0);
      setSmsContent("");
      setSelectedTemplate("");
    }
  };

  const replaceVariables = (str, values) => {
    let index = 0;
    return str.replace(/{#var#}/g, () => values[index++] || "");
  };

  const handleSmsSend = async () => {
    if (!selectedTemplate) {
      return toast.error("Select a template");
    }
    if (!followUpDateTime) {
      return toast.warn("Please Enter Follow up date and time");
    }
    if (!remarks) {
      toast.warn("Please Enter Remarks");
      return;
    }
    setLoading(true);
    setError(null);
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userLocalData ? userLocalData.access_token : null;
    const leads = selectedLeads.map((lead) => {
      // Find the matching item in unhideData
      const match = unhideData.find(
        (item) => item.userId === lead.userId && item.dataId === lead.dataId
      );
      return match || lead; // Return the matching item or the original lead
    });
    if (smsType == "S") {
      if (!token) {
        setLoading(false);
        return toast.error(
          "Call feature is not available for your account. Please install the Margda app and sign up to enable this feature."
        );
      }
      if (
        inputValues.length < variablesCount ||
        !inputValues.every((value) => value.trim() !== "")
      ) {
        setLoading(false);
        return toast.error("All Variables are required");
      }
      const template = templates[selectedTemplate];
      const message = replaceVariables(template.matter, inputValues);
      try {
        for (const lead of leads) {
          const formattedNumber =
            lead.phone.length > 10 ? `+${lead.phone}` : lead.phone;
          const cEmail = lead.email;
          const cName = lead.name;
          const addEmailVariable = message
            .replace("{cEmail}", cEmail)
            .replace("{user}", cName);

          const response = await fetch(
            "https://margda.in:7000/api/android/push-notification/send-sms",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
                userMobile: userMobile,
                number: formattedNumber,
                remarks: remarks,
                followUpDateTime,
                content: addEmailVariable,
                userID: lead.userId,
                dataID: lead.dataId,
              }),
            }
          );
          const data = await response.json();
          if (!response.ok) {
            if (response.status === 401) {
              toast.error(data.message);
              return;
            } else {
              setError("Failed to send SMS.");
              return;
            }
          }
        }

        fetchData();
        setSendSms(false);
        setSelectedLeads([]);
        toast.success("SMS sent successfully!");
      } catch (err) {
        console.log(err);
        setError("Failed to send SMS. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else if (smsType === "A") {
      if (
        inputValues.length < variablesCount ||
        !inputValues.every((value) => value.trim() !== "")
      ) {
        setLoading(false);
        return toast.error("All Variables are required");
      }
      const template = templates[selectedTemplate];
      const message = replaceVariables(template.matter, inputValues);
      try {
        const response = await fetch(
          "https://margda.in:7000/api/sendsms/cloudapi",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              tempID: selectedTemplate.auth,
              recipientMobiles: leads.map((lead) => {
                return lead.phone;
              }),
              content: message,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          fetchData();
          setSendSms(false);
          setSelectedLeads([]);
        } else {
          toast.warning(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
      setLoading(false);
    }
  };

  const handleSmsTypeChange = (e) => {
    const type = e.target.value;
    setSelectedTemplate(null);
    setSmsContent("");
    setVariablesCount(0);
    setSmsType(type);
  };

  const handleInputChange = (index, event) => {
    const newValues = [...inputValues];
    newValues[index] = event.target.value;
    setInputValues(newValues);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center p-4 border-b">
          <label
            htmlFor="message"
            className="block text-xl font-semibold text-gray-800 mx-auto"
          >
            Send SMS
          </label>
          <button
            onClick={() => setSendSms(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="my-3">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select SMS Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={smsType}
              onChange={handleSmsTypeChange}
            >
              {smsServices.map((service, index) => (
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
          <div className="flex flex-col my-5">
            <label htmlFor="template" className="font-bold mb-2">
              Select Template
            </label>
            <select
              id="template"
              value={selectedTemplate}
              onChange={(e) => {
                handleTemplateSelection(e.target.value);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a template</option>
              {templates.length > 0 ? (
                templates.map((template, index) => (
                  <option key={index} value={index}>
                    {template.template}
                  </option>
                ))
              ) : (
                <option disabled>No templates available</option>
              )}
            </select>
          </div>
          {smsContent && (
            <div>
              <label className="font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                disabled
                type="text"
                name="message"
                value={smsContent}
                id="message"
                onChange={(e) => setSmsContent(e.target.value)}
                placeholder="Your message"
                className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="5"
              />
            </div>
          )}
          {Array.from({ length: variablesCount }, (_, index) => (
            <div key={index}>
              <input
                type="text"
                value={inputValues[index] || ""}
                onChange={(e) => handleInputChange(index, e)}
                className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Variable ${index + 1}`}
              />
            </div>
          ))}
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
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setSendSms(false)}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          {smsType == "S" && token ? (
            <button
              onClick={handleSmsSend}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          ) : smsType == "A" ? (
            <button
              onClick={handleSmsSend}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          ) : (
            <span className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Not Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendSmsCon;
