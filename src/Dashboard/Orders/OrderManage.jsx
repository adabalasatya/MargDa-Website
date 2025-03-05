import React, { useState } from 'react';
import {  FaCalendarAlt, FaListOl, FaShoppingBasket, FaGift, FaPercent, FaRupeeSign, FaIdCard, FaUser, FaUserTie, FaCog, FaSearch,} from 'react-icons/fa';

const OrderDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Number of records per page

  const orders = [
    {
      date: '21-08-2024',
      orderId: 1,
      item: 'Margdarshak Data + Tools + Training Monthly Subscription',
      coupon: 'FIRST50',
      discount: 50,
      mrp: 998.0,
      qty: 1,
      amount: 499,
      gst: 89.82,
      total: 588.82,
      accountId: 2,
      purchaser: 'Akash Sindhe',
      associate: '',
      delivered: 'Yes',
      distributed: 'No',
    },
    {
      date: '21-08-2024',
      orderId: 3,
      item: 'Dermato Ability Analyser',
      coupon: 'WELCOME20',
      discount: 20,
      mrp: 200.0,
      qty: 1,
      amount: 160,
      gst: 28.8,
      total: 188.8,
      accountId: 4,
      purchaser: 'Ankita B',
      associate: 'Ankita B',
      delivered: 'Yes',
      distributed: 'Yes',
    },
    {
      date: '22-08-2024',
      orderId: 4,
      item: 'Health Monitor Kit',
      coupon: '',
      discount: 0,
      mrp: 1500.0,
      qty: 2,
      amount: 3000,
      gst: 540,
      total: 3540,
      accountId: 5,
      purchaser: 'Ravi Kumar',
      associate: 'Priya S',
      delivered: 'No',
      distributed: 'No',
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toString().includes(searchTerm) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.purchaser.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalRecords = filteredOrders.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-6">
      <main className="flex-1 p-6">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaShoppingBasket className="mr-2 text-indigo-600" /> Order Details
            </h2>
            <div className="relative w-56">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
              />
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white shadow-md rounded-lg border border-gray-200 w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-50 text-blue-700 uppercase text-xs border-b border-gray-200">
                <tr className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 py-2 px-3">
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaCalendarAlt className="mr-1 text-blue-500" /> Date
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaListOl className="mr-1 text-blue-500" /> Order_ID
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaShoppingBasket className="mr-1 text-blue-500" /> Item
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaGift className="mr-1 text-blue-500" /> Coupon
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaPercent className="mr-1 text-blue-500" /> Discount
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaRupeeSign className="mr-1 text-blue-500" /> Amount
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaRupeeSign className="mr-1 text-blue-500" /> Total
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaIdCard className="mr-1 text-blue-500" /> Account_ID
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaUser className="mr-1 text-blue-500" /> Purchaser
                  </th>
                  <th className="font-semibold flex items-center border-r border-gray-300 pr-2">
                    <FaUserTie className="mr-1 text-blue-500" /> Associate
                  </th>
                  <th className="font-semibold flex items-center pr-2">
                    <FaCog className="mr-1 text-blue-500" /> Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-b-0 bg-white hover:bg-gray-50 transition duration-150 ease-in-out grid grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 py-2 px-3"
                    >
                      <td className="text-gray-600 border-r border-gray-200 pr-2">{order.date}</td>
                      <td className="font-medium text-indigo-600 border-r border-gray-200 pr-2">
                        {order.orderId}
                      </td>
                      <td className="text-gray-600 truncate border-r border-gray-200 pr-2">
                        {order.item}
                      </td>
                      <td className="text-gray-500 border-r border-gray-200 pr-2">
                        {order.coupon || '-'}
                      </td>
                      <td className="text-gray-600 border-r border-gray-200 pr-2">
                        {order.discount}%
                      </td>
                      <td className="text-gray-600 border-r border-gray-200 pr-2">
                        <div className="flex flex-col text-xs">
                          <span>MRP: ₹{order.mrp.toFixed(2)}</span>
                          <span>Qty: {order.qty}</span>
                          <span>Amt: ₹{order.amount}</span>
                        </div>
                      </td>
                      <td className="text-gray-600 border-r border-gray-200 pr-2">
                        <div className="flex flex-col text-xs">
                          <span>GST: ₹{order.gst.toFixed(2)}</span>
                          <span className="font-semibold">Tot: ₹{order.total.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="text-gray-600 border-r border-gray-200 pr-2">
                        {order.accountId || '-'}
                      </td>
                      <td className="text-gray-600 border-r border-gray-200 pr-2">
                        {order.purchaser}
                      </td>
                      <td className="text-gray-600 border-r border-gray-200 pr-2">
                        {order.associate || '-'}
                      </td>
                      <td className="text-gray-600 pr-2">
                        <div
                          className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                            order.delivered === 'Yes'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          Del: {order.delivered}
                        </div>
                        <div
                          className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium mt-0.5 ${
                            order.distributed === 'Yes'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          Dist: {order.distributed}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="grid grid-cols-[1fr]">
                    <td colSpan={11} className="py-4 px-3 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Records Info and Pagination */}
          <div className="flex justify-between items-center mt-4 px-4">
            {/* Total Records */}
            <div className="text-sm text-black-600">
              Showing {Math.min(startIndex + 1, totalRecords)}-
              {Math.min(endIndex, totalRecords)} of {totalRecords} total records
            </div>

            {/* Pagination */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Next
              </button>
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

export default OrderDetails;