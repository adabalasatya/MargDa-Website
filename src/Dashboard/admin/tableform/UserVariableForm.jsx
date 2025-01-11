import React, { useState } from "react";

const UserVariableForm = ({ user, onClose, onSave }) => {
  // Initialize form data with user's data if it exists
  const [formData, setFormData] = useState({
    validDate: user?.validDate || "",
    officeMobile: user?.officeMobile || "",
    officeEmail: user?.officeEmail || "",
    emailPasscode: user?.emailPasscode || "",
    didNumber: user?.didNumber || "",
    didExtn: user?.didExtn || "",
    dataLimit: user?.dataLimit || 100,
    dataView: user?.dataView || 0,
    leadLimit: user?.leadLimit || 50,
    leadView: user?.leadView || 0,
    whatsApSLimit: user?.whatsApSLimit || 200,
    whatsApILimit: user?.whatsApILimit || 0,
    emailLimit: user?.emailLimit || 100,
    smsLimit: user?.smsLimit || 50,
    snsLimit: user?.snsLimit || 30,
    callLimit: user?.callLimit || 100,
    meetLimit: user?.meetLimit || 20,
    teamLimit: user?.teamLimit || 10,
    selfIncome: user?.selfIncome || 0,
    team1Income: user?.team1Income || 0,
    team2Income: user?.team2Income || 0,
    team3Income: user?.team3Income || 0,
    referIncome: user?.referIncome || 0,
    pinCodeIncome: user?.pinCodeIncome || 0,
    districtIncome: user?.districtIncome || 0,
    stateIncome: user?.stateIncome || 0,
    countryIncome: user?.countryIncome || 0,
    dataIncome: user?.dataIncome || 0,
    royaltyIncome: user?.royaltyIncome || 0,
    callWallet: user?.callWallet || 0,
    meetWallet: user?.meetWallet || 0,
    businessMonthly: user?.businessMonthly || 0,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Deduct consumed limits and update balances
  const deductConsumedLimit = (field, consumedValue) => {
    if (isNaN(consumedValue) || consumedValue < 0) return; // Validate input
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(prev[field] - consumedValue, 0), // Ensure balance doesn't go below 0
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the updated form data back to Adminuser
    onClose(); // Close the form
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-6xl overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">User Variable Form</h2>
        {user && (
          <div className="mb-4 flex space-x-6">
            <span>
              <strong>Name:</strong> {user.name}
            </span>
            <span>
              <strong>Email:</strong> {user.email}
            </span>
            <span>
              <strong>Phone:</strong> {user.mobile}
            </span>
            <span>
              <strong>WhatsApp:</strong> {user.whatsapp}
            </span>
          </div>
        )}

        {/* Wrap the table in a form */}
        <form onSubmit={handleSubmit}>
          {/* Table for Additional Fields */}
          <div className="mb-6">
            <table className="w-full border-collapse">
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Valid Date:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="date"
                      name="validDate"
                      value={formData.validDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Office Mobile:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="officeMobile"
                      value={formData.officeMobile}
                      onChange={handleChange}
                      placeholder="Enter Office Mobile"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Office Email:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="email"
                      name="officeEmail"
                      value={formData.officeEmail}
                      onChange={handleChange}
                      placeholder="Enter Office Email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Email Passcode:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="text"
                      name="emailPasscode"
                      value={formData.emailPasscode}
                      onChange={handleChange}
                      placeholder="Enter Email Passcode"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    DID Number:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="didNumber"
                      value={formData.didNumber}
                      onChange={handleChange}
                      placeholder="Enter DID Number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    DID Extn:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="didExtn"
                      value={formData.didExtn}
                      onChange={handleChange}
                      placeholder="Enter DID Extn"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Data Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="dataLimit"
                      value={formData.dataLimit}
                      onChange={handleChange}
                      placeholder="Enter Data Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Data View (Consumed):
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="dataView"
                      value={formData.dataView}
                      onChange={(e) => {
                        const consumedValue = parseInt(e.target.value, 10);
                        deductConsumedLimit(
                          "dataLimit",
                          consumedValue - formData.dataView
                        ); // Deduct consumed value
                        handleChange(e);
                      }}
                      placeholder="Enter Data View"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 5 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Lead Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="leadLimit"
                      value={formData.leadLimit}
                      onChange={handleChange}
                      placeholder="Enter Lead Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Lead View (Consumed):
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="leadView"
                      value={formData.leadView}
                      onChange={(e) => {
                        const consumedValue = parseInt(e.target.value, 10);
                        deductConsumedLimit(
                          "leadLimit",
                          consumedValue - formData.leadView
                        ); // Deduct consumed value
                        handleChange(e);
                      }}
                      placeholder="Enter Lead View"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 6 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    WhatsApS Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="whatsApSLimit"
                      value={formData.whatsApSLimit}
                      onChange={handleChange}
                      placeholder="Enter WhatsApS Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    WhatsApI Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="whatsApILimit"
                      value={formData.whatsApILimit}
                      onChange={handleChange}
                      placeholder="Enter WhatsApI Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 7 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Email Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="emailLimit"
                      value={formData.emailLimit}
                      onChange={handleChange}
                      placeholder="Enter Email Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    SMS Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="smsLimit"
                      value={formData.smsLimit}
                      onChange={handleChange}
                      placeholder="Enter SMS Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 8 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    SNS Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="snsLimit"
                      value={formData.snsLimit}
                      onChange={handleChange}
                      placeholder="Enter SNS Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Call Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="callLimit"
                      value={formData.callLimit}
                      onChange={handleChange}
                      placeholder="Enter Call Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 9 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Meet Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="meetLimit"
                      value={formData.meetLimit}
                      onChange={handleChange}
                      placeholder="Enter Meet Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Team Limit:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="teamLimit"
                      value={formData.teamLimit}
                      onChange={handleChange}
                      placeholder="Enter Team Limit"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 10 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Self Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="selfIncome"
                      value={formData.selfIncome}
                      onChange={handleChange}
                      placeholder="Enter Self Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Team1 Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="team1Income"
                      value={formData.team1Income}
                      onChange={handleChange}
                      placeholder="Enter Team1 Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 11 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Team2 Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="team2Income"
                      value={formData.team2Income}
                      onChange={handleChange}
                      placeholder="Enter Team2 Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Team3 Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="team3Income"
                      value={formData.team3Income}
                      onChange={handleChange}
                      placeholder="Enter Team3 Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 12 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Refer Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="referIncome"
                      value={formData.referIncome}
                      onChange={handleChange}
                      placeholder="Enter Refer Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Pin-code Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="pinCodeIncome"
                      value={formData.pinCodeIncome}
                      onChange={handleChange}
                      placeholder="Enter Pin-code Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 13 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    District Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="districtIncome"
                      value={formData.districtIncome}
                      onChange={handleChange}
                      placeholder="Enter District Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    State Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="stateIncome"
                      value={formData.stateIncome}
                      onChange={handleChange}
                      placeholder="Enter State Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 14 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Country Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="countryIncome"
                      value={formData.countryIncome}
                      onChange={handleChange}
                      placeholder="Enter Country Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Data Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="dataIncome"
                      value={formData.dataIncome}
                      onChange={handleChange}
                      placeholder="Enter Data Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 15 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Royalty Income:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="royaltyIncome"
                      value={formData.royaltyIncome}
                      onChange={handleChange}
                      placeholder="Enter Royalty Income"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Call Wallet:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="callWallet"
                      value={formData.callWallet}
                      onChange={handleChange}
                      placeholder="Enter Call Wallet"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
                {/* Row 16 */}
                <tr>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Meet Wallet:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="meetWallet"
                      value={formData.meetWallet}
                      onChange={handleChange}
                      placeholder="Enter Meet Wallet"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-700 w-1/4">
                    Business Monthly:
                  </td>
                  <td className="border px-4 py-2 w-1/4">
                    <input
                      type="number"
                      name="businessMonthly"
                      value={formData.businessMonthly}
                      onChange={handleChange}
                      placeholder="Enter Business Monthly"
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
              onClick={onClose}
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

export default UserVariableForm;
