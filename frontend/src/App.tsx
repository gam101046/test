import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './page/Buy-products/Navbar';
import Index from './page/Order/Index';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} /> {/* เส้นทางหน้าหลัก */}
        <Route path="/product" element={<Index />} /> {/* เส้นทางหน้าสินค้า */}
      </Routes>
    </Router>
  );
};

export default App;
