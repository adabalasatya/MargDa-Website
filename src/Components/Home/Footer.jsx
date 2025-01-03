import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import logo from '../../assets/margdarshakendra-logo.webp';

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
            <p className="text-gray-600 text-sm mb-2">🏢 Margdarshak Media</p>
            <p className="text-gray-600 text-sm mb-2">🏠 C-67, Dwarka Mor, New Delhi</p>
            <p className="text-gray-600 text-sm mb-2">📞 07965174000</p>
            <p className="text-gray-600 text-sm mb-2">💬 +918130960040</p>
            <p className="text-gray-600 text-sm mb-2">✉️ mail@margda.com</p>
            <p className="text-gray-600 text-sm">CIN: U85320DL2016NPL306100</p>
            <p className="text-gray-600 text-sm">GST: 07AAUPS8603H1Z4</p>
          </div>

          {/* About Margdarshak */}
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-semibold py-4 text-gray-800 mb-4">About Us</h3>
            <ul className="text-gray-600 space-y-3">
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> About Margdarshak</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Management Team</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Advisors and Associates</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Feedback and Complaints</a></li>
            </ul>
          </div>

          {/* Smart Tools */}
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-semibold py-4 text-gray-800 mb-4">Smart Tools</h3>
            <ul className="text-gray-600 space-y-3">
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Data and Contacts</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Unified Communication</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Career Counselling</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Recruitment and HR</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Marketing and Sales</a></li>
            </ul>
          </div>

          {/* Get Associated */}
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-semibold py-4 text-gray-800 mb-4">Get Associated</h3>
            <ul className="text-gray-600 space-y-3">
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Business Proposal</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Knowledge Royalty</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Career Counsellor</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> HR Consultant</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Income Calculator</a></li>
            </ul>
          </div>

          {/* Be Informed */}
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <h3 className="text-lg font-semibold py-3 text-gray-800 mb-4">Be Informed</h3>
            <ul className="text-gray-600 space-y-3">
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Statutory Documents</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Privacy Statement</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Terms of Service</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Refund Policy</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition transform hover:translate-x-2 duration-300"><HiOutlineArrowNarrowRight className="mr-2" /> Pay Online</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300">
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="tel:+918130960040" className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300">
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a href="mailto:mail@margda.com" className="text-gray-600 hover:text-orange-500 transition transform hover:scale-110 duration-300">
            <AiOutlineMail className="w-6 h-6" />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">&copy; 2025 Margdarshak Media. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;