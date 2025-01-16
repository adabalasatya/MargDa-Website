import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faCartShopping, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

// Dummy Data (extended with brand and seller information)
const products = [
  {
    id: 1,
    itemName: "Sugar",
    price: "₹ 50.00 + 5% GST",
    image: "https://www.tasteofhome.com/wp-content/uploads/2019/11/sugar-shutterstock_615908132.jpg", // Replace with actual image URL
    brand: "SweetLife",
    seller: "Grocery Mart",
    mrpPerKg: "₹ 40 - ₹ 50 per kg",
    details: "Pure white sugar, perfect for baking and cooking.",
    quantity: 1,
    mrp: 50,
    discount: 5,
    tax: 5,
  },
  {
    id: 2,
    itemName: "Salt",
    price: "₹ 20.00 + 5% GST",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQR6wdJqfCpwtpr82wDfQfRbzSHQWI0uBXg&s", // Replace with actual image URL
    brand: "Saltify",
    seller: "Grocery Mart",
    mrpPerKg: "₹ 15 - ₹ 20 per kg",
    details: "Iodized salt, essential for cooking and seasoning.",
    quantity: 1,
    mrp: 20,
    discount: 2,
    tax: 5,
  },
  {
    id: 3,
    itemName: "Basmati Rice",
    price: "₹ 100.00 + 5% GST",
    image: "https://www.isayorganic.com/cdn/shop/files/BrownRice_1024x1024@2x.jpg?v=1736270109", // Replace with actual image URL
    brand: "RiceDelight",
    seller: "Grocery Mart",
    mrpPerKg: "₹ 90 - ₹ 100 per kg",
    details: "Premium quality Basmati rice, perfect for biryani and pulao.",
    quantity: 1,
    mrp: 100,
    discount: 10,
    tax: 5,
  },
  {
    id: 4,
    itemName: "Wheat Flour",
    price: "₹ 60.00 + 5% GST",
    image: "https://aarogyamastu.in/wp-content/uploads/2022/06/wheat-flour.jpg", // Replace with actual image URL
    brand: "FlourPower",
    seller: "Grocery Mart",
    mrpPerKg: "₹ 50 - ₹ 60 per kg",
    details: "Finely ground wheat flour, ideal for chapatis and baking.",
    quantity: 1,
    mrp: 60,
    discount: 5,
    tax: 5,
  },
  {
    id: 5,
    itemName: "Olive Oil",
    price: "₹ 500.00 + 5% GST",
    image: "https://img.bebeautiful.in/www-bebeautiful-in/content/THE%20SECRET%20TO%20SMOOTH%2C%20SILKY%20HAIR_%20OLIVE%20OIL.png", // Replace with actual image URL
    brand: "OlivePure",
    seller: "Grocery Mart",
    mrpPerKg: "₹ 450 - ₹ 500 per liter",
    details: "Extra virgin olive oil, great for cooking and salads.",
    quantity: 1,
    mrp: 500,
    discount: 50,
    tax: 5,
  },
  {
    id: 6,
    itemName: "Turmeric Powder",
    price: "₹ 80.00 + 5% GST",
    image: "https://cms.buzzrx.com/globalassets/buzzrx/blogs/turmeric-powder--health-benefits-to-know.png", // Replace with actual image URL
    brand: "SpiceMaster",
    seller: "Grocery Mart",
    mrpPerKg: "₹ 70 - ₹ 80 per kg",
    details: "Pure turmeric powder, adds flavor and color to dishes.",
    quantity: 1,
    mrp: 80,
    discount: 5,
    tax: 5,
  },
  {
    id: 7,
    itemName: "Red Chilli Powder",
    price: "₹ 90.00 + 5% GST",
    image: "https://m.media-amazon.com/images/I/712h1l0amfL.jpg", // Replace with actual image URL
    brand: "SpiceMaster",
    seller: "Grocery Mart",
    mrpPerKg: "₹ 80 - ₹ 90 per kg",
    details: "Spicy red chilli powder, perfect for Indian curries.",
    quantity: 1,
    mrp: 90,
    discount: 5,
    tax: 5,
  },
  {
    id: 8,
    itemName: "Toor Dal",
    price: "₹ 120.00 + 5% GST",
    image: "https://newindiansupermarket.com/cdn/shop/products/TOOR-DAL.png?v=1635161400&width=1214", // Replace with actual image URL
    brand: "Dalicious",
    seller: "Healthy Living",
    mrpPerKg: "₹ 100 - ₹ 120 per kg",
    details: "High-quality Toor Dal, essential for Indian cooking.",
    quantity: 1,
    mrp: 120,
    discount: 10,
    tax: 5,
  },
  {
    id: 9,
    itemName: "Chana Dal",
    price: "₹ 110.00 + 5% GST",
    image: "https://www.secondrecipe.com/wp-content/uploads/2021/11/air-fried-chana-dal.jpg", // Replace with actual image URL
    brand: "Dalicious",
    seller: "Healthy Living",
    mrpPerKg: "₹ 100 - ₹ 110 per kg",
    details: "Nutritious Chana Dal, great for curries and snacks.",
    quantity: 1,
    mrp: 110,
    discount: 10,
    tax: 5,
  },
  {
    id: 10,
    itemName: "Mustard Oil",
    price: "₹ 150.00 + 5% GST",
    image: "https://images.herzindagi.info/her-zindagi-english/images/2024/10/24/article/image/mustard-oil-benefits-1729772037293.jpg", // Replace with actual image URL
    brand: "OilPure",
    seller: "Healthy Living",
    mrpPerKg: "₹ 140 - ₹ 150 per liter",
    details: "Pure mustard oil, adds a unique flavor to dishes.",
    quantity: 1,
    mrp: 150,
    discount: 15,
    tax: 5,
  },
  {
    id: 11,
    itemName: "Honey",
    price: "₹ 300.00 + 5% GST",
    image: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/04/honey-1296x728-header.jpg?w=1155&h=1528", // Replace with actual image URL
    brand: "HoneyPure",
    seller: "Organic Farms",
    mrpPerKg: "₹ 280 - ₹ 300 per kg",
    details: "Natural honey, great for health and sweetness.",
    quantity: 1,
    mrp: 300,
    discount: 20,
    tax: 5,
  },
  {
    id: 12,
    itemName: "Green Tea",
    price: "₹ 200.00 + 5% GST",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6XcN2C0q0a0qyVkIr6Wr3dKkLtSfWfHoXng&s", // Replace with actual image URL
    brand: "TeaLeaf",
    seller: "Organic Farms",
    mrpPerKg: "₹ 180 - ₹ 200 per kg",
    details: "Pure green tea, rich in antioxidants.",
    quantity: 1,
    mrp: 200,
    discount: 20,
    tax: 5,
  },
  {
    id: 13,
    itemName: "Black Pepper",
    price: "₹ 250.00 + 5% GST",
    image: "https://cdn.shopaccino.com/edible-smart/products/black-pepper--kali-mirch-379942_l.jpg?v=521", // Replace with actual image URL
    brand: "SpiceMaster",
    seller: "Organic Farms",
    mrpPerKg: "₹ 230 - ₹ 250 per kg",
    details: "Freshly ground black pepper, adds spice to dishes.",
    quantity: 1,
    mrp: 250,
    discount: 25,
    tax: 5,
  },
  {
    id: 14,
    itemName: "Cumin Seeds",
    price: "₹ 180.00 + 5% GST",
    image: "https://www.viralspices.com/wp-content/uploads/2021/09/cummin-624x312.jpg", // Replace with actual image URL
    brand: "Organic Farms",
    seller: "Grocery Mart",
    mrpPerKg: "₹ 160 - ₹ 180 per kg",
    details: "Aromatic cumin seeds, essential for Indian cooking.",
    quantity: 1,
    mrp: 180,
    discount: 15,
    tax: 5,
  },
];


