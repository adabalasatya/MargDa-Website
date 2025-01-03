import React from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaChartLine,
  FaMoneyBillAlt,
  FaHome,
  FaHeartbeat,
  FaHeart,
  FaPlane,
  FaShieldAlt,
  FaShoppingCart,
} from "react-icons/fa";

const services = [
  {
    icon: <FaGraduationCap className="h-10 w-10 text-blue-500 animate-bounce" />,
    title: "Education",
    description:
      "Whether seeking scholarships, applying to the right school or university, or planning your career, we provide personalised guidance to help you succeed. Margdarshak also offers innovative solutions to organise your studies, monitor progress, and excel in any examination.",
  },
  {
    icon: <FaBriefcase className="h-10 w-10 text-green-500 animate-bounce" />,
    title: "Work",
    description:
      "We connect talented individuals with top job opportunities while helping businesses efficiently manage their workforce. Whether you're seeking your next career move or streamlining HR operations, we provide smart tools and consultancy.",
  },
  {
    icon: <FaChartLine className="h-10 w-10 text-purple-500 animate-bounce" />,
    title: "Business",
    description:
      "Margdarshak empowers entrepreneurs to build profitable businesses. Margdarshak provides everything you need to launch, manage, and grow a profitable business. By leveraging business automation, organisations can streamline operations, enhance customer satisfaction, and drive growth.",
  },
  {
    icon: <FaMoneyBillAlt className="h-10 w-10 text-yellow-500 animate-bounce" />,
    title: "Finance",
    description:
      "Managing finances, securing the right insurance, or addressing urgent funding needs can feel overwhelming. We empower individuals and businesses with expert guidance, tailored solutions, and easy-to-use tools to achieve financial security and peace of mind.",
  },
  {
    icon: <FaHome className="h-10 w-10 text-orange-500 animate-bounce" />,
    title: "Accommodation",
    description:
      "Why pay hefty commissions when finding accommodation can be simple and direct? We connect you directly with property owners or their Advisors to rent or buy your ideal home without any middlemen. Enjoy a seamless experience every step of the way.",
  },
  {
    icon: <FaHeartbeat className="h-10 w-10 text-red-500 animate-bounce" />,
    title: "Health",
    description:
      "We are committed to simplifying healthcare for everyone. Whether you’re seeking information on health issues, cost-effective treatments, diagnostic services, or emergency assistance, we provide reliable guidance and solutions tailored to your needs.",
  },
  {
    icon: <FaHeart className="h-10 w-10 text-pink-500 animate-bounce" />,
    title: "Matri",
    description:
      "We believe everyone deserves meaningful connections. Whether you're seeking a life partner, a live-in relationship, or someone to simply talk to, we offer the tools, and support to help you find what your heart desires.",
  },
  {
    icon: <FaPlane className="h-10 w-10 text-teal-500 animate-bounce" />,
    title: "Travelogis",
    description:
      "Whether you’re planning a trip or need to send something across town or the country, Margdarshak makes it effortless. We combine smart solutions, professional service, and personalised options to meet all your travel and delivery needs.",
  },
  {
    icon: <FaShieldAlt className="h-10 w-10 text-gray-500 animate-bounce" />,
    title: "Protection",
    description:
      "Margdarshak provides you with the assistance you need for security and law enforcement challenges. Whether you're seeking legal advice, ensuring personal safety, or requiring help at a police station, Margdarshak will guide you every step of the way.",
  },
  {
    icon: <FaShoppingCart className="h-10 w-10 text-indigo-500 animate-bounce" />,
    title: "Mart",
    description:
      "From setting up your online shop to offering doorstep delivery, we provide the tools, guidance, and support you need to thrive in the digital economy. Create a professional online store quickly. No technical skills? No problem! Customise your shop and start selling globally, right away.",
  },
];

const Services = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white p-6 shadow rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div>{service.icon}</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;