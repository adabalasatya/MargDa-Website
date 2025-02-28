import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaImage,
  FaPencilAlt,
  FaArrowLeft,
  FaBook,
} from "react-icons/fa";
import Select from "react-select";

const EditInstitute = () => {
  const location = useLocation();
  const [institute, setInstitute] = useState({
    instID: null,
    instituteName: "",
    email: "",
    phone: "",
    district: "",
    address: "",
    pincode: "",
    established: "",
    nirf: "",
    naac: "",
    prospectus: null,
    logo: null,
    website: "",
  });
  const [districts, setDistricts] = useState([]);
  const [instituteTypes, setInstituteTypes] = useState([]);
  const [selectedInstType, setSelectedInstType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    const { data } = location.state || {};
    setInstitute({
      instID: data.instID || null,
      instituteName: data.institute || "",
      email: data.email || "",
      phone: data.phone || "",
      district: data.districtID || "",
      address: data.address || "",
      pincode: data.pincode || "",
      established: data.established || "",
      nirf: data.nirf || "",
      naac: data.naac || "",
      prospectus: data.prospectus || null,
      logo: data.logo || null,
      website: data.website || "",
      instituteTypeName: data.instypeName || "",
    });

    if (data.instypeName) {
      const selectedType = instituteTypes.find(
        (type) => type.label === data.instypeName
      );
      setSelectedInstType(selectedType);
    }
  }, [instituteTypes]);

  useEffect(() => {
    fetchInstituteTypes();
  }, []);

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
        const types = data.Types.map((item) => ({
          label: item.typeinst,
          value: item.instype,
        }));
        setInstituteTypes(types);
      }
    } catch (error) {
      console.error("Error fetching institute types:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstitute((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setInstitute((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleUpdate = async () => {
    // Validation
    if (
      !institute.instID ||
      !institute.instituteName ||
      !institute.email ||
      !institute.phone ||
      !selectedInstType
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      // Create request body
      const requestBody = {
        instID: parseInt(institute.instID),
        instituteName: institute.instituteName.trim(),
        email: institute.email,
        phone: parseInt(institute.phone.replace(/\D/g, "")),
        pincode: institute.pincode || undefined,
        address: institute.address || undefined,
        established: institute.established
          ? parseInt(institute.established)
          : undefined,
        nirf: institute.nirf || undefined,
        naac: institute.naac || undefined,
        prospectus: institute.prospectus || undefined,
        logo: institute.logo || undefined,
        website: institute.website || undefined,
        insType: selectedInstType.value,
      };

      // Remove undefined fields
      Object.keys(requestBody).forEach(
        (key) => requestBody[key] === undefined && delete requestBody[key]
      );

      const response = await fetch(
        "https://margda.in:7000/api/institute/edit-institute",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Institute updated successfully.");
        window.history.back();
      } else {
        console.error("Server Response:", data);
        alert(`Error updating institute: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating institute:", error);
      alert("An error occurred while updating the institute");
    }
  };

  if (loading) return <p>Loading institute details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex items-center justify-between mb-6 relative pt-6 ">
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h3 className="text-3xl text-blue-600 font-bold text-center absolute left-1/2 transform -translate-x-1/2">
          <u>
            Edit Institute <FaPencilAlt className="inline text-red-500" />
          </u>
        </h3>
      </div>

      <div className="bg-gray-10 p-12 rounded-lg shadow-md mx-auto max-w-3xl border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <label
              htmlFor="instituteName"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Institute
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-4 text-black-500" />
              <input
                id="instituteName"
                type="text"
                name="instituteName"
                placeholder="Enter institute name"
                value={institute.instituteName}
                onChange={handleInputChange}
                className="pl-10 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="instituteType"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Institute Type
            </label>
            <div className="flex bg-white items-center gap-2 border px-3 rounded h-12 shadow-sm">
              <FaBook className="text-black-600" />
              <Select
                placeholder="Select Institute Type*"
                options={instituteTypes}
                value={selectedInstType}
                onChange={setSelectedInstType}
                className="w-full  rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-4 text-black-500" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email address"
                value={institute.email}
                onChange={handleInputChange}
                className="pl-10 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-4 text-black-500" />
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={institute.phone}
                onChange={handleInputChange}
                className="pl-10 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Address
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-4 text-black-500" />
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Enter address"
                value={institute.address}
                onChange={handleInputChange}
                className="pl-10 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Pincode
            </label>
            <div className="relative">
              <FaEye className="absolute left-3 top-4 text-black-500" />
              <input
                id="pincode"
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={institute.pincode}
                onChange={handleInputChange}
                className="pl-10 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="established"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Established Year
            </label>
            <input
              id="established"
              type="number"
              name="established"
              placeholder="Enter established year"
              value={institute.established}
              onChange={handleInputChange}
              className="pl-3 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="nirf"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * NIRF Ranking
            </label>
            <input
              id="nirf"
              type="text"
              name="nirf"
              placeholder="Enter NIRF ranking (max 6 chars)"
              value={institute.nirf}
              onChange={handleInputChange}
              maxLength={6}
              className="pl-3 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="naac"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * NAAC Grade
            </label>
            <input
              id="naac"
              type="text"
              name="naac"
              placeholder="Enter NAAC grade (max 3 chars)"
              value={institute.naac}
              onChange={handleInputChange}
              maxLength={3}
              className="pl-3 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Website
            </label>
            <input
              id="website"
              type="text"
              name="website"
              placeholder="Enter website URL"
              value={institute.website}
              onChange={handleInputChange}
              className="pl-3 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-opacity-50"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Institute Logo
            </label>
            <div className="relative">
              <FaImage className="absolute left-3 top-4 text-black-500" />
              <input
                id="logo"
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="pl-10 py-3 block w-full border border-gray-300 "
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="prospectus"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              * Prospectus
            </label>
            <input
              id="prospectus"
              type="file"
              name="prospectus"
              onChange={handleFileChange}
              className="pl-3 py-3 block w-full border border-gray-300"
            />
          </div>

          <div className="col-span-1 md:col-span-2 text-center">
            <button
              type="button"
              onClick={handleUpdate}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInstitute;
