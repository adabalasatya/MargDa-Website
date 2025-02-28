import React, { useEffect, useState } from "react";
import {
  FaBusinessTime,
  FaMobileAlt,
  FaWhatsapp,
  FaEnvelope,
  FaAddressCard,
  FaIndustry,
  FaGlobe,
  FaFileUpload,
  FaUser,
  FaMapPin,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const BusinessForm = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [searchContactPerson, setSearchContactPerson] = useState("");
  const [managements, setManagements] = useState([]);
  const [fields, setFields] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  const [formData, setFormData] = useState({
    businame: "",
    bmobile: "",
    bwhatsap: "",
    bmail: "",
    pincode: "",
    address: "",
    fieldID: "",
    manageID: "",
    details: "",
    website: "",
    contactID: "",
    logoFile: null,
    docFile: null,
    videoFile: null,
  });

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;

  useEffect(() => {
    fetchBusiness();
    fetchManagements();
    fetchFields();
    fetchAllUsersData();
  }, [accessToken]);

  const fetchAllUsersData = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/admin/getallusers",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setAllUsers([]);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setAllUsers(result.data);
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBusiness = async () => {
    try {
      const resposne = await fetch(
        "https://margda.in:7000/api/business/get-user-businesses",
        {
          method: "GET",

          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await resposne.json();
      if (resposne.ok && data.Businesses && Array.isArray(data.Businesses)) {
        console.log(data);
        setBusinesses(data.Businesses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchManagements = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/manage/get-management",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setManagements(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/field/get-fields",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setFields(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleChange = (e) => {
    const { value, name, type, files } = e.target;
    if (type == "file") {
      const file = files[0];
      if (file) {
        setFormData((pre) => ({
          ...pre,
          [name]: file,
        }));
      }
    } else {
      setFormData((pre) => ({
        ...pre,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = async (file) => {
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
      if (response.ok && data.success) {
        return data.fileUrls;
      } else {
        toast.error("unable to upload files, try again later");
        return [];
      }
    } catch (error) {
      toast.error("File upload failed: " + error.message);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bmobile) {
      return toast.warn("Business Mobile Required");
    }
    if (!formData.bwhatsap) {
      return toast.warn("Business Whatsapp Required");
    }
    setLoading(true);
    const payload = {
      businame: formData.businame,
      bmobile: formData.bmobile,
      bwhatsap: formData.bwhatsap,
      bmail: formData.bmail,
      pincode: formData.pincode,
      address: formData.address,
      fieldID: formData.fieldID,
      manageID: formData.manageID,
      details: formData.details,
      website: formData.website,
      contactID: formData.contactID,
    };
    if (formData.logoFile) {
      const logo_url = await handleFileUpload(formData.logoFile);
      payload.logo = logo_url[0];
    }
    if (formData.docFile) {
      const doc_url = await handleFileUpload(formData.docFile);
      payload.doc_url = doc_url[0];
    }
    if (formData.videoFile) {
      const video_url = await handleFileUpload(formData.videoFile);
      payload.video_url = video_url[0];
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/business/add-business",
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
      if (response.ok) {
        toast.success(data.message);
        await fetchBusiness();
        setFormData({
          businame: "",
          bmobile: "",
          bwhatsap: "",
          bmail: "",
          pincode: "",
          address: "",
          fieldID: "",
          manageID: "",
          details: "",
          website: "",
          contactID: "",
          logoFile: null,
          docFile: null,
          videoFile: null,
        });
      } else {
        toast.error(data.message ? data.message : data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, bmobile: value });
  };

  const handleWhatsappChange = (value) => {
    setFormData({ ...formData, bwhatsap: value });
  };

  const handleSearchContactPersonChange = (e) => {
    const query = e.target.value;
    setSearchContactPerson(query);
    const filteredUsers = allUsers.filter(
      (user) =>
        user.email.includes(query.trim().toLowerCase()) ||
        user.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        user.mobile.includes(query.trim())
    );
    setUsers(filteredUsers);
  };

  return (
    <>
      <div className="flex justify-center mb-4 mt-4">
        <h2 className="text-3xl font-bold mb-4 text-blue-600 flex items-center justify-center">
          <FaBusinessTime className="mr-3" /> Business Data Entry Form
        </h2>
      </div>
      <div className="mx-16 p-8 bg-white shadow-2xl rounded-lg border border-gray-300">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaBusinessTime className={`text-blue-500 text-xl`} />
                <span>Business Name</span>
              </label>
              <div>
                <input
                  type="text"
                  name="businame"
                  placeholder="Business Name"
                  value={formData.businame}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaMobileAlt className={`text-green-500 text-xl`} />
                <span>Business Mobile</span>
              </label>
              <div>
                <PhoneInput
                  country={"in"}
                  value={formData.bmobile}
                  onChange={handlePhoneChange}
                  placeholder="Business Mobile"
                  inputStyle={{
                    width: "100%",
                    height: "50px",
                    paddingLeft: "58px",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaWhatsapp className={`text-green-600 text-xl`} />
                <span>Business WhatsApp</span>
              </label>
              <div>
                <PhoneInput
                  country={"in"}
                  value={formData.bwhatsap}
                  onChange={handleWhatsappChange}
                  placeholder="Business Whatsapp"
                  inputStyle={{
                    width: "100%",
                    height: "50px",
                    paddingLeft: "58px",
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaEnvelope className={`text-red-500 text-xl`} />
                <span>Business Mail</span>
              </label>
              <div>
                <input
                  type="email"
                  name="bmail"
                  onChange={handleChange}
                  value={formData.bmail}
                  placeholder="Enter Mail"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaIndustry className={`text-indigo-500 text-xl`} />
                <span>Business Field (Select list)</span>
              </label>
              <select
                name="fieldID"
                onChange={handleChange}
                value={formData.fieldID}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                required
              >
                <option value="">Select Business Field</option>
                {fields.length > 0 &&
                  fields.map((field, index) => (
                    <option value={field.fieldID} key={index}>
                      {field.field}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaUser className={`text-teal-500 text-xl`} />
                <span>Management (Select list)</span>
              </label>
              <select
                name="manageID"
                value={formData.manageID}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                required
              >
                <option value="">Select Management</option>
                {managements.length > 0 &&
                  managements.map((management, index) => (
                    <option value={management.managID} key={index}>
                      {management.management}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaGlobe className={`text-cyan-500 text-xl`} />
                <span>Website</span>
              </label>
              <div>
                <input
                  type="url"
                  name="website"
                  onChange={handleChange}
                  value={formData.website}
                  placeholder="Enter Website URL"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaMapPin className={`text-purple-500 text-xl`} />
                <span>Pin Code</span>
              </label>
              <div>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pin Code"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaAddressCard className={`text-purple-500 text-xl`} />
                <span>Address</span>
              </label>
              <div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Complete Address"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  rows="3"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaAddressCard className={`text-purple-500 text-xl`} />
                <span>Details</span>
              </label>
              <div>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Enter Additional Details"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaFileUpload className={`text-pink-500 text-xl`} />
                <span>Logo</span>
              </label>
              <div>
                <input
                  type="file"
                  name="logoFile"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaFileUpload className={`text-violet-500 text-xl`} />
                <span>Doc</span>
              </label>
              <div>
                <input
                  type="file"
                  name="docFile"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaFileUpload className={`text-amber-500 text-xl`} />
                <span>Video</span>
              </label>
              <div>
                <input
                  type="file"
                  name="videoFile"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-700 font-medium">
              <FaUser className={`text-orange-500 text-xl`} />
              <span>Contact Person</span>
            </label>
            <div className="relative flex-1">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="contactPerson"
                placeholder="Search Contact Person"
                value={searchContactPerson}
                onChange={handleSearchContactPersonChange}
                className="w-full p-3 pl-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                required
              />
            </div>
            <div>
              {searchContactPerson.length > 0 &&
                searchContactPerson.length < 5 && (
                  <div className="flex flex-row border p-4 mb-2 rounded bg-gray-200 mt-3 items-center">
                    Enter Atleast 5 characters
                  </div>
                )}
              {users && searchContactPerson.length > 4 && users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.userID}
                    onClick={() => {
                      if (formData.contactID == user.userID) {
                        return setFormData({ ...formData, contactID: "" });
                      }
                      setFormData({ ...formData, contactID: user.userID });
                    }}
                    className="flex flex-row border p-4 mb-2 rounded bg-gray-200 mt-3 items-center"
                  >
                    <input
                      type="checkbox"
                      name="associate"
                      id="associate"
                      checked={user.userID == formData.contactID}
                      onChange={(e) =>
                        setFormData((pre) => {
                          if (e.target.checked) {
                            return { ...pre, contactID: user.userID };
                          } else {
                            return { ...pre, contactID: "" };
                          }
                        })
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="mx-5 w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500">
                      <img
                        src={
                          user.pic_url
                            ? user.pic_url
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4uQmq5l06DIuhNUDihsvATgceMTbyKNBzT4Rharp2hacekLEJHq9eaKF1LPaT9_iRpA&usqp=CAU"
                        }
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-5">
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                      <div>{user.mobile}</div>
                    </div>
                  </div>
                ))
              ) : searchContactPerson.length > 4 ? (
                <div className="flex flex-row border p-4 mb-2 rounded bg-gray-200 mt-3 items-center">
                  Users not found for this email, mobile or name
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r ${
                loading
                  ? "bg-gray-400 hover:bg-gray-600"
                  : "from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              }  text-white p-3 rounded-lg transition duration-300 font-medium text-lg mt-4 shadow-lg`}
            >
              {loading ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>

        {/* Table below the form */}
        {businesses.length > 0 && (
          <div className="mt-8 border border-gray-300">
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
              Business Data Summary
            </h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">
                    Business
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Pin-code
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Management
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Field
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Details
                  </th>
                  <th className="border border-gray-300 p-3 text-left">Logo</th>
                  <th className="border border-gray-300 p-3 text-left">
                    Mobile
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Whatsapp
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Contact Person
                  </th>
                </tr>
              </thead>
              <tbody>
                {businesses.map((business, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-3">
                      {business.businame}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {business.pincode}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {business.manageName}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {business.fieldName}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {business.details || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {business.logo ? (
                        <a
                          className="text-blue-600 underline"
                          href={business.logo}
                          target="_blank"
                        >
                          view
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {business.bmobile}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {business.bwhatsap}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {business.contactPerson}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default BusinessForm;
