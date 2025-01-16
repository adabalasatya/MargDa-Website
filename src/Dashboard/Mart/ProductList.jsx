import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products, addToList, onEdit, onDelete }) => {
  return (
    <ul className="space-y-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addToList={addToList} // Updated prop name
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <li className="text-center text-gray-500 py-4">No products available.</li>
      )}
    </ul>
  );
};

export default ProductList;