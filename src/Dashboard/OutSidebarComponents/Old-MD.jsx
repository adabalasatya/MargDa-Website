import React, { useState, useEffect } from "react";

const MasterData = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [details, setDetails] = useState("");
  const [brand, setBrand] = useState("");
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editableRecordId, setEditableRecordId] = useState(null);
  const [editedCategory, setEditedCategory] = useState("");
  const [editedItem, setEditedItem] = useState("");
  const [editedDetails, setEditedDetails] = useState("");
  const [editedBrand, setEditedBrand] = useState("");

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  // Fetch categories using fetch
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/category/get-categories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const sortedCategories = result.data.sort((a, b) => b.id - a.id);
          if (selectedOption === "mast_category") {
            setRecords(sortedCategories);
          }
          setCategories(sortedCategories); // Store categories separately
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch items using fetch
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/item/get-items",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const itemsWithCategories = result.data.map((item) => ({
            id: item.itemID,
            itemName: item.item,
            itemDetails: item.details, // Make sure to map the details field
            categoryID: item.categoryID,
            category: categories.find((cat) => cat.categoryID === item.categoryID)?.category || "Unknown Category",
          }));
          const sortedItems = itemsWithCategories.sort((a, b) => b.id - a.id);
          setRecords(sortedItems);
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };


  // Modified fetchBrands with proper error handling
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/brand/get-brands",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const processedBrands = result.data.map(brand => ({
            id: brand.brandID || brand.id,
            brandName: brand.brand,
          }));
          const sortedBrands = processedBrands.sort((a, b) => b.id - a.id);
          setRecords(sortedBrands);
        } else {
          console.error("Invalid data format received:", result);
        }
      } else {
        console.error("Failed to fetch brands:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };


  // Save category using fetch
  const saveCategory = async (category) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/category/save-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ category }),
        }
      );

      if (response.ok) {
        fetchCategories(); // Refresh the list after saving
      } else {
        console.error("Failed to save category:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Save item using fetch
  const saveItem = async (itemName, itemDetails, categoryID) => {
    if (!itemName.trim() || !categoryID) {
      alert("Please provide both item name and category");
      return false;
    }
  
    try {
      const requestBody = {
        itemName: itemName,
        categoryID: parseInt(categoryID),
        details: itemDetails // Changed from itemDetails to details to match API expectation
      };
  
      console.log("Saving item with data:", requestBody);
      
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
      console.log("Save item API response:", result);
  
      if (response.ok && result.message === 'Item added successfully') {
        alert("Item saved successfully!");
        await fetchItems();
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
  


  // Save brand using fetch
  const saveBrand = async (brandName) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/brand/save-brand",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ brandName }),
        }
      );

      const result = await response.json();
      
      // Check if the response contains "successfully" in the message
      if (response.ok && result.message?.toLowerCase().includes('successfully')) {
        await fetchBrands(); // Refresh the list after saving
        setBrand(""); // Clear the input field
        // Show success message to user
        alert("Brand added successfully!");
      } else {
        console.error("Failed to save brand:", result.message);
        alert(result.message || "Failed to save brand");
      }
    } catch (error) {
      console.error("Error saving brand:", error);
      alert("Error saving brand");
    }
  };

  // Delete category using fetch
  const handleDeleteCategory = async (categoryID) => {
    console.log('Attempting to delete category:', categoryID);
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          "https://margda.in:7000/api/master/category/delete-category",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ categoryID: parseInt(categoryID) }),
          }
        );

        console.log('Delete category response status:', response.status);
        if (response.ok) {
          const result = await response.json();
          console.log('Delete category result:', result);
          
          // Check for successful deletion based on response status and message
          if (response.ok && result.message === 'Category deleted successfully') {
            console.log('Category deleted successfully');
            fetchCategories(); // Refresh the list
          } else {
            console.error('Failed to delete category:', result.message);
            alert('Failed to delete category');
          }
        } else {
          const errorText = await response.text();
          console.error('Delete category error:', response.status, errorText);
          alert('Failed to delete category');
        }
      } catch (error) {
        console.error('Error in handleDeleteCategory:', error);
        alert('Error deleting category');
      }
    }
  };

  // Delete item using fetch
  const handleDeleteItem = async (itemID) => {
    console.log('Deleting item with ID:', itemID); // Log the ID to check
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(
          "https://margda.in:7000/api/master/item/delete-item",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ itemID }), // Ensure this matches the API's expected payload
          }
        );

        if (response.ok) {
          fetchItems(); // Refresh items after deletion
        } else {
          console.error("Failed to delete item:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // Delete brand using fetch
  const handleDeleteBrand = async (brandID) => {
    console.log('Deleting brand with ID:', brandID); // Log the ID to check
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        const response = await fetch(
          "https://margda.in:7000/api/master/brand/delete-brand",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ brandID }), // Ensure this matches the API's expected payload
          }
        );

        if (response.ok) {
          fetchBrands(); // Refresh brands after deletion
        } else {
          console.error("Failed to delete brand:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  // Edit category using fetch
  const handleEditCategory = async (categoryID, updatedCategory) => {
    console.log('Attempting to edit category:', { categoryID, updatedCategory });
    if (!categoryID || !updatedCategory) {
      console.error('Missing required parameters:', { categoryID, updatedCategory });
      alert('Missing required parameters for editing category');
      return;
    }
  
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/category/edit-category",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            categoryID: parseInt(categoryID),
            category: updatedCategory,
          }),
        }
      );
  
      console.log('Edit category response status:', response.status);
      const result = await response.json();
      console.log('Edit category result:', result);
  
      if (response.ok && result.message === 'Category updated successfully') {
        console.log('Category edited successfully');
        
        // Update the local state immediately
        setRecords(prevRecords => 
          prevRecords.map(record => 
            record.categoryID === categoryID 
              ? { ...record, category: updatedCategory }
              : record
          )
        );
        
        // If this is the categories list, also update the categories state
        if (selectedOption === "mast_category") {
          setCategories(prevCategories => 
            prevCategories.map(cat => 
              cat.categoryID === categoryID 
                ? { ...cat, category: updatedCategory }
                : cat
            )
          );
        }
        
        setEditableRecordId(null); // Reset edit mode
      } else {
        console.error('Failed to edit category:', result.message);
        alert('Failed to edit category');
      }
    } catch (error) {
      console.error('Error in handleEditCategory:', error);
      alert('Error editing category');
    }
  };


  // Edit item using fetch
  const handleEditItem = async (itemID, categoryID, itemName, itemDetails) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/item/edit-item",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ 
            itemID, 
            categoryID: parseInt(categoryID), 
            itemName,
            details: itemDetails || '' // Changed from itemDetails to details
          }),
        }
      );
  
      const result = await response.json();
      console.log("Edit item response:", result);
      
      if (response.ok && result.message === 'Item updated successfully') {
        setRecords(prevRecords =>
          prevRecords.map(record =>
            record.id === itemID
              ? {
                  ...record,
                  itemName,
                  itemDetails, // Keep as itemDetails in local state
                  categoryID: parseInt(categoryID),
                  category: categories.find(cat => cat.categoryID === parseInt(categoryID))?.category
                }
              : record
          )
        );
        setEditableRecordId(null);
        setEditedItem('');
        setEditedDetails('');
        await fetchItems();
      } else {
        console.error("Failed to edit item:", result.message);
        alert('Failed to edit item');
      }
    } catch (error) {
      console.error("Error editing item:", error);
      alert('Error editing item');
    }
  };

  // Modified handleEditBrand function with proper success handling
  const handleEditBrand = async (brandID, brandName) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/brand/edit-brand",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ 
            brandID: parseInt(brandID),
            brandName 
          }),
        }
      );

      const result = await response.json();
      
      // Check if the response message includes "successfully"
      if (response.ok && result.message?.toLowerCase().includes('successfully')) {
        // Update local state immediately
        setRecords(prevRecords =>
          prevRecords.map(record =>
            record.id === brandID
              ? { ...record, brandName }
              : record
          )
        );
        setEditableRecordId(null); // Exit edit mode
        await fetchBrands(); // Refresh the list to ensure consistency
        alert('Brand updated successfully'); // Show success message
      } else {
        console.error("Failed to edit brand:", result.message);
        alert(result.message || 'Failed to edit brand');
      }
    } catch (error) {
      console.error("Error editing brand:", error);
      alert('Error editing brand');
    }
  };

  // Enable inline editing for a record
  const enableEdit = (record) => {
    setEditableRecordId(record.id || record.categoryID); // Handle both item and category IDs
    if (selectedOption === "mast_category") {
      setEditedCategory(record.category);
    } else if (selectedOption === "mast_item") {
      setEditedItem(record.itemName);
      setEditedDetails(record.itemDetails || ''); // Ensure details are set even if null
      setCategory(record.categoryID.toString());
    } else if (selectedOption === "mast_brand") {
      setEditedBrand(record.brandName);
    }
  };

  // Save the edited value
  const saveEdit = async (record) => {
    try {
      if (selectedOption === "mast_category") {
        if (!editedCategory.trim()) {
          alert('Category name cannot be empty');
          return;
        }
        await handleEditCategory(record.categoryID, editedCategory);
      } else if (selectedOption === "mast_item") {
        if (!editedItem.trim()) {
          alert('Item name cannot be empty');
          return;
        }
        // Pass both itemName and itemDetails to handleEditItem
        await handleEditItem(
          record.id, 
          record.categoryID, 
          editedItem, 
          editedDetails // Include the edited details
        );
      } else if (selectedOption === "mast_brand") {
        if (!editedBrand.trim()) {
          alert('Brand name cannot be empty');
          return;
        }
        await handleEditBrand(record.id, editedBrand);
      }
      
      // Clear edit state
      setEditableRecordId(null);
      setEditedCategory('');
      setEditedItem('');
      setEditedDetails('');
      setEditedBrand('');
      
    } catch (error) {
      console.error('Error in saveEdit:', error);
      alert('Failed to save changes');
    }
  };

  const cancelEdit = () => {
    setEditableRecordId(null);
    setEditedCategory('');
    setEditedItem('');
    setEditedDetails('');
    setEditedBrand('');
  };

  useEffect(() => {
    // Always fetch categories first
    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (selectedOption === "mast_item") {
      fetchCategories().then(() => fetchItems()); // Fetch categories first, then items
    } else if (selectedOption === "mast_category") {
      fetchCategories();
    } else if (selectedOption === "mast_brand") {
      fetchBrands();
    }
  }, [selectedOption]);


 const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
  setRecords([]); // Clear records when switching options
};


