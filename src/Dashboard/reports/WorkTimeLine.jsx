import React from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaSms,
  FaUsers,
  FaMoneyBill,
  FaClock,
  FaVideo,
  FaPaperclip,
} from 'react-icons/fa';

const MyWorkTimeline = () => {
  const [showMore, setShowMore] = React.useState(false); // State to toggle visibility
  const [userName, setUserName] = React.useState('RP Singh'); // Default name

  // Sample data for work timeline
  const workTimeline = [
    {
      id: 1,
      type: 'callSIM',
      subType: 'Call SIM',
      direction: 'Incoming',
      dateTime: '2024-12-12T09:00:00',
      sender: '919212401007',
      receiver: '919212401008',
      duration: '15 min',
      record: 'View',
    },
    {
      id: 2,
      type: 'callAPI',
      subType: 'Call API',
      direction: 'Outgoing',
      dateTime: '2024-12-12T10:30:00',
      sender: '919212401008',
      receiver: '919212401009',
      duration: '20 min',
      record: 'View',
    },
    {
      id: 3,
      type: 'email',
      subType: 'Email Gmail',
      direction: 'Received',
      dateTime: '2024-12-12T11:00:00',
      sender: 'sender@example.com',
      receiver: 'receiver@example.com',
      subject: 'Subject of the email',
      matter: 'Matter of the email',
      attachment: 'attachment.pdf',
      duration: '5 min',
    },
    {
      id: 4,
      type: 'email',
      subType: 'Email Gmail',
      direction: 'Sent',
      dateTime: '2024-12-12T11:05:00',
      sender: 'sender@example.com',
      receiver: 'receiver@example.com',
      subject: 'Subject of the email',
      matter: 'Matter of the email',
      attachment: 'attachment.pdf',
      duration: '10 min',
    },
    {
      id: 5,
      type: 'whatsapp',
      subType: 'WhatsAppS',
      direction: 'Sent',
      dateTime: '2024-12-12T13:00:00',
      sender: '919212401007',
      receiver: '919212401008',
      message: 'This is a WhatsApp message',
      duration: '2 min',
    },
    {
      id: 6,
      type: 'whatsapp',
      subType: 'WhatsAppS',
      direction: 'Received',
      dateTime: '2024-12-12T14:00:00',
      sender: '919212401008',
      receiver: '919212401007',
      message: 'This is a WhatsApp message',
      duration: '3 min',
    },
    {
      id: 7,
      type: 'sms',
      subType: 'smsS',
      direction: 'Sent',
      dateTime: '2024-12-12T15:00:00',
      sender: '919212401007',
      receiver: '919212401008',
      message: 'This is an SMS',
      duration: '1 min',
    },
    {
      id: 8,
      type: 'sms',
      subType: 'smsA',
      direction: 'Received',
      dateTime: '2024-12-12T16:00:00',
      sender: '919212401008',
      receiver: '919212401007',
      message: 'This is an SMS',
      duration: '1 min',
    },
    {
      id: 9,
      type: 'meeting',
      subType: 'MeetGoogle',
      direction: 'Host',
      dateTime: '2024-12-12T17:00:00',
      client: 'Client Name',
      joinTime: '17:00 - 18:00',
      duration: '1 hour',
    },
  ];

  // Summary data
  const summary = {
    calls: { sent: 5, received: 3 },
    emails: { sent: 3, received: 5 },
    whatsapp: { sent: 3, received: 5 },
    sms: { sent: 3, received: 5 },
    meetings: { aligned: 5, joined: 2 },
    team: { direct: 5, indirect: 18 },
    business: { self: 100.5, team: 500.5 },
  };

  // Team Work Report data
  const teamWorkReport = [
    {
      associate: 'RP Singh',
      totalCalls: '5 + 3 = 8',
      totalEmails: '3 + 5 = 8',
      totalWhatsApp: '3 + 5 = 5',
      totalSMS: '3 + 5 = 8',
      totalMeetings: '5 - 2 = 3',
      teamSize: '5 + 18 = 23',
      businessSelf: '₹100.50',
      businessTeam: '₹500.50',
    },
  ];

  // Team Work Summary data
  const teamWorkSummary = {
    topCaller: 'RP Singh (919212401007) - 32 Calls',
    topEmailer: 'RP Singh (919212401007) - 43 Emails',
    topWhatsapper: 'RP Singh (919212401007) - 23 WhatsApps',
    topSMSer: 'RP Singh (919212401007) - 12 SMS',
    topMeetAligner: 'RP Singh (919212401007) - 15 people',
    topMeetJoiner: 'RP Singh (919212401007) - 15 people',
    topOnboarder: 'RP Singh (919212401007) - 15 people',
    topTeamBuilder: 'RP Singh (919212401007) - 9 + 12 = 27 people',
    topEarner: 'RP Singh (919212401007) - ₹100.00',
    topTeamEarner: 'RP Singh (919212401007) - ₹500.00',
    lowestCaller: 'RP Singh (919212401007) - 12 Calls',
    lowestEmailer: 'RP Singh (919212401007) - 13 Emails',
    lowestWhatsapper: 'RP Singh (919212401007) - 13 WhatsApps',
    lowestSMSer: 'RP Singh (919212401007) - 7 SMS',
    lowestMeetAligner: 'RP Singh (919212401007) - 7 people',
    lowestMeetJoiner: 'RP Singh (919212401007) - 7 people',
    lowestOnboarder: 'RP Singh (919212401007) - 7people',
    lowestTeamBuilder: 'RP Singh (919212401007) - 9 + 9 = 18 people',
    lowestEarner: 'RP Singh (919212401007) - ₹80.00',
    lowestTeamEarner: 'RP Singh (919212401007) - ₹200.00',
  };

  // Filter the timeline based on showMore state
  const filteredTimeline = showMore
    ? workTimeline
    : workTimeline.filter(
        (activity) =>
          activity.type !== 'sms' &&
          activity.type !== 'whatsapp' &&
          activity.type !== 'meeting'
      );

  // Function to convert duration to minutes
  const convertDurationToMinutes = (duration) => {
    if (!duration) return 0; // Handle undefined or null duration
    if (duration.includes('hour')) {
      return parseInt(duration) * 60;
    }
    return parseInt(duration);
  };

  // Function to calculate spacing based on duration
  const calculateSpacing = (duration, type) => {
    const baseSpacing = 20; // Minimum spacing in pixels
    const durationInMinutes = convertDurationToMinutes(duration);

    // Reduce spacing for frequent activities like emails
    if (type === 'email') {
      return baseSpacing + durationInMinutes * 1; // Smaller multiplier for emails
    }

    return baseSpacing + durationInMinutes * 2; // Default multiplier for other activities
  };

  // Function to get activity icon
  const getActivityIcon = (type) => {
    switch (type) {
      case 'callSIM':
      case 'callAPI':
        return <FaPhone className="w-5 h-5 text-blue-500" />;
      case 'email':
        return <FaEnvelope className="w-5 h-5 text-red-500" />;
      case 'whatsapp':
        return <FaWhatsapp className="w-5 h-5 text-green-500" />;
      case 'sms':
        return <FaSms className="w-5 h-5 text-yellow-500" />;
      case 'meeting':
        return <FaVideo className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  // Function to format date as "12/12/24"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear().toString().slice(-2); // Last 2 digits of the year
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-4">
      {/* My Work Timeline Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-orange-500">My Work Timeline</h2>
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="mr-2 text-orange-500" />
          <span className="mr-4">From Date</span>
          <FaCalendarAlt className="mr-2 text-orange-500" />
          <span className="mr-4">To Date</span>
          <FaSearch className="mr-2 text-orange-500" />
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <h2 className="text-xl font-bold mb-4 text-Balck-500">Name: {userName}'s</h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-24 top-0 bottom-0 w-0.5 bg-orange-200"></div>

          {/* Activities */}
          {filteredTimeline.map((activity, index) => {
            const activityDate = new Date(activity.dateTime);
            const spacing = calculateSpacing(activity.duration, activity.type);

            return (
              <div
                key={activity.id}
                className="relative"
                style={{ marginTop: index === 0 ? '0' : `${spacing}px` }}
              >
                {/* Time Node */}
                <div className="absolute left-24 w-4 h-4 bg-white border-4 border-orange-500 rounded-full transform -translate-x-1/2"></div>

                {/* Date and Time */}
                <div className="absolute left-0 w-20 text-sm text-gray-600">
                  <div>{formatDate(activityDate)}</div>
                  <div>
                    {activityDate.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>
                </div>

                {/* Activity Card */}
                <div className="ml-32 bg-white rounded-lg shadow-sm p-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    {getActivityIcon(activity.type)}
                    <span className="font-medium">{activity.subType || activity.type}</span>
                    <span className="text-gray-600">{activity.direction}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    {activity.sender && <div>From: {activity.sender}</div>}
                    {activity.receiver && <div>To: {activity.receiver}</div>}
                    {activity.subject && <div>Subject: {activity.subject}</div>}
                    {activity.matter && <div>Matter: {activity.matter}</div>}
                    {activity.message && <div>Message: {activity.message}</div>}
                    {activity.attachment && (
                      <div className="flex items-center">
                        <FaPaperclip className="w-4 h-4 mr-1" />
                        {activity.attachment}
                      </div>
                    )}
                    {activity.client && <div>Client: {activity.client}</div>}
                    {activity.joinTime && <div>Time: {activity.joinTime}</div>}
                    {activity.duration && (
                      <div className="flex items-center">
                        <FaClock className="w-4 h-4 mr-1" />
                        {activity.duration}
                      </div>
                    )}
                    {activity.record && <div>Record: {activity.record}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* More Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>
        
      </div>

      {/* Work Timeline Summary Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6 text-orange-500">Work Timeline Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Calls Card */}
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaPhone className="w-6 h-6 text-orange-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">Calls</span>
            </div>
            <div className="text-gray-600">
              <p>Outgoing: {summary.calls.sent}</p>
              <p>Incoming: {summary.calls.received}</p>
              <p className="font-bold mt-2">
                Total: {summary.calls.sent + summary.calls.received}
              </p>
            </div>
          </div>

          {/* Emails Card */}
          <div className="bg-gradient-to-r from-red-100 to-red-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaEnvelope className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">Emails</span>
            </div>
            <div className="text-gray-600">
              <p>Sent: {summary.emails.sent}</p>
              <p>Received: {summary.emails.received}</p>
              <p className="font-bold mt-2">
                Total: {summary.emails.sent + summary.emails.received}
              </p>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaWhatsapp className="w-6 h-6 text-green-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">WhatsApp</span>
            </div>
            <div className="text-gray-600">
              <p>Sent: {summary.whatsapp.sent}</p>
              <p>Received: {summary.whatsapp.received}</p>
              <p className="font-bold mt-2">
                Total: {summary.whatsapp.sent + summary.whatsapp.received}
              </p>
            </div>
          </div>

          {/* SMS Card */}
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaSms className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">SMS</span>
            </div>
            <div className="text-gray-600">
              <p>Sent: {summary.sms.sent}</p>
              <p>Received: {summary.sms.received}</p>
              <p className="font-bold mt-2">
                Total: {summary.sms.sent + summary.sms.received}
              </p>
            </div>
          </div>

          {/* Meetings Card */}
          <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaVideo className="w-6 h-6 text-purple-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">Meetings</span>
            </div>
            <div className="text-gray-600">
              <p>Aligned: {summary.meetings.aligned}</p>
              <p>Joined: {summary.meetings.joined}</p>
              <p className="font-bold mt-2">
                Total: {summary.meetings.aligned - summary.meetings.joined}
              </p>
            </div>
          </div>

          {/* Team Size Card */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaUsers className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">Team Size</span>
            </div>
            <div className="text-gray-600">
              <p>Direct: {summary.team.direct}</p>
              <p>Indirect: {summary.team.indirect}</p>
              <p className="font-bold mt-2">
                Total: {summary.team.direct + summary.team.indirect}
              </p>
            </div>
          </div>

          {/* Self Business Card */}
          <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaMoneyBill className="w-6 h-6 text-green-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">Self Business</span>
            </div>
            <div className="text-gray-600">
              <p className="font-bold">₹{summary.business.self.toFixed(2)}</p>
            </div>
          </div>

          {/* Team Business Card */}
          <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaMoneyBill className="w-6 h-6 text-teal-500 mr-2" />
              <span className="text-lg font-semibold text-gray-700">Team Business</span>
            </div>
            <div className="text-gray-600">
              <p className="font-bold">₹{summary.business.team.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
<br />
      {/* Your Team’s Work Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Your Team’s Work Report</h2>

         <div className="flex items-center mb-4">
            {/* Associates */}
            <div className="flex items-center mr-4">
              <FaUser className="mr-2 text-orange-500" />
              <span className="text-lg font-semibold text-gray-700">Associates</span>
            </div>
            {/* List */}
            <span className="text-lg font-semibold text-gray-700 mr-4">&lt;List&gt;</span>
            {/* Search Bar */}
            <div className="flex items-center mr-4">
              <FaSearch className="mr-2 text-orange-500" />
              <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {/* From Date */}
            <div className="flex items-center mr-4">
              <FaCalendarAlt className="mr-2 text-orange-500" />
              <span className="text-lg font-semibold text-gray-700">From Date</span>
            </div>
            {/* To Date */}
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-orange-500" />
              <span className="text-lg font-semibold text-gray-700">To Date</span>
            </div>
          </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-300 text-Balck">
                <th className="p-4 text-left font-semibold">
                  <FaUser className="inline mr-2" />Associate Name
                </th>
                <th className="p-4 text-left font-semibold">Total Calls Outgoing + Incoming</th>
                <th className="p-4 text-left font-semibold">Total Emails Sent + Replied</th>
                <th className="p-4 text-left font-semibold">Total WhatsApp Sent + Replied</th>
                <th className="p-4 text-left font-semibold">Total SMS Sent + Replied</th>
                <th className="p-4 text-left font-semibold">Total Meeting Aligned - Joined</th>
                <th className="p-4 text-left font-semibold">Team size</th>
                <th className="p-4 text-left font-semibold">Business Self</th>
                <th className="p-4 text-left font-semibold">Business Team</th>
              </tr>
            </thead>
            <tbody>
              {teamWorkReport.map((report, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 transition-colors duration-200"
                >
                  <td className="p-4 text-gray-700">{report.associate}</td>
                  <td className="p-4 text-gray-700">{report.totalCalls}</td>
                  <td className="p-4 text-gray-700">{report.totalEmails}</td>
                  <td className="p-4 text-gray-700">{report.totalWhatsApp}</td>
                  <td className="p-4 text-gray-700">{report.totalSMS}</td>
                  <td className="p-4 text-gray-700">{report.totalMeetings}</td>
                  <td className="p-4 text-gray-700">{report.teamSize}</td>
                  <td className="p-4 text-gray-700">{report.businessSelf}</td>
                  <td className="p-4 text-gray-700">{report.businessTeam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Team’s Work Summary Section */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="mr-2 text-orange-500" />
            <span className="mr-4">From Date</span>
            <FaCalendarAlt className="mr-2 text-orange-500" />
            <span className="mr-4">To Date</span>
            <FaSearch className="mr-2 text-orange-500" />
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="h-5 w-5 mr-2 text-orange-500" />
            Your Team’s Work Summary
          </h3>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                  <th className="py-3 px-4 text-left font-semibold">Category</th>
                  <th className="py-3 px-4 text-left font-semibold">Team Member</th>
                  <th className="py-3 px-4 text-left font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { icon: FaPhone, color: "blue-600", label: "Top Caller", detail: teamWorkSummary.topCaller },
                  { icon: FaEnvelope, color: "red-600", label: "Top Emailer", detail: teamWorkSummary.topEmailer },
                  { icon: FaWhatsapp, color: "green-600", label: "Top Whatsapper", detail: teamWorkSummary.topWhatsapper },
                  { icon: FaSms, color: "yellow-600", label: "Top SMSer", detail: teamWorkSummary.topSMSer },
                  { icon: FaUsers, color: "gray-600", label: "Top Meet Aligner", detail: teamWorkSummary.topMeetAligner },
                  { icon: FaUsers, color: "gray-600", label: "Top Meet Joiner", detail: teamWorkSummary.topMeetJoiner },
                  { icon: FaUsers, color: "gray-600", label: "Top On-boarder", detail: teamWorkSummary.topOnboarder },
                  { icon: FaUsers, color: "gray-600", label: "Top Team Builder", detail: teamWorkSummary.topTeamBuilder },
                  { icon: FaMoneyBill, color: "green-600", label: "Top Earner", detail: teamWorkSummary.topEarner },
                  { icon: FaMoneyBill, color: "green-600", label: "Top Team Earner", detail: teamWorkSummary.topTeamEarner },
                  { icon: FaPhone, color: "blue-500", label: "Lowest Caller", detail: teamWorkSummary.lowestCaller },
                  { icon: FaEnvelope, color: "red-500", label: "Lowest Emailer", detail: teamWorkSummary.lowestEmailer },
                  { icon: FaWhatsapp, color: "green-500", label: "Lowest Whatsapper", detail: teamWorkSummary.lowestWhatsapper },
                  { icon: FaSms, color: "yellow-500", label: "Lowest SMSer", detail: teamWorkSummary.lowestSMSer },
                  { icon: FaUsers, color: "gray-500", label: "Lowest Meet Aligner", detail: teamWorkSummary.lowestMeetAligner },
                  { icon: FaUsers, color: "gray-500", label: "Lowest Meet Joiner", detail: teamWorkSummary.lowestMeetJoiner },
                  { icon: FaUsers, color: "gray-500", label: "Lowest On-boarder", detail: teamWorkSummary.lowestOnboarder },
                  { icon: FaUsers, color: "gray-500", label: "Lowest Team Builder", detail: teamWorkSummary.lowestTeamBuilder },
                  { icon: FaMoneyBill, color: "green-500", label: "Lowest Earner", detail: teamWorkSummary.lowestEarner },
                  { icon: FaMoneyBill, color: "green-500", label: "Lowest Team Earner", detail: teamWorkSummary.lowestTeamEarner },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-orange-100 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 flex items-center text-gray-700">
                      <item.icon className={`h-5 w-5 mr-2 text-${item.color}`} />
                      {item.label}
                    </td>
                    <td className="py-3 px-4 text-gray-700">RP Singh (919212401007)</td>
                    <td className="py-3 px-4 text-gray-700">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyWorkTimeline;