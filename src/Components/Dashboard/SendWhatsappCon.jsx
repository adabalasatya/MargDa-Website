import { useEffect, useState } from "react";

const WhatsAppCon = ({ selectedLeads, setSendWhatsApp }) => {
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState([]);
  const [headerUrl, setHeaderUrl] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [cloudWhatsappTemplates, setCloudWhatsappTemplates] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [selectedWhatsApp, setSelectedWhatsapp] = useState("WS");
  const [loading, setLoading] = useState(false);
  const [mediaIds, setMediaIds] = useState([]);
  const [selectedCloudWhatsappTemplate, setSelectedCloudWhatsappTemplate] =
    useState({});

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;

  useEffect(() => {
    fetchWhatsAppProfiles();
    fetchTemplates();
    fetchCloudWhatsappTemplate();
    fetchMediaIds();
  }, []);

  const fetchCloudWhatsappTemplate = async () => {
    try {
      const response = await fetch("https://margda.in:2000/api/gettemplates", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      console.log(data);
      setCloudWhatsappTemplates(data.templates.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

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
        (template) => template.temptype === "WS"
      );
      const filterAllTemplates = data.Templates.filter(
        (template) => template.temptype === "WS" || template.temptype === "WA"
      );
      setTemplates(filterTemplates);
      setAllTemplates(filterAllTemplates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const fetchWhatsAppProfiles = async () => {
    const response = await fetch(
      "https://margda.in:3000/api/margda/scan-whatsapp/getprofiles",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const body = await response.json();
    if (response.ok) {
      setProfile(body.Profiles);
    }
  };

  const fetchMediaIds = async () => {
    try {
      const response = await fetch(
        "https://margda.in:2000/api/fetch-media-ids",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      setMediaIds(data.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const sendMessage = async () => {
    setLoading(true);
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userLocalData ? userLocalData.access_token : null;
    const mobile = userLocalData ? userLocalData.user_data.mobile : null;
    const whatsapp = userLocalData ? userLocalData.user_data.whatsapp : null;
    const name = userLocalData ? userLocalData.user_data.name : null;
    const email = userLocalData ? userLocalData.user_data.email : null;
    const formatMessage = message
      .replace("{whatsapp}", whatsapp)
      .replace("{email}", email)
      .replace("{euser}", name)
      .replace("{mobile}", mobile);
    const phoneNumbers = selectedLeads.map((lead) => lead.whatsapp);
    const recipientNames = selectedLeads.map((lead) => lead.name);
    if (selectedWhatsApp == "WS") {
      try {
        const response = await fetch(
          "https://margda.in:3000/api/margda/scan-whatsapp/sendmessage",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              instanceId: profile[0].instance,
              phoneNumbers: phoneNumbers,
              message: formatMessage,
              headerUrl,
              recipientNames,
            }),
          }
        );
        const data = await response.json();
        setLoading(false);
        alert(JSON.stringify(data.message));
      } catch (e) {
        console.log(e);
        setLoading(false);
        alert("Error in sending message", e);
      }
    } else if (selectedWhatsApp == "WA") {
      if (!selectedCloudWhatsappTemplate.components) {
        return alert("Select a template ");
      }
      let header;
      let body;
      let buttons;
      const components = selectedCloudWhatsappTemplate.components;
      if (components.length && components.length > 0) {
        components.map((component) => {
          if (component.type === "HEADER") {
            if (component.example) {
              console.log(component);
              if (component.format === "IMAGE") {
                header = {
                  type: "header",
                  parameters: [
                    {
                      type: "image",
                      image: {
                        id: "812040027730776",
                      },
                    },
                  ],
                };
              } else if (component.format === "VIDEO") {
                header = {
                  type: "header",
                  parameters: [
                    {
                      type: "video",
                      video: {
                        id: "3781868282142978",
                      },
                    },
                  ],
                };
              }
            }
          } else if (component.type === "BODY") {
            if (component.example) {
              const parameters = [];
              component.example.body_text[0].map((item) => {
                parameters.push({ type: "text", text: item });
              });
              body = {
                type: "body",
                parameters: parameters,
              };
            }
          } else if (component.type === "BUTTONS") {
            if (selectedCloudWhatsappTemplate.name === "flow_message") {
              buttons = {
                type: "button",
                sub_type: "flow",
                index: 0,
              };
            } else if (selectedCloudWhatsappTemplate.name === "welcome") {
              buttons = {
                type: "button",
                sub_type: "url",
                index: "0",
                parameters: [
                  {
                    type: "text",
                    text: "/",
                  },
                ],
              };
            }
          }
        });
      }
      const response = await fetch(
        "https://margda.in:2000/api/send-template-messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumbers[0],
            name: recipientNames[0],
            templateName: selectedCloudWhatsappTemplate.name,
            languageCode: selectedCloudWhatsappTemplate.language,
            header: header,
            body: body,
            buttons: buttons,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.Error && data.Error.error.message) {
        alert(data.Error.error.message);
      } else {
        alert(data.message);
      }
    }
  };

  const handleTemplateChange = (e) => {
    if (e.target.value !== "") {
      setMessage(templates[e.target.value].matter);
      if (templates[e.target.value].bimg_url) {
        setHeaderUrl(templates[e.target.value].bimg_url);
      } else {
        setHeaderUrl(null);
      }
    }
  };

  const handleWhatsappChange = async (e) => {
    setSelectedWhatsapp(e.target.value);
    if (e.target.value === "WS") {
      const filterTemplates = allTemplates.filter(
        (template) => template.temptype === "WS"
      );
      setTemplates(filterTemplates);
    } else {
      const filterTemplates = allTemplates.filter(
        (template) => template.temptype === "WA"
      );
      setTemplates(filterTemplates);
    }
  };

  const handleCloudTemplateChange = async (e) => {
    if (e.target.value != "") {
      const selectedTemplate = cloudWhatsappTemplates[e.target.value];
      console.log(selectedTemplate);
      setSelectedCloudWhatsappTemplate(selectedTemplate);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Send WhatsApp</h2>
          <button
            onClick={() => setSendWhatsApp(false)}
            className="text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label htmlFor="type" className="font-bold mb-2">
              Select WhatsApp
            </label>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedWhatsApp}
              onChange={handleWhatsappChange}
              id="type"
            >
              <option value="WS">SIM</option>
              <option value="WA">API</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="template" className="font-bold mb-2">
              Template
            </label>
            {selectedWhatsApp == "WS" && (
              <select
                name="template"
                id="template"
                onChange={handleTemplateChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Template</option>
                {selectedWhatsApp == "WS" &&
                  templates.length > 0 &&
                  templates.map((template, index) => (
                    <option key={index} value={index}>
                      {template.template}
                    </option>
                  ))}
              </select>
            )}
            {selectedWhatsApp == "WA" && (
              <select
                name="template"
                id="template"
                onChange={handleCloudTemplateChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Template</option>
                {selectedWhatsApp == "WA" &&
                  cloudWhatsappTemplates.map((template, index) => (
                    <option key={index} value={index}>
                      {template.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 mb-6">
          {selectedWhatsApp === "WS" && (
            <>
              {profile.length === 0 && (
                <button
                  disabled
                  className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Scan WhatsApp First
                </button>
              )}
              {profile.length === 1 && !profile[0].active && (
                <button
                  disabled
                  className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Re-scan WhatsApp
                </button>
              )}
              {profile.length === 1 && profile[0].active && (
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              )}
            </>
          )}
          {selectedWhatsApp === "WA" && (
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          )}
          <button
            onClick={() => setSendWhatsApp(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
        {selectedWhatsApp == "WS" && (
          <>
            {" "}
            {headerUrl && (
              <div className="mb-6">
                <label className="font-bold mb-2">Header Image</label>
                <div className="w-full max-w-xs">
                  <img
                    src={headerUrl}
                    alt="Header"
                    className="w-full h-auto rounded-lg border border-gray-300"
                  />
                </div>
              </div>
            )}
            <div className="mb-6">
              <label className="font-bold mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="5" // Reduced height of the message box
                placeholder="Type your message here..."
              />
            </div>
          </>
        )}

        {selectedWhatsApp == "WA" && <></>}
      </div>
    </div>
  );
};

export default WhatsAppCon;
