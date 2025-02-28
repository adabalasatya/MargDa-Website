import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [editType, setEditType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  useEffect(() => {
    fetchTeams();
    fetchAllUsersData();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/admin/get-teams",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch team data");
      }

      const result = await response.json();

      if (result?.Teams) {
        const formattedData = result.Teams.map((team) => ({
          id: team.advisor,
          teamID: team.teamID,
          advisorName: team.details.name || "N/A",
          advisorPic: team.details.pic_url || "N/A",
          advisorMobile: team.details.mobile || "N/A",
          advisorEmail: team.details.email || "N/A",
          associate: team.associate ? team.associate.name || "N/A" : "N/A",
          associatePic: team.associate
            ? team.associate.pic_url || "N/A"
            : "N/A",
          associateMobile: team.associate
            ? team.associate.mobile || "N/A"
            : "N/A",
          associateEmail: team.associate
            ? team.associate.email || "N/A"
            : "N/A",
          leader: team.leader ? team.leader.name || "N/A" : "N/A",
          leaderPic: team.leader ? team.leader.pic_url || "N/A" : "N/A",
          leaderMobile: team.leader ? team.leader.mobile || "N/A" : "N/A",
          leaderEmail: team.leader ? team.leader.email || "N/A" : "N/A",
          mentor: team.mentor ? team.mentor.name || "N/A" : "N/A",
          mentorPic: team.mentor ? team.mentor.pic_url || "N/A" : "N/A",
          mentorMobile: team.mentor ? team.mentor.mobile || "N/A" : "N/A",
          mentorEmail: team.mentor ? team.mentor.email || "N/A" : "N/A",
          pincode: team.pincode || "N/A",
          district: team.district || "N/A",
          state: team.state || "N/A",
          country: team.country || "N/A",
          reference: team.reference || "N/A",
        }));
        setData(formattedData);
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      setData([]); // Setting data to an empty array to handle UI rendering when there's an error
      alert("Failed to fetch team data. Please try again later.");
    }
  };

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

  const handleEdit = (advisor, type) => {
    setEditType(type);
    setSelectedAdvisor(advisor);
    setShowEdit(true);
  };

  const handleChange = async (userID) => {
    setSelectedID(userID);
  };

  const handleSave = async () => {
    if (!selectedID) {
      return toast.error("Select a user");
    }
    let apiURL;
    let payload;
    if (editType == "associate") {
      apiURL = "https://margda.in:7000/api/admin/team/update-associate";
      payload = {
        teamID: selectedAdvisor.teamID,
        associateID: selectedID,
      };
    } else if (editType == "mentor") {
      apiURL = "https://margda.in:7000/api/admin/team/update-mentor";
      payload = {
        teamID: selectedAdvisor.teamID,
        mentorID: selectedID,
      };
    }
    try {
      const response = await fetch(apiURL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setShowEdit(false);
        fetchTeams();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredUsers = allUsers.filter(
      (user) =>
        user.email.includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.mobile.includes(query)
    );
    console.log(filteredUsers);
    setUsers(filteredUsers);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Advisor Team</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Advisor</th>
            <th className="py-2 px-4 border">Associate</th>
            <th className="py-2 px-4 border">Mentor</th>
            <th className="py-2 px-4 border">Pincode</th>
            <th className="py-2 px-4 border">District</th>
            <th className="py-2 px-4 border">State</th>
            <th className="py-2 px-4 border">Country</th>
            <th className="py-2 px-4 border">Reference</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {/* Advisor */}
                <td className="py-2 px-4 border">
                  <div className="flex items-center space-x-2">
                    {row.advisorPic !== "N/A" ? (
                      <img
                        src={row.advisorPic}
                        alt={`Advisor ${row.advisorName}`}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    )}
                    <div>
                      <p>{row.advisorName}</p>
                      <p className="text-sm text-gray-500">
                        {row.advisorMobile}
                      </p>
                      <p className="text-sm text-gray-500">
                        {row.advisorEmail}
                      </p>
                      <button className="text-blue-500 hover:underline">
                        Edit
                      </button>
                    </div>
                  </div>
                </td>
                {/* Associate */}
                <td className="py-2 px-4 border">
                  <div className="flex items-center space-x-2">
                    {row.associatePic !== "N/A" ? (
                      <img
                        src={row.associatePic}
                        alt={`Associate ${row.associate}`}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    )}
                    <div>
                      <p>{row.associate}</p>
                      <p className="text-sm text-gray-500">
                        {row.associateMobile}
                      </p>
                      <p className="text-sm text-gray-500">
                        {row.associateEmail}
                      </p>
                      <button
                        onClick={() => handleEdit(row, "associate")}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </td>

                {/* Mentor */}
                <td className="py-2 px-4 border">
                  <div className="flex items-center space-x-2">
                    {row.mentorPic !== "N/A" ? (
                      <img
                        src={row.mentorPic}
                        alt={`Mentor ${row.mentor}`}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    )}
                    <div>
                      <p>{row.mentor}</p>
                      <p className="text-sm text-gray-500">
                        {row.mentorMobile}
                      </p>
                      <p className="text-sm text-gray-500">{row.mentorEmail}</p>
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleEdit(row, "mentor")}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </td>
                {/* Other fields */}
                <td className="py-2 px-4 border">{row.pincode}</td>
                <td className="py-2 px-4 border">{row.district}</td>
                <td className="py-2 px-4 border">{row.state}</td>
                <td className="py-2 px-4 border">{row.country}</td>
                <td className="py-2 px-4 border">{row.reference}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-2 px-4 text-center">
                No data available or an error occurred.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2 max-w-6xl overflow-y-auto max-h-[70%]">
            <h2 className="text-xl font-bold mb-4">
              Edit {editType == "associate" ? "Associate" : "Mentor"} for{" "}
              {selectedAdvisor.advisorName}
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowEdit(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
            <div className="relative flex-1 max-w-[200px] ml-4">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 p-2 pl-8 rounded w-full"
                placeholder="Search"
              />
            </div>
            <div>
              {users &&
                searchQuery.length > 4 &&
                users.length > 0 &&
                users.map((user) => (
                  <div
                    key={user.userID}
                    className="flex flex-row border p-4 mb-2 rounded bg-gray-200 mt-3 items-center"
                  >
                    <input
                      type="radio"
                      name="associate"
                      id="associate"
                      onChange={() => handleChange(user.userID)}
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
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
