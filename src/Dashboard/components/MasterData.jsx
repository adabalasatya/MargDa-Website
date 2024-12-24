import React from "react";

const MasterData = () => {
  const masterData = [
    { id: 101, name: "Product A", category: "Electronics", price: "$200", stock: "In Stock" },
    { id: 102, name: "Product B", category: "Furniture", price: "$500", stock: "Out of Stock" },
    { id: 103, name: "Product C", category: "Books", price: "$20", stock: "In Stock" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Master Data</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Product Inventory</h2>
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {masterData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">{item.price}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    item.stock === "In Stock"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterData;
