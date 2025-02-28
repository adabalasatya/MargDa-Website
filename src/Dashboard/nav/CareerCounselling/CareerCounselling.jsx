import React, { useState, useEffect } from "react";
import Loader from "../../../Components/Loader";
import {
  FaSearch,
  FaUniversity,
  FaGraduationCap,
  FaUsers,
  FaClipboardList,
  FaUserGraduate,
  FaBookOpen,
  FaCheckCircle,
  FaClipboardCheck,
  FaPhoneAlt,
  FaWhatsapp,
  FaEllipsisV,
  FaChartBar,
  FaLink,
  FaFileAlt,
  FaUser,
  FaEnvelope,
  FaVenusMars,
  FaDatabase,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CareerCounselling = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [institute, setInstitute] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [menuOpen, setMenuOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/counselling/users",
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
          setData([]);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.Leads);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (institute) {
      const staticCourses = [
        { instcourID: 1, course: "Computer Science", studytype: "O" },
        { instcourID: 2, course: "Mechanical Engineering", studytype: "R" },
        { instcourID: 3, course: "Electrical Engineering", studytype: "O" },
      ];
      setCourses(staticCourses);
    } else {
      setCourses([]);
    }
  }, [institute]);

  const handleAddUser = async (item) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/counselling/add-to-users",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dataID: item.dataID,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGiveLink = async (item, type) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/aptitude/give-aptitude-link",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: item.name,
            whatsapp: item.whatsapp,
            type: type,
            userID: item.userID,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };
  const handleCheckboxChange = (id) => {
    setSelectedRows(
      selectedRows.includes(id)
        ? selectedRows.filter((rowId) => rowId !== id)
        : [...selectedRows, id]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? data.map((row) => row.id) : []);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Calculate the number of pages based on data length and records per page
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Adjust filteredData to use pagination
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedData = data
    .filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.exam.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, startIndex + recordsPerPage);

  return (
    <div className="container mx-auto p-4">
      {loading && <Loader />}
      {/* Header Section */}
      <div className="flex items-center space-x-3 mb-6 text-xl font-bold text-gray-700">
        <FaUsers className="text-gray-500" size={28} />
        <h1>Career Counselling</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institute
          </label>
          <div className="relative">
            <FaUniversity className="absolute left-3 top-3 text-gray-500" />
            <select
              onChange={(e) => setInstitute(e.target.value)}
              className="mt-1 block w-full p-2 pl-10 border border-gray-300 rounded-md"
            >
              <option value="">Select Institute</option>
              <option value="1">Margdarshak</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <div className="relative">
            <FaGraduationCap className="absolute left-3 top-3 text-gray-500" />
            <select
              onChange={(e) => setCourse(e.target.value)}
              className="mt-1 block w-full p-2 pl-10 border border-gray-300 rounded-md"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.instcourID} value={course.instcourID}>
                  {course.course} -{" "}
                  {course.studytype === "O" ? "Online" : "Regular"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top Table Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Show</span>
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm font-bold">Records</span>
        </div>

        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead className="bg-gray-100">
          <tr className="text-gray-700">
            <th className="px-4 py-3 border">
              <div className="flex items-center space-x-2">
                <input type="checkbox" onChange={handleSelectAll} />
                <FaUsers className="text-gray-600" />
                <span className="font-semibold text-gray-600">Leads</span>
              </div>
            </th>
            {[
              { icon: <FaUserGraduate />, text: "Details" },
              { icon: <FaClipboardList />, text: "Education" },
              { icon: <FaBookOpen />, text: "Exam" },
              { icon: <FaCheckCircle />, text: "Assessment" },
              { icon: <FaClipboardCheck />, text: "Follow Up" },
            ].map((header, index) => (
              <th key={index} className="px-4 py-3 border">
                <div className="flex items-center justify-center space-x-2">
                  {header.icon}
                  <span>{header.text}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">
                <div className="flex flex-col items-center space-y-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.userID)}
                    onChange={() => handleCheckboxChange(row.userID)}
                  />
                  <img
                    src={row.pic_url}
                    alt={row.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex items-center text-sm text-gray-500 space-x-3">
                    <FaPhoneAlt />
                    <FaWhatsapp />
                    <div className="relative">
                      <FaEllipsisV
                        className="cursor-pointer"
                        onClick={() => toggleMenu(row.userID || row.dataID)}
                      />
                      {(menuOpen === row.userID || menuOpen === row.dataID) && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          {row.userID ? (
                            <ul className="py-1">
                              <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                                <Link
                                  to="/user-dashboard"
                                  state={{
                                    userID: row.userID,
                                    name: row.name,
                                    pic: row.pic_url,
                                  }}
                                  className="w-full flex items-center"
                                >
                                  <FaChartBar className="mr-2" /> Dashboard
                                </Link>
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                                onClick={() => handleGiveLink(row, "aptitude")}
                              >
                                <FaLink className="mr-2" /> Aptitude Link
                              </li>
                              <li
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                                onClick={() => handleGiveLink(row, "attitude")}
                              >
                                <FaLink className="mr-2" /> Attitude Link
                              </li>
                              <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                                <FaFileAlt className="mr-2" /> Report
                              </li>
                            </ul>
                          ) : (
                            <ul className="py-1">
                              <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                                <button
                                  onClick={() => handleAddUser(row)}
                                  className="w-full flex items-center"
                                >
                                  <FaUser className="mr-2" /> Add User
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 border">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-blue-400 w-4 h-4" />

                    <span className="font-medium text-black">
                      {row.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-purple-400 w-4 h-4" />

                    <span className="text-black">{row.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-green-400 w-4 h-4" />

                    <span className="text-black">{row.mobile || "N/A"}</span>
                  </div>
                  <div className="flex rows-center space-x-2">
                    <FaWhatsapp className="text-green-500 w-4 h-4" />

                    <span className="text-black">{row.whatsapp || "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaVenusMars className="text-pink-400 w-4 h-4" />

                    <span className="text-black">{row.gender || "N/A"}</span>
                  </div>

                  {row.userID && (
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-blue-600 w-4 h-4" />
                      <span className="text-black">U</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-2 border">{row.education}</td>
              <td className="px-4 py-2 border">{row.exam}</td>
              <td className="px-4 py-2 border text-red-500">
                <div>Aptitude: {row.aptitude ? "✅" : "X"}</div>
                <div>Attitude: {row.attitude ? "✅" : "X"}</div>
              </td>
              <td className="px-4 py-2 border text-green-500">Log (0)</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bottom Table Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + recordsPerPage, data.length)} of {data.length}{" "}
          entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1 rounded border border-gray-300 text-sm">
            {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCounselling;
