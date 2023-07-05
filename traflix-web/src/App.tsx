import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import SearchbarComponent from './components/searchbarComponent';
import mockStation from './assets/stting/seachbarComponent/testDate';

const App = () => (
  <Router>
    <Routes>
      <Route path="/mock" element={<MockPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/testSearchBar"
        element={<SearchbarComponent stationList={mockStation} />}
      />
    </Routes>
  </Router>
);

export default App;
