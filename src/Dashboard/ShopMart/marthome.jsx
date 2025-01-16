import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faChalkboard, faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Import icons

// Dummy Data
const products = [
  {
    id: 1,
    itemName: "CRM Subscription",
    brand: "Tech Solutions",
    mrpPerKg: "₹2,500 per month",
    seller: "Tech World",
    details: "Customer Relationship Management tool for businesses.",
    quantity: 1,
    mrp: 2500,
    discount: 0,
    image: "https://via.placeholder.com/150",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video link
    brochure: "https://example.com/brochure.pdf", // Replace with actual brochure link
  },
  {
    id: 2,
    itemName: "Marketing Tool",
    brand: "Advertise Pro",
    mrpPerKg: "₹5,000 per month",
    seller: "Marketing Hub",
    details: "Advanced marketing tool for digital campaigns.",
    quantity: 1,
    mrp: 5000,
    discount: 500,
    image: "https://via.placeholder.com/150",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video link
    brochure: "https://example.com/brochure.pdf", // Replace with actual brochure link
  },
  // Add more products as needed
];

const ShopPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // If item already exists in cart, increase quantity
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If item is not in cart, add it
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Update item quantity in cart
  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total amount
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + (item.mrp - item.discount) * item.quantity,
      0
    );
  };

  // Calculate tax (assuming 18% GST)
  const calculateTax = () => {
    return calculateTotal() * 0.18;
  };

  // Calculate amount payable
  const calculateAmountPayable = () => {
    return calculateTotal() + calculateTax();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://margdarshak.org/img/margdarshakendra.png" // Replace with your logo URL
              alt="Logo"
              className="h-12"
            />
          </div>

          {/* Dashboard and Cart buttons */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300">
              <FontAwesomeIcon icon={faChalkboard} className="mr-2" />
              <span className="font-semibold">Dashboard</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              <span className="font-semibold">Cart</span>
              <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto pt-24 pb-8 px-8">
        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden p-4"
            >
              <img
                src={product.image}
                alt={product.itemName}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-xl font-semibold mt-4">{product.itemName}</h2>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-gray-600">{product.mrpPerKg}</p>
              <p className="text-gray-600">Seller: {product.seller}</p>
              <p className="text-gray-600">{product.details}</p>
              <div className="mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Cart</h2>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setShowPaymentOptions(false); // Close payment options when modal is closed
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Cart Items Table */}
            <table className="w-full mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-left">Brand</th>
                  <th className="p-2 text-left">Rate</th>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.itemName}</td>
                    <td className="p-2">{item.brand}</td>
                    <td className="p-2">{item.mrpPerKg}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="p-2">₹{(item.mrp - item.discount) * item.quantity}</td>
                    <td className="p-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Payment Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Payment</h3>
              <p className="text-gray-600">Amount Payable: ₹{calculateAmountPayable().toFixed(2)}</p>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Account Balance: ₹0.00</p>
                  <input
                    type="number"
                    placeholder="Deduct amount"
                    className="w-32 p-1 border rounded"
                  />
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Pay Now
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Wallet Balance: ₹0.00</p>
                  <input
                    type="number"
                    placeholder="Deduct amount"
                    className="w-32 p-1 border rounded"
                  />
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Pay Now
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Balance Amount: ₹0.00</p>
                  <button
                    onClick={() => setShowPaymentOptions(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Pay Online
                  </button>
                </div>
              </div>

              {/* Online Payment Options */}
              {showPaymentOptions && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-4">Online Payment Options</h4>
                  <div className="space-y-4">
                    {/* Credit/Debit Card - Razorpay */}
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">Credit/Debit Card - Razorpay</h5>
                      <p className="text-gray-600">Pay securely using your credit or debit card.</p>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
                        Pay with Razorpay
                      </button>
                    </div>

                    {/* Net Banking - Bank Details */}
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">Net Banking</h5>
                      <p className="text-gray-600">Bank Name: Example Bank</p>
                      <p className="text-gray-600">Account Number: 1234567890</p>
                      <p className="text-gray-600">IFSC Code: EXMP0001234</p>
                    </div>

                    {/* UPI - Scanner Page */}
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">UPI</h5>
                      <p className="text-gray-600">Scan the QR code to pay via UPI.</p>
                      <img
                        src="https://via.placeholder.com/150" // Replace with actual QR code image
                        alt="UPI QR Code"
                        className="w-32 h-32 mx-auto mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;