import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Loader from "../Components/Loader";

export const ScheduleMeeting = ({
  selectedLeads,
  setShowScheduleMeeting,
  unhideData,
  setSelectedLeads,
  fetchData,
}) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [startDateTime, setStartDateTime] = useState(null);
  const [passCode, setPassCode] = useState(null);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [selectedInvitationSend, setSelectedInvitationSend] = useState("A");
  const [selectedMeetingSource, setSelectedMeetingSource] = useState("");
  const [customLink, setCustomLink] = useState("");
  const [remarks, setRemarks] = useState("");
  const [followUpDateTime, setFollowUpDateTime] = useState("");
  const [invitationSendTypes, setInvitationSendTypes] = useState([
    { value: "A", name: "Official Whatsapp" },
    { value: "E", name: "Email" },
    { value: "W", name: "SIM Whatsapp" },
  ]);

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;

  useEffect(() => {
    fetchWhatsAppProfiles();
    check();
  }, []);

  const check = () => {
    if (selectedLeads.length > 0) {
      for (let i = 0; i < selectedLeads.length; i++) {
        const lead = selectedLeads[i];
        if (lead.email && lead.email.includes("*")) {
          setInvitationSendTypes([
            { value: "A", name: "Official Whatsapp" },
            { value: "E", name: "Email" },
            { value: "W", name: "SIM Whatsapp", disabled: true },
          ]);
          break;
        }
      }
    }
  };

  const fetchWhatsAppProfiles = async () => {
    const userID = localStorage.getItem("userID");
    const response = await fetch(
      "https://margda.in:3000/api/margda/scan-whatsapp/getprofiles",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID }),
      }
    );
    const body = await response.json();
    if (response.ok) {
      setProfile(body.Profiles);
    }
  };

  const sendInvitation = async () => {
    if (!selectedMeetingSource) {
      return toast.error("Select a meeting source");
    }
    if (selectedMeetingSource === "Z" && !passCode) {
      return toast.error("Enter Meeting Pass code");
    }
    if (!startDateTime) {
      return toast.error("Select Start Date Time");
    }
    if (selectedMeetingSource == "C" && !customLink) {
      return toast.error("Please Provide Meeting Link");
    }
    if (!remarks) {
      return toast.error("Remarks Required");
    }
    if (!followUpDateTime) {
      return toast.error("Follow up date and time required");
    }
    const attendeesPhoneNumbers = selectedLeads.map((lead) => {
      // Find the matching item in unhideData
      const match = unhideData.find(
        (item) => item.userId === lead.userId && item.dataId === lead.dataId
      );
      return match.whatsapp || lead.whatsapp; // Return the matching item or the original lead
    });
    const emails = selectedLeads.map((lead) => {
      // Find the matching item in unhideData
      const match = unhideData.find(
        (item) => item.userId === lead.userId && item.dataId === lead.dataId
      );
      return match.email || lead.email; // Return the matching item or the original lead
    });
    setLoading(true);
    // const userID = localStorage.getItem("userID");
    const startDate = new Date(startDateTime);
    const invitationMethod = selectedInvitationSend;
    const attendeesNames = selectedLeads.map((lead) => lead.name);
    const dataIDs = selectedLeads.map((lead) => lead.dataId);
    const userIDs = selectedLeads.map((lead) => lead.userId);

    const organizerName = userLocalData ? userLocalData.user_data.name : null;
    const organizerPhoneNumber = userLocalData
      ? userLocalData.user_data.mobile
      : null;
    const organizerEmail = userLocalData ? userLocalData.user_data.email : null;
    let createMeetingApiUrl;
    let createMeetingPayload = {
      startDateTime: startDate,
      attendees: emails,
      invitationMethod,
      organizerName,
      attendeesNames,
      organizerEmail,
      dataIDs,
      userIDs,
      remarks,
      followUpDateTime,
      whatsappInstanceId: profile[0].instance,
      organizerPhoneNumber,
      attendeesPhoneNumbers,
    };
    if (selectedMeetingSource === "G") {
      createMeetingApiUrl =
        "https://margda.in:7000/api/margda.org/meetings/create_meeting/google_meet";
    } else if (selectedMeetingSource === "Z") {
      createMeetingApiUrl =
        "https://margda.in:7000/api/margda.org/meetings/create_meeting/zoom";
      createMeetingPayload.passcode = passCode;
    } else if (selectedMeetingSource === "T") {
      createMeetingApiUrl =
        "https://margda.in:7000/api/margda.org/meetings/create_meeting/microsoft_team";
      createMeetingPayload.isPasswordRequired = isPasswordRequired;
    } else if (selectedMeetingSource == "C") {
      createMeetingApiUrl =
        "https://margda.in:7000/api/margda.org/meetings/create_meeting/custom";
      createMeetingPayload.custom_link = customLink;
    }
    try {
      const response = await fetch(createMeetingApiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createMeetingPayload),
      });
      const data = await response.json();
      if (response.ok) {
        const message =
          data.message + "\n" + JSON.stringify(data.data) + "\n\n";
        // alert(message);
        toast.success(message);
        await fetchData();
        setSelectedLeads([]);
        setShowScheduleMeeting(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Error in creating meeting", error);
    }
  };

  const handleInvitationSendChange = (e) => {
    setSelectedInvitationSend(e.target.value);
  };

  const handleMeetingSourceChange = async (e) => {
    setSelectedMeetingSource(e.target.value);
    if (e.target.value === "G") {
      setPassCode("");
    } else if (e.target.value === "E") {
      setPassCode("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{
          overflowX: "scroll",
          height: "600px",
          width: "800px",
        }}
      >
        <div className="flex flex-row items-center text-center mb-4">
          <div className="w-full">
            <h2 className="text-xl font-semibold">Meeting Invitation</h2>
          </div>
          <div
            onClick={() => setShowScheduleMeeting(false)}
            className="my-auto font-normal border px-3 bg-gray-200 text-red-500 cursor-pointer hover:bg-red-400 hover:text-red-100 rounded"
          >
            x
          </div>
        </div>

        {/* {loading ? <Loader /> : <></>} */}
        <div
          style={{
            backgroundColor: "rgb(184 197 225)",
            width: "100%",
            height: "1px",
            justifySelf: "center",
          }}
        ></div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2  sm:gap-4">
          {/* Meeting Source */}
          <div className="flex flex-col items-start w-full">
            <label htmlFor="type" className="font-bold p-1 text-base">
              Meeting Source
            </label>
            <select
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
              value={selectedMeetingSource}
              onChange={handleMeetingSourceChange}
              id="type"
            >
              <option value="">Select a Meeting Source</option>
              <option value="G">Google Meet</option>
              <option value="C">Custom Link</option>
              {/* <option value="Z">Zoom</option>
              <option value="T">Microsoft Team</option> */}
            </select>
          </div>

          {/* Custom Link */}
          {selectedMeetingSource == "C" && (
            <div className="flex flex-col items-start w-full">
              <label htmlFor="custom-link" className="font-bold p-1 text-base">
                Custom Link
              </label>
              <input
                type="text"
                id="custom-link"
                value={customLink}
                name="custom-link"
                onChange={(e) => setCustomLink(e.target.value)}
                placeholder="Meeting Link"
                className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
              />
            </div>
          )}

          {/* Start Date Time */}
          <div className="flex flex-col items-start w-full">
            <label htmlFor="start-date" className="font-bold p-1 text-base">
              Start Date Time
            </label>
            <input
              type="datetime-local"
              id="start-date"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
            />
          </div>

          {/* Invitation Method */}
          <div className="flex flex-col items-start w-full">
            <label htmlFor="invitation" className="font-bold p-1 text-base">
              Invitation Send Source
            </label>
            <select
              name="invitation"
              id="invitation"
              value={selectedInvitationSend}
              onChange={handleInvitationSendChange}
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
            >
              {invitationSendTypes.map((service, index) => (
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

          {/* Follow Up date and time */}
          <div className="flex flex-col items-start w-full">
            <label htmlFor="followup-date-time" className="font-bold mb-2">
              Follow up date
            </label>
            <input
              name="followup-date-time"
              id="followup-date-time"
              value={followUpDateTime}
              onChange={(e) => setFollowUpDateTime(e.target.value)}
              type="datetime-local"
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
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
        </div>
        {/* Send Button */}
        <div className="flex flex-row items-end gap-4 w-full mt-8">
          {selectedInvitationSend === "W" && (
            <>
              {profile.length === 0 && (
                <Link
                  to={"/qr-scan"}
                  className="bg-red-400 cursor-default text-white p-2 rounded hover:bg-red-600 font-normal font-mono text-base"
                >
                  scan whatsapp first
                </Link>
              )}
              {profile.length === 1 && !profile[0].active && (
                <Link
                  to={"/qr-scan"}
                  className="bg-red-400 cursor-default text-white p-2 rounded hover:bg-red-600 font-normal font-mono text-base"
                >
                  re-scan whatsapp
                </Link>
              )}
              {profile.length === 1 && profile[0].active && (
                <button
                  onClick={sendInvitation}
                  disabled={loading}
                  className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base ${
                    loading ? "bg-gray-500 hover:bg-gray-400" : ""
                  }`}
                >
                  {loading ? "Sending" : "Send"}
                </button>
              )}
            </>
          )}
          {selectedInvitationSend === "E" && (
            <button
              onClick={sendInvitation}
              disabled={loading}
              className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base ${
                loading ? "bg-gray-500 hover:bg-gray-400" : ""
              }`}
            >
              {loading ? "Sending" : "Send"}
            </button>
          )}
          {selectedInvitationSend === "A" && (
            <button
              onClick={sendInvitation}
              disabled={loading}
              className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base ${
                loading ? "bg-gray-500 hover:bg-gray-400" : ""
              }`}
            >
              {loading ? "Sending" : "Send"}
            </button>
          )}
        </div>
        <div className="flex flex-row  my-5">
          {selectedMeetingSource === "Z" ? (
            <div className="flex flex-col items-start w-full">
              <label htmlFor="passcode" className="font-bold p-1 text-base">
                Meeting Passcode
              </label>
              <input
                type="text"
                id="passcode"
                value={passCode}
                maxLength={10}
                name="passcode"
                onChange={(e) => setPassCode(e.target.value)}
                placeholder="Enter Meeting Passcode"
                className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
              />
            </div>
          ) : selectedMeetingSource === "T" ? (
            <div className="flex flex-col items-start w-full">
              <label
                htmlFor="password_required"
                className="font-bold p-1 text-base"
              >
                Password Required
              </label>
              <input
                id="password_required"
                type="checkbox"
                checked={isPasswordRequired}
                onChange={(e) => setIsPasswordRequired(e.target.checked)}
                className="w-5 h-5 my-auto border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
              />
            </div>
          ) : (
            <div className="flex flex-col items-start w-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};
