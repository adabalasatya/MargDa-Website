import React from 'react';
import {
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaSms,
  FaUsers,
  FaCalendarAlt,
  FaUser,
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Client Timeline Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Client Timeline</h2>
        <div className="flex items-center mb-6 bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center mr-4">
            <FaUser className="mr-2 text-orange-500" />
            <span className="text-lg font-semibold text-gray-700">Client</span>
          </div>
          {/* List */}
          <span className="text-lg font-semibold text-gray-700 mr-4 ml-2">&lt;List&gt;</span>
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
        <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
          {/* Horizontal Timeline */}
          <div className="flex overflow-x-auto pb-6">
            {timelineData.map((event, index) => (
              <div key={index} className="flex-shrink-0 mr-6">
                {/* Timeline Node */}
                <div className="relative">
                  <div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor:
                        event.type === 'Call SIM' || event.type === 'Call API'
                          ? 'blue'
                          : event.type === 'Email Gmail'
                          ? 'red'
                          : event.type === 'WhatsApp'
                          ? 'green'
                          : event.type === 'SMS'
                          ? 'yellow'
                          : 'gray',
                    }}
                  >
                    {event.type === 'Call SIM' || event.type === 'Call API' ? (
                      <FaPhone className="text-white text-lg" />
                    ) : event.type === 'Email Gmail' ? (
                      <FaEnvelope className="text-white text-lg" />
                    ) : event.type === 'WhatsApp' ? (
                      <FaWhatsapp className="text-white text-lg" />
                    ) : event.type === 'SMS' ? (
                      <FaSms className="text-white text-lg" />
                    ) : (
                      <FaUsers className="text-white text-lg" />
                    )}
                  </div>
                  <div className="border-t-2 border-orange-500 mt-3"></div>
                </div>

                {/* Event Details */}
                <div className="mt-4 p-4 rounded-lg shadow-md w-64 bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-orange-500" />
                    <span className="font-semibold text-gray-700">{event.dateTime}</span>
                  </div>
                  <div className="grid gap-2 text-sm text-gray-600">
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
    </div>
  );
};

export default ClientTimeline;