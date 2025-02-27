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


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logo/step-solutions-logo.png';

export default function Navbar() {
  return (
    <motion.nav
      className="w-full bg-white shadow-lg fixed top-0 left-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <motion.img
              src={logo}
              alt="Step Solutions Logo"
              className="h-12 w-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </Link>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            หมวดหมู่สินค้า
          </button>
        </div>

        <div className="flex-grow mx-8">
          <input
            type="text"
            placeholder="ค้นหาสินค้า"
            className="w-full rounded-full border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all">
            หน้าแรก
          </Link>
          <Link to="/computers" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all">
            คอมพิวเตอร์เซ็ต
          </Link>
          <Link to="/accessories" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all">
            อุปกรณ์คอม
          </Link>
          <Link to="/blog" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all">
            บทความ
          </Link>
          <Link to="/contact" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all">
            ติดต่อเรา
          </Link>
        </div>

        <motion.div
          className="ml-4 bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
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
        </motion.div>
      </div>
    </motion.nav>
  );
}

