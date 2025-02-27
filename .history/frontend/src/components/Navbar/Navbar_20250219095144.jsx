import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo/step-solutions-logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Step Solutions Logo" />
          </Link>
        </div>

        <div className="category-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>หมวดหมู่สินค้า</span>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="ค้นหาสินค้า" />
        </div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link active">
            หน้าแรก
          </Link>
          <Link to="/computers" className="navbar-link">
            คอมพิวเตอร์เซ็ต
          </Link>
          <Link to="/accessories" className="navbar-link">
            อุปกรณ์คอม
          </Link>
          <Link to="/blog" className="navbar-link">
            บทความ
          </Link>
          <Link to="/contact" className="navbar-link">
            ติดต่อเรา
          </Link>
        </div>

        <div className="profile-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}
