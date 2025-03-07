import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaTools, FaSearch } from "react-icons/fa";

const Service = () => {
  const [serviceName, setServiceName] = useState("");
  const [services, setSerevices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [servicetype, setServicetype] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editableRecordId, setEditableRecordId] = useState(null);
  const [editedService, setEditedService] = useState("");
  const [editedServicetype, setEditedServicetype] = useState("");
  const [loading, setLoading] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const fetchServices = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/service/get-services",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const sort = result.data.sort((a, b) => a.serviceID - b.serviceID);
          setSerevices(sort);
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    setLoading(false);
  };

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
          setServiceTypes(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Failed to fetch services. Please try again later.");
    }
  };

  useEffect(() => {
    fetchServices();
    fetchServiceTypes();
  }, []);

  // Save item using fetch
  const saveItem = async (serviceName, servicetypeID) => {
    // Validate inputs
    if (!serviceName.trim() || !servicetypeID) {
      toast.warn("Please provide both service name and service type");
      return false;
    }

    try {
      const requestBody = {
        service: serviceName,
        serviceType: parseInt(servicetypeID),
      };

      const response = await fetch(
        "https://margda.in:7000/api/master/service/add-service",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("added successfully");
        await fetchServices();
        return true;
      } else {
        console.error("Failed to save item:", result.message);
        alert(result.message || "Failed to save item");
        return false;
      }
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Error saving item. Please try again.");
      return false;
    }
  };

  const handleDeleteItem = async (serviceID) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/service/delete-service",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ serviceID }),
        }
      );

      if (response.ok) {
        await fetchServices();
      } else {
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditItem = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/service/update-service",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            serviceID: editableRecordId,
            serviceType: parseInt(editedServicetype),
            serviceName: editedService,
          }),
        }
      );

      if (response.ok) {
        await fetchServices();
        setEditableRecordId(null);
      } else {
        console.error("Failed to edit item:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const enableEdit = (record) => {
    setEditableRecordId(record.serviceID);
    setEditedService(record.service);
    setEditedServicetype(record.servicetype);
  };

  const cancelEdit = () => {
    setEditableRecordId(null);
  };

  const filteredRecords = services.filter(
    (record) =>
      record.service.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      (record.serviceTypeName &&
        record.serviceTypeName
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim()))
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
   <div className="p-6 bg-gray-10 min-h-screen">
  {/* Increased max-width from max-w-3xl to max-w-5xl */}
  <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md border border-blue-300">
  <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
          <FaTools className="mr-2 text-blue-500" /> {/* Icon for h2 */}
          Manage Services
        </h2>

    <div className="grid gap-4">
      <select
        value={servicetype}
        onChange={(e) => setServicetype(e.target.value)}
        className="border p-2 rounded-lg w-full" // Added w-full
      >
        <option value="">Select Service Type</option>
        {serviceTypes.map((type) => (
          <option key={type.servicetypeID} value={type.servicetypeID}>
            {type.servicetype}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        placeholder="Service"
        className="border p-2 rounded-lg w-full" // Added w-full
      />

      <button
        onClick={() => saveItem(serviceName, servicetype)}
        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition w-full" // Added w-full
      >
        Add Service
      </button>
    </div>
  </div>

  {/* Increased max-width from max-w-3xl to max-w-5xl */}
  <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6 border border-blue-300">
    <div className="flex justify-between items-center mb-8">
      <div>
        <label>
          Show
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            className="m-2 border border-gray-300 rounded-md py-1 px-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          Records
        </label>
      </div>
      <div>
      <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="border p-2 rounded-lg pl-10 w-64" 
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" /> 
          </div>
      </div>
    </div>

    {loading ? (
      <p className="mt-4 text-center">Loading...</p>
    ) : (
      <>
        <table className="w-full mt-4 border-collapse border border-gray-200 table-auto"> {/* Added table-auto */}
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Service Type</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.serviceID} className="text-center">
                <td className="p-2 border">
                  {editableRecordId === record.serviceID ? (
                    <input
                      value={editedService}
                      onChange={(e) => setEditedService(e.target.value)}
                      className="border p-1 w-full" // Added w-full
                    />
                  ) : (
                    record.service
                  )}
                </td>

                <td className="p-2 border">
                  {editableRecordId === record.serviceID ? (
                    <select
                      value={editedServicetype}
                      onChange={(e) => setEditedServicetype(e.target.value)}
                      className="border p-1 w-full" // Added w-full
                    >
                      {serviceTypes.map((type) => (
                        <option
                          key={type.servicetypeID}
                          value={type.servicetypeID}
                        >
                          {type.servicetype}
                        </option>
                      ))}
                    </select>
                  ) : (
                    serviceTypes.map((type) =>
                      type.servicetypeID == record.servicetype
                        ? type.servicetype
                        : null
                    )
                  )}
                </td>

                <td className="p-2 border space-x-2">
                  {editableRecordId === record.serviceID ? (
                    <>
                      <button
                        onClick={() => handleEditItem(record.serviceID)}
                        className="text-green-600"
                      >
                        Save
                      </button>
                      <button onClick={cancelEdit} className="text-gray-600">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => enableEdit(record)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(record.serviceID)}
                        className="text-red-600"
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

        <div className="flex justify-between items-center mt-4">
          <div>
            <p>
              Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
              {Math.min(currentPage * recordsPerPage, services.length)} of{" "}
              {services.length} records
            </p>
          </div>
          <div>
            <button
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
              className="px-3 py-1 border rounded-lg"
            >
              {"<< Previous"}
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 border rounded-lg ${
                  currentPage === idx + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              className="px-3 py-1 border rounded-lg"
            >
              {"Next >>"}
            </button>
          </div>
        </div>
      </>
    )}
  </div>
</div>
  );
};

export default Service;
