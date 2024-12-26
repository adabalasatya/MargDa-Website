import React, { useState } from "react";

const UserLinkForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    validDate: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    country: false,
    state: false,
    district: false,
    pincode: false,
    careerAwareness: false,
    aptitude: false,
    attitude: false,
    ability: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCheckboxes((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, ...checkboxes });
  };

  const resetForm = () => {
    setFormData({
      userName: "",
      email: "",
      phone: "",
      validDate: "",
    });
    setCheckboxes({
      country: false,
      state: false,
      district: false,
      pincode: false,
      careerAwareness: false,
      aptitude: false,
      attitude: false,
      ability: false,
    });
  };

  const checkboxGroups = [
    { title: "Address Fields", options: ["Country", "State", "District", "Pincode"] },
    { title: "Career Fields", options: ["Career Awareness", "Aptitude", "Attitude", "Ability"] },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      {/* Form Section */}
      <div className="flex justify-center pt-4">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg border border-gray-300">
          <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">User Link Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Information Section */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {["userName", "email", "phone", "validDate"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-2 capitalize">
                    {field === "validDate" ? "Valid Date" : field}
                  </label>
                  <input
                    type={field === "validDate" ? "date" : field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>

            {/* Checkboxes Section */}
            {checkboxGroups.map((group) => (
              <div key={group.title} className="grid grid-cols-2 gap-x-8">
                <h3 className="col-span-2 text-gray-800 font-medium mb-2">{group.title}</h3>
                {group.options.map((option) => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name={option.replace(" ", "").toLowerCase()}
                      checked={checkboxes[option.replace(" ", "").toLowerCase()]}
                      onChange={handleChange}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
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

export default UserLinkForm;
