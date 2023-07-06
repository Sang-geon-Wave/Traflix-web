import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import TestHeaderPage from './pages/MockPage copy';

const App = () => (
  <Router>
    <Routes>
      <Route path="/mock" element={<MockPage />} />
      <Route path="/" element={<LandingPage />} />

      <Route path="/TestHeaderPage" element={<TestHeaderPage />} />
    </Routes>
  </Router>
);

export default App;
