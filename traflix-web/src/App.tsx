import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import LoginModalPage from './pages/LoginModalPage';
import Redirection from './components/Redirect';

const App = () => (
  <Router>
    <Routes>
      <Route path="/mock" element={<MockPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginModalPage />} />
      <Route path="/oauth/kakao/callback" element={<Redirection />} />
    </Routes>
  </Router>
);

export default App;
