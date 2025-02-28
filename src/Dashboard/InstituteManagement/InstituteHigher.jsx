import { useState, useEffect } from "react";
import {
  FaUniversity,
  FaBookOpen,
  FaPen,
  FaSearch,
  FaEdit,
  FaChalkboardTeacher,
  FaPoll,
  FaGraduationCap,
  FaEllipsisV,
  FaAngleLeft,
  FaAngleRight,
  FaPhone,
  FaTrophy,
  FaClipboardCheck 
} from "react-icons/fa";
import { Link } from "react-router-dom";

const InstituteHigher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localUserData = JSON.parse(localStorage.getItem("userData"));
        const accessToken = localUserData ? localUserData.access_token : null;

        if (!accessToken) {
          throw new Error("No access token found.");
        }

        const response = await fetch(
          "https://margda.in:7000/api/institute/get-institutes",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.Institutes && Array.isArray(result.Institutes)) {
          console.log(result.Institutes);
          setData(result.Institutes);
        } else {
          setData([]); // If Institutes is not an array or doesn't exist, set to empty array
          console.warn(
            "API response does not contain an expected array of institutes"
          );
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  if (loading) return <p>Loading institutes...</p>;
  if (error) return <p>Error loading institutes: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow container mx-auto p-4">
        {/* Header */}
        <div className="mb-4 flex ml-12 pt-4 items-center gap-2">
          <FaUniversity className="text-blue-600 text-2xl" />
          <h2 className="text-2xl font-semibold">Institute Management</h2>
        </div>

        {/* Add Institute Button */}
        <div className="flex justify-end mb-4 gap-5">
          <Link
            to="/search-institutes"
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaSearch /> Search Your Institute
          </Link>
          <Link
            to="/add-institute"
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaUniversity /> Add Institute
          </Link>
        </div>

        {/* Show Records & Search */}
        <div className="flex ml-16 justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-gray-700">Show</label>
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-gray-700">records</span>
          </div>
          <div className="relative mr-16">
            <FaSearch className="absolute left-2 top-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="border rounded pl-8 py-1"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-lg w-[90%] m-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">
                  <div className="flex items-center">
                    <FaPen className="text-blue-600 inline-block" /> Action
                  </div>
                </th>
                <th className="p-3 border-b">
                  <FaUniversity className="text-blue-600 inline-block" />{" "}
                  Institute
                </th>
                <th className="p-3 border-b">
                  <FaUniversity className="text-blue-600 inline-block" />{" "}
                  Institute Type
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    <FaPhone /> Phone
                  </div>
                </th>
                <th className="p-3 border-b">
                  <FaBookOpen className="text-blue-600 inline-block" /> Details
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.instID} className="border-b hover:bg-gray-50">
                  <td className="p-3 relative">
                    <div className="relative">
                      <FaEllipsisV
                        className="text-xl cursor-pointer"
                        onClick={() => toggleMenu(item.instID)}
                      />
                      {menuOpen === item.instID && (
                        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <ul className="py-1">
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                              <Link
                                to={`/edit-form`}
                                state={{ data: item }}
                                className="w-full flex items-center"
                              >
                                <FaEdit className="inline-block mr-2" /> Edit
                              </Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                              <Link
                                to="/course-form"
                                state={{ data: item }}
                                className="w-full flex items-center"
                              >
                                <FaChalkboardTeacher className="inline-block mr-2" />{" "}
                                Course
                              </Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                              <Link
                                to="/subject-form"
                                state={{ data: item }}
                                className="w-full flex items-center"
                              >
                                <FaBookOpen className="inline-block mr-2" />{" "}
                                Subject
                              </Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                              <Link
                                to="/survey-form"
                                state={{ data: item }}
                                className="w-full flex items-center"
                              >
                                <FaPoll className="inline-block mr-2" /> Survey
                              </Link>
                            </li>
                          </ul>
                          <Link to="/institute-entrance" 
                          state={{ instituteName: item.institute, instID: item.instID }}
                          className="block px-4 py-2 hover:bg-gray-100">
                         <FaGraduationCap className="inline-block mr-2" /> Institute Entrance
                         </Link>
                         <Link to="/institute-staffs" 
                          state={{ instituteName: item.institute, instID: item.instID }}
                          className="block px-4 py-2 hover:bg-gray-100">
                         <FaGraduationCap className="inline-block mr-2" />  Institute Staffs
                         </Link>
                        
                      <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                        <Link
                          to={`/institute-cap`}
                          className="w-full flex items-center"
                        >
                          <FaGraduationCap className="inline-block mr-2" /> Institute CAP
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                        <Link
                          to={`/cap-contest`}
                          className="w-full flex items-center"
                        >
                          <FaTrophy className="inline-block mr-2" /> CAP Contest
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
                        <Link
                          to={`/cap-mcq`}
                          className="w-full flex items-center"
                        >
                          <FaClipboardCheck className="inline-block mr-2" /> CAP MCQ
                        </Link>
                      </li>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3 max-w-[250px]">{item.institute}</td>
                  <td className="p-3 max-w-[250px]">
                    {item.instypeName || "N/A"}
                  </td>
                  <td className="py-3">{item.phone}</td>
                  <td className="p-3">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mr-16 items-center mt-4">
          <span className="text-gray-700 ml-16">
            Showing 1 to {data.length} of {data.length} entries
          </span>
          <div className="flex items-center gap-3">
            <button
              className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 flex items-center gap-1"
              disabled={data.length === 0}
            >
              <FaAngleLeft /> Previous
            </button>
            <span className="px-3 py-1 border rounded bg-blue-600 text-white">
              1
            </span>
            <button
              className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 flex items-center gap-1"
              disabled={data.length === 0}
            >
              Next <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto w-full bg-gray-100 py-4 border-t flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4">
        <span>Margdarshak © {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">
            Support
          </a>
          <a href="#" className="hover:text-blue-600">
            Help Center
          </a>
          <a href="#" className="hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
};

export default InstituteHigher;
