import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">
            MyProject
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            หน้าแรก
          </Link>
          <Link to="/about" className="navbar-link">
            เกี่ยวกับ
          </Link>
          <Link to="/contact" className="navbar-link">
            ติดต่อ
          </Link>
        </div>
        <div className="navbar-menu-icon">
          <button className="menu-button">
            <svg
              className="menu-icon"
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
