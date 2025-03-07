import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCogs, FaSearch } from "react-icons/fa"

const ServiceType = () => {
  const [serviceType, setServiceType] = useState("");
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editableRecordId, setEditableRecordId] = useState(null);
  const [editedServicetype, setEditedServicetype] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;
  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/service/get-servicetypes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const sort = result.data.sort(
            (a, b) => a.servicetypeID - b.servicetypeID
          );
          setRecords(sort);
        }
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Failed to fetch services. Please try again later.");
    }
  };

  const saveServiceType = async () => {
    if (!serviceType) {
      return toast.warn("Enter Service Type");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/service/add-service-type",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ serviceType }),
        }
      );

      if (response.ok) {
        setServiceType("");
        await fetchServiceTypes();
      } else {
        console.error("Failed to save brand:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving brand:", error);
    }
  };

  const handleDeleteBrand = async (servicetypeID) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        const response = await fetch(
          "https://margda.in:7000/api/master/service/delete-service-type",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ servicetypeID }),
          }
        );

        if (response.ok) {
          await fetchServiceTypes();
        } else {
          console.error("Failed to delete brand:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  const handleEditBrand = async (servicetypeID) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/service/update-service-type",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            servicetypeID,
            serviceTypeName: editedServicetype,
          }),
        }
      );

      if (response.ok) {
        fetchServiceTypes();
        setEditableRecordId(null);
        setEditedServicetype("");
      } else {
        console.error("Failed to edit brand:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing brand:", error);
    }
  };

  const enableEdit = (record) => {
    setEditableRecordId(record.servicetypeID);
    setEditedServicetype(record.servicetype);
  };

  const saveEdit = async (record) => {
    await handleEditBrand(record.servicetypeID);
  };

  const cancelEdit = () => {
    setEditableRecordId(null);
    setEditedServicetype("");
  };

  const filteredRecords = records.filter((record) =>
    record.servicetype.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg border border-blue-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center">
        <FaCogs className="mr-2 text-blue-500" /> {/* Icon for h2 */}
        Service Types Management
      </h2>

  {/* Brand Input & Add Button */}
  <div className="flex gap-2 mb-8">
    <input
      type="text"
      value={serviceType}
      onChange={(e) => setServiceType(e.target.value)}
      placeholder="Service Type"
      className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:ring-0 focus:ring-blue-500 w-full" // Added w-full
    />
    <button
      onClick={saveServiceType}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
    >
      Add
    </button>
  </div>

  {/* Show Records & Search Bar */}
  <div className="flex justify-between items-center mb-8">
    {/* Show Records */}
    <div className="flex items-center">
      <span className="mr-2">Show</span>
      <select
        value={recordsPerPage}
        onChange={(e) => setRecordsPerPage(Number(e.target.value))}
        className="border border-gray-300 rounded-lg py-1 px-2"
      >
        {[10, 25, 50].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="ml-2">Records</span>
    </div>

      {/* Search Bar with Icon */}
      <div className="relative w-1/2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brands..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 px-4 focus:ring-0 focus:ring-blue-500" 
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
        </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-200 table-auto"> {/* Added table-auto */}
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-200 px-4 py-2 text-left">
            Service Type
          </th>
          <th className="border border-gray-200 px-4 py-2 text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {currentRecords.map((record) => (
          <tr
            key={record.servicetypeID}
            className="hover:bg-gray-50 transition"
          >
            <td className="border border-gray-200 px-4 py-2">
              {editableRecordId === record.servicetypeID ? (
                <input
                  value={editedServicetype}
                  onChange={(e) => setEditedServicetype(e.target.value)}
                  className="border border-gray-300 rounded-lg py-1 px-2 w-full focus:ring-0 focus:ring-blue-500" // Already has w-full
                />
              ) : (
                record.servicetype
              )}
            </td>
            <td className="border border-gray-200 px-4 py-2 flex gap-2">
              {editableRecordId === record.servicetypeID ? (
                <>
                  <button
                    onClick={() => saveEdit(record)}
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-lg transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 hover:bg-gray-600 text-white py-1 px-3 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => enableEdit(record)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBrand(record.servicetypeID)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-lg transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex justify-between items-center mt-4">
    <span>
      Showing {indexOfFirstRecord + 1} to{" "}
      {Math.min(indexOfLastRecord, filteredRecords.length)} of{" "}
      {filteredRecords.length} records
    </span>
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-200 hover:bg-gray-400 text-black py-1 px-3 rounded-lg"
      >
        {"<< Previous"}
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 py-1 px-3 rounded-lg ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {pageNumber}
          </button>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-200 hover:bg-gray-400 text-black py-1 px-3 rounded-lg"
      >
        {"Next >>"}
      </button>
    </div>
  </div>
</div>
  );
};

export default ServiceType;
