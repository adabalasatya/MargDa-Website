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
    icon: (
      <FaGraduationCap className="h-8 w-8 md:h-10 md:w-10 text-blue-500 animate-bounce" />
    ),
    title: "Education",
    description:
      "Whether you are seeking admission to the right school or university in India, abroad or planning your career, we provide personalised guidance to help you succeed. Margdarshak also offers innovative solutions to organise your studies, monitor progress, and excel in examinations.",
  },
  {
    icon: <FaBriefcase className="h-8 w-8 md:h-10 md:w-10 text-green-500 animate-bounce" />,
    title: "Work",
    description:
      "We connect individuals with the right work opportunities while helping employers hire the right and verified people and get the work done. Margdarshak provides smart tools and solutions to both work-seekers offering their services and businesses to manage efficiently their workforce requirements.",
  },
  {
    icon: <FaChartLine className="h-8 w-8 md:h-10 md:w-10 text-purple-500 animate-bounce" />,
    title: "Business",
    description:
      "Margdarshak empowers entrepreneurs through its Digital Workplace to start, manage, and grow their businesses. By leveraging curated data, a unified communication system and automation tools to streamline marketing, sales, HR, and support operations, organisations can acquire more customers and keep them satisfied with reduced overhead expenses and increased profits.",
  },
  {
    icon: (
      <FaMoneyBillAlt className="h-8 w-8 md:h-10 md:w-10 text-yellow-500 animate-bounce" />
    ),
    title: "Finance",
    description:
      "Margdarshak offers individuals and businesses expert guidance and result-oriented solutions to manage finances, accounts, taxation, insurance, or urgent funding needs. Our consultants also provide advice on problems related to harassment by recovery agents due to loan defaults and enhance CIBIL scores to achieve financial security and peace of mind.",
  },
  {
    icon: <FaHome className="h-8 w-8 md:h-10 md:w-10 text-orange-500 animate-bounce" />,
    title: "Accommodation",
    description:
      "Why pay hefty commissions when finding residential or commercial space can be simple? We connect you directly with property owners or their advisors so you can rent or buy your ideal property without any middlemen.",
  },
  {
    icon: <FaHeartbeat className="h-8 w-8 md:h-10 md:w-10 text-red-500 animate-bounce" />,
    title: "Health",
    description:
      "We are committed to simplifying healthcare needs for all. Whether you’re seeking consultations on medical issues, mental problems, cost-effective treatments, diagnostic services, or emergency assistance we connect you with doctors and professionals in hospitals and allied centres.",
  },
  {
    icon: <FaHeart className="h-8 w-8 md:h-10 md:w-10 text-pink-500 animate-bounce" />,
    title: "Matri",
    description:
      "We believe everyone deserves meaningful connections. Margdarshak helps you find what your heart desires, whether you're seeking a life partner, a live-in relationship, a short-term companion, or someone to talk or chat with for emotional support.",
  },
  {
    icon: <FaPlane className="h-8 w-8 md:h-10 md:w-10 text-teal-500 animate-bounce" />,
    title: "Transportation",
    description:
      "Whether you want to commute a short distance or need a local delivery person to bring something from a nearby shop/place without hassle or bargaining, Margdarshak makes it effortless with personalised options.",
  },
  {
    icon: <FaShieldAlt className="h-8 w-8 md:h-10 md:w-10 text-gray-500 animate-bounce" />,
    title: "Protection",
    description:
      "Margdarshak provides you with the assistance you need to ensure personal or business security and law enforcement challenges. Whether you're seeking legal advice, or require help at a police station, Margdarshak will guide you at every step of the way.",
  },
  {
    icon: (
      <FaShoppingCart className="h-8 w-8 md:h-10 md:w-10 text-indigo-500 animate-bounce" />
    ),
    title: "VMart",
    description:
      "In minutes, you can set up a Virtual Mart with your payment system and offer doorstep delivery of products to local or global clients. Margdarshak helps you to thrive in the digital economy. No technical skills are required, update the products or services you offer and start selling immediately. ",
  },
];

const Services = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white p-4 md:p-6 shadow rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div>{service.icon}</div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;