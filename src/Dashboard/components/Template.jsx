import React from "react";

const Template = () => {
  const data = [
    { id: 1, name: "John Doe", role: "Developer", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Designer", status: "Inactive" },
    { id: 3, name: "Bob Johnson", role: "Project Manager", status: "Active" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Template Component</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">User Data</h2>
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    user.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Template;
