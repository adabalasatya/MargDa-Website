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
            This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
          </p>
          <p className="text-gray-700 mb-4">
            Cancellations will only be considered if the request is made within one day of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery.
          </p>
          <p className="text-gray-700 mb-4">
            Margdarshak Media does not accept cancellation requests for digital services or software as a service. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.
          </p>
          <p className="text-gray-700 mb-4">
            In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within one day of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within one day of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.
          </p>
          <p className="text-gray-700 mb-4">
            In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.
          </p>
          <p className="text-gray-700 mb-4">
            In case of any refunds approved by Margdarshak Media, it will take 15 days for the refund to be processed to you.
          </p>
        </section>

        {/* Return Policy */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaExchangeAlt className="mr-2" /> Return Policy
          </h3>
          <p className="text-gray-700 mb-4">
            We offer refund / exchange within the first one day from the date of your purchase. If one day has passed since your purchase, you will not be offered a return, exchange, or refund of any kind. In order to become eligible for a return or an exchange:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>The purchased item should be unused and in the same condition as you received it.</li>
            <li>The item must have original packaging.</li>
            <li>If the item was purchased on sale, it may not be eligible for a return / exchange.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Further, only such items are replaced by us (based on an exchange request) if such items are found defective or damaged.
          </p>
          <p className="text-gray-700 mb-4">
            You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the time of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further, if the same has been approved after the quality check at our end, your request (i.e., return / exchange) will be processed in accordance with our policies.
          </p>
        </section>

        {/* Shipping Policy */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaTruck className="mr-2" /> Shipping Policy
          </h3>
          <p className="text-gray-700 mb-4">
            The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within one day from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case may be), the same is not refundable.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RefundPolicy;