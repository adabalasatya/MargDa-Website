import React, { useState } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";

const testimonials = [
  {
    quote:
      "Margdarshak has transformed our customer engagement strategy, providing a secure and reliable platform for our team.",
    author: "Sathya Reddy, The Badminton Club",
  },
  {
    quote:
      "The verified data feature of Margdarshak has significantly improved our sales outreach efforts, allowing us to target the right customers.",
    author: "S. Radhakrishnan, Mindtree Institute",
  },
  {
    quote:
      "Margdarshak has been a game-changer for our business. The verified data and secure communication system have significantly improved our operations and customer satisfaction.",
    author: "Softrack Technologies",
  },
  {
    quote:
      "I've tried other CRMs, but none have matched the data quality and security level provided by Margdarshak. It's a reliable and trustworthy solution.",
    author: "Ipal clinic",
  },
  {
    quote:
      "The verified data has significantly improved the quality of our leads, resulting in increased sales and customer satisfaction.",
    author: "Astro International",
  },
  {
    quote:
      "Margdarshak has transformed our customer engagement strategy, providing a secure and reliable platform for our team.",
    author: "Descon Engineers",
  },
  {
    quote:
      "The verified data feature of Margdarshak has significantly improved our sales outreach efforts, allowing us to target the right customers.",
    author: "Lohia Oil Seal Company",
  },
  {
    quote:
      "The verified data feature of Margdarshak has significantly improved our sales outreach efforts, allowing us to target the right customers.",
    author: "Tri Tigers",
  },
  {
    quote:
      "Margdarshak has been a game-changer for our business. The verified data and secure communication system have significantly improved our operations and customer satisfaction.",
    author: "Madni Auto Parts",
  },
  {
    quote:
      "I've tried other CRMs, but none have matched the data quality and security level provided by Margdarshak. It's a reliable and trustworthy solution.",
    author: "Juhi Raina, Saraswati Consultants",
  },
  {
    quote:
      "The verified data has significantly improved the quality of our leads, resulting in increased sales and customer satisfaction.",
    author: "Sahil Tayal, Shree Financial Services",
  },
  {
    quote:
      "I feel confident knowing that our customer data is secure with the Margdarshak platform. The encryption features give me peace of mind.",
    author: "Rahul Sangwan, Offbeat Eduventure (P) Limited",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
          <MdOutlineRateReview className="text-orange-500" /> Testimonials
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6 text-left relative">
          <FaQuoteLeft className="text-orange-500 text-2xl mb-4" />
          <p className="text-gray-600 italic mb-4">
            "{testimonials[currentIndex].quote}"
          </p>
          <h4 className="font-semibold text-gray-800">
            {testimonials[currentIndex].author}
          </h4>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              className="text-orange-500 hover:text-orange-700"
            >
              <FaArrowLeft className="text-2xl" />
            </button>
            <button
              onClick={handleNext}
              className="text-orange-500 hover:text-orange-700"
            >
              <FaArrowRight className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;