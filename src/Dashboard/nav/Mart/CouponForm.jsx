import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaSync,
  FaUser,
  FaBox,
  FaTag,
  FaTicketAlt,
  FaRupeeSign,
  FaPercentage,
  FaCalendarAlt,
  FaEnvelope,
  FaStore,
} from "react-icons/fa";

const CouponForm = () => {
  const [coupons, setCoupons] = useState([
    // Example coupons (you can replace this with actual data)
    {
      id: 1,
      seller: "Seller X",
      item: "Product 1",
      brand: "Brand A",
      coupon: "CRM123",
      amount: 40,
      percent: 5,
      validDate: "2023-12-31",
      user: "user@example.com",
    },
  ]);

  const [formData, setFormData] = useState({
    seller: "",
    item: "",
    brand: "",
    coupon: "",
    amount: "",
    percent: "",
    validDate: "",
    user: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCoupon = { ...formData, id: coupons.length + 1 };
    setCoupons([newCoupon, ...coupons]); // Add new coupon to the top of the list
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    setFormData({
      seller: "",
      item: "",
      brand: "",
      coupon: "",
      amount: "",
      percent: "",
      validDate: "",
      user: "",
    });
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  const handleEdit = (id) => {
    const couponToEdit = coupons.find((coupon) => coupon.id === id);
    setFormData(couponToEdit);
  };

  // Function to generate a random coupon code
  const generateCouponCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let couponCode = "";
    for (let i = 0; i < 6; i++) {
      couponCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setFormData({ ...formData, coupon: couponCode });
  };

  const filteredCoupons = coupons.filter((coupon) =>
    Object.values(coupon).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-30 min-h-screen">
      {/* Title with Icon */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-center items-center">
        <FaStore className="mr-2 text-blue-500" /> Coupons
      </h1>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          Coupon added successfully!
        </div>
      )}

      {/* Coupon Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Seller */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaUser className="mr-2 text-purple-500" /> Seller
            </label>
            <select
              name="seller"
              value={formData.seller}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Seller</option>
              <option value="Seller X">Seller X</option>
              <option value="Seller Y">Seller Y</option>
            </select>
          </div>

          {/* Item */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaBox className="mr-2 text-green-500" /> Item
            </label>
            <select
              name="item"
              value={formData.item}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Item</option>
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaTag className="mr-2 text-yellow-500" /> Brand
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Brand</option>
              <option value="Brand A">Brand A</option>
              <option value="Brand B">Brand B</option>
            </select>
          </div>

          {/* Coupon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaTicketAlt className="mr-2 text-red-500" /> Coupon
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Coupon Code"
              />
              <button
                type="button"
                onClick={generateCouponCode}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <FaSync className="text-white" />
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaRupeeSign className="mr-2 text-green-600" /> Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Percent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaPercentage className="mr-2 text-blue-500" /> Percent (%)
            </label>
            <input
              type="number"
              name="percent"
              value={formData.percent}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Valid Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaCalendarAlt className="mr-2 text-purple-500" /> Valid Date
            </label>
            <input
              type="date"
              name="validDate"
              value={formData.validDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* User */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" /> User (Email/Mobile)
            </label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center"
          >
            <FaArrowLeft className="mr-2 text-white" /> Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
          >
            <FaSync className="mr-2 text-white" /> Submit
          </button>
        </div>
      </form>

      {/* Coupon Table */}
      <div className="bg-white p-6 rounded-lg max-w-6xl mx-auto shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Show</span>
            <select
              className="p-1 border border-gray-300 rounded-md"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm text-gray-700 ml-2">records</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 pl-8 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-2 top-3 text-gray-500" />
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coupon
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount (₹)
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valid Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCoupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.seller}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.item}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.coupon}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{coupon.amount} ({coupon.percent}%)
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.validDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(coupon.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-700">
            Showing {paginatedCoupons.length} of {filteredCoupons.length}{" "}
            records
          </span>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaArrowLeft className="text-gray-700" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <FaArrowRight className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponForm;
