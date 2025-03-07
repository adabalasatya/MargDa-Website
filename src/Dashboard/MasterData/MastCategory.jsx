import React, { useState, useEffect } from "react";
import { FaList, FaSearch } from "react-icons/fa";

const Category = ({ accessToken, onCategoryAdded, onCategoryDeleted, onCategoryEdited }) => {
  const [category, setCategory] = useState("");
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editableRecordId, setEditableRecordId] = useState(null);
  const [editedCategory, setEditedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://margda.in:7000/api/master/category/get-categories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setRecords(result.data.sort((a, b) => b.id - a.id));
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const saveCategory = async () => {
    if (!category.trim()) {
      alert("Please provide a category name");
      return;
    }

    try {
      const response = await fetch("https://margda.in:7000/api/master/category/save-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ category }),
      });

      if (response.ok) {
        onCategoryAdded();
        setCategory("");
        await fetchCategories();
      } else {
        console.error("Failed to save category:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDeleteCategory = async (categoryID) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch("https://margda.in:7000/api/master/category/delete-category", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ categoryID }),
        });

        if (response.ok) {
          onCategoryDeleted();
          await fetchCategories();
        } else {
          console.error("Failed to delete category:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const enableEdit = (record) => {
    setEditableRecordId(record.categoryID);
    setEditedCategory(record.category);
  };

  const saveEdit = async (record) => {
    try {
      const response = await fetch("https://margda.in:7000/api/master/category/edit-category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          categoryID: record.categoryID,
          category: editedCategory,
        }),
      });

      if (response.ok) {
        onCategoryEdited();
        await fetchCategories();
        setEditableRecordId(null);
        setEditedCategory("");
      } else {
        console.error("Failed to edit category:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const cancelEdit = () => {
    setEditableRecordId(null);
    setEditedCategory("");
  };

  const filteredRecords = records.filter(record =>
    record.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 bg-gray-10 min-h-screen">
      {/* Category Form */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-blue-300">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
          <FaList className="mr-2 text-blue-500" /> 
          Add New Category
        </h2>
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="Category Name" 
            className="border border-gray-300 rounded-lg py-2 px-4 flex-grow focus:ring-0 focus:ring-blue-500"
          />
          <button 
            onClick={saveCategory} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <label className="ml-2">
            Show
          <select 
          value={recordsPerPage} 
          onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}
          className="m-2 border border-gray-300 rounded-md py-1 px-2"
        >
          <option value={10}> 10</option>
          <option value={20}> 20</option>
          <option value={30}> 30</option>
        </select>
        Records
          </label>
        </div>
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search Categories..." 
            className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:ring-0 focus:ring-blue-500 w-64" 
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" /> 
        </div>
      </div>

      {/* Category List */}
      <div className="overflow-auto mt-6 bg-white p-6 rounded-xl shadow-md border border-blue-300"> 
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.categoryID} className="border-b">
                <td className="p-3">
                  {editableRecordId === record.categoryID ? (
                    <input 
                      value={editedCategory} 
                      onChange={(e) => setEditedCategory(e.target.value)}
                      className="border border-gray-300 rounded-lg py-1 px-2 w-full focus:ring-0 focus:ring-blue-500"
                    />
                  ) : (
                    record.category
                  )}
                </td>
                <td className="p-3 flex space-x-4">
                  {editableRecordId === record.categoryID ? (
                    <>
                      <button onClick={() => saveEdit(record)} className="text-green-600 hover:text-green-900">Save</button>
                      <button onClick={cancelEdit} className="text-gray-600 hover:text-gray-900">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => enableEdit(record)} className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button onClick={() => handleDeleteCategory(record.categoryID)} className="text-red-600 hover:text-red-900">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center ml-2">
        <p>Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} records</p>
        <div>
          <button onClick={() => handlePageChange(currentPage - 1)}
           disabled={currentPage === 1}
           className="bg-gray-200 hover:bg-gray-400 text-black py-1 px-3 rounded-lg"
           >  &lt;&lt; Previous
           </button>
           {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`mx-1 py-1 px-3 rounded-lg ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        {pageNumber}
      </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
            className="bg-gray-200 hover:bg-gray-400 text-black py-1 px-3 rounded-lg"
            > Next &gt;&gt; </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
