import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ProductForm from "../../Dashboard/Mart/ProductForm";
import ProductList from "../../Dashboard/Mart/ProductList";

const UpdateProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
  const navigate = useNavigate();

  const handleAddProduct = (product) => {
    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = { ...product, id: Date.now() };
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
  };

  const handleEditProduct = (product) => {
    const index = products.findIndex((p) => p.id === product.id);
    setEditingIndex(index);
  };

  const handleDeleteProduct = (product) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const updatedProducts = products.filter((p) => p.id !== product.id);
      setProducts(updatedProducts);
    }
  };

  const handleAddToCart = (product) => {
    console.log("Added to list:", product);
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          Added to list successfully!
        </div>
      )}

      {/* Product Form */}
      <ProductForm
        key={editingIndex !== null ? products[editingIndex].id : "new"}
        onAddProduct={handleAddProduct}
        productToEdit={editingIndex !== null ? products[editingIndex] : null}
        navigate={navigate}
      />

      {/* Product List */}
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Product List</h2>
        <div className="w-full max-w-4xl">
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>

    </div>
  );
};

export default UpdateProductPage;