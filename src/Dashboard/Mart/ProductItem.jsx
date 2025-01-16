import React from "react";

const ProductItem = ({ product, addToList = () => {}, onEdit = () => {}, onDelete = () => {} }) => {
  return (
    <li className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col space-y-4">
        {/* Product Details */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">{product.item}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <p className="text-lg font-semibold text-gray-900">₹{product.mrp}</p>
            <p className="text-sm text-gray-600 mt-2">{product.details}</p>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                <strong>Seller:</strong> {product.seller}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tax:</strong> ₹{product.tax}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Payout:</strong> ₹{product.payout}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Refund URL:</strong>{" "}
                <a
                  href={product.refundUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {product.refundUrl}
                </a>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Web URL:</strong>{" "}
                <a
                  href={product.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {product.webUrl}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Edit Button */}
            <button
              onClick={() => onEdit(product)}
              className="text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            {/* Delete Button */}
            <button
              onClick={() => onDelete(product)}
              className="text-red-600 hover:text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Images */}
        <div className="flex flex-wrap gap-2">
          {product.pics &&
            product.pics.map((pic, i) => (
              <img
                key={i}
                src={URL.createObjectURL(pic)}
                alt={`Product Pic ${i + 1}`}
                className="w-16 h-16 object-cover rounded-md"
              />
            ))}
        </div>

        {/* Add to List Button */}
        <button
          onClick={() => addToList(product)} // Use addToList
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add to List
        </button>
      </div>
    </li>
  );
};

export default ProductItem;