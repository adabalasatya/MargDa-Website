import React, { useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaCommentDots } from 'react-icons/fa'; // Updated icons
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Nav from '../../Components/Home/navbar';
import Footer from '../../Components/Home/Footer';
import FeedbackImage from "../../assets/FooterPages/feedback.jpeg"

const Feedback = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 md:px-12 py-8">
        {/* Feedback and Complaints Section */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            {/* Text Content */}
            <div className="w-full md:w-3/4">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <FaCommentDots className="mr-2" /> Your Feedback and Complaints Matter!
              </h3>
              <p className="text-gray-700 mb-4">
                At Margdarshak, we value your opinions and strive to provide the best possible experience for our customers. Your compliments and complaints help us identify areas for improvement and make necessary changes to better serve you.
              </p>
              <p className="text-gray-700 mb-4">
                Your input enables us to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Improve our products and services</li>
                <li>Enhance your overall experience</li>
                <li>Identify and resolve issues promptly and efficiently</li>
                <li>Develop new services and features that meet your needs</li>
                <li>Provide better customer support</li>
              </ul>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/4">
              <motion.img
                src={FeedbackImage}
                alt="Feedback and Complaints"
                className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              />
            </div>
          </div>
        </motion.div>

        {/* You can: */}
        <motion.section
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h4 className="text-lg font-semibold mb-4">You can:</h4>
          <div className="text-gray-700 mb-4">
            <p className="mb-2 flex items-center">
              Send an Email to <a href="mailto:care@margda.com" className="text-blue-500 pl-2">care@margda.com</a>
            </p>
            <p className="mb-2 flex flex-col">
              Call our customer service team from 10 AM to 7 PM IST Monday to Saturday
              <a href="tel:07965174000" className="text-blue-500 mt-1">📞 07965174000</a>
            </p>
            <p className="mb-2 flex items-center">
              WhatsApp at <a href="https://wa.me/918130960040" className="text-blue-500 pl-2">💬 +91 8130960040</a>
            </p>
          </div>
        </motion.section>

        {/* Feedback Form */}
        <motion.section
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h4 className="text-lg font-semibold mb-4">Fill out the Feedback Form</h4>
          <p className="text-gray-700 mb-4">
            The more specific you are with your feedback or complaint, the better we can understand and address your concerns.
          </p>

          {/* Form Container */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Feedback Matters</h2>
            <form className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm"
                />
              </div>

              {/* Mobile Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Mobile</label>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm"
                />
              </div>

              {/* Feedback/Complaint Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Feedback/Complaint</label>
                <textarea
                  rows="4"
                  placeholder="Share your feedback or complaint"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 text-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <p className="text-gray-700 mt-4">
            Thank you for your time and effort in sharing your thoughts and concerns. Your input helps shape Margdarshak's future.
          </p>
        </motion.section>

        {/* Complaints Handling Process */}
        <motion.section
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h4 className="text-lg font-semibold mb-4">Here's our complaints handling process:</h4>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li><strong>Acknowledgement:</strong> We’ll confirm we’ve received your feedback or complaint within 48 working hours.</li>
            <li><strong>Investigation:</strong> Our team will review the details, contact you for additional information, and investigate your complaint thoroughly and fairly.</li>
            <li><strong>Resolution:</strong> We'll respond to your complaint with a resolution or explanation within 6 working days.</li>
            <li><strong>Follow-up:</strong> We'll follow up with you to ensure the issue is resolved to your satisfaction.</li>
          </ol>
          <p className="text-gray-700 mb-4">
            Your feedback and personal details will be treated with confidentiality and respect. For more information, please read our <a href="/privacy-statement" className="text-blue-500">Privacy Policy</a>.
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Feedback;