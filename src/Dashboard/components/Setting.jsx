import React, { useState } from "react";

const SettingsPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    // Add logic to delete the account here
    alert("Account deleted!");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-12 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-8 text-center">
          Account Settings
        </h1>

        {/* Account Settings Form */}
        <form className="space-y-8">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold text-lg">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 p-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300 ease-in-out"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 p-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300 ease-in-out"
              placeholder="Enter your password"
            />
          </div>

          {/* Account Delete Section */}
          <div className="flex items-center justify-between mt-10">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-600 hover:text-red-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="text-xl">Delete Account</span>
            </button>
          </div>
        </form>
      </div>

      {/* Modal for Account Deletion */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
