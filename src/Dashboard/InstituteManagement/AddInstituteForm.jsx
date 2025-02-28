import { useEffect, useState } from "react";
import {
  FaUniversity,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaImage,
  FaFileAlt,
  FaGlobe,
  FaBook,
} from "react-icons/fa";
import Select from "react-select";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const Alert = ({ children, variant = "error" }) => {
  const styles = {
    error: "bg-red-50 text-red-700 border border-red-200",
    success: "bg-green-50 text-green-700 border border-green-200",
  };

  return <div className={`p-4 rounded-md ${styles[variant]}`}>{children}</div>;
};

const AddInstituteForm = () => {
  const [formData, setFormData] = useState({
    instituteName: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    established: "",
    nirf: "",
    naac: "",
    website: "https://",
    prospectus: "",
    logo: "",
  });

  const [instituteTypes, setInstituteTypes] = useState([]);
  const [selectedInstType, setSelectedInstType] = useState(null);

  const [files, setFiles] = useState({
    prospectus: null,
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchInstituteTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "established" && value > 9999) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: fileList[0],
    }));
  };

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch("https://margda.in:7000/api/upload_file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.fileUrls[0];
    } catch (err) {
      throw new Error(`File upload failed: ${err.message}`);
    }
  };

  const fetchInstituteTypes = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/institute/get-institute-types",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.Types && data.Types.length > 0) {
        const types = data.Types;
        types.map((item) => {
          item.label = item.typeinst;
          item.value = item.instype;
          return item;
        });
        setInstituteTypes(types);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!selectedInstType.value) {
      return toast.warn("Select a institute type");
    }

    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = ["instituteName", "email", "phone"];
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(
            `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
          );
        }
      }

      // Validate NIRF and NAAC length
      if (formData.nirf && formData.nirf.length > 6) {
        throw new Error("NIRF must not exceed 6 characters");
      }
      if (formData.naac && formData.naac.length > 3) {
        throw new Error("NAAC must not exceed 3 characters");
      }

      // Upload files if present
      const payload = { ...formData };
      payload.instType = selectedInstType.value;

      if (files.logo) {
        payload.logo = await uploadFile(files.logo);
      }

      if (files.prospectus) {
        payload.prospectus = await uploadFile(files.prospectus);
      }

      // Submit form data
      const response = await fetch(
        "https://margda.in:7000/api/institute/add-institute",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to add institute");

      setSuccess("Institute added successfully!");
      // Reset form
      setFormData({
        instituteName: "",
        email: "",
        phone: "",
        pincode: "",
        address: "",
        established: "",
        nirf: "",
        naac: "",
        website: "",
        prospectus: "",
        logo: "",
      });
      setFiles({ prospectus: null, logo: null });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col my-32 justify-center items-center bg-gray-10">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-10 relative">
        <h3 className="text-3xl font-semibold flex items-center mb-6 text-gray-800">
          <FaUniversity className="text-blue-600 mr-3" /> Add Institute
        </h3>

        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-6">
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Institute Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700">
                Institute Name*
              </label>
              <input
                type="text"
                placeholder="Institute Name"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Institute Type*
              </label>
              <div className="flex items-center gap-2 border px-3 rounded h-12 shadow-sm">
                <FaBook className="text-black-600" />
                <Select
                  placeholder="Select Institute Type*"
                  options={instituteTypes}
                  value={selectedInstType}
                  onChange={setSelectedInstType}
                  className="w-full rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      boxShadow: "none",
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Phone & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700">Email*</label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Institute Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Phone*</label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
                <FaPhone className="text-gray-500 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Institute Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700">Website</label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
                <FaGlobe className="text-gray-500 mr-2" />
                <input
                  type="url"
                  name="website"
                  placeholder="Institute Website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Established Year
              </label>
              <input
                type="number"
                name="established"
                max={9999}
                placeholder="Institute Established Year"
                value={formData.established}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Address & Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700">Address</label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="address"
                  placeholder="Institute Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Pincode</label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
                <FaLocationDot className="text-gray-500 bg-white mr-2" />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Institute Pin Code"
                  value={formData.pincode}
                  maxLength={6}
                  onChange={handleInputChange}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Established, NIRF & NAAC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700">
                NIRF Rank
              </label>
              <input
                type="text"
                name="nirf"
                placeholder="Institute NIRF Rank"
                value={formData.nirf}
                onChange={handleInputChange}
                maxLength={6}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                NAAC Grade
              </label>
              <input
                type="text"
                name="naac"
                placeholder="Institute Naac Rank"
                value={formData.naac}
                onChange={handleInputChange}
                maxLength={3}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 flex items-center">
                <FaImage className="text-blue-600 mr-2" /> Institute Logo
              </label>
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 flex items-center">
                <FaFileAlt className="text-blue-600 mr-2" /> Prospectus
              </label>
              <input
                type="file"
                name="prospectus"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              disabled={loading}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      <footer className="mt-24 text-gray-600 text-sm text-center">
        <p>Margdarshak © {new Date().getFullYear()}</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:underline">
            Support
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AddInstituteForm;
