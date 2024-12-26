import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TeamList = () => {
  const roles = [
    { name: 'User', type: 'Team' },
    { name: 'Advisor', type: 'Team' },
    { name: 'Associate', type: 'Team' },
    { name: 'Franchise', type: 'Team' },
    { name: 'Reference', type: 'Reference' },
    
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      {/* Table Section */}
      <div className="flex justify-center pt-2">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg border border-gray-300">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Team List</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={index} className="border-b hover:bg-orange-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-gray-700">{role.name}</td>
                  <td className="px-6 py-4 text-gray-700">{role.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none transition duration-200">
                        <FaEdit className="text-sm" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none transition duration-200">
                        <FaTrashAlt className="text-sm" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black text-center py-4 mt-6">
        <p>&copy; 2024 Margdarshak Media. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeamList;