const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  
  try {
    let success = false;
    
    if (selectedOption === "mast_category") {
      await saveCategory(category);
      success = true;
    } else if (selectedOption === "mast_item") {
      success = await saveItem(item, details, category);
    } else if (selectedOption === "mast_brand") {
      await saveBrand(brand);
      success = true;
    }
    
    // Only clear form if save was successful
    if (success) {
      setCategory("");
      setItem("");
      setDetails("");
      setBrand("");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    setLoading(false);
  }
};

  const filteredRecords = Array.isArray(records)
    ? records.filter((record) =>
        Object.values(record).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderForm = () => {
    switch (selectedOption) {
      case "mast_category":
        return (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setSelectedOption("")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
            </div>
          </form>
        );
      case "mast_item":
        return (
          <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
           <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.categoryID} value={cat.categoryID}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setSelectedOption("")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
            </div>
          </form>
        );
      case "mast_brand":
        return (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setSelectedOption("")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    if (!selectedOption) return null;

    const columns = [];
    switch (selectedOption) {
      case "mast_category":
        columns.push("category");
        break;
      case "mast_item":
        columns.push("itemName", "category", "itemDetails");
        break;
      case "mast_brand":
        columns.push("brandName");
        break;
      default:
        break;
    }

    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span>Show </span>
            <select
              className="px-2 py-1 border rounded-lg"
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span> records</span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  {col === "itemDetails" ? "Details" : col}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => {
              const isEditing = editableRecordId === (record.id || record.categoryID);
              return (
                <tr key={record.id || record.categoryID} className="hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-sm text-gray-700">
                      {isEditing ? (
                        col === "category" && selectedOption === "mast_item" ? (
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {categories.map((cat) => (
                              <option key={cat.categoryID} value={cat.categoryID}>
                                {cat.category}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={
                              col === "category" ? editedCategory :
                              col === "itemName" ? editedItem :
                              col === "itemDetails" ? editedDetails :
                              col === "brandName" ? editedBrand : ""
                            }
                            onChange={(e) => {
                              if (col === "category") setEditedCategory(e.target.value);
                              else if (col === "itemName") setEditedItem(e.target.value);
                              else if (col === "itemDetails") setEditedDetails(e.target.value);
                              else if (col === "brandName") setEditedBrand(e.target.value);
                            }}
                            className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )
                      ) : (
                        record[col]
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-sm">
                    {isEditing ? (
                      <div className="space-x-2">
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() => saveEdit(record)}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => enableEdit(record)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            if (selectedOption === "mast_category") {
                              handleDeleteCategory(record.categoryID);
                            } else if (selectedOption === "mast_item") {
                              handleDeleteItem(record.id);
                            } else if (selectedOption === "mast_brand") {
                              handleDeleteBrand(record.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} records
        </span>
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredRecords.length / recordsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="p-8 bg-gray-30 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Master Data Management</h1>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Master Data</option>
          <option value="mast_category">Category</option>
          <option value="mast_item">Item</option>
          <option value="mast_brand">Brand</option>
        </select>
        {renderForm()}
        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : (
          renderTable()
        )}
      </div>
    </div>
  );
};

export default MasterData;