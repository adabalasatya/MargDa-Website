import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import logo from '../../assets/margdarshakendra-logo.webp';

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-gray-800 py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-300 pb-8">
          {/* Logo and Contact Info */}
          <div>
            <img
              src={logo}
              alt="Margdarshak Logo"
              className="h-14 mb-4"
            />
            <p className="text-gray-600 text-sm mb-2">C-67 Dwarka Mor, New Delhi-110059</p>
            <p className="text-gray-600 text-sm mb-2">+91 8130960040</p>
            <p className="text-gray-600 text-sm">CIN: U85320DL2016NPL306100</p>
          </div>

          {/* Business Tools */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Tools</h3>
            <ul className="text-gray-600 space-y-3">
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Data and Contacts</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Unified Communication</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Career Counselling</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Recruitment and HR</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Marketing and Sales</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Get Associated</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Business Proposal</a></li>
            </ul>
          </div>

          {/* Knowledge Tools */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Knowledge Tools</h3>
            <ul className="text-gray-600 space-y-3">
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Knowledge Royalty</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Career Counsellor</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> HR Consultant</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Income Calculator</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Be Informed</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
            <ul className="text-gray-600 space-y-3">
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Statutory Documents</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Privacy Statement</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Terms of Service</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Refund Policy</a></li>
              <li><a href="#" className="flex items-center hover:text-orange-500 transition"><HiOutlineArrowNarrowRight className="mr-2" /> Pay Online</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-orange-500 transition">
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="tel:+918130960040" className="text-gray-600 hover:text-orange-500 transition">
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a href="mailto:info@margdarshak.com" className="text-gray-600 hover:text-orange-500 transition">
            <AiOutlineMail className="w-6 h-6" />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">&copy; 2024 Margdarshak Media. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
