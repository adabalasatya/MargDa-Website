import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";

const AddDataTeamContainer = ({ selectedRows, setIsAddDataTeamConOpen }) => {
  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    share: true,
    name: "",
    gender: "",
    dataType: "",
  });
  const [users, setUsers] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userData ? userData.access_token : null;

  useEffect(() => {
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
      if (response.ok) {
        setAllUsers(result.data);
        setUsers(result.data);
      } else {
        setUsers([]);
        setAllUsers([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (selectedUsers.length == 0) {
      return toast.error("Select At Least One Member");
    }
    const payload = {
      data: selectedRows,
      team: selectedUsers.map((user) => {
        return user.userID;
      }),
    };

    try {
      const response = await fetch(
        "https://margda.in:7000/api/data/add-data-team",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      setIsAddDataTeamConOpen(false);
    } catch (error) {
      console.error("Error updating data team:", error);
      toast.error(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchUserChange = (e) => {
    const query = e.target.value;

    setSearchUser(query);
    const filteredUsers = allUsers.filter(
      (user) =>
        user.email.includes(query.trim().toLowerCase()) ||
        user.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        user.mobile.includes(query.trim())
    );
    setUsers(filteredUsers);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-md shadow-2xl max-w-7xl">
        <h3 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
          Add New Record
        </h3>
        <form onSubmit={handleSubmit} className="space-y-8 min-h-[200px]">
          <div className="flex gap-4 justify-between items-start px-3">
            <div>
              <div className="relative flex-1">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="users"
                  placeholder="Search Team Members"
                  value={searchUser}
                  onChange={handleSearchUserChange}
                  className="w-full p-3 pl-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
              <div className="max-h-[200px] overflow-y-scroll bg-white rounded">
                {searchUser.length > 0 && searchUser.length < 5 && (
                  <div className="flex flex-row border p-4 mb-2 rounded bg-gray-200 mt-3 items-center">
                    Enter Atleast 5 characters
                  </div>
                )}
                {users && searchUser.length > 4 && users.length > 0 ? (
                  users.map((user) => (
                    <div
                      key={user.userID}
                      onClick={() => {
                        if (selectedUsers.includes(user)) {
                          return setSelectedUsers((pre) =>
                            pre.filter((item) => item.userID != user.userID)
                          );
                        }
                        setSelectedUsers((pre) => [...pre, user]);
                      }}
                      className="flex flex-row border p-4 mb-2 rounded bg-gray-200 mt-3 items-center"
                    >
                      <input
                        type="checkbox"
                        name="associate"
                        id="associate"
                        checked={selectedUsers.includes(user)}
                        onChange={(e) =>
                          setSelectedUsers((pre) => {
                            if (e.target.checked) {
                              return [...pre, user];
                            } else {
                              return pre.filter(
                                (item) => item.userID != user.userID
                              );
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
                ) : searchUser.length > 4 ? (
                  <div className="flex flex-row border p-4 mb-2 rounded bg-gray-200 mt-3 items-center">
                    Users not found for this email, mobile or name
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mt-6">
              {/* <span>Add team members, with you want to share this data</span> */}
              <div className="flex flex-col bg-gray-200 rounded p-2 mr-3 max-h-[200px] overflow-y-auto">
                {selectedUsers.map((user, i) => (
                  <div key={user.userID} className="flex items-start gap-3">
                    <div>{i + 1}. </div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => setIsAddDataTeamConOpen(false)}
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

export default AddDataTeamContainer;
