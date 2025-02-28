import React, { useState, useEffect } from "react";

const Item = ({ categories, accessToken, onItemAdded, onItemDeleted, onItemEdited }) => {
  const [item, setItem] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editableRecordId, setEditableRecordId] = useState(null);
  const [editedItem, setEditedItem] = useState("");
  const [editedDetails, setEditedDetails] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchItems = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("https://margda.in:7000/api/master/item/get-items", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const itemsWithCategories = result.data.map(item => ({
            id: item.itemID,
            itemName: item.item,
            itemDetails: item.details,
            categoryID: item.categoryID,
            category: categories.find(cat => cat.categoryID === item.categoryID)?.category || "Unknown Category",
          }));
          setRecords(itemsWithCategories.sort((a, b) => b.id - a.id));
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

 // Save item using fetch
 const saveItem = async (itemName, itemDetails, categoryID) => {
  // Validate inputs
  if (!itemName.trim() || !categoryID) {
    alert("Please provide both item name and category");
    return false;
  }

  try {
    const requestBody = {
      itemName: itemName,
      categoryID: parseInt(categoryID)
    };

    // Only add itemDetails if it's not empty
    if (itemDetails && itemDetails.trim()) {
      requestBody.itemDetails = itemDetails;
    }
    
    const response = await fetch(
      "https://margda.in:7000/api/master/item/save-item",
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

    if (response.ok && result.message === 'Item added successfully') {
      alert("Item saved successfully!");
      await fetchItems(); // Refresh the list after saving
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

  const handleDeleteItem = async (itemID) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch("https://margda.in:7000/api/master/item/delete-item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ itemID }),
      });

      if (response.ok) {
        onItemDeleted();
        await fetchItems();
      } else {
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditItem = async (itemID) => {
    try {
      const response = await fetch("https://margda.in:7000/api/master/item/edit-item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          itemID,
          categoryID: parseInt(editedCategory),
          itemName: editedItem,
          details: editedDetails,
        }),
      });

      if (response.ok) {
        onItemEdited();
        await fetchItems();
        setEditableRecordId(null);
      } else {
        console.error("Failed to edit item:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const enableEdit = (record) => {
    setEditableRecordId(record.id);
    setEditedItem(record.itemName);
    setEditedDetails(record.itemDetails);
    setEditedCategory(record.categoryID.toString());
  };

  const cancelEdit = () => {
    setEditableRecordId(null);
  };

  const filteredRecords = records.filter(record =>
    [record.itemName, record.itemDetails, record.category].some(field =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalRecords = filteredRecords.length;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-10 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Items</h2>

        <div className="grid gap-4">
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-lg">
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.categoryID} value={cat.categoryID}>{cat.category}</option>
            ))}
          </select>

          <input type="text" value={item} onChange={(e) => setItem(e.target.value)}
            placeholder="Item Name" className="border p-2 rounded-lg" />

          <input type="text" value={details} onChange={(e) => setDetails(e.target.value)}
            placeholder="Details" className="border p-2 rounded-lg" />

<button
  onClick={() => saveItem(item, details, category)}
  className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
>
  Add Item
</button>

        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <label>
              Show 
              <select value={recordsPerPage} onChange={(e) => setRecordsPerPage(Number(e.target.value))} className="border p-1 ml-2">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              records
            </label>
          </div>
          <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Items..." className="border p-2 rounded-lg" />
          </div>
        </div>

        {loading ? <p className="mt-4 text-center">Loading...</p> : (
          <>
            <table className="w-full mt-4 border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Item</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Details</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map(record => (
                  <tr key={record.id} className="text-center">
                    <td className="p-2 border">{editableRecordId === record.id ? (
                      <input value={editedItem} onChange={(e) => setEditedItem(e.target.value)} className="border p-1" />
                    ) : record.itemName}</td>

                    <td className="p-2 border">{editableRecordId === record.id ? (
                      <select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} className="border p-1">
                        {categories.map(cat => (
                          <option key={cat.categoryID} value={cat.categoryID}>{cat.category}</option>
                        ))}
                      </select>
                    ) : record.category}</td>

                    <td className="p-2 border">{editableRecordId === record.id ? (
                      <input value={editedDetails} onChange={(e) => setEditedDetails(e.target.value)} className="border p-1" />
                    ) : record.itemDetails}</td>

                    <td className="p-2 border space-x-2">
                      {editableRecordId === record.id ? (
                        <>
                          <button onClick={() => handleEditItem(record.id)} className="text-green-600">Save</button>
                          <button onClick={cancelEdit} className="text-gray-600">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => enableEdit(record)} className="text-blue-600">Edit</button>
                          <button onClick={() => handleDeleteItem(record.id)} className="text-red-600">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <div>
                <p>Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords} records</p>
              </div>
              <div>
                <button
                  onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                  className="px-3 py-1 border rounded-lg"
                >
                  &lt;&lt; Previous
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`px-3 py-1 border rounded-lg ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : ''}`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  className="px-3 py-1 border rounded-lg"
                >
                  Next &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Item;
