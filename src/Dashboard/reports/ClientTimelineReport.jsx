import React from "react";
import { PhoneIncoming, PhoneOutgoing, Mail, MessageCircle, Video } from "lucide-react";

const milestones = [
  {
    dateTime: "2024-12-28 10:00 AM",
    type: "Call SIM (Incoming)",
    details: {
      caller: "123-456-7890",
      receiver: "987-654-3210",
      duration: "5 min",
      record: "Yes",
    },
    icon: <PhoneIncoming size={24} color="white" />,
    color: "bg-green-500",
  },
  {
    dateTime: "2024-12-28 11:00 AM",
    type: "Call API (Outgoing)",
    details: {
      caller: "123-456-7890",
      receiver: "987-654-3210",
      duration: "10 min",
      record: "No",
    },
    icon: <PhoneOutgoing size={24} color="white" />,
    color: "bg-blue-500",
  },
  {
    dateTime: "2024-12-28 12:00 PM",
    type: "Email Gmail (Received)",
    details: {
      sender: "sender@mail.com",
      receiver: "receiver@mail.com",
      subject: "Project Update",
      attachment: "File.pdf",
    },
    icon: <Mail size={24} color="white" />,
    color: "bg-purple-500",
  },
  {
    dateTime: "2024-12-28 01:00 PM",
    type: "WhatsApp (Sent)",
    details: {
      sender: "123-456-7890",
      receiver: "987-654-3210",
      message: "Hello, how are you?",
    },
    icon: <MessageCircle size={24} color="white" />,
    color: "bg-green-500",
  },
  {
    dateTime: "2024-12-28 02:00 PM",
    type: "Google Meet (Host)",
    details: {
      client: "John Doe",
      joinTime: "02:00 PM - 02:30 PM",
      duration: "30 min",
    },
    icon: <Video size={24} color="white" />,
    color: "bg-red-500",
  },
];

const TimelineWithDetails = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="font-bold text-2xl mb-12">Client Timeline</h2>
      <div className="relative flex items-center">
        {/* Central horizontal line */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300"></div>
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center w-1/5 ${
              index % 2 === 0 ? "mb-12" : "mt-12"
            }`}
          >
            {/* Connector line */}
            <div className="absolute top-1/2 w-1 h-10 bg-gray-300"></div>
            {/* Milestone content */}
            <div
              className={`relative bg-white shadow-md rounded-lg p-4 text-center ${
                index % 2 === 0 ? "mb-6" : "mt-6"
              }`}
            >
              <div
                className={`rounded-full h-12 w-12 flex items-center justify-center text-white ${milestone.color} mx-auto`}
              >
                {milestone.icon}
              </div>
              <h4 className="font-bold text-lg mt-4">{milestone.dateTime}</h4>
              <h5 className="font-semibold mt-2">{milestone.type}</h5>
              <ul className="text-sm text-gray-600 mt-2">
                {Object.entries(milestone.details).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineWithDetails;
