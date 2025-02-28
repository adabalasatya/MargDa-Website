import React, { useState, useEffect } from "react";
import { FaTags } from "react-icons/fa";
import { motion } from 'framer-motion'; 
import Nav from '../../Components/Home/navbar';
import Footer from '../../Components/Home/Footer';

const PricingTable = () => {
  const [showSubscriptionRate, setShowSubscriptionRate] = useState(true);

  const toggleTable = () => {
    setShowSubscriptionRate(!showSubscriptionRate);
  };

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const subscriptionRates = [
    { payment: "Annual", standard: "₹980", professional: "₹2,700", business: "₹4,400" },
    { payment: "Half-Yearly", standard: "₹1,274", professional: "₹3,240", business: "₹4,800" },
    { payment: "Quarterly", standard: "₹1,568", professional: "₹3,780", business: "₹5,280" },
    { payment: "Monthly", standard: "₹1,862", professional: "₹4,320", business: "₹5,720" },
  ];

  const amountPayable = [
    { payment: "Annual", standard: "₹11,760", professional: "₹32,400", business: "₹52,800" },
    { payment: "Half-Yearly", standard: "₹7,644", professional: "₹19,440", business: "₹28,800" },
    { payment: "Quarterly", standard: "₹4,704", professional: "₹11,340", business: "₹15,840" },
    { payment: "Monthly", standard: "₹1,862", professional: "₹4,320", business: "₹5,720" },
  ];

  const tableVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-r from-blue-50 to-purple-50">
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-center items-center mb-4 md:mb-6">
          <FaTags className="text-lg md:text-xl text-blue-600 mr-2" /> 
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            Digital Workplace Pricing
          </h1>
        </div>
        <p className="text-center text-gray-600 text-sm md:text-base mb-6 md:mb-8">
          Get your complete business set up with a <span className="font-semibold text-blue-600">@very nominal</span> monthly or annual subscription and recharge any add-on as and when required.
        </p>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center mb-6 md:mb-8">
          <span className={`mr-3 text-sm md:text-base font-medium ${showSubscriptionRate ? "text-blue-500" : "text-blue-600"}`}>
            Subscription Rate
          </span>
          <button
            onClick={toggleTable}
            className={`w-12 h-6 md:w-14 md:h-8 flex items-center rounded-full p-1 transition-colors ${showSubscriptionRate ? "bg-blue-500" : "bg-blue-600"}`}
          >
            <div className={`bg-white w-4 h-4 md:w-6 md:h-6 rounded-full shadow-lg transform transition-transform ${showSubscriptionRate ? "translate-x-0" : "translate-x-6"}`}></div>
          </button>
          <span className={`ml-3 text-sm md:text-base font-medium ${!showSubscriptionRate ? "text-blue-500" : "text-blue-600"}`}>
            Amount Payable
          </span>
        </div>

        {/* Animated Table */}
        <motion.div 
          className="overflow-x-auto bg-white rounded-lg shadow-md"
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <th className="p-3 md:p-4 text-left text-sm md:text-base">Payment</th>
                <th className="p-3 md:p-4 text-center text-sm md:text-base">Standard**</th>
                <th className="p-3 md:p-4 text-center text-sm md:text-base">Professional**</th>
                <th className="p-3 md:p-4 text-center text-sm md:text-base">Business**</th>
              </tr>
            </thead>
            <tbody>
              {(showSubscriptionRate ? subscriptionRates : amountPayable).map((row, index) => (
                <motion.tr 
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  variants={rowVariants}
                >
                  <td className="p-3 md:p-4 text-left text-gray-700 text-sm md:text-base">{row.payment}</td>
                  <td className="p-3 md:p-4 text-center text-gray-700 text-sm md:text-base">{row.standard}</td>
                  <td className="p-3 md:p-4 text-center text-gray-700 text-sm md:text-base">{row.professional}</td>
                  <td className="p-3 md:p-4 text-center text-gray-700 text-sm md:text-base">{row.business}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Footer Notes */}
        <p className="mt-4 md:mt-6 text-gray-500 text-xs md:text-sm">
          * GST @18% extra <span className="ml-2 md:ml-4">** Per user</span>
        </p>
      </div>
    </div>

    <Footer />
    </div>
  );
};

export default PricingTable;
