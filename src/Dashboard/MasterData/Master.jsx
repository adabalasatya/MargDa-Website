import React, { useState, useEffect } from "react";
import Category from "./MastCategory";
import Item from "./MastItem";
import Brand from "./MastBrand";
import ServiceType from "./MastServiceType";
import Service from "./MastService";
import MastLink from "./MastLink.jsx";

const MasterData = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/category/get-categories",
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
          setCategories(result.data.sort((a, b) => b.id - a.id));
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let content;
  switch (selectedOption) {
    case "mast_category":
      content = (
        <Category
          accessToken={accessToken}
          onCategoryAdded={fetchCategories}
          onCategoryDeleted={fetchCategories}
          onCategoryEdited={fetchCategories}
        />
      );
      break;
    case "mast_item":
      content = (
        <Item
          categories={categories}
          accessToken={accessToken}
          onItemAdded={fetchCategories}
          onItemDeleted={fetchCategories}
          onItemEdited={fetchCategories}
        />
      );
      break;
    case "mast_brand":
      content = (
        <Brand
          accessToken={accessToken}
          onBrandAdded={fetchCategories}
          onBrandDeleted={fetchCategories}
          onBrandEdited={fetchCategories}
        />
      );
      break;
    case "mast_servicetype":
      content = <ServiceType />;
      break;
    case "mast_service":
      content = <Service />;
      break;
    case "mast_link":
      content = <MastLink />;
      break;
    default:
      content = null;
  }

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Master Data</option>
          <option value="mast_category">Category</option>
          <option value="mast_item">Item</option>
          <option value="mast_brand">Brand</option>
          <option value="mast_service">Services</option>
          <option value="mast_servicetype">Service Types</option>
          <option value="mast_link">Mast Link</option>
        </select>
      </div>
      {loading ? <div className="text-center">Loading...</div> : content}
    </div>
  );
};

export default MasterData;
