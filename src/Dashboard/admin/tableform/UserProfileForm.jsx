/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const UserProfileForm = ({ user, setShowEditForm }) => {
  useEffect(() => {
    // fetchVariables();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    whatsapp: "",
    login: "",
    pic_url: "",
    address: "",
    placeID: "",
    refercode: "",
  });

  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userData ? userData.access_token : null;

  useEffect(() => {
    if (user) {
      console.log(user.refercode);
      setFormData((prevValues) => ({
        ...prevValues,
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
        whatsapp: user?.whatsapp || "",
        login: user?.login || "",
        pic_url: user?.pic_url || "",
        address: user?.address || "",
        placeID: user?.placeID || "",
        refercode: user?.refercode || "",
      }));
    }
  }, []);

  function formatDateToIndianISO(dateString) {
    const date = new Date(dateString); // Parse the ISO string

    // Get the local time adjusted for IST (UTC+5:30)
    const offsetDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);

    // Extract year, month, and day
    const year = offsetDate.getUTCFullYear();
    const month = String(offsetDate.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(offsetDate.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-6xl overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">{user.name} Profile Form</h2>

        {/* Wrap the table in a form */}
        <form onSubmit={handleSubmit}>
          {/* Table for Additional Fields */}
          <div className="mb-6">
            <table className="w-full border-collapse">
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Name
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="text"
                      name="validDate"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>

                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Email:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="User Email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Mobile
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="User Mobile"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Whatsapp Mobile
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="User Whatsapp Mobile"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Login:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="text"
                      name="login"
                      value={formData.login}
                      onChange={handleChange}
                      placeholder="User Login"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Pin Code:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="pincode"
                      value={formData.placeID}
                      onChange={handleChange}
                      placeholder="User Pin Code"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Address:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <textarea
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="User Address"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Refer Code:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="text"
                      name="refercode"
                      value={formData.refercode}
                      onChange={handleChange}
                      placeholder="User Refer Code"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowEditForm();
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
