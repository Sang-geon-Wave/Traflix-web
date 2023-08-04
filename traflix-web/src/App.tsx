import React, { useEffect, useRef } from 'react';
import { useScreenClass } from 'react-grid-system';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import MockPage from './pages/MockPage';
import DirectionPage from './pages/DirectionPage';
import useRootData from './hooks/useRootData';

import testData from './assets/string/travelCardComponent';
import TravelCardComponent from './components/TravelCardComponent';
import TravelScheduleComponent from './components/TravelScheduleCompoent';

const App = () => {
  const componentRef = useRef(null);
  const currentScreenClass = useScreenClass(componentRef);

  const { changeScreenClass } = useRootData(({ appStore }) => ({
    changeScreenClass: appStore.changeScreenClass,
  }));

  useEffect(() => {
    changeScreenClass(
      ['md', 'lg', 'xl', 'xxl', 'xxxl'].includes(currentScreenClass)
        ? 'xl'
        : 'xs',
    );
  }, [currentScreenClass]);

  return (
    <Router>
      <Routes>
        <Route path="/mock" element={<MockPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/directions" element={<DirectionPage />} />
        <Route
          path="test"
          element={<TravelScheduleComponent travelSchedule={testData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
