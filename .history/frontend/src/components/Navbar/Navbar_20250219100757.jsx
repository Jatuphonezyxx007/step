// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import logo from '../../assets/logo/step-solutions-logo.png';

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-logo">
//           <Link to="/">
//             <img src={logo} alt="Step Solutions Logo" />
//           </Link>
//         </div>

//         <div className="category-button">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//           <span>หมวดหมู่สินค้า</span>
//         </div>

//         <div className="search-bar">
//           <input type="text" placeholder="ค้นหาสินค้า" />
//         </div>

//         <div className="navbar-links">
//           <Link to="/" className="navbar-link active">
//             หน้าแรก
//           </Link>
//           <Link to="/computers" className="navbar-link">
//             คอมพิวเตอร์เซ็ต
//           </Link>
//           <Link to="/accessories" className="navbar-link">
//             อุปกรณ์คอม
//           </Link>
//           <Link to="/blog" className="navbar-link">
//             บทความ
//           </Link>
//           <Link to="/contact" className="navbar-link">
//             ติดต่อเรา
//           </Link>
//         </div>

//         <div className="profile-icon">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//           </svg>
//         </div>
//       </div>
//     </nav>
//   );
// }


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars3Icon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo/step-solutions-logo.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className="w-full bg-white shadow-lg fixed top-0 left-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <div className="flex items-center gap-2">
          <Link to="/" className="mr-2">
            <motion.img
              src={logo}
              alt="Step Solutions Logo"
              className="h-12 w-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </Link>
          <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-2 transition-all">
            <Bars3Icon className="h-6 w-6 text-gray-700" />
            หมวดหมู่สินค้า
          </button>
        </div>

        <div className="flex-grow mx-4 relative">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า"
            className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <motion.div
          className="hidden md:flex ml-4 bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
        >
          <UserCircleIcon className="h-8 w-8 text-gray-700" />
        </motion.div>

        <div className="md:hidden flex items-center">
          <button
            className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden bg-white shadow-lg p-4"
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า"
            className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </motion.div>
      )}
    </motion.nav>
  );
}

