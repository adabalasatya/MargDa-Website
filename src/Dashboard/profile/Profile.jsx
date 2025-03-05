import React, { useState, useEffect } from "react";
import Logo from "../../assets/margdarshakendra-logo.webp";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaVenusMars,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import CreatableSelect from "react-select/creatable";

const ProfilePage = () => {
  // State to manage form values
  const [formValues, setFormValues] = useState({
    name: "",
    gender: "",
    mobile: "",
    whatsap: "",
    email: "",
    dob: "",
    address: "",
    pincode: "",
    pic_url: "",
    country_code: "",
    stateID: "",
    districtID: "",
    place: "",
  });

  const [file, setFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [states, setStates] = useState([]);
  const [pinCodeOptions, setPinCodeOptions] = useState([]);
  const [placesOptions, setPlacesOptions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchDistricts();
  }, [accessToken]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setFormValues({
        name: userData.user_data.name || "",
        gender: userData.user_data.gender || "",
        mobile: userData.user_data.mobile || "9876543210",
        whatsap: userData.user_data.whatsapp || "",
        email: userData.user_data.email || "",
        dob: formatDateToIndianISO(userData.user_data.dob) || "",
        address: userData.user_data.address || "",
        pincode: userData.user_data.pincode || "",
        pic_url: userData.user_data.pic_url,
        street_block: userData.user_data.place || null,
        country_code: userData.user_data.country_code || null,
        districtID: userData.user_data.districtID || null,
        stateID: userData.user_data.stateID || null,
        place: userData.user_data.place || null,
      });
      if (userData.user_data.country_code) {
        const filterStates = allStates.filter(
          (state) => state.country_code == userData.user_data.country_code
        );
        setStates(filterStates);
      }
      if (userData.user_data.stateID) {
        if (allStates.length > 0) {
          const state = allStates.find(
            (state) => state.stateID == userData.user_data.stateID
          );

          const filterDistricts = allDistricts.filter(
            (district) => district.state_code == state.state_code
          );
          fetchPinCodes(state.state_code);
          setDistricts(filterDistricts);
        }
      }
    } else {
      navigate("/login");
    }
  }, [allStates]);

  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, whatsap: value });
  };

  // Handle input changes
  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues({ ...formValues, pic_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.whatsap) {
      return toast.warn("Whatsapp Required");
    }
    if (!formValues.pic_url) {
      return toast.warn("Profile Pic Required");
    }
    if (!formValues.country_code) {
      return toast.warn("Select Your Country");
    }
    if (!formValues.stateID) {
      return toast.warn("Select Your State");
    }
    if (!formValues.pincode) {
      return toast.warn("Select Your Pin Code");
    }
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    } else if (formValues.pincode) {
      formData.append("pic_url", formValues.pic_url);
    }
    formData.append("whatsappMobile", formValues.whatsap);
    formData.append("name", formValues.name);
    formData.append("gender", formValues.gender);
    formData.append("DOB", formValues.dob);
    formData.append("address", formValues.address);
    formData.append("pincode", formValues.pincode);
    formData.append("country_code", formValues.country_code);
    formData.append("stateID", formValues.stateID);
    formData.append("districtID", formValues.districtID);
    formData.append("place", formValues.place || null);

    try {
      const response = await fetch(`https://margda.in:7000/api/updateuser`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        toast.warn(result.message);
      } else {
        const profile_url = result.profile_url;
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          userData.user_data.name = formValues.name;
          userData.user_data.whatsapp = formValues.whatsap;
          userData.user_data.dob = formValues.dob;
          userData.user_data.address = formValues.address;
          userData.user_data.pincode = formValues.pincode;
          userData.user_data.gender = formValues.gender;
          userData.user_data.pic_url = profile_url;
          userData.user_data.country_code = formValues.country_code;
          userData.user_data.stateID = formValues.stateID;
          userData.user_data.districtID = formValues.districtID;
          userData.user_data.place = formValues.place;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        toast.success(result.message);
        navigate("/data");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

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

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/get-countries",
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
        const conuntries = result.data;
        setCountries(
          conuntries.map((country) => ({
            value: country.country_code,
            label: country.country,
          }))
        );
      } else {
        console.error("Unexpected API response format:", result);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(
        `https://margda.in:7000/api/master/get-states`,
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
        const states = result.data;
        states.map((state) => {
          state.value = state.stateID;
          state.label = state.state;
        });
        setAllStates(result.data);
      } else {
        console.error("Unexpected API response format:", result);
        setAllStates([]); // Set states to empty if no states are found
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setAllStates([]); // Set states to empty if there's an error
    }
  };

  const fetchDistricts = async () => {
    try {
      const response = await fetch(
        `https://margda.in:7000/api/master/get-districts`,
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
        const districts = result.data;
        districts.map((district) => {
          district.value = district.districtID;
          district.label = district.district;
        });
        setAllDistricts(districts);
      } else {
        console.error("Unexpected API response format:", result);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchPinCodes = async (stateCode) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/pincode/get_pincode_with_statecode",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state_code: stateCode }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const pincodes = data.PinCodes;
        pincodes.map((item) => {
          item.label = `${item.pincode}, ${item.postoffice}`;
          item.value = item.pinID;
        });
        setPinCodeOptions(pincodes);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaces = async (pincode) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/pincode/get_places_with_pincode",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pincode }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const places = data.Places;
        places.map((item) => {
          item.label = item.place;
          item.value = item.placeID;
        });
        console.log(places);
        setPlacesOptions(places);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountryChange = (selectedCountry) => {
    const country_code = selectedCountry.value;
    setFormValues((pre) => ({
      ...pre,
      country_code: country_code,
      stateID: "",
      districtID: "",
    }));
    const filterStates = allStates.filter(
      (state) => state.country_code == country_code
    );
    setStates(filterStates);
  };

  const handleStateChange = (selectedState) => {
    const state_code = selectedState.state_code;
    setFormValues((pre) => ({
      ...pre,
      stateID: selectedState.stateID,
      districtID: "",
      pincode: "",
    }));
    fetchPinCodes(state_code);
    const filterDistricts = allDistricts.filter(
      (district) => district.state_code == state_code
    );
    setDistricts(filterDistricts);
  };

  const handleDistrictChange = (selectedDistrict) => {
    const districtID = selectedDistrict.value;
    setFormValues((pre) => ({
      ...pre,
      districtID: districtID,
    }));
  };

  const handlePinCodeChange = (selectedPincode) => {
    setFormValues((pre) => ({
      ...pre,
      pincode: selectedPincode.pincode,
    }));
    fetchPlaces(selectedPincode.pincode);
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center px-2 sm:px-6 lg:px-8">
        <div className="bg-white p-2 mx-4 sm:p-8 w-full shadow-lg rounded-xl mx-2 sm:mx-16">
          <div className="text-center mb-4 sm:mb-6">
            {/* Logo */}
            <div className="flex justify-center sm:justify-start">
              <img src={Logo} alt="Logo" className="w-20 sm:w-32 h-auto" />
            </div>

            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mt-2 sm:mt-4">
              Complete Your Profile
            </h2>
            <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">
              Help us know you better by filling out the details below.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white p-2 sm:p-6 shadow-sm rounded">
            <form className="space-y-2 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Profile Picture Section */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <div className="flex flex-col items-center mb-2 sm:mb-6">
                  <img
                    src={
                      formValues.pic_url ||
                      "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png"
                    }
                    alt="Profile Picture"
                    className="h-16 sm:w-24 sm:h-24 rounded-full border-2 sm:border-4 border-blue-500 shadow-md mb-1 sm:mb-4"
                  />
                  <label
                    htmlFor="profilePic"
                    className="text-xs sm:text-sm text-blue-600 cursor-pointer hover:underline"
                  >
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    onChange={handleProfilePicChange}
                    accept="image/*"
                    id="profilePic"
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                    >
                      <FaUser className={`text-blue-500 text-base mr-2`} />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Your Name"
                      onChange={handleOnInputChange}
                      value={formValues.name}
                      className="w-full border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                    >
                      <FaPhone className="text-green-500 text-base mr-2" />
                      Mobile
                    </label>
                    <input
                      type="text"
                      value={formValues.mobile}
                      disabled
                      className="w-full border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 bg-gray-100 text-gray-600 outline-none text-xs sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  {/* Gender */}
                  <div className="space-y-1">
                    <label
                      htmlFor="gender"
                      className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                    >
                      <FaVenusMars className="text-blue-500 text-base mr-2" />
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      onChange={handleOnInputChange}
                      value={formValues.gender}
                      required
                      className="w-full border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                    >
                      <option value="">Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>

                  {/* Whatsapp */}
                  <div>
                    <label
                      htmlFor="whatsap"
                      className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                    >
                      <FaWhatsapp className="text-green-700 text-base mr-2" />
                      WhatsApp Number
                    </label>

                    <PhoneInput
                      country={"in"}
                      value={formValues.whatsap}
                      onChange={handlePhoneChange}
                      placeholder="Whatsapp"
                      inputStyle={{
                        width: "100%",
                        height: "40px",
                        paddingLeft: "58px",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                  >
                    <FaEnvelope className="text-violet-700 text-base mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={formValues.email}
                    onChange={handleOnInputChange}
                    className="w-full border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>

                {/* Date Of Birth */}
                <div>
                  <label
                    htmlFor="dob"
                    className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                  >
                    <FaCakeCandles className="text-yellow-700 text-base mr-2" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    required
                    value={formValues.dob}
                    onChange={handleOnInputChange}
                    className="w-full border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                  >
                    <FaGlobe className="text-amber-600 text-base mr-2" />
                    Country
                  </label>
                  <Select
                    value={
                      countries.find(
                        (option) => option.value === formValues.country_code
                      ) || null
                    }
                    onChange={handleCountryChange}
                    id="country"
                    options={countries}
                    className="w-full  rounded overflow-y-visible focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* <CreatableSelect
                options={items}
                onCreateOption={handleCreate}
                isClearable
              /> */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                  >
                    <FaMapMarkerAlt className="text-green-600 text-base mr-2" />
                    State
                  </label>
                  <Select
                    value={
                      states.find(
                        (option) => option.value === formValues.stateID
                      ) || null
                    }
                    onChange={handleStateChange}
                    id="state"
                    options={states}
                    className="w-full  rounded overflow-y-visible focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                    placeholder="State"
                  />
                </div>

                {/* District */}
                <div>
                  <label
                    htmlFor="district"
                    className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                  >
                    <FaMapMarkerAlt className="text-green-600 text-base mr-2" />
                    District
                  </label>
                  <Select
                    value={
                      districts.find(
                        (option) => option.value === formValues.districtID
                      ) || null
                    }
                    onChange={handleDistrictChange}
                    id="district"
                    options={districts}
                    className="w-full  rounded overflow-y-visible focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                    placeholder="District"
                  />
                </div>

                {/* Pin Code */}
                <div>
                  <label
                    htmlFor="pincode"
                    className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                  >
                    <FaMapMarkerAlt className="text-green-600 text-base mr-2" />
                    Pin Code
                  </label>
                  <Select
                    value={
                      pinCodeOptions.find(
                        (option) => option.pincode === formValues.pincode
                      ) || null
                    }
                    onChange={handlePinCodeChange}
                    id="pincode"
                    options={pinCodeOptions}
                    className="w-full  rounded overflow-y-visible focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                    placeholder="Pin Code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                {/* Places */}
                <div>
                  <label
                    htmlFor="place"
                    className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                  >
                    <FaMapMarkerAlt className="text-green-600 text-base mr-2" />
                    Place
                  </label>
                  <input
                    type="text"
                    id="place"
                    name="place"
                    required
                    value={formValues.place}
                    onChange={handleOnInputChange}
                    placeholder="Place"
                    className="w-full border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                  {/* <CreatableSelect
                    options={placesOptions}
                    onCreateOption={handleCreate}
                    isClearable
                  /> */}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="flex items-center space-x-2 text-gray-700 font-medium text-base"
                  >
                    <FaMapMarkerAlt className="text-green-600 text-base mr-2" />
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formValues.address}
                    onChange={handleOnInputChange}
                    placeholder="Address"
                    className="w-full border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4 sm:mt-8 text-center">
                <button
                  type="submit"
                  className="w-full py-1 sm:py-3 px-2 sm:px-6 bg-orange-500 text-white rounded font-semibold text-sm sm:text-lg hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-200"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black text-center py-2 sm:py-4 mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm">
          &copy; 2024 Margdarshak Media. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default ProfilePage;
