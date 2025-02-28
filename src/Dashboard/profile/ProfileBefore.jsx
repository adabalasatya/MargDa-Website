import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BeforeProfile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  const handleDeleteAccount = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const confirmDelete = async () => {
    setShowModal(false); // Close the modal
    try {
      const resposne = await fetch(
        "https://margda.in:7000/api/account/delete-account",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await resposne.json();
      if (resposne.ok) {
        alert("Account deleted successfully!");
        setShowModal(false); // Close the modal
        localStorage.removeItem("userData");
        navigate("/"); // Redirect to the homepage
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full space-y-6 mt-[-50px]">
        {/* Profile Card */}
        <div
          className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          onClick={handleProfileClick}
        >
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-300">
            Update Your Profile
          </h2>
          <p className="text-gray-600 mt-3">
            View and edit your profile information.
          </p>
        </div>

        {/* Delete Account Card */}
        <div
          className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          onClick={handleDeleteAccount}
        >
          <h2 className="text-2xl font-bold text-red-600 group-hover:text-red-800 transition-all duration-300">
            Delete Account
          </h2>
          <p className="text-gray-600 mt-3">
            Permanently delete your account and all associated data.
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeProfile;
