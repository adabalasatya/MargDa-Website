import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import {
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaSms,
  FaUsers,
  FaCalendarAlt,
  FaUser,
  FaEdit,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ClientTimeline = () => {
  const location = useLocation();
  const [leadData, setLeadData] = useState({});
  const [logsData, setLogsData] = useState([]);
  const [editLogID, setEditLogID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stateItem, setStateItem] = useState(null);
  const [remark, setRemark] = useState("");
  const userLocalData = JSON.parse(localStorage.getItem("userData")) || {};
  const accessToken = userLocalData.access_token || null;
  const userName = userLocalData.user_data.name || null;

  useEffect(() => {
    const state = location.state || null;
    if (state && state.item) {
      setStateItem(state.item);
      fetchLogs(state.item);
      setLeadData(state.item);
    }
  }, []);

  const fetchLogs = async (item) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/logs/get-detailed-logs",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dataID: item.dataId, userID: item.userId }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.Logs && data.Logs.length > 0) {
          setLogsData(data.Logs);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemarkSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/logs/update-remarks",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ logID: editLogID, remarks: remark }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        setEditLogID(null);
        fetchLogs(stateItem);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!leadData.name)
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Client Timeline Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-orange-500">
            Client Timeline
          </h2>
          <h3 className="text-xl font-bold mb-6 text-gray-500">
            Welcome {userName}!
          </h3>
          <h3 className="text-xl font-bold mb-6 text-gray-500">
            You had not selected any lead
          </h3>
        </div>
      </div>
    );
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {isLoading && <Loader />}
      {/* Client Timeline Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">
          Client Timeline
        </h2>
        <h3 className="text-xl font-bold mb-6 text-gray-500">
          Welcome {userName}!
        </h3>
        <h3 className="text-xl font-bold mb-6 text-gray-500">
          Here is the time line of {leadData.name}
        </h3>
        <div className="flex items-center mb-6 bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center mr-4">
            <FaUser className="mr-2 text-orange-500" />
            <span className="text-lg font-semibold text-gray-700">Client</span>
          </div>
          {/* List */}
          <span className="text-lg font-semibold text-gray-700 mr-4 ml-2">
            Total {logsData.length}
          </span>
          {/* Search Bar */}
          <div className="flex items-center mr-4 ml-8">
            <FaSearch className="mr-2 text-orange-500" />
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Scrollable Timeline Container */}
        <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {/* Horizontal Timeline */}
          <div className="flex overflow-x-auto pb-6">
            {logsData.length > 0 &&
              logsData.map((event, index) => (
                <div key={index} className="flex-shrink-0 mr-6">
                  {/* Timeline Node */}
                  <div className="relative">
                    <div
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor:
                          event.type === "C"
                            ? "blue"
                            : event.type === "E"
                            ? "red"
                            : event.type === "W"
                            ? "green"
                            : event.type === "S"
                            ? "orange"
                            : "gray",
                      }}
                    >
                      {event.type === "C" ? (
                        <FaPhone className="text-white text-lg" />
                      ) : event.type === "E" ? (
                        <FaEnvelope className="text-white text-lg" />
                      ) : event.type === "W" ? (
                        <FaWhatsapp className="text-white text-lg" />
                      ) : event.type === "S" ? (
                        <FaSms className="text-white text-lg" />
                      ) : (
                        <FaUsers className="text-white text-lg" />
                      )}
                    </div>
                    <div className="border-t-2 border-orange-500 mt-3"></div>
                  </div>

                  {/* Event Details */}
                  <div className="mt-4 p-4 rounded-lg shadow-md w-64 bg-white hover:shadow-lg transition-shadow duration-300">
                    {event.type == "C" ? (
                      <div className="flex items-center mb-2">
                        <FaCalendarAlt className="mr-2 text-orange-500" />
                        <span className="font-semibold text-gray-700">
                          {new Date(event.call_start).toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center mb-2">
                        <FaCalendarAlt className="mr-2 text-orange-500" />
                        <span className="font-semibold text-gray-700">
                          {new Date(event.edate).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="grid gap-2 text-sm text-gray-600">
                      {event.type === "C" ? (
                        <>
                          <div>
                            <span className="font-semibold">
                              Caller Mobile:
                            </span>{" "}
                            {event.umobile}
                          </div>
                          <div>
                            <span className="font-semibold">
                              Receiver Mobile:
                            </span>{" "}
                            {event.cmobile}
                          </div>
                          <div>
                            <span className="font-semibold">Duration:</span>{" "}
                            {event.duration}
                          </div>
                          <div>
                            <span className="font-semibold">Record:</span>
                            {event.call_url &&
                            event.call_url.startsWith("https://cloud") ? (
                              <div>
                                <ReactAudioPlayer
                                  src={event.call_url}
                                  controls
                                  onError={(e) =>
                                    console.error("Error playing audio:", e)
                                  }
                                />
                              </div>
                            ) : event.call_url &&
                              event.call_url.startsWith("https://drive") ? (
                              <div className="flex items-center justify-center">
                                <iframe
                                  width="100%"
                                  height="60"
                                  className="rounded-lg border-2 border-slate-500 shadow-md"
                                  sandbox="allow-same-origin allow-scripts allow-presentation"
                                  src={
                                    event.call_url.split("view")[0] + "preview"
                                  }
                                ></iframe>
                              </div>
                            ) : (
                              "No recording"
                            )}
                          </div>
                        </>
                      ) : event.type === "E" ? (
                        <>
                          <div>
                            <span className="font-semibold">Sender Mail:</span>{" "}
                            {event.from_mail}
                          </div>
                          <div>
                            <span className="font-semibold">
                              Receiver Mail:
                            </span>{" "}
                            {event.to_mail}
                          </div>
                          <div>
                            <span className="font-semibold">Reply Email:</span>{" "}
                            {event.remail}
                          </div>
                          <div>
                            <span className="font-semibold">Subject:</span>{" "}
                            {event.subject}
                          </div>
                          <div className="overflow-x-scroll">
                            <span className="font-semibold">Matter:</span>{" "}
                            <div
                              id="preview"
                              className="border border-gray-300 rounded p-4 overflow-x-scroll"
                              dangerouslySetInnerHTML={{
                                __html: event.matter ? event.matter : "",
                              }}
                            />
                          </div>
                        </>
                      ) : event.type === "W" ? (
                        <>
                          <div>
                            <span className="font-semibold">
                              Sender Mobile:
                            </span>{" "}
                            {event.sender}
                          </div>
                          <div>
                            <span className="font-semibold">
                              Receiver Mobile:
                            </span>{" "}
                            {event.receiver}
                          </div>
                          <div>
                            <span className="font-semibold">Message:</span>{" "}
                            {event.message}
                          </div>
                        </>
                      ) : event.type === "S" ? (
                        <>
                          <div>
                            <span className="font-semibold">
                              Sender Mobile:
                            </span>{" "}
                            {event.umobile}
                          </div>
                          <div>
                            <span className="font-semibold">
                              Receiver Mobile:
                            </span>{" "}
                            {event.mobile}
                          </div>
                          <div>
                            <span className="font-semibold">Message:</span>{" "}
                            {event.message}
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="font-semibold">Type:</span>{" "}
                            {event.source == "G"
                              ? "Google Meet"
                              : event.source == "Z"
                              ? "Zoom"
                              : event.source == "M"
                              ? "Team"
                              : event.source}
                          </div>
                          <div>
                            <span className="font-semibold">Meeting Code:</span>{" "}
                            {event.link_code}
                          </div>
                          <div>
                            <span className="font-semibold">Join Time:</span>{" "}
                            {new Date(event.start_time).toLocaleString()}
                          </div>
                          <div>
                            <span className="font-semibold">Attendees:</span>{" "}
                            {event.invitees.map((attendee, i) => (
                              <div key={i}>{attendee}</div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm mt-3">
                      <div>
                        <span className="font-semibold ">Remarks:</span>

                        <span> {event.remark}</span>
                      </div>

                      <span
                        className="hover:text-blue-500 cursor-pointer"
                        onClick={() => {
                          setRemark(event.remark);
                          setEditLogID(event.logID);
                        }}
                      >
                        <FaEdit />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Edit Remarks Form */}
        {editLogID && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-md shadow-2xl max-w-7xl">
              <div className="text-xl py-5">Edit Remark</div>
              <div>
                <input
                  type="text"
                  placeholder="Remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setEditLogID(null)}
                  className="items-center justify-center w-1/3 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm"
                >
                  Close
                </button>
                <button
                  className="w-1/3 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                  disabled={isLoading}
                  onClick={handleRemarkSave}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientTimeline;
