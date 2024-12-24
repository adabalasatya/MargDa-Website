import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/margdarshakendra-logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-4 relative ">
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0">
        <img src={Logo} alt="Margdarshakendra Logo" className="h-10 md:h-12 px-8" />
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
        } absolute top-0 right-0 bg-white shadow-lg rounded-md transition-all duration-500 z-20 w-64 h-screen flex flex-col items-center md:static md:flex md:flex-row md:h-auto md:w-auto md:opacity-100 md:translate-x-0 md:shadow-none`}
      >
        {/* Home Link */}
        <li className="w-full md:w-auto md:ml-6 mt-8 md:mt-0">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg text-gray-700 rounded-full font-bold hover:bg-orange-600 hover:text-white transition duration-300 md:border md:border-gray-700 w-full md:w-auto"
            onClick={() => setMenuOpen(false)} // Close menu on navigation
          >
            <FontAwesomeIcon icon={faHome} className="hidden md:block" /> Home
          </Link>
        </li>

        {/* Login Link */}
        <li className="w-full md:w-auto md:ml-6 mt-4 md:mt-0">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg text-gray-700 rounded-full font-bold hover:bg-orange-600 hover:text-white transition duration-300 md:border md:border-gray-700 w-full md:w-auto"
            onClick={() => setMenuOpen(false)} // Close menu on navigation
          >
            <FontAwesomeIcon icon={faSignInAlt} className="hidden md:block" /> Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
