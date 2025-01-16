import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom"; // Import Link for internal navigation
import logo from "../../assets/margdarshakendra-logo.webp";
import Mardga from "../../assets/margdaicon.jpg";
import Whatsapp from "../../assets/whatsappicon.jpg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-100 to-slate-300 text-gray-800 py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Top - All details in the same line */}
        <div className="flex flex-wrap justify-between border-b border-gray-300 pb-8">
          {/* Logo and Contact Info */}
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <img
              src={logo}
              alt="Margdarshak Logo"
              className="h-14 mb-4 transform hover:scale-105 transition-transform duration-300"
            />
            <p className="text-gray-600 text-sm mb-2 flex items-center">
              <img src={Mardga} alt="Office Icon" className="w-4 h-4 mr-2" />{" "}
              Margdarshak Media
            </p>

            <p className="text-gray-600 text-sm mb-2">
              🏠 C-67, Dwarka Mor, New Delhi
            </p>
            <p className="text-gray-600 text-sm mb-2">📞 07965174000</p>
            <p className="text-gray-600 text-sm mb-2 flex items-center">
              <img src={Whatsapp} alt="Office Icon" className="w-4 h-4 mr-2" />{" "}
              +918130960040
            </p>
            <p className="text-gray-600 text-sm mb-2">✉️ mail@margda.com</p>
            <p className="text-gray-600 text-sm">CIN: U85320DL2016NPL306100</p>
            <p className="text-gray-600 text-sm">GST: 07AAUPS8603H1Z4</p>
          </div>

          {/* About Margdarshak */}
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-semibold py-4 text-gray-800 mb-4">
              About Us
            </h3>
            <ul className="text-gray-600 space-y-3">
              <li>
                <Link
                  to="/about-us"
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> About
                  Margdarshak
                </Link>
              </li>
              {/* <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Management Team
                </Link>
              </li> */}
              {/* <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Advisors and Associates
                </Link>
              </li> */}
              <li>
                <Link
                  to="/feedback"
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Feedback and
                  Complaints
                </Link>
              </li>
            </ul>
          </div>

          {/* Smart Tools 
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-semibold py-4 text-gray-800 mb-4">Smart Tools</h3>
            <ul className="text-gray-600 space-y-3">
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Data and Contacts
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Unified Communication
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Career Counselling
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Recruitment and HR
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Marketing and Sales
                </Link>
              </li>
            </ul>
          </div>
          */}

          {/* Get Associated
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-semibold py-4 text-gray-800 mb-4">Get Associated</h3>
            <ul className="text-gray-600 space-y-3">
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Business Proposal
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Knowledge Royalty
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Career Counsellor
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> HR Consultant
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Income Calculator
                </Link>
              </li>
            </ul>
          </div>
           */}

          {/* Be Informed */}
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-semibold py-3 text-gray-800 mb-4">
              Be Informed
            </h3>
            <ul className="text-gray-600 space-y-3">
              {/* <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Statutory Documents
                </Link>
              </li> */}
              <li>
                <Link
                  to="/privacy-statement"
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Privacy
                  Statement
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Terms of
                  Service
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Refund Policy
                </Link>
              </li>
              {/* <li>
                <Link
                  to=""
                  className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"
                >
                  <HiOutlineArrowNarrowRight className="mr-2" /> Pay Online
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Social Media Icons 
        <div className="mt-8 flex justify-center space-x-6">
          <a
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300"
          >
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a
           
            className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300"
          >
            <AiOutlineMail className="w-6 h-6" />
          </a>
        </div>
        */}

        {/* Footer Bottom */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Margdarshak Media. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
