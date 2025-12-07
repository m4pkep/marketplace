import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdPage from './pages/AdPage';
import CreateAdPage from './pages/CreateAdPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ad/:id" element={<AdPage />} />
          <Route path="/create-ad" element={<CreateAdPage />} /> {/* Новая страница */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;