import React, { useEffect } from 'react'; // Import useEffect
import { FaMoneyBillWave, FaExchangeAlt, FaTruck } from 'react-icons/fa';
import Nav from '../../Components/Home/navbar';
import Footer from '../../Components/Home/Footer';

const RefundPolicy = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 md:px-12 py-8">
        {/* Refund and Cancellation Policy */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaMoneyBillWave className="mr-2" /> Refund and Cancellation Policy
          </h3>
          <p className="text-gray-700 mb-4">
          In case of any refund approved by Margdarshak Media, it willtake 15 days for the refunds to be credited to you.
          </p>
          
        </section>

        {/* Return Policy */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaExchangeAlt className="mr-2" /> Return Policy
          </h3>
          <p className="text-gray-700 mb-4">
          As it is a service based, Returns are not applicable.
          </p>
         
        </section>

        
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RefundPolicy;