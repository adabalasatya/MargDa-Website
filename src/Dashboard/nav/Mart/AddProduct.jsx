import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaStore,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaPlus,
  FaTimes,
  FaUser,
  FaBox,
  FaTag,
  FaMoneyBill,
  FaFile,
  FaVideo,
  FaLink,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    seller: "",
    item: "",
    brand: "",
    mrp: "",
    tax: "",
    payout: "",
    details: "",
    pics: [],
    Quantity: "",
    brochure: null,
    video: null,
    refundUrl: "",
    webUrl: "",
    pic_urls: null,
    video_url: null,
    brochure_url: null,
  });

  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;

  useEffect(() => {
    fetchSellers();
    fetchItems();
    fetchBrands();
    fetchProducts();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/business/get-businesses",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status == 401) {
        return navigate("/login");
      }
      const data = await response.json();

      if (response.ok) {
        setSellers(data.Businesses);
      } else {
        toast.error("Failed to Fetch Sellers, please try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/item/get-items",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setItems(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchBrands = async () => {
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
          setBrands(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/mart/product/get-products",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.Products)) {
          setRecords(result.Products);
        }
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pics" || name === "brochure" || name === "video") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch("https://margda.in:7000/api/upload_file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return data.fileUrls;
      } else {
        toast.error("unable to upload files, try again later");
        return [];
      }
    } catch (error) {
      toast.error("File upload failed: " + error.message);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editingIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editingIndex] = formData;
      setRecords(updatedRecords);
      setEditingIndex(null);
      setLoading(false);
    } else {
      const payload = {
        busID: formData.seller,
        itemID: formData.item,
        brandID: formData.brand,
        quantity: formData.Quantity,
        mrp: formData.mrp,
        tax: formData.tax,
        payout: formData.payout,
        details: formData.details,
        pic_urls: null,
        doc_url: null,
        video_url: null,
        refund_url: formData.refundUrl,
        web_url: formData.webUrl,
      };
      if (formData.pics.length > 0) {
        const pic_urls = await handleFileUpload(formData.pics);
        payload.pic_urls = pic_urls;
      }
      if (formData.video) {
        const video_url = await handleFileUpload(formData.video);
        payload.video_url = video_url[0];
      }
      if (formData.brochure) {
        const brochure_url = await handleFileUpload(formData.brochure);
        payload.doc_url = brochure_url[0];
      }

      try {
        const response = await fetch(
          "https://margda.in:7000/api/mart/product/add-product",
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
          fetchProducts();
          setFormData({
            seller: "",
            item: "",
            brand: "",
            mrp: "",
            tax: "",
            payout: "",
            details: "",
            pics: [],
            brochure: null,
            video: null,
            refundUrl: "",
            webUrl: "",
          });
        } else {
          toast.error(data.message ? data.message : data.error);
        }
      } catch (error) {
        console.log(error);
        toast.error(JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (index) => {
    setFormData(records[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const handleCancelEdit = () => {
    setFormData({
      seller: "",
      item: "",
      brand: "",
      mrp: "",
      tax: "",
      payout: "",
      details: "",
      pics: [],
      brochure: null,
      video: null,
      refundUrl: "",
      webUrl: "",
    });
    setEditingIndex(null);
  };

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-8 bg-gray-30 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 justify-center text-gray-800 flex items-center">
        <FaStore className="mr-2 text-blue-500" /> Mart
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg max-w-5xl mx-auto rounded-lg p-8 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seller Select List */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="seller"
            >
              <FaUser className="mr-2 text-purple-500" /> Seller
            </label>
            <select
              id="seller"
              name="seller"
              value={formData.seller}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select Seller</option>
              {sellers.map((seller, index) => (
                <option key={index} value={seller.busID}>
                  {seller.businame}
                </option>
              ))}
            </select>
          </div>

          {/* Item Select List */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="item"
            >
              <FaBox className="mr-2 text-green-500" /> Item
            </label>
            <select
              id="item"
              name="item"
              required
              value={formData.item}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select Item</option>
              {items.map((item, index) => (
                <option key={index} value={item.itemID}>
                  {item.item}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Select List */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="brand"
            >
              <FaTag className="mr-2 text-yellow-500" /> Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select Brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand.brandID}>
                  {brand.brand}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="Quantity"
            >
              <FaMoneyBill className="mr-2 text-red-500" /> Quantity
            </label>
            <input
              type="text"
              id="Quantity"
              name="Quantity"
              required
              value={formData.Quantity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Quantity"
            />
          </div>
          {/* MRP Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="mrp"
            >
              <FaMoneyBill className="mr-2 text-red-500" /> MRP (₹)
            </label>
            <input
              type="number"
              id="mrp"
              name="mrp"
              required
              value={formData.mrp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter MRP"
            />
          </div>

          {/* Tax Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="tax"
            >
              <FaMoneyBill className="mr-2 text-red-500" /> Tax (₹)
            </label>
            <input
              type="number"
              id="tax"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter Tax"
            />
          </div>

          {/* Payout Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="payout"
            >
              <FaMoneyBill className="mr-2 text-red-500" /> Payout (₹)
            </label>
            <input
              type="number"
              id="payout"
              name="payout"
              value={formData.payout}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter Payout"
            />
          </div>

          {/* Details Textarea */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="details"
            >
              <FaFile className="mr-2 text-blue-500" /> Details
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter Details"
              rows="2"
            />
          </div>

          {/* Pics File Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="pics"
            >
              <FaFile className="mr-2 text-blue-500" /> Pics
            </label>
            <input
              type="file"
              id="pics"
              name="pics"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Brochure File Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="brochure"
            >
              <FaFile className="mr-2 text-blue-500" /> Brochure
            </label>
            <input
              type="file"
              id="brochure"
              name="brochure"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Video File Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="video"
            >
              <FaVideo className="mr-2 text-purple-500" /> Video
            </label>
            <input
              type="file"
              id="video"
              name="video"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Refund URL Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="refundUrl"
            >
              <FaLink className="mr-2 text-green-500" /> Refund URL
            </label>
            <input
              type="text"
              id="refundUrl"
              name="refundUrl"
              value={formData.refundUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter Refund URL"
            />
          </div>

          {/* Web URL Input */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
              htmlFor="webUrl"
            >
              <FaLink className="mr-2 text-green-500" /> Web URL
            </label>
            <input
              type="text"
              id="webUrl"
              name="webUrl"
              value={formData.webUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter Web URL"
            />
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex items-center justify-end mt-8 space-x-4">
          {editingIndex !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
              <FaTimes className="mr-2 text-red-500" /> Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            <FaPlus className="mr-2 text-white" />{" "}
            {editingIndex !== null ? "Save" : loading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>

      {/* Table Section */}
      <div className="bg-white shadow-lg max-w-7xl mx-auto rounded-lg pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Show</span>
            <select
              className="border rounded py-1 px-2"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-gray-700 ml-2">records</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded py-2 pl-8 pr-4 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-2 top-3 text-gray-500" />
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Seller</th>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">MRP</th>
              <th className="px-4 py-2 text-left">Tax</th>
              <th className="px-4 py-2 text-left">Payout</th>
              <th className="px-4 py-2 text-left">Details</th>
              <th className="px-4 py-2 text-left">Pics</th>
              <th className="px-4 py-2 text-left">Brochure</th>
              <th className="px-4 py-2 text-left">Video</th>
              <th className="px-4 py-2 text-left">Refund URL</th>
              <th className="px-4 py-2 text-left">Web URL</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map((record, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{record.busiName}</td>
                <td className="border px-4 py-2">{record.itemName}</td>
                <td className="border px-4 py-2">
                  {record.brandName || "N/A"}
                </td>
                <td className="border px-4 py-2">{record.mrp}</td>
                <td className="border px-4 py-2">{record.tax || "N/A"}</td>
                <td className="border px-4 py-2">{record.payout || "N/A"}</td>
                <td className="border px-4 py-2">{record.details || "N/A"}</td>
                <td className="border px-4 py-2">
                  {record.pic_url && record.pic_url.length > 0
                    ? `Uploaded ${record.pic_url.length} files`
                    : "Not Uploaded"}
                </td>
                <td className="border px-4 py-2">
                  {record.brochure ? "Uploaded" : "None"}
                </td>
                <td className="border px-4 py-2">
                  {record.video ? "Uploaded" : "None"}
                </td>
                <td className="border px-4 py-2">
                  {record.refundUrl || "N/A"}
                </td>
                <td className="border px-4 py-2">{record.webUrl || "N/A"}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-700">
            Showing {paginatedRecords.length} of {filteredRecords.length}{" "}
            records
          </div>
          <div className="flex items-center">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaArrowLeft className="text-white" />
            </button>
            <span className="mx-4 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <FaArrowRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
