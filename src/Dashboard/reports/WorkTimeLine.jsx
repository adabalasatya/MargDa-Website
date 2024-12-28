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
  FaClock, // Add FaClock here
} from 'react-icons/fa';

const MyWorkTimeline = () => {
  // Sample data for work timeline
  const workTimeline = [
    {
      type: 'Call SIM',
      direction: 'Incoming',
      dateTime: '12-12-2024 05:47:55',
      callerMobile: '919212401007',
      receiverMobile: '919212401008',
      duration: '5 minutes',
      record: 'Record',
    },
    {
      type: 'Call API',
      direction: 'Outgoing',
      dateTime: '12-12-2024 06:00:00',
      callerMobile: '919212401007',
      receiverMobile: '919212401009',
      duration: '3 minutes',
      record: 'Record',
    },
    // Add more work timeline data here
  ];

  // Sample data for team work report
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
    // Add more team work report data here
  ];

  // Sample data for team work summary
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
    lowestCaller: 'RP Singh (919212401007) - 32 Calls',
    lowestEmailer: 'RP Singh (919212401007) - 43 Emails',
    lowestWhatsapper: 'RP Singh (919212401007) - 23 WhatsApps',
    lowestSMSer: 'RP Singh (919212401007) - 12 SMS',
    lowestMeetAligner: 'RP Singh (919212401007) - 15 people',
    lowestMeetJoiner: 'RP Singh (919212401007) - 15 people',
    lowestOnboarder: 'RP Singh (919212401007) - 15 people',
    lowestTeamBuilder: 'RP Singh (919212401007) - 9 + 12 = 27 people',
    lowestEarner: 'RP Singh (919212401007) - ₹100.00',
    lowestTeamEarner: 'RP Singh (919212401007) - ₹500.00',
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

        {/* Work Timeline Table */}
        <table className="w-full border-collapse border border-orange-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-orange-300 p-2">
                <FaCalendarAlt className="inline mr-2 text-orange-500" />Date + Time
              </th>
              <th className="border border-orange-300 p-2">
                <FaPhone className="inline mr-2 text-orange-500" />Call Type
              </th>
              <th className="border border-orange-300 p-2">
                <FaUser className="inline mr-2 text-orange-500" />Direction
              </th>
              <th className="border border-orange-300 p-2">
                <FaPhone className="inline mr-2 text-orange-500" />Caller Mobile
              </th>
              <th className="border border-orange-300 p-2">
                <FaPhone className="inline mr-2 text-orange-500" />Receiver Mobile
              </th>
              <th className="border border-orange-300 p-2">
                <FaClock className="inline mr-2 text-orange-500" />Duration
              </th>
              <th className="border border-orange-300 p-2">Record</th>
            </tr>
          </thead>
          <tbody>
            {workTimeline.map((work, index) => (
              <tr key={index} className="hover:bg-orange-50">
                <td className="border border-orange-300 p-2">{work.dateTime}</td>
                <td className="border border-orange-300 p-2">{work.type}</td>
                <td className="border border-orange-300 p-2">{work.direction}</td>
                <td className="border border-orange-300 p-2">{work.callerMobile}</td>
                <td className="border border-orange-300 p-2">{work.receiverMobile}</td>
                <td className="border border-orange-300 p-2">{work.duration}</td>
                <td className="border border-orange-300 p-2">{work.record}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Section */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="border border-orange-300 p-4 bg-orange-50">
            <span>Total Calls Outgoing + Incoming</span>
            <span className="font-bold">5 + 3 = 8</span>
          </div>
          <div className="border border-orange-300 p-4 bg-orange-50">
            <span>Total Emails Sent + Replied</span>
            <span className="font-bold">3 + 5 = 8</span>
          </div>
          <div className="border border-orange-300 p-4 bg-orange-50">
            <span>Total WhatsApp Sent + Replied</span>
            <span className="font-bold">3 + 5 = 5</span>
          </div>
          <div className="border border-orange-300 p-4 bg-orange-50">
            <span>Total SMS Sent + Replied</span>
            <span className="font-bold">3 + 5 = 8</span>
          </div>
          <div className="border border-orange-300 p-4 bg-orange-50">
            <span>Total Meeting Aligned - Joined</span>
            <span className="font-bold">5 - 2 = 3</span>
          </div>
          <div className="border border-orange-300 p-4 bg-orange-50">
            <span>Total Team size</span>
            <span className="font-bold">5 + 18 = 23</span>
          </div>
          <div className="border border-orange-300 p-4 bg-orange-50">
            <span>Total Self Business</span>
            <span className="font-bold">₹100.50</span>
          </div>
          <div className="border border-orange-300 p-4 bg-orange-50">
            <span>Total Team Business</span>
            <span className="font-bold">₹500.50</span>
          </div>
        </div>
      </div>

      {/* Your Team’s Work Report Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Your Team’s Work Report</h2>
        <div className="flex items-center mb-4">
          <FaSearch className="mr-2 text-orange-500" />
          <input
            type="text"
            placeholder="Search Associates"
            className="border p-2 rounded focus:border-orange-500 focus:ring-orange-500 mr-4"
          />
          <FaCalendarAlt className="mr-2 text-orange-500" />
          <span className="mr-4">From Date</span>
          <FaCalendarAlt className="mr-2 text-orange-500" />
          <span className="mr-4">To Date</span>
        </div>
        <table className="w-full border-collapse border border-orange-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-orange-300 p-2">
                <FaUser className="inline mr-2 text-orange-500" />Associate Name
              </th>
              <th className="border border-orange-300 p-2">Total Calls Outgoing + Incoming</th>
              <th className="border border-orange-300 p-2">Total Emails Sent + Replied</th>
              <th className="border border-orange-300 p-2">Total WhatsApp Sent + Replied</th>
              <th className="border border-orange-300 p-2">Total SMS Sent + Replied</th>
              <th className="border border-orange-300 p-2">Total Meeting Aligned - Joined</th>
              <th className="border border-orange-300 p-2">Team size</th>
              <th className="border border-orange-300 p-2">Business Self</th>
              <th className="border border-orange-300 p-2">Business Team</th>
            </tr>
          </thead>
          <tbody>
            {teamWorkReport.map((report, index) => (
              <tr key={index} className="hover:bg-orange-50">
                <td className="border border-orange-300 p-2">{report.associate}</td>
                <td className="border border-orange-300 p-2">{report.totalCalls}</td>
                <td className="border border-orange-300 p-2">{report.totalEmails}</td>
                <td className="border border-orange-300 p-2">{report.totalWhatsApp}</td>
                <td className="border border-orange-300 p-2">{report.totalSMS}</td>
                <td className="border border-orange-300 p-2">{report.totalMeetings}</td>
                <td className="border border-orange-300 p-2">{report.teamSize}</td>
                <td className="border border-orange-300 p-2">{report.businessSelf}</td>
                <td className="border border-orange-300 p-2">{report.businessTeam}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-black-700">
                <tr>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Team Member</th>
                  <th className="py-2 px-4">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaPhone className="h-5 w-5 mr-2 text-orange-500" />
                    Top Caller
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topCaller}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaEnvelope className="h-5 w-5 mr-2 text-orange-500" />
                    Top Emailer
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topEmailer}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaWhatsapp className="h-5 w-5 mr-2 text-orange-500" />
                    Top Whatsapper
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topWhatsapper}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaSms className="h-5 w-5 mr-2 text-orange-500" />
                    Top SMSer
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topSMSer}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaUsers className="h-5 w-5 mr-2 text-orange-500" />
                    Top Meet Aligner
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topMeetAligner}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaUsers className="h-5 w-5 mr-2 text-orange-500" />
                    Top Meet Joiner
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topMeetJoiner}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaUsers className="h-5 w-5 mr-2 text-orange-500" />
                    Top On-boarder
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topOnboarder}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaUsers className="h-5 w-5 mr-2 text-orange-500" />
                    Top Team Builder
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topTeamBuilder}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaMoneyBill className="h-5 w-5 mr-2 text-orange-500" />
                    Top Earner
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topEarner}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaMoneyBill className="h-5 w-5 mr-2 text-orange-500" />
                    Top Team Earner
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.topTeamEarner}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaPhone className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Caller
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestCaller}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaEnvelope className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Emailer
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestEmailer}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaWhatsapp className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Whatsapper
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestWhatsapper}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaSms className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest SMSer
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestSMSer}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaUsers className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Meet Aligner
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestMeetAligner}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaUsers className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Meet Joiner
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestMeetJoiner}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaUsers className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest On-boarder
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestOnboarder}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaUsers className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Team Builder
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestTeamBuilder}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaMoneyBill className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Earner
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestEarner}</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="py-2 px-4 flex items-center">
                    <FaMoneyBill className="h-5 w-5 mr-2 text-orange-500" />
                    Lowest Team Earner
                  </td>
                  <td className="py-2 px-4">RP Singh (919212401007)</td>
                  <td className="py-2 px-4">{teamWorkSummary.lowestTeamEarner}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyWorkTimeline;