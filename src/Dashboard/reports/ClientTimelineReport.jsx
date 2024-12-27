import React from 'react';
import {
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaSms,
  FaUsers,
  FaCalendarAlt,
} from 'react-icons/fa';

const ClientTimeline = () => {
  // Sample data for client timeline
  const timelineData = [
    {
      type: 'Call SIM',
      direction: 'Incoming',
      dateTime: '12-12-2024 05:47:55',
      callerMobile: '919212401007',
      receiverMobile: '919478805499',
      duration: '0h 0m 12s',
      record: 'to pay audio (No download)',
    },
    {
      type: 'Call API',
      direction: 'Outgoing',
      dateTime: '12-12-2024 06:00:00',
      callerMobile: '919212401007',
      receiverMobile: '919478805499',
      duration: '0h 3m 45s',
      record: 'Record',
    },
    {
      type: 'Email Gmail',
      direction: 'Received',
      dateTime: '12-12-2024 06:30:00',
      senderMail: 'sender@example.com',
      receiverMail: 'receiver@example.com',
      subject: 'Project Update',
      matter: 'Please review the attached document.',
      attachment: 'Yes',
    },
    {
      type: 'Email Gmail',
      direction: 'Sent',
      dateTime: '12-12-2024 07:00:00',
      senderMail: 'sender@example.com',
      receiverMail: 'receiver@example.com',
      subject: 'Follow-up',
      matter: 'Waiting for your feedback.',
      attachment: 'No',
    },
    {
      type: 'WhatsApp',
      direction: 'Sent',
      dateTime: '12-12-2024 07:30:00',
      senderMobile: '919212401007',
      receiverMobile: '919478805499',
      message: 'Please check the document.',
    },
    {
      type: 'WhatsApp',
      direction: 'Received',
      dateTime: '12-12-2024 08:00:00',
      senderMobile: '919478805499',
      receiverMobile: '919212401007',
      message: 'Received, will review shortly.',
    },
    {
      type: 'SMS',
      direction: 'Sent',
      dateTime: '12-12-2024 08:30:00',
      senderMobile: '919212401007',
      receiverMobile: '919478805499',
      message: 'Reminder: Meeting at 10 AM.',
    },
    {
      type: 'SMS',
      direction: 'Received',
      dateTime: '12-12-2024 09:00:00',
      senderMobile: '919478805499',
      receiverMobile: '919212401007',
      message: 'Acknowledged.',
    },
    {
      type: 'MeetGoogle',
      direction: 'Host',
      dateTime: '12-12-2024 10:00:00',
      host: 'RP Singh',
      client: 'Client Name',
      joinTime: '10:00 AM - 11:00 AM',
      duration: '1h 0m 0s',
    },
  ];

  return (
    <div className="p-4">
      {/* Client Timeline Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Client Timeline</h2>
        <div className="flex items-center mb-4">
          <FaSearch className="mr-2 text-orange-500" />
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-orange-500 ml-4">
          {timelineData.map((event, index) => (
            <div key={index} className="mb-6 ml-6">
              {/* Timeline Node */}
              <div className="absolute -left-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                {event.type === 'Call SIM' || event.type === 'Call API' ? (
                  <FaPhone className="text-white" />
                ) : event.type === 'Email Gmail' ? (
                  <FaEnvelope className="text-white" />
                ) : event.type === 'WhatsApp' ? (
                  <FaWhatsapp className="text-white" />
                ) : event.type === 'SMS' ? (
                  <FaSms className="text-white" />
                ) : (
                  <FaUsers className="text-white" />
                )}
              </div>

              {/* Event Details */}
              <div className=" p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="mr-2 text-orange-500" />
                  <span className="font-semibold">{event.dateTime}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-semibold">Type:</span> {event.type}
                  </div>
                  <div>
                    <span className="font-semibold">Direction:</span> {event.direction}
                  </div>
                  {event.type === 'Call SIM' || event.type === 'Call API' ? (
                    <>
                      <div>
                        <span className="font-semibold">Caller Mobile:</span> {event.callerMobile}
                      </div>
                      <div>
                        <span className="font-semibold">Receiver Mobile:</span> {event.receiverMobile}
                      </div>
                      <div>
                        <span className="font-semibold">Duration:</span> {event.duration}
                      </div>
                      <div>
                        <span className="font-semibold">Record:</span> {event.record}
                      </div>
                    </>
                  ) : event.type === 'Email Gmail' ? (
                    <>
                      <div>
                        <span className="font-semibold">Sender Mail:</span> {event.senderMail}
                      </div>
                      <div>
                        <span className="font-semibold">Receiver Mail:</span> {event.receiverMail}
                      </div>
                      <div>
                        <span className="font-semibold">Subject:</span> {event.subject}
                      </div>
                      <div>
                        <span className="font-semibold">Matter:</span> {event.matter}
                      </div>
                      <div>
                        <span className="font-semibold">Attachment:</span> {event.attachment}
                      </div>
                    </>
                  ) : event.type === 'WhatsApp' || event.type === 'SMS' ? (
                    <>
                      <div>
                        <span className="font-semibold">Sender Mobile:</span> {event.senderMobile}
                      </div>
                      <div>
                        <span className="font-semibold">Receiver Mobile:</span> {event.receiverMobile}
                      </div>
                      <div>
                        <span className="font-semibold">Message:</span> {event.message}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="font-semibold">Host:</span> {event.host}
                      </div>
                      <div>
                        <span className="font-semibold">Client:</span> {event.client}
                      </div>
                      <div>
                        <span className="font-semibold">Join Time:</span> {event.joinTime}
                      </div>
                      <div>
                        <span className="font-semibold">Duration:</span> {event.duration}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTimeline;