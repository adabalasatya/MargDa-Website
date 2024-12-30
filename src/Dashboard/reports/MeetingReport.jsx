import React from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaLink,
  FaClock,
} from 'react-icons/fa';

const MeetingReport = () => {
  // Sample data for meetings
  const meetings = [
    {
      dateTime: '12-12-2024 05:47:55',
      meetType: 'Google Meet',
      meetingLink: 'iku-cveo-yiu',
      host: 'RP Singh',
      client: 'Sanju',
      joinTime: '6.00 PM - 6.15 PM',
      duration: '12 minutes',
      crm: 'CRM+',
    },
    {
      dateTime: '13-12-2024 10:30:00',
      meetType: 'MS Teams',
      meetingLink: 'xyz-abc-def',
      host: 'SK Sharma',
      client: 'Rahul',
      joinTime: '10.30 AM - 11.00 AM',
      duration: '30 minutes',
      crm: 'CRM+',
    },
    // Add more meeting data here
  ];

  // Sample data for team report
  const teamReport = [
    {
      associate: 'RP Singh',
      totalAligned: 47,
      totalJoined: 23,
      totalOnboarded: 12,
    },
    {
      associate: 'SK Sharma',
      totalAligned: 2,
      totalJoined: 12,
      totalOnboarded: 1,
    },
    // Add more team report data here
  ];

  // Sample data for team summary
  const teamSummary = {
    topAligner: 'RP Singh - 32',
    topJoiner: 'RP Singh - 49',
    topOnboarder: 'RP Singh - 34',
    topTeamBuilder: 'RP Singh - 7 + 12',
    lowestAligner: 'RP Singh - 32',
    lowestJoiner: 'RP Singh - 49',
    lowestOnboarder: 'RP Singh - 34',
    lowestTeamBuilder: 'RP Singh - 1 + 6',
  };

  return (
    <div className="p-4">
      {/* Meeting Report Section */}
      <div className="mb-8">
  <h1 className="text-2xl font-bold mb-4 text-orange-500">Meeting Report</h1>
  <div className="flex space-x-16 mb-4">
    <span className="text-lg font-semibold text-black-700">&lt;Your Meeting&gt;</span>
    <span className="text-lg font-semibold text-black-700">&lt;Team Report&gt;</span>
    <span className="text-lg font-semibold text-black-700">&lt;Team Summary&gt;</span>
  </div>
</div>
      <div className="mb-8">
        
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

        {/* Task List and Search Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">Show</span>
            <input
              type="number"
              placeholder="10"
              className="border p-2 rounded w-16 focus:border-orange-500 focus:ring-orange-500"
            />
            <span className="ml-2">records</span>
          </div>
          <div className="flex items-center">
            <FaSearch className="mr-2 text-orange-500" />
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
  <table className="w-full border-collapse bg-white">
    <thead>
      <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <th className="py-3 px-4 text-left font-semibold">
          <FaCalendarAlt className="inline mr-2" />Date-Time
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Meet Type
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaLink className="inline mr-2" />Meeting Link
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Host
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Client
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaClock className="inline mr-2" />Join Time
        </th>
        <th className="py-3 px-4 text-left font-semibold">
          <FaClock className="inline mr-2" />Duration
        </th>
        <th className="py-3 px-4 text-left font-semibold">CRM</th>
      </tr>
    </thead>
    <tbody>
      {meetings.map((meeting, index) => (
        <tr
          key={index}
          className={`border-b border-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-orange-50 transition-colors duration-200`}
        >
          <td className="py-3 px-4 text-gray-700">{meeting.dateTime}</td>
          <td className="py-3 px-4 text-gray-700">{meeting.meetType}</td>
          <td className="py-3 px-4 text-gray-700">
            <a href={meeting.meetingLink} className="text-blue-500 hover:underline">
              {meeting.meetingLink}
            </a>
          </td>
          <td className="py-3 px-4 text-gray-700">{meeting.host}</td>
          <td className="py-3 px-4 text-gray-700">{meeting.client}</td>
          <td className="py-3 px-4 text-gray-700">{meeting.joinTime}</td>
          <td className="py-3 px-4 text-gray-700">{meeting.duration}</td>
          <td className="py-3 px-4 text-gray-700">{meeting.crm}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* Pagination */}
        <div className="mt-4">
          <span>Showing 1 to 10 records</span>
          <div className="inline-block float-right">
            <button className="mr-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              {"<<"} Previous
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Next {">>"}
            </button>
          </div>
        </div>
      </div>

      {/* Team Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Your Team's Meeting Report</h2>
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
      <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <th className="py-3 px-4 text-left font-semibold">
          <FaUser className="inline mr-2" />Associates
        </th>
        <th className="py-3 px-4 text-left font-semibold">Total Aligned</th>
        <th className="py-3 px-4 text-left font-semibold">Total Joined</th>
        <th className="py-3 px-4 text-left font-semibold">Total Onboarded</th>
      </tr>
    </thead>
    <tbody>
      {teamReport.map((report, index) => (
        <tr
          key={index}
          className={`border-b border-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-orange-50 transition-colors duration-200`}
        >
          <td className="py-3 px-4 text-gray-700">{report.associate}</td>
          <td className="py-3 px-4 text-gray-700">{report.totalAligned}</td>
          <td className="py-3 px-4 text-gray-700">{report.totalJoined}</td>
          <td className="py-3 px-4 text-gray-700">{report.totalOnboarded}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      {/* Team Summary Section */}
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
            Team’s Meeting Summary
          </h3>

          <div className="overflow-x-auto rounded-lg shadow-md">
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
        { icon: FaUser, color: "orange-500", label: "Top Aligner", detail: teamSummary.topAligner },
        { icon: FaUser, color: "orange-500", label: "Top Joiner", detail: teamSummary.topJoiner },
        { icon: FaUser, color: "orange-500", label: "Top On-boarder", detail: teamSummary.topOnboarder },
        { icon: FaUser, color: "orange-500", label: "Top Team Builder", detail: teamSummary.topTeamBuilder },
        { icon: FaUser, color: "orange-500", label: "Lowest Aligner", detail: teamSummary.lowestAligner },
        { icon: FaUser, color: "orange-500", label: "Lowest Joiner", detail: teamSummary.lowestJoiner },
        { icon: FaUser, color: "orange-500", label: "Lowest On-boarder", detail: teamSummary.lowestOnboarder },
        { icon: FaUser, color: "orange-500", label: "Lowest Team Builder", detail: teamSummary.lowestTeamBuilder },
      ].map((item, index) => (
        <tr
          key={index}
          className={`border-b border-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } hover:bg-orange-50 transition-colors duration-200`}
        >
          <td className="py-3 px-4 flex items-center text-gray-700">
            <item.icon className={`h-5 w-5 mr-2 text-${item.color}`} />
            {item.label}
          </td>
          <td className="py-3 px-4 text-gray-700">RP Singh</td>
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

export default MeetingReport;