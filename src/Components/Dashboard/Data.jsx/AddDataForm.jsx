import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";

const AddDataForm = ({ setIsAddDataFormOpen }) => {
  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    share: true,
    name: "",
    gender: "",
    dataType: "",
  });
  const [dataTypes, setDataTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userData ? userData.access_token : null;

  useEffect(() => {
    fetchDataTypes();
  }, [accessToken]);

  const fetchDataTypes = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/get-datatypes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        const formattedDataTypes = result.data.map((item) => ({
          id: item.datatype, // Use datatype as the unique ID
          value: item.datatype, // Use datatype as the value
          name: item.data, // Use data as the display name
        }));
        setDataTypes(formattedDataTypes);
      } else {
        console.error("Unexpected API response format:", result);
      }
    } catch (error) {
      console.error("Error fetching data types:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.whatsapp) {
      return toast.warn("Phone number and whatsapp numbers are required");
    }

    setIsLoading(true);

    const newRecord = {
      name: formData.name,
      email: formData.email,
      mobile: formData.phone,
      gender: formData.gender,
      whatsapp: formData.whatsapp,
      remarks: formData.remarks,
      share: formData.share,
      datatype: formData.dataType,
    };

    try {
      const response = await fetch("https://margda.in:7000/api/addlead", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) {
        if (response.status === 409) {
          return toast.error("Email Already Exists");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // Fetch the latest data after adding a new record
      //   await fetchData();
      toast.success(result.message);

      setFormData({
        phone: "",
        whatsapp: "",
        email: "",
        share: true,
        name: "",
        gender: "",
        dataType: "",
      });
      setIsAddDataFormOpen(false);
    } catch (error) {
      console.error("Error adding new record:", error);
      //   setError("Failed to add the record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    if (name == "share") {
      setFormData((prev) => ({
        ...prev,
        ["share"]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        // whatsapp: name === "phone" ? value : prev.whatsapp,
      }));
    }
  };

  const handlePhoneChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-md shadow-2xl max-w-7xl">
        <h3 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
          Add New Record
        </h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={formData.phone}
                onChange={(value) => handlePhoneChange(value, "phone")}
                className="w-full px-2 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={formData.whatsapp}
                onChange={(value) => handlePhoneChange(value, "whatsapp")}
                className="w-full px-2 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="WhatsApp number"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                required
              >
                <option value="">Select Gender</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="datatype">Data Type</label>
              <select
                name="dataType"
                value={formData.dataType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                required
              >
                <option value="">Select Data Type</option>
                {dataTypes &&
                  dataTypes.length &&
                  dataTypes.length > 0 &&
                  dataTypes.map((item, key) => (
                    <option key={key} value={item.value}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <div className="flex flex-col w-1/3 justify-center items-center">
              <label
                htmlFor="share"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Share
              </label>
              <input
                className="w-4 h-4"
                type="checkbox"
                name="share"
                id="share"
                checked={formData.share}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsAddDataFormOpen(false)}
              className="px-6 w-1/3 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 w-1/3 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "ADD"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDataForm;
