import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Added useLocation import
import Select from "react-select";
import {
  Pencil,
  Trash2,
  Edit,
  User,
  Phone,
  Mail,
  Calendar,
  Book,
  Info,
} from "lucide-react";
import {
  FaArrowLeft,
  FaUniversity,
  FaGraduationCap,
  FaInfoCircle,
  FaSearch,
  FaBuilding,
} from "react-icons/fa";

const InstituteStaffsForm = () => {
  const location = useLocation(); // Added useLocation hook
  const [staffs, setStaffs] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [post, setPost] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [details, setDetails] = useState("");
  const [institute, setInstitute] = useState("");

  // New state for table controls
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const posts = [
    { value: "Teacher", label: "Teacher" },
    { value: "Admin", label: "Admin" },
    { value: "Counselor", label: "Counselor" },
  ];

  const availableSubjects = [
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
  ];

  useEffect(() => {
    const { instituteName, instID } = location.state || {};
    console.log("Location state:", location.state); // Debug log
    console.log("Institute name from state:", instituteName); // Debug log

    if (instituteName) {
      setInstitute(instituteName);
    } else {
      console.log("No institute name found in location state"); // Debug log
      setInstitute("Default Institute Name"); // Fallback name
    }
    // Placeholder for fetching institute name via API if not passed directly
    // fetchInstituteDetails(instID).then(details => {
    //   setInstitute(details.name || instituteName || 'Default Institute Name');
    // });
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStaff = {
      name,
      mobile,
      whatsApp,
      email,
      dob,
      qualification,
      post: post ? post.value : "",
      subjects: subjects.map((s) => s.value),
      details,
    };
    setStaffs([...staffs, newStaff]);
    // Reset form fields
    setName("");
    setMobile("");
    setWhatsApp("");
    setEmail("");
    setDob("");
    setQualification("");
    setPost(null);
    setSubjects([]);
    setDetails("");
  };

  const handleDelete = (index) => {
    setStaffs(staffs.filter((_, i) => i !== index));
  };

  // Filter staffs based on search term
  const filteredStaffs = staffs.filter((staff) =>
    Object.values(staff).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const recordsPerPage = parseInt(entriesPerPage, 10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStaffs.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredStaffs.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "38px",
      border: "1px solid #e5e7eb",
      borderRadius: "0.375rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#e5e7eb",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#6b7280",
    }),
  };

  const IconField = ({ Icon, ...props }) => (
    <div className="relative">
      <Icon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black-400" />
      <input
        {...props}
        className={`w-full pl-10 p-3 border rounded ${props.className}`}
      />
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-6 mt-6 relative">
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-blue-500 flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
          <FaGraduationCap className="text-4xl text-blue-800" />
          Institute Staffs
        </h2>
      </div>

      <div className="max-w-full bg-gray-30 mx-4 mt-6 p-6 rounded-lg shadow-md border border-gray-300">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            * Institute
          </label>
          <div className="flex  items-center gap-2 border p-2 rounded-lg mb-4 shadow-sm bg-gray-50">
            <FaBuilding className="text-blue-600" />
            <input
              type="text"
              value={institute}
              readOnly
              className="flex-1 text-green-600 font-semibold p-1 border-none bg-transparent focus:outline-none"
              placeholder="Institute Name"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                * Name
              </label>
              <IconField
                Icon={User}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                * Mobile
              </label>
              <IconField
                Icon={Phone}
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter Mobile"
                required
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                * WhatsApp
              </label>
              <IconField
                Icon={Phone}
                type="tel"
                value={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
                placeholder="Enter WhatsApp"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                * Email
              </label>
              <IconField
                Icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                * Date of Birth
              </label>
              <IconField
                Icon={Calendar}
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Select Date of Birth"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                * Qualification
              </label>
              <IconField
                Icon={Book}
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="Enter Qualification"
              />
            </div>

            {/* Post */}
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                * Post
              </label>
              <Select
                options={posts}
                value={post}
                onChange={setPost}
                styles={customSelectStyles}
                className="w-full"
                placeholder={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Book className="w-4 h-4 inline-block mr-2 text-black" />
                    Select Post
                  </div>
                }
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-blue-700 text-sm font-bold mb-2">
                * Subjects
              </label>
              <Select
                isMulti
                options={availableSubjects}
                value={subjects}
                onChange={setSubjects}
                styles={customSelectStyles}
                className="w-full"
                placeholder={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Book className="w-4 h-4 inline-block mr-2 text-black" />
                    Select Subjects
                  </div>
                }
              />
            </div>
          </div>

          {/* Details */}
          <div className="relative">
            <div className="col-span-full flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <FaInfoCircle className="text-black-600" />
                Details
              </h2>
              <textarea
                className="w-full pl-10 p-3 border rounded mb-4 min-h-[100px] resize-vertical"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter details"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mt-4"
          >
            Submit
          </button>
        </form>

        {/* New table controls */}
        <div className="flex justify-between items-center my-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden mt-8">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
              <th className="py-3 px-4 text-left">Qualification</th>
              <th className="py-3 px-4 text-left">Post</th>
              <th className="py-3 px-4 text-left">Subjects</th>
              <th className="py-3 px-4 text-left">Details</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.length > 0 ? (
              currentRecords.map((staff, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-3 px-4">{staff.name}</td>
                  <td className="py-3 px-4">{staff.dob}</td>
                  <td className="py-3 px-4">{staff.qualification}</td>
                  <td className="py-3 px-4">{staff.post}</td>
                  <td className="py-3 px-4">{staff.subjects.join(", ")}</td>
                  <td className="py-3 px-4">{staff.details}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800 mr-3"
                    >
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {filteredStaffs.length > 0 ? indexOfFirstRecord + 1 : 0} to{" "}
            {Math.min(indexOfLastRecord, filteredStaffs.length)} of{" "}
            {filteredStaffs.length} entries
            {searchTerm && ` (filtered from ${staffs.length} total records)`}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="px-3 py-1 border rounded bg-gray-50">
              {currentPage}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstituteStaffsForm;
