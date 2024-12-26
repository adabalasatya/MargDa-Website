import React, { useState } from 'react';

const VariableForm = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Phone: '',
    DayDate: '',
    Validity: '',
    Office: '',
    Whatsapp: '',
    OfficeEmail: '',
    OfficeMobile: '',
    DidNumber: '',
    DataLimit: '',
    DataView: '',
    LeadLimit: '',
    LeadView: '',
    DidExtn: '',
    SmsLimit: '',
    CallLimit: '',
    SnsLimit: '',
    WhatsappLimit: '',
    EmailLimit: '',
    SelfIncome: '',
    Team1Income: '',
    Team2Income: '',
    Team3Income: '',
    MeetLimit: '',
    TeamLimit: '',
    FranchiseIncome: '',
    PincodeIncome: '',
    DistrictIncome: '',
    StateIncome: '',
    ReferIncome: '',
    CountryIncome: '',
    ReferWallet: '',
    MeetWallet: '',
    BusinessDataIncome: '',
    RoyaltyIncome: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const resetForm = () => {
    setFormData({
      UserName: '',
      Email: '',
      Phone: '',
      DayDate: '',
      Validity: '',
      Office: '',
      Whatsapp: '',
      OfficeEmail: '',
      OfficeMobile: '',
      DidNumber: '',
      DataLimit: '',
      DataView: '',
      LeadLimit: '',
      LeadView: '',
      DidExtn: '',
      SmsLimit: '',
      CallLimit: '',
      SnsLimit: '',
      WhatsappLimit: '',
      EmailLimit: '',
      SelfIncome: '',
      Team1Income: '',
      Team2Income: '',
      Team3Income: '',
      MeetLimit: '',
      TeamLimit: '',
      FranchiseIncome: '',
      PincodeIncome: '',
      DistrictIncome: '',
      StateIncome: '',
      ReferIncome: '',
      CountryIncome: '',
      ReferWallet: '',
      MeetWallet: '',
      BusinessDataIncome: '',
      RoyaltyIncome: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Form Section */}
      <div className="flex justify-center pt-2">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg border border-gray-300">
          <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">User Link Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["UserName", "Email", "Phone"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === "Email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  />
                </div>
              ))}
            </div>

            {/* Date, Validity, and Communication */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["DayDate", "Validity", "Office"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  />
                </div>
              ))}
            </div>

            {/* WhatsApp, Email, and Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Whatsapp", "OfficeEmail", "OfficeMobile"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  />
                </div>
              ))}
            </div>

            {/* Limits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["DataLimit", "LeadLimit", "SmsLimit"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  />
                </div>
              ))}
            </div>

            {/* Income */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["SelfIncome", "Team1Income", "Team2Income"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-between mt-8">
              <button
                type="submit"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-md focus:ring-2 focus:ring-orange-400 transition duration-200"
              >
                Save
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 shadow-md focus:ring-2 focus:ring-gray-300 transition duration-200"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black text-center py-4 mt-6">
        <p>&copy; 2024 Margdarshak Media. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VariableForm;
