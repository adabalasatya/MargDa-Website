import React, { useEffect, useState } from "react";
import { FaEnvelope, FaShoppingCart, FaRupeeSign, FaPercent, FaAmazonPay, FaUserTie, FaPaperPlane, FaFile, FaBookReader, FaTrash, FaEdit, FaAngleLeft, FaAngleRight,} from "react-icons/fa";

const ProductPage = () => {
  const [formData, setFormData] = useState({
    business: "",
    category: "",
    item: "",
    mrp: "",
    gst: "",
    payout: "",
    details: "",
    file_upload: null,
  });

  const [tableData, setTableData] = useState([
    {
      id: 15,
      item: "Career Choice",
      mrp: "9,600.00",
      gst: 18,
      payout: 50,
      pictureUrl: "https://margdarshak.org/uploads/master/mast_service/1career-choice.jpg",
      pictureName: "1career-choice.jpg",
    },
    {
      id: 14,
      item: "WhatsApp API",
      mrp: "1,000.00",
      gst: 18,
      payout: 50,
      pictureUrl: "https://margdarshak.org/uploads/master/mast_service/1WhatsApp.png",
      pictureName: "1WhatsApp.png",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file_upload: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: tableData.length + 1,
      item: formData.item,
      mrp: formData.mrp,
      gst: parseFloat(formData.gst) || 0,
      payout: parseFloat(formData.payout) || 0,
      pictureUrl: formData.file_upload ? URL.createObjectURL(formData.file_upload) : "",
      pictureName: formData.file_upload ? formData.file_upload.name : "No file uploaded",
      details: formData.details,
    };

    setTableData([...tableData, newEntry]);

    setFormData({
      business: "",
      category: "",
      item: "",
      mrp: "",
      gst: "",
      payout: "",
      details: "",
      file_upload: null,
    });
  };

  const totalItems = tableData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = tableData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen">
      <main className="p-4 md:p-2">
        <div className="container mx-auto">
          <div className="mb-2 flex justify-center mt-0">
            <h2 className="text-4xl font-bold py-5 flex items-center">
              <FaEnvelope className="text-blue-500 mr-2" /> Product
            </h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-blue-300">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center">
                    <FaShoppingCart className="text-blue-500 mr-2" /> Business
                  </label>
                  <select
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Business</option>
                    <option value="2">Digital Softech</option>
                    <option value="1">National Institute for Career Education</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center">
                    <FaFile className="text-blue-500 mr-2" /> Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    <option value="7">Psychometric Assessments</option>
                    <option value="6">Teaching - Job Competitive Exams</option>
                    <option value="5">Teaching - Entrance Test</option>
                    <option value="4">Teaching - Academic Courses</option>
                    <option value="3">Career Exploration</option>
                    <option value="2">CRM</option>
                    <option value="1">Training - Skills Development</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center">
                    <FaShoppingCart className="text-blue-500 mr-2" /> Item
                  </label>
                  <input
                    type="text"
                    name="item"
                    value={formData.item}
                    onChange={handleInputChange}
                    placeholder="Enter Item"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center">
                    <FaRupeeSign className="text-blue-500 mr-2" /> MRP
                  </label>
                  <input
                    type="text"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    placeholder="Enter MRP"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center">
                    <FaPercent className="text-blue-500 mr-2" /> GST
                  </label>
                  <input
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleInputChange}
                    placeholder="Enter GST"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center">
                    <FaAmazonPay className="text-blue-500 mr-2" /> Payout
                  </label>
                  <input
                    type="text"
                    name="payout"
                    value={formData.payout}
                    onChange={handleInputChange}
                    placeholder="Enter Payout"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center">
                    <FaUserTie className="text-blue-500 mr-2" /> File Upload
                  </label>
                  <div className="flex items-center border rounded">
                    <input
                      type="file"
                      name="file_upload"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <input
                      type="text"
                      disabled
                      value={formData.file_upload ? formData.file_upload.name : "Upload a file"}
                      className="w-full p-2 bg-white"
                    />
                    <label htmlFor="file-upload" className="p-2 cursor-pointer text-blue-500">
                      Browse
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center">
                  <FaFile className="text-blue-500 mr-2" /> Details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Enter Details"
                  className="w-full p-2 border rounded h-32"
                />
              </div>
              <div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-300">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-6 border-b border-r text-center">
                      <FaPaperPlane className="text-blue-500 mr-2 inline" /> Action
                    </th>
                    <th className="py-2 px-6 border-b border-r text-center">
                      <FaFile className="text-blue-500 mr-2 inline" /> Item
                    </th>
                    <th className="py-2 px-6 border-b border-r text-center">
                      <FaFile className="text-blue-500 mr-2 inline" /> MRP
                    </th>
                    <th className="py-2 px-6 border-b border-r text-center">
                      <FaFile className="text-blue-500 mr-2 inline" /> GST
                    </th>
                    <th className="py-2 px-6 border-b border-r text-center">
                      <FaBookReader className="text-blue-500 mr-2 inline" /> Payout
                    </th>
                    <th className="py-2 px-6 border-b text-center">
                      <FaFile className="text-blue-500 mr-2 inline" /> Picture
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      <td className="py-2 px-6 border-b border-r text-center">
                        <div className="flex items-center justify-center">
                          <FaTrash className="text-red-500 text-sm mr-2" />
                          <FaEdit className="text-blue-500" />
                        </div>
                      </td>
                      <td className="py-2 px-6 border-b border-r text-center">{row.item}</td>
                      <td className="py-2 px-6 border-b border-r text-center">{row.mrp}</td>
                      <td className="py-2 px-6 border-b border-r text-center">{row.gst}</td>
                      <td className="py-2 px-6 border-b border-r text-center">{row.payout}</td>
                      <td className="py-2 px-6 border-b text-center">
                        <div>
                          <button
                            className="bg-green-500 text-white px-2 py-1 rounded"
                            onClick={() =>
                              window.open(row.pictureUrl, "_blank", "width=700,height=600")
                            }
                          >
                            View File
                          </button>
                          <div className="mt-1 text-sm">{row.pictureName}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-black-600">
                Showing {startIndex + 1} to {endIndex} of {totalItems} records
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded ${
                    currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                  }`}
                >
                  <FaAngleLeft />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded ${
                    currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                  }`}
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-black-600 p-2 bg-white shadow-lg rounded-t-2xl">
        <span>Margdarshak © {new Date().getFullYear()}. All Rights Reserved.</span>
      </footer>
    </div>
  );
};

export default ProductPage;