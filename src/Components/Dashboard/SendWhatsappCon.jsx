import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const WhatsAppCon = ({
  selectedLeads,
  setSendWhatsApp,
  unhideData,
  fetchData,
  setSelectedLeads,
}) => {
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState([]);
  const [headerUrl, setHeaderUrl] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [cloudWhatsappTemplates, setCloudWhatsappTemplates] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [selectedWhatsApp, setSelectedWhatsapp] = useState("WS");
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [followUpDateTime, setFollowUpDateTime] = useState("");
  const [mediaIds, setMediaIds] = useState([]);
  const [selectedCloudWhatsappTemplate, setSelectedCloudWhatsappTemplate] =
    useState({});
  const [whatsappServices, setWhatsappServices] = useState([
    { value: "WS", name: "SIM" },
    { value: "WA", name: "API" },
  ]);

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;

  useEffect(() => {
    check();
    fetchWhatsAppProfiles();
    fetchTemplates();
    fetchCloudWhatsappTemplate();
    fetchMediaIds();
  }, []);

  const check = () => {
    if (selectedLeads.length > 0) {
      for (let i = 0; i < selectedLeads.length; i++) {
        const lead = selectedLeads[i];
        if (lead.whatsapp && lead.whatsapp.includes("*")) {
          setWhatsappServices([
            { value: "WS", name: "SIM", disabled: true },
            { value: "WA", name: "API" },
          ]);
          setSelectedWhatsapp("WA");
          break;
        }
      }
    }
  };

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
      const required = data.templates.data.filter(
        (item) => item.name == "associate_template"
      );
      setCloudWhatsappTemplates(required);
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
    if (!followUpDateTime) {
      return toast.warn("Please Enter Follow up date and time");
    }

    if (!remarks) {
      toast.warn("Please Enter Remarks");
      return;
    }
    setLoading(true);
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userLocalData ? userLocalData.access_token : null;
    const mobile = userLocalData ? userLocalData.user_data.mobile : null;
    const whatsapp = userLocalData ? userLocalData.user_data.whatsapp : null;
    const name = userLocalData ? userLocalData.user_data.name : null;
    const phoneNumbers = selectedLeads.map((lead) => {
      // Find the matching item in unhideData
      const match = unhideData.find(
        (item) => item.userId === lead.userId && item.dataId === lead.dataId
      );
      return match.whatsapp || lead.whatsapp; // Return the matching item or the original lead
    });

    const recipientNames = selectedLeads.map((lead) => lead.name);

    const dataIDs = selectedLeads.map((lead) => lead.dataId);
    const userIDs = selectedLeads.map((lead) => lead.userId);
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
              message: message,
              headerUrl,
              recipientNames,
              remarks,
              followUpDateTime,
              dataIDs,
              userIDs,
            }),
          }
        );
        const data = await response.json();
        setLoading(false);
        toast.success(
          "Message Send Successfully, Verify in Whatsapp Report",
          data.message
        );
        setSelectedLeads([]);
        fetchData();
        setSendWhatsApp(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        toast.error("Error in Message Sending", e);
      }
    } else if (selectedWhatsApp == "WA") {
      if (!selectedCloudWhatsappTemplate.components) {
        setLoading(false);
        return alert("Select a template ");
      }
      let header;
      let body;
      let buttons;
      const components = selectedCloudWhatsappTemplate.components;
      for (let i = 0; i < phoneNumbers.length; i++) {
        const phone = phoneNumbers[i];
        const dataID = dataIDs[i];
        const userId = userIDs[i];
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
                          id: "1522154255132396",
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
                const parameters = [
                  { type: "text", text: recipientNames[i] },
                  { type: "text", text: whatsapp },
                  { type: "text", text: mobile },
                  { type: "text", text: name },
                ];
                // if (
                //   inputValues.length == component.example.body_text[0].length
                // ) {
                // inputValues.map((item, key) => {
                //   if (key == 0) {
                //     parameters.push({
                //       type: "text",
                //       text: recipientNames[i],
                //     });
                //   } else if (key == 1) {
                //     parameters.push({ type: "text", text: whatsapp });
                //   } else if (key == 2) {
                //     parameters.push({ type: "text", text: mobile });
                //   } else if (key == 3) {
                //     parameters.push({ type: "text", text: name });
                //   }
                // });
                // } else {
                //   return alert("Enter all Variables");
                // }
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
              } else if (
                selectedCloudWhatsappTemplate.name === "associate_template"
              ) {
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
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber: phone,
              name: recipientNames[i],
              templateName: selectedCloudWhatsappTemplate.name,
              languageCode: selectedCloudWhatsappTemplate.language,
              header: header,
              body: body,
              buttons: buttons,
              remarks,
              followUpDateTime,
              dataID,
              userId,
            }),
          }
        );
        const data = await response.json();
        if (data.Error && data.Error.error.message) {
          setLoading(false);
          toast.error("Error in Message Sending", data.Error.error.message);
        } else {
          setLoading(false);
          setSelectedLeads([]);
          toast.success("Message Send Successfully, Verify in Whatsapp Report");
        }
        fetchData();
        setSendWhatsApp(false);
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
      setSelectedCloudWhatsappTemplate(selectedTemplate);
    } else {
      setSelectedCloudWhatsappTemplate({});
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
              {whatsappServices.map((service, index) => (
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
                  cloudWhatsappTemplates.length > 0 &&
                  cloudWhatsappTemplates.map((template, index) => (
                    <option key={index} value={index}>
                      {template.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          {selectedWhatsApp === "WS" && (
            <>
              {profile.length === 0 && (
                <Link
                  to={"/qr-scan"}
                  // disabled
                  className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Scan WhatsApp First
                </Link>
              )}
              {profile.length === 1 && !profile[0].active && (
                <Link
                  // disabled
                  to={"/qr-scan"}
                  className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Re-scan WhatsApp
                </Link>
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
              disabled={loading}
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
            <div className="mb-2">
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

        {selectedWhatsApp == "WA" && (
          <>
            {selectedCloudWhatsappTemplate.components &&
              selectedCloudWhatsappTemplate.components.length > 0 &&
              selectedCloudWhatsappTemplate.components.map(
                (component, index) => {
                  if (
                    component.type === "HEADER" &&
                    component.format === "IMAGE"
                  ) {
                    return (
                      <img
                        key={index}
                        src={component.example.header_handle[0]}
                        alt=""
                      />
                    );
                  } else if (component.type === "BODY") {
                    const element = (
                      <div key={`component-${index}`}>{component.text}</div>
                    );
                    // const parameters =
                    //   component.example && component.example.body_text[0];

                    // let paramDivs;
                    // if (parameters) {
                    // paramDivs = parameters.map((param, index) => (
                    //   <input
                    //     disabled={index == 0}
                    //     className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    //     type="text"
                    //     key={`input-${index}-${index}`}
                    //     value={inputValues[index] || ""}
                    //     onChange={(e) =>
                    //       handleInputChange(index, e.target.value)
                    //     }
                    //     placeholder={index == 0 ? "Recipient Name" : param}
                    //   />
                    // ));
                    // }

                    return (
                      <div
                        key={`container-${index}`}
                        className="flex flex-col gap-3"
                      >
                        {element}
                        {/* <b>{"Variables"}</b>
                        {paramDivs} */}
                      </div>
                    );
                  }
                }
              )}
          </>
        )}

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
        <div className="flex justify-between my-2">
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
      </div>
    </div>
  );
};

export default WhatsAppCon;