// Set the app element for react-modal (for accessibility)
Modal.setAppElement('#root');

const ShopPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // State to manage cart items
  const [filters, setFilters] = useState({ item: '', brand: '', seller: '' }); // Unified filter state
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image for enlargement

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ item: '', brand: '', seller: '' });
  };

  // Get unique items, brands, and sellers for filters
  const uniqueItems = [...new Set(products.map((product) => product.itemName))];
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];
  const uniqueSellers = [...new Set(products.map((product) => product.seller))];

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    return (
      (filters.item === '' || product.itemName === filters.item) &&
      (filters.brand === '' || product.brand === filters.brand) &&
      (filters.seller === '' || product.seller === filters.seller)
    );
  });

  // Handle product card click
  const handleProductClick = (product) => {
    navigate(`/product-details/${product.id}`, { state: { product } });
  };

  // Handle cart button click
  const handleCartClick = () => {
    navigate('/cart', { state: { cart } }); // Pass the cart state
  };

  // Handle dashboard button click
  const handleDashboardClick = () => {
    navigate('/data');
  };

  // Handle "Add to Cart" button click
  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent card click event from firing
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.itemName} added to cart!`);
  };

  // Handle "Buy Now" button click
  const handleBuyNow = (product, e) => {
    e.stopPropagation(); // Prevent card click event from firing
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    navigate('/cart', { state: { cart: [{ ...product, quantity: 1 }] } }); // Redirect to cart with the product
  };

  // Handle image click to enlarge
  const handleImageClick = (image, e) => {
    e.stopPropagation(); // Prevent card click event from firing
    setSelectedImage(image);
  };

  // Close the enlarged image modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md py-4 px-8 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://margdarshak.org/img/margdarshakendra.png"
              alt="Logo"
              className="h-12"
            />
          </div>

          {/* Dashboard and Cart buttons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={handleDashboardClick}
              className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faChalkboard} className="mr-2" />
              <span className="font-semibold">Dashboard</span>
            </button>
            <button
              onClick={handleCartClick}
              className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              <span className="font-semibold">Cart</span>
              <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                {cart.length} {/* Dynamic cart count */}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 mt-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Tools and Training
          </h1>
          <p className="text-white/90 text-lg">
            Explore our wide range of tools and training programs to enhance your skills and career.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto py-6 px-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Item Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
            <select
              name="item"
              value={filters.item}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Items</option>
              {uniqueItems.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Seller Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
            <select
              name="seller"
              value={filters.seller}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sellers</option>
              {uniqueSellers.map((seller, index) => (
                <option key={index} value={seller}>
                  {seller}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="p-2 mt-5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.itemName}
                className="w-full h-48 object-cover cursor-zoom-in"
                onClick={(e) => handleImageClick(product.image, e)}
              />

              {/* Product Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {product.itemName}
                </h2>
                <p className="text-gray-600">
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Seller:</span> {product.seller}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Price:</span> {product.price}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => handleBuyNow(product, e)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        contentLabel="Enlarged Image"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 max-w-[90%] max-h-[90%] overflow-auto outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="flex justify-center items-center h-full">
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-w-full max-h-full"
          />
        </div>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition duration-300"
        >
          <FontAwesomeIcon icon={faTimes} className="text-gray-700" />
        </button>
      </Modal>
    </div>
  );
};

export default ShopPage;