import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/margdarshakendra-logo.webp'; // Ensure the path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faSignInAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 py-8 relative">
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <Link to="/" className="flex-shrink-0">
          <img
            src={Logo}
            alt="Margdarshakendra Logo"
            className="h-10 md:h-12"
          />
        </Link>
      </div>

      {/* Hamburger Menu */}
      <button
        className="text-2xl md:hidden z-30 py-2 focus:outline-none"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
      </button>

      {/* Navigation Links */}
      <ul
        className={`${
          menuOpen
            ? 'translate-x-0 opacity-100 ease-in-out'
            : 'translate-x-full opacity-0 ease-out'
        } absolute top-0 right-0 bg-white shadow-lg rounded-md transition-all duration-500 z-20 w-64 h-screen flex flex-col items-center md:static md:flex md:flex-row md:h-auto md:w-auto md:opacity-100 md:translate-x-0 md:shadow-none md:justify-end md:flex-grow`}
      >
        {/* Our App Link */}
        <li className="w-full md:w-auto md:ml-6 mt-4 md:mt-0">
          <Link
            to="/our-app"
            className="flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg text-black font-bold transition duration-300 w-full md:w-auto hover:text-blue-500 hover:scale-105 rounded-lg animate-slide-down delay-600"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faMobileAlt} className="hidden md:block" />App
          </Link>
        </li>
        
        {/* Login Link */}
        <li className="w-full md:w-auto md:ml-6 mt-4 md:mt-0">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg text-red-700 font-bold transition duration-300 w-full md:w-auto hover:text-orange-600 hover:scale-105 rounded-lg animate-slide-down delay-600"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="hidden md:block" /> Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
