import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="navbar-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand text-2xl font-bold text-blue-600 hover:text-blue-800 transition-all">
            MyProject
          </Link>
        </div>
        <div className="navbar-links hidden md:flex space-x-8">
          <Link to="/" className="navbar-link text-gray-700 hover:text-blue-600 text-lg font-medium transition duration-300">
            หน้าแรก
          </Link>
          <Link to="/about" className="navbar-link text-gray-700 hover:text-blue-600 text-lg font-medium transition duration-300">
            เกี่ยวกับ
          </Link>
          <Link to="/contact" className="navbar-link text-gray-700 hover:text-blue-600 text-lg font-medium transition duration-300">
            ติดต่อ
          </Link>
        </div>
        <div className="navbar-menu-icon md:hidden flex items-center">
          <button className="menu-button text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-2">
            <svg
              className="menu-icon w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
