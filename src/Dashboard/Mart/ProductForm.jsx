import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaUpload } from "react-icons/fa";

const ProductForm = ({ onAddProduct, productToEdit, navigate }) => {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
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
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [id]: id === "pics" ? [...files] : files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.seller || !formData.item || !formData.brand || !formData.mrp) {
      alert("Please fill out all required fields.");
      return;
    }
    onAddProduct(formData);
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {productToEdit ? "Edit Product" : "Add New Product"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Seller", id: "seller", type: "text", required: true },
          { label: "Item", id: "item", type: "text", required: true },
          { label: "Brand", id: "brand", type: "text", required: true },
          { label: "MRP [₹]", id: "mrp", type: "number", required: true },
          { label: "Tax [₹]", id: "tax", type: "number", required: true },
          { label: "Payout [₹]", id: "payout", type: "number", required: true },
          { label: "Refund URL", id: "refundUrl", type: "url" },
          { label: "Web URL", id: "webUrl", type: "url" },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={formData[field.id]}
              onChange={handleChange}
              placeholder={`Enter ${field.label}`}
              required={field.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Details
          </label>
          <textarea
            id="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Enter Product Details"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        {[
          { label: "Pics", id: "pics", multiple: true },
          { label: "Brochure", id: "brochure", multiple: false },
          { label: "Video", id: "video", multiple: false },
        ].map((upload) => (
          <div key={upload.id}>
            <label
              htmlFor={upload.id}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {upload.label}
            </label>
            <input
              id={upload.id}
              type="file"
              multiple={upload.multiple}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {productToEdit ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;