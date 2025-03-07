import React, { useState } from 'react';
import { FileText, Table, ArrowRight, Pencil, Trash2, Search, Link, Hash, Database } from 'lucide-react';

const MastLink = () => {
  const [entries, setEntries] = useState([
    {
      linkID: 79,
      link_group: 'Skill mcq',
      link_gicon: <Table className="w-4 h-4" />,
      link: 'Skill mcq',
      link_icon: <ArrowRight className="w-4 h-4" />,
      link_url: 'skill-mcq',
      service: 'N/A'
    },
    {
      linkID: 78,
      link_group: 'Utilities',
      link_gicon: <FileText className="w-4 h-4" />,
      link: 'Schedule Reminder',
      link_icon: <FileText className="w-4 h-4" />,
      link_url: 'reminders',
      service: 'N/A'
    },
    {
      linkID: 77,
      link_group: 'Utilities',
      link_gicon: <FileText className="w-4 h-4" />,
      link: 'Templates',
      link_icon: <FileText className="w-4 h-4" />,
      link_url: 'user-template',
      service: 'N/A'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(entries.length / recordsPerPage);

  return (
    <div className="p-4 bg-gray-10 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg border border-blue-300 ">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <Hash className="mr-2 text-blue-500 w-8 h-8" /> 
            Mast Link
          </h1>
          
          <form className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {['Link_group', 'Link_gicon', 'Link', 'link_icon', 'link_rank', 'link_url'].map((placeholder, index) => (
                <div key={index} className="relative">
                  <Link className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder={placeholder}
                    className="border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <select className="border border-gray-300 rounded-md p-2 w-96 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select Service</option>
                <option value="1">Career Counselling </option>
                <option value="2" >Inside Sales Associate</option>
                <option value="3">Web Designer</option>
                <option value="4">HR Associate</option>
                <option value="5">Management Trainee</option>
                <option value="6">Career Aptitude Assessment</option>
                <option value="7">Dermato Ability Analyser</option>
                <option value="8">Work Attitude Assessment</option>
                <option value="9">Manager</option>
                <option value="10">Others</option> 
              </select>
            </div>
            
            <button 
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              Submit
            </button>
          </form>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <span className="mr-2">Show</span>
              <select className="border border-gray-300 rounded-md p-1">
                <option>10</option>
                {/* Add more options if needed */}
              </select>
              <span className="ml-2">entries</span>
            </div>
            <div className="relative w-64">
              <Search className="absolute top-3 left-3 text-blue-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="border border-gray-300 rounded-md p-2 pl-10 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-600">
                  <th className="border-b p-3 text-left font-semibold">
                    <div className="flex items-center">
                      <Database className="w-4 h-4 mr-2" />
                      LINKID
                    </div>
                  </th>
                  <th className="border-b p-3 text-left font-semibold">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      link_group
                    </div>
                  </th>
                  <th className="border-b p-3 text-left font-semibold">
                    <div className="flex items-center">
                      <Table className="w-4 h-4 mr-2" />
                      link_gicon
                    </div>
                  </th>
                  <th className="border-b p-3 text-left font-semibold">
                    <div className="flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      link
                    </div>
                  </th>
                  <th className="border-b p-3 text-left font-semibold">
                    <div className="flex items-center">
                      <Pencil className="w-4 h-4 mr-2" />
                      link_icon
                    </div>
                  </th>
                  <th className="border-b p-3 text-left font-semibold">
                    <div className="flex items-center">
                      <Link className="w-4 h-4 mr-2" />
                      link_url
                    </div>
                  </th>
                  <th className="border-b p-3 text-left font-semibold">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      service
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.linkID} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="border p-3">
                      {entry.linkID}
                      <div className="flex space-x-2 mt-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="border p-3">{entry.link_group}</td>
                    <td className="border p-3">{entry.link_gicon}</td>
                    <td className="border p-3">{entry.link}</td>
                    <td className="border p-3">{entry.link_icon}</td>
                    <td className="border p-3">{entry.link_url}</td>
                    <td className="border p-3">{entry.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 p-3 bg-white">
            <div>
              Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, entries.length)} of {entries.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;&lt; Previous
              </button>
              <span className="px-3 py-1 border rounded-md bg-blue-500 text-white">
                {currentPage}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                Next &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MastLink;