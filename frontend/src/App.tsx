import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './page/Buy-products/Navbar';
import Index from './page/Order/Index';
import Index1 from './page/Purchase-list/Index';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/index" element={<Index1 />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/product" element={<Index />} />
      </Routes>
    </Router>
  );
};

export default App;
