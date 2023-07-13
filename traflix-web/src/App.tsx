import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import TestSelectPage from './pages/MockPage copy';

const App = () => (
  <Router>
    <Routes>
      <Route path="/mock" element={<MockPage />} />
      <Route path="/" element={<LandingPage />} />

      <Route path="/TestSelectPage" element={<TestSelectPage />} />
    </Routes>
  </Router>
);

export default App;
