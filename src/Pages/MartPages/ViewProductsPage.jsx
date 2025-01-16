import React, { useState } from 'react';
import ProductList from '../../Dashboard/Mart/ProductList';

const ViewProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    // Example products (you can replace this with actual data)
    {
      id: 1,
      item: "Product 1",
      brand: "Brand A",
      mrp: 100,
      tax: 10,
      payout: 90,
      details: "This is a sample product.",
      seller: "Seller X",
      refundUrl: "https://example.com/refund",
      webUrl: "https://example.com/product1",
      pics: [], // Add image files if needed
    },
    {
      id: 2,
      item: "Product 2",
      brand: "Brand B",
      mrp: 200,
      tax: 20,
      payout: 180,
      details: "This is another sample product.",
      seller: "Seller Y",
      refundUrl: "https://example.com/refund",
      webUrl: "https://example.com/product2",
      pics: [], // Add image files if needed
    },
  ]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message

  const addToList = (product) => {
    setCart([...cart, product]); // Add product to cart
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
    console.log("Added to list:", product);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">View Products</h1>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          Added to list successfully!
        </div>
      )}

      {/* Product List */}
      <ProductList
        products={products} // Pass products to ProductList
        addToList={addToList} // Pass addToList function
      />

      {/* Cart Display */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        <ul className="space-y-2">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg">
                {item.item} - ₹{item.mrp}
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 py-4">No items in cart.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ViewProductsPage;