import { useState } from "react";
import {
  FaEye,
  FaMapMarkerAlt,
  FaPhone,
  FaSave,
  FaSearch,
  FaShower,
  FaStar,
  FaStreetView,
  FaUniversity,
  FaUserCog,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const SearchInstitutesFromGoogle = () => {
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [institutes, setInstitutes] = useState([]);

  const getInstitutes = async () => {
    if (!query) {
      return toast.warn("Enter query");
    } else if (query.length < 5) {
      return toast.warn("Enter at least 5 letters");
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/institute/get-institutes-from-google",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword: query, limit: 10 }),
        }
      );
      const data = await response.json();
      if (
        response.ok &&
        data.data &&
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {
        const institutes = data.data;
        setInstitutes(institutes);
      } else {
        toast.error("Data not found, please enter valid keywords");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQuery("");
      setLoading(false);
    }
  };

  const handleSave = async (item) => {
    const payload = {
      instituteName: item.name,
      phone: item.phone,
      address: item.address,
    };
    setLoading(true);
    try {
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
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.warn(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error || "Error in adding institute");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-16 flex flex-col justify-between h-full bg-gray-10 w-full">
      {loading && <Loader />}
      <div className="flex flex-col justify-center">
        {/* Show Records & Search */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-gray-700">Show</label>
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-gray-700">records</span>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-2 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="border rounded pl-8 py-1"
            />
            <button
              onClick={getInstitutes}
              className="bg-blue-500 text-white px-2 py-1 rounded ml-1 hover:bg-blue-700"
            >
              search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full text-sm text-left border-spacing-x-4">
            <thead>
              <tr className="text-gray-600 sticky top-0 bg-white z-10">
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaUserCog className="text-blue-600 w-4 h-4" />
                    <span>Actions</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaUniversity className="text-blue-600 w-4 h-4" />
                    <span>Name</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-green-600 w-4 h-4" />
                    <span>Address</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-yellow-600 w-4 h-4" />
                    <span>Phone</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <span>Rating</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FaStreetView className="text-yellow-600 w-4 h-4" />
                    <span>Number of reviews</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {institutes.length > 0 ? (
                institutes.map((item, index) => (
                  <tr
                    key={index}
                    //   className={`hover:bg-gray-50 transition-colors duration-200 ${
                    //     selectedRows.has(item.id) ? "bg-blue-50" : ""
                    //   }`}
                    //   onClick={() => toggleRowSelection(item.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          title="Save"
                          className="p-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                          onClick={() => handleSave(item)}
                        >
                          <FaSave className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-8 py-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-black">{item.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[140px]">
                      <div className="flex">
                        <span>{item.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.rating}</td>
                    <td className="px-4 py-3">
                      <div className="flex  justify-center items-center gap-1">
                        <span>{item.reviews.length}</span>
                        <button className="text-lg hover:text-gray-400">
                          {" "}
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border p-2 text-center font-semibold text-xl"
                    colSpan="9"
                  >
                    Search Institutes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="text-gray-600 text-sm text-center">
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

export default SearchInstitutesFromGoogle;
