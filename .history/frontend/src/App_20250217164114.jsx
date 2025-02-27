import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ProductList />
      <Footer />
    </div>
  );
};

export default App;
